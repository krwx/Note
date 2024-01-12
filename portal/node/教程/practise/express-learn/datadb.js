const mongoose = require("mongoose");

/**
 * mongodb：协议
 * 127.0.0.1：IP地址
 * 27017：默认端口号
 * bilibili：数据库名称
 */
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');


mongoose.connection.once('open', async () => {
    // console.log("连接成功");

    //5. 创建文档结构对象
    let BookSchema = new mongoose.Schema({
        title: String,
        author: String,
        price: Number,
    });
    //6. 创建文档模型对象
    let BookModel = mongoose.model('books', BookSchema);

    try {
        // 插入
        /* await BookModel.create({
            title: 'test',
            author: '吴承恩',
            price: 20,
        }); */

        /* let data = await BookModel.insertMany([{
            title: 'test',
            author: '吴承恩',
            price: 20,
        },{
            title: 'test1',
            author: '吴承恩1',
            price: 201,
        }]); */

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

        // 条件控制
        /* let data = await BookModel.find({price: {$gt:50}});
        let data = await BookModel.find({price: {$lt:50}}); */

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
})

mongoose.connection.on('error', () => {
    console.log("连接错误");
})

mongoose.connection.on('close', () => {
    console.log("连接停止");
})

/* setTimeout(() => {
    mongoose.disconnect();
}, 2000) */