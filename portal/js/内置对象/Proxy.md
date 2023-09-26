- [描述](#描述)
- [语法](#语法)
- [handler 对象的方法](#handler-对象的方法)
  - [handler.get()](#handlerget)
  - [handler.set()](#handlerset)
- [示例](#示例)
  - [基础](#基础)
  - [验证](#验证)
  - [扩展构造函数](#扩展构造函数)

# 描述
`Proxy` 对象用于**创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）**。

术语：  
* handler
  * 包含捕捉器（trap）的占位符对象，可译为处理器对象
  * 即 Proxy() 的第二个参数
* traps
  * **提供属性访问的方法**。这类似于操作系统中捕获器的概念。
* target
  * 被 Proxy 代理虚拟化的对象。它常被作为代理的存储后端。根据目标验证关于对象不可扩展性或不可配置属性的不变量（保持不变的语义）。

# 语法
`const p = new Proxy(target, handler)`
参数
* target
  * 要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
* handler
  * 它是一个对象，它的属性提供了某些操作发生时所对应的处理函数。

# handler 对象的方法
* handler.getPrototypeOf()
  * Object.getPrototypeOf 方法的捕捉器。
* handler.setPrototypeOf()
  * Object.setPrototypeOf 方法的捕捉器。
* handler.isExtensible()
  * Object.isExtensible 方法的捕捉器。
* handler.preventExtensions()
  * Object.preventExtensions 方法的捕捉器。
* handler.getOwnPropertyDescriptor()
  * Object.getOwnPropertyDescriptor 方法的捕捉器。
* handler.defineProperty()
  * Object.defineProperty 方法的捕捉器。
* handler.has()
  * in 操作符的捕捉器。
* [handler.get()](#handlerget)
  * 属性读取操作的捕捉器。
* [handler.set()](#handlerset)
  * 属性设置操作的捕捉器。
* handler.deleteProperty()
  * delete 操作符的捕捉器。
* handler.ownKeys()
  * Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
* handler.apply()
  * 函数调用操作的捕捉器。
* handler.construct()
  * new 操作符的捕捉器。

## handler.get()
handler.get() 方法用于拦截对象的读取属性操作。

语法：
```js
var p = new Proxy(target, {
  get: function (target, property, receiver) {},
});
```
参数：  
* target：目标对象。
* property：被获取的属性名。
* receiver：Proxy 或者继承 Proxy 的对象

## handler.set()
handler.set() 方法是设置属性值操作的捕获器。

若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值。

语法：
```js
const p = new Proxy(target, {
  set: function(target, property, value, receiver) {
  }
});
```

参数：
* target：目标对象。
* property：将被设置的属性名或 Symbol。
* value：新属性值。
* receiver：最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。

返回值：
* **set() 方法应当返回一个布尔值。**
  * 返回 true 代表属性设置成功
  * 在严格模式下，如果 set() 方法返回 false，那么会抛出一个 TypeError 异常。


# 示例
**每个捕捉的方法的入参都有可能不太一样，需要参考方法的语法**

## 基础
当对象中不存在属性名时，默认返回值为 37。使用 `handler.get()` 实现
```js
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};

const p = new Proxy({}, handler);
p.a = 1;

console.log(p.a); // 1
console.log("c" in p, p.c); // false, 37
```
代理会将所有应用到它的操作转发到这个对象上。
```js
let target = {};
let p = new Proxy(target, {});

p.a = 37; // 操作转发到目标

console.log(target.a); // 37. 操作已经被正确地转发
```

## 验证
通过代理，你可以轻松地验证向一个对象的传值。使用 `handler.set()` 实现
```js
let validator = {
  set: function (obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value > 200) {
        throw new RangeError("The age seems invalid");
      }
    }

    // The default behavior to store the value
    obj[prop] = value;
    // 表示成功
    return true;
  },
};
let person = new Proxy({}, validator);
person.age = 100;
console.log(person.age);
// 100

person.age = "young";
// 抛出异常：Uncaught TypeError: The age is not an integer

person.age = 300;
// 抛出异常：Uncaught RangeError: The age seems invalid
```

## 扩展构造函数
TODO：先去看 Object.getOwnPropertyDescriptor() 、Object.create()