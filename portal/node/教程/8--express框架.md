- [一、express 介绍](#一express-介绍)
- [二、express 使用](#二express-使用)
  - [2.1 express 下载](#21-express-下载)
  - [2.2 express 初体验](#22-express-初体验)
- [三、express 路由](#三express-路由)
  - [3.1 什么是路由](#31-什么是路由)
  - [3.2 路由的使用](#32-路由的使用)
  - [3.3 获取请求参数](#33-获取请求参数)
  - [3.4 获取路由参数](#34-获取路由参数)
    - [练习：根据路由参数响应歌手的信息](#练习根据路由参数响应歌手的信息)
- [四、express 响应设置](#四express-响应设置)
- [五、express 中间件](#五express-中间件)
  - [5.1 什么是中间件](#51-什么是中间件)
  - [5.2 中间件的作用](#52-中间件的作用)
  - [5.3 中间件的类型](#53-中间件的类型)
    - [5.3.1 定义全局中间件](#531-定义全局中间件)
    - [5.3.2 多个全局中间件](#532-多个全局中间件)
    - [5.3.3 定义路由中间件](#533-定义路由中间件)
  - [5.4 静态资源中间件](#54-静态资源中间件)
  - [5.5 获取请求体数据： body-parser](#55-获取请求体数据-body-parser)
- [防盗链](#防盗链)


# 一、express 介绍
express 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架，官方网址：https://www.expressjs.
com.cn/
简单来说，express 是一个封装好的工具包，封装了很多功能，便于我们开发 WEB 应用（HTTP 服务）

# 二、express 使用
## 2.1 express 下载
express 本身是一个 npm 包，所以可以通过 npm 安装
```
npm init
npm i express
```

## 2.2 express 初体验
1. 创建 JS 文件
```js
//1. 导入 express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则。这里是当请求方法为 GET 且路由为 home 时才响应
app.get('/home', (req, res) => {
    res.end('hello express server');
});

//4. 监听端口 启动服务
app.listen(3000, () =>{
    console.log('服务已经启动, 端口监听为 3000...');
});
```
2. 命令行下执行该脚本
```shell
node <文件名>
# 或者
nodemon <文件名>
```
3.  然后在浏览器就可以访问 `http://127.0.0.1:3000/home` 👌


# 三、express 路由
## 3.1 什么是路由
官方定义： 路由确定了应用程序如何响应客户端对特定端点的请求

## 3.2 路由的使用
一个路由的组成有 **请求方法 ， 路径 和 回调函数** 组成  
express 中提供了一系列方法，可以很方便的使用路由，使用格式如下：
```
app.<method>(path，callback)
```

代码示例：
```js
//导入 express
const express = require('express');

//创建应用对象
const app = express();

//创建 get 路由
app.get('/home', (req, res) => {
  res.send('网站首页');
});

//首页路由
app.get('/', (req,res) => {
  res.send('我才是真正的首页');
});

//创建 post 路由
app.post('/login', (req, res) => {
  res.send('登录成功');
});

// all() 匹配所有的请求方法
app.all('/search', (req, res) => {
  res.send('1 秒钟为您找到相关结果约 100,000,000 个');
});

//自定义 404 路由。上面的路由都不匹配，那么会匹配这里，即 404。切记：这里的方法要放在最后，不然会覆盖掉其他路由的匹配
app.all("*", (req, res) => {
  res.send('<h1>404 Not Found</h1>')
});

//监听端口 启动服务
app.listen(3000, () =>{
  console.log('服务已经启动, 端口监听为 3000');
});
```

## 3.3 获取请求参数
express 框架封装了一些 API 来方便获取请求报文中的数据，并且兼容原生 HTTP 模块的获取方式
```js
//导入 express
const express = require('express');

//创建应用对象
const app = express();

// 获取请求的路由规则
app.get('/request', (req, res) => {
  // 1. 获取报文的方式与原生 HTTP 获取方式是兼容的
  console.log(req.method);
  console.log(req.url);
  console.log(req.httpVersion);
  console.log(req.headers);

  // 2. express 独有的获取报文的方式。
  // 以 http://127.0.0.1:3000/home?search=123&&key=hello 为例
  console.log(req.path); // 结果：/home

  //获取查询字符串
  console.log(req.query); // 结果：{ search: '123', key: 'hello' }
  console.log(req.query.search); // 结果：123

  // 获取指定的请求头
  console.log(req.get('host')); // 结果：127.0.0.1:3000
  // 获取 ip
  console.log(req.ip); // 结果：::ffff:127.0.0.1

  res.send('请求报文的获取');
});

//启动服务
app.listen(3000, () => {
  console.log('启动成功....')
})
```

## 3.4 获取路由参数
路由参数指的是 `URL 路径中的参数（数据）`
```js
// 例如：浏览器访问 123.html 和 456.html 都是匹配该请求
app.get('/:id.html', (req, res) => {
  res.send('商品详情, 商品 id 为' + req.params.id);
});
```
注意：
- 路由的路径要以 `/` 开头
- 从 `req.params` 取URL 路径中的参数

### 练习：根据路由参数响应歌手的信息
```js
app.get('/singer/:id.html', (req, res) => {
    // 根据路由参数查找歌手信息
    const id = req.params.id;
    let result = singers.find(item => item.id === Number(id));
    // 歌手信息为空，返回404
    if (!result) {
        res.status = 404;
        res.end("404 Not Found");
        return;
    }
    // 返回歌手信息
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2>${result.singer_name}</h2>
        <img src='${result.singer_pic}' />
    </body>
    </html>
    `);
})
```

# 四、express 响应设置
express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生 HTTP 模块的获取方式
```js
//获取请求的路由规则
app.get("/response", (req, res) => {
  //1. express 中设置响应的方式兼容 HTTP 模块的方式
  res.statusCode = 404;
  res.statusMessage = 'xxx';
  res.setHeader('abc','xyz');
  res.write('响应体');
  res.end('xxx');

  //2. express 的响应方法
  res.status(500); //设置响应状态码
  res.set('xxx','yyy');//设置响应头
  res.send('中文响应不乱码');//设置响应体
  //连贯操作
  res.status(404).set('xxx','yyy').send('你好朋友')
  
  //3. 其他响应
  res.redirect('http://atguigu.com')//重定向
  res.download('./package.json');//下载响应
  res.json({'name': '123'});//响应 JSON
  res.sendFile(__dirname + '/home.html') //响应文件内容
});
```
注意：
- `res.send()` 自动设置了 `text/html;charset-utf-8` 的响应头，所以 `res.send()` 里面返回中文不会乱码。
- `res.download()` 会让浏览器下载指定文件。
  - 在响应头加 `Content-Disposition: attachment; filename="package.json"` 指示浏览器下载文件
- `res.json()` 响应 JSON 内容
  - 会在响应头加 `Content-Type:application/json; charset=utf-8`
- `res.sendFile()` 响应文件内容
  - 例如：响应一个 html 文件，浏览器会显示该 html 文件

# 五、express 中间件
## 5.1 什么是中间件
中间件（`Middleware`）本质是一个回调函数  
中间件函数 可以像路由回调一样访问 **请求对象（request） ， 响应对象（response）**

## 5.2 中间件的作用
中间件的作用 就是 使用函数封装公共操作，简化代码

## 5.3 中间件的类型
全局中间件：所有请求都会经过  
路由中间件：只有满足路由规则的才经过

### 5.3.1 定义全局中间件
**每一个请求** 到达服务端之后 **都会执行全局中间件函数**

1、声明中间件函数
```js
function recordMiddleware(request,response,next){
  //实现功能代码
  //.....

  //执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
  next();
}
```

2、应用中间件
```js
app.use(recordMiddleware);
```
声明时可以直接将匿名函数传递给 `use`
```js
app.use(function (request, response, next) {
  console.log('定义第一个中间件');
  next();
})
```

例子：
```js
const express = require("express");
const path = require("path");
const fs = require("fs");

// 记录每个请求的路径和 ip 到 access.log 文件中
function recordMiddleware(req, res, next) {
    const {url, ip} = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`);
    next();
}

const app = express();
app.use(recordMiddle);

// 当发送 response 请求时，就会经过 recordMiddle 中间件，记录请求路径和ip
app.get('/response', (req, res) => {
    res.send("response");
})
```

### 5.3.2 多个全局中间件
`express` 允许使用 `app.use()` 定义多个全局中间件
```js
app.use(function (request, response, next) {
  console.log('定义第一个中间件');
  next();
})
app.use(function (request, response, next) {
  console.log('定义第二个中间件');
  next();
})
```

### 5.3.3 定义路由中间件
如果 **只需要对某一些路由进行功能封装** ，则就需要路由中间件。  
格式：
```js
app.get('/路径',`中间件函数`,(request,response)=>{
});
app.get('/路径',`中间件函数1`,`中间件函数2`,(request,response)=>{
});
```

例子：
```js
// 校验中间件，当请求带有 code 请求参数且值为 512 时，才继续正常响应
function checkCodeMiddleware (req, res, next) {
    if (req.query.code == "512") {
        next();
    } else {
        res.send("暗号错误");
    }
}

// 设置中间件。只有 /detail 和 /setting 请求才会经过 checkCodeMiddleware 中间件
app.get('/detail', checkCodeMiddleware, (req, res) => {
    res.send("详情页");
})
app.get('/setting', checkCodeMiddleware, (req, res) => {
    res.send("设置页面");
})
```

## 5.4 静态资源中间件
express 内置处理静态资源的中间件。会自动根据文件类型在请求头的 `Content-Type` 设置对应的类型
```js
//引入express框架
const express = require('express');

//创建服务对象
const app = express();

//静态资源中间件的设置，将当前文件夹下的public目录作为网站的根目录。当然这个目录中都是一些静态资源
app.use(express.static(__dirname + './public')); 

// 会响应上面的静态资源设置，因为上面的先声明
app.get('/index.html',(request,response)=>{
  respsonse.send('首页');
});

//监听端口
app.listen(3000,()=>{
  console.log('3000 端口启动....');
});
```
注意：
1. `index.html` 文件为默认打开的资源。即 `/` 路由默认会打开 `index.html` 文件
2. 如果静态资源与路由规则同时匹配，**谁先匹配谁就响应**
3. 路由响应动态资源，静态资源中间件响应静态资源

## 5.5 获取请求体数据： body-parser
`express` 可以使用 `body-parse`r 包处理请求体

第一步：安装
```
npm i body-parser
```

第二步：导入 `body-parser` 包
```js
const bodyParser = require('body-parser');
```

第三步：获取中间件函数。根据请求的请求体的数据类型选择对应的 `parser`
```js
//处理 querystring 格式的请求体：application/x-www-form-urlencoded parser
let urlParser = bodyParser.urlencoded({extended:false});

//处理 JSON 格式的请求体：application/json parser
let jsonParser = bodyParser.json();
```

第四步：设置路由中间件，然后使用 `request.body` 来获取请求体数据
```js
app.post('/login', urlParser, (request,response)=>{
  //获取请求体数据
  console.log(request.body);
  //用户名
  console.log(request.body.username);
  //密码
  console.log(request.body.userpass);
  response.send('获取请求体数据');
});
```

获取到的请求体数据：
```js
// application/x-www-form-urlencoded parser 的结果
[Object: null prototype] { username: 'admin', userpass: '123456' }

// application/json parser
{ keyword: 'h5', num: 123 }
```

# 防盗链
HTTP请求防盗链：**只允许某些域名请求来源才可以访问。**

比如A网站有一张图片或音频等资源被B网站直接通过img等标签属性引入使用，这样就是B网站盗用了A网站的资源。那么对于A网站来说，流量怎么被消耗的都不知道。

解决：使用 `referer` 请求头识别请求的地址，判断地址是否为当前的域名

```js
//导入 express
const express = require('express');

//创建应用对象
const app = express();

//声明中间件
app.use((req, res, next) => {
  //检测请求头中的 referer 是否为 127.0.0.1
  //获取 referer
  let referer = req.get('referer');
  if(referer){
    //实例化
    let url = new URL(referer);
    //判断
    if(url.hostname !== '127.0.0.1'){
      //响应 404 
      res.status(404).send('<h1>404 Not Found</h1>');
      return;
    }
  }
  next();
});

//静态资源中间件设置
app.use(express.static(__dirname + '/public'));

//监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口 3000 正在监听中....')
})
```