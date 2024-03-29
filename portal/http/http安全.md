# http 安全

- [http 安全](#http-安全)
  - [网络攻击类型](#网络攻击类型)
    - [点击劫持（Click-jacking）](#点击劫持click-jacking)
    - [XSS攻击（Cross-site scripting、跨站点脚本攻击）](#xss攻击cross-site-scripting跨站点脚本攻击)
      - [预防措施](#预防措施)
    - [CSRF攻击（Cross-site request forgery）](#csrf攻击cross-site-request-forgery)
      - [预防 (看这个)](#预防-看这个)
    - [Man-in-the-middle (MitM)](#man-in-the-middle-mitm)
    - [会话劫持（Session hijacking）](#会话劫持session-hijacking)
      - [会话固定攻击（Session fixation）](#会话固定攻击session-fixation)
  - [网络安全措施](#网络安全措施)
    - [内容安全策略（CSP）](#内容安全策略csp)
      - [使用 CSP](#使用-csp)

## 网络攻击类型

### 点击劫持（Click-jacking）

点击劫持是一种欺骗用户点击链接、按钮等的行为，而不是用户认为的内容。例如，这可以用来窃取登录凭据或在用户无意中获得安装恶意软件的许可。

### XSS攻击（Cross-site scripting、跨站点脚本攻击）

记忆点**是脚本。通过注入脚本实行攻击**

> 跨站点脚本（XSS）是一种安全漏洞，允许攻击者向网站注入恶意客户端代码。此代码由受害者执行，攻击者可以绕过访问控制并冒充用户。

***

> XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。

***

> 跨站点脚本攻击通常发生在以下情况：
>
> 1. 数据通过不受信任的来源（通常是Web请求）进入Web应用程序
> 2. 动态内容在未经恶意内容验证的情况下发送给Web用户。

***

> 恶意内容通常包括JavaScript，但有时也包括HTML、Flash或浏览器可以执行的任何其他代码。  
危害：基于XSS的攻击种类几乎是无限的，但通常包括向攻击者传输cookie或其他会话信息等私人数据，将受害者重定向到攻击者控制的网页，或以易受攻击的网站为幌子在用户的机器上执行其他恶意操作。

***

> XSS攻击可以分为三类：存储（也称为持久）、反射（也称为非持久）或基于DOM：
>
> 1. 存储XSS攻击  
注入的脚本将永久存储在目标服务器上。然后，当浏览器发送数据请求时，受害者会从服务器中检索此恶意脚本。
> 2. 反射XSS攻击  
当用户被诱骗点击恶意链接、提交特制表单或浏览恶意网站时，注入的代码会传播到易受攻击的网站。Web服务器将注入的脚本返回用户的浏览器，例如通过错误消息、搜索结果或其他响应中。浏览器执行代码是因为它假设响应来自用户已经交互的“可信”服务器。
> 3. 基于DOM的XSS攻击  
XSS 攻击通过修改原始客户端脚本所使用的 DOM 环境而执行。在页面元素添加恶意代码。也就是说，页面本身不会更改，但由于对DOM环境的恶意修改，页面中包含的客户端代码以意外的方式运行。

#### 预防措施

内容安全策略（CSP）

### CSRF攻击（Cross-site request forgery）

记忆点**是请求。通过发送请求攻击**

> 攻击者使用户的浏览器在未经用户同意或知情的情况下向网站后端执行请求。攻击者可以使用 `XSS` 发起 `CSRF` 攻击。  

***

> 以银行转钱为例。`img` 标签的 `src` 属性原来是图片的url，但是被改成了银行转钱的url，这样页面加载时就访问url，转钱了。对于 Post 请求，页面被恶意注入一个 form 表单，当页面加载时，提交表单发送一个 Post 请求，进行转钱。

***

> 应该使用以下几种技术来防止这种情况的发生：
>
> - 服务端处理 GET 请求应只做查询数据的操作。处理 Post 请求的地方不能接受查询字符串中带有参数的GET请求。
> - 使用**CSRF令牌**：服务器提供会话唯一的**CSRF令牌**给浏览器。每当浏览器发布表单时，都可以包含此令牌。对于所有可能执行操作的非GET请求，服务器将发送的令牌与其存储的会话值进行比较。如果不匹配，则中止请求。
> - 登录时重新生成令牌。使攻击者无法预测用户分配的CSRF令牌。
> - 给用于敏感操作的Cookie（如会话Cookie）的设置较短的生存期，SameSite属性设置为Strict或Lax。这将确保会话cookie不会与跨站点请求一起发送
> - 应同时部署CSRF令牌和SameSite cookie。

#### 预防 (看这个)

CSRF 可以用下面几种方法来防护：

1. 同源检测。服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。当 origin 或者 referer 信息都不存在的时候，直接阻止。
2. 使用 CSRF Token 来进行验证，服务器向用户返回一个随机数 Token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。这种方法解决了使用 cookie 单一验证方式时，可能会被冒用的问题，但是这种方法存在一个缺点就是，我们需要给网站中的所有请求都添加上这个 token，操作比较繁琐。
3. cookie 设置 Samesite ，限制 cookie 不能作为被第三方使用，从而可以避免被攻击者利用。

### Man-in-the-middle (MitM)

第三方拦截网络服务器和客户端（浏览器）之间的交互，并模拟网络服务器以获取数据（如登录凭据或信用卡信息）。开放式Wi-Fi网络是执行这种攻击的典型手段。

### 会话劫持（Session hijacking）

会话劫持包括 访问和滥用用户已验证的会话。  
通过窃取现有会话的cookie，或者通过欺骗用户设置具有预定会话ID的cookie来实现的。

通过 CSP（Content-Security-Policy） 预防。

#### 会话固定攻击（Session fixation）

> 第三方通过某种方法确定用户的会话标识符，并因此作为该用户与服务器进行交互。偷取 Cookie 是一种方法。

***

> 当 Cookie 设置了 `Domain` 属性，如果子域上存在易受攻击的应用程序，则可能会受到会话固定攻击。  
当用户访问父域（或另一个子域）上的页面时，应用程序可能会信任用户cookie中发送的现有值。这可能允许攻击者在用户登录后 劫持会话 或绕过 CSRF保护。  
或者，如果父域未使用设置了includeSubdomains的 HTTP Strict Transport Security，则使用MitM的用户（可能连接到开放的Wi-Fi网络）可能会从不存在的子域收到带有set Cookie标头的响应。  
最终结果大致相同，浏览器存储非法cookie并将其发送到父域下的所有其他页面。

***

> 可以通过在用户进行身份验证时重新生成会话cookie值（即使cookie已经存在）以及将任何CSRF令牌绑定到用户来预防会话固定攻击

## 网络安全措施

### 内容安全策略（CSP）

> 内容安全策略（CSP）是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本（XSS）和数据注入攻击等

配置方式：

1. 配置网络服务器返回 Content-Security-Policy HTTP 标头
2. 设置 meta 元素

    ```html
    <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self'; img-src https://*; child-src 'none';>" />
    ```

减少攻击：

1. 缓解跨站脚本攻击  
    - CSP 的主要目标是减少和报告 XSS 攻击。XSS 攻击利用了浏览器对于从服务器所获取的内容的信任。  
    - CSP 通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除 XSS 攻击所依赖的载体。一个 CSP 兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本（包括内联脚本和 HTML 的事件处理属性）。
2. 缓解数据包嗅探攻击
    - 服务器可指明哪种协议允许使用
    - 服务器可指定所有内容必须通过 HTTPS 加载

#### 使用 CSP

使用 Content-Security-Policy HTTP 标头来指定你的策略，像这样：

```http
Content-Security-Policy: policy
```

策略（policy）参数是一个包含了各种描述你的 CSP 策略指令的字符串。

- 策略由一系列策略指令所组成，每个策略指令都描述了针对某个特定资源的类型以及策略生效的范围。  
- 你的策略应当包含一个 `default-src` 策略指令，在其他资源类型没有符合自己的策略时应用该策略。  
- 一个策略可以包含 `default-src` 或者 `script-src` 指令来防止内联脚本运行，并杜绝 eval() 的使用。
- 一个策略也可包含一个 `default-src` 或 `style-src` 指令去限制来自一个 `<style>` 元素或者 style 属性的內联样式。
- 对于不同类型的项目都有特定的指令，因此每种类型都可以有自己的指令，包括字体、frame、图像、音频和视频媒体、script 和 worker。
