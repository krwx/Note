# Promise

- [Promise](#promise)
  - [描述](#描述)
    - [Promise 的链式调用](#promise-的链式调用)
    - [Thenable](#thenable)
    - [Promise 并发](#promise-并发)
    - [示例](#示例)
  - [构造函数](#构造函数)
    - [典型的 Promise 流程概述](#典型的-promise-流程概述)
  - [实例方法](#实例方法)
    - [Promise.prototype.catch()](#promiseprototypecatch)
      - [抛出错误时的陷阱](#抛出错误时的陷阱)
    - [Promise.prototype.finally()](#promiseprototypefinally)
  - [静态方法](#静态方法)
    - [Promise.all()](#promiseall)
      - [Promise.all() 和 Promise.allSettled() 的区别](#promiseall-和-promiseallsettled-的区别)
    - [Promise.allSettled()](#promiseallsettled)
    - [Promise.any()](#promiseany)
    - [Promise.race()](#promiserace)
  - [手写 Promise](#手写-promise)
  - [Promise的异常穿透和中断Promise的链式请求](#promise的异常穿透和中断promise的链式请求)
    - [Promise的异常穿透](#promise的异常穿透)
    - [中断Promise链式操作](#中断promise链式操作)

Promise 对象有以下两个特点。

1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态： `pending` （进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从 `pending` 变为 `fulfilled` 和从 `pending` 变为 `rejected` 。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## 描述

Promise 对象表示异步操作最终的完成（或失败）以及其结果值。是异步编程的一种解决方案

**Promise 的状态**：  

一个 Promise 必然处于以下几种状态之一：

- 待定（`pending`）：初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（`fulfilled`）：意味着操作成功完成。
- 已拒绝（`rejected`）：意味着操作失败。

描述：

- 一个待定的 `Promise` **最终状态**可以是已兑现并返回一个值，或者是已拒绝并返回一个原因（错误）。
- 当其中任意一种情况发生时，通过 `Promise` 的 `then` 方法串联的处理程序将被调用。
- 如果绑定相应处理程序时 `Promise` 已经兑现或拒绝，这处理程序将被立即调用，因此在异步操作完成和绑定处理程序之间不存在竞态条件。
- **如果一个 `Promise` 已经被兑现或拒绝，即不再处于待定状态，那么则称之为已敲定（`settled`）**。

**敲定和兑现或拒绝的区别**：

- 敲定包括：已兑现或已拒绝

### Promise 的链式调用

`Promise.prototype.then()、Promise.prototype.catch() 和 Promise.prototype.finally()` 方法用于将进一步的操作与已敲定的 `Promise` 相关联。由于这些方法返回 `Promise`，因此它们可以被链式调用。

**.then()**：  

- `.then()` 方法最多接受两个参数；
  - 第一个参数是 `Promise` **兑现**时的回调函数，
  - 第二个参数是 `Promise` **拒绝**时的回调函数。
  - 每个 `.then()` 返回一个**新生成的 `Promise` 对象**
- 链中每个已兑现的 `Promise` 的返回值会传递给下一个 `.then()`，而已拒绝的 `Promise` 会把失败原因传递给链中下一个拒绝处理函数。
- `promise` 的 `reject` 不是只有报错才使用，数据不符合要求也可以使用，其他场景也可以

**错误处理**：

1. 有的错误必须立即被处理。在这种情况下，必须抛出某种类型的错误以维护链中的错误状态。这时通过 `then()` 的第二个参数进行处理
2. 在没有迫切需要的情况下，最好将错误处理留到最后一个 .`catch()` 语句。

```js
myPromise
  .then(handleFulfilledA)
  .then(handleFulfilledB)
  .then(handleFulfilledC)
  .catch(handleRejectedAny);
```

**例子**：

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

// 语法例子
myPromise
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB)
  .then(handleFulfilledC, handleRejectedC);

// 实际使用
myPromise
  .then((value) => `${value} and bar`)
  .then((value) => `${value} and bar again`)
  .then((value) => `${value} and again`)
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err);
  });
```

**误区**：

```js
const promiseA = new Promise(myExecutorFunc);
const promiseB = promiseA.then(handleFulfilled1, handleRejected1);
const promiseC = promiseA.then(handleFulfilled2, handleRejected2);
```

当 `promiseA resolve` 值时，`promiseB` 和 `promiseC` 都会被调用

### Thenable

Promise 是 thenable 对象。

### Promise 并发

Promise 类提供了四个静态方法来促进异步任务的并发：

- `Promise.all()`
  - 在所有传入的 Promise **都被兑现时兑现**；在**任意一个** Promise 被拒绝时拒绝。
- `Promise.allSettled()`
  - 在所有的 Promise 都**被敲定时兑现**。
- `Promise.any()`
  - 在**任意一个** Promise 被兑现时兑现；仅在**所有的** Promise 都被拒绝时才会拒绝。
- `Promise.race()`
  - 在**任意一个** Promise **被敲定时敲定**。换句话说，在任意一个 Promise 被兑现时兑现；在任意一个的 Promise 被拒绝时拒绝。

所有这些方法都接受一个 Promise（确切地说是 thenable）的可迭代对象，并**返回一个新的 Promise**。

### 示例

错误处理

```js
// 为了尝试错误处理，使用“阈值”值会随机地引发错误。
const THRESHOLD_A = 8; // 可以使用 0 使错误必现

function tetheredGetNumber(resolve, reject) {
  setTimeout(() => {
    const randomInt = Date.now();
    const value = randomInt % 10;
    if (value < THRESHOLD_A) {
      resolve(value);
    } else {
      reject(`太大了：${value}`);
    }
  }, 500);
}

function determineParity(value) {
  const isOdd = value % 2 === 1;
  return { value, isOdd };
}

function troubleWithGetNumber(reason) {
  const err = new Error("获取数据时遇到问题", { cause: reason });
  console.error(err);
  // 一定要抛出错误
  throw err;
}

function promiseGetWord(parityInfo) {
  return new Promise((resolve, reject) => {
    const { value, isOdd } = parityInfo;
    if (value >= THRESHOLD_A - 1) {
      reject(`还是太大了：${value}`);
    } else {
      parityInfo.wordEvenOdd = isOdd ? "奇数" : "偶数";
      resolve(parityInfo);
    }
  });
}

new Promise(tetheredGetNumber)
  .then(determineParity, troubleWithGetNumber)
  .then(promiseGetWord)
  .then((info) => {
    console.log(`得到了：${info.value}, ${info.wordEvenOdd}`);
    return info;
  })
  .catch((reason) => {
    if (reason.cause) {
      console.error("已经在前面处理过错误了");
    } else {
      console.error(`运行 promiseGetWord() 时遇到问题：${reason}`);
    }
  })
  .finally((info) => console.log("所有回调都完成了"));
```

- `.then()` 如果只有一个参数，那么 `reject` 的话会运行 `.catch()`
- `.then()` 有两个参数，那么第二个错误处理回调中处理完错误后，一定要通过 `throw` 抛出错误，不然这个错误会被当作“已修复”，程序会继续执行下面的 `.then()` 链。`throw` 抛出的错误会被 `.catch()` 捕捉到

## 构造函数

Promise() 构造函数

语法：`new Promise(executor)`

- executor：在构造函数中执行的 function。它接收两个函数作为参数：`resolveFunc` 和 `rejectFunc`。
  - `executor` 函数的返回值会被忽略
  - 如果在 `executor` 函数中抛出错误，则 `Promise` 将被拒绝，除非 `resolveFunc` 或 `rejectFunc` 已经被调用。

### 典型的 Promise 流程概述

1. 在构造函数生成新的 `Promise` 对象时，它还会生成一对相应的 `resolveFunc` 和 `rejectFunc` 函数；它们与 `Promise` 对象“绑定”在一起。
   1. 注意：`resolveFunc` 和 `rejectFunc` 函数是 Promise 构造函数生成的

2. `executor` 通常会封装某些提供基于回调的 API 的异步操作。回调函数（传给原始回调 API 的函数）在 `executor` 代码中定义，因此它可以访问 `resolveFunc` 和 `rejectFunc`。

3. `executor` 是**同步调用的**（在构造 `Promise` 时立即调用），并将 `resolveFunc` 和 `rejectFunc` 函数作为传入参数。

4. `executor` 中的代码有机会执行某些操作。异步任务的最终完成通过 `resolveFunc` 或 `rejectFunc` 引起的副作用与 Promise 实例进行通信。这个副作用让 `Promise` 对象变为“已解决”状态。
   - 如果先调用 `resolveFunc`，则传入的值将解决。`Promise` 可能会保持待定状态（如果传入了另一个 `thenable` 对象），或者变为已兑现状态（在传入非 thenable 值的大多数情况下），或者变为已拒绝状态（在解析值无效的情况下）。
  
   - 如果先调用 `rejectFunc`，则 Promise 立即变为已拒绝状态。
  
   - 一旦 `resolveFunc` 或 `rejectFunc` 中的一个被调用，Promise 将保持解决状态。**只有第一次调用 `resolveFunc` 或 `rejectFunc` 会影响 Promise 的最终状态**，随后对任一函数的调用都不能更改兑现值或拒绝原因，也不能将其最终状态从“已兑现”转换为“已拒绝”或相反。
  
   - 如果 `executor` 抛出错误，则 Promise 被拒绝。但是，如果 resolveFunc 或 rejectFunc 中的一个已经被调用（因此 Promise 已经被解决），则忽略该错误。
  
   - 解决 Promise 不一定会导致 Promise 变为已兑现或已拒绝（即已敲定）。Promise 可能仍处于待定状态，因为它可能是用另一个 thenable 对象解决的，但它的最终状态将与已解决的 thenable 对象一致。

5. 一旦 Promise 敲定，它会（异步地）调用任何通过 `then()、catch()` 或 `finally()` 关联的进一步处理程序。

**流程注意的点**：

1. `executor` 是**同步调用的**（在构造 `Promise` 时立即调用）。注意下面的代码的执行顺序

```js
const p1 = new Promise((resolve, reject) => {
  console.log("construct promise");
  resolve("promise resolve value")
})
console.log("hello");
p1.then(value => console.log(value));

/**
 * 输出的结果为：
 * construct promise
 * hello
 * promise resolve value
 */
```

## 实例方法

- [Promise.prototype.catch()](#promiseprototypecatch)
  - 将一个拒绝处理回调函数附加到 Promise 上，并返回一个新的 Promise，如果回调被调用，则解决为回调的返回值，如果 Promise 被兑现，解决为其原始兑现值。
  - 参数有一个，为处理错误的回调函数
  
- [Promise.prototype.finally()](#promiseprototypefinally)
  - 将一个处理器附加到 Promise 上，并返回一个新的 Promise，当原始 Promise 被解决时解决。无论 Promise 是否被兑现还是被拒绝，处理器都会在 Promise 敲定时被调用。
  - 参数有一个，为 Promise 的状态为 `fulfilled` 或 `rejected` 都会调用的回调函数。这个回调函数没有入参，且忽略它的返回值。

- Promise.prototype.then()
  - 将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise，解决为调用处理器得到的返回值，或者如果 Promise 没有被处理（即相关处理器 onFulfilled 或 onRejected 不是函数），则以原始敲定值解决。

### Promise.prototype.catch()

- `Promise` 实例的 `catch()` 方法用于注册一个在 `promise` 被拒绝时调用的函数。
- 它会立即返回一个等效的 `Promise` 对象，这可以允许你链式调用其他 `promise` 的方法。
- **此方法是 `Promise.prototype.then(undefined, onRejected)` 的一种简写形式**。

**返回值**：返回一个新的 promise

**注意**：  
`catch()` 是 `Promise.prototype.then(undefined, onRejected)` 的一种简写形式。这意味着 `.catch()` 后面是可以接 `.then() 或 .catch() 或 .finally()`。

```js
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("p1 延迟解决"), 1000);
});

const p2 = new Promise((resolve, reject) => {
    reject(new Error("p2 立即拒绝"));
});

// p1 没有抛出错误，所以 catch 这里没有进行错误处理，然后接下来的 then 解析了 p1 返回的值，所以打印了数据
p1.catch((error) => {
    console.log(error);
}).then((value) => {
    console.log(value);
})

// p2 这里处理了错误，但是还可以抛出错误，下面的 catch 还可以处理错误。
p2.catch((error) => {
    console.log(error);
    throw error
}).then((value) => {
    console.log(value);
}).catch(error => {
    console.log("2", error);
})
```

#### 抛出错误时的陷阱

在异步函数内部抛出的错误会像未捕获的错误一样：

```js
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("未捕获的异常！");
  }, 1000);
});

p2.catch((e) => {
  console.error(e); // 永远不会被调用
});
```

在调用 resolve 之后抛出的错误会被忽略：

```js
const p3 = new Promise((resolve, reject) => {
  resolve();
  throw new Error("Silenced Exception!");
});

p3.catch((e) => {
  console.error(e); // 这里永远不会执行
});
```

### Promise.prototype.finally()

Promise 实例的 `finally()` 方法用于注册一个在 promise 敲定（兑现或拒绝）时调用的函数。它会立即**返回一个等效的 Promise 对象**

**语法**：`finally(onFinally)`

参数

- onFinally
  - 一个当 promise 敲定时**异步执行**的函数。
  - 它的返回值将被忽略，除非返回一个被拒绝的 promise。
  - 调用该函数时不带任何参数。

返回值

- 返回等效的 Promise。
  - 如果处理程序抛出错误或返回被拒绝的 promise，那么 finally() 返回的 promise 将以该值被拒绝。

`finally()` 方法类似于调用 `then(onFinally, onFinally)`。然而，有几个不同之处：

- 创建内联函数时，你可以只将其传入一次，而不是强制声明两次或为其创建变量。
- `onFinally` 回调函数**不接收任何参数**。这种情况恰好适用于你*不关心*拒绝原因或兑现值的情况，因此无需提供它。
- `finally()` 调用通常是透明的，不会更改原始 promise 的状态。例如：
  - 与 `Promise.resolve(2).then(() => 77, () => {})` 不同，它返回一个最终会兑现为值 `77` 的 promise，而 `Promise.resolve(2).finally(() => 77)` 返回一个最终兑现为值 `2` 的 promise。
  - 类似地，与 `Promise.reject(3).then(() => {}, () => 88)` 不同，它返回一个最终兑现为值 `88` 的 promise，而 `Promise.reject(3).finally(() => 88)` 返回一个最终以原因 `3` 拒绝的 promise。

例子：

```js
function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
```

## 静态方法

- [Promise.all()](#promiseall)
  - 在所有传入的 Promise **都被兑现时兑现**；在**任意一个** Promise 被拒绝时拒绝。
- [Promise.allSettled()](#promiseallsettled)
  - 在所有的 Promise 都**被敲定时兑现**。
- [Promise.any()](#promiseany)
  - 在**任意一个** Promise 被兑现时兑现；仅在**所有的** Promise 都被拒绝时才会拒绝。
- [Promise.race()](#promiserace)
  - 在**任意一个** Promise **被敲定时敲定**。换句话说，在任意一个 Promise 被兑现时兑现；在任意一个的 Promise 被拒绝时拒绝。
- Promise.reject()
  - 返回一个新的 Promise 对象，该对象以给定的原因拒绝。
- Promise.resolve()
  - 返回一个新的 Promise 对象，该对象以给定的值兑现。

### Promise.all()

- 当所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的数组。
- 如果输入的任意 Promise 被拒绝，则返回的 Promise 将被拒绝，并**带有第一个被拒绝的原因**。

#### Promise.all() 和 Promise.allSettled() 的区别

- `Promise.all()` 方法会在任何一个输入的 `Promise` 被拒绝时立即拒绝。
- `Promise.allSettled()` 方法返回的 Promise 会**等待所有输入的 Promise 完成，不管其中是否有 Promise 被拒绝**。如果你需要获取输入可迭代对象中每个 Promise 的最终结果，则应使用 allSettled() 方法。

**例子**：

```js
const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

Promise.all([p1, p2, p3]).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});
```

- Promise.all() 的异步性和同步性
  - 传递非空的 iterable 时，Promise.all() 是异步的
  - 传递空的 iterable 时（例如传递空数组 []），Promise.all() 是同步的

异步性例子：

```js
// 传入一个已经 resolved 的 Promise 数组，以尽可能快地触发 Promise.all
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.all(resolvedPromisesArray);
// 立即打印 p 的值
console.log(p);

// 使用 setTimeout，我们可以在队列为空后执行代码
setTimeout(() => {
  console.log("队列现在为空");
  console.log(p);
});

// 按顺序打印：
// Promise { <state>: "pending" }
// 队列现在为空
// Promise { <state>: "fulfilled", <value>: Array[2] }
```

同步性例子：

```js
const p = Promise.all([]); // 将会立即解决
const p2 = Promise.all([1337, "hi"]); // 非 promise 值将被忽略，但求值是异步进行的
console.log(p);
console.log(p2);
setTimeout(() => {
  console.log("队列现在为空");
  console.log(p2);
});

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// 队列现在为空
// Promise { <state>: "fulfilled", <value>: Array[2] }
```

- `Promise.all` 的快速失败行为
  - `Promise.all` 在任意一个传入的 promise 失败时返回失败。`Promise.all` 将立即被拒绝。

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("一"), 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("二"), 2000);
});
const p3 = new Promise((resolve, reject) => {
  reject(new Error("拒绝"));
});

// 使用 .catch:
Promise.all([p1, p2, p3])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error(error.message);
  });

// 打印：
// "拒绝"
```

通过处理可能的拒绝，可以更改此行为：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1 延迟解决"), 1000);
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error("p2 立即拒绝"));
});

// 这里使用 p2.catch() 相当于处理了错误，然后返回了一个 resolve error 的 Promise，所以 Promise.all() 的状态为 fullfilled，不是 rejected 状态
Promise.all([p1.catch((error) => error), p2.catch((error) => error)]).then(
  (values) => {
    console.log(values[0]); // "p1 延迟解决"
    console.error(values[1]); // "Error: p2 立即拒绝"
  },
);
```

### Promise.allSettled()

例子：

```js
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("一个错误")),
]).then((values) => console.log(values));

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: 一个错误 }
// ]
```

### Promise.any()

- 当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并**返回第一个兑现的值**。
- 当所有输入 Promise **都被拒绝**（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。
- 一旦有一个 Promise 兑现，它就会立即返回，因此不会等待其他 Promise 完成。

**返回值**：一个兑现值。（不是一个兑现值数组，不是一个敲定值）

```js
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"
```

### Promise.race()

`Promise.race()` 静态方法接受一个 promise 可迭代对象作为输入，并返回一个 Promise。**这个返回的 promise 会随着第一个 promise 的敲定而敲定**。

个人理解：

- 敲定代表状态为 `fulfilled` 或 `rejected`，即 `Promise resolve` 或 `reject` 都代表 `Promise` 敲定了。
- 所有 `Promise.race()` 里面的 `Promise` 只要其中一个 `Promise resolve` 或 `reject` 就会返回值

**例子**：

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"
```

**Promise.race 的异步性**：  
Promise.race 总是异步的。没有同步性。

一个空的可迭代对象会导致返回的 Promise 一直处于待定状态：

```js
const foreverPendingPromise = Promise.race([]);
console.log(foreverPendingPromise);
setTimeout(() => {
  console.log("堆栈现在为空");
  console.log(foreverPendingPromise);
});

// 按顺序打印：
// Promise { <state>: "pending" }
// 堆栈现在为空
// Promise { <state>: "pending" }
```

**使用 Promise.race() 实现请求超时**：  

你可以使用一个定时器来与一个可能持续很长时间的请求进行竞争，以便超出时间限制时，返回的 `Promise` 自动拒绝。

```js
const data = Promise.race([
  fetch("/api"),
  new Promise((resolve, reject) => {
    // 5 秒后拒绝
    setTimeout(() => reject(new Error("请求超时")), 5000);
  }),
])
  .then((res) => res.json())
  .catch((err) => displayError(err));
```

如果 `data` `Promise` 被兑现，它将包含从 `/api` 获取的数据；否则，如果 `fetch` 保持待定状态并输给 `setTimeout` 定时器，这个 `Promise` 将在 5 秒后被拒绝。

## 手写 Promise

简单的 Promise：

```js
const promise = new Promise((resolve, reject) => {
    resolve('成功')
    // reject('失败')
})
promise.then(value => {
    console.log(value)
}, reason => {
    console.log(reason)
})
```

原理：

1. 定义状态常量：`pending、fulfilled、rejected`
2. 定义 MyPromise 类
   1. 定义成员变量
      1. `status`：保存当前 Promise 的状态
      2. `value`：保存执行成功的值
      3. `reason`：保存执行失败、reject 的值
      4. `resolveCallbacks`：保存 resolve 后需要执行的回调函数
      5. `rejectCallbacks`：保存 reject 后需要执行的回调函数
      6. `resolve`：为箭头函数，保存 resolve 的逻辑。
         1. **为箭头函数的理由**：避免直接调用时this指向全局window问题
      7. `reject`：为箭头函数，保存 reject 的逻辑。
   2. 定义构造函数
   3. 定义实例方法
      1. `then()`
      2. `catch()`
      3. `finally()`
   4. 定义静态方法
      1. `resolve()`
      2. `all()`
3. 定义处理 promise 返回值各种类型情况的函数：`resolvePromise()`
4. 实现构造函数
   1. 传递 `executor` 并立即执行。`executor` 的两个入参为 `this.resolve` 和 `this.reject`
   2. 需要使用 `try、catch` ，在执行时出错则立即 `reject`
5. `resolve` 箭头函数
   1. 工作内容：在异步操作后返回值，设置 Promise 的状态为 FulFilled
   2. 实现
      1. 判断传入元素是否为 `Promise` 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
      2. 判断 `Promise` 的状态是否为 `Pending` ，只有 `Pending` 的 `Promise` 才能 `resolve` 值
      3. 设置 `Promise` 的状态为 `FulFilled`
      4. 设置 `Promise` 的 `value` 为 `resolve` 的值，保存数据
      5. 遍历 `resolveCallbacks` 数组，执行 `resolve` 后对应的回调函数
6. `reject` 箭头函数
   1. 工作内容：设置 `Promise` 的状态为 `rejected` ，返回 `reject` 的理由
   2. 实现
      1. 判断 `Promise` 的状态是否为 `Pending` ，只有 `Pending` 的 `Promise` 才能 `reject` 值
      2. 设置 `Promise` 的状态为 `Rejected`
      3. 设置 `Promise` 的 `reason` 为 `resolve` 的值，保存 reject 的理由
      4. 遍历 `rejectCallbacks` 数组，执行 `reject` 后对应的回调函数
7. `then` 实例方法
   1. 特点
      1. 有两个入参，一个为 `resolve` 后的回调，一个为 `reject` 后的回调。
      2. 返回一个 `Promise`
      3. `then()` 可以形成 `then()` 链
   2. 实现
      1. 判断两个入参是否为函数，如果不是函数需要初始化一个简单的处理函数
      2. 声明一个 `Promise` 变量：`nextPromise`
      3. 实现当前 `Promise` 的状态为 `Fulfilled` 的处理函数： `resolveHandle`
         1. 调用 第一个入参函数 获取处理后的值，然后对该值进行类型处理，符合数据类型的，则调用 `nextPromise` 的 `resolve`
      4. 实现当前 `Promise` 的状态为 `Rejected` 的处理函数： `rejectHandle`
         1. 调用 第二个入参函数 获取处理后的值，然后对该值进行类型处理，符合数据类型的，则调用 `nextPromise` 的 `resolve`
         2. 从实现可以看出如果没有在第二个入参函数 `throw` 异常的话，`nextPromise` 会是正常的 `promise`，还是可以通过 `.then()`获取数据.
      5. 判断当前 `Promise` 的状态
         1. 如果状态为 `Fulfilled` ，立即执行 `resolveHandle` 函数
         2. 如果状态为 `Rejected` ，立即执行 `rejectHandle` 函数
         3. 如果状态为 `Pending` ，则将 `resolveHandle` 函数放入 `resolveCallbacks` 数组，将 `rejectHandle` 函数放入 `rejectCallbacks` 数组。待 `Promise` 的状态发生变更，则会执行数组中的回调函数
8. `catch` 实例方法
   1. 就是 `then(null, rejectCallback)`
9. `finally` 实例方法
   1. 特性
      1. 类似于调用 `then(onFinally, onFinally)`
      2. `onFinally` 函数没有入参。忽略函数返回的值
      3. 返回一个 `Promise`
      4. `onFinally` 有可能是一个异步函数
   2. 实现
      1. 返回 `then()`
      2. `then()` 的第一个入参函数的内容为：通过 `resolve(onFinally())` 等待异步函数，然后再通过 `.then()` 返回初始的 `value`
      3. `then()` 的第一个入参函数的内容为：通过 `resolve(onFinally())` 等待异步函数，然后再通过 `.then()` 抛出异常
10. `resolve` 静态方法
    1. 如果 `value` 为 `Promise` ，直接返回 `value`
    2. 返回 `MyPromise` 的实例对象，构造函数的 `executor` 直接 `resolve value`
11. `all` 静态方法
    1. 特性
        1. 入参为数组。返回一个会 resolve 返回值组成的数组的 Promise。
        2. 当所有 `Promise resolve` 后返回数组。当任意一个 `Promise reject` 时 `reject`
    2. 实现
       1. 声明数组变量，保存结果。声明 `index` 值，当遍历完 Promise 数组 resolve 结果数组
       2. 返回一个新的 `Promise`
       3. 在 `executor` 中遍历 `Promise` 数组，如果元素不是 `Promise` 类型，则直接添加到结果数组中；如果元素是 `Promise` 类型，则使用 `.then()` 进行处理。

代码：

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    status = PENDING;

    value = null;
    reason = null;

    resolveCallbacks = [];
    rejectCallbacks = [];

    constructor(executor) {
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error)
        }
    }

    resolve = (value) => {
        // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
        if (value instanceof MyPromise) {
            return value.then(this.resolve, this.reject);
        }

        // resolve 是异步的操作。使用 setTimeout 保证代码的执行顺序为本轮事件循环的末尾
        setTimeout(() => {
            if (this.status !== PENDING) return

            this.status = FULFILLED;
            this.value = value;
            this.resolveCallbacks.forEach(callback => {
                callback(value);
            })
        }, 0)
    }

    reject = value => {
        setTimeout(() => {
            if (this.status !== PENDING) return

            this.status = REJECTED;
            this.reason = value;
            this.rejectCallbacks.forEach(callback => {
                callback(value);
            })
        }, 0)
    }

    // 返回 Promise
    then(resolveCallback, rejectCallback) {
        // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
        resolveCallback = typeof resolveCallback === "function" ? resolveCallback : value => this.value;
        rejectCallback = typeof rejectCallback === "function" ? rejectCallback : reason => { throw this.reason };

        const nextPromise = new MyPromise((resolve, reject) => {

            const resolveHandle = () => {
                try {
                    let temp = resolveCallback(this.value);
                    resolvePromise(nextPromise, temp, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }

            const rejectHandle = () => {
                try {
                    let temp = rejectCallback(this.reason);
                    resolvePromise(nextPromise, temp, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }

            // 状态已经完成，返回值
            if (this.status == FULFILLED) {
                resolveHandle();
            } else if (this.status == REJECTED) {
                rejectHandle();
            } else {
                this.resolveCallbacks.push(() => {
                    resolveHandle();
                });
                this.rejectCallbacks.push(() => {
                    rejectHandle();
                })
            }
        })
        return nextPromise;
    }

    catch(rejectCallback) {
        return this.then(null, rejectCallback);
    }

    finally(callback) {
        return this.then((value) => {
            return MyPromise.resolve(callback()).then(() => value);
        }, error => {
            return MyPromise.reject(callback()).then(() => { throw error })
        })
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    static all(array) {
        let result = []
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value
                index++
                if (index === array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i]
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), reason => reject(reason))
                } else {
                    addData(i, array[i])
                }
            }
        })
    }
}

