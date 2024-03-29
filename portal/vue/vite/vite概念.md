# 概念

- [概念](#概念)
  - [vite 核心原理](#vite-核心原理)
    - [介绍](#介绍)
      - [对比 webpack](#对比-webpack)
    - [前置知识](#前置知识)
      - [Esbuild](#esbuild)
      - [Rollup](#rollup)
    - [核心原理](#核心原理)
      - [基于ESM的Dev server](#基于esm的dev-server)
      - [基于ESM 的 HMR 热更新](#基于esm-的-hmr-热更新)
        - [对比 webpack](#对比-webpack-1)
        - [核心流程](#核心流程)
      - [为什么使用 Esbuild?](#为什么使用-esbuild)
    - [总结](#总结)
  - [Vite为什么比Webpack快](#vite为什么比webpack快)
    - [比较构建方式](#比较构建方式)
    - [比较热更新](#比较热更新)
    - [为什么在生产环境下 `Vite` 为什么不用 `ESBuild` 而是通过 `Rollup` 将代码打包](#为什么在生产环境下-vite-为什么不用-esbuild-而是通过-rollup-将代码打包)

## vite 核心原理

### 介绍

Vite是新一代的前端构建工具。Vite有如下特点：

- 快速的冷启动: `No Bundle + esbuild` 预构建
- 即时的模块热更新: 基于 `ESM` 的 `HMR` ，同时利用浏览器缓存策略提升速度
- 真正的按需加载: 利用浏览器 `ESM` 支持，实现真正的按需加载

#### 对比 webpack

Webpack在启动时，会先构建项目模块的依赖图，如果在项目中的某个地方改动了代码，Webpack则会对相关的依赖重新打包，随着项目的增大，其打包速度也会下降。

Vite相比于Webpack而言，没有打包的过程，而是直接启动了一个开发服务器devServer。Vite劫持浏览器的HTTP请求，在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再返回给浏览器(整个过程没有对文件进行打包编译)。所以编译速度很快。

### 前置知识

#### Esbuild

`Vite` 底层使用 `Esbuild` 实现对.``ts、jsx、.``js代码文件的**转化**，所以先看下什么是 `es-build`。

`Esbuild` 是一个 `JavaScript`` Bundler` 打包和压缩工具，它提供了与`Webpack、Rollup`等工具相似的资源打包能力。可以将`JavaScript` 和`TypeScript`代码打包分发在网页上运行。但其打包速度却是其他工具的10～100倍。

目前他支持以下的功能：

- 加载器
- 压缩
- 打包
- Tree shaking
- Source map生成

esbuild总共提供了四个函数：transform、build、buildSync、Service。

#### Rollup

在生产环境下， `Vite` 使用 `Rollup` 来进行打包

`Rollup` 是基于 `ESM` 的 `JavaScript` 打包工具。相比于其他打包工具如Webpack，他总是能打出更小、更快的包。因为 Rollup 基于 ESM 模块，比 Webpack 和 `Browserify` 使用的 `CommonJS` 模块机制更高效。Rollup的亮点在于同一个地方，一次性加载。能针对源码进行 `Tree Shaking`(去除那些已被定义但没被使用的代码)，以及 `Scope Hoisting` 以减小输出文件大小提升运行性能。

Rollup分为`build`（构建）阶段和`output generate`（输出生成）阶段。主要过程如下：

- 获取入口文件的内容，包装成module，生成抽象语法树
- 对入口文件抽象语法树进行依赖解析
- 生成最终代码
- 写入目标文件

如果你的项目（特别是类库）只有JavaScript，而没有其他的静态资源文件，使用Webpack就有点大才小用了。因为Webpack 打包的文件的体积略大，运行略慢，可读性略低。这时候Rollup也不失为一个好选择。

### 核心原理

Vite其核心原理是：

- 利用浏览器现在已经支持 `ES6` 的 `import` ,碰见 `import` 就会发送一个 `HTTP` 请求去加载文件，
- `Vite` 启动一个 `koa` 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以 `ESM` 格式返回返回给浏览器。
- `Vite` 整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的 `webpack` 开发编译速度快出许多！

#### 基于ESM的Dev server

在 `Vite` 出来之前，传统的打包工具如 `Webpack` 是先解析依赖、打包构建再启动开发服务器，`Dev Server` 必须等待所有模块构建完成，当我们修改了 `bundle` 模块中的一个子模块， 整个 `bundle` 文件都会重新打包然后输出。项目应用越大，启动时间越长。

而 `Vite` 利用浏览器对 `ESM` 的支持，当 `import` 模块时，浏览器就会下载被导入的模块。先启动开发服务器，当代码执行到模块加载时再请求对应模块的文件,本质上实现了动态加载。灰色部分是暂时没有用到的路由，所有这部分不会参与构建过程。随着项目里的应用越来越多，增加 `route` ，也不会影响其构建速度。

#### 基于ESM 的 HMR 热更新

实现原理：主要是通过 `WebSocket` 创建浏览器和服务器的通信监听文件的改变，当文件被修改时，服务端发送消息通知客户端修改相应的代码，客户端对应不同的文件进行不同的操作的更新。

##### 对比 webpack

- Webpack: 重新编译，请求变更后模块的代码，客户端重新加载
- Vite: 请求变更的模块，再重新加载

`Vite` 通过 `chokidar` 来监听文件系统的变更，只用对发生变更的模块重新加载， 只需要精确的使相关模块与其临近的 HMR边界连接失效即可，这样HMR 更新速度就不会因为应用体积的增加而变慢而 Webpack 还要经历一次打包构建。所以 HMR 场景下，Vite 表现也要好于 Webpack。

##### 核心流程

Vite整个热更新过程可以分成四步

- 创建一个 `websocket` 服务端和 `client` 文件，启动服务
- 通过 `chokidar` 监听文件变更
- 当代码变更后，服务端进行判断并推送到客户端
- 客户端根据推送的信息执行不同操作的更新

#### 为什么使用 Esbuild?

- 编译运行 VS 解释运行
  - 大多数前端打包工具都是基于 `JavaScript` 实现的，大家都知道 `JavaScript` 是解释型语言，边运行边解释。而 `Esbuild` 则选择使用 `Go` 语言编写，该语言可以编译为原生代码,在编译的时候都将语言转为机器语言，在启动的时候直接执行即可，在 `CPU` 密集场景下， `Go` 更具性能优势。
- 多线程 VS 单线程
  - `JavaScript` 本质上是一门单线程语言，直到引入 `WebWorker` 之后才有可能在浏览器、`Node` 中实现多线程操作。就我对 `Webpack` 的源码理解，其源码也并未使用 `WebWorker` 提供的多线程能力。而 `GO` 天生的多线程优势。
  - 对构建流程进行了优化，充分利用 ``CPU`` 资源

### 总结

最后总结下Vite相关的优缺点：

- 优点：
  - 快速的冷启动: 采用No Bundle和esbuild预构建，速度远快于Webpack
  - 高效的热更新：基于ESM实现，同时利用HTTP头来加速整个页面的重新加载，增加缓存策略
  - 真正的按需加载: 基于浏览器ESM的支持，实现真正的按需加载
- 缺点
  - 生态：目前Vite的生态不如Webapck，不过我觉得生态也只是时间上的问题。
  - 生产环境由于esbuild对css和代码分割不友好使用Rollup进行打包
  
## Vite为什么比Webpack快

### 比较构建方式

1、webpack

![webpack](./img/bundler.png)

当你使用 `Webpack` 打包一个项目时，通常会生成一个或多个 `bundle` 文件，这些文件包含了你的应用程序所需的所有代码、样式和资源。然后，你可以在 `HTML` 文件中通过 `<script>` 标签引入这些 `bundle` 文件，从而加载你的应用程序。但是随着项目规模的增大，通常会有更多的模块需要打包。`Webpack` 需要扫描整个项目的依赖图，并分析模块之间的依赖关系，这个过程会变得更加复杂和耗时。

2、vite

![vite](./img/esm.png)

我们通过上图，可以看到本地启动一个 `Vite` 项目时，和 `Webpack` 有一些不一样了， **`Server` 服务一开始就启动**，然后通过网络请求去加载对应了文件。 `Vite` 的构建特点，我们可以用下面几点来概括。

- **基于浏览器原生 ES 模块支持**：
  - Vite 利用了现代浏览器对 `ES` 模块（`ESM`）的原生支持，采用的是一种 `no bundle` 的策略，当使用 Vite 启动项目时，它会将每个模块都作为一个独立的文件提供给浏览器，而不需要像传统的打包工具（如 Webpack）那样先将模块打包成一个或多个 `bundle` 。这样一来，浏览器可以更快地加载和解析这些模块，从而实现了快速的冷启动速度。

- **即时编译（Instant Compilation）**：
  - Vite 采用了即时编译策略。**当浏览器请求一个模块时，Vite 会即时地将该模块编译成浏览器可执行的代码，并将编译结果缓存起来**（我们在node_modules下可以找到一个.vite文件）。
  - 下次再次请求同一模块时，Vite 可以直接返回缓存的编译结果，而不必重新编译，从而避免了冗余的编译过程，大大提高了启动速度。

- **esbuild预构建依赖**：
  - `Go` 语言编写的快速、轻量级的 `JavaScript/TypeScript` 构建工具，比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

### 比较热更新

1、webpack

`Webpack` 的热更新机制是通过 `webpack-dev-server` 提供的功能来实现的。`webpack-dev-server` 是一个开发服务器，用于在开发过程中提供快速的开发体验，包括热更新、自动刷新等功能。

`Webpack-dev-server` 的热更新机制是基于 `WebSocket` 技术实现的。当你启动 `webpack-dev-server` 时，它会创建一个 `WebSocket` 服务器，与浏览器端建立连接。然后，`webpack-dev-server` 会监视项目文件的变化，并将这些变化推送给浏览器端，浏览器端收到变化后会执行相应的更新操作，从而实现了热更新的效果。

具体来说，webpack-dev-server 的热更新机制包括以下几个步骤：

1. **创建 `WebSocket` 服务器**：`webpack-dev-server` 在启动时会创建一个 `WebSocket` 服务器，并与浏览器端建立连接。
2. **监听文件变化**：`webpack-dev-server` 会监听项目文件的变化，包括入口文件、模块文件、样式文件等。
3. **构建更新模块**：当文件发生变化时，`webpack-dev-server` 会重新构建变化的模块，并生成更新的代码。
4. **推送更新信息**：`webpack-dev-server` 将更新的模块信息通过 `WebSocket` 推送给浏览器端。
5. **浏览器端处理更新**：浏览器端接收到更新信息后，会根据更新的模块信息执行相应的更新操作，例如重新加载模块、更新页面内容等。

2、vite

`Vite` 也使用了 `WebSocket` 技术来实现与浏览器的通信。

当有模块变化时，`Vite` 会通过 `WebSocket` 将更新信息推送给浏览器端，从而触发浏览器端的模块重载。这样看起来，它和 `Webpack` 似乎没有什么不同，

但是根据 `Vite` 官网的说法，在 `Vite` 中，`HMR` 是在原生 `ESM` 上执行的。当编辑一个文件时，`Vite` 只需要精确地使已编辑的模块与其最近的 `HMR` 边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。

从官网的解释中我们可以理解为，Vite因为支持ESM的能力，使得它比Webpack拥有更小粒度的热更新能力。

### 为什么在生产环境下 `Vite` 为什么不用 `ESBuild` 而是通过 `Rollup` 将代码打包

1. 兼容性：
   1. 尽管现代浏览器对 ESM 模块有很好的支持，但在生产环境中仍然需要考虑到旧版浏览器的兼容性。为了确保应用在所有浏览器中都能正常运行，需要将 ESM 模块转换成兼容性更好的 JavaScript 代码，通常是通过打包工具进行转换和优化。
2. 性能优化：
   1. 在生产环境中，需要对代码进行一些性能优化，如代码压缩、合并、分割等，以减小代码体积、加快页面加载速度。通过打包工具，可以将多个模块合并成一个或多个 bundle，并对代码进行压缩和混淆，以减小文件体积。
3. 资源管理：
   1. 除了 JavaScript 代码外，现代的前端应用还包含许多其他类型的资源，如样式表、图片、字体等。打包工具可以帮助管理这些资源，将它们进行优化、压缩，并生成适当的 URL 地址，以便在生产环境中有效地加载和使用这些资源。
4. 部署和发布：
   1. 在生产环境中，需要将应用部署到服务器上，并且通常会对代码进行一些配置和优化。通过打包工具，可以方便地生成部署所需的静态文件，并进行一些配置，如路径设置、缓存控制等，以便于部署和发布应用。
