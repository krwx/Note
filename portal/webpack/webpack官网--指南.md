# 指南

- [指南](#指南)
  - [起步](#起步)
  - [管理输出](#管理输出)
  - [开发](#开发)
  - [热替换](#热替换)
  - [tree shaking](#tree-shaking)
  - [生产环境构建](#生产环境构建)
  - [代码分离](#代码分离)
  - [懒加载](#懒加载)
  - [缓存](#缓存)
  - [创建library](#创建library)

## 起步

1. Node.js Path 模块
    1. 提供了一些用于处理文件路径的小工具，可以通过以下方式引入该模块：
      var path = require("path")
    2. 方法
       1. `path.normalize(p)`  
        规范化路径
       2. `path.join([path1][, path2][, ...])`  
        用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
       3. `path.resolve([from ...], to)`  
        将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径
2. __dirname  
node 环境下的全局内置变量。表示当前文件所在文件夹的绝对路径
3. webpack --config webpack.config.js  
如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。

## 管理输出

1. 有多个输入，设置输出

    ```js
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
    // [name].bundle.js 的 name 代表 js文件的文件名
    ```

2. HtmlWebpackPlugin  
    不知道干啥用  
    HtmlWebpackPlugin 会默认生成 index.html 文件。所有的 bundle 会自动添加到 html 中。
3. 清除上次构建的文件
    1. v4版本  
    CleanWebpackPlugin  
    使用：

        ```js
          // 引用
          const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
    
          // 插件定义
          plugins:[  
            new CleanWebpackPlugin(), // 不传参数，默认清除dist文件夹内的文件
          ],   
        ```

    2. v5版本  
      output{
        clean: true
      }

## 开发

1. sourceMap
    1. 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，
    而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。
    如果一个错误来自于 b.js，source map 就会明确的告诉你。
    2. 配置
      devtool: 'inline-source-map',
      在devtool字段指明sourceMap的类型，这里配置inline-source-map。除此之外，还有多种类型的sourceMap。
2. 帮助代码发生变化后自动编译代码  
    三种选项：webpack's Watch Mode、webpack-dev-server(常用)、webpack-dev-middleware
3. 观察模式  
    脚本：webpack --watch  
    如果其中一个文件被更新，代码将被重新编译。唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。
4. webpack-dev-server
    1. 提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
    脚本：webpack-dev-server --open
    配置：

        ```js
        devServer: {
            static: [
                {
                    directory: './dist' // 告诉开发服务器(dev server)，在哪里查找文件
                }
            ]
        },
        // 教程的contentBase是旧版本的，新版本要配置在static.directory
        ```

5. webpack-dev-middleware
    1. webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，
      以便进行更多自定义设置来实现更多的需求。webpack-dev-middleware 可以配合 express server 使用。
    2. 与 webpack-dev-server 的区别
      webpack-dev-middleware是一个包，不具备代码发生变化后自动编译代码的功能，但是可以和别的server配合使用来实现该效果

## 热替换

1. 使用  

    ```js
    devServer: {
      hot: true
    }
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
    ```

2. 判断模块是否热替换了
    1. 判断 module.hot ，知道是否热替换
    2. 当某个文件热替换了，做操作
      module.hot.accept([filename], () => {})
3. 重新获取渲染元素
    1. 通常使用loader，有多种loader，包括vue、react的
    2. 现象：热替换后，原来的元素还绑定着旧的函数，需要重新渲染元素，绑定新的函数。在accept()的第二个参数内实现
4. NamedModulesPlugin已废弃  
    使用  optimization: { moduleIds: 'named' }  
    不知道干啥用

## tree shaking

1. 概念  
    通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)
2. 副作用
    1. 定义  
      在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。
    2. 使用  
      "sideEffects": false。所有的文件都没有副作用，可以删掉未引用的代码
    3. 定义不需要删除未引用代码的文件  
      "sideEffects": [
        "./src/some-side-effectful-file.js",
        "*.css"
      ]
3. 压缩代码  
    设置生产模式。  mode: "production"  
    内部使用 uglifyjs 压缩插件来压缩代码

## 生产环境构建

1. 使用uglifyjs插件  
    首先下载包：npm install uglifyjs-webpack-plugin --save  
    声明插件：

    ```js
    plugins: [
        new UglifyJSPlugin()
      ]
    ```

    脚本：--optimize-minimize 标记将在后台引用 UglifyJSPlugin
2. 合并
    1. 使用webpack-merge，使用引入后的变量的merge()合并
    2. 示例

        ```js
        const merge = require('webpack-merge');
        const common = require('./webpack.common.js');
        module.exports = merge.merge(common, {
            devtool: 'inline-source-map',
            devServer: {
            static: [
                { directory: './dist' }
            ],
            }
        });
        ```

    3. 脚本  
      "start": "webpack-dev-server --open --config webpack.dev.js",  
      通过 --config 指定使用什么配置文件
3. 生产环境推荐使用sourceMap
    1. 配置

        ```js
        devtool: 'source-map',
        plugins: [
            new UglifyJSPlugin({
                sourceMap: true
            })
        ]
        ```

      devtool的值，避免在生产中使用 `inline-***` 和 `eval-***`，因为它们可以增加 bundle 大小，并降低整体性能。
4. 指定环境
    1. 背景  
      许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。如果是生产环境，会删除多余的代码
    2. 配置  

      ```js
      const webpack = require('webpack');
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
      ```

      通过 webpack.DefinePlugin 插件定义变量  
      js文件也可以直接用该变量，例如：
        if (process.env.NODE_ENV !== 'production') {}
    3. 通过脚本配置  
      --define process.env.NODE_ENV="'production'"

## 代码分离

1. 设置多个入口
    多个chunk可能包含相同的代码
2. 防止重复
    将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。配置如下：

    ```js
    optimization: {
      splitChunks: {
        chunks: 'all', // 有效值为all，async和initial。提供all可能特别强大，这意味着即使在异步和非异步块之间也可以共享块。
      },
    },
    ```

    旧版本通过 CommonsChunkPlugin 实现
3. 动态导入
    1. chunkFilename：它决定非入口 chunk 的名称
    2. 代码

      ```js
      function getComponent1() {
        return import( /* webpackChunkName: "lodash" */ 'lodash').then(_ => {
          var element = document.createElement('div');
          element.innerHTML = _.join(['Hello', 'webpack'], ' ');
          return element;
        }).catch(error => 'An error occurred while loading the component');
      }
      ```

      通过 import 动态导入  
      `/* webpackChunkName: "lodash" */` ，在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js ，而不是 [id].bundle.js.
      可以用await import()

## 懒加载

1. 概念
    懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，
    立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。
2. 代码

    ```js
    button.onclick = e => import( /* webpackChunkName: "print" */ './print').then(module => {
      var print = module.default;
      print();
    });
    ```

    在点击按钮时才引用 print 模块。  
    注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。

## 缓存

1. 概念
    只要 /dist 目录中的内容部署到服务器上，客户端（通常是浏览器）就能够访问网站此服务器的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 缓存 的技术。
    可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本
2. 改变输出文件的文件名
    通过 [contenthash] 实现，在不做修改，多次编译时，文件名有可能会变，有可能不变
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
3. 提取引导模板
    1. 使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle：
    2. 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中

    ```js
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    }
    ```

4. 模块标识符
    设置 moduleIds: 'deterministic', 这样 vendor 模块的 hash 值不会根据 module.id 的变化，而发生变化。

    ```js
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks:{...}
    }
    ```

## 创建library

```js
  module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        // 设置为输出library
        library: {
            name: 'webpackNumbers',
            // 只设置name，那么只能通过 script 标签引入该包，设置了 type 可以用 require 等方式引入包
            type: 'umd',
        },
    },
    // index.js 引入了 loadsh，但是作为包可以默认 loadsh包 由使用者提供，那么当前包就可以不引用 loadsh 包，减小包的大小。
    // 设置 externals 声明移除的包，用包名为对应的字段
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_',
        },
    },
  };
```
