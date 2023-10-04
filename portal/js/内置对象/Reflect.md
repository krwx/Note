- [描述](#描述)
- [静态方法](#静态方法)
  - [Reflect.has()](#reflecthas)
  - [Reflect.ownKeys()](#reflectownkeys)
  - [Reflect.set()](#reflectset)

# 描述
`Reflect` 是一个内置的对象，它**提供拦截 JavaScript 操作的方法**。

使用 `Reflect` 的理由：
1. 将 `Object` 对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到 `Reflect` 对象上。
   1. 现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
2. 修改某些 `Object` 方法的返回结果，让其变得更合理。
   1. 比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false` 。
3. 让 `Object` 操作都变成函数行为。
   1. 某些 `Object` 操作是命令式，比如 `name in obj` 和`delete obj[name]`，而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。
4. `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
   1. 这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

# 静态方法
* `Reflect.apply(target, thisArgument, argumentsList)`
  * 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 `Function.prototype.apply()` 功能类似。

* `Reflect.construct(target, argumentsList[, newTarget])`
  * 对构造函数进行 `new` 操作，相当于执行 `new target(...args)`。

* `Reflect.defineProperty(target, propertyKey, attributes)`
  * 和 `Object.defineProperty()` 类似。如果设置成功就会返回 true

* `Reflect.deleteProperty(target, propertyKey)`
  * 作为函数的delete操作符，相当于执行 `delete target[name]`。

* `Reflect.get(target, propertyKey[, receiver])`
  * 获取对象身上某个属性的值，类似于 `target[name]`。

* `Reflect.getOwnPropertyDescriptor(target, propertyKey)`
  * 类似于 `Object.getOwnPropertyDescriptor()`。如果对象中存在该属性，则返回对应的属性描述符，否则返回 undefined。

* `Reflect.getPrototypeOf(target)`
  * 类似于 `Object.getPrototypeOf()`。

* [`Reflect.has(target, propertyKey)`](#reflecthas)
  * 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。

* `Reflect.isExtensible(target)`
  * 类似于 `Object.isExtensible()`.

* [`Reflect.ownKeys(target)`](#reflectownkeys)
  * 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 `Object.keys()`, 但不会受enumerable 影响).

* `Reflect.preventExtensions(target)`
  * 类似于 `Object.preventExtensions()`。返回一个Boolean。

* [`Reflect.set(target, propertyKey, value[, receiver])`](#reflectset)
  * 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。

* `Reflect.setPrototypeOf(target, prototype)`
  * 设置对象原型的函数。返回一个 Boolean，如果更新成功，则返回 true。

## Reflect.has()
静态方法 `Reflect.has()` 作用与 `in` 操作符 相同。(**也会检查原型链是否有该属性，和 in 一样**)

语法：  
`Reflect.has(target, propertyKey)`

参数：
* target：目标对象。
* propertyKey：属性名，需要检查目标对象是否存在此属性。

返回值：
* 一个 `Boolean` 类型的对象指示是否存在此属性。

```js
Reflect.has({ x: 0 }, "x"); // true
Reflect.has({ x: 0 }, "y"); // false

// 如果该属性存在于原型链中，返回 true
Reflect.has({ x: 0 }, "toString");

// Proxy 对象的 .has() 句柄方法
obj = new Proxy(
  {},
  {
    has(t, k) {
      return k.startsWith("door");
    },
  },
);
Reflect.has(obj, "doorbell"); // true
Reflect.has(obj, "dormitory"); // false
```

## Reflect.ownKeys()
静态方法 Reflect.ownKeys() 返回一个由**目标对象自身**的属性键组成的数组。

`Reflect.ownKeys` 方法返回一个由目标对象**自身的属性键**组成的数组。它的返回值等同于 `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`。

```js
Reflect.ownKeys({ z: 3, y: 2, x: 1 }); // [ "z", "y", "x" ]
Reflect.ownKeys([]); // ["length"]

var sym = Symbol.for("comet");
var sym2 = Symbol.for("meteor");
var obj = {
  [sym]: 0,
  str: 0,
  773: 0,
  0: 0,
  [sym2]: 0,
  "-1": 0,
  8: 0,
  "second str": 0,
};
Reflect.ownKeys(obj);
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
// Indexes in numeric order,
// strings in insertion order,
// symbols in insertion order
// 解释：首先显示数字，按顺序排列。然后显示字符串，按插入的顺序排列。最后显示 Symbol ，按插入的顺序排列
```

## Reflect.set()
静态方法 `Reflect.set()` 工作方式就像在一个对象上设置一个属性。

语法：  
`Reflect.set(target, propertyKey, value[, receiver])`

参数
* target：设置属性的目标对象。
* propertyKey：设置的属性的名称。
* value：设置的值。
* receiver：如果遇到 setter，receiver则为setter调用时的this值。

返回值
* 返回一个 `Boolean` 值表明是否成功设置属性。

```js
// Object
var obj = {};
Reflect.set(obj, "prop", "value"); // true
obj.prop; // "value"

// Array
var arr = ["duck", "duck", "duck"];
Reflect.set(arr, 2, "goose"); // true
arr[2]; // "goose"

// It can truncate an array.（截断了数字，只留1个元素）
Reflect.set(arr, "length", 1); // true
arr; // ["duck"];

// With just one argument, propertyKey and value are "undefined".
var obj = {};
Reflect.set(obj); // true
Reflect.getOwnPropertyDescriptor(obj, "undefined");
// { value: undefined, writable: true, enumerable: true, configurable: true }
```


