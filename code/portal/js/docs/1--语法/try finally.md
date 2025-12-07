# try finally

在 try finally 里面执行异步操作（例如发送 http 请求），但是不使用 await 等待，那么 finally 里面的代码不会等异步操作完成后再执行

不会。`finally` 块中的代码**不会**等待异步请求完成后再执行。

## 执行顺序说明

```javascript
try {
  console.log('1. 开始发送请求');
  fetch('/api/data') // 异步请求
    .then(response => console.log('3. 请求完成'));
} finally {
  console.log('2. finally 执行');
}

// 输出顺序：
// 1. 开始发送请求
// 2. finally 执行
// 3. 请求完成
```

## 为什么会这样？

- `fetch()` 是**异步操作**，它会立即返回一个 Promise，而不会阻塞代码执行
- `finally` 块会在 `try` 块中的**同步代码执行完后立即执行**，不会等待异步操作完成
- JavaScript 的事件循环机制决定了异步回调会在后续的微任务/宏任务中执行

## 如果你需要等待请求完成

可以使用 `async/await`：

```javascript
async function example() {
  try {
    console.log('1. 开始发送请求');
    await fetch('/api/data');
    console.log('2. 请求完成');
  } finally {
    console.log('3. finally 执行');
  }
}

// 输出顺序：
// 1. 开始发送请求
// 2. 请求完成
// 3. finally 执行
```

或者手动控制：

```javascript
let requestCompleted = false;

try {
  fetch('/api/data')
    .then(() => {
      requestCompleted = true;
      console.log('请求完成');
    });
} finally {
  // 这里仍然不会等待请求完成
  console.log('finally 执行，请求完成状态:', requestCompleted);
}
```

**总结**：`finally` 只关心同步执行流程，不关心异步操作的状态。
