# Proxy

- [Proxy](#proxy)
  - [描述](#描述)
  - [语法](#语法)
  - [handler 对象的方法](#handler-对象的方法)
    - [handler.get()](#handlerget)
    - [handler.set()](#handlerset)
    - [handler.apply()](#handlerapply)
    - [handler.construct()](#handlerconstruct)
  - [示例](#示例)
    - [基础](#基础)
    - [验证](#验证)
    - [扩展构造函数](#扩展构造函数)

## 描述

`Proxy` 对象用于**创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）**。

术语：

- handler
  - 包含捕捉器（trap）的占位符对象，可译为处理器对象
  - 即 Proxy() 的第二个参数
- traps
  - **提供属性访问的方法**。这类似于操作系统中捕获器的概念。
- target
  - 被 Proxy 代理虚拟化的对象。它常被作为代理的存储后端。根据目标验证关于对象不可扩展性或不可配置属性的不变量（保持不变的语义）。

## 语法

`const p = new Proxy(target, handler)`

参数

- target
  - 要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- handler
  - 它是一个对象，它的属性提供了某些操作发生时所对应的处理函数。

## handler 对象的方法

- handler.getPrototypeOf()
  - Object.getPrototypeOf 方法的捕捉器。
- handler.setPrototypeOf()
  - Object.setPrototypeOf 方法的捕捉器。
- handler.isExtensible()
  - Object.isExtensible 方法的捕捉器。
- handler.preventExtensions()
  - Object.preventExtensions 方法的捕捉器。
- handler.getOwnPropertyDescriptor()
  - Object.getOwnPropertyDescriptor 方法的捕捉器。
- handler.defineProperty()
  - Object.defineProperty 方法的捕捉器。
- handler.has()
  - in 操作符的捕捉器。
- [handler.get()](#handlerget)
  - 属性读取操作的捕捉器。
- [handler.set()](#handlerset)
  - 属性设置操作的捕捉器。
- handler.deleteProperty()
  - delete 操作符的捕捉器。
- handler.ownKeys()
  - Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
- [handler.apply()](#handlerapply)
  - 函数调用操作的捕捉器。
- [handler.construct()](#handlerconstruct)
  - new 操作符的捕捉器。

### handler.get()

`handler.get()` 方法用于拦截对象的读取属性操作。

语法：

```js
var p = new Proxy(target, {
  get: function (target, property, receiver) {},
});
```

参数：  

- target：目标对象。
- property：被获取的属性名。
- receiver：Proxy 或者继承 Proxy 的对象

### handler.set()

`handler.set()` 方法是设置属性值操作的捕获器。

若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值。

语法：

```js
const p = new Proxy(target, {
  set: function(target, property, value, receiver) {
  }
});
```

参数：

- target：目标对象。
- property：将被设置的属性名或 Symbol。
- value：新属性值。
- receiver：最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。

返回值：

- **set() 方法应当返回一个布尔值。**
  - 返回 true 代表属性设置成功
  - 在严格模式下，如果 set() 方法返回 false，那么会抛出一个 TypeError 异常。

### handler.apply()

`handler.apply()` 方法用于拦截函数的调用。

语法：

```js
var p = new Proxy(target, {
  apply: function (target, thisArg, argumentsList) {},
});
```

参数：

- `this` 上下文绑定在 `handler` 对象上。（可以通过 `this` 调用 `handler` 设置的其他方法）
- target：目标对象（**函数**）。· 必须是可被调用的。也就是说，**它必须是一个函数对象**。
- thisArg：**被调用时的上下文对象**。
- argumentsList：被调用时的参数数组。

返回值：

- apply 方法可以返回任何值。

***拦截***  
该方法会拦截目标对象的以下操作：

- `proxy(...args)`
- `Function.prototype.apply()` 和 `Function.prototype.call()`
- `Reflect.apply()`

例子：

```js
var p = new Proxy(function () {}, {
  apply: function (target, thisArg, argumentsList) {
    console.log("called: " + argumentsList.join(", "));
    return argumentsList[0] + argumentsList[1] + argumentsList[2];
  },
});

console.log(p(1, 2, 3)); // "called: 1, 2, 3"; outputs 6
```

```js
// 创建一个函数
const sum = (a, b) => a + b;

// 创建代理
const proxySum = new Proxy(sum, {
  apply(target, thisArg, argumentsList) {
    console.log(`调用函数: ${target.name}`);
    console.log(`参数: ${argumentsList}`);
    console.log(`this: ${thisArg}`);
    
    // 可以修改参数
    const modifiedArgs = argumentsList.map(arg => arg * 2);
    
    // 调用原始函数（可以修改返回值）
    const result = target.apply(thisArg, modifiedArgs);
    
    console.log(`结果: ${result}`);
    return result * 2; // 修改返回值
  }
});

// 调用代理函数
console.log(proxySum(2, 3)); 
// 输出：
// 调用函数: sum
// 参数: 2,3
// this: undefined
// 结果: 10
// 20
```

### handler.construct()

`handler.construct()` 方法用于拦截 `new` 操作符。为了使 `new` 操作符在生成的 `Proxy` 对象上生效，用于初始化代理的目标对象自身必须具有 `[[Construct]]` 内部方法（即 `new target` 必须是有效的）。

语法：

```js
var p = new Proxy(target, {
  construct: function (target, argumentsList, newTarget) {},
});
```

参数：

- 下面的参数将会传递给 `construct` 方法，`this` 绑定在 `handler` 上。（可以通过 `this` 调用 `handler` 设置的其他方法）
- `target`：目标对象。 `target` 必须具有一个有效的 `constructor` 供 `new` 操作符调用。例如 `function() {}`
- `argumentsList`：`constructor` 的参数列表。
- `newTarget`：最初被调用的构造函数，就上面的例子而言是 p。

返回值：

- `construct`：方法必须返回一个对象。（**这个对象就是通过构造函数生成的对象**）

示例：

```js
// 例子1
var p = new Proxy(function () {}, {
  construct: function (target, argumentsList, newTarget) {
    console.log("called: " + argumentsList.join(", "));
    return { value: argumentsList[0] * 10 };
  },
});
console.log(new p(1).value); // "called: 1"; outputs 10

// 例子2
function monster1(disposition) {
  this.disposition = disposition;
}
const handler1 = {
  construct(target, args) {
    console.log(`Creating a ${target.name}`);
    // Expected output: "Creating a monster1"
    return new target(...args);
  },
};

const proxy1 = new Proxy(monster1, handler1);
console.log(new proxy1('fierce').disposition);
// Expected output: "fierce"
```

## 示例

注意：**每个捕捉的方法的入参都有可能不太一样，需要参考方法的语法**

### 基础

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

### 验证

通过代理，你可以轻松地验证向一个对象的传值。使用 `handler.set()` 实现

```js
// 例子1
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

```js
//例子2
const monster1 = { eyeCount: 4 };
const handler1 = {
  set(obj, prop, value) {
    if (prop === 'eyeCount' && value % 2 !== 0) {
      console.log('Monsters must have an even number of eyes');
    } else {
      // 使用了 Reflect.set() 设置属性
      return Reflect.set(...arguments);
    }
  },
};

const proxy1 = new Proxy(monster1, handler1);
```

### 扩展构造函数

方法代理可以轻松地通过一个新构造函数来**扩展**一个已有的构造函数。（这里是扩展，而不是继承）

步骤：

1. 调用 `new Proxy()` 创建一个代理构造函数。`target` 为要扩展的构造函数
2. 在 `handler` 对象中定义 `construct()` 方法来拦截 new 操作符
3. 在 `construct()` 方法中，调用 `Reflect.construct()` 来调用原始构造函数，对实例对象进行修改，并返回实例对象

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}

// 使用 Proxy 包装构造函数
const ProxiedPerson = new Proxy(Person, {
  // 拦截 new 操作
  construct(target, args, newTarget) {
    console.log(`Creating instance with args: ${args}`);
    
    // 调用原始构造函数
    const instance = Reflect.construct(target, args, newTarget);
    
    // 可以修改实例
    instance.createdAt = new Date();
    
    // 添加额外属性
    instance.type = 'ProxiedPerson';
    
    return instance;
  }
});

// 使用示例
const person = new ProxiedPerson('Alice'); // Creating instance with args: Alice
console.log(person.name); // Alice
console.log(person.createdAt); // Date对象
console.log(person.type); // ProxiedPerson
console.log(person.greet()); // Hello, Alice!
```
