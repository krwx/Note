# webpack

- [webpack](#webpack)
  - [1. 说一下 webpack 的工作流程以及简单分析构建后的 JS 产物怎么处理模块导入和依赖关系](#1-说一下-webpack-的工作流程以及简单分析构建后的-js-产物怎么处理模块导入和依赖关系)
  - [2. webpack有做过哪些优化/讲一下webpack的优化手段](#2-webpack有做过哪些优化讲一下webpack的优化手段)
  - [3. 代码量过大，使用 webpack 怎么优化](#3-代码量过大使用-webpack-怎么优化)
  - [4. tree shaking 怎么识别不需要的代码/webpack 的 treeshaking 是怎么抖掉不需要的代码的？](#4-tree-shaking-怎么识别不需要的代码webpack-的-treeshaking-是怎么抖掉不需要的代码的)
  - [5. webpack 解析 js 的中间产物是什么](#5-webpack-解析-js-的中间产物是什么)
  - [6. webpack 的 loader 和 plugin 是干什么的](#6-webpack-的-loader-和-plugin-是干什么的)
  - [7. 可以使用 plugin 代替 loader，如果可以，为什么要设置 loader？](#7-可以使用-plugin-代替-loader如果可以为什么要设置-loader)
  - [8. 有用过 webpack 的 externals 字段吗](#8-有用过-webpack-的-externals-字段吗)
  - [9. dependency 和 dev-denpendency 的区别](#9-dependency-和-dev-denpendency-的区别)
  - [10. webpack 和 vite 构建的内容有什么区别](#10-webpack-和-vite-构建的内容有什么区别)
  - [11. 有使用过 vite 吗，说一下 vite 的原理](#11-有使用过-vite-吗说一下-vite-的原理)
  - [12. 说一下 vite 为什么编译速度快](#12-说一下-vite-为什么编译速度快)
  - [13. 图片优化有哪些方法](#13-图片优化有哪些方法)
  - [14. 有了解 http2 协议不能（还是能）使用雪碧图吗](#14-有了解-http2-协议不能还是能使用雪碧图吗)
  - [15. 了解 webpack 怎么对 chunk 分组吗？有实际使用过吗](#15-了解-webpack-怎么对-chunk-分组吗有实际使用过吗)

## 1. 说一下 webpack 的工作流程以及简单分析构建后的 JS 产物怎么处理模块导入和依赖关系

工作流程：

1. 初始化阶段：
   1. **初始化参数**：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
   2. **创建编译器对象**：用上一步得到的参数创建 `Compiler` 对象
   3. **初始化编译环境**：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
   4. **开始编译**：执行 `compiler` 对象的 `run` 方法
   5. **确定入口**：根据配置中的 `entry` 找出所有的入口文件，调用 `compilition.addEntry` 将入口文件转换为 `dependence` 对象
2. 构建阶段：
   1. **编译模块(make)**：根据 `entry` 对应的 `dependence` 创建 `module` 对象，调用 `loader` 将模块转译为标准 `JS` 内容，调用 `JS` 解释器将内容转换为 `AST` 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处
   2. **完成模块编译**：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 依赖关系图
3. 生成阶段：
   1. **输出资源(seal)**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
   2. **写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

***

构建后的 JS 产物怎么处理模块导入和依赖关系：

## 2. webpack有做过哪些优化/讲一下webpack的优化手段

同3

1. 善用alias。
   1. resolve里面有一个alias的配置项目，能够让开发者指定一些模块的引用路径。对一些经常要被import或者require的库，如react,我们最好可以直接指定它们的位置，这样webpack可以省下不少搜索硬盘的时间。

## 3. 代码量过大，使用 webpack 怎么优化

1. 优化构建配置
   1. 我会仔细审视项目的构建工具配置，比如 `Webpack` 或者 `Rollup` 的配置，以确保它们充分利用了缓存、使用了合适的加载器和插件等。通过调整构建配置，可以减少重复的工作，提高编译速度。
   2. 比如，利用 `babel-loader` 的缓存选项可以减少 `Babel` 的重复编译
2. 并行处理：
   1. 利用构建工具提供的并行处理功能，同时处理多个任务，可以加速编译过程。这在处理多个模块或多个入口文件时特别有效。
   2. 当项目中有多个入口文件需要编译时，可以使用 `Webpack` 的 `parallel-webpack` 插件来进行并行编译，提升构建速度。安装插件并配置如下：

      ```js
      const ParallelWebpack = require('parallel-webpack');
      module.exports = {
         // ...
         plugins: [
            new ParallelWebpack({
               // 配置选项
            }),
         ],
      };
      ```

3. 缓存利用
   1. 合理利用构建工具的缓存机制，避免重复的编译工作。缓存可以在后续的构建中复用之前已经编译过的结果，从而提高效率。
   2. Webpack会自动利用缓存来加速构建，但有时我们可以手动配置缓存。例如，使用`cache-loader` 可以将中间步骤的结果缓存起来，以便下次使用：
4. 预编译和预处理：
   1. 对于一些需要复杂处理的代码，可以考虑提前对其进行预编译或预处理，从而减少实际编译过程中的工作量。
   2. 在某个项目中，我们使用了大量的SVG图标。为了加快编译速度，我们可以使用`svgo-loader`预处理SVG文件

      ```js
      module: {
         rules: [
           {
             test: /\.svg$/,
             use: [
               'svg-sprite-loader',
               'svgo-loader', // 使用svgo预处理SVG
             ],
           },
         ],
       }
      ```

5. 使用优化工具
   1. 借助一些优化工具和插件，可以对代码进行压缩、去除无用代码等操作，从而减少编译产生的文件大小，提高加载速度。
   2. 在Vue项目中，通过使用vue-cli自带的压缩插件，我们可以对构建生成的代码进行压缩，减小文件大小：

      ```js
      // vue.config.js
       module.exports = {
         configureWebpack: {
           optimization: {
             minimize: true, // 使用优化工具进行压缩
           },
         },
       };
      ```

## 4. tree shaking 怎么识别不需要的代码/webpack 的 treeshaking 是怎么抖掉不需要的代码的？

Webpack 中，`Tree-shaking` 的实现一是先`「标记」`出模块导出值中哪些没有被用过，二是使用 `Terser` 删掉这些没被用到的导出语句。标记过程大致可划分为三个步骤：

- `Make` 阶段，收集模块导出变量并记录到模块依赖关系图 `ModuleGraph` 变量中
- `Seal` 阶段，遍历 `ModuleGraph` 标记模块导出变量有没有被使用
- 生成产物时，若变量没有被其它模块使用则删除对应的导出语句

## 5. webpack 解析 js 的中间产物是什么

chunk

## 6. webpack 的 loader 和 plugin 是干什么的

- loader（加载器）  
  - webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析
- plugins（插件）  
  - 扩展 Webpack 的功能

## 7. 可以使用 plugin 代替 loader，如果可以，为什么要设置 loader？

不可以代替

## 8. 有用过 webpack 的 externals 字段吗

`externals` 字段防止将某些 `import` 的包(`package`)打包到 `bundle` 中，而是在运行时(`runtime`)再去从外部获取这些扩展依赖(`external dependencies`)。

## 9. dependency 和 dev-denpendency 的区别

运行 `npm install` 会同时下载 `dependencies` 和 `devDependencies` 的包

官方解释：

- `"dependencies"`: Packages required by your application in production.
- `"devDependencies"`: Packages that are only needed for local development and testing.

对于开发网站或应用，差别不大，因为使用 `webpack` 打包会把 `js` 或 `ts` 文件引入的包都一起打包。

**它们的区别在发布一个 `npm package` 时出现**。发布包是不会把 `devDependencies` 的包打包进来，因为别的项目使用这个发布的包是不需要这个包开发或测试需要的包，只需要它生产环境下需要的包，即 `dependencies` 。

## 10. webpack 和 vite 构建的内容有什么区别

Webpack和Vite都是现代化的前端构建工具，他们的主要区别如下：

1. 构建原理不同：Webpack采用的是静态分析的方式对模块进行打包，需要在构建时将所有模块打包成一个或多个bundle.js文件，构建速度慢，而Vite则是基于原生ES模块的动态导入实现的，他不需要打包，而是在浏览器请求对应模块时，会即时地编译和执行对应的代码，构建速度较快。
2. 开发环境下的热更新不同：Webpack的热更新是使用HMR（热模块替换）技术实现的，在代码变化时，通过patch的方式更新对应的模块。而Vite的热更新则是通过WebSocket和浏览器原生API实现的，他能够更快地更新代码，并且支持更多的语言和框架。
3. 对TypeScript和CSS的支持不同：Webpack需要通过各种loader和plugin来支持TypeScript和CSS等文件的编译和打包，配置较为繁琐。而Vite则内置了对TypeScript和CSS等文件的支持，无需而外的配置。
4. 对开发服务器的支持不同：Webpack的开发服务器需要手动配置，而且需要重启服务器才能生效。而Vite的开发服务器内置了对HTTP2/2、HTTPS、代理等功能的支持，配置更加简单，并且支持快速的热更新。

vite 的介绍：

Vite 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于 **原生 ES 模块** 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。
- 一套构建指令，它使用 `Rollup` 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

## 11. 有使用过 vite 吗，说一下 vite 的原理

- 快速的冷启动: `No Bundle + esbuild` 预构建
- 即时的模块热更新: 基于 `ESM` 的 `HMR` ，同时利用浏览器缓存策略提升速度
- 真正的按需加载: 利用浏览器 `ESM` 支持，实现真正的按需加载

Vite其核心原理是：

- 利用浏览器现在已经支持 `ES6` 的 `import` ,碰见 `import` 就会发送一个 `HTTP` 请求去加载文件，
- `Vite` 启动一个 `koa` 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以 `ESM` 格式返回返回给浏览器。
- `Vite` 整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的 `webpack` 开发编译速度快出许多！

## 12. 说一下 vite 为什么编译速度快

使用了 esbuild

为什么用 esbuild：

- 编译运行 VS 解释运行
  - 大多数前端打包工具都是基于 `JavaScript` 实现的，大家都知道 `JavaScript` 是解释型语言，边运行边解释。而 `Esbuild` 则选择使用 `Go` 语言编写，该语言可以编译为原生代码,在编译的时候都将语言转为机器语言，在启动的时候直接执行即可，在 `CPU` 密集场景下， `Go` 更具性能优势。
- 多线程 VS 单线程
  - `JavaScript` 本质上是一门单线程语言，直到引入 `WebWorker` 之后才有可能在浏览器、`Node` 中实现多线程操作。就我对 `Webpack` 的源码理解，其源码也并未使用 `WebWorker` 提供的多线程能力。而 `GO` 天生的多线程优势。
  - 对构建流程进行了优化，充分利用 ``CPU`` 资源

## 13. 图片优化有哪些方法

1. base64
2. 雪碧图
3. 图片压缩 plugin：使用 `ImageMinimizerWebpackPlugin`：用来压缩图片的插件

## 14. 有了解 http2 协议不能（还是能）使用雪碧图吗

能，但是没有什么用。因为 http2 使用了多路复用的技术，所以相较于 http 1，下载很多个图片速度非常快，使用雪碧图来优化意义不大。

## 15. 了解 webpack 怎么对 chunk 分组吗？有实际使用过吗

Webpack 内部包含三种类型的 Chunk：

- `Initial Chunk`：基于 `Entry` 配置项生成的 `Chunk`
- `Async Chunk`：异步模块引用，如 `import(xxx)` 语句对应的异步 `Chunk`
- `Runtime Chunk`：只包含运行时代码的 `Chunk`

chunk 对象，默认的分包规则有：

- 同一个 `entry` 下触达到的模块组织成一个 `chunk`
- 异步模块单独组织为一个 `chunk`
- `entry.runtime` 单独组织成一个 `chunk`
