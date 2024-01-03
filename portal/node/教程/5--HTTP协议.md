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

# 一、概念
`HTTP（hypertext transport protocol）`协议；中文叫**超文本传输协议**

是一种基于TCP/IP的应用层通信协议

这个协议详细规定了 浏览器 和万维网 服务器 之间互相通信的规则。

协议中主要规定了两个方面的内容
- 客户端：用来向服务器发送数据，可以被称之为请求报文
- 服务端：向客户端返回数据，可以被称之为响应报文

## Fiddler
通过 Fiddler 查看网络报文

# 二、请求报文的组成
- 请求行
- 请求头
- 空行
- 请求体

```
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

# 三、HTTP 的请求行组成
例子：`GET https://www.baidu.com/ HTTP/1.1`

- 请求方法（`get、post、put、delete`等）
- 请求 URL（统一资源定位器）（Uniform Resource Locator）  
  例如：`http://www.baidu.com:80/index.html?a=100&b=200#logo`
  - http： 协议（https、ftp、ssh等）
  - www.baidu.com 域名
  - 80 端口号
  - /index.html 路径
  - a=100&b=200 查询字符串
  - #logo 哈希（锚点链接）
- HTTP协议版本号

# 四、HTTP 请求头
格式：『头名：头值』

常见的请求头有：
|请求头| 解释|
|--|--|
Host| 主机名
Connection| 连接的设置 keep-alive（保持连接）；close（关闭连接）
Cache-Control| 缓存控制 max-age = 0 （没有缓存）
Upgrade-Insecure-Requests| 将网页中的http请求转化为https请求（很少用）老网站升级
User-Agent | 用户代理，**客户端字符串标识**，服务器可以通过这个标识来识别这个请求来自哪个客户端 ，一般在PC端和手机端的区分
Accept| 设置浏览器接收的数据类型
Accept-Encoding| 设置接收的压缩方式
Accept-Language | 设置接收的语言 q=0.7 为喜好系数，满分为1
Cookie| 后面单独讲

# 五、响应报文的组成
- 响应行
- 响应头
- 空行
- 响应体

```
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

## 响应行
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

## 响应头
```
Cache-Control:缓存控制 private 私有的，只允许客户端缓存数据
Connection 链接设置
Content-Type:text/html;charset=utf-8 设置响应体的数据类型以及字符集,响应体为html，字符集
utf-8
Content-Length:响应体的长度，单位为字节
```

## 响应体
响应体内容的类型是非常灵活的，常见的类型有 HTML、CSS、JS、图片、JSON


# 六、创建 HTTP 服务
使用 nodejs 创建 HTTP 服务

## 6.1 操作步骤
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
> 
> `server.listen`里的回调函数的执行时机：只在服务器启动后执行一次

## 6.2 测试
在浏览器输入`http://127.0.0.1:9000/`并按下回车，看请求是否发送成功

浏览器请求对应端口：`http://127.0.0.1:9000/`

## 6.3 注意事项
1. 当服务启动后，更新代码 必须重启服务才能生效
   1. node 19版本可以通过 watch 指令实现不重启服务也能生效。 `node--watch server.js`
2. 响应内容中文乱码的解决办法
   1. `response.setHeader('content-type','text/html;charset=utf-8');`
3. HTTP 协议默认端口是 **80** 。HTTPS 协议的默认端口是 **443**
   1. 默认端口：如果 url 没有指明端口，那么请求会发送到默认端口处
   2. HTTP 服务开发常用端口有 3000，8080，8090，9000 等
4. 如果端口被其他程序占用，可以使用 **资源监视器** 找到占用端口的程序，然后使用 **任务管理器** 关闭对应的程序
   1. windows 搜索资源监视器，打开后选择网络 tab 页，点击监听端口，查看占用端口对应的进程的 **pid** 。然后在任务管理器找到 pid 对应的进程，结束该进程。


# 七、获取 HTTP 请求报文
想要获取请求的数据，需要通过 `request` 对象

|含义| 语法|
|--|--|
请求方法| request.method 
请求版本| request.httpVersion
请求路径| request.url 
URL 路径| require('url').parse(request.url).pathname 
URL 查询字符串| require('url').parse(request.url, true).query 
请求头| request.headers 
请求体| request.on('data', function(chunk){}) <br> request.on('end', function(){});

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