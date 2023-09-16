/**
 * 将html字符串转换为需要的格式的字符串
 * @param {string} htmlText 
 * @returns 
 */
function html2text(htmlText) {
  let cleanText = preclean(htmlText);
  let tokens = tokenise(cleanText);
  let [start , end] = bte(tokens);
  // let mainBody = tokens.slice(start, end+1);
  let mainBody = tokens.slice(0, 2);
  let cleanedBody = findParagraphs(mainBody);

  let blocks = [];
  let block = [];
  for (let token of cleanedBody) {
    if (tokenValue(token) > 0) {
      block.push(token);
    } else {
      if (block.length > 0) {
        blocks.push(block.join(' '));
        block = [];
      }
    }
  }
  if (block.length > 0) {
    blocks.push(block.join(' '));
  }
  return blocks.join('\n');
}

/**
 * 预处理，去除掉 body 标签，处理 script、style 标签
 * @param {string} text 
 */
function preclean(text) {
  let result = text.replace(/^.*<body(\s+[^>]*)?>/g, "");
  result = result.replace(/<\/body>.*$/g, "");
  result = result.replace(/<script(\s+[^>]*)?>(.|\s)*?<\/script>/g, "<script></script>");
  result = result.replace(/<style(\s+[^>]*)?>(.|\s)*?<\/style>/g, "<style></style>");

  result = result.replace('&quot;', '"'); // 双引号："
  result = result.replace('&nbsp;', ' '); // 空格
  result = result.replace('&#39;', "'"); // 单引号：'
  return result;
}

/**
 * 返回由标记和文本组成的数组
 * @param {string} text 
 */
function tokenise(text) {
  return text.match(/(<([^>]|\s)+>|[^\s<]+)/g);
}

/**
 * 获取主要内容的起始位置和终止位置
 * @param {Array} tokens html的标签组成的数组
 */
function bte(tokens) {
  // 找断点
  let breakpoints = [];
  let prevValue;
  let sumValue = 0;
  for (let i = 0; i < tokens.length; i++) {
    let curValue = tokenValue(tokens[i]);
    if (prevValue && curValue != prevValue) {
      breakpoints.push([i-1, sumValue]);
      sumValue = 0;
    }
    sumValue += curValue;
    prevValue = curValue;
  }
  breakpoints.push([tokens.length-1, sumValue]);

  // 
  let maxScore = maxStart = maxEnd = 0;
  for (let i = 0; i < breakpoints.length; i++) {
    let score = breakpoints[i][1];
    if (score > maxScore) {
      maxScore = score;
      maxStart = i > 0 ? breakpoints[i-1][0] + 1 : 0;
      maxEnd = breakpoints[i][0];
    }
    for (let j = i+1; j < breakpoints.length; j++) {
      score += breakpoints[j][1];
      if (score > maxScore) {
        maxScore = score;
        maxStart = i > 0 ? breakpoints[i-1][0] + 1 : 0;
        maxEnd = breakpoints[i][0];
      }
    }
  }
  return [maxStart, maxEnd];
}

/**
 * 获取文本标签的块
 * @param {Array<String>} tokens 
 */
function findParagraphs(tokens) {
  const PAR_FIND_TAGS = ['p', 'div', 'hr', 'blockquote', 'table'];
  const PAR_REPLACE_TAG = '<p>';
  const HEADER_FIND_TAGS = ['h1', 'h2', 'h3'];
  const LIST_FIND_TAGS = ['li'];
  let result = [PAR_REPLACE_TAG];

  let ifInParagraph = false;
  for (let token of tokens) {
    if (tokenValue(token) > 0) {
      result.push(token);
      ifInParagraph = true;
    } else {
      if (!ifInParagraph) continue;
      let tempArr = token.match(/^<([^\s>]+)/g);
      if (!tempArr) continue;
      let tempText = tempArr[0];
      if (PAR_FIND_TAGS.includes(tempText) || HEADER_FIND_TAGS.includes(tempText) || LIST_FIND_TAGS.includes(tempText)) {
        result.push(PAR_REPLACE_TAG);
        ifInParagraph = false;
      }
    }
  }

  return result;
}

/**
 * 判断token是否为 html 标识，是的话返回-1
 * @param {string} token 
 */
function tokenValue(token) {
  return token.startsWith('<') ? -1 : 1;
}


function main() {
  let str = '<body><p>123</p></body>';
  console.log(str);
  let result = html2text(str);
  console.log(result);
}


main();
