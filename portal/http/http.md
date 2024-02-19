# http

- [http](#http)
  - [HTTP 请求类型](#http-请求类型)
    - [幂等](#幂等)
    - [POST 请求与 GET 请求区别](#post-请求与-get-请求区别)
  - [XMLHttpRequest](#xmlhttprequest)
    - [构造函数、属性](#构造函数属性)
    - [使用](#使用)
  - [请求头](#请求头)
  - [响应头](#响应头)

## HTTP 请求类型

HTTP 请求方式一共有 9 种。其中前三种 POST 、GET 、HEAD 是 HTTP 1.0 定义的，后六种 PUT 、PATCH 、 OPTIONS 、DELETE 、CONNECT 、 TRACE 是 HTTP 1.1 定义的。

1. POST 请求  
    POST ：表示向指定资源提交数据，数据包含在请求头中。有可能导致新的资源建立或原有资源修改。 POST 请求是 HTTP 请求中使用最多的一种请求方式。
2. GET 请求  
    GET ：表示请求指定的页面信息，并返回实体内容。  
    HTTP GET 方法请求指定资源的表示。使用 GET 的请求应该只用于请求数据，而不应该包含数据。
3. HEAD 请求  
    HEAD ：类似于 GET，只不过返回的响应体中没有具体内容，只有报文头，用于获取报文头。
4. PUT 请求  
    PUT ：从客户端向服务器传送的数据取代指定的内容，即向指定的位置上传最新的内容。
5. PATCH 请求  
    HTTP PATCH 请求方法用于对资源进行部分修改。  
    与 PUT 的不同点是：PUT 请求会将整个资源覆盖掉，但是 PATCH 请求可以只更新资源的部分
6. OPTIONS 请求  
    HTTP OPTIONS 方法请求给定的 URL 或服务器的允许通信选项。  
    可以检测服务器所支持的请求方法，检测实际请求是否可以被服务器所接受
7. DELETE 请求  
    HTTP DELETE 请求方法用于删除指定的资源。
8. CONNECT 请求  
    CONNECT ：HTTP 1.1 中预留给能够将连接改为管道方式的代理服务器。  
    官方：HTTP CONNECT 方法可以开启与所请求资源之间的双向沟通的通道。它可以用来创建隧道（tunnel）。
9. TRACE 请求  
    TRACE ：回显服务器收到的请求，主要用于测试和诊断。  
    官方：HTTP TRACE 方法沿着通往目标资源的路径进行信息回环测试，提供一个有用的调试机制。

### 幂等

“幂等（idempotent）”一词意味着，任何数量的重复、相同的请求都会使资源处于相同的状态。

GET，HEAD，PUT，DELETE，OPTIONS 和 TRACE 方法都是幂等的

执行多个相同的 PUT 请求，结果不一样。
但是执行多个相同的 PATCH 或 POST 请求，结果可能不一样，存在副作用。

PATCH 请求为什么不是幂等的：

- PUT 和 PATCH 请求的区别体现在服务器处理封闭实体以修改 Request-URI 标志的资源的方式。在一个 PUT 请求中，封闭实体被认为是存储在源服务器上的资源的修改版本，并且客户端正在请求替换存储的版本。而对于 PATCH 请求，封闭实体中包含了一组描述当前保留在源服务器上的资源应该如何被修改来产生一个新版本的指令。PATCH 方法影响由 Request-URI 标志的资源，而且它也可能对其他资源有副作用；也就是，通过使用 PATCH，新资源可能被创造，或者现有资源被修改。
- PATCH 请求中的实体保存的是修改资源的指令，该指令指导服务器来对资源做出修改
- 打个比方：对于存在服务器中的 A 对象有个属性 B 为 1，如果要修改 B 属性为 3，则 PUT 请求是直接将修改过 B 属性的整个新对象发送给服务器查找并替换。而 PATCH 请求是在实体中包含指令 --- 将 A 对象中 B 属性的值加 2，那么如果该请求被执行多次的话，B 属性就可能不为 3 了，而 PUT 请求不论执行多少次，B 属性永远都是 3，所以说 PUT 方法是幂等的，而 PATCH 方法不是幂等的。

### POST 请求与 GET 请求区别

```text
1. 本质区别  
POST :向服务器传送数据  
GET: 向服务器获取数据

2. 请求参数形式  
POST : 附在正文中  
GET: 拼接在URL上，多个参数之间用 & 隔开，如果参数是中文值，则会转换成诸如%ab%12的加密16进制码。

3. 请求数据大小限制  
POST : 正文没有长度限制，表单所能处理的长度在100k（不同协议不同浏览器不一样）  
GET: URL长度有限制，在 1024K 左右（不同协议不同浏览器不一样）

4. 安全性  
POST : 相对 GET 安全，但是如果不使用 HTTPS，报文正文仍是明文，容易被人截获读取。  
GET: URL上可见传输参数，所以安全性极低。一般用来传输一些公开的参数信息，解析也方便。

5. 浏览器后退，刷新是否重新请求  
POST : 是
GET: 否

6. 是否能被收藏为书签、是否被缓存、参数是否被保留浏览器历史  
POST : 否
GET: 是

7. 对数据类型的限制  
POST : 没有限制，也允许二进制数据。
GET: 只允许 ASCII 字符

8. 编码类型  
POST : application/x-www-form-urlencoded 或 multipart/form-data  
GET: application/x-www-form-urlencoded
pplication/x-www-form-urlencoded 是浏览器默认的编码格式
```

## XMLHttpRequest

XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。  

XMLHttpRequest 在 AJAX 编程中被大量使用。

XMLHttpRequest 可以用于获取任何类型的数据，而不仅仅是 XML。它甚至支持 HTTP 以外的协议（包括 file:// 和 FTP）

>如果您的通信流程需要从服务器端接收事件或消息数据，请考虑通过 EventSource 接口使用服务器发送事件。对于全双工的通信，WebSocket 可能是更好的选择。

### 构造函数、属性

- XMLHttpRequest()
  - 该构造函数用于初始化一个 XMLHttpRequest 实例对象。
- XMLHttpRequest.status （只读）
  - 返回一个无符号短整型（unsigned short）数字，代表请求的响应状态。
- XMLHttpRequest.timeout
  - 一个无符号长整型（unsigned long）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。
  - 可以进行设置
- XMLHttpRequest.readyState（只读）
  - 返回 一个无符号短整型（unsigned short）数字，代表请求的状态码。
- XMLHttpRequest.response（只读）
  - 返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应实体（response entity body）。
- XMLHttpRequest.responseText（只读）
  - 返回一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回 null。
- XMLHttpRequest.responseType
  - 一个用于定义响应类型的枚举值（enumerated value）。
- XMLHttpRequest.responseXML（只读）
  - 返回一个 Document，其中包含该请求的响应，如果请求未成功、尚未发送或是不能被解析为 XML 或 HTML，则返回 null。

### 使用

```js
function reqListener() {
  console.log(this.responseText);
}

// 创建 XMLHttpRequest 对象
var oReq = new XMLHttpRequest();
// 设置响应
oReq.addEventListener("load", reqListener);
// 打开 URL
oReq.open("GET", "http://www.example.org/example.txt");
// 发送请求
oReq.send();
```

XMLHttpRequest.open()

- XMLHttpRequest.open() 方法初始化一个新创建的请求，或重新初始化一个请求。
- 语法为 xhrReq.open(method, url); 或 xhrReq.open(method, url, async); 或其他
- method 为 HTTP 请求方法
- **async 默认为 true，即默认是异步请求。false 为同步请求**

## 请求头

- Referer
  - `Referer` 请求头包含了**当前请求页面的来源页面的地址**，即表示当前页面是通过此来源页面里的链接进入的。
  - 服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。

## 响应头

- Cache-Control:
  - 缓存控制 private 私有的，只允许客户端缓存数据
- Connection
  - 链接设置
- Content-Type:text/html;charset=utf-8
  - 设置响应体的数据类型以及字符集,响应体为- html，字符集 utf-8
- Content-Length
  - 响应体的长度，单位为字节
- Location
  - 指定的是需要将页面重新定向至的地址。一般在响应码为 3xx 的响应中才会有意义。
- Content-Disposition
  - 在 HTTP 场景中，第一个参数或者是 `inline`（默认值，表示回复中的消息体会以页面的一部分或者整个页面的形式展示）
  - 或者是 `attachment`（意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将 filename 的值预填为下载后的文件名，假如它存在的话）。
  
  ```text
  Content-Disposition: inline
  Content-Disposition: attachment
  Content-Disposition: attachment; filename="filename.jpg"
  ```

- Set-Cookie
  - Set-Cookie HTTP 响应标头用于将 cookie 由服务器发送到用户代理，以便用户代理在后续的请求中可以将其发送回服务器。要发送多个 cookie，则应在同一响应中发送多个 Set-Cookie 标头。
- 设置跨域
  - Access-Control-Allow-Credentials: true
  - Access-Control-Allow-Origin: *
