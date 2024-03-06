# 其他知识

- [其他知识](#其他知识)
  - [script 标签的 async 和 defer 属性](#script-标签的-async-和-defer-属性)
    - [延迟加载 js 脚本的方法](#延迟加载-js-脚本的方法)
    - [遇到 script 标签为什么会阻塞](#遇到-script-标签为什么会阻塞)
  - [函数节流与防抖](#函数节流与防抖)
  - [正则表达式](#正则表达式)
    - [修饰符](#修饰符)
    - [表达式模式](#表达式模式)
    - [RegExp 对象](#regexp-对象)
    - [使用字符串方法](#使用字符串方法)
  - [深克隆、浅克隆](#深克隆浅克隆)
  - [前端图表框架如何保证流畅不卡顿的前提下动态显示2万个数据点的折线图？](#前端图表框架如何保证流畅不卡顿的前提下动态显示2万个数据点的折线图)
    - [数据降采样](#数据降采样)
    - [Canvas 或 WebGL 渲染](#canvas-或-webgl-渲染)
    - [数据分块加载](#数据分块加载)
    - [避免冗余计算](#避免冗余计算)
    - [硬件加速和性能优化](#硬件加速和性能优化)
    - [使用 Web Workers](#使用-web-workers)

## script 标签的 async 和 defer 属性

- defer 属性
  - 会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件。脚本最后顺序执行
- async 属性
  - 会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本。  
  - 多个脚本的执行顺序没有规律，取决于脚本的加载速度。

比较：

- 相同点
  - 加载时不阻塞解析 HTML
- 不同点
  - defer 是等文档解析后再执行，async 是等脚本加载后就执行，有可能在文档解析中执行，也可能在文档解析后执行。
  - 有可能 async 的先执行，也可能 defer 的先执行，取决于 async 加载脚本完成时是在文档解析前还是解析后

脚本调用策略小结：

- async 和 defer 都指示浏览器在一个单独的线程中下载脚本，而页面的其他部分（DOM 等）正在下载，因此在获取过程中页面加载不会被阻塞。
- async 属性的脚本将在下载完成后立即执行。这将阻塞页面，并不保证任何特定的执行顺序。
- 带有 defer 属性的脚本将按照它们的顺序加载，并且只有在所有脚本加载完毕后才会执行。
- 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async。
- 如果脚本需要等待页面解析，且依赖于其他脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 的相应 `<script>` 元素中。

### 延迟加载 js 脚本的方法

1. 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行
2. 给 js 脚本添加 defer 属性
3. 给 js 脚本添加 async 属性
4. 动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本

### 遇到 script 标签为什么会阻塞

JavaScript是单线程，在JavaScript运行时其他的事情不能被浏览器处理。事实上，大多数浏览器使用单线程处理UI更新和JavaScript运行等多个任务，而同一时间只能有一个任务被执行。所以在执行JavaScript时，会妨碍其他页面动作。

并且，html解析过程是至上而下的，当html解析器遇到诸如`<script>、<link>`等标签时，就会去下载相应内容。且加载、解析、执行JavaScript会阻止解析器往下执行。

为什么浏览器遇到 script 标签，解析完脚本后会立即执行？:  
>当浏览器遇到一个`<script>`标签时，脚本可能在运行过程中修改页面内容，所以浏览器无法预知 JavaScript 是否会修改页面内容。因此，浏览器停下来，运行此 JavaScript 代码，

## 函数节流与防抖

- 函数防抖
  - 函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
  - 这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
- 函数节流
  - 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
  - 节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

```js
// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function() {
    var context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle(fn, delay) {
  var preTime = 0;

  return function() {
    var context = this,
      args = arguments,
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

## 正则表达式

正则表达式（英语：Regular Expression，在代码中常简写为regex、regexp或RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。

搜索模式可用于文本搜索和文本替换。

语法：/正则表达式主体/修饰符(可选)

### 修饰符

|修饰符|描述|
|--|--|
|i|执行对大小写不敏感的匹配。|
|g|执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。|
|m|执行多行匹配。|

**没有加 g 作为修饰符的匹配，找到第一个匹配的地方就会停止；加了 g 作为修饰符的匹配，会查找所有匹配，直到字符串结束。**

### 表达式模式

**方括号**用于查找某个范围内的字符：
|表达式|描述|
|--|--|
|[abc]|查找方括号之间的任何字符。即查找 a 或者 b 或者 c|
|[^abc]|查找任何不在方括号之间的字符。|
|[a-z]|查找任何从小写 a 到小写 z 的字符。|
|[A-Z]|查找任何从大写 A 到大写 Z 的字符。|
|[A-z]|查找任何从大写 A 到小写 z 的字符。|
|[0-9]|查找任何从 0 至 9 的数字。|
|(red\|blue\|green)|查找任何指定的选项。|

**元字符**是拥有特殊含义的字符：
|元字符|描述|
|--|--|
|.|查找单个字符，除了换行和行结束符。|
|\w|查找数字、字母及下划线。|
|\W|查找非单词字符。|
|\d|查找数字。|
|\D|查找非数字字符。|
|\s|查找空白字符。|
|\S|查找非空白字符。|
|\b|匹配单词边界。即匹配单词的开头或结束位置|
|\B|匹配非单词边界。|
|\0|查找 NULL 字符。|
|\n|查找换行符。|
|\f|查找换页符。|
|\r|查找回车符。|
|\t|查找制表符。|
|\v|查找垂直制表符。|
|\xxx|查找以八进制数 xxx 规定的字符。|
|\xdd|查找以十六进制数 dd 规定的字符。|
|\uxxxx|查找以十六进制数 xxxx 规定的 Unicode 字符。|

**量词**:
|量词|描述|
|--|--|
|n+|匹配任何包含至少一个 n 的字符串。<br>例如，/a+/ 匹配 "candy" 中的 "a"，"caaaaaaandy" 中所有的 "a"。|
|n*|匹配任何包含零个或多个 n 的字符串。<br>例如，/bo*/ 匹配 "A ghost booooed" 中的 "boooo"，"A bird warbled" 中的 "b"，但是不匹配 "A goat grunted"。|
|n?|匹配任何包含零个或一个 n 的字符串。<br>例如，/e?le?/ 匹配 "angel" 中的 "el"，"angle" 中的 "le"。|
|n{X}|匹配包含 X 个 n 的序列的字符串。<br>例如，/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。|
|n{X,}|X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。<br>例如，/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。|
|n{X,Y}|X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。<br>例如，/a{1,3}/ 不匹配 "cndy"，匹配 "candy," 中的 "a"，"caandy," 中的两个 "a"，匹配 "caaaaaaandy" 中的前面三个 "a"。注意，当匹配 "caaaaaaandy" 时，即使原始字符串拥有更多的 "a"，匹配项也是 "aaa"。|
|n$|匹配任何结尾为 n 的字符串。|
|^n|匹配任何开头为 n 的字符串。|
|?=n|匹配任何其后紧接指定字符串 n 的字符串。<br>例如 /is(?= all)/g 匹配 "this all" 中的 "is"，这里的意思是匹配后面接着 "all" 的 "is" 字符串|
|?!n|匹配任何其后没有紧接指定字符串 n 的字符串。|

### RegExp 对象

语法

```js
var patt=new RegExp(pattern,modifiers);

或者更简单的方式:
var patt=/pattern/modifiers;

例子：
var re = new RegExp("\\w+");
var re = new RegExp("\\w+","g");
var re = /\w+/;
```

使用  
`test()` 方法搜索字符串指定的值，根据结果并返回真或假。

```js
var patt1=new RegExp("e");
patt1.test("The best things in life are free"); // 输出 true
```

`exec()` 方法检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。

```js
var patt1=new RegExp("e");
patt1.exec("The best things in life are free"); // 输出 e
```

### 使用字符串方法

- search()
  - 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，并**返回子串的起始位置**。
- replace()
  - 用于在字符串中用一些字符串替换另一些字符串，或替换一个与正则表达式匹配的子串。
- match()
  - 可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
  - 这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
- split()
  - 根据正则表达式分割字符串

```js
var str = "Visit Runoob!"; 
var n = str.search(/Runoob/i); // n 输出结果为 6

var str = document.getElementById("demo").innerHTML; 
var txt = str.replace(/microsoft/i,"Runoob");

var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/g); // 输出结果为数组，结果为：ain,ain,ain
```

## 深克隆、浅克隆

- 深克隆（Deep Clone）：
  - 深克隆是指完全复制一个对象或数组，包括对象或数组中的所有嵌套对象或数组。
  - 在深克隆中，复制的结果是一个全新的对象或数组，与原始对象或数组完全独立，修改复制后的对象或数组不会影响原始对象或数组。
  - 深克隆会递归复制所有嵌套的对象或数组，确保每个对象或数组都是独立的。

- 浅克隆（Shallow Clone）：
  - 浅克隆是指复制一个对象或数组，但只复制对象或数组的第一层结构，而不会复制嵌套的对象或数组。
  - 在浅克隆中，复制的结果仅包含原始对象或数组的引用，而不是深层的复制。因此，修改复制后的对象或数组的第一层结构可能会影响原始对象或数组。

```js
// 浅拷贝的实现;
function shallowCopy(object) {
  // 只拷贝对象
  if (!object || typeof object !== "object") return;

  // 根据 object 的类型判断是新建一个数组还是对象
  let newObject = Array.isArray(object) ? [] : {};

  // 遍历 object，并且判断是 object 的属性才拷贝
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }
  return newObject;
}


// 深拷贝的实现;
function deepCopy(object) {
  if (!object || typeof object !== "object") return object;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = deepCopy(object[key]);
    }
  }

  return newObject;
}
```

深拷贝函数，兼容循环引用

```js
function cloneDeep(source, hash = new WeakMap()) {
  if (typeof source != 'object' || !source) {
    return source
  }
  if (hash.has(source)) {
    // 新增代码，查哈希表
    return hash.get(source);
  }

  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值
  for (let key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      target[key] = cloneDeep(source[key], hash); // 传入哈希表
    }
  }
  return target;
}
```

## 前端图表框架如何保证流畅不卡顿的前提下动态显示2万个数据点的折线图？

### 数据降采样

数据降采样：对于如此大量的数据点，可以考虑在前端对数据进行降采样。通过**降低数据点的密度**，可以减少渲染和交互的计算量。可以使用聚合技术，例如在屏幕上显示每个像素对应的数据点的平均值或最大值。

下面是一种常见的降采样方法，流程如下：

1. 定义采样间隔：确定降采样的间隔，即保留数据点的频率。例如，可以设置每隔n个数据点采样一个数据点，其中n是一个整数。
2. 遍历数据数组：遍历原始数据数组，根据采样间隔选择要保留的数据点。可以使用循环或其他迭代方法来遍历数组。
3. 保留数据点：对于每个采样间隔，将对应的数据点添加到新的降采样数据数组中。
4. 可选的数据处理：在保留数据点之前，可以进行可选的数据处理，例如计算平均值、最大值或其他统计量。这可以进一步减少数据点的数量，并提供更平滑的视觉效果。
5. 使用降采样数据：将降采样后的数据数组用于渲染图表或进行其他操作。

```js
function downsampleData(originalData, interval) {
  const downsampledData = [];
  
  for (let i = 0; i < originalData.length; i += interval) {
    downsampledData.push(originalData[i]);
  }
  
  return downsampledData;
}

// 示例数据
const originalData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const interval = 2;

const downsampledData = downsampleData(originalData, interval);

console.log(downsampledData);
// 输出: [1, 3, 5, 7, 9]

/* 在这个示例中，原始数据是一个简单的数组 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]，采样间隔为2。
通过调用 downsampleData 函数，会返回降采样后的数据 [1, 3, 5, 7, 9]。 */
```

### Canvas 或 WebGL 渲染

考虑使用基于 Canvas 或 WebGL 的图表库，如 D3.js 的 Canvas 渲染器或其他专门为大数据量设计的库。这些库通常具有更高的渲染性能，并可以更好地处理大量数据点。

以下是一些流行的基于 Canvas 或 WebGL 的图表库：

- `D3.js`：D3.js 是一个功能强大的数据可视化库，可以创建各种类型的图表，包括折线图。它提供了 Canvas 渲染器，可以处理大量数据点，并具有丰富的交互和动画功能。
- `Chart.js`：Chart.js 是一个简单易用的图表库，支持多种图表类型，包括折线图。它通过 Canvas 渲染图表，提供了性能良好的大数据集渲染能力。
- `Three.js`：Three.js 是一个基于 WebGL 的 3D 图形库，虽然主要用于创建三维场景，但也可以用于绘制复杂的折线图。通过利用 WebGL 的硬件加速，Three.js 可以处理大规模数据集并提供流畅的渲染。
- `Pixi.js`：Pixi.js 是一个用于创建 2D 游戏和交互图形的 WebGL 渲染引擎。它提供了高性能的渲染能力，适用于大数据集的折线图。

### 数据分块加载

不要一次性加载并渲染所有的数据点，而是按需分块加载数据。根据视口或用户的交互，只加载当前需要显示的数据块，并在用户浏览或缩放时动态加载其他块。

### 避免冗余计算

通过缓存计算结果、避免重复计算或使用优化算法，减少不必要的计算和数据处理，以提高渲染速度。

### 硬件加速和性能优化

利用浏览器的硬件加速功能，例如使用 CSS 3D 变换、硬件加速的 CSS 属性，以提高渲染性能。优化代码和算法，使用合适的数据结构和算法，减少不必要的计算量。

### 使用 Web Workers

考虑使用 Web Workers 在后台线程中进行数据处理和计算，以避免主线程的阻塞，并提高渲染性能。
