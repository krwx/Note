const db = require("./db/db");
const mongoose = require("mongoose");
const BookModel = require("./models/BookModel");

const success = async () => {
    console.log("连接成功");

    try {
    
        // 删除单条
        // let data = await BookModel.deleteOne({title: "test"});
    
        // 批量删除
        // await BookModel.deleteMany({abv: "abc"});
    
        // 更新一条数据
        // let data = await BookModel.updateMany({title: "test1"}, {price:300});
    
        // 查询一条数据
        // let data = await BookModel.findOne({title: "西游记"}, "title price");
    
        // let data = await  BookModel.findById("65a0d1143cd4af8e2d6ec502");
    
        // 批量查询
        // let data = await BookModel.find({"title": "test1"});
    
        // let data = await BookModel.find();
    
        // let data = await BookModel.find({$or: [{price: 20}, {price: {$lt:20}}]});
    
        // let data = await BookModel.find({title: /test/});
    
        // 字段筛选
        // let data = await BookModel.find().select({title: 1, author: 1});
    
        // 排序
        let data = await BookModel.find().skip(2).limit(2);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    mongoose.disconnect();
}

const error = () => {
    console.log("连接错误");
}

// db(success, error);

db(success);