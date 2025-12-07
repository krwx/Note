- [React](#react)
  - [开发模式配置](#开发模式配置)
    - [babel 配置](#babel-配置)
    - [eslint 配置](#eslint-配置)
    - [基础配置](#基础配置)
    - [解决 babel-preset-react-app 需要指定 "NODE\_ENV" 或 "BABEL\_ENV" 的问题](#解决-babel-preset-react-app-需要指定-node_env-或-babel_env-的问题)
    - [解决引入 react 组件报错的问题](#解决引入-react-组件报错的问题)
    - [React HMR](#react-hmr)
    - [解决前端路由刷新404问题](#解决前端路由刷新404问题)
    - [React 懒加载路由设置 chunk name](#react-懒加载路由设置-chunk-name)
  - [生产模式配置](#生产模式配置)
    - [基本配置](#基本配置)
    - [复制静态资源](#复制静态资源)
  - [合并配置](#合并配置)
  - [优化配置](#优化配置)
    - [antd 更改主题](#antd-更改主题)
    - [代码分割：分组打包](#代码分割分组打包)
    - [关闭性能分析](#关闭性能分析)


# React
## 开发模式配置
### babel 配置
使用 react 的规则
```js
// babel.config.js
module.exports = {
  // https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js
  // babel-preset-react-app
  presets: ["react-app"],
};
```
babel 的 react 包含了 `@babel/plugin-transform-runtime` 的插件，无需再重新配置

### eslint 配置
使用 react 的规则
```js
// .eslintrc.js
module.exports = {
  extends: ["react-app"], // 继承 react 官方规则
  parserOptions: {
    babelOptions: {
      presets: [
        // 解决页面报错问题
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],
    },
  },
};
```

### 基础配置
和教程前面配的一样  
loader 需要进行处理 jsx
```js
            {
                // 这里处理 jsx 和 js
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
```

### 解决 babel-preset-react-app 需要指定 "NODE_ENV" 或 "BABEL_ENV" 的问题
使用 `cross-env` 库解决，指定 NODE_ENV 变量  
- 开发模式指令：`cross-env NODE_ENV=development webpack serve --config ./config/webpack.config.js`
- 生产模式指令：`cross-env NODE_ENV=production webpack --config ./config/webpack.config.js`

### 解决引入 react 组件报错的问题
修改 webpack 配置：
```js
    // webpack 解析模块加载选项
    resolve: {
        // 自动补全文件扩展名
        extensions: ['.jsx', '.js', '.json'],
    },
```
resolve属性：配置模块如何解析
- resolve.extensions
  - 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
  - 例如：extensions: ['.jsx', '.js', '.json']，会先解析 jsx，解析不了则按 js 解析，如果也不行最后按 json 文件解析

### React HMR
使用 `react-refresh-webpack-plugin` 实现
1. devServer.hot 设置为 true
2. 修改 babel-loader 的配置
```js
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

      // 处理js
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          // 这里新增 react-refresh 插件，激活js的HMR
          plugins: [
            "react-refresh/babel", 
          ],
        },
      },
```
3. plugin 新增插件
```js
  plugins: [
    new ReactRefreshWebpackPlugin(), // 激活js的HMR
  ],
```

### 解决前端路由刷新404问题
前端路由如果输入不存在的路径，即出现404的情况，自动导航到 index.html 。通过设置 `devServer.historyApiFallback` 实现
```js
    devServerr: {
        historyApiFallback: true, // 解决前端路由刷新404问题
    }
```

### React 懒加载路由设置 chunk name
直接在 import 里面通过 webpack 的魔法命名设置 chunk name
```js
const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: 'about' */ "./pages/About"));

function App() {
  return (
    <div>
      <!-- ... -->
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}
```

## 生产模式配置
### 基本配置
1. 设置输出路径
   1. 设置 `path`
   2. `output.filename` 和 `output.chunkFilename` 的名称添加 `contenthash`
2. 配置 `MiniCssExtratPlugin` ，提取单独的 css 文件
   1. `css` 的 `loader` 中的 `style-loader` 改为 `MiniCssExtratPlugin.loader`
   2. `plugins` 配置 `MiniCssExtratPlugin`
3. 配置 css 压缩，使用 `CssMinimizerWebpackPlugin` 插件
4. 配置 js 压缩，使用 `TerserWebpackPlugin` 插件
5. `mode` 改成 `production` 。 `devtool` 改成 `source-map`
6. 删除 `devServer` 配置
7. 删除 `HMR` 配置
8. 压缩图片，配置 `ImageMinimizerPlugin` 插件

### 复制静态资源
如果网页需要用到图标，那么打包的文件也需要用到图标。但是目前打包是不会把图标也打包进来。  
解决：使用 `copy-webpack-plugin` 插件复制图标文件到输出文件夹中

属性：
- from：源文件路径
- to：目的文件路径
- globOptions.ignore：忽略复制的文件
```js
const CopyPlugin = require("copy-webpack-plugin");

// 官方配置：
module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "source", to: "dest" },
        { from: "other", to: "public" },
      ],
    }),
  ],
};

// 实际配置：
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            // 忽略index.html文件
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
```

## 合并配置
开发模式和生产模式的配置有重复的地方，可以合并成一个文件，通过 `NODE_ENV` 变量控制什么时候用开发模式或者生产模式的配置。  
这样就只有一个配置文件，而不是两个配置文件.

1. 获取 `NODE_ENV` 变量
```js
// 通过 process.env.NODE_ENV 获取cross-env定义的环境变量
// process.env 表示当前进程的环境，访问这个属性就可以获取定义的环境变量
const isProduction = process.env.NODE_ENV === "production";
```
2. 修改 css loader 配置
```js
// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
  return [
    // 这里进行判断，返回对应模式的 loader
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    // ...
  ].filter(Boolean);
};
```
3. 修改 output
   修改 `output.path` 、`output.filename` 、`output.chunkFilename`  
   开发模式不需要 `contenthash` 和 `path` ，生产模式需要
```js
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
    chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
    // ...
  },
```
4. 处理 HMR
```js
            // 处理js
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    // 这里添加判断
                    plugins: [
                        !isProduction && "react-refresh/babel", // 激活js的HMR
                    ].filter(Boolean),
                }
            }

// plugins 设置
!isProduction && new ReactRefreshWebpackPlugin(),
```
5. `plugins` 处理  
   `MiniCssExtractPlugin` 和 `CopyPlugin` 只在生产模式下使用， `ReactRefreshWebpackPlugin` 只在开发模式下使用。
   最后对 `plugins` 数组进行过滤，过滤不存在的插件
```js
  plugins: [
    // ...
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),
    isProduction &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, "../dist"),
            globOptions: {
              // 忽略index.html文件
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
```
6. 修改 `mode` 和 `devtool`
```js
mode: isProduction ? "production" : "development",
devtool: isProduction ? "source-map" : "cheap-module-source-map",
```
7. 控制是否压缩代码  
   通过 `optimization.minimize` 属性控制是否开启压缩，`true` 为开启压缩，`false` 为不开启压缩
```js
optimization: {
    // 是否需要进行压缩
    minimize: isProduction,
}
```
8. 不用修改 devServer  
   只有 webpack serve 命令才会用到 devServer 的配置。生产模式为 webpack 命令，不会用到 devServer 的配置

9. 修改运行指令   
  修改 webpack 文件名，从 dev / prod 改为 config
```js
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.js"
```

## 优化配置
### antd 更改主题
4.x 版本是通过修改 `webpack` 的 `less-loader` 的配置选项更改主题。5.x 版本通过 `ConfigProvider` 配置主题  
**这里不管**

### 代码分割：分组打包
如果项目中使用 `antd` ，此时将所有 `node_modules` 打包在一起，那么打包输出文件会比较大。  
所以我们将 `node_modules` 中比较大的模块单独打包，从而并行加载速度更好

通过 `splitChunks.cacheGroups` 实现分组：  
`priority` 越大，代表越先执行
```js
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                // react react-dom react-router-dom 一起打包成一个js文件
                react: {
                  test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
                  name: "chunk-react",
                  priority: 40,
                },
                // antd 单独打包
                antd: {
                  test: /[\\/]node_modules[\\/]antd[\\/]/,
                  name: "chunk-antd",
                  priority: 30,
                },
                // 剩下node_modules单独打包
                libs: {
                  test: /[\\/]node_modules[\\/]/,
                  name: "chunk-libs",
                  priority: 20,
                },
              },
        },
    },
```

### 关闭性能分析
```js
performance: false, // 关闭性能分析，提升打包速度
```