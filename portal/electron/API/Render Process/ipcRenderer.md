# ipcRenderer
从渲染器进程到主进程的异步通信。

`ipcRenderer` 是一个 `EventEmitter` 的实例。 你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

## 方法

### on

### send

### invoke

### postMessage
`ipcRenderer.postMessage(channel, message, [transfer])`

参数：
* `channel` string
* `message` any
* `transfer` MessagePort[] (optional)

发送消息到主进程，同时可以选择性发送零到多个 `MessagePort` 对象

### once