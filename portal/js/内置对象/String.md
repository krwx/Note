- [方法](#方法)
  - [String.prototype.substr() （已弃用: 不再推荐使用该特性）](#stringprototypesubstr-已弃用-不再推荐使用该特性)
    - [语法](#语法)
  - [String.prototype.slice()](#stringprototypeslice)
    - [语法](#语法-1)
  - [String.prototype.substring()](#stringprototypesubstring)
    - [语法](#语法-2)
    - [substring() 和 substr() 之间的区别](#substring-和-substr-之间的区别)
    - [substring() 和 slice() 之间的区别](#substring-和-slice-之间的区别)
    - [替换字符串的方法](#替换字符串的方法)
  - [String.prototype.replace()](#stringprototypereplace)
    - [语法](#语法-3)
    - [指定函数为替换项](#指定函数为替换项)

# 方法

## String.prototype.substr() （已弃用: 不再推荐使用该特性）
String 值的 `substr()` 方法返回该字符串的一部分，从指定的索引开始，然后**扩展到给定数量的字符**。

### 语法
```
substr(start)
substr(start, length)
```
参数
* start：返回子字符串中要包含的第一个字符的索引。
* length： 可选，要提取的字符数。

返回值
* 一个包含给定字符串指定部分的新字符串。

字符串的 `substr()` 方法从字符串中提取 `length` 字符，从 `start` 索引开始计数。
* 如果 `start >= str.length`，则返回空字符串。
* 如果 `start < 0`，则索引从字符串末尾开始计数。更准确地说，在这种情况下，子字符串从 `max(start + str.length, 0)` 开始。
* 如果省略 `start` 或其值为 `undefined`，则将其视为 0。
* 如果省略 `length` 或其值为 `undefined`，或者如果 `start + length >= str.length`，则 `substr()` 会提取字符到字符串末尾。
* 如果 `length < 0`，则返回空字符串。
* 对于 `start` 和 `length`，`NaN` 被视为 0。

```js
const aString = "Mozilla";

console.log(aString.substr(0, 1)); // 'M'
console.log(aString.substr(1, 0)); // ''
console.log(aString.substr(-1, 1)); // 'a'
console.log(aString.substr(1, -1)); // ''
console.log(aString.substr(-3)); // 'lla'
console.log(aString.substr(1)); // 'ozilla'
console.log(aString.substr(-20, 2)); // 'Mo'
console.log(aString.substr(20, 2)); // ''
```

## String.prototype.slice()
`slice()` 方法提取字符串的一部分，并将其**作为新字符串返回**，而**不修改原始字符串**。

### 语法
```
slice(indexStart)
slice(indexStart, indexEnd)
```
**提取的字符串包含 indexStart，不包含 indexEnd**

规则：
* 如果 `indexStart >= str.length`，则返回一个空字符串。
* 如果 `indexStart < 0`，则索引从字符串末尾开始计数。更正式地说，在这种情况下，子字符串从 `max(indexStart + str.length, 0)` 开始。
* 如果 `indexStart` 被省略、为 `undefined`，或无法转换为数字（使用 `Number(indexStart)`），则将其视为 0。
* 如果 `indexEnd` 被省略、为 `undefined`，或无法转换为数字（使用 `Number(indexEnd)`），或者 `indexEnd >= str.length`，则 slice() 提取到字符串的末尾。
* 如果 `indexEnd < 0`，则索引从字符串末尾开始计数。更正式地说，在这种情况下，子字符串在 `max(indexEnd + str.length, 0)` 处结束。
* 在标准化负值后，如果 `indexEnd <= indexStart`（即 indexEnd 表示位于 indexStart 之前的字符），则返回一个**空字符串**。

```js
const str1 = "The morning is upon us."; // str1 的长度是 23。

const str2 = str1.slice(1, 8); // he morn
const str3 = str1.slice(4, -2); // morning is upon u
const str4 = str1.slice(12); // is upon us.
const str5 = str1.slice(30); // ""

str1.slice(-3); // 'us.'
str1.slice(-3, -1); // 'us'
str1.slice(0, -1); // 'The morning is upon us'
str1.slice(4, -1); // 'morning is upon us'
```


## String.prototype.substring()
String 的 `substring()` 方法返回该字符串**从起始索引到结束索引（不包括）的部分**，如果未提供结束索引，则返回到字符串末尾的部分。

### 语法
```
substring(indexStart)
substring(indexStart, indexEnd)
```
`substring()` 方法从 `indexStart` 开始提取字符，直到（但不包括）`indexEnd`。具体来说：
* 如果省略了 `indexEnd`，则 `substring()` 提取字符直到字符串的末尾。
* 如果 `indexStart` 等于 `indexEnd`，则 `substring()` 返回一个空字符串。
* 如果 `indexStart` 大于 `indexEnd`，则 `substring()` 的效果就像交换了这两个参数一样；请参考下面的示例。

**任何小于 0 或大于 str.length 的参数值都会被视为分别等于 0 和 str.length。**

任何值为 NaN 的参数将被视为等于 0。

```js
const anyString = "Mozilla";

console.log(anyString.substring(0, 1)); // 'M'
console.log(anyString.substring(1, 0)); // 'M'

console.log(anyString.substring(0, 6)); // 'Mozill'

console.log(anyString.substring(4)); // 'lla'
console.log(anyString.substring(4, 7)); // 'lla'
console.log(anyString.substring(7, 4)); // 'lla'。indexStart 大于 indexEnd，效果就像交换了这两个参数一样
console.log(anyString.substring(15, 4)); // 'lla'

console.log(anyString.substring(0, 7)); // 'Mozilla'
console.log(anyString.substring(0, 10)); // 'Mozilla'

console.log(anyString.substring(-2, 6)); // 'Mozill'

// 获取字符串的最后 4 个字符
console.log(text.substring(text.length - 4)); // 打印“illa”
```

### substring() 和 substr() 之间的区别
区别：
* 参数不同。
  * `substr()` 方法的两个参数是 `start` 和 `length`，而 `substring()` 方法的参数是 `start` 和 `end`。
* 参数为负数的处理。
  * 如果 `substr()` 的 `start` 索引为负数，它将循环到字符串的末尾，而 `substring()` 会将其限制为 0。
* 参数大小比较的处理
  * 在 `substr()` 中，如果长度为负数，将被视为零，返回空字符串；而在 `substring()` 中，如果 `end` 小于 `start` ，则会交换这两个索引。

```js
const text = "Mozilla";
console.log(text.substring(2, 5)); // "zil"
console.log(text.substr(2, 3)); // "zil"
```

### substring() 和 slice() 之间的区别
区别：  
`substring()` 方法在 `indexStart` 大于 `indexEnd` 的情况下会**交换它的两个参数**，这意味着仍会返回一个字符串。而 `slice()` 方法在这种情况下**返回一个空字符串**。
```js
const text = "Mozilla";
console.log(text.substring(5, 2)); // "zil"
console.log(text.slice(5, 2)); // ""
```

### 替换字符串的方法
```js
// 1. 使用 split() 和 join() 。
// 原理是 split 需要替换的字符，那么字符串就被分成两部分（或者更多），然后再通过 join 替换的字符，那么字符串数组就整合成字符串了。原来需要替换的字符变成替换的字符了
function replaceString(oldS, newS, fullS) {
  return fullS.split(oldS).join(newS);
}

// 2. 使用 String.prototype.replace() 函数
```

## String.prototype.replace()
- `replace()` 方法返回一个新字符串，其中一个、多个或所有匹配的 `pattern` 被替换为 `replacement`。
- `pattern` 可以是字符串或 `RegExp`，`replacement` 可以是字符串或一个在每次匹配时调用的**函数**。
- 如果 `pattern` 是字符串，则只会替换第一个匹配项。原始的字符串不会改变。
- 该方法并不改变调用它的字符串本身，而是返回一个新的字符串。
- **字符串模式只会被替换一次。要执行全局搜索和替换，请使用带有 g 标志的正则表达式或使用 `replaceAll()`**。

### 语法
参数：  

`pattern`
- 可以是字符串或者一个带有 Symbol.replace 方法的对象，典型的例子就是正则表达式。任何没有 Symbol.replace 方法的值都会被强制转换为字符串。

`replacement`
- 可以是字符串或函数。
  - 如果是字符串，它将替换由 pattern 匹配的子字符串。支持一些特殊的替换模式，请参阅下面的指定字符串作为替换项部分。
  - 如果是函数，**将为每个匹配调用该函数，并将其返回值用作替换文本**。下面的指定函数作为替换项部分描述了提供给此函数的参数。

如果 pattern 是一个空字符串，则替换项将被插入到字符串的开头。
```js
"xxx".replace("", "_"); // "_xxx"
```

### 指定函数为替换项
```js
function replacer(match, p1, p2, /* …, */ pN, offset, string, groups) {
  return replacement;
}
```
该函数的参数如下所示：
- match
  - 匹配的子字符串。（对应于上面的 $&。）
- p1, p2, …, pN
  - 如果 replace() 的第一个参数是 RegExp 对象，则为捕获组（包括命名捕获组）找到的第 n 个字符串。（对应于上面的 $1、$2 等。）例如，如果 pattern 是 /(\d+)(\w+)/，则 p1 是 \a+ 的匹配项，p2 是 \b+ 的匹配项。如果该组是分支的一部分（例如 "abc".replace(/(a)|(b)/, Replacer)），则不匹配的替代项将为 undefined。
- offset
  - 原始字符串中匹配子字符串的偏移量。例如，如果整个字符串是 'abcd'，而匹配的子字符串是 'bc'，那么这个参数将是 1。
- string
  - 正在检查的原始字符串。
- groups
  - 一个捕获组命名组成的对象，值是匹配的部分（如果没有匹配，则为 undefined）。仅在 pattern 包含至少一个命名捕获组时才存在。

```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 是非数字，p2 是数字，且 p3 非字母数字
  return [p1, p2, p3].join(" - ");
}
const newString = "abc12345#$*%".replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString); // abc - 12345 - #$*%

```