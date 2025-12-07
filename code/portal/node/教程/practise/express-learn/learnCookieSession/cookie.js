const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.cookie("name", "123");
    res.cookie('email','23123456@qq.com', {maxAge: 5*60*1000 }); // 毫秒为单位。这里是5个小时
    res.send("详情页");
})


app.listen(3000, () => {
    console.log("服务已经启动。。。");
})

