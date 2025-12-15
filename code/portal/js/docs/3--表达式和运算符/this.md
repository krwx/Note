# this

- [this](#this)
  - [JavaScript 的 this 指向详解](#javascript-的-this-指向详解)
    - [核心概念](#核心概念)
    - [五大绑定规则](#五大绑定规则)
      - [1. **默认绑定**](#1-默认绑定)
      - [2. **隐式绑定**](#2-隐式绑定)
      - [3. **显式绑定**](#3-显式绑定)
      - [4. **new 绑定**](#4-new-绑定)
      - [5. **箭头函数**](#5-箭头函数)
    - [特殊场景](#特殊场景)
      - [事件处理函数](#事件处理函数)
      - [类中的 this](#类中的-this)
      - [回调函数中的 this 丢失](#回调函数中的-this-丢失)
    - [记忆技巧](#记忆技巧)

## JavaScript 的 this 指向详解

### 核心概念

`this` 是 JavaScript 中一个特殊的关键字，它代表**函数执行时的上下文对象**，其值在函数调用时确定，而非定义时。

### 五大绑定规则

#### 1. **默认绑定**

当函数独立调用时，`this` 指向全局对象（浏览器中为 `window`，Node.js 中为 `global`）。

```javascript
function showThis() {
  console.log(this);
}
showThis(); // 浏览器中输出: Window 对象
```

**严格模式**下为 `undefined`：

```javascript
'use strict';
function showThis() {
  console.log(this);
}
showThis(); // undefined
```

#### 2. **隐式绑定**

函数作为对象方法调用时，`this` 指向调用该方法的对象。

```javascript
const user = {
  name: '小明',
  greet() {
    console.log(`你好，我是${this.name}`);
  }
};
user.greet(); // "你好，我是小明" - this 指向 user
```

**易错点**：方法赋值给变量后调用

```javascript
const greet = user.greet;
greet(); // "你好，我是undefined" - this 指向全局对象
```

#### 3. **显式绑定**

使用 `call`、`apply`、`bind` 明确指定 `this`。

```javascript
function introduce(lang) {
  console.log(`我用${lang}编程，我是${this.name}`);
}

const dev = { name: '张三' };

// call - 立即调用，参数逐个传递
introduce.call(dev, 'JavaScript');

// apply - 立即调用，参数以数组传递
introduce.apply(dev, ['Python']);

// bind - 返回新函数，可稍后调用
const boundFunc = introduce.bind(dev);
boundFunc('Java');
```

#### 4. **new 绑定**

构造函数调用时，`this` 指向新创建的对象实例。

```javascript
function Person(name) {
  this.name = name;
  this.sayHi = function() {
    console.log(`我是${this.name}`);
  };
}

const p = new Person('李四');
p.sayHi(); // "我是李四"
```

#### 5. **箭头函数**

箭头函数没有自己的 `this`，继承外层作用域的 `this`。

```javascript
const obj = {
  name: '王五',
  regularFunc: function() {
    console.log('普通函数:', this.name);
  },
  arrowFunc: () => {
    console.log('箭头函数:', this.name);
  },
  nested: function() {
    setTimeout(() => {
      console.log('嵌套箭头函数:', this.name); // 继承外层 this，即 obj 块级作用域
    }, 100);
  }
};

obj.regularFunc(); // "普通函数: 王五"
obj.arrowFunc();   // "箭头函数: undefined"（指向外层全局）
obj.nested();      // "嵌套箭头函数: 王五"
```

### 特殊场景

#### 事件处理函数

```javascript
button.addEventListener('click', function() {
  console.log(this); // 指向触发事件的元素
});

button.addEventListener('click', () => {
  console.log(this); // 指向定义时的上下文，通常是 window
});
```

#### 类中的 this

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  
  sayName() {
    console.log(this.name);
  }
  
  delayedSayName() {
    setTimeout(() => {
      console.log(this.name); // 箭头函数指向类实例
    }, 100);
  }
}
```

#### 回调函数中的 this 丢失

```javascript
const obj = {
  name: '测试',
  logName() {
    console.log(this.name);
  }
};

// this 丢失的常见情况
setTimeout(obj.logName, 100); // undefined。因为这里的意思是把 obj.logName 取出来变成一个普通函数，再交给定时器执行。等回调真正触发时，它不再作为 obj 的方法调用，而是直接以普通函数形式运行，这样 this 指向全局对象（非严格模式）或 undefined（严格模式）

setTimeout(obj.logName.bind(obj), 100); // 正确: "测试"
setTimeout(() => obj.logName(), 100); // 正确: "测试"
```

### 记忆技巧

- **问谁调用**：函数被谁调用，`this` 就指向谁（箭头函数除外）
- **箭头函数**：没有自己的 `this`，向外层查找
- **new 关键字**：指向新创建的实例
- **call/apply/bind**：手动指定 `this`
