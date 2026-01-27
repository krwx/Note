# 数组

- [数组](#数组)
  - [构造函数](#构造函数)
    - [语法](#语法)
    - [示例](#示例)
  - [属性](#属性)
    - [length](#length)
      - [截断数组](#截断数组)
  - [静态方法](#静态方法)
    - [Array.from()](#arrayfrom)
  - [实例方法](#实例方法)
    - [slice()](#slice)
      - [在类数组对象上调用 slice()](#在类数组对象上调用-slice)
    - [splice()](#splice)
    - [sort()](#sort)
    - [shift()](#shift)
    - [unshift()](#unshift)
    - [map()](#map)
      - [将 parseInt() 与 map() 一起使用](#将-parseint-与-map-一起使用)
    - [flat()](#flat)
    - [flatMap()](#flatmap)
    - [reduce()](#reduce)
    - [reduceRight()](#reduceright)
    - [concat()](#concat)

## 构造函数

`Array()` 构造函数用于创建 `Array` 对象。

> 调用 `Array()` 时可以使用或不使用 new。两者都会创建一个新的 `Array` 实例。

### 语法

```js
new Array()
new Array(element0)
new Array(element0, element1)
new Array(element0, element1, /* … ,*/ elementN)
new Array(arrayLength)

Array()
Array(element0)
Array(element0, element1)
Array(element0, element1, /* … ,*/ elementN)
Array(arrayLength)
```

参数

- `elementN`
  - Array 构造函数会根据给定的元素创建一个 JavaScript 数组，但是**当仅有一个参数且为数字时除外**（详见下面的 arrayLength 参数）。注意，后者仅适用于用 Array 构造函数创建数组，而不适用于用方括号创建的数组字面量。
- `arrayLength`
  - 如果传递给 Array 构造函数的唯一参数是介于 0 到 232 - 1（含）之间的整数，这将返回一个新的 JavaScript 数组，其 `length` 属性设置为该数字（注意：这意味着一个由 `arrayLength` 个空槽组成的数组，而不是具有实际 `undefined` 值的槽——参见稀疏数组）。

**注意**：

1. 使用 `Array(arrayLength)` 创建完的数组**是空的**，虽然数组的 `length` 为 `arrayLength`，但是数组里面没有类似 `undefined` 或 `null` 的值。此时调用数组的 `map` 方法是回返回一个空数组，因为原数组也是空的。

### 示例

单个参数的 `Array` 构造函数

```js
const arrayEmpty = new Array(2);

console.log(arrayEmpty.length); // 2
console.log(arrayEmpty[0]); // undefined；实际上是一个空槽
console.log(0 in arrayEmpty); // false
console.log(1 in arrayEmpty); // false


const arrayOfOne = new Array("2"); // 这里是字符串 "2" 而不是数字 2
console.log(arrayOfOne.length); // 1
console.log(arrayOfOne[0]); // "2"
```

多个参数的 `Array` 构造函数

```js
const fruits = new Array("Apple", "Banana");

console.log(fruits.length); // 2
console.log(fruits[0]); // "Apple"
```

## 属性

### length

`length` 是 `Array` 的实例属性，表示该数组中元素的个数。该值是一个无符号 32 位整数。

是**可写的**

- 设置 `length` 小于当前长度的值将会截断数组——超过新 `length` 的元素将被删除。
- 当 `length` 被设置为比当前长度更大的值时，数组通过添加空槽来扩展，而不是实际的 `undefined` 值。

#### 截断数组

```js
const numbers = [1, 2, 3, 4, 5];

if (numbers.length > 3) {
  numbers.length = 3;
}

console.log(numbers); // [1, 2, 3]
console.log(numbers.length); // 3
console.log(numbers[3]); // undefined；多余的元素会被删除
```

## 静态方法

- `Array.from()`
  - : 从数组类对象或可迭代对象创建一个新的 `Array` 实例。
- `Array.isArray()`
  - : 如果参数是数组则返回 true ，否则返回 false 。
- `Array.of()`
  - : 创建一个新的 `Array` 实例，具有可变数量的参数，而不管参数的数量或类型。

### Array.from()

`Array.from()` 可以从类数组对象或可迭代对象创建一个新的数组实例。

**基本语法**

```javascript
Array.from(arrayLike[, mapFn[, thisArg]])
```

- **arrayLike**: 要转换为数组的类数组或可迭代对象
- **mapFn** (可选): 映射函数，对每个元素进行处理
- **thisArg** (可选): 执行 `mapFn` 时的 `this` 值

**主要用途**

1、将类数组对象转换为数组

```javascript
// 将 arguments 转换为数组
function sum() {
    const argsArray = Array.from(arguments);
    return argsArray.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3)); // 6

// 将 NodeList 转换为数组
const divs = document.querySelectorAll('div');
const divArray = Array.from(divs);
```

2、将可迭代对象转换为数组

```javascript
// Set 转数组
const set = new Set([1, 2, 3, 3]);
const arrayFromSet = Array.from(set);
console.log(arrayFromSet); // [1, 2, 3]

// Map 转数组
const map = new Map([[1, 'one'], [2, 'two']]);
const arrayFromMap = Array.from(map);
console.log(arrayFromMap); // [[1, 'one'], [2, 'two']]

// 字符串转数组
const str = 'hello';
const arrayFromStr = Array.from(str);
console.log(arrayFromStr); // ['h', 'e', 'l', 'l', 'o']
```

3、使用映射函数

```javascript
// 对每个元素进行转换
const numbers = [1, 2, 3];
const doubled = Array.from(numbers, x => x * 2);
console.log(doubled); // [2, 4, 6]

// 结合类数组对象使用
const arrayLike = {0: 1, 1: 2, 2: 3, length: 3};
const squared = Array.from(arrayLike, x => x * x);
console.log(squared); // [1, 4, 9]
```

4、创建指定范围的数组

```javascript
// 创建 0-9 的数组
const range = Array.from({length: 10}, (_, index) => index);
console.log(range); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 创建 1-5 的数组
const range2 = Array.from({length: 5}, (_, i) => i + 1);
console.log(range2); // [1, 2, 3, 4, 5]
```

**与扩展运算符的区别**

```javascript
// Array.from() 可以处理任何有 length 属性的对象
const arrayLike = {0: 'a', 1: 'b', length: 2};
const arr1 = Array.from(arrayLike); // ['a', 'b']

// 扩展运算符只能处理可迭代对象
// const arr2 = [...arrayLike]; // 报错

// 但对于可迭代对象，两者都可以
const set = new Set([1, 2, 3]);
const arr3 = Array.from(set); // [1, 2, 3]
const arr4 = [...set]; // [1, 2, 3]
```

**注意事项**

1. **浅拷贝**: `Array.from()` 创建的是新数组，但对于嵌套对象，复制的是引用
2. **稀疏数组**: 对于稀疏数组，空缺位置会用 `undefined` 填充
3. **性能**: 在需要处理大量数据时，直接使用循环可能更高效

## 实例方法

- `join()`：用指定的分隔符将数组每一项拼接为字符串
- `push()` ：向数组的末尾添加新元素
- `pop()`：删除数组的最后一项
- `shift()`：删除数组的第一项
- `unshift()`：向数组首位添加新元素
- `slice()`：按照条件查找出其中的部分元素
- `splice()`：对数组进行增删改
- `toSpliced()`: 对数组进行增删改并返回新数组，不改变原始数组
- `fill()`: 方法能使用特定值填充数组中的一个或多个元素
- `filter()`: 返回一个新数组，其中包含调用所提供的筛选函数返回为 true 的所有数组元素。
- `concat()`：用于连接两个或多个数组
- `indexOf()`：检测当前值在数组中第一次出现的位置索引
- `lastIndexOf()`：检测当前值在数组中最后一次出现的位置索引
- `every()`：判断数组中每一项都是否满足条件
- `some()`：判断数组中是否存在满足条件的项
- `includes()`：判断一个数组是否包含一个指定的值
- `sort()`：对数组的元素进行排序，改变原数组
- `reverse()`：对数组进行倒序，改变原数组
- `toSorted()`: 对数组进行排序并返回新数组，不改变原始数组
- `toReversed()`: 对数组进行倒序并返回新数组，不改变原始数组
- `forEach()`: ES5 及以下循环遍历数组每一项
- `map()`: ES6 循环遍历数组每一项
- `copyWithin()`:用于从数组的指定位置拷贝元素到数组的另一个指定位置中
- `find()`:返回匹配的值
- `findIndex()`:返回匹配位置的索引
- `findLast()`: 返回数组中满足提供的测试函数的最后一个元素的值
- `findLastIndex()`: 返回数组中满足所提供测试函数的最后一个元素的索引
- `toLocaleString()`、`toString()`:将数组转换为字符串
- `flat()`、`flatMap()`: 扁平化数组
- `entries()` 、`keys()` 、`values()`:遍历数组
- `at()`: 返回给定索引处的数组元素。接受从最后一项往回计算的负整数
- `reduce()`: 对数组的每个元素（从左到右）执行用户提供的“reducer”回调函数，将其简化为单个值。
- `reduceRight()`: 对数组的每个元素（从右到左）执行用户提供的“reducer”回调函数，将其简化为单个值。
- `with()`: 返回一个新数组，其中给定索引处的元素替换为给定值，而不改变原始数组。

### slice()

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `start` 和 `end` 决定的原数组的**浅拷贝**（**包括 start，不包括 end**），其中 `start` 和 `end` 代表了数组元素的索引。原始数组不会被改变。

`slice()` 方法是一个复制方法。它不会改变 `this` ，而是返回一个浅拷贝，其中包含了原始数组的一部分相同的元素。

**参数：**  

- `start` 可选
  - 提取起始处的索引（从 0 开始），会转换为整数。
    - 如果索引是负数，则从数组末尾开始计算——如果 `start < 0`，则使用 `start + array.length`。
    - 如果 `start < -array.length` 或者省略了 `start`，则使用 `0`。
    - 如果 `start >= array.length`，则不提取任何元素。
- `end` 可选
  - 提取终止处的索引（从 0 开始），会转换为整数。slice() 会提取到但不包括 end 的位置。
    - 如果索引是负数，则从数组末尾开始计算——如果 `end < 0`，则使用 `end + array.length`。
    - 如果 `end < -array.length`，则使用 `0`。
    - 如果 `end >= array.length` 或者省略了 end，则使用 `array.length`，提取所有元素直到末尾。
    - **如果 end 在规范化后小于或等于 start，则不提取任何元素。**

**例子：**

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

#### 在类数组对象上调用 slice()

`slice()` 方法会读取 `this` 对象的 `length` 属性，然后从 `start` 到 `end` 读取整数键属性，并将它们定义在一个新创建的数组中。

```js
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
};
console.log(Array.prototype.slice.call(arrayLike, 1, 3));
// [ 3, 4 ]
```

### splice()

`splice()` 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。语法如下：

```js
splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2, itemN)
```

**参数：**

- `start`
  - 从 0 开始计算的索引，表示要开始改变数组的位置，它会被转换成整数。
    - 负索引从数组末尾开始计算——如果 `start < 0`，使用 `start + array.length`。
    - 如果 `start < -array.length`，使用 `0`。
    - 如果 `start >= array.length`，则不会删除任何元素，但是该方法会表现为添加元素的函数，添加所提供的那些元素。
    - **如果 start 被省略了（即调用 splice() 时不传递参数），则不会删除任何元素**。这与传递 undefined 不同，后者会被转换为 0。
- `deleteCount` （可选）
  - 一个整数，表示数组中要从 `start` 开始删除的元素数量。
  - 如果省略了 `deleteCount`，或者其值大于或等于由 `start` 指定的位置到数组末尾的元素数量，那么从 `start` 到数组末尾的所有元素将被删除（**包括 start 所在的元素**）。
  - 但是，如果你想要传递任何 `itemN` 参数，则应向 `deleteCount` 传递 `Infinity` 值，以删除 `start` 之后的所有元素，因为显式的 `undefined` 会转换为 `0`。
  - 如果 `deleteCount` 是 `0` 或者负数，则不会移除任何元素。在这种情况下，你应该至少指定一个新元素（请参见下文）。
- `item1, …, itemN`  （可选）
  - 从 `start` 开始要加入到数组中的元素。
  - 如果不指定任何元素，`splice()` 将只从数组中删除元素。

**返回值：**

- 一个包含了删除的元素的数组。
- 如果只移除一个元素，则返回一个元素的数组。
- 如果没有删除任何元素，则返回一个空数组。
  
**示例：**  

移除索引 2 之前的 0（零）个元素，并插入“drum”和“guitar”

```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(2, 0, "drum", "guitar");

// 运算后的 myFish 是 ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// removed 是 []，没有元素被删除
```

在索引 3 处移除 1 个元素

```js
const myFish = ["angel", "clown", "drum", "mandarin", "sturgeon"];
const removed = myFish.splice(3, 1);

// 运算后的 myFish 是 ["angel", "clown", "drum", "sturgeon"]
// removed 是 ["mandarin"]
```

从索引 2 处开始移除 2 个元素

```js
const myFish = ["parrot", "anemone", "blue", "trumpet", "sturgeon"];
const removed = myFish.splice(2, 2);

// 运算后的 myFish 是 ["parrot", "anemone", "sturgeon"]
// removed 是 ["blue", "trumpet"]
```

从索引 -2 处移除 1 个元素

```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(-2, 1);

// 运算后的 myFish 是 ["angel", "clown", "sturgeon"]
// removed 是 ["mandarin"]
```

从索引 2 开始删除所有元素

```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(2);

// 运算后的 myFish 是 ["angel", "clown"]
// removed 是 ["mandarin", "sturgeon"]
```

`splice()`

```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice();

// 运算后的 myFish 不变
// removed 是 []
```

### sort()

`sort()` 方法 **就地** 对数组的元素进行排序，**并返回对相同数组的引用**。

默认排序是将元素**转换为字符串**，然后按照它们的 `UTF-16` 码元值**升序**排序。

所有的 `undefined` 元素都会被排序到数组的末尾。

**误区**：

```js
const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// Expected output: Array [1, 100000, 21, 30, 4]
```

对有数字的数字使用 `sort()` ，是根据 `Unicode` 排序的，不是根据数字大小排，要手写比较函数才能按数字大小排。

**语法**：

```js
sort()
sort(compareFn)
```

**参数**：

- `compareFn` 可选
  - 定义排序顺序的函数。返回值应该是一个数字，其正负性表示两个元素的相对顺序。该函数使用以下参数调用：
    - a：第一个用于比较的元素。不会是 undefined。
    - b：第二个用于比较的元素。不会是 undefined。
  - 如果省略该函数，数组元素会被转换为字符串，然后根据每个字符的 `Unicode` 码位值进行排序。

|compareFn(a, b) 返回值|排序顺序|
|--|--|
|`> 0`|a 在 b 后，如 [b, a]|
|`< 0`|a 在 b 前，如 [a, b]|
|`=== 0`|保持 a 和 b 原来的顺序|

比较函数形式如下：

```js
function compareFn(a, b) {
  if (根据排序标准，a 小于 b) {
    return -1;
  }
  if (根据排序标准，a 大于 b) {
    return 1;
  }
  // a 一定等于 b
  return 0;
}
```

如果比较函数只返回 1 和 0，或者只返回 0 和 -1，它将无法可靠地排序，因为反对称性被破坏了。  

一个总是返回 0 的比较函数将不会改变数组，但仍然是可靠的。

**返回值**：相同数组的引用。如果更改返回值，原来的数组也会发生变化

**示例**：

1、创建、显示及排序数组

```js
const stringArray = ["Blue", "Humpback", "Beluga"];
const numberArray = [40, 1, 5, 200];
const numericStringArray = ["80", "9", "700"];
const mixedNumericArray = ["80", "9", "700", 40, 1, 5, 200];

function compareNumbers(a, b) {
  return a - b;
}

stringArray.join(); // 'Blue,Humpback,Beluga'
stringArray.sort(); // ['Beluga', 'Blue', 'Humpback']

numberArray.join(); // '40,1,5,200'
numberArray.sort(); // [1, 200, 40, 5]
numberArray.sort(compareNumbers); // [1, 5, 40, 200]

numericStringArray.join(); // '80,9,700'
numericStringArray.sort(); // ['700', '80', '9']
numericStringArray.sort(compareNumbers); // ['9', '80', '700']

mixedNumericArray.join(); // '80,9,700,40,1,5,200'
mixedNumericArray.sort(); // [1, 200, 40, 5, '700', '80', '9']
mixedNumericArray.sort(compareNumbers); // [1, 5, '9', 40, '80', 200, '700']
```

2、使用 `map` 改善排序

- `compareFn` 可能会在数组中的每个元素上调用多次，如果 `compareFn` 执行的工作更多，需要排序的元素更多，性能损耗会很严重。
- 解决：先遍历数组一次，将用于排序的实际值提取到一个临时数组中（通过 `map` 实现），对临时数组进行排序，然后遍历临时数组以获得正确的顺序。

```js
// 需要被排序的数组
const data = ["delta", "alpha", "charlie", "bravo"];

// 用于存放位置和排序值的对象数组
const mapped = data.map((v, i) => {
  return { i, value: someSlowOperation(v) }; // 这里先对需要排序的值做处理，然后再在下面进行比较
});

// 按照多个值排序数组
mapped.sort((a, b) => {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  return 0;
});

const result = mapped.map((v) => data[v.i]);
```

3、在稀疏数组上使用 `sort()`

- 稀疏数组在使用 `sort()` 方法后仍然是稀疏的。
- 空槽会被移动到数组的末尾。

```js
console.log(["a", "c", , "b"].sort()); // ['a', 'b', 'c', empty]
console.log([, undefined, "a", "b"].sort()); // ["a", "b", undefined, empty]
```

### shift()

`shift()` 方法从数组中删除`第一个`元素，并`返回该元素的值`。此方法`更改数组的长度`。

```js
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1
```

### unshift()

`unshift()` 方法将指定元素**添加到数组的开头**，并**返回数组的新长度**。

语法：  

```js
unshift()
unshift(element1)
unshift(element1, element2)
unshift(element1, element2, /* …, */ elementN)
```

例子：

```js
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]
```

### map()

`map()` 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

`map()` 方法是一个迭代方法。它**为数组中的每个元素调用一次提供的 `callbackFn` 函数**，并用结果构建一个新数组。

语法：

```js
map(callbackFn)
map(callbackFn, thisArg)
```

参数：

- `callbackFn`
  - 为数组中的每个元素执行的函数。它的返回值作为一个元素被添加为新数组中。该函数被调用时将传入以下参数：
    - `element`：数组中当前正在处理的元素。
    - `index`：正在处理的元素在数组中的索引。
    - `array`：调用了 `map()` 的数组本身。
- `thisArg` 可选
  - 执行 `callbackFn` 时用作 `this` 的值。参见迭代方法。

返回值：

- 一个新数组，每个元素都是回调函数的返回值。

**描述**：

`callbackFn` 仅在已分配值的数组索引处被调用。它不会在稀疏数组中的空槽处被调用。

`map()` 方法是一个复制方法。它不会改变 `this`。

然而，**作为 `callbackFn` 提供的函数可以更改数组**。请注意，在第一次调用 `callbackFn` 之前，数组的长度已经被保存。因此：

- 当开始调用 `map()` 时，`callbackFn` 将不会访问超出数组初始长度的任何元素。
- 对已访问索引的更改不会导致再次在这些元素上调用 `callbackFn`。
- 如果数组中一个现有的、尚未访问的元素被 `callbackFn` 更改，则它传递给 `callbackFn` 的值**将是该元素被修改后的值**。被删除的元素则不会被访问。

由于 `map` 创建一个新数组，在没有使用返回的数组的情况下调用它是不恰当的；应该使用 `forEach` 或 `for...of` 作为代替。

**示例**：

求数组中每个元素的平方根：

```js
const numbers = [1, 4, 9];
const roots = numbers.map((num) => Math.sqrt(num));

// roots 现在是     [1, 2, 3]
// numbers 依旧是   [1, 4, 9]
// 没有改变原数组
```

使用包含单个参数的函数来映射一个数字数组：

```js
const numbers = [1, 4, 9];
const doubles = numbers.map((num) => num * 2);

console.log(doubles); // [2, 8, 18]
console.log(numbers); // [1, 4, 9]
```

在非数组对象上调用 `map()`：

- `map()` 方法读取 `this` 的 `length` 属性，然后访问每个整数索引。

```js
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
};
console.log(Array.prototype.map.call(arrayLike, (x) => x ** 2));
// [ 4, 9, 16 ]
```

**在 `NodeList` 上通用地使用 `map()`**：

以下示例展示了如何去遍历通过 `querySelectorAll` 得到的对象集合。这是因为 `querySelectorAll` 返回的是一个对象集合 `NodeList`。

在这种情况下，我们返回屏幕上所有选中 `option` 的值：

```js
const elems = document.querySelectorAll("select option:checked");
const values = Array.prototype.map.call(elems, ({ value }) => value);
```

在稀疏数组上使用 `map()` ：

- 稀疏数组在使用 `map()` 方法后仍然是稀疏的。空槽的索引在返回的数组中仍然为空，并且回调函数不会对它们进行调用。

```js
console.log(
  [1, , 3].map((x, index) => {
    console.log(`Visit ${index}`);
    return x * 2;
  }),
);
// Visit 0
// Visit 2
// [2, empty, 6]
```

映射包含 `undefined` 的数组：

- 当返回 `undefined` 或没有返回任何内容时：

```JS

const numbers = [1, 2, 3, 4];
const filteredNumbers = numbers.map((num, index) => {
  if (index < 3) {
    return num;
  }
});

// index 从 0 开始，因此 filterNumbers 为 1、2、3 和 undefined。
// filteredNumbers 是 [1, 2, 3, undefined]
// numbers 依旧是 [1, 2, 3, 4]
```

#### 将 parseInt() 与 map() 一起使用

```js
["1", "2", "3"].map(parseInt);
```

我们期望输出 `[1, 2, 3]`, 而实际结果是 `[1, NaN, NaN]`.

`parseInt` 函数通常只使用一个参数，但其实可以传入两个参数。

- 第一个参数是表达式，
- 第二个参数是解析该表达式的基数 `radix`。（该值介于 2 ~ 36 之间）

当在 `Array.prototype.map` 的回调函数中使用 `parseInt` 函数时，`map` 方法会传递 3 个参数：

- 元素
- 索引
- 数组

`parseInt` 函数会忽略第三个参数，但是不会忽略第二个参数！这可能会导致一些问题。

以下是迭代步骤的简明示例：

```js
// parseInt(string, radix) -> map(parseInt(value, index))
/* 第一次迭代 (index 是 0): */ parseInt("1", 0); // 1
/* 第二次迭代 (index 是 1): */ parseInt("2", 1); // NaN
/* 第三次迭代 (index 是 2): */ parseInt("3", 2); // NaN
```

解决方案：

```JS
const returnInt = (element) => parseInt(element, 10);

["1", "2", "3"].map(returnInt); // [1, 2, 3]
// 实际结果是一个数字数组（如预期）

// 与上面相同，但使用简洁的箭头函数语法
["1", "2", "3"].map((str) => parseInt(str)); // [1, 2, 3]

// 实现上述目标更简单的方法，同时避免了“骗招”：
["1", "2", "3"].map(Number); // [1, 2, 3]

// 但与 parseInt() 不同，Number() 还会返回一个浮点数或（解析）指数表示法：
["1.1", "2.2e2", "3e300"].map(Number); // [1.1, 220, 3e+300]

// 为了进行比较，如果我们对上面的数组使用 parseInt():
["1.1", "2.2e2", "3e300"].map((str) => parseInt(str)); // [1, 2, 3]
```

其他例子：

```js
const strings = ["10", "10", "10"];
const numbers = strings.map(parseInt);

console.log(numbers);
// 根据以上描述，[10, NaN, 2] 的实际结果可能会出乎意料。
// 因为最后一次迭代是 parseInt("10", 2); "10" 以二进制解析结果为 2
```

### flat()

`flat()` 方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。

语法：

```js
flat()
flat(depth)
```

参数：

- `depth` 可选
  - 指定要提取嵌套数组的结构深度，默认值为 `1`。
  - Infinity 作为最大深度，表示展开所有嵌套层级。

返回值:

一个新的数组，其中包含拼接后的子数组元素。

**描述**：

`flat()` 方法属于复制方法。它不会改变 `this` 数组，而是**返回一个浅拷贝**，该浅拷贝包含了原始数组中相同的元素。

如果待展开的数组是稀疏的，`flat()` 方法**会忽略其中的空槽**。  
例如，如果 depth 是 1，那么根数组和第一层嵌套数组中的空槽都会被忽略，**但在更深的嵌套数组中的空槽则会与这些数组一起保留**。

`flat()` 方法是通用的。它只需要 `this` 值具有 `length` 属性和整数键属性即可。但是，**如果要展开元素，则它们必须是数组**。

**例子**：

```js
const arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

- 在稀疏数组上使用 `flat()`

```js
const arr5 = [1, 2, , 4, 5];
console.log(arr5.flat()); // [1, 2, 4, 5]

const array = [1, , 3, ["a", , "c"]];
console.log(array.flat()); // [ 1, 3, "a", "c" ]

const array2 = [1, , 3, ["a", , ["d", , "e"]]];
console.log(array2.flat()); // [ 1, 3, "a", ["d", empty, "e"] ]
console.log(array2.flat(2)); // [ 1, 3, "a", "d", "e"]
```

- 在非数组对象上调用 `flat()`
  - `flat()` 方法读取 `this` 的 `length` 属性，然后访问每个整数索引。
  - 如果元素不是数组，则直接将其附加到结果中，不进行展开操作。
  - 如果元素是数组，则根据 `depth` 参数进行展开操作。

```js
const arrayLike = {
  length: 3,
  0: [1, 2],
  // 嵌套的类数组对象不会被展平
  1: { length: 2, 0: 3, 1: 4 },
  2: 5,
};
console.log(Array.prototype.flat.call(arrayLike));
// [ 1, 2, { '0': 3, '1': 4, length: 2 }, 5 ]
```

### flatMap()

`flatMap()` 方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组。

它等价于在调用 `map()` 方法后再调用深度为 `1` 的 `flat()` 方法（`arr.map(...args).flat()`），但比分别调用这两个方法稍微更高效一些。

语法：

```js
flatMap(callbackFn)
flatMap(callbackFn, thisArg)
```

参数：

- `callbackFn`
  - 一个在数组的每个元素上执行的函数。它应该返回一个包含新数组元素的数组，或是要添加到新数组中的单个非数组值。该函数将被传入以下参数：
    - `element` ：数组中正在处理的当前元素。
    - `index` ：数组中正在处理的当前元素的索引。
    - `array` ：调用 `flatMap()` 的当前数组。
- `thisArg` 可选
  - 在执行 `callbackFn` 时用作 `this` 的值。参见迭代方法。

返回值：

一个新的数组，其中每个元素都是回调函数的结果，并且被展开一级。

**示例**:

- `map()` 与 `flatMap()`

```js
const arr1 = [1, 2, 3, 4];

arr1.map((x) => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap((x) => [x * 2]);
// [2, 4, 6, 8]

// 只有一层被展平
arr1.flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]


const arr = [1, 2, 3, 4];
arr.flatMap((x) => [x, x * 2]);
// [1, 2, 2, 4, 3, 6, 4, 8]



const arr1 = ["it's Sunny in", "", "California"];

arr1.map((x) => x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap((x) => x.split(" "));
// ["it's","Sunny","in", "", "California"]
```

- 在 `map()` 方法过程中添加和删除元素

```js
// 假设我们想要删除所有负数，并将奇数拆分成偶数和 1
const a = [5, 4, -3, 20, 17, -33, -4, 18];
//         |\  \  x   |  | \   x   x   |
//        [4,1, 4,   20, 16, 1,       18]

const result = a.flatMap((n) => {
  if (n < 0) {
    return [];
  }
  return n % 2 === 0 ? [n] : [n - 1, 1];
});
console.log(result); // [4, 1, 4, 20, 16, 1, 18]
```

- 在稀疏数组上使用 `flatMap()`

```js
console.log([1, 2, , 4, 5].flatMap((x) => [x, x * 2])); // [1, 2, 2, 4, 4, 8, 5, 10]
console.log([1, 2, 3, 4].flatMap((x) => [, x * 2])); // [2, 4, 6, 8]
```

- 在非数组对象上调用 `flatMap()`
  - `flatMap()` 方法读取 `this` 的 `length` 属性，然后访问每个整数索引。
  - 如果**回调函数的返回值不是数组**，则始终直接将其附加到结果数组的末尾。

```js
const arrayLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
};
console.log(Array.prototype.flatMap.call(arrayLike, (x) => [x, x * 2]));
// [1, 2, 2, 4, 3, 6]

// 回调函数返回的类数组对象不会被展平
console.log(
  Array.prototype.flatMap.call(arrayLike, (x) => ({
    length: 1,
    0: x,
  })),
);
// [ { '0': 1, length: 1 }, { '0': 2, length: 1 }, { '0': 3, length: 1 } ]
```

### reduce()

`reduce()` 方法对数组中的每个元素按序执行一个提供的 `reducer` 函数，每一次运行 `reducer` 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

- 第一次执行回调函数时，不存在“上一次的计算结果”。
- **如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值**。
- 否则，数组索引为 0 的元素将被用作初始值，迭代器将从第二个元素开始执行（即从索引为 1 而不是 0 的位置开始）。

语法：

```js
reduce(callbackFn)
reduce(callbackFn, initialValue)
```

参数：

- `callbackFn`
  - 为数组中每个元素执行的函数。其返回值将作为下一次调用 `callbackFn` 时的 `accumulator` 参数。对于最后一次调用，返回值将作为 `reduce()` 的返回值。该函数被调用时将传入以下参数：
    - `accumulator`
      - 上一次调用 `callbackFn` 的结果。在第一次调用时，如果指定了 `initialValue` 则为指定的值，否则为 `array[0]` 的值。
    - `currentValue`
      - 当前元素的值。在第一次调用时，如果指定了 `initialValue`，则为 `array[0]` 的值，否则为 `array[1]`。
    - `currentIndex`
      - `currentValue` 在数组中的索引位置。在第一次调用时，如果指定了 `initialValue` 则为 0，否则为 1。
    - `array`
      - 调用了 `reduce()` 的数组本身。
- `initialValue` 可选
  - 第一次调用回调时初始化 `accumulator` 的值。
  - 如果指定了 `initialValue`，则 `callbackFn` 从数组中的第一个值作为 `currentValue` 开始执行。
  - 如果没有指定 `initialValue`，则 `accumulator` 初始化为数组中的第一个值，并且 `callbackFn` 从数组中的第二个值作为 `currentValue` 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。

返回值：

使用“reducer”回调函数遍历整个数组后的结果。

**描述**:

`callbackFn` 仅对已分配值的数组索引进行调用。不会对稀疏数组中的空槽进行调用。

在第一次调用 `callbackFn` 之前，数组的长度会被保存。因此：

- 当开始调用 `reduce()` 时，`callbackFn` 将不会访问超出数组初始长度的任何元素。
- 对已访问索引的更改不会导致再次在这些元素上调用 `callbackFn`。
- 如果数组中一个现有的、尚未访问的元素被 `callbackFn` 更改，则它传递给 `callbackFn` 的值将是该元素被修改后的值。被删除的元素则不会被访问。

**边界情况**:

- 如果数组只有一个元素（无论位置如何）且未提供 `initialValue`，或者提供了 `initialValue` 但数组为空，则将返回该单个值，而不调用 `callbackFn`。

- 如果提供了 `initialValue` 且数组不为空，则 `reduce` 方法将始终从索引 0 开始调用回调函数。

- 如果未提供 `initialValue`，则对于长度大于 1、等于 1 和 0 的数组，`reduce` 方法将有不同的表现

```js
const getMax = (a, b) => Math.max(a, b);

// 从索引 0 开始为数组中的每个元素调用回调函数
[1, 100].reduce(getMax, 50); // 100
[50].reduce(getMax, 10); // 50

// 仅为索引 1 处的元素调用回调函数
[1, 100].reduce(getMax); // 100

// 不调用回调函数
[50].reduce(getMax); // 50
[].reduce(getMax, 1); // 1

[].reduce(getMax); // TypeError
```

**示例**：

1、展平嵌套数组

```js
const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
// flattened 的值是 [0, 1, 2, 3, 4, 5]
```

2、统计对象中值的出现次数

```js
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

const countedNames = names.reduce((allNames, name) => {
  const currCount = allNames[name] ?? 0;
  return {
    ...allNames,
    [name]: currCount + 1,
  };
}, {});
// countedNames 的值是：
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

3、使用 `reduce()` 来替代 `.filter().map()`

原理：初始值为空数组 `[]`，然后在回调函数中检查每个值，如果满足条件就进行处理并添加到累加器数组中。

```js
const numbers = [-5, 6, 2, 0];

const doubledPositiveNumbers = numbers.reduce((accumulator, currentValue) => {
  if (currentValue > 0) {
    const doubled = currentValue * 2;
    return [...accumulator, doubled];
  }
  return accumulator;
}, []);

console.log(doubledPositiveNumbers); // [12, 4]
```

4、使用函数组合实现管道

```js
// 组合使用的构建块
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// 函数组合，实现管道功能
const pipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

// 组合的函数，实现特定值的乘法
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// 用例
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```

5、在稀疏数组中使用 `reduce()`

`reduce()` 会跳过稀疏数组中缺失的元素，但不会跳过 `undefined` 值。

```js
console.log([1, 2, , 4].reduce((a, b) => a + b)); // 7
console.log([1, 2, undefined, 4].reduce((a, b) => a + b)); // NaN
```

6、在非数组对象上调用 `reduce()`

`reduce()` 方法读取 `this` 的 `length` 属性，然后访问每个整数索引。

```JS
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
};
console.log(Array.prototype.reduce.call(arrayLike, (x, y) => x + y));
// 9
```

### reduceRight()

`reduceRight()` 与 `reduce()` 方法功能一样，但它是从数组的`最后一个`元素开始向前遍历数组。

例子：

```js
const array1 = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const result = array1.reduceRight((accumulator, currentValue) =>
  accumulator.concat(currentValue),
);

console.log(result);
// Expected output: Array [4, 5, 2, 3, 0, 1]
```

`reduce` 与 `reduceRight` 之间的区别：

```js
const a = ["1", "2", "3", "4", "5"];
const left = a.reduce((prev, cur) => prev + cur);
const right = a.reduceRight((prev, cur) => prev + cur);

console.log(left); // "12345"
console.log(right); // "54321"
```

### concat()

`Array.concat()` 是 JavaScript 数组方法，用于合并两个或多个数组，**返回一个新数组**，不会改变原数组。

**基本语法**：

```javascript
const newArray = array1.concat(array2, array3, ..., arrayN)
```

**基本用法**：

1、合并数组

```javascript
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9]

const result = arr1.concat(arr2, arr3)
console.log(result)  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arr1)    // [1, 2, 3] - 原数组不变
```

2、合并数组和值

```javascript
const arr = [1, 2, 3]
const result = arr.concat(4, 5, 6)
console.log(result)  // [1, 2, 3, 4, 5, 6]
```

3、嵌套数组处理

```javascript
const arr1 = [1, 2]
const arr2 = [3, [4, 5]]
const result = arr1.concat(arr2)
console.log(result)  // [1, 2, 3, [4, 5]] - 不会展开嵌套数组

const arr1 = [1, 2, [3, 4, [5, 6]]]
const result1 = [].concat(...arr1)
console.log(result1)  // [1, 2, 3, 4, [5, 6]]
```

**与扩展运算符比较**：

```javascript
// 使用 concat
const arr1 = [1, 2]
const arr2 = [3, 4]
const result1 = arr1.concat(arr2)

// 使用扩展运算符
const result2 = [...arr1, ...arr2]

// 两者结果相同：[1, 2, 3, 4]
```

**实际应用场景**：

1、复制数组（浅拷贝）

```javascript
const original = [1, 2, 3]
const copy = original.concat()
console.log(copy)     // [1, 2, 3]
console.log(copy === original)  // false - 新数组
```
