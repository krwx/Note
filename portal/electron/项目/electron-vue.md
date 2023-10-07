# electron-vue
## 起步
1. 创建项目
   ```
    npm install -g vue-cli
    vue init simulatedgreg/electron-vue my-project
   ```

## 项目结构
单一的 package.json 设置

- dependencies
  - 这些依赖项 将会被 包含在你最终产品的应用程序中。所以，如果你的应用程序需要某个模块才能运行，那么请在此安装！
- devDependencies
  - 这些依赖项 不会被 包含在你最终产品的应用程序中。在这里，你可以安装专门用于开发的模块，如构建脚本、webpack 加载器等等。

`index.dev.js` 文件通常不用理会，只在开发环境下有用