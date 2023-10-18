- [数组](#数组)
  - [方法](#方法)
- [构造函数](#构造函数)
  - [语法](#语法)
  - [示例](#示例)
- [静态方法](#静态方法)
- [实例方法](#实例方法)
  - [Array.prototype.slice()](#arrayprototypeslice)
    - [在类数组对象上调用 slice()](#在类数组对象上调用-slice)
  - [Array.prototype.splice()](#arrayprototypesplice)
  - [Array.prototype.sort()](#arrayprototypesort)


# 数组
## 方法
- join()：用指定的分隔符将数组每一项拼接为字符串
- push() ：向数组的末尾添加新元素
- pop()：删除数组的最后一项
- shift()：删除数组的第一项
- unshift()：向数组首位添加新元素
- slice()：按照条件查找出其中的部分元素
- splice()：对数组进行增删改
- fill(): 方法能使用特定值填充数组中的一个或多个元素
- filter():“过滤”功能
- concat()：用于连接两个或多个数组
- indexOf()：检测当前值在数组中第一次出现的位置索引
- lastIndexOf()：检测当前值在数组中最后一次出现的位置索引
- every()：判断数组中每一项都是否满足条件
- some()：判断数组中是否存在满足条件的项
- includes()：判断一个数组是否包含一个指定的值
- sort()：对数组的元素进行排序
- reverse()：对数组进行倒序
- forEach()：ES5 及以下循环遍历数组每一项
- map()：ES6 循环遍历数组每一项
- copyWithin():用于从数组的指定位置拷贝元素到数组的另一个指定位置中
- find():返回匹配的值
- findIndex():返回匹配位置的索引
- toLocaleString()、toString():将数组转换为字符串
- flat()、flatMap()：扁平化数组
- entries() 、keys() 、values():遍历数组

**漏了 reduce、reduceRight 方法**

# 构造函数
`Array()` 构造函数用于创建 `Array` 对象。

> 调用 Array() 时可以使用或不使用 new。两者都会创建一个新的 Array 实例。

## 语法
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
  - Array 构造函数会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 arrayLength 参数）。注意，后者仅适用于用 Array 构造函数创建数组，而不适用于用方括号创建的数组字面量。
- `arrayLength`
  - 如果传递给 Array 构造函数的唯一参数是介于 0 到 232 - 1（含）之间的整数，这将返回一个新的 JavaScript 数组，其 length 属性设置为该数字（注意：这意味着一个由 arrayLength 个空槽组成的数组，而不是具有实际 undefined 值的槽——参见稀疏数组）。

**注意**
1. 使用 `Array(arrayLength)` 创建完的数组**是空的**，虽然数组的 length 为 arrayLength，但是数组里面没有类似 undefined 或 null 的值。此时调用数组的 map 方法是回返回一个空数组，因为原数组也是空的。

## 示例
单个参数的 Array 构造函数
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

多个参数的 Array 构造函数
```js
const fruits = new Array("Apple", "Banana");

console.log(fruits.length); // 2
console.log(fruits[0]); // "Apple"
```

# 静态方法
* Array.from()
  * : 从数组类对象或可迭代对象创建一个新的 Array 实例。
* Array.isArray()
  * : 如果参数是数组则返回 true ，否则返回 false 。
* Array.of()
  * : 创建一个新的 Array 实例，具有可变数量的参数，而不管参数的数量或类型。

# 实例方法
* Array.prototype.at()
  * 返回给定索引处的数组元素。接受从最后一项往回计算的负整数。

* Array.prototype.concat()
  * 返回一个新数组，该数组由被调用的数组与其他数组或值连接形成。

* Array.prototype.copyWithin()
  * 在数组内复制数组元素序列。

* Array.prototype.entries()
  * 返回一个新的数组迭代器对象，其中包含数组中每个索引的键/值对。

* Array.prototype.every()
  * 如果调用数组中的每个元素都满足测试函数，则返回 true。

* Array.prototype.fill()
  * 用静态值填充数组中从开始索引到结束索引的所有元素。

* Array.prototype.filter()
  * 返回一个新数组，其中包含调用所提供的筛选函数返回为 true 的所有数组元素。

* Array.prototype.find()
  * 返回数组中满足提供的测试函数的第一个元素的值，如果没有找到合适的元素，则返回 undefined。

* Array.prototype.findIndex()
  * 返回数组中满足提供的测试函数的第一个元素的索引，如果没有找到合适的元素，则返回 -1。

* Array.prototype.findLast()
  * 返回数组中满足提供的测试函数的最后一个元素的值，如果没有找到合适的元素，则返回 undefined。

* Array.prototype.findLastIndex()
  * 返回数组中满足所提供测试函数的最后一个元素的索引，如果没有找到合适的元素，则返回 -1。

* Array.prototype.flat()
  * 返回一个新数组，所有子数组元素递归地连接到其中，直到指定的深度。

* Array.prototype.flatMap()
  * 对调用数组的每个元素调用给定的回调函数，然后将结果展平一层，返回一个新数组。

* Array.prototype.forEach()
  * 对调用数组中的每个元素调用给定的函数。

* Array.prototype.includes()
  * 确定调用数组是否包含一个值，根据情况返回 true 或 false。

* Array.prototype.indexOf()
  * 返回在调用数组中可以找到给定元素的第一个（最小）索引。

* Array.prototype.join()
  * 将数组的所有元素连接为字符串。

* Array.prototype.keys()
  * 返回一个新的数组迭代器，其中包含调用数组中每个索引的键。

* Array.prototype.lastIndexOf()
  * 返回在调用数组中可以找到给定元素的最后一个（最大）索引，如果找不到则返回 -1。

* Array.prototype.map()
  * 返回一个新数组，其中包含对调用数组中的每个元素调用函数的结果。

* Array.prototype.pop()
  * 从数组中移除最后一个元素并返回该元素。

* Array.prototype.push()
  * 在数组末尾添加一个或多个元素，并返回数组新的 length。

* Array.prototype.reduce()
  * 对数组的每个元素（从左到右）执行用户提供的“reducer”回调函数，将其简化为单个值。

* Array.prototype.reduceRight()
  * 对数组的每个元素（从右到左）执行用户提供的“reducer”回调函数，将其简化为单个值。

* Array.prototype.reverse()
  * 就地反转数组中元素的顺序。（前面变成后面，后面变成前面。）

* Array.prototype.shift()
  * 从数组中移除第一个元素并返回该元素。

* [Array.prototype.slice()](#arrayprototypeslice)
  * 提取调用数组的一部分并返回一个新数组。

* Array.prototype.some()
  * 如果调用数组中至少有一个元素满足提供的测试函数，则返回 true。

* [Array.prototype.sort()](#arrayprototypesort)
  * 对数组的元素进行排序并返回该数组。

* [Array.prototype.splice()](#arrayprototypesplice)
  * 从数组中添加和/或删除元素。

* Array.prototype.toLocaleString()
  * 返回一个表示调用数组及其元素的本地化字符串。重写 Object.prototype.toLocaleString() 方法。

* Array.prototype.toReversed()
  * 返回一个新数组，该数组的元素顺序被反转，但不改变原始数组。

* Array.prototype.toSorted()
  * 返回一个新数组，其中元素按升序排序，而不改变原始数组。

* Array.prototype.toSpliced()
  * 返回一个新数组，在给定索引处删除和/或替换了一些元素，而不改变原始数组。

* Array.prototype.toString()
  * 返回一个表示调用数组及其元素的字符串。重写 Object.prototype.toString() 方法。

* Array.prototype.unshift()
  * 在数组的前面添加一个或多个元素，并返回数组新的 length。

* Array.prototype.values()
  * 返回一个新的数组迭代器对象，该对象包含数组中每个索引的值。

* Array.prototype.with()
  * 返回一个新数组，其中给定索引处的元素替换为给定值，而不改变原始数组。

## Array.prototype.slice()
`slice()` 方法返回一个新的数组对象，这一对象是一个由 `start` 和 `end` 决定的原数组的**浅拷贝**（**包括 start，不包括 end**），其中 `start` 和 `end` 代表了数组元素的索引。原始数组不会被改变。

`slice()` 方法是一个复制方法。它不会改变 `this` ，而是返回一个浅拷贝，其中包含了原始数组的一部分相同的元素。

**参数：**  
* start 可选
  * 提取起始处的索引（从 0 开始），会转换为整数。
    * 如果索引是负数，则从数组末尾开始计算——如果 start < 0，则使用 start + array.length。
    * 如果 start < -array.length 或者省略了 start，则使用 0。
    * 如果 start >= array.length，则不提取任何元素。
* end 可选
  * 提取终止处的索引（从 0 开始），会转换为整数。slice() 会提取到但不包括 end 的位置。
    * 如果索引是负数，则从数组末尾开始计算——如果 end < 0，则使用 end + array.length。
    * 如果 end < -array.length，则使用 0。
    * 如果 end >= array.length 或者省略了 end，则使用 array.length，提取所有元素直到末尾。
    * **如果 end 在规范化后小于或等于 start，则不提取任何元素。**

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

### 在类数组对象上调用 slice()
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

## Array.prototype.splice()
`splice()` 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。语法如下：
```js
splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2, itemN)
```
**参数：**
* start
  * 从 0 开始计算的索引，表示要开始改变数组的位置，它会被转换成整数。
    * 负索引从数组末尾开始计算——如果 start < 0，使用 start + array.length。
    * 如果 start < -array.length，使用 0。
    * 如果 start >= array.length，则不会删除任何元素，但是该方法会表现为添加元素的函数，添加所提供的那些元素。
    * **如果 start 被省略了（即调用 splice() 时不传递参数），则不会删除任何元素**。这与传递 undefined 不同，后者会被转换为 0。
* deleteCount （可选）
  * 一个整数，表示数组中要从 start 开始删除的元素数量。
  * 如果省略了 deleteCount，或者其值大于或等于由 start 指定的位置到数组末尾的元素数量，那么从 start 到数组末尾的所有元素将被删除（**包括 start 所在的元素**）。
  * 但是，如果你想要传递任何 itemN 参数，则应向 deleteCount 传递 Infinity 值，以删除 start 之后的所有元素，因为显式的 undefined 会转换为 0。
  * 如果 deleteCount 是 0 或者负数，则不会移除任何元素。在这种情况下，你应该至少指定一个新元素（请参见下文）。
* item1, …, itemN  （可选）
  * 从 start 开始要加入到数组中的元素。
  * 如果不指定任何元素，splice() 将只从数组中删除元素。

**返回值：**
* 一个包含了删除的元素的数组。
* 如果只移除一个元素，则返回一个元素的数组。
* 如果没有删除任何元素，则返回一个空数组。
  
**示例：**  
* 移除索引 2 之前的 0（零）个元素，并插入“drum”和“guitar”
```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(2, 0, "drum", "guitar");

// 运算后的 myFish 是 ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// removed 是 []，没有元素被删除
```

* 在索引 2 处移除 1 个元素，并插入“trumpet”
```js
const myFish = ["angel", "clown", "drum", "mandarin", "sturgeon"];
const removed = myFish.splice(3, 1);

// 运算后的 myFish 是 ["angel", "clown", "drum", "sturgeon"]
// removed 是 ["mandarin"]
```

* 从索引 2 处开始移除 2 个元素
```js
const myFish = ["parrot", "anemone", "blue", "trumpet", "sturgeon"];
const removed = myFish.splice(2, 2);

// 运算后的 myFish 是 ["parrot", "anemone", "sturgeon"]
// removed 是 ["blue", "trumpet"]
```

* 从索引 -2 处移除 1 个元素
```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(-2, 1);

// 运算后的 myFish 是 ["angel", "clown", "sturgeon"]
// removed 是 ["mandarin"]
```

* 从索引 2 开始删除所有元素
```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(2);

// 运算后的 myFish 是 ["angel", "clown"]
// removed 是 ["mandarin", "sturgeon"]
```

* splice()
```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice();

// 运算后的 myFish 不变
// removed 是 []
```

## Array.prototype.sort()
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
对有数字的数字使用 sort() ，是根据 Unicode 排序的，不是根据数字大小排，要手写比较函数才能按数字大小排。

**语法**：  
```js
sort()
sort(compareFn)
```

**参数**：
- compareFn 可选
  - 定义排序顺序的函数。返回值应该是一个数字，其正负性表示两个元素的相对顺序。该函数使用以下参数调用：
    - a：第一个用于比较的元素。不会是 undefined。
    - b：第二个用于比较的元素。不会是 undefined。
  - 如果省略该函数，数组元素会被转换为字符串，然后根据每个字符的 Unicode 码位值进行排序。

compareFn(a, b) 返回值 |	排序顺序
|--|--|
`> 0` |	a 在 b 后，如 [b, a]
`< 0` |	a 在 b 前，如 [a, b]
`=== 0` |	保持 a 和 b 原来的顺序

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
- 创建、显示及排序数组
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

- 使用 `map` 改善排序  
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

- 在稀疏数组上使用 `sort()`   
  空槽会被移动到数组的末尾。
```js
console.log(["a", "c", , "b"].sort()); // ['a', 'b', 'c', empty]
console.log([, undefined, "a", "b"].sort()); // ["a", "b", undefined, empty]
```