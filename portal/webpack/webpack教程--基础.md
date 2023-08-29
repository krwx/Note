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
module.exports = {
  // 入口
  entry: "",
  // 输出
  output: {},
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "",
};
```
