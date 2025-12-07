const express = require("express");
const path = require("path");
const fs = require("fs");

const homeRouter = require("./routes/homeRouter");

function recordMiddle(req, res, next) {
    const {url, ip} = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`);
    next();
}

const app = express();
const bodyParser = require('body-parser');

//处理 querystring 格式的请求体
let urlParser = bodyParser.urlencoded({extended:false});
//处理 JSON 格式的请求体
let jsonParser = bodyParser.json();

// app.use(recordMiddle);

app.use(homeRouter);

app.get('/:id.html', (req, res) => {
    console.log(req.params.id);
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end("商品详情")
})

app.use(express.static(__dirname + '/public'));

function checkCodeMiddleware (req, res, next) {
    if (req.query.code == "512") {
        next();
    } else {
        res.send("暗号错误");
    }
}

app.get('/detail', checkCodeMiddleware, (req, res) => {
    res.send("详情页");
})

app.get('/setting', checkCodeMiddleware, (req, res) => {
    res.send("设置页面");
})

app.post('/login', urlParser, (req, res) => {
    console.log(req.body);
    res.send("login");
})

app.post('/user', jsonParser, (req, res) => {
    console.log(req.body);
    res.send("login");
})



app.all('*', (req, res) => {
    res.end("404");
})

app.listen(3000, () => {
    console.log("服务已经启动。。。");
})

