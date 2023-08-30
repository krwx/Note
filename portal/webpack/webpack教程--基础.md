- [基本使用](#基本使用)
- [基本配置](#基本配置)
  - [5 大核心概念](#5-大核心概念)
  - [准备 Webpack 配置文件](#准备-webpack-配置文件)
- [处理样式资源](#处理样式资源)
  - [处理 Css 资源](#处理-css-资源)
  - [处理 Less 资源](#处理-less-资源)
  - [处理 Sass 和 Scss 资源](#处理-sass-和-scss-资源)
  - [处理 Styl 资源](#处理-styl-资源)
- [处理图片资源](#处理图片资源)
  - [对图片资源进行优化](#对图片资源进行优化)
- [修改输出资源的名称和路径](#修改输出资源的名称和路径)
  - [修改 js 文件输出路径](#修改-js-文件输出路径)
  - [自定义输出文件名](#自定义输出文件名)
- [自动清空上次打包资源](#自动清空上次打包资源)
- [处理字体图标资源](#处理字体图标资源)
- [处理其他资源](#处理其他资源)
- [处理 js 资源](#处理-js-资源)
  - [Eslint](#eslint)
    - [配置文件](#配置文件)
    - [具体配置](#具体配置)
    - [webpack中使用](#webpack中使用)
    - [VSCode Eslint 插件](#vscode-eslint-插件)
  - [Babel](#babel)
    - [配置文件](#配置文件-1)
    - [具体配置](#具体配置-1)
    - [在 Webpack 中使用](#在-webpack-中使用)
- [处理 Html 资源](#处理-html-资源)
- [开发服务器\&自动化](#开发服务器自动化)
- [生产模式](#生产模式)
- [Css 处理](#css-处理)
  - [提取 Css 成单独文件](#提取-css-成单独文件)
  - [Css 兼容性处理](#css-兼容性处理)
  - [提取 loader 公共函数](#提取-loader-公共函数)
  - [css 压缩](#css-压缩)
- [HTML 和 JS 会自动压缩，无需配置](#html-和-js-会自动压缩无需配置)


# 基本使用
Webpack 是一个静态资源打包工具。

它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。

输出的文件就是编译好的文件，就可以在浏览器段运行了。

我们将 Webpack 输出的文件叫做 **bundle**。

Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范。  
仅能编译 JS 中的 ES Module 语法，要通过 loader 才能编译其他资源

# 基本配置
## 5 大核心概念
1. entry（入口）  
指示 Webpack 从哪个文件开始打包

2. output（输出）  
指示 Webpack 打包完的文件输出到哪里去，如何命名等

3. loader（加载器）  
webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

4. plugins（插件）  
扩展 Webpack 的功能

5. mode（模式）  

主要由两种模式：
- 开发模式：development  
- 生产模式：production

## 准备 Webpack 配置文件
```js
// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development", // 开发模式
};
```

# 处理样式资源
Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源

loader 的配置：
- use，use设置一个包含 loader 的数组，执行顺序从右到左
- loader，接收一个字符串，代表只有一个 loader

## 处理 Css 资源
- css-loader：负责将 Css 文件编译成 Webpack 能识别的模块
- style-loader：会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容

**css 资源会放到 js 文件中**
```js
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
    ],
  },
```

## 处理 Less 资源
less-loader：负责将 Less 文件编译成 Css 文件
```js
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
```

## 处理 Sass 和 Scss 资源
sass-loader：负责将 Sass 文件编译成 css 文件  
sass：sass-loader 依赖 sass 进行编译
```js
  module: {
    rules: [
      {
        // 处理 sass 或者 scss 文件
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
```

## 处理 Styl 资源
stylus-loader：负责将 Styl 文件编译成 Css 文件
```js
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
```

# 处理图片资源
Webpack5 已经内置可以处理图片的 loader，只需要简单设置。
```js
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
      },
    ],
  },
```
资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- `asset/source` 导出资源的源代码。之前通过使用 raw-loader 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

`type: "asset/resource"` 和 `type: "asset"`的区别：
- `type: "asset/resource"` 相当于`file-loader`, 将文件转化成 Webpack 能识别的资源，其他不做处理
- `type: "asset"` 相当于`url-loader`, 将文件转化成 Webpack 能识别的资源，同时进行某些配置可以使小于某个大小的资源会处理成 data URI 形式（Base64）

## 对图片资源进行优化
将小于某个大小的图片转化成 data URI 形式（Base64 格式）
```js
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        }
      },
    ],
  },
```
优点：减少请求数量  
缺点：体积变得更大

# 修改输出资源的名称和路径
## 修改 js 文件输出路径
修改 ouput.fiilename 属性，即修改入口文件的输出文件的路径。
```js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
  },
```
如果修改所有文件的路径，修改 output.path 属性
```js
  output: {
    // 这里所有文件会输出到 dist/test 文件夹下
    path: path.resolve(__dirname, "dist/test"),
    filename: "static/js/main.js",
  },
```

## 自定义输出文件名
默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 webpack 配置中设置 `output.assetModuleFilename` 来修改此模板字符串：
```js
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // 这里所有的资源文件都会输出到 images 文件夹下
    assetModuleFilename: 'images/[hash][ext][query]'
  },
```

将某些资源发送到指定目录：
```js
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
    ],
```

`Rule.generator.filename` 与 `output.assetModuleFilename` 相同，并且仅适用于 `asset` 和 `asset/resource` 模块类型。

# 自动清空上次打包资源
设置 ouput.clean 属性
```js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js",
    clean: true, // 自动将上次打包目录资源清空
  },
```

# 处理字体图标资源
字体资源图标可以使用 font class 形式。
字体文件格式包括：ttf、woff、woff2
```js
  module: {
    rules: [
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          // 指定输出路径，不输出到默认路径
          filename: "static/media/[hash:8][ext][query]",
        },
      },
    ],
```

# 处理其他资源
开发中可能还存在一些其他资源，如音视频等，在处理字体图标资源基础上增加其他文件类型，统一处理即可
```js
      {
        // 这里增加了文件类型
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
```

# 处理 js 资源
Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。

针对 js 兼容性处理，我们使用 Babel 来完成  
针对代码格式，我们使用 Eslint 来完成

先完成 Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理

## Eslint
Eslint：可以配置各项功能的 JavaScript 和 JSX 检查工具。
### 配置文件
配置文件的写法：
- .eslintrc.*：新建文件，位于项目根目录。三种类型的区别在于配置格式不一样。通常用 `.eslintrc.js`
  - .eslintrc
  - .eslintrc.js
  - .eslintrc.json
- package.json 中 eslintConfig：不需要创建文件，在原有文件基础上写

ESLint 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

### 具体配置
```js
module.exports = {
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: { // ES 其他特性
      jsx: true // 如果是 React 项目，就需要开启 jsx 语法
    }
  },
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: [],
  // ...
};
```

rules 具体规则:
- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  
更多规则可以查看官网
```js
rules: {
  semi: "error", // 禁止js语句结尾不使用分号
  'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
  'default-case': [
    'warn', // 要求 switch 语句中有 default 分支，否则警告
    { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
  ],
  eqeqeq: [
    'warn', // 强制使用 === 和 !==，否则警告
  ],
}
```

extends 继承：
继承现有的规则。例如：
- Eslint 官方的规则：`eslint:recommended`
- Vue Cli 官方的规则：`plugin:vue/essential`
- React Cli 官方的规则：`react-app`
```js
// 例如在React项目中，我们可以这样写配置
module.exports = {
  // 继承 React Cli 的规则
  extends: ["react-app"],
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    eqeqeq: ["warn", "smart"],
  },
};
```

### webpack中使用
1. 定义 Eslint 配置文件（.eslintrc.js）:
```js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6, // es6 语法
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```
2. webpack.config.js 配置
   使用 `ESLintWebpackPlugin`  插件。  
    配置选项的 `context` 属性指定检查文件的根目录
```js
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
  ],
};
```

### VSCode Eslint 插件
Eslint 插件，可不用编译就能看到错误，可以提前解决.  

但是此时就会对项目所有文件默认进行 Eslint 检查了，我们 dist 目录下的打包后文件就会报错。但是我们只需要检查 src 下面的文件，不需要检查 dist 下面的文件。

所以可以使用 Eslint 忽略文件解决。在项目根目录新建下面文件:`.eslintignore`。内容为:
```
# 忽略dist目录下所有文件
dist
```

## Babel
主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

### 配置文件
配置文件由很多种写法：
- `babel.config.*`：新建文件，位于项目根目录
  - `babel.config.js`
  - `babel.config.json`
- `.babelrc.*`：新建文件，位于项目根目录
  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`
- `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写

Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可。  
通常用 `babel.config.js`

### 具体配置
以 `babel.config.js` 配置文件为例：
```js
module.exports = {
  // 预设
  presets: [],
};
```
presets 代表预设。简单理解：就是一组 Babel 插件, 扩展 Babel 功能
- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设
可以设置多个预设

### 在 Webpack 中使用
1. 定义 Babel 配置文件
- babel.config.js
```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```
2. webpack 配置
- webpack.config.js
```js
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译，第三方包不需要参与编译
        loader: "babel-loader",
      },
    ],
  },
};
```
打开打包后的 `dist/static/js/main.js` 文件查看，会发现箭头函数等 ES6 语法已经转换了

# 处理 Html 资源
`HtmlWebpackPlugin` 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。这对于那些文件名中包含哈希值，并且哈希值会随着每次编译而改变的 webpack 包特别有用。你可以让该插件为你生成一个 HTML 文件，使用 lodash 模板提供模板，或者使用你自己的 loader。

该插件将为你生成一个 HTML5 文件， 在**body 中使用 script 标签引入你所有 webpack 生成的 bundle**。也可以给定模板生成新的HTML文件，不会改变原有的 DOM 结构，只是会自动添加 script 脚本引用。配置如下：
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

  plugins: [
    //不指定选项，那么自动生成一个新的 HTML 文件
    new HtmlWebpackPlugin(),

    // 这里指定了选项，以 public/index.html 为模板创建文件
    new HtmlWebpackPlugin({
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
```
选项的属性：
- template：模板的webpack相对或绝对路径。
- inject：
  - 取值为 true || 'head' || 'body' || false。默认为 true
  - body 为 js 标签会引用到 body 标签的底部
  - head 为把 js 标签放到 head 元素中
  - true 为根据 scriptLoading 选项决定是放到 body 中还是 head 中
- scriptLoading：
  - 取值为 {'blocking'|'defer'|'module'}，默认为 defer
  - 即加载 js 不阻塞浏览器

# 开发服务器&自动化
使用 `webpack-dev-server` 包实现本地调试，更改代码后自动刷新
```js
module.exports = {
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: "development",
};
```
运行指令：
```js
// 启动服务器需要加 serve 选项
webpack serve

// 普通打包只需要 webpack 命令就好
webpack
```

当你使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。

# 生产模式
```
├── webpack-test (项目根目录)
    ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
    ├── node_modules (下载包存放目录)
    ├── src (项目源码目录，除了html其他都在src里面)
    │    └── 略
    ├── public (项目html文件)
    │    └── index.html
    ├── .eslintrc.js(Eslint配置文件)
    ├── babel.config.js(Babel配置文件)
    └── package.json (包的依赖管理配置文件)
```

修改 webpack.dev.js
```js
  output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    // clean: true, // 开发模式没有输出，不需要清空输出结果
  },
```
运行开发模式的指令：
```
webpack serve --config ./config/webpack.dev.js
```
运行生产模式的指令：
```
webpack --config ./config/webpack.prod.js
```

# Css 处理
## 提取 Css 成单独文件
Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式

这样对于网站来说，会出现闪屏现象，用户体验不好。我们应该是单独的 Css 文件，通过 link 标签加载性能才好

通过 `MiniCssExtractPlugin` 插件实现
本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

webpack.config.js
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 设置 loader，不再用 style-loader
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),

    // 定义输出文件名和目录
    new MiniCssExtractPlugin({
        filename: "static/css/main.css",
    }),
  ],
};
```

属性：  
- filename
  - 类型：String|Function 默认值：[name].css
  - 此选项决定了输出的每个 CSS 文件的名称。

## Css 兼容性处理
新的 css 语法在旧的浏览器上运行需要做兼容性处理，使用 `postcss` 解决

1. 下载包  
npm i postcss-loader postcss postcss-preset-env -D

2. 配置
执行顺序上 ，postcss-loader 需配置在 css-loader 前面，但是在 less-loader / sass-loader / stylus-loader 后面
```js
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 设置预设，能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // 设置在 less-loader 后面
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
```
3. 控制兼容性
可以在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性
```js
{
  // 其他省略
  "browserslist": [
    "ie >= 8",  // ie 浏览器版本大于8的
    "last 2 version", // 浏览器最近的两个版本
    "> 1%",  // 市面上99%的浏览器
    "not dead" // 没有停止使用的浏览器
    ]
}
```

## 提取 loader 公共函数
css 配置有重复的 loader 配置，可以提取成公共函数
```js
// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean); // 这里如果没有传 preProcessor，则会过滤掉。不用再进行判空处理
};

  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
    ],
```

## css 压缩
`CssMinimizerWebpackPlugin` 这个插件使用 cssnano 优化和压缩 CSS。在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 直接在 plugins 使用
plugins: [
    new CssMinimizerPlugin(),
],

// 或者在 optimization 上使用
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },

// 以上两种配置只作用于生产模式。如果开发模式也应用，如下配置：
module.exports = {
  optimization: {
    // [...]
    minimize: true,
  },
};
```

# HTML 和 JS 会自动压缩，无需配置