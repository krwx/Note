# 外部扩展(Externals)

`externals` 配置选项提供了「从输出的 `bundle` 中排除依赖」的方法。

防止将某些 `import` 的包(`package`)打包到 `bundle` 中，而是在运行时(`runtime`)再去从外部获取这些扩展依赖(`external dependencies`)。

## externals

```js
module.exports = {
  //...
  externals: {
    jquery: 'jQuery',
  },
};
```

上面 `webpack.config.js` 中 `externals` 下指定的属性名称 `jquery` 表示 `import $ from 'jquery'` 中的模块 `jquery` 应该从打包产物中排除。  
为了替换这个模块，`jQuery` 值将用于检索全局 `jQuery` 变量，因为默认的外部库类型是 `var`.
