var express = require('express');
var router = express.Router();

//导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json');
//获取 db 对象
const db = low(adapter);

// 导入 shortid
const shortid = require('shortid');

// 记账列表
router.get('/account', function(req, res, next) {
  const accounts = db.get("accounts").value();
  res.render('list', {accounts});
});

// 添加记录
router.get('/account/create', function(req, res, next) {
  res.render('create');
});

// 增加记录
router.post('/account', function(req, res) {
  // 生成 id
  const id = shortid.generate();
  // 写入文件
  db.get("accounts").unshift({id, ...req.body}).write();
  // 成功提示
  res.render("success", {msg: "添加成功...", url: "/account"});
});

module.exports = router;
