# Web Worker

- [Web Worker](#web-worker)
  - [介绍](#介绍)
    - [Worker 类型](#worker-类型)
    - [Worker 全局上下文和函数](#worker-全局上下文和函数)
  - [专用 worker](#专用-worker)
  - [共享 worker](#共享-worker)

## 介绍

Web Worker 使得在一个独立于 Web 应用程序主执行线程的后台线程中运行脚本操作成为可能。这样做的好处是可以在独立线程中执行费时的处理任务，使主线程（通常是 UI 线程）的运行不会被阻塞/放慢。

不能直接在 worker 线程中操作 DOM 元素，或使用 window 对象中的某些方法和属性。

**数据通过消息系统在 worker 和主线程之间发送——双方都使用 `postMessage()` 方法发送消息，并通过 `onmessage` 事件处理程序响应消息（消息包含在 message 事件的 data 属性中）。数据是复制的，而不是共享的。**

worker 可以依次生成新的 worker，只要这些 worker 与父页面托管在同一个 origin 中。此外，worker 可以通过 XMLHttpRequest 来访问网络，但 XMLHttpRequest 的 responseXML 和 channel 属性始终返回 null。

### Worker 类型

有许多不同类型的 worker：

- 专用 `worker`
  - 是由单个脚本使用的 worker。该上下文由 `DedicatedWorkerGlobalScope` 对象表示。
- `Shared worker`
  - 是可以由在不同窗口、IFrame 等中运行的多个脚本使用的 worker，只要它们与 worker 在同一域中。它们比专用的 worker 稍微复杂一点——**脚本必须通过活动端口进行通信**。
- `Service Worker`
  - 基本上是作为代理服务器，位于 web 应用程序、浏览器和网络（如果可用）之间。它们的目的是（除开其他方面）创建有效的离线体验、拦截网络请求，以及根据网络是否可用采取合适的行动并更新驻留在服务器上的资源。它们还将允许访问推送通知和后台同步 API。

一个专用 worker 仅能被首次生成它的脚本使用，而共享 worker 可以同时被多个脚本使用。

### Worker 全局上下文和函数

**worker 在一个与当前 window 不同的全局上下文中运行**。虽然 Window 不能直接用于 worker，但许多相同的方法被定义在一个共享的混入（`WindowOrWorkerGlobalScope`）中，并通过 worker 自己的 `WorkerGlobalScope` **衍生**的上下文提供给它们：

- DedicatedWorkerGlobalScope： 用于专用 worker
- SharedWorkerGlobalScope：  用于共享 worker
- ServiceWorkerGlobalScope： 用于 service worker

## 专用 worker

一个专用 worker 仅能被生成它的脚本所使用。

创建 Worker

```js
// 调用 Worker() 构造器，指定一个脚本的 URI 来执行 worker 线程
const myWorker = new Worker("worker.js");
```

发送消息

```js
// 通过 postMessage() 发送消息
myWorker.postMessage("message");
console.log("Message posted to worker");
```

wokerr 接收消息

```js
// worker 通过 onmessage() 监听消息
onmessage = (e) => {
  console.log("Message received from main script");
  const workerResult = `Result: ${e.data}`;
  console.log("Posting message back to main script");
  // 监听消息过程中可以再发送处理过的数据给主线程
  postMessage(workerResult);
};
```

主线程接收消息

```js
myWorker.onmessage = (e) => {
  result.textContent = e.data;
  console.log("Message received from worker");
};
```

**当一个消息在主线程和 worker 之间传递时，它被复制或者转移了，而不是共享。**

> 在主线程中使用时，onmessage 和 postMessage() 必须挂在 worker 对象上，而在 worker 中使用时不用这样做。原因是，在 worker 内部，worker 是有效的全局作用域。

终止 worker

```js
myWorker.terminate();
```

处理错误

```js
myWorker.onerror  = (e) => {
  console.log(e);
};
```

引入脚本与库

```js
importScripts("foo.js"); /* 只引入 "foo.js" */
```

> 如果脚本无法加载，将抛出 NETWORK_ERROR 异常，接下来的代码也无法执行。而之前执行的代码（包括使用 setTimeout() 异步执行的代码）依然能够运行。  
>
> 脚本的下载顺序不固定，但执行时会按照传入 importScripts() 中的文件名顺序进行。这个过程是同步完成的；直到所有脚本都下载并运行完毕，importScripts() 才会返回。

## 共享 worker

一个共享 worker 可以被多个脚本使用——即使这些脚本正在被不同的 window、iframe 或者 worker 访问。

如果共享 worker 可以被多个浏览上下文调用，所有这些浏览上下文必须属于同源。

生成共享的 worker

```js
// 不同的 js 文件内调用下面的语句生成的 shared worker 都是一个共享的 worker
const myWorker = new SharedWorker("worker.js");
```

主线程打开连接，监听消息

```js
myWorker.port.onmessage = function (event) {
    result2.textContent = event.data;
    console.log("Message received from worker");
};
```

> 在传递消息之前，端口连接必须被显式的打开，打开方式是使用 `onmessage` 事件处理函数或者 `start()` 方法。（只有一种情况下需要调用 `start()` 方法，那就是 message 事件被 `addEventListener()` 方法使用。）

主线程发送消息

```js
myWorker.port.postMessage("data");
console.log("Message posted to worker");
```

共享 worker 接收消息

```js
onconnect = (e) => {
  const port = e.ports[0];

  port.onmessage = (e) => {
    const workerResult = `Result: ${e.data}`;
    // worker 发送处理了的消息
    port.postMessage(workerResult);
  };
};
```
