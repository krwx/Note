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