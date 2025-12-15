# Web Storage API

- [Web Storage API](#web-storage-api)
  - [Web Storage 概念和用法](#web-storage-概念和用法)
  - [生命周期](#生命周期)
  - [Web Storage 接口](#web-storage-接口)
  - [隐私浏览/隐身模式](#隐私浏览隐身模式)
  - [使用](#使用)
  - [localStorage](#localstorage)
    - [localStorage 是同步的](#localstorage-是同步的)

## Web Storage 概念和用法

Web Storage 包含如下两种机制：

- **sessionStorage**
  - **为每一个给定的源（origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）**。
  - 仅为会话存储数据，这意味着数据将一直存储到浏览器（或选项卡）关闭。
  - 数据永远不会被传输到服务器。
  - 存储限额大于 `cookie` （最大 5MB）。
  - 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
  - 在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 `session cookie` 的运行方式不同。
  - 打开多个相同的 URL 的 Tabs 页面，会创建各自的 `sessionStorage`。
  - 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`。
  - 主要存放在**内存**中
- **localStorage**
  - 做同样的事情，但即使浏览器关闭并重新打开也仍然存在。
  - 存储的数据没有过期日期，只能通过 JavaScript、清除浏览器缓存或本地存储的数据来清除。
  - 每个域名下的 `localStorage` 容量上限设定在 `5MB` 以下。
  - 存放在**磁盘**中

这两种机制是通过 `Window.sessionStorage` 和 `Window.localStorage` 属性使用

页面会话期间的含义是：**只要浏览器处于打开状态，包括页面重新加载和恢复**

## 生命周期

`sessionStorage` 的生命周期：

1. `sessionStorage` 存活于当前标签页，当关闭了当前标签页或浏览器窗口都会清除掉 `sessionStorage`
2. 当前的标签页进行刷新或者恢复页面， `sessionStorage` 都存在
3. 打开相同 `url` 的多个标签页，会创建各自的 `sessionStorage`
4. 当从A页面跳转到域名的B页面，B页面会复制A页面的 `sessionStorage` ，但是两个页面的 `sessionStorage` 不会互相影响

`localStorage` 的生命周期：

1. 浏览器关闭了也会存在
2. 只能通过 JavaScript、清除浏览器缓存或本地存储的数据来清除
3. 在同一个域内是共享的

## Web Storage 接口

- `Storage`
  - 允许你在一个特定域中设置、检索和删除数据和储存类型（session 或 local）。  
`localStorage` 和 `sessionStorage` 就是 Storage 对象。
- `Window`
  - Web Storage API 继承于 Window 对象，并提供两个新属性——`Window.sessionStorage` 和 `Window.localStorage`——分别地提供对当前域的会话和本地 Storage 对象的访问。以及当存储区域改变时触发的 storage 事件处理器（例如，存储新的项）。
- `StorageEvent`
  - 当一个存储区域发生变化时，在文档的 `Window` 对象上触发 `storage` 事件。

## 隐私浏览/隐身模式

隐私窗口、隐身模式和类似名称的隐私浏览选项**不会存储历史记录和 cookie 等数据**。

在隐身模式下， `localStorage` 被视为 `sessionStorage` 。存储 API 仍然可用且功能齐全，但是当浏览器或浏览器选项卡关闭时，所有存储在隐私窗口中的数据都会被删除。

## 使用

1. 测试可用性  
    支持 `localStorage` 的浏览器将在窗口对象上具有一个名为 `localStorage` 的属性。但是，仅断言该属性存在可能会引发异常。如果 `localStorage` 确实存在，则仍然不能保证 localStorage 实际可用，因为各种浏览器都提供了禁用 localStorage 的设置。因此，浏览器可能支持 localStorage，但不适用于页面上的脚本。

    例如，私有浏览模式下的 Safari 浏览器为我们提供了一个空的 localStorage 对象，其配额为零，实际上使它无法使用。相反，我们可能会收到合法的 QuotaExceededError，这意味着我们已经用完了所有可用的存储空间，但实际上存储空间可用。我们的功能检测应考虑这些情况
2. 设置、获取、删除、清空

    ```js
    localStorage.colorSetting = "#a4509b";
    localStorage["colorSetting"] = "#a4509b";
    localStorage.setItem("colorSetting", "#a4509b");

    let currentImage = localStorage.getItem("image");

    localStorage.removeItem("colorSetting")
    localStorage.clear();
    ```

3. 响应事件  
   - 通过监听 `storage` 事件响应存储的变化。  
   - `Storage` 对象发生变化时（即创建/更新/删除数据项时，重复设置相同的键值不会触发该事件，Storage.clear() 方法至多触发一次该事件），StorageEvent 事件会触发。**在同一个页面内发生的改变不会起作用——在相同域名下的其他页面（如一个新标签或 iframe）发生的改变才会起作用**

   ```js
   window.addEventListener("storage", function (e) {
    document.querySelector(".my-key").textContent = e.key;
    document.querySelector(".my-old").textContent = e.oldValue;
    document.querySelector(".my-new").textContent = e.newValue;
    document.querySelector(".my-url").textContent = e.url;
    document.querySelector(".my-storage").textContent = e.storageArea;
   });
   ```

## localStorage

### localStorage 是同步的

当一个 js 访问 `localStorage` 时，它将同步地等待数据从 IO 读取或写入 IO 完成，该过程中 js 执行线程会阻塞。

```js
// 这些操作都会阻塞主线程，直到完成
localStorage.setItem('key', 'value');  // 同步写入
const value = localStorage.getItem('key');  // 同步读取
localStorage.removeItem('key');  // 同步删除
```

由于是同步操作，当存储大量数据或频繁操作时，可能会阻塞页面渲染，导致用户体验下降：

```js
// 不推荐的写法 - 大量同步操作
for (let i = 0; i < 10000; i++) {
    localStorage.setItem(`item_${i}`, largeData); // 每次循环都会阻塞
}

// 更好的做法 - 批量操作
const batchData = {};
for (let i = 0; i < 10000; i++) {
    batchData[`item_${i}`] = largeData;
}
localStorage.setItem('batch', JSON.stringify(batchData));
```

如果需要存储大量数据或需要异步操作可以使用 `indexedDB`，它是异步的，不会阻塞主线程。

`sessionStorage` 也是同步的。
