# webpack

- [webpack](#webpack)
  - [1. 说一下 webpack 的工作流程以及简单分析构建后的 JS 产物怎么处理模块导入和依赖关系](#1-说一下-webpack-的工作流程以及简单分析构建后的-js-产物怎么处理模块导入和依赖关系)
  - [2. webpack有做过哪些优化/讲一下webpack的优化手段](#2-webpack有做过哪些优化讲一下webpack的优化手段)
  - [3. 代码量过大，使用 webpack 怎么优化](#3-代码量过大使用-webpack-怎么优化)
  - [4. tree shaking 怎么识别不需要的代码/webpack 的 treeshaking 是怎么抖掉不需要的代码的？](#4-tree-shaking-怎么识别不需要的代码webpack-的-treeshaking-是怎么抖掉不需要的代码的)
  - [5. webpack 解析 js 的中间产物是什么](#5-webpack-解析-js-的中间产物是什么)
  - [6. webpack 的 loader 和 plugin 是干什么的](#6-webpack-的-loader-和-plugin-是干什么的)
  - [7. 可以使用 plugin 代替 loader，如果可以，为什么要设置 loader？](#7-可以使用-plugin-代替-loader如果可以为什么要设置-loader)
  - [8. 有用过 webpack 的 external 字段吗](#8-有用过-webpack-的-external-字段吗)

## 1. 说一下 webpack 的工作流程以及简单分析构建后的 JS 产物怎么处理模块导入和依赖关系

工作流程：

1. 初始化参数  
    解析 `webpack` 配置参数，合并 `shell` 传入和 `webpack.config.js` 文件配置的参数，形成最后的配置结果。

2. 开始编译  
    上一步得到的参数初始化 `compiler` 对象，注册所有配置的插件，插件监听 `webpack` 构建生命周期的事件节点，做出相应的反应，执行 `compiler` 对象的 `run` 方法开始执行编译。

    > webpack 的实际入口是 Compiler 中的 run 方法，run 一旦执行后，就开始了编译和构建流程
    >
    > compiler.run 后首先会触发 compile(compilation) ，这一步会构建出 Compilation 对象：
    这个对象有两个作用 :
    >
    > - 一是负责组织整个打包过程，包含了每个构建环节及输出环节所对应的方法，可以从图中看到比较关键的步骤，如 `addEntry() , _addModuleChain() ,buildModule() , seal() , createChunkAssets()` (在每一个节点都会触发 webpack 事件去调用各插件)。
    > - 二是该对象内部存放着所有 `module` ，`chunk`，生成的 `asset` 以及用来生成最后打包文件的 `template` 的信息。

3. 确定入口  
    根据配置中的 `entry` 找出所有的入口文件。

    可以有多个入口，对应生成多个 `bundle`

    > 在创建 module 之前，Compiler 会触发 make，并调用 Compilation.addEntry 方法，通过 options 对象的 entry 字段找到我们的入口js文件。

4. 编译模块  
    从入口文件出发，开始解析文件，找出依赖，递归下去。**递归中**根据文件类型和 `loader` 配置，调用所有配置的 `loader` 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。

5. 完成模块编译  
    递归结束后，得到每个文件结果，包含每个模块以及他们之间的**依赖关系**。

    可以生成 `dependency graaph` （依赖图）

6. 输出资源  
    根据入口 `entry` 和配置模块之间的依赖关系，组装成一个个包含多个模块的 `chunk` ，再将每个 chunk 转换成一个单独的文件加入输出列表中。

7. 输出完成  
    输出所有的chunk到文件系统。

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

## 5. webpack 解析 js 的中间产物是什么

## 6. webpack 的 loader 和 plugin 是干什么的

- loader（加载器）  
  - webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析
- plugins（插件）  
  - 扩展 Webpack 的功能

## 7. 可以使用 plugin 代替 loader，如果可以，为什么要设置 loader？

不可以代替

## 8. 有用过 webpack 的 external 字段吗
