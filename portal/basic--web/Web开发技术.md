- [服务器发送事件：EventSource](#服务器发送事件eventsource)
  - [事件流格式](#事件流格式)
  - [从服务端接收事件](#从服务端接收事件)
  - [从服务器端发送事件](#从服务器端发送事件)
  - [EventSource 与 WebSocket Http 的对比](#eventsource-与-websocket-http-的对比)
- [WebSocket](#websocket)
  - [接口](#接口)
  - [编写 WebSocket 客户端应用](#编写-websocket-客户端应用)
  - [编写 WebSocket 服务器](#编写-websocket-服务器)


# 服务器发送事件：EventSource
你只需要在服务器上编写一些代码将事件流传输到前端，而客户端的代码在处理传入事件部分几乎与 websocket 相同。这是一个**单向的连接，所以你不能从客户端发送事件到服务器**。

该 API 建立的连接基于 HTTP 协议，而不是 WebSocket

## 事件流格式
规范中规定了下面这些字段：
- event  
一个用于**标识事件类型的字符串**。如果指定了这个字符串，浏览器会将具有指定事件名称的事件分派给相应的监听器；网站源代码应该使用 addEventListener() 来监听指定的事件。如果一个消息没有指定事件名称，那么 onmessage 处理程序就会被调用。
- data  
**消息的数据字段**。当 EventSource 接收到多个以 data: 开头的连续行时，会将它们连接起来，在它们之间插入一个换行符。末尾的换行符会被删除。
- id  
**事件 ID**，会成为当前 EventSource 对象的内部属性“最后一个事件 ID”的属性值。
- retry  
**重新连接的时间**。如果与服务器的连接丢失，浏览器将等待指定的时间，然后尝试重新连接。这必须是一个整数，以毫秒为单位指定重新连接的时间。如果指定了一个非整数值，该字段将被忽略。

## 从服务端接收事件
1. 创建一个 EventSource 实例  
   使用**生成事件的脚本 URL** 创建一个 EventSource 对象，用来开启与服务器的连接并从中接收事件.
   ```js
   const evtSource = new EventSource("ssedemo.php");
   ```
2. 监听 message 事件  
   如果服务器发送的消息中没有 event 字段，则这些消息会被视为 message 事件。为了接收这些 message 事件，需要为 message 事件附加一个事件处理程序。
   1. 没有 event 字段，使用 message 事件监听
        ```js
        evtSource.onmessage = function (event) {
            console.log(event.data);
        };
        ```
   2. 有 event 字段，使用 addEventListener() 来监听指定的事件  
        如果服务器发送的消息中定义了 event 字段，就会以 event 中给定的名称作为事件接收
        ```js
        evtSource.addEventListener("ping", (event)  => {
            console.log(event.data);
        });
        ```
3. 错误处理  
    监听 onerror 事件
    ```js
    evtSource.onerror = (err) => {
        console.error("EventSource failed:", err);
    };
    ```
4. 关闭事件流  
    ```js
    evtSource.close();
    ```


## 从服务器端发送事件
发送事件的服务器端脚本需要使用 text/event-stream MIME 类型响应内容。每个通知以文本块形式发送，并以一对换行符结尾。  

**仅支持纯文本格式**

服务器端发送的数据必须以“data: ”开头，以“\n\n”结尾，中间部分为数据内容。  
例如：“data: hello\n\n”。- 服务器端发送的数据可以包含多个“data: ”段，每个段之间用“\n\n”分隔。

一旦建立连接，服务器就可以使用以下语法向客户端发送事件：
```js
eventSource.sendEvent('eventName', { data: 'eventData' });
```

## EventSource 与 WebSocket Http 的对比
1. 协议   
   EventSource 基于 HTTP 协议，使用的是 HTTP 的长连接机制，而 WebSocket 则是一种独立的协议，与 HTTP 没有关系。
2. 双向通信   
   WebSocket 支持双向通信，客户端和服务器都可以主动发送数据。而 EventSource 只支持服务器向客户端的单向通信，客户端只能接收数据，不能主动发送数据。
3. 数据格式   
   WebSocket 可以发送任意格式的数据，包括文本、二进制等。而 EventSource 仅支持纯文本格式，采用了一种特殊的格式来传输事件数据。
4. 浏览器兼容性   
   WebSocket 是 HTML5 新增的标准，兼容性相对较差，在一些旧版本的浏览器中不支持。而 EventSource 的兼容性相对较好，在大多数现代浏览器中都能够正常工作。
5. 实时性   
   WebSocket 的实时性更高，它的通信速度和性能都比 EventSource 更优秀。因为 WebSocket 是双向通信，数据传输的效率更高，而 EventSource 由于是单向通信，数据传输的速度会稍慢一些。

总的来说，WebSocket 和 EventSource 都有着自己的优点和适用场景。WebSocket 更适合需要双向通信的应用场景，例如实时游戏、在线协作等等。而 EventSource 则更适合需要单向数据推送的应用场景，例如实时监控、股票行情等等。因此，在选择使用哪种技术时，需要根据具体的需求进行选择。

# WebSocket
WebSockets 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此 API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。

WebSocket 通过TCP（传输控制协议）通信.

## 接口
- WebSocket  
用于连接 WebSocket 服务器的主要接口，之后可以在这个连接上发送 和接受数据。
- CloseEvent  
连接关闭时 WebSocket 对象发送的事件。
- MessageEvent  
当从服务器获取到消息的时候 WebSocket 对象触发的事件。

## 编写 WebSocket 客户端应用
1. 创建 WebSocket 对象  
    WebSocket 构造函数接受一个必要参数和一个可选参数:
    ```js
    /*
    url：要连接的 URL；这应当是 WebSocket 服务器会响应的 URL。
    protocols（可选）：一个协议字符串或一个协议字符串数组。
    */
    WebSocket WebSocket(
        in DOMString url,
        in optional DOMString protocols
    );

    // 创建实例。这里使用了 protocolOne 的自定义协议
    var exampleSocket = new WebSocket(
        "ws://www.example.com/socketserver",
        "protocolOne",
    );
    // 返回后，exampleSocket.readyState 参数为 CONNECTING。一旦连接可以传送数据，readyState 就会变成 OPEN 。
    ```
    如果尝试连接过程中发生错误，那么首先一个名为 "error" 的事件会被发送给 WebSocket 对象（然后调用其onerror handler），然后 CloseEvent 被发送给WebSocket （然后调用其 onclose handler）以说明连接关闭的原因。

2. 发送数据  
   使用 send() 方法发送数据。你可以把数据作为字符串，Blob，或者ArrayBuffer来发送。
   ```js
    exampleSocket.send("data");

    // 在链接建立起来之后立马发送数据，可以通过注册 onopen 事件处理器解决：
    exampleSocket.onopen = function (event) {
        exampleSocket.send("data");
    };

    // 发送 JSON 对象
    var msg = {
        type: "message",
    };
    // 把 msg 对象作为 JSON 格式字符串发送
    exampleSocket.send(JSON.stringify(msg));
   ```
3. 接收服务器的数据  
   收到消息的时候，一个 "message" 消息会被发送到 onmessage 函数。
   ```js
    exampleSocket.onmessage = function (event) {
        console.log(event.data);
    };
   ```
4. 关闭连接
   ```js
   exampleSocket.close();
   ```
## 编写 WebSocket 服务器
WebSocket 服务器可以用任何实现了Berkeley sockets的服务器端编程语言编写，如 C(++) 或 Python 甚至PHP (en-US)和服务器端 JavaScript。

Java 通过 ServerSocket 类实现，该类位于 java.net 包中。
   
