# webpack 概念

- [webpack 概念](#webpack-概念)
  - [概念](#概念)
  - [插件](#插件)
  - [模块](#模块)
  - [模块连结（看不懂）](#模块连结看不懂)
  - [依赖图(dependency graph)](#依赖图dependency-graph)
  - [target](#target)
  - [manifest](#manifest)
    - [runtime](#runtime)
    - [manifest 介绍](#manifest-介绍)
  - [模块热替换(hot module replacement)](#模块热替换hot-module-replacement)
    - [HMR的工作原理](#hmr的工作原理)
      - [在应用程序中](#在应用程序中)
      - [在 compiler 中](#在-compiler-中)
  - [Webpack 内部原理](#webpack-内部原理)
    - [主要部分](#主要部分)
    - [chunk](#chunk)
    - [output(输出)](#output输出)

## 概念

webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，**它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles**，它们均为静态资源，用于展示你的内容。

四个核心概念：入口(entry)，输出(output)，loader，插件(plugins)

1. 入口起点(entry)  
  指示 webpack 应该使用哪个模块，来作为构建其内部 **依赖图(dependency graph)** 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
2. 出口  
  output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
3. loader  
   webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。  
   loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
   示例：

    ```js
    module: {
        rules: [
          { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
    /*
    test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
    use 属性，表示进行转换时，应该使用哪个 loader。
    ps：在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules
    */
    ```

4. 插件  
   loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

**webpack 遵循 CommonJS 模块规范**，因此，你可以在配置中使用：

- 通过 require(...) 引入其他文件
- 通过 require(...) 使用 npm 下载的工具函数
- 使用 JavaScript 控制流表达式，例如 ?: 操作符
- 对 value 使用常量或变量赋值
- 编写并执行函数，生成部分配置

## 插件

**webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象。**

## 模块

在模块化编程中，开发者将程序分解为功能离散的 **chunk**，并称之为 模块。

名词解释：

- Module:
  - Module 是离散功能块，相比于完整程序提供了更小的接触面。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。
- Chunk:
  - 此 webpack 特定术语在内部用于管理捆绑过程。输出束（bundle）由 chunk 组成，其中有几种类型（例如 entry 和 child ）。通常，chunk 直接与 bundle 相对应，但是有些配置不会产生一对一的关系。
- Bundle：
  - 由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。
- Entry Point:
  - 入口起点告诉 webpack 从哪里开始，并遵循着依赖图知道要打包哪些文件。可以将应用程序的入口起点视为要捆绑的内容的 根上下文。

## 模块连结（看不懂）

多个独立的构建可以组成一个应用程序，这些独立的构建之间不应该存在依赖关系，因此可以单独开发和部署它们。

这通常被称作**微前端**，但并不仅限于此。

## 依赖图(dependency graph)

每当一个文件依赖另一个文件时，webpack 都会将文件视为直接存在 依赖关系。

- 当 webpack 处理应用程序时，它会根据命令行参数中或配置文件中定义的模块列表开始处理。
- **从 入口 开始，webpack 会递归的构建一个 依赖关系图，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为少量的 bundle（通常只有一个）可由浏览器加载**。

## target

由于 JavaScript 既可以编写服务端代码也可以编写浏览器代码，所以 webpack 提供了多种部署 target。

target 默认为取值为 web

例子：  
target 设置为 node，webpack 将在类 Node.js 环境编译代码。(使用 Node.js 的 require 加载 chunk，而不加载任何内置模块，如 fs 或 path)

```js
module.exports = {
  target: 'node',
};
```

## manifest

在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：

1. 你或你的团队编写的源码。
2. 你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
3. webpack 的 **runtime 和 manifest，管理所有模块的交互**。

### runtime

- runtime，以及伴随的 manifest 数据，主要是指：**在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码**。
- 它包含：**在模块交互时，连接模块所需的加载和解析逻辑**。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

### manifest 介绍

manifest 数据的含义是：当 compiler 开始执行、解析和映射应用程序时，保留的所有模块的详细要点。

webpack 通过 manifest 追踪所有模块到输出 bundle 之间的映射。

当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 `__webpack_require__` 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

个人理解：manifest 是保留模块间引用的数据，runtime 是通过 mainfest 连接模块的程序

## 模块热替换(hot module replacement)

模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面期间丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。

### HMR的工作原理

#### 在应用程序中

通过以下步骤，可以做到在应用程序中置换(swap in and out)模块：

1. 应用程序要求 HMR runtime 检查更新。
2. HMR runtime 异步地下载更新，然后通知应用程序。
3. 应用程序要求 HMR runtime 应用更新。
4. HMR runtime 同步地应用更新。

#### 在 compiler 中

除了普通资源，compiler 需要发出 "update"，将之前的版本更新到新的版本。"update" 由两部分组成：

1. 更新后的 manifest (JSON)
2. 一个或多个 updated chunk (JavaScript)
manifest 包括新的 compilation hash 和所有的 updated chunk 列表。每个 chunk 都包含着全部更新模块的最新代码（或一个 flag 用于表明此模块需要被移除）。

compiler 会确保在这些构建之间的模块 ID 和 chunk ID 保持一致。通常将这些 ID 存储在内存中（例如，使用 webpack-dev-server 时），但是也可能会将它们存储在一个 JSON 文件中。

## Webpack 内部原理

### 主要部分

项目中使用的每个文件都是一个 模块。

通过互相引用，模块之间会形成一个图(ModuleGraph)数据结构。

在打包过程中，模块会被合并成 chunk。 chunk 合并成 chunk 组，并形成一个通过模块互相连接的图(ModuleGraph)。

入口起点怎么通过 chunk 表示：在其内部，会创建一个只有一个 chunk 的 chunk 组。例子：

```js
module.exports = {
  entry: './index.js',
};
// 这会创建出一个名为 main 的 chunk 组（main 是入口起点的默认名称）。 此 chunk 组包含 ./index.js 模块。随着 parser 处理 ./index.js 内部的 import 时， 新模块就会被添加到此 chunk 中。
```

> 一个 chunk 组中可能有多个 chunk。例如，**SplitChunksPlugin** 会将一个 chunk 组拆分为一个或多个 chunk。

### chunk

chunk 有两种形式：

- **initial**(初始化) 是入口起点的 main chunk。此 chunk 包含为入口起点指定的所有模块及其依赖项。
- **non-initial** 是可以延迟加载的块。可能会出现在使用 动态导入(dynamic imports) 或者 SplitChunksPlugin 时。

每个 chunk 都有对应的 asset(资源)。资源，是指输出文件（即打包结果）。

```js
// webpack.config.js
module.exports = {
  entry: './src/index.jsx',
};

// ./src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

import('./app.jsx').then((App) => {
  ReactDOM.render(<App />, root);
});

/*
这会创建出一个名为 main 的 initial chunk。其中包含：
./src/index.jsx、
react、
react-dom、
以及除 ./app.jsx 外的所有依赖。
然后会为 ./app.jsx 创建 non-initial chunk，这是因为 ./app.jsx 是动态导入的。
*/
```

默认情况下，这些 non-initial chunk 没有名称，因此会使用唯一 ID 来替代名称。

### output(输出)

输出文件的名称会受配置中的两个字段的影响：

- output.filename - 用于 initial chunk 文件
- output.chunkFilename - 用于 non-initial chunk 文件
- 在某些情况下，使用 initial 和 non-initial 的 chunk 时，可以使用 output.filename。

这些字段中会有一些 占位符。常用的占位符如下：

- `[id]` - chunk id（例如 `[id].js -> 485.js`）
- `[name]` - chunk name（例如 `[name].js -> app.js`）。如果 chunk 没有名称，则会使用其 id 作为名称
- `[contenthash]` - 输出文件内容的 md4-hash（例如 `[contenthash].js -> 4ea6ff1de66c537eb9b2.js`）
