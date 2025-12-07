# Object

- [Object](#object)
  - [方法](#方法)
    - [Object.prototype.toString()](#objectprototypetostring)
      - [用于检测类型](#用于检测类型)
      - [重写 toString](#重写-tostring)
      - [删除重写的 toString 方法](#删除重写的-tostring-方法)
    - [Object.prototype.valueOf()](#objectprototypevalueof)
      - [重写自定义对象的 valueOf](#重写自定义对象的-valueof)
    - [Object.is()](#objectis)
      - [Object.is() 与 == 与 === 的区别](#objectis-与--与--的区别)
    - [Object.defineProperty()](#objectdefineproperty)
    - [Object.defineProperties()](#objectdefineproperties)
      - [`Object.defineProperties()` 与 `Object.defineProperty()` 的区别](#objectdefineproperties-与-objectdefineproperty-的区别)
    - [Object.getOwnPropertyDescriptor()](#objectgetownpropertydescriptor)
    - [Object.create()](#objectcreate)
    - [Object.entries()](#objectentries)
    - [Object.fromEntries()](#objectfromentries)

## 方法

- 主要方法如下：
- [Object.prototype.toString()](#objectprototypetostring)
- [Object.prototype.valueOf()](#objectprototypevalueof)
- [Object.is()](#objectis)
- [Object.defineProperty()](#objectdefineproperty)
- [Object.defineProperties()](#objectdefineproperties)
- [Object.getOwnPropertyDescriptor()](#objectgetownpropertydescriptor)
- [Object.create()](#objectcreate)
- [Object.entries()](#objectentries)
- [Object.fromEntries()](#objectfromentries)

### Object.prototype.toString()

`toString()` 方法返回一个表示该对象的字符串。该方法旨在重写（自定义）派生类对象的**类型转换**的逻辑。

**语法**：

默认情况下，`toString()` 不接受任何参数。然而，继承自 `Object` 的对象可能用它们自己的实现重写它，这些实现可以接受参数。

返回值为：一个表示该对象的字符串。

`Object.prototype.toString()` 是最初始的版本，是没有被重写的，返回的值是反映这个对象的字符串。

#### 用于检测类型

`Object.prototype.toString()` 返回 `"[object Type]"`，这里的 Type 是对象的类型。如果对象有 `Symbol.toStringTag` 属性，其值是一个字符串，则它的值将被用作 Type。

许多内置的对象，包括 `Map` 和 `Symbol，都有` `Symbol.toStringTag`。一些早于 ES6 的对象没有 `Symbol.toStringTag`，但仍然有一个特殊的标签。下面列出了所有的例子：

|例子| 返回值|
|--|--|
|[] | [object Array]|
|function(){} | [object Function]|
|true |[object Boolean]|
|12 | [object Number]|
|"jerry" | [object String]|
|new Date | [object Date]|
|/\d/ | [object RegExp]|
|undefined | [object Undefined]|
|null | [object Null]|
|{name: "jerry"} | [object Object]|
|arguments 对象 |[object Arguments]|
|new Error() | [object Error]|
|Symbol(1) | [object Symbol]|

除了上面的例子，其他所有内容，包括用户自定义的类，除非有一个自定义的 `Symbol.toStringTag`，否则都将返回 `"[object Object]"`。

检测类型用的是 `Object.prototype.toString.call(obj)` 语句，例子如下：

```js
console.log(Object.prototype.toString.call("jerry"));//[object String]
```

**使用 Object.prototype.toString.call(obj)**：

调用 `Object.prototype.toString.call(obj)` 的含义是：  
将 `this` 指针指向 `obj` 对象，调用其原型的 `toString()` 的方法，即 `Object` 的 `toString` 方法，而不是 obj 对象对应的对象类型的有可能重写的 toString 方法。这里返回的是反映 obj 对象的字符串。

**不使用 Object.prototype.toString()**：

直接调用 `Object.prototype.toString()` 的含义是：  
`Object.prototype` 也是一个对象（Object），也有 `toString()` 方法。上面的代码做的是调用 `Object.prototype` 对象本身的 `toString()` 方法，所有结果肯定为 `[object Object]`。

**不使用 Object.toString()**：

直接调用 `Object.toString()` 的含义是：  
调用 Object 类这个对象的 toString() 方法，返回结果为 `function Object() { [native code] }`

**结果不可靠**：

使用 `Object.prototype.toString.call()` ；对象可以通过定义 `Symbol.toStringTag` 属性来更改 `Object.prototype.toString()` 的行为，从而导致意想不到的结果

```js
const myDate = new Date();
Object.prototype.toString.call(myDate); // [object Date]

myDate[Symbol.toStringTag] = "myDate";
Object.prototype.toString.call(myDate); // [object myDate]

Date.prototype[Symbol.toStringTag] = "prototype polluted";
Object.prototype.toString.call(new Date()); // [object prototype polluted]
```

#### 重写 toString

**基本类型**：

基本类型 “调用” `toString()` 方法时，实际上是先创建了一个对应的基本包装类型，由此基本包装类型调用 `toString()` 最后返回了其对应的字符串，看起来就好像是基本类型调用了 `toString()` 方法而得到了对应的字符串。

1、`Boolean`  

返回的是字符串

```js
var obj = new Boolean(true);
console.log(obj.toString());//"true"

//如果是包装类型的基本类型，则返回原基本类型值
var a = true;
console.log(a.toString());//"true"
```

2、`String`

```js
var obj = new String("hello");
console.log(obj.toString()); // "hello"
```

3、`Number`

返回的是字符串

```js
var a = 123;
console.log(a.toString()); // "123"
```

**对象类型**：

1、数组 `Array` 类型（返回数组内容组成的字符串）  

```js
var a = [1,2,3,4];
console.log(a.toString()); // "1,2,3,4"
```

2、函数 `Function` 类型（返回函数代码字符串）  

```js
function testFunc() {console.log("hello")}
console.log(testFunc.toString()); // "function testFunc() {console.log("hello")}"
```

3、正则 `RegExp` 类型（返回原正则表达式的字符串表示）

```js
var a = /a/g;
console.log(a.toString()); // "/a/g"
```

4、 `Date` 类型（返回表示当前时间的字符串）

```js
var obj = new Date();
console.log(obj);//Wed May 10 2017 18:20:05 GMT+0800 (中国标准时间)
console.log(obj.toString());//"Wed May 10 2017 18:20:05 GMT+0800 (中国标准时间)"
```

#### 删除重写的 toString 方法

如果删除了对象重写的 `toString` 方法，那么会调用上一层原型搭地 `toString` 方法。（如果上一层原型为 `Object.prototype` 那么就是调用 `Object.toString` ）

以数组为例：

```js
[1,2,3].toString()  // 结果为：1,2,3

// 删除重写的 toString 方法
delete Array.prototype.toString;
[1,2,3].toString()  // 结果为：[object Array]
```

### Object.prototype.valueOf()

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

**语法**：

基本的 `valueOf()` 是返回 this 值本身

```js
const obj = { foo: 1 };
console.log(obj.valueOf() === obj); // true
```

**描述**：

JavaScript 调用 `valueOf` 方法来**将对象转换成基本类型值**。你很少需要自己调用 valueOf 方法；当遇到需要基本类型值的对象时，JavaScript 会自动的调用该方法。

**强制数字类型转换**和**强制基本类型转换**优先会调用该方法，而**强制字符串转换**会优先调用 `toString()`，并且 toString() 很可能返回字符串值，因此在这种情况下不会调用 valueOf()。

#### 重写自定义对象的 valueOf

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

### Object.is()

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

**描述**：

`Object.is()` 确定两个值是否为相同值。如果以下其中一项成立，则两个值相同：

- 都是 `undefined`
- 都是 `null`
- 都是 `true` 或者都是 `false`
- 都是长度相同、字符相同、顺序相同的字符串
- 都是相同的对象（**意味着两个值都引用了内存中的同一对象**）（***如果两个对象内的属性相同，但是不是引用同一个对象，是不相同的***）
- 都是 `BigInt` 且具有相同的数值
- 都是 `symbol` 且引用相同的 `symbol` 值
- 都是数字且
  - 都是 `+0`
  - 都是 `-0`
  - 都是 `NaN`
  - 都有相同的值，非零且都不是 `NaN`

#### Object.is() 与 == 与 === 的区别

- `Object.is()` 与 `==` 运算符并不等价。
  - `==` 运算符会对两个操作数进行类型转换（如果它们不是相同的类型）
  - 但是 `Object.is()` 不会对其操作数进行类型转换。
- `Object.is()` 也不等价于 `===` 运算符。唯一区别在于它们处理带符号的 0 和 `NaN` 值的时候，刚好处理相反。
  - `===` 运算符（和 == 运算符）将数值 -0 和 +0 视为相等，但是会将 `NaN` 视为彼此不相等。
  - `Object.is()` 将数值 -0 和 +0 视为不相等，但是会将 `NaN` 视为彼此相等。

### Object.defineProperty()

`Object.defineProperty()` **静态方法**会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。

**语法**：

`Object.defineProperty(obj, prop, descriptor)`  

参数

- `obj`：要定义属性的对象。
- `prop`：一个字符串或 `Symbol`，指定了要定义或修改的属性键。
- `descriptor`：要定义或修改的属性的描述符。

返回值

- 传入函数的对象，其指定的属性已被添加或修改。

**描述**：

- `Object.defineProperty()` 允许精确地添加或修改对象上的属性。  
- 默认情况下，使用 `Object.defineProperty()` 添加的属性是不可写、不可枚举和不可配置的。  
- 但是通过描述符可以使属性被更改，也可以被删除
- 通过赋值添加的普通属性会在枚举属性时（例如 for...in、Object.keys() 等）出现

**属性描述符**：

属性描述符有两种主要类型：**数据描述符**和**访问器描述符**。

- 数据描述符是一个具有可写或不可写值的属性。
- 访问器描述符是由 getter/setter 函数对描述的属性。

**数据描述符**和**访问器描述符**共享的键：

- `configurable`--是否配置
  - 当设置为 `false` 时，
    - 该属性的类型不能在数据属性和访问器属性之间更改
    - 该属性不可被删除
    - 其描述符的其他属性也不能被更改（但是，如果它是一个可写的数据描述符，则 value 可以被更改，writable 可以更改为 false）。
  - 默认值为 `false`。
- `enumerable`--是否参与枚举
  - 当且仅当该属性在对应对象的属性枚举中出现时，值为 `true`。**默认值为 `false`**。

**数据描述符**的键：

- `value`
  - 与属性相关联的值。可以是任何有效的 JavaScript 值（数字、对象、函数等）。**默认值为 `undefined`** 。
- `writable`
  - 如果与属性相关联的值可以使用赋值运算符更改，则为 true。默认值为 false。

**访问器描述符**的键：

- `get`
  - 用作属性 getter 的函数，如果没有 getter 则为 undefined。
  - 当访问该属性时，将不带参地调用此函数，并将 this 设置为通过该属性访问的对象（因为可能存在继承关系，这可能不是定义该属性的对象）。
  - 返回值将被用作该属性的值。**默认值为 `undefined`**。
- `set`
  - 用作属性 setter 的函数，如果没有 setter 则为 undefined。
  - 当该属性被赋值时，将调用此函数，并带有一个参数（要赋给该属性的值），并将 this 设置为通过该属性分配的对象。
  - **默认值为 `undefined`**。

如果描述符同时具有 `[value` 或 `writable]` 和 `[get` 或 `set]` 键，则会抛出异常。

当属性已经存在时，`Object.defineProperty()` 会尝试根据描述符和属性的当前配置修改属性。

如果旧描述符的 `configurable` 特性被设置为 `false`，则该属性被称为**不可配置**的。无法更改不可配置的访问器属性的任何特性，也不能将其在数据类型和访问器类型之间切换。

对于具有 `writable: true` 的数据属性，可以修改其值并将 `writable` 特性从 `true` 改为 `false`。

当当前属性是可配置的时，将特性设置为 `undefined` 可以有效地删除它。例如，如果 `o.k` 是一个访问器属性，下面的语句将删除 `setter`：

```js
Object.defineProperty(o, "k", { set: undefined })
```

**使用经验**：

1. `configurable` 为 false 或者 true
   1. `writable` 为 true，可以修改值
   2. `writable` 为 false，不可以修改值
2. `configurable` 为 false
   1. 再使用 `Object.defineProperty()` 定义该属性会报错
3. `writable` 为 false，即使修改值也不会生效
   1. `configurable` 为 true，可以通过 `Object.defineProperty()` 定义 value 来改写值，或者定义 writable 为 true 再改写值

**示例**：

**创建属性**：

```js
// 例子1
const obj = {};
// 1. 使用 null 原型：没有继承的属性
const descriptor = Object.create(null);
descriptor.value = "static";

// 默认情况下，它们不可枚举、不可配置、不可写
Object.defineProperty(obj, "key", descriptor);  
// obj 的值为 {key: 'static'}

// 2. 使用一个包含所有属性的临时对象字面量来明确其属性
Object.defineProperty(obj, "key2", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static",
});
// obj 的值为 {key: 'static', key2: 'static'}


// 例子2
const o = {}; // 创建一个新对象

// 通过 defineProperty 使用数据描述符添加对象属性的示例
Object.defineProperty(o, "a", {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true,
});
// 'a' 属性存在于对象 o 中，其值为 37

// 通过 defineProperty 使用访问器属性描述符添加对象属性的示例
let bValue = 38;
Object.defineProperty(o, "b", {
  get() {
    return bValue;
  },
  set(newValue) {
    bValue = newValue;
  },
  enumerable: true,
  configurable: true,
});
o.b; // 38
// 'b' 属性存在于对象 o 中，其值为 38。
// o.b 的值现在始终与 bValue 相同，除非重新定义了 o.b。

// 数据描述符和访问器描述符不能混合使用
Object.defineProperty(o, "conflict", {
  value: 0x9f91102,
  get() {
    return 0xdeadbeef;
  },
});
// 抛出错误 TypeError: value appears only in data descriptors, get appears only in accessor descriptors
```

**修改属性**：

1、Writable 特性

当 `writable` 特性设置为 `false` 时，该属性被称为“不可写的”。它不能被重新赋值。尝试对一个不可写的属性进行写入不会改变它，在严格模式下还会导致错误。

```js
const o = {}; // 创建一个新对象

Object.defineProperty(o, "a", {
  value: 37,
  writable: false,
});

console.log(o.a); // 37
o.a = 25; // 不会抛出错误
// （在严格模式下，即使值相同，它也会抛出异常）
console.log(o.a); // 37；赋值不会成功
```

2、Enumerable 特性

`enumerable` 特性定义了属性是否可以被 `Object.assign()` 或展开运算符所考虑.

```js
const o = {};
Object.defineProperty(o, "a", {
  value: 1,
  enumerable: true,
});
Object.defineProperty(o, "b", {
  value: 2,
  enumerable: false,
});
Object.defineProperty(o, "c", {
  value: 3,
}); // enumerable 默认为 false
o.d = 4; // 通过赋值创建属性时 enumerable 默认为 true
Object.defineProperty(o, Symbol.for("e"), {
  value: 5,
  enumerable: true,
});
Object.defineProperty(o, Symbol.for("f"), {
  value: 6,
  enumerable: false,
});

for (const i in o) {
  console.log(i);
}
// 打印 'a' 和 'd'（总是按这个顺序）

Object.keys(o); // ['a', 'd']

o.propertyIsEnumerable("a"); // true
o.propertyIsEnumerable("b"); // false
o.propertyIsEnumerable("c"); // false
o.propertyIsEnumerable("d"); // true
o.propertyIsEnumerable(Symbol.for("e")); // true
o.propertyIsEnumerable(Symbol.for("f")); // false

const p = { ...o };
p.a; // 1
p.b; // undefined
p.c; // undefined
p.d; // 4
p[Symbol.for("e")]; // 5
p[Symbol.for("f")]; // undefined
```

**自定义 setter 和 getter**：

```js
function Archiver() {
  let temperature = null;
  const archive = [];

  Object.defineProperty(this, "temperature", {
    get() {
      console.log("get!");
      return temperature;
    },
    set(value) {
      temperature = value;
      archive.push({ val: temperature });
    },
  });

  this.getArchive = () => archive;
}

const arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
```

**继承属性**：

如果访问器属性被继承，它的 get 和 set 方法会在派生对象的属性被访问或者修改时被调用。如果这些方法**用一个变量存值，该值会被所有对象共享**。

```js
function MyClass() {}

let value;
Object.defineProperty(MyClass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  },
});

const a = new MyClass();
const b = new MyClass();
a.x = 1;
console.log(b.x); // 1。x 这个变量被共享了
```

解决方法：通过 this 指针。this 指向某个被访问和修改属性的对象。

```js
function MyClass() {}

Object.defineProperty(MyClass.prototype, "x", {
  get() {
    return this.storedX;
  },
  set(x) {
    this.storedX = x;
  },
});

const a = new MyClass();
const b = new MyClass();
a.x = 1;
console.log(b.x); // undefined
```

与访问器属性不同，数据属性始终在对象自身上设置，而不是一个原型。所以不用考虑上面的问题。

一个不可写的属性被继承，它仍然可以防止修改对象的属性。

```js
function MyClass() {}

MyClass.prototype.x = 1;
Object.defineProperty(MyClass.prototype, "y", {
  writable: false,
  value: 1,
});

const a = new MyClass();
a.x = 2;
console.log(a.x); // 2
console.log(MyClass.prototype.x); // 1
a.y = 2; // 没有作用；严格模式下会报错
console.log(a.y); // 1
console.log(MyClass.prototype.y); // 1
```

### Object.defineProperties()

`Object.defineProperties()` 静态方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

**语法**：

`Object.defineProperties(obj, props)`

参数：

- obj
  - 在其上定义或修改属性的对象。
- props
  - 一个对象，**其中每个键表示要定义或修改的属性的名称，每个值是描述该属性的对象**。在 props 中的每个值必须是且只能是数据描述符或访问器描述符之一；不能同时为两者（更多详细信息，请参见Object.defineProperty()）。

**示例**：

```js
const obj = {};
Object.defineProperties(obj, {
  property1: {
    value: true,
    writable: true,
  },
  property2: {
    value: "Hello",
    writable: false,
  },
});
// obj 的值为 {property1: true, property2: 'Hello'}
```

#### `Object.defineProperties()` 与 `Object.defineProperty()` 的区别

- 定义的属性数量
  - `Object.defineProperties()` 可以定义多个属性
  - `Object.defineProperty()` 只能定义一个属性
- 入参不同
  - `Object.defineProperties()` 的第二个参数为对象，对象的键定义名称，值为描述该属性的对象。
  - `Object.defineProperty()` 的第二个参数为属性名，第三个参数为描述该属性的对象

### Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor()` 静态方法返回一个对象，该对象描述给定对象上特定属性的配置。  
返回的对象是可变的，但对**其进行更改不会影响原始属性的配置**。

**语法**：

`Object.getOwnPropertyDescriptor(obj, prop)`

参数

- `obj`：要查找其属性的对象
- `prop`：要检索其描述的属性的名称或 Symbol。

返回值

- 如果指定的属性存在于对象上，则返回其**属性描述符**，否则返回 undefined。

如果第一个参数为非对象会强制转换为对象。例如，字符串会转换成 String 对象。

**示例**：

```js
let o, d;
o = {
  get foo() {
    return 17;
  },
};
d = Object.getOwnPropertyDescriptor(o, "foo");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   get: [Function: get foo],
//   set: undefined
// }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, "bar");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }

o = { [Symbol.for("baz")]: 73 };
d = Object.getOwnPropertyDescriptor(o, Symbol.for("baz"));
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   value: 73,
//   writable: true
// }

o = {};
Object.defineProperty(o, "qux", {
  value: 8675309,
  writable: false,
  enumerable: false,
});
d = Object.getOwnPropertyDescriptor(o, "qux");
console.log(d);
// {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

### Object.create()

`Object.create()` **静态方法以一个现有对象作为原型，创建一个新对象**。

**语法**：

```js
Object.create(proto)
Object.create(proto, propertiesObject)
```

参数

- `proto`
  - 新创建对象的**原型对象**（注意是**原型对象**，不是普通的对象）。
- `propertiesObject` (可选)
  - 如果该参数被指定且不为 `undefined`，则该传入对象可枚举的自有属性将为新创建的对象添加具有对应属性名称的**属性描述符**。这些属性对应于 `Object.defineProperties()` 的第二个参数。

返回值

- 根据指定的原型对象和属性创建的**新对象**。

**示例**：

1、用 `Object.create()` 实现类式继承

```js
// Shape——父类
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类方法
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// Rectangle——子类
function Rectangle() {
  Shape.call(this); // 调用父类构造函数。
}

// 子类继承父类
Rectangle.prototype = Object.create(Shape.prototype, {
  // 如果不将 Rectangle.prototype.constructor 设置为 Rectangle，
  // 它将采用 Shape（父类）的 prototype.constructor。
  // 为避免这种情况，我们将 prototype.constructor 设置为 Rectangle（子类）。
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

const rect = new Rectangle();

console.log("rect 是 Rectangle 类的实例吗？", rect instanceof Rectangle); // true
console.log("rect 是 Shape 类的实例吗？", rect instanceof Shape); // true
rect.move(1, 1); // 打印 'Shape moved.'
```

2、其他

使用 `Object.create()`，我们可以创建一个原型为 null 的对象。

```js
o = Object.create(null);
// 等价于：
o = { __proto__: null };
```

使用 `Object.create()` 来模仿 `new` 运算符的行为（即创建对象）。

```js
function Constructor() {}
o = new Constructor();
// 等价于：
o = Object.create(Constructor.prototype);
```

### Object.entries()

`Object.entries()` 静态方法返回一个数组，包含给定对象自有的可枚举字符串键属性的键值对。

**语法**：

`Object.entries(obj)`

**返回值**:  

- 一个由给定对象**自有的可枚举**字符串键属性的键值对组成的数组。
- 每个键值对都是**一个包含两个元素的数组**：
  - 第一个元素是属性的键（始终是字符串）
  - 第二个元素是属性值。

**描述**：

`Object.entries()` 返回一个数组，其元素是直接在 `object` 上找到相应的可枚举字符串键属性的键值对数组。

与 `for...in` 循环的区别是：**`for...in` 会遍历原型链的属性，`Object.entries()`不会遍历原型链的属性，只会遍历当前对象的属性**

`Object.entries()` 返回的数组顺序和 `for...in` 循环提供的顺序相同。

如果只需要属性的键，请使用 `Object.keys()`。如果只需要属性的值，请使用 `Object.values()`。

**例子**：

```js
// 类数组对象
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// 具有随机键排序的类数组对象
const anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]
```

- 在**基本类型**中使用 `Object.entries()`  
    非对象参数会强制转换成对象。只有**字符串**可以有自己的可枚举属性，所有其他基本类型均返回一个**空数组**。

    ```js
    // 字符串具有索引作为可枚举的自有属性
    console.log(Object.entries("foo")); // [ ['0', 'f'], ['1', 'o'], ['2',    'o'] ]

    // 其他基本类型没有自有属性
    console.log(Object.entries(100)); // []
    ```

- 将 `Object` 转换成 `Map`
    `Map()` 构造函数接受一个 `entries` 可迭代对象

    ```js
    const obj = { foo: "bar", baz: 42 };
    const map = new Map(Object.entries(obj));
    console.log(map); // Map(2) {"foo" => "bar", "baz" => 42}
    ```

- 遍历对象

    ```js
    // 使用 for...of 循环
    const obj = { a: 5, b: 7, c: 9 };
    for (const [key, value] of Object.entries(obj)) {
      console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
    }

    // 使用数组方法
    Object.entries(obj).forEach(([key, value]) => {
      console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
    });
    ```

### Object.fromEntries()

`Object.fromEntries()` 静态方法将键值对列表转换为一个对象。

参数

- iterable
  - 一个包含对象列表的可迭代对象，例如 Array 或者 Map。每个对象都要有两个属性：
    - 0
      - 表示属性键的字符串或者 Symbol。
    - 1
      - 属性值。
  - 通常，该对象被实现为二元数组，第一个元素是属性键，第二个元素是属性值。

返回值

- 一个新对象

例子

1、将 `Map` 转换成对象

```js
const map = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

2、将 `Array` 转换成对象

```js
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"],
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

3、对象转换

```js
const object1 = { a: 1, b: 2, c: 3 };

const object2 = Object.fromEntries(
  Object.entries(object1).map(([key, val]) => [key, val * 2]),
);

console.log(object2);
// { a: 2, b: 4, c: 6 }
```
