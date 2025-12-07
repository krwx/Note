# HTTP 协议

- [HTTP 协议](#http-协议)
  - [一、概念](#一概念)
    - [Fiddler](#fiddler)
  - [二、请求报文的组成](#二请求报文的组成)
  - [三、HTTP 的请求行组成](#三http-的请求行组成)
  - [四、HTTP 请求头](#四http-请求头)
  - [五、响应报文的组成](#五响应报文的组成)
    - [响应行](#响应行)
    - [响应头](#响应头)
    - [响应体](#响应体)
  - [六、创建 HTTP 服务](#六创建-http-服务)
    - [6.1 操作步骤](#61-操作步骤)
    - [6.2 测试](#62-测试)
    - [6.3 注意事项](#63-注意事项)
  - [七、获取 HTTP 请求报文](#七获取-http-请求报文)
    - [获取请求路径与查询字符串](#获取请求路径与查询字符串)
  - [八、设置 HTTP 响应报文](#八设置-http-响应报文)
    - [response.end() 返回 html 内容](#responseend-返回-html-内容)
  - [九、网页资源的基本加载过程](#九网页资源的基本加载过程)
  - [十、静态资源服务](#十静态资源服务)
    - [10.0 响应静态资源](#100-响应静态资源)
    - [10.1 网站根目录或静态资源目录](#101-网站根目录或静态资源目录)
    - [10.2 网页中的 URL](#102-网页中的-url)
      - [10.2.1 绝对路径](#1021-绝对路径)
      - [10.2.2 相对路径](#1022-相对路径)
      - [10.2.3 网页中使用 URL 的场景小结](#1023-网页中使用-url-的场景小结)
    - [10.3 设置资源类型（mime类型）](#103-设置资源类型mime类型)
  - [十一、GET 和 POST 请求](#十一get-和-post-请求)
    - [11.1 GET 和 POST 请求场景小结](#111-get-和-post-请求场景小结)
    - [11.2 GET和POST请求的区别](#112-get和post请求的区别)

## 一、概念

`HTTP（hypertext transport protocol）`协议；中文叫**超文本传输协议**

是一种基于TCP/IP的应用层通信协议

这个协议详细规定了 浏览器 和万维网 服务器 之间互相通信的规则。

协议中主要规定了两个方面的内容：

- 客户端：用来向服务器发送数据，可以被称之为请求报文
- 服务端：向客户端返回数据，可以被称之为响应报文

### Fiddler

通过 Fiddler 查看网络报文

## 二、请求报文的组成

- 请求行
- 请求头
- 空行
- 请求体

```text
GET https://www.baidu.com/ HTTP/1.1
Host: www.baidu.com
Connection: keep-alive
sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BIDUPSID=47189232FF33C28C5D2036824FDE7090; 
```

## 三、HTTP 的请求行组成

例子：`GET https://www.baidu.com/ HTTP/1.1`

- 请求方法（`get、post、put、delete`等）
- 请求 URL（统一资源定位器）（Uniform Resource Locator）  
  例如：`http://www.baidu.com:80/index.html?a=100&b=200#logo`
  - http： 协议（https、ftp、ssh等）
  - <www.baidu.com> 域名
  - 80 端口号
  - /index.html 路径
  - a=100&b=200 查询字符串
  - #logo 哈希（锚点链接）
- HTTP协议版本号

## 四、HTTP 请求头

格式：『头名：头值』

常见的请求头有：
|请求头| 解释|
|--|--|
|Host| 主机名|
|Connection| 连接的设置 keep-alive（保持连接）；close（关闭连接）|
|Cache-Control| 缓存控制 max-age = 0 （没有缓存）|
|Upgrade-Insecure-Requests| 将网页中的http请求转化为https请求（很少用）老网站升级|
|User-Agent | 用户代理，**客户端字符串标识**，服务器可以通过这个标识来识别这个请求来自哪个客户端 ，一般在PC端和手机端的区分|
|Accept| 设置浏览器接收的数据类型|
|Accept-Encoding| 设置接收的压缩方式|
|Accept-Language | 设置接收的语言 q=0.7 为喜好系数，满分为1|
|Cookie| 后面单独讲|

## 五、响应报文的组成

- 响应行
- 响应头
- 空行
- 响应体

```text
HTTP/1.1 200 OK
Connection: keep-alive
Content-Security-Policy: frame-ancestors 'self' https://chat.baidu.com http://mirror-chat.baidu.com https://fj-chat.baidu.com https://hba-chat.baidu.com https://hbe-chat.baidu.com https://njjs-chat.baidu.com https://nj-chat.baidu.com https://hna-chat.baidu.com https://hnb-chat.baidu.com http://debug.baidu-int.com;
Content-Type: text/html; charset=utf-8
Date: Tue, 02 Jan 2024 09:38:09 GMT
Isprivate: 1
Server: BWS/1.1
Set-Cookie: H_PS_PSSID=39939_39997_40022_40038_40050; path=/; expires=Wed, 01-Jan-25 09:38:09 GMT; domain=.baidu.com
Traceid: 1704188289048351719411314354385055360584
X-Ua-Compatible: IE=Edge,chrome=1
Content-Length: 525635

<!DOCTYPE html><!--STATUS OK--><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta content="always" name="referrer"><meta name="theme-color" content="#ffffff"><meta name="description" content="全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。">
h1,h2,h3,h4,h5,h6{font-size:100%}
em{font-style:normal}
```

### 响应行

例子：`HTTP/1.1 200 OK`

- HTTP/1.1：HTTP协议版本号
- 200：响应状态码
- OK：响应状态描述

响应状态码和响应字符串关系是一一对应的。

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

### 响应头

- Cache-Control: 缓存控制 private 私有的，只允许客户端缓存数据
- Connection:  链接设置
- Content-Type:text/html;charset=utf-8 设置响应体的数据类型以及字符集,响应体为- html，字符集 utf-8
- Content-Length: 响应体的长度，单位为字节
- Location：指定的是需要将页面重新定向至的地址。一般在响应码为 3xx 的响应中才会有意义。

### 响应体

响应体内容的类型是非常灵活的，常见的类型有 HTML、CSS、JS、图片、JSON

## 六、创建 HTTP 服务

使用 nodejs 创建 HTTP 服务

### 6.1 操作步骤

```js
//1. 导入 http 模块
const http = require('http');

//2. 创建服务对象 create 创建 server 服务
// request 意为请求. 是对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据
// response 意为响应. 是对响应报文的封装对象, 通过 response 对象可以设置响应报文
const server = http.createServer((request, response) => {
  // 设置响应体
  response.end('Hello HTTP server');
});

//3. 监听端口, 启动服务。服务启动后会执行回调函数
server.listen(9000, () => {
  console.log('服务已经启动, 端口 9000 监听中...');
});
```

> `http.createServer` 里的回调函数的执行时机： **当接收到 HTTP 请求的时候，就会执行**
> `server.listen`里的回调函数的执行时机：只在服务器启动后执行一次

`response.end` 只能执行一次，如果调用多次会报错

### 6.2 测试

在浏览器输入`http://127.0.0.1:9000/`并按下回车，看请求是否发送成功

浏览器请求对应端口：`http://127.0.0.1:9000/`

### 6.3 注意事项

1. 当服务启动后，更新代码 必须重启服务才能生效
   1. node 19版本可以通过 watch 指令实现不重启服务也能生效。 `node--watch server.js`
2. 响应内容中文乱码的解决办法
   1. `response.setHeader('content-type','text/html;charset=utf-8');`
3. HTTP 协议默认端口是 **80** 。HTTPS 协议的默认端口是 **443**
   1. 默认端口：如果 url 没有指明端口，那么请求会发送到默认端口处
   2. HTTP 服务开发常用端口有 3000，8080，8090，9000 等
4. 如果端口被其他程序占用，可以使用 **资源监视器** 找到占用端口的程序，然后使用 **任务管理器** 关闭对应的程序
   1. windows 搜索资源监视器，打开后选择网络 tab 页，点击监听端口，查看占用端口对应的进程的 **pid** 。然后在任务管理器找到 pid 对应的进程，结束该进程。

## 七、获取 HTTP 请求报文

想要获取请求的数据，需要通过 `request` 对象

|含义| 语法|
|--|--|
|请求方法| request.method|
|请求版本| request.httpVersion|
|请求路径| request.url|
|URL 路径| require('url').parse(request.url).pathname|
|URL 查询字符串| require('url').parse(request.url, true).query|
|请求头| request.headers|
|请求体| request.on('data', function(chunk){}) <br> request.on('end', function(){});|

注意事项：

1. `request.url` 只能获取路径以及查询字符串，无法获取 URL 中的域名以及协议的内容
2. `request.headers` 将请求信息转化成一个对象，并将属性名都转化成了『小写』
3. 关于路径：如果访问网站的时候，只填写了 IP 地址或者是域名信息，此时请求的路径为『 / 』
4. 关于 `favicon.ico` 请求：这个请求是属于浏览器自动发送的请求

例子：

```js
const server = http.createServer((request, response) => {
    // 获取请求的方法
    console.log(request.method); // GET

    // 获取请求的 url，只包含 url 中的路径与查询字符串
    console.log(request.url); // /search?keyword=html&num=1

    // 获取 HTTP 协议的版本号
    console.log(request.httpVersion);

    // 获取 HTTP 的请求头
    console.log(request.headers);
    console.log(request.headers.host);

    // 获取请求体，使用 body 变量保存
    let body = "";
    // 绑定 data 事件，每有数据传输过来执行回调函数，chunk 代表传递的数据，为 buffer 类型
    request.on("data", chunk => {
        body += chunk; // 这里加运算自动将 buffer 转 string
        // body += chunk.toString(); // 这样也可以
    })
    // 绑定 end 事件
    request.on("end", () => {
        console.log(body);

        // 设置响应
        response.setHeader("content-type", "text/html;charset=utf-8")
        response.end("你好");
    })
})
```

### 获取请求路径与查询字符串

**第一种方法**：使用`url.parse(request.url)`解析url（官网不推荐使用，旧版）

```js
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?keyword=html&num=1',
  query: 'keyword=html&num=1',
  pathname: '/search',
  path: '/search?keyword=html&num=1',
  href: '/search?keyword=html&num=1'
}
// 使用 url.parse(request.url, true) 的结果如下。第二个参数传 true 会使 query 字段变成一个对象
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?keyword=html&num=1',
  query: [Object: null prototype] { keyword: 'html', num: '1' },
  pathname: '/search',
  path: '/search?keyword=html&num=1',
  href: '/search?keyword=html&num=1'
}
```

```js
const http = require("http");
const url = require("url");

const server = http.createServer((request, response) => {
    let res = url.parse(request.url, true);
    console.log(res.pathname); // /search
    console.log(res.query); // { keyword: 'html', num: '1' } 
    console.log(res.query.keyword); // html

    response.end("url");
})

server.listen(9000, () => {
    console.log("服务已经启动");
})
```

**第二种方法**：创建 URL 的实例对象（推荐使用）

```js
URL {
  href: 'http://127.0.0.1:9000/search?keyword=html&num=1',
  origin: 'http://127.0.0.1:9000',
  protocol: 'http:',
  username: '',
  password: '',
  host: '127.0.0.1:9000',
  hostname: '127.0.0.1',
  port: '9000',
  pathname: '/search',
  search: '?keyword=html&num=1',
  searchParams: URLSearchParams { 'keyword' => 'html', 'num' => '1' },
  hash: ''
}
```

```js
const http = require("http");

const server = http.createServer((request, response) => {
    // URL 构造函数的第一个参数为 url 字符串，该字符串需要是一个完整的url，如果只传 “/search?keyword=html” 会报错
    let url1 = new URL("http://127.0.0.1:9000/search?keyword=html&num=1");

    // request.url 不是完整的 url，所以需要给 URL 构造函数传递第二个参数，指明 base 的网址
    let url = new URL(request.url, "http://127.0.0.1:9000");
    console.log(url.pathname);
    // url.searchParams 为 Map 结构，使用 get 方法获取查询数据
    console.log(url.searchParams.get("keyword"));
    
    response.end("url");
})

server.listen(9000, () => {
    console.log("服务已经启动");
})
```

## 八、设置 HTTP 响应报文

|作用| 语法|
|--|--|
|设置响应状态码| response.statusCode|
|设置响应状态描述| response.statusMessage （ 用的非常少 ）|
|设置响应头信息| response.setHeader('头名', '头值')|
|设置响应体| response.write('xx')<br>response.end('xxx')|
|设置响应状态码、状态描述和响应头信息| `response.writeHead(statusCode[, statusMessage][, headers])` |

```js
write 和 end 的两种使用情况：

//1. write 和 end 的结合使用 响应体相对分散
response.write('xx');
response.write('xx');
response.write('xx');
response.end(); //每一个请求，在处理的时候必须要执行 end 方法的

//2. 单独使用 end 方法 响应体相对集中
response.end('xxx');
```

```js
const http = require("http");

const server = http.createServer((request, response) => {

    // 1.设置响应状态码
    response.statusCode = 200;
    response.statusCode = 203;

    // 2.设置响应状态的描述
    response.statusMessage = "hello";

    // 3. 设置响应头
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.setHeader("myHeader", "test");
    // 第二个参数为数组时，设置多个同名的 header，值依次为数组中的元素
    response.setHeader("myHeader2", ["1","2","3"]);

    // 4. 响应体的设置
    response.write("123");
    response.write("fsadf");
    response.end();
})

server.listen(9000, () => {
    console.log("服务已经启动");
})
```

`writeHead` 的使用：

```js
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain'
  })
  .end(body);
```

注意事项：

1. 创建 html 文件后，输入 `!` 后按回车可以自动生成 html 基本内容

### response.end() 返回 html 内容

`response.end('xxx')` 可以接收字符串或 `buffer` 类型的数据。如果字符串带有 `html` 标签会自动解析成 `html` 文件

**第一种方法**：直接返回 html 内容

```js
const http = require("http");

const server = http.createServer((request, response) => {
    response.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        123
    </body>
    </html>
    `)
})

server.listen(9000, () => {
    console.log("服务已经启动");
})
```

**第二种方法**：返回 html 文件。使用 fs 读取文件

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    let file = fs.readFileSync(__dirname + "/test.html");
    response.end(file);
})

server.listen(9000, () => {
    console.log("服务已经启动");
})
```

**注意**：上面这样写是有问题的，如果 html 文件引入了外部的 css 文件，那么解析 html 文件时，发送 css 文件请求，返回的还是 html 文件，所以需要对文件类型进行区分

## 九、网页资源的基本加载过程

网页资源的加载都是循序渐进的，首先获取 HTML 的内容， 然后解析 HTML 再发送其他资源的请求，如 CSS，Javascript，图片等。

[浏览器加载过程](../../basic--web/浏览器.md/#mdn-浏览器的工作原理)

## 十、静态资源服务

静态资源是指 **内容长时间不发生改变的资源** ，例如图片，视频，CSS 文件，JS文件，HTML文件，字体文件等

动态资源是指 **内容经常更新的资源** ，例如百度首页，网易首页，京东搜索列表页面等

### 10.0 响应静态资源

简单例子：根据输入的 url 返回 /page 文件夹下对应的文件。

url例子： `http://127.0.0.1:9000/images/logo.png`

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    // 获取请求路径
    const pathname = new URL(request.url, "http://127.0.0.1:9000").pathname;
    // 拼接路径
    const filePath = __dirname + "/page" + pathname;
    // 读取文件
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 注意：因为响应为中文，所以要设置 utf-8 。其他文件类型设置对应类型的 header
            response.setHeader("content-type", "text/html;charset=utf-8")
            response.statusCode = 500;
            response.end("文件读取失败");
            return;
        }
        response.end(data);
    })
})

server.listen(9000, () => {
    console.log("服务已经启动");
})
```

### 10.1 网站根目录或静态资源目录

HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 **静态资源目录** ，也称之为 **网站根目录**

> vscode 中使用 live-server 访问 HTML 时， 它启动的服务中网站根目录是谁？  
> 答案：是 vscode 当前打开窗口对应的目录

### 10.2 网页中的 URL

网页中的 URL 主要分为两大类：相对路径与绝对路径

#### 10.2.1 绝对路径

绝对路径可靠性强，而且相对容易理解，在项目中运用较多

|形式| 特点|
|--|--|
|`http://atguigu.com/web` | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式|
|`//atguigu.com/web` | 与**页面 URL 的协议**拼接形成完整 URL 再发送请求。<br>大型网站用的比较多，引入 css 文件或其他文件的 url 也是这样|
|`/web` | 与**页面 URL 的协议、主机名、端口**拼接形成完整 URL 再发送请求。<br>中小型网站用的比较多，因为域名有可能发生改变|

例子：`jd.com`

- 在浏览器输入这个 url ，发送请求，响应的结果为304，会重定向到 `https://www.jd.com`

#### 10.2.2 相对路径

相对路径在发送请求时，需要与当前页面 URL 路径进行 计算 ，得到完整 URL 后，再发送请求。  
**学习阶段用的较多，实际项目不推荐使用，不可靠**

例如当前网页 url 为 `http://www.atguigu.com/course/h5.html`

|形式| 最终的 URL|
|--|--|
|`./css/app.css`| `http://www.atguigu.com/course/css/app.css`|
|`js/app.js`| `http://www.atguigu.com/course/js/app.js`|
|`../img/logo.png`| `http://www.atguigu.com/img/logo.png`|
|`../../mp4/show.mp4`| `http://www.atguigu.com/mp4/show.mp4`|

#### 10.2.3 网页中使用 URL 的场景小结

包括但不限于如下场景：

- a 标签 href
- link 标签 href
- script 标签 src
- img 标签 src
- video audio 标签 src
- form 中的 action
- AJAX 请求中的 URL

### 10.3 设置资源类型（mime类型）

媒体类型（通常称为 `Multipurpose Internet Mail Extensions` 或 `MIME` 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。

```text
mime 类型结构： [type]/[subType]
例如： text/html text/css image/jpeg image/png application/json
意思是：主类型/子类型
```

HTTP 服务可以设置响应头 `Content-Type` 来表明响应体的 MIME 类型，浏览器会根据该类型决定如何处理资源

下面是常见文件对应的 mime 类型:

```text
html: 'text/html',
css: 'text/css',
js: 'text/javascript',
png: 'image/png',
jpg: 'image/jpeg',
gif: 'image/gif',
mp4: 'video/mp4',
mp3: 'audio/mpeg',
json: 'application/json'
```

> 对于未知的资源类型，可以选择 `application/octet-stream` 类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的 下载 效果

.
> 关于响应头设置 `charset=utf-8` 的问题:
>
> - 对于 html 文件，可以通过 `meta` 标签设置 `charset=utf-8` ：`<meta charset="UTF-8">`
> - 响应头设置 `charset=utf-8` 和 `meta` 标签设置 `charset=utf-8` 的权重比较：响应头设置 `charset=utf-8` 的权重会更大

.
> css 文件、js 文件的响应头不需要设置 `charset=utf-8`。即使这些文件内部有中文，但是当 html 文件引入它们时，这些文件会根据 html 文件的字符集进行解析

简单设置 mime 类型的例子：

```js
const http = require("http");
const fs = require("fs");
const path = require("path");

//声明一个变量，存放 mime 类型，实际项目使用包处理：安装 mime 包
let mimes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}

const server = http.createServer((request, response) => {
    // 获取请求路径
    const pathname = new URL(request.url, "http://127.0.0.1:9000").pathname;
    // 拼接路径
    const root = __dirname + "/page";
    const filePath = root + pathname;
    // 读取文件
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 注意：因为响应为中文，所以要设置 utf-8 。其他文件类型设置对应类型的 header
            response.setHeader("content-type", "text/html;charset=utf-8")
            // 根据错误展示对应提示
            switch(err.code){
                case 'ENOENT':
                  response.statusCode = 404;
                  response.end('<h1>404 Not Found</h1>');
                  break;
                case 'EPERM':
                  response.statusCode = 403;
                  response.end('<h1>403 Forbidden</h1>');
                  break;
                default:
                  response.statusCode = 500;
                  response.end('<h1>Internal Server Error</h1>');
                  break;
            }
            return;
        }
        // 获取文件的后缀名
        const ext = path.extname(pathname).slice(1);
        // 设置 content-type 响应头
        const type = ext == "html" ? mimes[ext] + ";charset=utf-8" : mimes[ext] || "application/octet-stream";
        response.setHeader("content-type", type);

        response.end(data);
    })
})

server.listen(9000, () => {
    console.log("服务已经启动");
})
```

> 查看错误码：[link](https://www.nodejs.com.cn/api/errors.html#nodejs-error-codes)

## 十一、GET 和 POST 请求

### 11.1 GET 和 POST 请求场景小结

GET 请求的情况：

- 在地址栏直接输入 url 访问
- 点击 a 链接
- link 标签引入 css
- script 标签引入 js
- img 标签引入图片
- form 标签中的 method 为 get （不区分大小写）
- ajax 中的 get 请求

POST 请求的情况：

- form 标签中的 method 为 post（不区分大小写）
- AJAX 的 post 请求
  
### 11.2 GET和POST请求的区别

GET 和 POST 是 HTTP 协议请求的两种方式：

- GET 主要用来获取数据，POST 主要用来提交数据
- GET 带参数请求是将参数缀到 URL 之后，在地址栏中输入 url 访问网站就是 GET 请求，
- POST 带参数请求是将参数放到请求体中
- POST 请求相对 GET 安全一些，因为在浏览器中参数会暴露在地址栏
- GET 请求大小有限制，一般为 2K，而 POST 请求则没有大小限制