// 处理promise返回值各种类型情况（普通值，promise）
function resolvePromise(nextPromise, value, resolve, reject) {
    if (nextPromise === value) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (value instanceof MyPromise) {
        value.then(resolve, reject)
    } else {
        resolve(value)
    }
}

let p1 = new MyPromise((resolve, reject) => {
    // resolve("123");
    reject("123");
    /* setTimeout(() => {
        reject("123")
        // resolve("123");
    }, 1000); */

})
p1.then((value) => {
    console.log(value);
    return value;
}).then(value => {
    console.log("second get value", value);
    return value;
}).catch(e => {
    console.error(e);
}).finally(() => {
    console.log("finally");
})

const p2 = MyPromise.resolve("fasdf");
p2.then(value => {
    console.log(value);
})

const p3 = MyPromise.all([MyPromise.resolve("13"), 43, MyPromise.resolve("saasf")]);
p3.then(value => {
    console.log(value);
})
```

## Promise的异常穿透和中断Promise的链式请求

### Promise的异常穿透

1. 当你使用 `Promise` 的 `then` ，进行链式调用的时候，可以在最后指定失败的回调
2. 前面任何操作出现了异常，都会传递到最后失败的回调中进行处理；
Promise的异常穿透和 `p.then(resolve=>{ do someting success thing},err=>{ do someting fil thing})`
是不同的哈

promise的异常穿透是进行链式调用的时候才会出现异常穿透；

例子：

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('第一种err');
    }, 2000)
})
p.then(res => {
    console.log(111); //2s后不会输出111
}).then(res => {
    console.log(222); //2s后不会输出222
}).catch(err => {
    console.log(err) //最终直接走这里哈
})
```

