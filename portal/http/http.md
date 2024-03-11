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
  - [状态码](#状态码)
    - [信息响应](#信息响应)
    - [成功响应](#成功响应)
    - [重定向消息](#重定向消息)
    - [客户端错误响应](#客户端错误响应)
    - [服务端错误响应](#服务端错误响应)
  - [HTTPS 和 HTTP 的介绍和区别](#https-和-http-的介绍和区别)

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

## 状态码

响应被归为以下五大类：

1. 信息响应 (100–199)
2. 成功响应 (200–299)
3. 重定向消息 (300–399)
4. 客户端错误响应 (400–499)
5. 服务端错误响应 (500–599)

[状态码参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

常用状态码：

- 200：请求成功
- 403：禁止请求
- 404：找不到资源
- 500：服务器内部错误

### 信息响应

- 100 Continue
  - : 这个临时响应表明，迄今为止的所有内容都是可行的，客户端应该继续请求，如果已经完成，则忽略它。
- 101 Switching Protocols
  - : 该代码是响应客户端的 `Upgrade` 请求头发送的，指明服务器即将切换的协议。
- 102 Processing
  - : 此代码表示服务器已收到并正在处理该请求，但当前没有响应可用。
- 103 Early Hints
  - : 此状态代码主要用于与 `Link` 链接头一起使用，以允许用户代理在服务器准备响应阶段时开始预加载 `preloading` 资源。

### 成功响应

- 200 OK

  - : 请求成功。成功的含义取决于 HTTP 方法：

    - `GET`: 资源已被提取并在消息正文中传输。
    - `HEAD`: 实体标头位于消息正文中。
    - `PUT` or `POST`: 描述动作结果的资源在消息体中传输。
    - `TRACE`: 消息正文包含服务器收到的请求消息。

- 201 Created
  - : 该请求已成功，并因此创建了一个新的资源。这通常是在 POST 请求，或是某些 PUT 请求之后返回的响应。
- 202 Accepted
  - : 请求已经接收到，但还未响应，没有结果。意味着不会有一个异步的响应去表明当前请求的结果，预期另外的进程和服务去处理请求，或者批处理。
- 203 Non-Authoritative Information
  - : 服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。当前的信息可能是原始版本的子集或者超集。例如，包含资源的元数据可能导致原始服务器知道元信息的超集。使用此状态码不是必须的，而且只有在响应不使用此状态码便会返回`200 OK`的情况下才是合适的。
- 204 No Content
  - : 对于该请求没有的内容可发送，但头部字段可能有用。用户代理可能会用此时请求头部信息来更新原来资源的头部缓存字段。
- 205 Reset Content
  - : 告诉用户代理重置发送此请求的文档。
- 206 Partial Content
  - : 当从客户端发送 `Range` 范围标头以只请求资源的一部分时，将使用此响应代码。
- 207 Multi-Status
  - : 对于多个状态代码都可能合适的情况，传输有关多个资源的信息。
- 208 Already Reported
  - : 在 DAV 里面使用 `<dav:propstat>` 响应元素以避免重复枚举多个绑定的内部成员到同一个集合。
- 226 IM Used
  - : 服务器已经完成了对资源的`GET`请求，并且响应是对当前实例应用的一个或多个实例操作结果的表示。

### 重定向消息

- 300 Multiple Choice
  - : 请求拥有多个可能的响应。用户代理或者用户应当从中选择一个。（没有标准化的方法来选择其中一个响应，但是建议使用指向可能性的 HTML 链接，以便用户可以选择。）
- 301 Moved Permanently
  - : 请求资源的 URL 已永久更改。在响应中给出了新的 URL。
- 302 Found
  - : 此响应代码表示所请求资源的 URI 已 _暂时_ 更改。未来可能会对 URI 进行进一步的改变。因此，客户机应该在将来的请求中使用这个相同的 URI。
- 303 See Other
  - : 服务器发送此响应，以指示客户端通过一个 GET 请求在另一个 URI 中获取所请求的资源。
- 304 Not Modified
  - : 这是用于缓存的目的。它告诉客户端响应还没有被修改，因此客户端可以继续使用相同的缓存版本的响应。
- 307 Temporary Redirect
  - : 服务器发送此响应，以指示客户端使用在前一个请求中使用的相同方法在另一个 URI 上获取所请求的资源。这与 `302 Found` HTTP 响应代码具有相同的语义，但用户代理 _不能_ 更改所使用的 HTTP 方法：如果在第一个请求中使用了 `POST`，则在第二个请求中必须使用 `POST`
- 308 Permanent Redirect
  - : 这意味着资源现在永久位于由`Location:` HTTP Response 标头指定的另一个 URI。这与 `301 Moved Permanently` HTTP 响应代码具有相同的语义，但用户代理不能更改所使用的 HTTP 方法：如果在第一个请求中使用 `POST`，则必须在第二个请求中使用 `POST`。

### 客户端错误响应

- 400 Bad Request
  - : 由于被认为是客户端错误（例如，错误的请求语法、无效的请求消息帧或欺骗性的请求路由），服务器无法或不会处理请求。
- 401 Unauthorized
  - : 虽然 HTTP 标准指定了"unauthorized"，但从语义上来说，这个响应意味着"unauthenticated"。也就是说，客户端必须对自身进行身份验证才能获得请求的响应。
- 403 Forbidden
  - : 客户端没有访问内容的权限；也就是说，它是未经授权的，因此服务器拒绝提供请求的资源。与 `401 Unauthorized` 不同，服务器知道客户端的身份。
- 404 Not Found
  - : 服务器找不到请求的资源。在浏览器中，这意味着无法识别 URL。在 API 中，这也可能意味着端点有效，但资源本身不存在。服务器也可以发送此响应，而不是 `403 Forbidden`，以向未经授权的客户端隐藏资源的存在。这个响应代码可能是最广为人知的，因为它经常出现在网络上。
- 405 Method Not Allowed
  - : 服务器知道请求方法，但目标资源不支持该方法。例如，API 可能不允许调用`DELETE`来删除资源。
- 406 Not Acceptable
  - : 当 web 服务器在执行**服务端驱动型内容协商机制**后，没有发现任何符合用户代理给定标准的内容时，就会发送此响应。
- 407 Proxy Authentication Required
  - : 类似于 `401 Unauthorized` 但是认证需要由代理完成。
- 408 Request Timeout
  - : 此响应由一些服务器在空闲连接上发送，即使客户端之前没有任何请求。这意味着服务器想关闭这个未使用的连接。由于一些浏览器，如 Chrome、Firefox 27+ 或 IE9，使用 HTTP 预连接机制来加速冲浪，所以这种响应被使用得更多。还要注意的是，有些服务器只是关闭了连接而没有发送此消息。
- 409 Conflict
  - : 当请求与服务器的当前状态冲突时，将发送此响应。
- 410 Gone
  - : 当请求的内容已从服务器中永久删除且没有转发地址时，将发送此响应。客户端需要删除缓存和指向资源的链接。HTTP 规范打算将此状态代码用于“有限时间的促销服务”。API 不应被迫指出已使用此状态代码删除的资源。
- 411 Length Required
  - : 服务端拒绝该请求因为 `Content-Length` 头部字段未定义但是服务端需要它。
- 412 Precondition Failed
  - : 客户端在其头文件中指出了服务器不满足的先决条件。
- 413 Payload Too Large
  - : 请求实体大于服务器定义的限制。服务器可能会关闭连接，或在标头字段后返回重试 `Retry-After`。
- 414 URI Too Long
  - : 客户端请求的 URI 比服务器愿意接收的长度长。
- 415 Unsupported Media Type
  - : 服务器不支持请求数据的媒体格式，因此服务器拒绝请求。
- 416 Range Not Satisfiable
  - : 无法满足请求中 `Range` 标头字段指定的范围。该范围可能超出了目标 URI 数据的大小。
- 417 Expectation Failed
  - : 此响应代码表示服务器无法满足 `Expect` 请求标头字段所指示的期望。
- 421 Misdirected Request
  - : 请求被定向到无法生成响应的服务器。这可以由未配置为针对请求 URI 中包含的方案和权限组合生成响应的服务器发送。
- 422 Unprocessable Entity
  - : 请求格式正确，但由于语义错误而无法遵循。
- 423 Locked
  - : 正在访问的资源已锁定。
- 424 Failed Dependency
  - : 由于前一个请求失败，请求失败。
- 425 Too Early
  - : 表示服务器不愿意冒险处理可能被重播的请求。
- 426 Upgrade Required
  - : 服务器拒绝使用当前协议执行请求，但在客户端升级到其他协议后可能愿意这样做。
    服务端发送带有 `Upgrade` 字段的 426 响应 来表明它所需的协议（们）。
- 428 Precondition Required
  - : 源服务器要求请求是有条件的。此响应旨在防止'丢失更新'问题，即当第三方修改服务器上的状态时，客户端 `GET` 获取资源的状态，对其进行修改并将其 `PUT` 放回服务器，从而导致冲突。
- 429 Too Many Requests
  - : 用户在给定的时间内发送了太多请求（"限制请求速率"）
- 431 Request Header Fields Too Large
  - : 服务器不愿意处理请求，因为其头字段太大。在减小请求头字段的大小后，可以重新提交请求。
- 451 Unavailable For Legal Reasons
  - : 用户代理请求了无法合法提供的资源，例如政府审查的网页。

### 服务端错误响应

- 500 Internal Server Error
  - : 服务器遇到了不知道如何处理的情况。
- 501 Not Implemented
  - : 服务器不支持请求方法，因此无法处理。服务器需要支持的唯二方法（因此不能返回此代码）是 `GET` and `HEAD`.
- 502 Bad Gateway
  - : 此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。
- 503 Service Unavailable
  - : 服务器没有准备好处理请求。常见原因是服务器因维护或重载而停机。请注意，与此响应一起，应发送解释问题的用户友好页面。这个响应应该用于临时条件和如果可能的话，HTTP 标头 `Retry-After` 字段应该包含恢复服务之前的估计时间。网站管理员还必须注意与此响应一起发送的与缓存相关的标头，因为这些临时条件响应通常不应被缓存。
- 504 Gateway Timeout
  - : 当服务器充当网关且无法及时获得响应时，会给出此错误响应。
- 505 HTTP Version Not Supported
  - : 服务器不支持请求中使用的 HTTP 版本。
- 506 Variant Also Negotiates
  - : 服务器存在内部配置错误：所选的变体资源被配置为参与透明内容协商本身，因此不是协商过程中的适当终点。
- 507 Insufficient Storage
  - : 无法在资源上执行该方法，因为服务器无法存储成功完成请求所需的表示。
- 508 Loop Detected
  - : 服务器在处理请求时检测到无限循环。
- 510 Not Extended
  - : 服务器需要对请求进行进一步扩展才能完成请求。
- 511 Network Authentication Required
  - : 指示客户端需要进行身份验证才能获得网络访问权限。

## HTTPS 和 HTTP 的介绍和区别

1. 安全性
   1. `HTTP` 和 `HTTPS` 是两种不同的协议，它们之间最主要的区别在于安全性。HTTP协议以明文方式发送内容，不提供任何方式的数据加密，容易被攻击者截取信息。
   2. `HTTPS` 则在 `TCP` 和 `HTTP` 网络层之间加入了 `SSL/TLS` 安全协议，使得报文能够加密传输，保证了数据的安全性。
2. 端口号不同
   1. HTTP和HTTPS使用的是完全不同的连接方式用的端口也不一样，HTTP是80、HTTPS是443。
3. 证书
   1. HTTPS需要申请证书，而HTTP不需要，申请证书也会有一些费用。
