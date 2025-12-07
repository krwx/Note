# HTTP Cookie

- [HTTP Cookie](#http-cookie)
  - [介绍](#介绍)
  - [创建 Cookie](#创建-cookie)
    - [Set-Cookie 和 Cookie 标头](#set-cookie-和-cookie-标头)
    - [定义 Cookie 的生命周期](#定义-cookie-的生命周期)
    - [限制访问 Cookie](#限制访问-cookie)
    - [定义 Cookie 发送的位置](#定义-cookie-发送的位置)
    - [Cookie 前缀](#cookie-前缀)
    - [JavaScript 通过 Document.cookie 访问 Cookie](#javascript-通过-documentcookie-访问-cookie)

## 介绍

`HTTP Cookie`（也叫 Web Cookie 或浏览器 Cookie）是**服务器发送到用户浏览器并保存在本地的一小块数据**。浏览器会存储 `cookie` 并在下次向同一服务器再发起请求时携带并发送到服务器上。

通常，它用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。**Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能**。

浏览器保存 `Cookie` ：

- 会话期 `Cookie` 保存在内存
- 持久化 `Cookie` 保存在磁盘。

`Cookie` 主要用于以下三个方面：

- 会话状态管理  
  - 如用户登录状态、购物车、游戏分数或其他需要记录的信息
- 个性化设置  
  - 如用户自定义设置、主题和其他设置
- 浏览器行为跟踪  
  - 如跟踪分析用户行为等

每个域名下的cookie 的**大小最大为4KB**

## 创建 Cookie

服务器收到 HTTP 请求后，服务器可以在响应标头里面添加一个或多个 `Set-Cookie` 选项。浏览器收到响应后通常会保存下 `Cookie`，并将其放在 `HTTP Cookie` 标头内，向同一服务器发出请求时一起发送。

你可以指定一个过期日期或者时间段之后，不能发送 cookie。（`expire、Max-Age`）  
你也可以对指定的域和路径设置额外的限制，以限制 cookie 发送的位置。（`domain、path`）

### Set-Cookie 和 Cookie 标头

服务器使用 Set-Cookie 响应头部向用户代理（一般是浏览器）发送 Cookie 信息。一个简单的 Cookie 可能像这样：

``` http
Set-Cookie: <cookie-name>=<cookie-value>
```

这指示服务器发送标头告知客户端存储一对 cookie：

``` http
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```

现在，对该服务器发起的每一次新请求，浏览器都会将之前保存的 Cookie 信息通过 Cookie 请求头部再发送给服务器。

``` http
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

如果你的站点对用户进行身份验证，则每当用户进行身份验证时，它都应重新生成并重新发送会话 Cookie，甚至是已经存在的会话 Cookie。此技术有助于防止会话固定攻击（session fixation attacks）

### 定义 Cookie 的生命周期

Cookie 的生命周期可以通过两种方式定义：

1. 会话期 `Cookie` ： 会在当前的会话结束之后删除。浏览器定义了“当前会话”结束的时间，一些浏览器重启时会使用**会话恢复**。这可能导致会话 cookie 无限延长。
2. 持久性 `Cookie` ： 在过期时间（`Expires`）指定的日期或有效期（`Max-Age`）指定的一段时间后被删除。

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
<!-- 设定的日期和时间只与客户端相关，而不是服务端。 -->
<!-- expires必须是 GMT 格式的时间 -->
```

会话级 `Cookie` ：

- 服务器端并没有明确指定 `Cookie` 的存在时间
- 在浏览器端， `Cookie` 数据存在于内存中
- **只要浏览器还开着，`Cookie`数据就一直都在**
- **浏览器关闭，内存中的`Cookie`数据就会被释放**

持久化`Cookie`：

- 服务器端明确设置了 `Cookie` 的存在时间
- **在浏览器端， `Cookie` 数据会被保存到硬盘上**
- `Cookie` 在硬盘上存在的时间根据客户端端限定的时间来管控，不受浏览器关闭的影响
- 持久化 `Cookie` 到达了预设的时间会被释放

注意：**cookie在一个浏览器下同一个域名下是全部共享一致的**

### 限制访问 Cookie

有两种方法可以确保 Cookie 被安全发送，并且不会被意外的参与者或脚本访问： `Secure` 属性和 `HttpOnly` 属性。

`Secure` ：

1. 标记为 `Secure` 的 `Cookie` 只应通过被 `HTTPS` 协议加密过的请求发送给服务端。不会使用不安全的 HTTP 发送（本地主机除外），这意味着中间人攻击者无法轻松访问它。
2. 不安全的站点（在 URL 中带有 http:）无法使用 `Secure` 属性设置 `cookie`。
3. `Secure` 不会阻止对 `cookie` 中敏感信息的访问。例如，有权访问客户端硬盘（或，如果未设置 HttpOnly 属性，则为 JavaScript）的人可以读取和修改它。

`HttpOnly` :

1. `JavaScript Document.cookie` `API` 无法访问带有 `HttpOnly` 属性的 `cookie`；此类 Cookie 仅作用于服务器。
2. 例如，持久化服务器端会话的 `Cookie` 不需要对 `JavaScript` 可用，而应具有 `HttpOnly` 属性。此预防措施有助于缓解跨站点脚本（`XSS`）攻击。

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

### 定义 Cookie 发送的位置

`Domain` 和 `Path` 标识定义了 Cookie 的作用域：即允许 Cookie 应该发送给哪些 URL。

`Domain` 属性：  

- `Domain` 指定了哪些主机可以接受 `Cookie`。  
- 如果不指定，该属性默认为同一 `host` 设置 `cookie`，不包含子域名。  
- 如果指定了 `Domain`，则一般包含子域名。因此，指定 Domain 比省略它的限制要少。但是，当子域需要共享有关用户的信息时，这可能会有所帮助。
- 例如，如果设置 `Domain=mozilla.org`，则 `Cookie` 也包含在子域名中（如 `developer.mozilla.org`）。

`Path` 属性：  

- `Path` 属性指定了一个 `URL` 路径，该 `URL` 路径必须存在于请求的 `URL` 中，以便发送 `Cookie` 标头。以字符 `%x2F (“/”)` 作为路径分隔符，并且子路径也会被匹配。
- 例如，设置 `Path=/docs` ，则以下地址都会匹配：`/docs、/docs/、/docs/Web/`

`SameSite` 属性：  

- `SameSite` 属性**允许服务器指定是否/何时通过跨站点请求发送**（其中站点由注册的域和方案定义：http 或 https）。
- **这提供了一些针对跨站点请求伪造攻击（CSRF）的保护**。它采用三个可能的值： `Strict` 、 `Lax` 和 `None` 。
  - `Strict`：`cookie` 仅发送到它来源的站点。  
  - `Lax` 与 `Strict` 相似，只是在用户导航到 `cookie` 的源站点时发送 `cookie`。例如，通过跟踪来自外部站点的链接。
  - `None` 指定浏览器会在同站请求和跨站请求下继续发送 `cookie`，但仅在安全的上下文中（即，如果 SameSite=None，且还必须设置 Secure 属性）。

注意：

- 如果没有设置 `SameSite` 属性，则将 `cookie` 视为 `Lax`。
- cookie 使用不同的方案（http: 或 https:）发送来自同一域的 cookie，则不再视为来自同一站点。

下面是例子：

```http
Set-Cookie: mykey=myvalue; SameSite=Strict
```

### Cookie 前缀

cookie 的机制使得服务器无法确认 cookie 是在安全来源上设置的，甚至无法确定 cookie 最初是在哪里设置的。

子域上的易受攻击的应用程序可以使用 Domain 属性设置 cookie，从而可以访问所有其他子域上的该 cookie。**会话劫持攻击**中可能会滥用此机制。

但是，作为深度防御措施，可以使用 cookie 前缀来断言有关 cookie 的特定事实。有两个前缀可用：

- `__Host-`：如果 cookie 名称具有此前缀，则**仅当它也用 `Secure` 属性标记、从安全来源发送、不包括 `Domain` 属性，并将 `Path` 属性设置为 / 时**，它才在 `Set-Cookie` 标头中接受。这样，这些 cookie 可以被视为“domain-locked”。

- `__Secure-`：如果 cookie 名称具有此前缀，则**仅当它也用 `Secure` 属性标记，是从安全来源发送的**，它才在 `Set-Cookie` 标头中接受。该前缀限制要弱于 `__Host-` 前缀。

带有这些前缀的 Cookie，如果不符合其限制的会被浏览器拒绝。请注意，这确保了如果子域要创建带有前缀的 cookie，那么它将要么局限于该子域，要么被完全忽略。由于应用服务器仅在确定用户是否已通过身份验证或 CSRF 令牌正确时才检查特定的 cookie 名称，因此，这有效地充当了针对会话劫持的防御措施。

### JavaScript 通过 Document.cookie 访问 Cookie

通过 Document.cookie 属性可创建新的 Cookie。如果未设置 HttpOnly 标记，你也可以从 JavaScript 访问现有的 Cookie。  
每条 cookie 以"分号和空格 (; )"分隔

```js
document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
// 通过 JavaScript 创建的 Cookie 不能包含 HttpOnly 标志。

// 读取所有可从此位置访问的 COOKIE
let allCookies = document.cookie;

// 写一个新 COOKIE
document.cookie = newCookie;
```
