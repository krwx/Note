- [loader 原理](#loader-原理)
  - [loader 概念](#loader-概念)
  - [loader 执行顺序](#loader-执行顺序)
    - [inline loader](#inline-loader)
  - [开发一个 loader](#开发一个-loader)
    - [最简单的 loader](#最简单的-loader)
    - [loader 接受的参数](#loader-接受的参数)
  - [loader 分类](#loader-分类)
    - [1. 同步 loader](#1-同步-loader)
    - [2. 异步 loader](#2-异步-loader)
    - [3. Raw Loader](#3-raw-loader)
    - [4. Pitching Loader](#4-pitching-loader)
  - [loader API](#loader-api)
  - [手写 clean-log-loader](#手写-clean-log-loader)
  - [手写 banner-loader](#手写-banner-loader)
  - [手写简易的 babel-loader](#手写简易的-babel-loader)
  - [手写 file-loader](#手写-file-loader)
  - [手写简易的 style-loader](#手写简易的-style-loader)
    - [为什么需要 css-loader](#为什么需要-css-loader)
    - [为什么是一个 pitch loader](#为什么是一个-pitch-loader)
    - [为什么 pitch 方法使用 inline-loader](#为什么-pitch-方法使用-inline-loader)
- [Plugin 原理](#plugin-原理)
  - [Plugin 的作用](#plugin-的作用)
  - [Plugin 工作原理](#plugin-工作原理)
  - [Webpack 内部的钩子](#webpack-内部的钩子)
    - [什么是钩子](#什么是钩子)
    - [Tapable](#tapable)
  - [Plugin 构建对象](#plugin-构建对象)
    - [Compiler](#compiler)
    - [Compilation](#compilation)
    - [Compiler 和 Compilation 的关系](#compiler-和-compilation-的关系)
    - [生命周期简图](#生命周期简图)
  - [开发一个插件](#开发一个插件)
    - [最简单的插件](#最简单的插件)
    - [注册 hook](#注册-hook)
    - [启动调试](#启动调试)
  - [BannerWebpackPlugin](#bannerwebpackplugin)
  - [CleanWebpackPlugin](#cleanwebpackplugin)
  - [AnalyzeWebpackPlugin](#analyzewebpackplugin)
  - [InlineChunkWebpackPlugin](#inlinechunkwebpackplugin)

# loader 原理
## loader 概念
**帮助 webpack 将不同类型的文件转换为 webpack 可识别的模块。**

## loader 执行顺序
通过 `enforce` 属性指定顺序
1. 分类
   - pre： 前置 loader
   - normal： 普通 loader
   - inline： 内联 loader
   - post： 后置 loader
2. 执行顺序
   - 4 类 loader 的执行优级为：`pre > normal > inline > post` 。
   - 相同优先级的 loader 执行顺序为：`从右到左，从下到上`。

例如：
```js
// 此时loader执行顺序：loader3 - loader2 - loader1
module: {
  rules: [
    {
      test: /\.js$/,
      loader: "loader1",
    },
    {
      test: /\.js$/,
      loader: "loader2",
    },
    {
      test: /\.js$/,
      loader: "loader3",
    },
  ],
},
```
```js
// 此时loader执行顺序：loader1 - loader2 - loader3
module: {
  rules: [
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "loader1",
    },
    {
      // 没有enforce就是normal
      test: /\.js$/,
      loader: "loader2",
    },
    {
      enforce: "post",
      test: /\.js$/,
      loader: "loader3",
    },
  ],
},
```

3. 使用 loader 的方式
   - 配置方式：在 `webpack.config.js` 文件中指定 loader。（pre、normal、post loader）
   - 内联方式：在每个 `import` 语句中显式指定 loader。（inline loader）（**不推荐使用这种方式**）

### inline loader
通过例子说明，例子如下：

用法：`import Styles from 'style-loader!css-loader?modules!./styles.css';`

含义：
- 使用 `css-loader` 和 `style-loader` 处理 `styles.css` 文件
- 通过 `!` 将资源中的 loader 分开
- `css-loader?modules` 中的 ？后面代表传给 css-loader 的参数

`inline loader` 可以通过添加不同前缀，跳过其他类型 loader：
- `!` 跳过 normal loader。（即跳过 webpack.config.js 配置的 normal loader）
  - `import Styles from '!style-loader!css-loader?modules!./styles.css';`
- `-!` 跳过 pre 和 normal loader。
  - `import Styles from '-!style-loader!css-loader?modules!./styles.css';`
- `!!` 跳过 pre、 normal 和 post loader。
  - `import Styles from '!!style-loader!css-loader?modules!./styles.css';`

## 开发一个 loader
loader 就是一个函数。当webpack解析资源时，会调用相应的 loader 去处理。  
loader 接受到文件内容作为参数，返回内容出去
### 最简单的 loader
```js
// loaders/loader1.js
module.exports = function loader1(content) {
  console.log("hello loader");
  return content;
};
```
它接受要处理的源码作为参数，输出转换后的 js 代码。

### loader 接受的参数
- `content` 源文件的内容
- `map` SourceMap 数据
- `meta` 数据，可以是任何内容，可以是其他模块的数据

## loader 分类
### 1. 同步 loader
两种实现方式：
- 通过 `return` 返回处理过的内容
- 通过调用 `callback()` 返回处理过的内容，也可以一起返回错误信息、map 和 其他数据
```js
module.exports = function (content, map, meta) {
  return content;
};
```
`this.callback` 方法则更灵活，因为它允许传递多个参数，而不仅仅是 `content`。
```js
module.exports = function (content, map, meta) {
  // 传递map，让source-map不中断
  // 传递meta，让下一个loader接收到其他参数
  this.callback(null, content, map, meta);
};
```
同步 loader 中不能进行异步操作，例如 `setTimeout`

### 2. 异步 loader
```js
module.exports = function (content, map, meta) {
  // 这里是固定这样写的，通过 async() 获得异步返回内容的方法
  const callback = this.async();

  // 下面进行异步操作，这里的例子是 setTimeout，也可以是别的异步操作
  setTimeout(() => {
    // 在异步操作中，调用 callback ，返回处理过的内容
    callback(null, result, map, meta);
  }, 1000);
};
```
> 由于同步计算过于耗时，在 Node.js 这样的单线程环境下进行此操作并不是好的方案，我们建议尽可能地使你的 loader 异步化。但如果计算量很小，同步 loader 也是可以的。

### 3. Raw Loader
默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 raw 为 true，loader 可以接收原始的 Buffer。
```js
module.exports = function (content) {
  // content是一个Buffer数据
  return content;
};
module.exports.raw = true; // 开启 Raw Loader
```

### 4. Pitching Loader
通过给 `module.exports.pitch` 设置一个方法，实现 `pitch loader`。`pitch loader` 也是会导出一个正常处理内容的方法
```js
module.exports = function (content) {
  return content;
};
// remainingRequest 是剩下还需要处理的loader
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log("do somethings");

  // 如果这里返回了值，不管值是什么，只要返回了值，那么就会发生阻断
  // return "result";
};
```

webpack 会先从左到右执行 loader 链中的每个 loader 上的 pitch 方法（如果有），然后再从右到左执行 loader 链中的每个 loader 上的普通 loader 方法。

![loader执行流程](./img/loader1.png)

在这个过程中如果任何 pitch 有返回值，则 loader 链被阻断。webpack 会跳过后面所有的的 pitch 和 loader，直接进入上一个 loader 。

![loader执行流程](./img/loader2.png)

## loader API

| 方法名                  | 含义                                       | 用法                                           |
| ----------------------- | ------------------------------------------ | ---------------------------------------------- |
| this.async              | 异步回调 loader。返回 this.callback        | const callback = this.async()                  |
| this.callback           | 可以同步或者异步调用的并返回多个结果的函数 | this.callback(err, content, sourceMap?, meta?) |
| this.getOptions(schema) | 获取 loader 的 options，接受一个可选的 JSON schema 作为参数                     | this.getOptions(schema)                        |
| this.emitFile           | 产生一个文件                               | this.emitFile(name, content, sourceMap) name：输出的文件的名称；content：输出的文件的内容       |
| this.utils.contextify   | 返回一个相对路径                           | this.utils.contextify(context, request)        |
| this.utils.absolutify   | 返回一个绝对路径                           | this.utils.absolutify(context, request)        |

> 更多文档，请查阅 [webpack 官方 loader api 文档](https://webpack.docschina.org/api/loaders/#the-loader-context)

## 手写 clean-log-loader
作用：用来清理 js 代码中的 `console.log`
```js
// loaders/clean-log-loader.js
module.exports = function cleanLogLoader(content) {
  // 将console.log替换为空
  return content.replace(/console\.log\(.*\);?/g, "");
};
```

## 手写 banner-loader
作用：给 js 代码添加文本注释，即给 js 代码添加内容  
为什么写这个 loader：个人理解是作为使用 `getOptions()` 的例子，实际开发不需要。  

只能在开发模式下用，生产模式下代码会进行压缩，添加的注释可能没用。
- loaders/banner-loader/index.js

```js
// 获取 schema ，在 ./schema.json 文件定义了
const schema = require("./schema.json");

module.exports = function (content) {
  // 获取 loader 的 options ，同时对 options 内容进行校验
  // schema 是 options 的校验规则（符合 JSON schema 规则）
  const options = this.getOptions(schema);

  const prefix = `
    /*
    * Author: ${options.author}
    */
  `;
  return `${prefix} \n ${content}`;
};
```
- loaders/banner-loader/schema.json
```json
// 这里定义了 loader 的 options 的校验规则
{
  // 定义类型
  "type": "object",
  // 定义参数
  "properties": {
    "author": {
      "type": "string"
    }
  },
  // additionalProperties 属性代表这个 object 不接收其他参数的定义，只有以上定义的参数。true 代表可以追加其他参数
  "additionalProperties": false
}
```
- webpack.config.js
```js
      {
        test: /\.js$/,
        loader: "./loaders/banner-loader",
        // getOptions() 就是取 options 定义的数据
        options: {
          author: "老王",
        },
      },
```

## 手写简易的 babel-loader
作用：模拟 `babel-loader` 。编译 js 代码，将 ES6+语法编译成 ES5-语法。  

通过 `@babel/core` 库实现，调用 `transform()` 方法编译代码，该方法为异步方法，所以 `loader` 是一个异步 `loader` ，返回编译好的内容需要 `async()` 方法返回

- 下载依赖
```
npm i @babel/core @babel/preset-env -D
```
- loaders/babel-loader/index.js
```js
const schema = require("./schema.json");
// 引用 babel
const babel = require("@babel/core");

module.exports = function (content) {
  const options = this.getOptions(schema);
  // 使用异步loader
  const callback = this.async();
  // 使用 babel 对 js 代码进行编译
  // content 为代码，options 为 babel 的预设参数
  babel.transform(content, options, function (err, result) {
    if (err) callback(err);
    else callback(null, result.code);
  });
};
```
- loaders/banner-loader/schema.json
```json
{
  "type": "object",
  "properties": {
    "presets": {
      "type": "array"
    }
  },
  "additionalProperties": true
}
```
- webpack.config.js
```js
      {
        test: /\.js$/,
        loader: "./loaders/babel-loader",
        // 设置 babel 预设的参数
        options: {
          presets: ["@babel/preset-env"],
        },
      },
```

## 手写 file-loader
作用：将文件原封不动输出出去，改变文件的名称，添加 hash 值

步骤：
1. 生成 `raw loader`。因为文件格式需要接收 `Buffer` 数据
   1. 设置 `loader.raw` 为 `true`
2. 生成带 `hash` 的文件名称，通过 `loader-utils` 的 `interpolateName` 方法实现（在 webpack github 可以查看用法）。
   ```js
    const interpolatedName = loaderUtils.interpolateName(
        loaderContext, // this 指针
        name, // 是一个模板，可以设置 [name] [hash] 等等
        options  // 通过 content 属性设置文件内容
    );
   ```
3. 输出文件，通过 `emitFile()` 实现。输出文件，不然输出文件夹没有对应的文件
4. 返回：`module.exports = "文件路径（文件名）"` 
5. 因为 webpack 本身也会处理图片，会输出图片，这样会多输出一份图片，需要禁止该行为，通过在 `loader` 里面 `type: "javascript/auto"` 实现
   1. 官方解释：当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。

配置：
- loaders/file-loader.js
```js
const loaderUtils = require("loader-utils");

module.exports = function (content) {
  // 1. 根据文件内容生成带hash值文件名
  let interpolatedName = loaderUtils.interpolateName(this, "[hash].[ext][query]", {
    content,
  });
  // interpolatedName = `${interpolatedName}`
  // 可以在文件名中设置文件路径
  interpolatedName = `images/${interpolatedName}`
  // 2. 将文件输出出去
  this.emitFile(interpolatedName, content);
  // 3. 返回：module.exports = "文件路径（文件名）"
  return `module.exports = "${interpolatedName}"`;
};

// 需要处理图片、字体等文件。它们都是buffer数据
// 需要使用raw loader才能处理
module.exports.raw = true;
```
- loader 配置
```js
{
  test: /\.(png|jpe?g|gif)$/,
  loader: "./loaders/file-loader.js",
  type: "javascript/auto", // 解决图片重复打包问题
},
```

## 手写简易的 style-loader
作用：模拟 `style-loader` 。动态创建 `style` 标签，插入 js 中的样式代码，使样式生效。将 `style` 标签插入到 `head` 标签中

为什么写这个 loader：介绍 `pitch loader` 的实现方式

### 为什么需要 css-loader
1. 直接使用style-loader，**只能处理样式不能处理样式中引入的其他资源**  
    - `use: ["./loaders/style-loader"],`
2. 借助css-loader解决样式中引入的其他资源的问题
    - `use: ["./loaders/style-loader", "css-loader"],`

### 为什么是一个 pitch loader
`css-loader` 暴露了一段js代码，`style-loader` 需要执行 `js` 代码，得到返回值，再动态创建 `style` 标签，插入到页面上。这样不好操作。

所以在 `pitch` 方法内进行操作。因为 `pitch` 方法可以获取剩余的 `loader` ，可以再获取这些 `loader` 处理 `css` 后的内容（通过 `inline-loader` 实现）

### 为什么 pitch 方法使用 inline-loader
通过 `inline-loader` 获取 `css-loader` 处理好的 `css` 文件（这里不是 `js` 代码了）

1. 通过 `remainingRequest` 参数获取剩下还需要处理的 `loader` ，这个值是一个类似 `inline-loader` 的绝对路径
2. 将绝对路径转换为相对路径，这样才能解析 `loader` 。通过 `loader` 自带的 `utils.contextify()` 将绝对路径转为相对路径
3. `import` 这个相对路径，那么就会自动让剩下的 `loader` 解析 `css` 文件。**但是我们要在相对路径前加上 `!! `，阻止其他 `webpack` 设置的 `loader` 解析**。
4. 返回脚本。这样会发生熔断，后面的 `loader` 就不再执行

```js
module.exports = function (content) {};

module.exports.pitch = function (remainingRequest) {
  // remainingRequest 剩下还需要处理的loader
  // console.log(remainingRequest); // C:\Users\86176\Desktop\webpack\source\node_modules\css-loader\dist\cjs.js!C:\Users\86176\Desktop\webpack\source\src\css\index.css

  // 1. 将 remainingRequest 中绝对路径改成相对路径（因为后面只能使用相对路径操作）
  const relativePath = remainingRequest
    .split("!")
    .map((absolutePath) => {
      // 返回相对路径
      return this.utils.contextify(this.context, absolutePath);
    })
    .join("!");

  // console.log(relativePath); // ../../node_modules/css-loader/dist/cjs.js!./index.css

  // 2. 引入css-loader处理后的资源
  // 3. 创建style，将内容插入页面中生效
  const script = `
    import style from "!!${relativePath}";
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
  `;

  // 中止后面loader执行
  return script;
};
```


# Plugin 原理
## Plugin 的作用
通过插件我们可以扩展 webpack，加入自定义的构建行为，使 webpack 可以执行更广泛的任务，拥有更强的构建能力。

## Plugin 工作原理
> webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。
>
> 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。
> 
> webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。
> ——「深入浅出 Webpack」

站在代码逻辑的角度就是：webpack 在编译代码过程中，会触发一系列 `Tapable` 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。

## Webpack 内部的钩子
### 什么是钩子
钩子的本质就是：**事件**。为了方便我们直接介入和控制编译过程，webpack 把编译过程中触发的各类关键事件封装成事件接口暴露了出来。这些接口被很形象地称做：`hooks`（钩子）。开发插件，离不开这些钩子。

### Tapable
`Tapable` 为 webpack 提供了统一的插件接口（钩子）类型定义，它是 webpack 的核心功能库。webpack 中目前有十种 `hooks`，在 `Tapable` 源码中可以看到，他们是：

```js
// https://github.com/webpack/tapable/blob/master/lib/index.js
exports.SyncHook = require("./SyncHook");
exports.SyncBailHook = require("./SyncBailHook");
exports.SyncWaterfallHook = require("./SyncWaterfallHook");
exports.SyncLoopHook = require("./SyncLoopHook");
exports.AsyncParallelHook = require("./AsyncParallelHook");
exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
exports.AsyncSeriesHook = require("./AsyncSeriesHook");
exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
exports.AsyncSeriesWaterfallHook = require("./AsyncSeriesWaterfallHook");
exports.HookMap = require("./HookMap");
exports.MultiHook = require("./MultiHook");
```

类型：
- `Sync` 代表同步钩子
- `AsyncSeries` 代表异步串行钩子，特点就是**异步任务顺序执行**
  - 如果同时注册多个异步的钩子，会按照从上到下的顺序执行钩子，当异步钩子的异步操作处理完成后才继续执行下一个异步钩子
- `AsyncParallel`, 也就是异步并行钩子, 特点就是**异步任务同时执行**

`Tapable` 还统一暴露了三个方法给插件，用于注入不同类型的自定义构建行为：
- `tap`：可以注册同步钩子和异步钩子。
  - 注册异步钩子时可以使用 `tap`，但是里面不能执行异步操作，只能执行同步操作
- `tapAsync`：回调方式注册异步钩子。
  - 回调函数会有两个参数，第二个参数是 callback()。
  - 在异步操作中，只有执行 callback() 才会继续往下走
  ```js
    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin emit 222");
        callback();
      }, 2000);
    });
  ```
- `tapPromise`：`Promise` 方式注册异步钩子。
  - 需要返回一个 `Promise` 对象。在异步操作中调用 `resolve()` 继续往下走
  ```js
    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("TestPlugin emit 333");
          resolve();
        }, 1000);
      });
    });
  ```
注册钩子需要提供两个参数。第一个参数是插件的名称，第二个参数是需要执行的回调函数。

回调函数
- 如果是 `tapAsync` ，有两个参数。第一个参数是 `compilation` 对象，第二个参数是 `callback()`
- 如果是 `tapPromise`，只有一个参数，就是 `compilation` 对象
- 通过 `compilation` 对象可以注册 `compilation` 相关的钩子。
  ```js
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      // 这里注册了 compilation 的 seal 钩子
      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("TestPlugin seal");
      });
    });
  ```

## Plugin 构建对象
### Compiler
compiler 对象中保存着完整的 Webpack 环境配置，每次启动 webpack 构建时它都是一个独一无二，仅仅会创建一次的对象。

这个对象会在首次启动 Webpack 时创建，我们可以通过 compiler 对象上访问到 Webapck 的主环境配置，比如 loader 、 plugin 等等配置信息。

它有以下主要属性：
- `compiler.options` 可以访问本次启动 webpack 时候所有的配置文件，包括但不限于 loaders 、 entry 、 output 、 plugin 等等完整配置信息。
- `compiler.inputFileSystem` 和 `compiler.outputFileSystem` 可以进行文件操作，相当于 Nodejs 中 fs。
- `compiler.hooks` 可以注册 tapable 的不同种类 Hook，从而可以在 compiler 生命周期中植入不同的逻辑。

> [compiler hooks 文档](https://webpack.docschina.org/api/compiler-hooks/)

### Compilation
compilation 对象代表一次资源的构建，compilation 实例能够访问所有的模块和它们的依赖。

一个 compilation 对象会对构建依赖图中所有模块，进行编译。 **在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)**。

它有以下主要属性：
- `compilation.modules` 可以访问所有模块，打包的每一个文件都是一个模块。
- `compilation.chunks` chunk 即是多个 modules 组成而来的一个代码块。入口文件引入的资源组成一个 chunk，通过代码分割的模块又是另外的 chunk。
- `compilation.assets` 可以访问本次打包生成所有文件的结果。
- `compilation.hooks` 可以注册 tapable 的不同种类 Hook，用于在 compilation 编译模块阶段进行逻辑添加以及修改。

> [compilation hooks 文档](https://webpack.docschina.org/api/compilation-hooks/)

### Compiler 和 Compilation 的关系
`webpack` 开始工作时会创建 `Compiler` 对象，然后执行具体的各个阶段时，会创建 `Compilation` 对象进行处理。每一次对资源进行处理都会创建 `compilation` 对象

### 生命周期简图
![Webpack 插件生命周期](./img/plugin.jpg)

## 开发一个插件
插件是一个类（class）

### 最简单的插件
**webpack的大概工作流程**：
1. `webpack` 加载 `webpack.config.js` 中所有配置，此时就会 `new TestPlugin()` , 执行插件的 `constructor`
2. `webpack` 创建 `compiler` 对象
3. 遍历所有 `plugins` 中插件，调用插件的 `apply` 方法
4. 执行剩下编译流程（触发各个 `hooks` 事件）

```js
class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor()");
  }
  apply(compiler) {
    console.log("TestPlugin apply()");
  }
}

module.exports = TestPlugin;
```

### 注册 hook
在 `apply` 方法里面通过 `compiler` 对象注册 `hook`   

`compilation hooks` 需要在 `compilation hooks` 触发前的 `compiler hook` 注册才能使用

```js
class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor");
  }

  apply(compiler) {
    // 由文档可知，environment是同步钩子，所以需要使用tap注册
    compiler.hooks.environment.tap("TestPlugin", () => {
      console.log("TestPlugin environment");
    });

    // 由文档可知，emit是异步串行钩子 AsyncSeriesHook
    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      console.log("TestPlugin emit 111");
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin emit 222");
        callback();
      }, 2000);
    });

    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("TestPlugin emit 333");
          resolve();
        }, 1000);
      });
    });

    // 由文档可知，make是异步并行钩子 AsyncParallelHook
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      // 需要在compilation hooks触发前注册才能使用
      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("TestPlugin seal");
      });

      setTimeout(() => {
        console.log("TestPlugin make 111");
        callback();
      }, 3000);
    });

    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make 222");
        callback();
      }, 1000);
    });
  }
}

module.exports = TestPlugin;
```

### 启动调试
通过调试查看 `compiler` 和 `compilation` 对象数据情况。
1. package.json 配置指令
```json
{
  "scripts": {
    "debug": "node --inspect-brk ./node_modules/webpack-cli/bin/cli.js"
  },
}
```
2. 运行指令
```
npm run debug
```
3. 打开 Chrome 浏览器，F12 打开浏览器调试控制台。  
此时控制台会显示一个绿色的图标
4. 点击绿色的图标进入调试模式。
5. 在需要调试代码处用 `debugger` 打断点，代码就会停止运行，从而调试查看数据情况。

## BannerWebpackPlugin
1. 作用：给打包输出文件添加注释。生产模式和开发模式都能使用
2. 开发思路:
   - 需要打包输出前添加注释：需要使用 `compiler.hooks.emit` 钩子, 它是打包输出前触发。
   - 如何获取打包输出的资源？`compilation.assets` 可以获取所有即将输出的资源文件。
3. 实现：
   1. 注册 `compiler` 的 `emit` 钩子
   2. 过滤 `compilation.assets` ，只保留 js 和 css 文件
   3. 通过 `compilation.assets[key].source()` 获取文件资源
   4. 通过设置 `compilation.assets[key]` 一个新的对象，设置 `source()` 和 `size()` 返回的值来修改输出的文件的内容
```js
class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // 在资源输出之前触发
    compiler.hooks.emit.tap("BannerWebpackPlugin", (compilation) => {
      // debugger;
      const extensions = ["css", "js"];
      // 1. 获取即将输出的资源文件：compilation.assets
      // 2. 过滤只保留js和css资源
      const assets = Object.keys(compilation.assets).filter((assetPath) => {
        // 将文件名切割 ['xxxx', 'js'] ['xxxx', 'css']
        const splitted = assetPath.split(".");
        // 获取最后一个文件扩展名
        const extension = splitted[splitted.length - 1];
        // 判断是否保护
        return extensions.includes(extension);
      });

      const prefix = `/*
* Author: ${this.options.author}
*/
`;
      // 3. 遍历剩下资源添加上注释
      // console.log(assets);
      assets.forEach((asset) => {
        // 获取原来内容
        const source = compilation.assets[asset].source();
        // 拼接上注释
        const content = prefix + source;

        // 修改资源
        compilation.assets[asset] = {
          // 最终资源输出时，调用source方法，source方法的返回值就是资源的具体内容
          source() {
            return content;
          },
          // 资源大小
          size() {
            return content.length;
          },
        };
      });
    });
  }
}
module.exports = BannerWebpackPlugin;
```

## CleanWebpackPlugin
1. 作用：在 webpack 打包输出前将上次打包内容清空。
2. 开发思路：
- 如何在打包输出前执行？需要使用 `compiler.hooks.emit` 钩子, 它是打包输出前触发。
- 如何清空上次打包内容？
  - 获取打包输出目录：通过 compiler 对象。
  - 通过文件操作清空内容：通过 `compiler.outputFileSystem` 操作文件。
3. 实现：
```js
class CleanWebpackPlugin {
  apply(compiler) {
    // 获取操作文件的对象
    const fs = compiler.outputFileSystem;
    // emit是异步串行钩子
    compiler.hooks.emit.tapAsync("CleanWebpackPlugin", (compilation, callback) => {
      // 获取输出文件目录
      const outputPath = compiler.options.output.path;
      // 删除目录所有文件
      const err = this.removeFiles(fs, outputPath);
      // 执行成功err为undefined，执行失败err就是错误原因
      callback(err);
    });
  }

  removeFiles(fs, path) {
    try {
      // 读取当前目录下所有文件
      const files = fs.readdirSync(path);

      // 遍历文件，删除
      files.forEach((file) => {
        // 获取文件完整路径
        const filePath = `${path}/${file}`;
        // 分析文件
        const fileStat = fs.statSync(filePath);
        // 判断是否是文件夹
        if (fileStat.isDirectory()) {
          // 是文件夹需要递归遍历删除下面所有文件
          this.removeFiles(fs, filePath);
        } else {
          // 不是文件夹就是文件，直接删除
          fs.unlinkSync(filePath);
        }
      });

      // 最后删除当前目录
      fs.rmdirSync(path);
    } catch (e) {
      // 将产生的错误返回出去
      return e;
    }
  }
}
module.exports = CleanWebpackPlugin;
```

## AnalyzeWebpackPlugin
1. 作用：分析 webpack 打包资源大小，并输出分析文件。
2. 开发思路:
   - 在哪做? `compiler.hooks.emit`, 它是在打包输出前触发，我们需要分析资源大小同时添加上分析后的 md 文件。
3. 实现：
```js
class AnalyzeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
      // 1. 遍历所有即将输出文件，得到其大小
      /*
        将对象变成一个二维数组：
          对象：
            {
              key1: value1,
              key2: value2 
            }
          二维数组：
            [
              [key1, value1],
              [key2, value2]
            ]
      */
      const assets = Object.entries(compilation.assets);

      /*
          md中表格语法：
            | 资源名称 | 资源大小 |
            | --- | --- |
            | xxx.js | 10kb |
      */
      let content = `| 资源名称 | 资源大小 |
| --- | --- |`;

      assets.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${Math.ceil(file.size() / 1024)}kb |`;
      });

      // 2. 生成一个md文件
      compilation.assets["analyze.md"] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}
module.exports = AnalyzeWebpackPlugin;
```

## InlineChunkWebpackPlugin
1. 作用： `webpack` 打包生成的 `runtime` 文件太小了，额外发送请求性能不好，所以需要将其内联到 js 中，从而减少请求数量。
2. 开发思路:
   - 我们需要借助 `html-webpack-plugin` 来实现
     - 在 `html-webpack-plugin` 输出 `index.html` 前将内联 `runtime` 注入进去
     - 删除多余的 `runtime` 文件
   - 如何操作 `html-webpack-plugin`？[官方文档](https://github.com/jantimon/html-webpack-plugin/#afteremit-hook)
3. 实现：
```js
// webpack.config.js
  plugins: [
    // 通过选项配置
    new InlineChunkWebpackPlugin([/runtime(.*)\.js/]),
  ],

// plugins/inline-chunk-webpack-plugin.js
const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");

class InlineChunkWebpackPlugin {
  constructor(tests) {
    this.tests = tests;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InlineChunkWebpackPlugin", (compilation) => {
      // 1. 获取html-webpack-plugin的hooks
      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      // 2. 注册 html-webpack-plugin的hooks -> alterAssetTagGroups
      hooks.alterAssetTagGroups.tap("InlineChunkWebpackPlugin", (assets) => {
        // 3. 从里面将script的runtime文件，变成inline script
        assets.headTags = this.getInlineChunk(assets.headTags, compilation.assets);
        assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation.assets);
      });

      // 删除runtime文件
      hooks.afterEmit.tap("InlineChunkWebpackPlugin", () => {
        // 3. 从里面将script的runtime文件，变成inline script
        Object.keys(compilation.assets).forEach((filepath) => {
          if (this.tests.some((test) => test.test(filepath))) {
            delete compilation.assets[filepath];
          }
        });
      });
    });
  }

  getInlineChunk(tags, assets) {
    /*
      目前：[
        {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-webpack-plugin' },
          attributes: { defer: true, type: undefined, src: 'js/runtime~main.js.js' }
        },
      ]

      修改为：
        [
          {
            tagName: 'script',
            innerHTML: runtime文件的内容
            closeTag: true 
          },
        ]
    */

    return tags.map((tag) => {
      if (tag.tagName !== "script") return tag;
      // 获取文件资源路径
      const filepath = tag.attributes.src;
      if (!filepath) return tag;

      if (!this.tests.some((test) => test.test(filepath))) return tag;

      return {
        tagName: "script",
        innerHTML: assets[filepath].source(),
        closeTag: true,
      };
    });
  }
}

module.exports = InlineChunkWebpackPlugin;
```
