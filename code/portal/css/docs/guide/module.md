# module

- [module](#module)
  - [自定义属性（--\*）：CSS 变量](#自定义属性--css-变量)
  - [全局作用域](#全局作用域)

## 自定义属性（--*）：CSS 变量

带有前缀 `--` 的属性名，比如 `--example--name`，表示的是带有值的自定义属性，其可以通过 `var()` 函数在全文档范围内复用的。

例子：

```css
/* 在 :root 声明自定义属性 */
:root {
  --first-color: #488cff;
  --second-color: #ffff8c;
}

/* 通过 var() 函数获取自定义属性 */
#firstParagraph {
  background-color: var(--first-color);
  color: var(--second-color);
}
```

## 全局作用域

CSS Modules 允许使用 `:global(.className)` 的语法，声明一个全局规则。凡是这样声明的 `class` ，都不会被编译成哈希字符串。

`App.css` 加入一个全局 `class`：

```css
.title {
  color: red;
}

:global(.title) {
  color: green;
}
```

`App.js` 使用普通的 `class` 的写法，就会引用全局 `class`：

```js
import React from 'react';
import styles from './App.css';

export default () => {
  return (
    <h1 className="title">
      Hello World
    </h1>
  );
};
```
