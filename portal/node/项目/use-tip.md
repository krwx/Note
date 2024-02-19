# use-tip

- [use-tip](#use-tip)
  - [express](#express)
    - [设置多个静态资源目录](#设置多个静态资源目录)
    - [跨域](#跨域)
  - [formidable 处理上传的文件](#formidable-处理上传的文件)
    - [存放图片](#存放图片)

## express

### 设置多个静态资源目录

```js
app.use(express.static(path.join(__dirname, 'public/bookCover')));
app.use(express.static(path.join(__dirname, '../client/build')));
```

### 跨域

声明一个跨域的中间件：corsMiddleware.js

```js
module.exports = (req, res, next) => {
    // 调用 express 框架的 set 方法设置请求头
    // 设置跨域相关的请求头
    res.set("Access-Control-Allow-Credentials", "true")
        .set("Access-Control-Allow-Origin", "*");
    
    // 记得执行 next() 
    next();
}
```

app 全局使用:

```js
const corsMiddleware = require("./middlewares/corsMiddleware");

app.use(corsMiddleware);
```

## formidable 处理上传的文件

**注意：**`formidable parse` 后的请求的 `body` 属性为空，即使已经用了 `express.json()` 中间件处理请求。所以获取请求体只能通过 `fields` 属性获取。

```js
const form = formidable({
    uploadDir: __dirname + "/../../public/bookCover",
    keepExtensions: true
});

form.parse(req, async (err, fields, files) => {
    if (err) {
        throw err;
    }

    console.log(req.body); // req.body 为 {}
    // 获取 fields ，重新构造插入数据库的数据
    let insertData = {
        ...fields,
        imageUrl: "http://127.0.0.1/" + files.image.newFilename
    }

    // 插入数据
    const data = await BookModel.create(insertData)
    res.json({
        code: '0000',
        msg: "添加成功",
        data
    })
});
```

### 存放图片

图片文件存放在服务器中，文件对应位置的 url 存放在数据库中。前端设置 url 给 image 的 src 属性，获取图片。

- 注意：url 应为绝对路径。
  - 例如：如果 url 为 `123.jpg` ，那么前端会将这个url与当前域名进行拼接，变成 `localhost/123.jpg`。这样是访问不到服务器的图片的
  - 需要将 url 改成 `http://127.0.0.1/02c60112098236adb12169100.jpg`
