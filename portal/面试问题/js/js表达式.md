# js 表达式

- [js 表达式](#js-表达式)
  - [1. typeof (function\* f() { yield f })().next().next()](#1-typeof-function-f--yield-f-nextnext)
  - [2. What will this function return?](#2-what-will-this-function-return)
  - [3. typeof (new (class F extends (String, Array) { })).substring](#3-typeof-new-class-f-extends-string-array--substring)
  - [4. 变量提升，但是引用的值不会提升](#4-变量提升但是引用的值不会提升)
  - [5. 1 \&\& 2](#5-1--2)

## 1. typeof (function* f() { yield f })().next().next()

```js
typeof (function* f() { yield f })().next().next()
```

Error，会报错

## 2. What will this function return?

```js
(function() {
    if (false) {
        let f = { g() => 1 };
    }
    return typeof f;
})()
```

Error，会报错。箭头函数语法有问题

## 3. typeof (new (class F extends (String, Array) { })).substring

```js
typeof (new (class F extends (String, Array) { })).substring
```

输出 `'undefined'`

这个表达式的含义是：获取新创建的对象的 substring 属性的类型

误区：

1. 是 typeof 后面整个表达式；而不是 typeof 新创建的对象，然后返回 typeof 结果的 substring 属性

## 4. 变量提升，但是引用的值不会提升

```js
console.log(a)  // undefinned
console.log(b)  // 报错：Uncaught ReferenceError ReferenceError: Cannot access 'b' before initialization

var a = 1;
let b = 2
```

## 5. 1 && 2

```js
1 && 2 // 2
```
