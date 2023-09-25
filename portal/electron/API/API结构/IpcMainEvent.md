# IpcMainEvent Object extends Event
* `processId` Integer - 发送该消息的渲染进程内部的ID
* `frameId` Integer - 发送该消息的渲染进程框架的ID（可能是iframe）
* `returnValue` any - 如果对此赋值，则该值会在同步消息中返回
* `sender` WebContent - 返回发送消息的 webContents
* `senderFrame` WebFramework Readly - 发送此消息的框架
* `ports` MessagePortMain[] - 带有此消息传递的 MessagePort 列表
* `reply` Function - 将 IPC 消息发送到渲染器框架的函数，该渲染器框架发送当前正在处理的原始消息。 您应该使用“reply”方法回复发送的消息，以确保回复将转到正确的进程和框架。
channel string
...args any[]