之所以会走这里是因为，是 `setTimeout` 抛出了一个错误的异常；所以不会走 `then;` 而是直接走 `catch;`

换一句话说就是:使用 `reject` 之后，将不会去执行 `then` 了，而是去执行 `catch`

**Promise的非异常穿透，对错误的处理**，例子：

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('第一种err');
    }, 2000)
})
p.then((res) => {
    console.log(res)
}, (err) => {
    console.log(err);//输出错误
})
```

总结：

- 当使用`.catch`时，会默认为没有指定失败状态回调函数的`.then`添加一个失败回调函数（上文中有具体函数代码）。
- `.catch`所谓的异常穿透并不是一次失败状态就触发`catch`,而是一层一层的传递下来的。
- 异常穿透的前提条件是所有的`.then`都没有指定失败状态的回调函数。
- 如果`.catch`前的所有`.then`都指定了失败状态的回调函数，`.catch`就失去了意义。

### 中断Promise链式操作

办法：在回调函数中返回一个 `pendding` 状态的 `promise` 对象

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 2000)
})
p.then(res => {
    console.log(111)
    // 有且只有一种方式去中断Promise；让Promise的状态是pendding
    return new Promise(() => {})
}).then(res => {
    console.log(222);
}).catch(err => {
    console.log(err)
})
```

只常的情况下，会输出111和222.

但是你中断了 `Promise` ，让 `Promise` 的状态是 `pendding` ，所以只能够输出111了。222不能够输出。
