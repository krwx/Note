- [方法](#方法)
  - [Object.prototype.toString()](#objectprototypetostring)
    - [语法](#语法)
    - [用于检测类型](#用于检测类型)
      - [使用 Object.prototype.toString.call(obj)](#使用-objectprototypetostringcallobj)
      - [不使用 Object.prototype.toString()](#不使用-objectprototypetostring)
      - [不使用 Object.toString()](#不使用-objecttostring)
      - [结果不可靠](#结果不可靠)
    - [重写 toString](#重写-tostring)
      - [基本类型](#基本类型)
      - [对象类型](#对象类型)
    - [删除重写的 toString 方法](#删除重写的-tostring-方法)
  - [Object.prototype.valueOf()](#objectprototypevalueof)
    - [语法](#语法-1)
    - [描述](#描述)
    - [重写自定义对象的 valueOf](#重写自定义对象的-valueof)
  - [Object.is()](#objectis)
    - [描述](#描述-1)
    - [Object.is() 与 == 与 === 的区别](#objectis-与--与--的区别)
  - [Object.defineProperty()](#objectdefineproperty)
    - [语法](#语法-2)

# 方法
## Object.prototype.toString()
`toString()` 方法返回一个表示该对象的字符串。该方法旨在重写（自定义）派生类对象的**类型转换**的逻辑。

### 语法
默认情况下，`toString()` 不接受任何参数。然而，继承自 `Object` 的对象可能用它们自己的实现重写它，这些实现可以接受参数。

返回值为：一个表示该对象的字符串。

`Object.prototype.toString()` 是最初始的版本，是没有被重写的，返回的值是反映这个对象的字符串。

### 用于检测类型
`Object.prototype.toString()` 返回 `"[object Type]"`，这里的 Type 是对象的类型。如果对象有 `Symbol.toStringTag` 属性，其值是一个字符串，则它的值将被用作 Type。

许多内置的对象，包括 `Map` 和 `Symbol，都有` `Symbol.toStringTag`。一些早于 ES6 的对象没有 `Symbol.toStringTag`，但仍然有一个特殊的标签。下面列出了所有的例子：
|例子| 返回值|
|--|--|
[] | [object Array]
function(){} | [object Function]
true |[object Boolean]
12 | [object Number]
"jerry" | [object String]
new Date | [object Date]
/\d/ | [object RegExp]
undefined | [object Undefined]
null | [object Null]
{name: "jerry"} | [object Object]
arguments 对象 |[object Arguments]
new Error() | [object Error]
Symbol(1) | [object Symbol]

除了上面的例子，其他所有内容，包括用户自定义的类，除非有一个自定义的 `Symbol.toStringTag`，否则都将返回 `"[object Object]"`。

检测类型用的是 `Object.prototype.toString.call(obj)` 语句，例子如下：
```js
console.log(Object.prototype.toString.call("jerry"));//[object String]
```

#### 使用 Object.prototype.toString.call(obj)
调用 `Object.prototype.toString.call(obj)` 的含义是：  
将 `this` 指针指向 obj 对象，调用其原型的 `toString()` 的方法，即 Object 的 toString 方法，而不是 obj 对象对应的对象类型的有可能重写的 toString 方法。这里返回的是反映 obj 对象的字符串。

#### 不使用 Object.prototype.toString()
直接调用 `Object.prototype.toString()` 的含义是：  
`Object.prototype` 也是一个对象（Object），也有 `toString()` 方法。上面的代码做的是调用 `Object.prototype` 对象本身的 `toString()` 方法，所有结果肯定为 `[object Object]`。

#### 不使用 Object.toString()
直接调用 `Object.toString()` 的含义是：  
调用 Object 类这个对象的 toString() 方法，返回结果为 `function Object() { [native code] }`

#### 结果不可靠
使用 `Object.prototype.toString.call()` ；对象可以通过定义 `Symbol.toStringTag` 属性来更改 `Object.prototype.toString()` 的行为，从而导致意想不到的结果
```js
const myDate = new Date();
Object.prototype.toString.call(myDate); // [object Date]

myDate[Symbol.toStringTag] = "myDate";
Object.prototype.toString.call(myDate); // [object myDate]

Date.prototype[Symbol.toStringTag] = "prototype polluted";
Object.prototype.toString.call(new Date()); // [object prototype polluted]
```

### 重写 toString
#### 基本类型
基本类型 “调用” `toString()` 方法时，实际上是先创建了一个对应的基本包装类型，由此基本包装类型调用 `toString()` 最后返回了其对应的字符串，看起来就好像是基本类型调用了 `toString()` 方法而得到了对应的字符串。

1、Boolean  
返回的是字符串
```js
var obj = new Boolean(true);
console.log(obj.toString());//"true"

//如果是包装类型的基本类型，则返回原基本类型值
var a = true;
console.log(a.toString());//"true"
```

2、String
```js
var obj = new String("hello");
console.log(obj.toString()); // "hello"
```

3、Number  
返回的是字符串
```js
var a = 123;
console.log(a.toString()); // "123"
```

#### 对象类型
1、数组Array类型（返回数组内容组成的字符串）  
```js
var a = [1,2,3,4];
console.log(a.toString()); // "1,2,3,4"
```

2、函数Function类型（返回函数代码字符串）  
```js
function testFunc() {console.log("hello")}
console.log(testFunc.toString()); // "function testFunc() {console.log("hello")}"
```

3、正则RegExp类型（返回原正则表达式的字符串表示）
```js
var a = /a/g;
console.log(a.toString()); // "/a/g"
```

4、Date类型（返回表示当前时间的字符串）
```js
var obj = new Date();
console.log(obj);//Wed May 10 2017 18:20:05 GMT+0800 (中国标准时间)
console.log(obj.toString());//"Wed May 10 2017 18:20:05 GMT+0800 (中国标准时间)"
```

### 删除重写的 toString 方法
如果删除了对象重写的 toString 方法，那么会调用上一层原型搭地 toString 方法。（如果上一层原型为 Object.prototype 那么就是调用 Object.toString ）

以数组为例：
```js
[1,2,3].toString()  // 结果为：1,2,3

// 删除重写的 toString 方法
delete Array.prototype.toString;
[1,2,3].toString()  // 结果为：[object Array]
```

## Object.prototype.valueOf()
`Object` 实例的 `valueOf()` 方法将 `this` 值转换成对象。该方法旨在被派生对象重写，以实现自定义类型转换逻辑。

例子：
```js
function MyNumberType(n) {
  this.number = n;
}
MyNumberType.prototype.valueOf = function () {
  return this.number;
};

const object1 = new MyNumberType(4);
console.log(object1 + 3);
// Expected output: 7
```

### 语法
基本的 `valueOf()` 是返回 this 值本身
```js
const obj = { foo: 1 };
console.log(obj.valueOf() === obj); // true
```

### 描述
JavaScript 调用 `valueOf` 方法来**将对象转换成基本类型值**。你很少需要自己调用 valueOf 方法；当遇到需要基本类型值的对象时，JavaScript 会自动的调用该方法。

**强制数字类型转换**和**强制基本类型转换**优先会调用该方法，而**强制字符串转换**会优先调用 `toString()`，并且 toString() 很可能返回字符串值，因此在这种情况下不会调用 valueOf()。

### 重写自定义对象的 valueOf
```js
class Box {
  #value;
  constructor(value) {
    this.#value = value;
  }
  valueOf() {
    return this.#value;
  }
}

const box = new Box(123);
console.log(box + 456); // 579
console.log(box == 123); // true
```

## Object.is()
`Object.is()` **静态方法**确定两个值是否为相同值。  
返回一个布尔值，指示两个参数是否为相同的值。
```js
console.log(Object.is('1', 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

console.log(Object.is({}, {}));
// Expected output: false

Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true，因为 window 是全局对象，只有一个
Object.is([], []); // false，这里是因为是两个不同的数组

const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true
```

### 描述
`Object.is()` 确定两个值是否为相同值。如果以下其中一项成立，则两个值相同：
* 都是 undefined
* 都是 null
* 都是 true 或者都是 false
* 都是长度相同、字符相同、顺序相同的字符串
* 都是相同的对象（**意味着两个值都引用了内存中的同一对象**）（***如果两个对象内的属性相同，但是不是引用同一个对象，是不相同的***）
* 都是 BigInt 且具有相同的数值
* 都是 symbol 且引用相同的 symbol 值
* 都是数字且
  * 都是 +0
  * 都是 -0
  * 都是 NaN
  * 都有相同的值，非零且都不是 NaN

### Object.is() 与 == 与 === 的区别
* Object.is() 与 == 运算符并不等价。
  * == 运算符会对两个操作数进行类型转换（如果它们不是相同的类型）
  * 但是 `Object.is()` 不会对其操作数进行类型转换。
* Object.is() 也不等价于 === 运算符。唯一区别在于它们处理带符号的 0 和 NaN 值的时候，刚好处理相反。
  * === 运算符（和 == 运算符）将数值 -0 和 +0 视为相等，但是会将 NaN 视为彼此不相等。
  * Object.is() 将数值 -0 和 +0 视为不相等，但是会将 NaN 视为彼此相等。

## Object.defineProperty()
`Object.defineProperty()` **静态方法**会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

### 语法
`Object.defineProperty(obj, prop, descriptor)`  

参数
* `obj`：要定义属性的对象。
* `prop`：一个字符串或 `Symbol`，指定了要定义或修改的属性键。
* `descriptor`：要定义或修改的属性的描述符。

返回值
* 传入函数的对象，其指定的属性已被添加或修改。






