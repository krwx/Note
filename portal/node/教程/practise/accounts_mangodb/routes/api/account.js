var express = require('express');
var router = express.Router();

// 转换时间格式
const moment = require("moment");

const AccountModel = require('../../models/AccountModel');

//记账本的列表
router.get('/account', async function (req, res, next) {
    try {
        //获取所有的账单信息
        let accounts = await AccountModel.find().sort({ time: -1 });

        // 响应成功的提示
        res.json({
            // 响应编号，成功的编号通常是 0000 或 200000
            code: "0000",
            // 响应的信息
            msg: "读取成功",
            // 响应的数据
            data: accounts
        })
    } catch (error) {
        res.json({
            code: '1001',
            msg: "读取失败",
            data: null
        })
    }
});

//新增记录
router.post('/account', async (req, res) => {
    try {
        // 插入数据
        const data = await AccountModel.create({
            ...req.body,
            time: new Date(req.body.time)
        })

        res.json({
            code: '0000',
            msg: "添加成功",
            data
        })
    } catch (error) {
        res.json({
            code: '1002',
            msg: "添加失败",
            data: null
        })
    }
});

//删除记录
router.delete('/account/:id', async (req, res) => {
    //获取 params 的 id 参数
    let id = req.params.id;
    try {
        //删除
        await AccountModel.deleteOne({ _id: id });
        res.json({
            code: '0000',
            msg: "删除成功",
            data: {}
        })
    } catch (error) {
        res.json({
            code: '1003',
            msg: "删除失败",
            data: null
        })
    }
});

//获取单个账单信息
router.get('/account/:id', async (req, res) => {
    let id = req.params.id;
    try {
        //删除
        let data = await AccountModel.findById({ _id: id });
        res.json({
            code: '0000',
            msg: "查询成功",
            data
        })
    } catch (error) {
        res.json({
            code: '1004',
            msg: "查询失败",
            data: null
        })
    }
});

//更新单个账单信息
router.patch('/account/:id', async (req, res) => {
    let id = req.params.id;
    try {
        await AccountModel.updateOne({ _id: id }, req.body);
        // patch 请求返回更新后的数据
        await AccountModel.findById(id).then((data) => {
            res.json({
                code: '0000',
                msg: "更新成功",
                data
            })
        }).catch((error) => {
            res.json({
                code: '1004',
                msg: "查询失败",
                data: null
            })
        }) 
    } catch (error) {
        res.json({
            code: '1005',
            msg: "更新失败",
            data: null
        })
    }
});


module.exports = router;
