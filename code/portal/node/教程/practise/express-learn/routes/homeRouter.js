const express = require("express");

const homeRouter = express.Router();

homeRouter.get('/home', (req, res) => {
    //2. express 独有的获取报文的方式
    console.log(req.path);
    //获取查询字符串
    console.log(req.query); // 
    console.log(req.query.search);
    // 获取指定的请求头
    console.log(req.get('host'));
    // 获取 ip
    console.log(req.ip);
    res.end("hello express")
});

homeRouter.get('/response', (req, res) => {
    res.status(400);
    res.set('myhead', 'tet');
    res.send("你发噶士大夫");
})

module.exports = homeRouter;