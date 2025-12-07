- [SourceMap](#sourcemap)
  - [介绍](#介绍)
  - [使用](#使用)
- [提升打包构建速度](#提升打包构建速度)
  - [HotModuleReplacement（HMR--热替换）](#hotmodulereplacementhmr--热替换)
    - [使用 react-hot-loader](#使用-react-hot-loader)
  - [OneOf](#oneof)
  - [Include/Exclude](#includeexclude)
  - [Eslinnt 和 Babel 的缓存](#eslinnt-和-babel-的缓存)
  - [多进程打包](#多进程打包)
    - [概念](#概念)
    - [配置](#配置)
- [减少代码体积](#减少代码体积)
  - [Tree Shaking](#tree-shaking)
  - [Babel](#babel)
  - [压缩图片](#压缩图片)
- [优化代码运行性能](#优化代码运行性能)
  - [Code Split](#code-split)
    - [多入口](#多入口)
    - [提取重复代码](#提取重复代码)
    - [按需加载，动态导入](#按需加载动态导入)
      - [解决 eslint 不能识别动态导入](#解决-eslint-不能识别动态导入)
    - [单入口](#单入口)
    - [给动态导入文件取名称](#给动态导入文件取名称)
    - [统一命名](#统一命名)
  - [Preload / Prefetch](#preload--prefetch)
  - [Network Cache](#network-cache)
    - [hash 取值及配置](#hash-取值及配置)
    - [runtime 文件解决依赖发生变化 缓存也变化的问题](#runtime-文件解决依赖发生变化-缓存也变化的问题)
  - [Core-js](#core-js)
  - [PWA](#pwa)
- [总结](#总结)


# SourceMap
## 介绍
SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。

它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。

没有设置 SourceMap ，提示代码的位置是编译后文件的代码的位置

## 使用
设置 devtool 属性。此选项控制是否生成，以及如何生成 source map。

但实际开发时我们只需要关注两种情况即可：

- 开发模式：`cheap-module-source-map`
  - 优点：打包编译速度快，只包含行映射
  - 缺点：没有列映射
```js
module.exports = {
  // 其他省略
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

- 生产模式：`source-map`
  - 优点：包含行/列映射
  - 缺点：打包编译速度更慢
```js
module.exports = {
  // 其他省略
  mode: "production",
  devtool: "source-map",
};
```

- 生产模式关心列：因为代码会压缩，需要行和列才能定位到出错的位置
- 开发模式关心行，不用关心列：代码只需看到行，大概清楚出错的位置

# 提升打包构建速度

## HotModuleReplacement（HMR--热替换）

**注意：开发环境还是用 style-loader ，style-loader 有热替换功能，`MiniCssExtractPlugin.loader` 没有热替换功能，开发环境不需要提取单独的 css文件**

开发时我们修改了其中一个模块代码，Webpack 默认会将所有模块全部重新打包编译，速度很慢。

HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

1. webpack配置  
    - 设置 `devServer.hot` 属性，默认为 true。（从 webpack-dev-server v4.0.0 开始，热模块替换是默认开启的。）
    - css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行。
```js
module.exports = {
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};
```
2. js 配置  
    - 在入口文件通过 `module.hot.accept()` 设置需要进行热替换的文件.
    - `module.hot.accept()` 接收两个参数。第一个参数是文件路径，必要的。第二个参数为发生热替换的回调函数，是可选参数
```js
// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept("./js/count.js", function (count) {
    const result1 = count(2, 1);
    console.log(result1);
  });
}
```

**实际开发我们会使用其他 loader 来解决。比如：vue-loader, react-hot-loader**

### 使用 react-hot-loader
1. Add react-hot-loader/babel to your .babelrc:
```js
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}
```
2. Mark your root component as hot-exported:
```js
// App.js
import { hot } from 'react-hot-loader/root';
const App = () => <div>Hello World!</div>;
export default hot(App);
```
3. Make sure react-hot-loader is required before react and react-dom:
 - or import 'react-hot-loader' in your main file (before React)
 - or prepend your webpack entry point with react-hot-loader/patch, for example:
```js
// webpack.config.js
module.exports = {
  entry: ['react-hot-loader/patch', './src'],
  // ...
};
```
4. If you need hooks support, use @hot-loader/react-dom

## OneOf
**打包时每个文件都会经过所有 loader 处理**，虽然因为 test 正则原因实际没有处理上，但是都要过一遍。比较慢。

oneOf 的含义是当规则匹配时，只使用第一个匹配规则，不再匹配后面的规则（顾名思义就是只能匹配上一个 loader, 剩下的就不匹配了。）

```js
// 旧的
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/, 
            loader: "babel-loader",
        },
    ],
  },

// 新的
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
```

## Include/Exclude
开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。

所以我们在对 js 文件处理时，要排除 node_modules 下面的文件。即 babel 和 eslint 处理 js 文件时进行排除

- include：包含，只处理 xxx 文件
- exclude：排除，除了 xxx 文件以外其他文件都处理
- include 和 exclude 只能用其中一个，不能同时使用

```js
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
    }),
  ],
};
```

## Eslinnt 和 Babel 的缓存
每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。

我们可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

- babel
  - 在 options 中设置 `cacheDirectory` 和 `cacheCompression`
  - `cacheDirectory` 设置为 true，代表开启缓存。缓存结果在打包后会自动输出到 node_modules
  - `cacheCompression` 设置为 false，代表不压缩缓存文件。因为压缩也需要时间，所有关闭压缩
- eslint
  - 设置 `cache` 和 `cacheLocation`
  - `cache` 设置为 true，开启压缩
  - `cacheLocation` 设置缓存的输出路径

```js
module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
  ],
};
```

## 多进程打包
对 js 文件处理主要就是 eslint 、babel、Terser 三个工具，所以我们要提升它们的运行速度。我们可以开启多进程同时处理 js 文件，这样速度就比之前的单进程打包更快了.

**需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销。**

### 概念
`thread-loader`:
- 使用时，需将此 loader **放置在其他 loader 之前**。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。
- 在 worker 池中运行的 loader 是受到限制的
- 每个 worker 都是一个独立的 node.js 进程，其开销大约为 600ms 左右
- 属性
    - workers：产生的 worker 的数量，默认是 (cpu 核心数 - 1)，
    - workerParallelJobs： 一个 worker 进程中并行执行工作的数量。 默认为 20

`TerserWebpackPlugin`：  
- 该插件使用 terser 来压缩 JavaScript。
- webpack v5 开箱即带有最新版本的 `terser-webpack-plugin`。
- 属性
  - parallel
    - 类型： Boolean|Number 默认值： true
    - 使用多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1 。
    - Boolean：启用/禁用多进程并发运行功能。
    - Number：启用多进程并发运行并设置并发运行次数。

### 配置
1. 获取CPU的核数
```js
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
```
2. webpack 配置
- 设置 `thread-loader`
  - 位置要放在 babel-loader 之前。改用 use 属性设置 loader
  - 设置 `options.workers` 属性
- 设置 `ESLintWebpackPlugin`
  - 设置 `threads` 属性。
  - threads 属性的类型为 Boolean | Number。含义是：以线程池方式运行 lint 。线程池大小是自动的，除非你指定一个数值。
- 设置 `TerserWebpackPlugin`
  - `TerserPlugin` 放在 `optimization.minimizer` 属性里面
  - 设置 `parallel` 属性
```js
const os = require("os");
// cpu核数
const threads = os.cpus().length;

module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "../src"), 
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      threads, // 开启多进程
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // css压缩也可以写到 optimization.minimizer 里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads // 开启多进程
      })
    ],
  },
};
```

# 减少代码体积
## Tree Shaking
Tree Shaking 通常用于描述移除 JavaScript 中的没有使用上的代码。
**注意：它依赖 ES Module**

Webpack 已经默认开启了这个功能，无需其他配置。

## Babel
Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！

解决：使用 `@babel/plugin-transform-runtime` 插件。  
该插件禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 中的代码，并且使所有辅助代码从这里引用。

添加 `@babel/plugin-transform-runtime` 插件
```js
{
    loader: "babel-loader",
    options: {
        cacheDirectory: true, // 开启babel编译缓存
        cacheCompression: false, // 缓存文件不要压缩
        plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
    },
},
```

## 压缩图片
压缩本地图片，减小体积
**如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。**

使用 `ImageMinimizerWebpackPlugin`：用来压缩图片的插件

压缩有两种模式：
- 无损压缩
  - 官方下载包的命令：npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
- 有损压缩
  - 官方下载包的命令：npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev

配置：
```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

  optimization: {
    minimizer: [
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
```
如果打包发生错误，复制 `jpegtran.exe` 程序到对应缺失的目录

# 优化代码运行性能
## Code Split
代码分割（Code Split）主要做了两件事：
- 分割文件：将打包生成的文件进行分割，生成多个 js 文件。
- 按需加载：需要哪个文件就加载哪个文件。

### 多入口
概念：
- chunk
  - 打包的资源就是 chunk，输出出去叫 bundle
  - `[name]`是webpack命名规则，使用 chunk 的 name 作为输出的文件名。
  - chunk 的 name 是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。

配置：  
- entry
  - 通过在 entry 属性设置多个属性，实现多个入口
  - 一个入口会打包成一个 js 文件；多个入口打包成多个 js 文件
- output
  - filename 不能填一个固定值，需要填 `[name].js`

webpack.config.js
```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clear: true,
  }
};
```

### 提取重复代码
提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好。

通过设置 `optimization.splitChunks.chunks` 属性为 `all`
- 该属性表明将选择哪些 chunk 进行优化。
- 有效值为 all，async 和 initial
- all 代表 chunk 可以在异步和非异步 chunk 之间共享。

```js
// webpack.config.js
module.exports = {
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 这里重写配置的原因是测试的 js 文件大小不大于默认的 20 kb，所以需要改最小的文件大小
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

### 按需加载，动态导入
例子：
```js
console.log("hello main");

document.getElementById("btn").onclick = function () {
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import("./math.js").then(({ sum }) => {
    alert(sum(1, 2, 3, 4, 5));
  });
};
```
一旦通过 import 动态导入语法导入模块，模块就被代码分割，同时也能按需加载了。

个人理解：
- 动态导入的 js 文件也会参与打包，但不是编译到一个文件中，而是单独编译这个动态导入的 js 文件，形成一个 js 文件。当浏览器需要这个文件时，才发起网络请求获取这个 js 文件，一开始浏览器加载页面时不会请求这个 js 文件
- 不设置 `optimization.splitChunks.chunks` 为 all，动态导入的模块也会分割出来

#### 解决 eslint 不能识别动态导入
`.eslintrc.js` 文件的 `plugins` 属性配置 `import`
```js
module.exports = {
  plugins: ["import"], // 解决动态导入语法报错
};
```

### 单入口
也是设置 `optimization.splitChunks.chunks` 为 all 即可

### 给动态导入文件取名称
1. 动态导入模块时设置模块名称，通过 **webpack 魔法命名**实现  
   例子：/* webpackChunkName: "math" */
```js
document.getElementById("btn").onClick = function () {
  // /* webpackChunkName: "math" */：这是webpack动态导入模块命名的方式
  // "math"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {
    console.log(count(2, 1));
  });
};
```
2. 设置 `output.path.chunkFilename`   
   该属性的含义是：动态导入输出资源命名方式。官方的解释是：此选项决定了非初始（non-initial）chunk 文件的名称
```js
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
  },
```

### 统一命名
- 修改入口文件打包输出资源命名方式
  - 设置 `output.filename` 属性
  - 设置为 `[name].js`，不设置固定名称，以防日后换成多入口
- 修改动态导入输出资源命名方式
  - 设置 `output.chunkFilename` 属性
  - 也是设置为 `[name].js`，但是增加后缀，与入口文件区分开来，设置为 `[name].chunk.js`
- 统一图片、字体等资源命名方式
  - 删除之前资源 loader 配置的 `generator.filename` 属性
  - 设置 `output.assetModuleFilename` 属性，值和之前一样
- 修改提取的 css 文件命名
  - 更改 `MiniCssExtractPlugin` 的选项。
  - `filename` 选项的值改为 `static/css/[name].css`，也是以防日后换成多入口
  - 设置 `chunkFilename` 属性，因为动态导入的 js 文件有可能引用 css 文件。设置为 `static/css/[name].chunk.css`

```js
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // 注释掉，统一命名
            // generator: {
            //   filename: "static/imgs/[hash:8][ext][query]",
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
  ],
};
```

## Preload / Prefetch
使用的理由：
- 我们前面已经做了代码分割，同时会使用 import 动态导入语法来进行代码按需加载（我们也叫懒加载，比如路由懒加载就是这样实现的）。
- 但是加载速度还不够好，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。
- 我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 `Preload` 或 `Prefetch` 技术。

含义：
- `Preload`：告诉浏览器立即加载资源。
- `Prefetch`：告诉浏览器在空闲时才开始加载资源。

共同点：
- 都只会加载资源，并不执行。
- 都有缓存。

区别：
- `Preload`加载优先级高，`Prefetch`加载优先级低。
- `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源。

总结：
- 当前页面优先级高的资源用 `Preload` 加载。
- 下一个页面需要使用的资源用 `Prefetch` 加载。

共同问题：兼容性较差。
- 我们可以去 [Can I Use](https://caniuse.com/) 网站查询 API 的兼容性问题。
- `Preload` 相对于 `Prefetch` 兼容性好一点。

配置：
```js
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

  plugins: [
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
  ],
```
配置后动态导入的文件会在浏览器空闲时加载并缓存，等需要用到该脚本时，会从 `preload cache` 中取出

具体其他配置参考 npm 官网查找

## Network Cache
将来开发时我们对静态资源会使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，速度很快。

问题是,因为前后输出的文件名是一样的，都叫 main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了。

**所以文件名使用哈希值，当文件发生变更，文件名也发生变更**
### hash 取值及配置
都会生成一个唯一的 hash 值。通常使用 `contenthash` 
- `fullhash`（webpack4 是 hash）
  - 每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。
- `chunkhash`
  - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。**我们 js 和 css 是同一个引入，会共享一个 hash 值**。
- `contenthash`
  - 根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。

配置：
- 更改 `output.filename` 和 `output.chunkFilename`，从 `hash` 变为 `contenthash`
- 更改 `MiniCssExtractPlugin` 的选项的 `filename` 和 `chunkFilename`
```js
module.exports = {
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ],
};
```

### runtime 文件解决依赖发生变化 缓存也变化的问题
main.js 引用 math.js
- 问题：
    - 当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。
    - 但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。
- 原因：
  - 更新前：math.xxx.js, main.js 引用的 math.xxx.js
  - 更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化

- 解决：
  - 将 hash 值单独保管在一个 `runtime` 文件中。
  - 我们最终输出三个文件：main、math、runtime。**当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变**。
  - **runtime 文件只保存文件的 hash 值和它们与文件关系**，整个文件体积就比较小，所以变化重新请求的代价也小。

配置：  
设置 `optimization.runtimeChunk` ，设置 runtime 文件的命名规则
```js
  optimization: {
    // 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
  },
```
`optimization.runtimeChunk`：
- 可以设置的值的类型：`object`、`string`、`boolean`
- 将 `optimization.runtimeChunk` 设置为 `true` 或 `'multiple'`，**会为每个入口添加一个只含有 runtime 的额外 chunk**。
- 默认值是 `false` ：每个入口 chunk 中直接嵌入 runtime。
- 将 `optimization.runtimeChunk` 设置为 `object` ，对象中可以设置只有 `name` 属性，其中属性值可以是名称或者返回名称的函数，用于为 `runtime chunks` 命名

## Core-js
- `babel` 它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。
- **使用 `core-js` 解决** 。`core-js` 是专门用来做 ES6 以及以上 API 的 `polyfill` 。
- `polyfill` 翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

手动配置：  
通过在入口文件手动引用 `core-js` 库实现
```js
// 入口文件，引用 core-js。坏处是打包文件体积很大
import "core-js";
// 或者只引用使用到的 API 对应的包。优点是打包文件体积小，但是后面每次用 API 都要引用包
import "core-js/es/promise";
```

自动配置（通过 babel 配置实现）:

```js
// babel.config.js
module.exports = {
  presets: [
    // 原来的
    "@babel/preset-env"

    // 新的
    [
      "@babel/preset-env",
      { 
        useBuiltIns: "usage", // 指定按需加载，只加载需要转换的 API 对应的 polyfill
        corejs: { version: "3", proposals: true } // 指定 core-js 的版本
      },
    ],
  ],
};
```
此时就会自动根据我们代码中使用的语法，来按需加载相应的 `polyfill` 了。

## PWA
渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。

其中最重要的是，在 离线(offline) 时应用程序能够继续运行功能。

内部通过 `Service Workers` 技术实现的。缓存可以通过控制台的 `Application` 的 `Service Workers` 看到

1. 添加 `workbox-webpack-plugin` 插件
```js
const WorkboxPlugin = require("workbox-webpack-plugin");

  plugins: [
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
```
2. 修改入口文件，注册 Service Worker
```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration); // 注册成功
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);  // 注册失败
      });
  });
}
```

# 总结

我们从 4 个角度对 webpack 和代码进行了优化：

1. 提升开发体验

- 使用 `Source Map` 让开发或上线时代码报错能有更加准确的错误提示。

2. 提升 webpack 提升打包构建速度

- 使用 `HotModuleReplacement` 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。
- 使用 `OneOf` 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。
- 使用 `Include/Exclude` 排除或只检测某些文件，处理的文件更少，速度更快。
- 使用 `Cache` 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快。
- 使用 `Thead` 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）

3. 减少代码体积

- 使用 `Tree Shaking` 剔除了没有使用的多余代码，让代码体积更小。
- 使用 `@babel/plugin-transform-runtime` 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小。
- 使用 `Image Minimizer` 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意的是，如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）

4. 优化代码运行性能

- 使用 `Code Split` 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源。
- 使用 `Preload / Prefetch` 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
- 使用 `Network Cache` 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好。
- 使用 `Core-js` 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。
- 使用 `PWA` 能让代码离线也能访问，从而提升用户体验。






