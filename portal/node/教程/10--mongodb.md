- [一、简介](#一简介)
  - [1.1 Mongodb 是什么](#11-mongodb-是什么)
  - [1.2 数据库是什么](#12-数据库是什么)
  - [1.3 数据库的作用](#13-数据库的作用)
  - [1.4 数据库管理数据的特点](#14-数据库管理数据的特点)
  - [1.5 为什么选择 Mongodb](#15-为什么选择-mongodb)
- [二、核心概念](#二核心概念)
- [三、下载安装与启动](#三下载安装与启动)
  - [3.1 启动](#31-启动)
- [四、命令行交互](#四命令行交互)
  - [4.1 数据库命令](#41-数据库命令)
  - [4.2 集合命令](#42-集合命令)
  - [4.3 文档命令](#43-文档命令)
- [五、Mongoose](#五mongoose)
  - [5.1 介绍](#51-介绍)
  - [5.2 作用](#52-作用)
  - [5.3 使用流程](#53-使用流程)
  - [5.4 字段类型](#54-字段类型)
  - [5.5 字段值验证](#55-字段值验证)
    - [5.5.1 必填项](#551-必填项)
    - [5.5.2 默认值](#552-默认值)
    - [5.5.3 枚举值](#553-枚举值)
    - [5.5.4 唯一值](#554-唯一值)
  - [5.6 CURD](#56-curd)
    - [5.6.1 增加](#561-增加)
    - [5.6.2 删除](#562-删除)
    - [5.6.3 更新](#563-更新)
    - [5.6.4 查询](#564-查询)
  - [5.7 条件控制](#57-条件控制)
    - [5.7.1 运算符](#571-运算符)
    - [5.7.2 逻辑运算](#572-逻辑运算)
    - [5.7.3 正则匹配](#573-正则匹配)
  - [5.8 个性化读取](#58-个性化读取)
    - [5.8.1 字段筛选](#581-字段筛选)
    - [5.8.2 数据排序](#582-数据排序)
    - [5.8.3 数据截取](#583-数据截取)


# 一、简介
## 1.1 Mongodb 是什么
MongoDB 是一个基于分布式文件存储的数据库，官方地址 https://www.mongodb.com/

## 1.2 数据库是什么
数据库（DataBase）是按照数据结构来组织、存储和管理数据的 应用程序

## 1.3 数据库的作用
数据库的主要作用就是 管理数据 ，对数据进行 增（c）、删（d）、改（u）、查（r）

## 1.4 数据库管理数据的特点
相比于纯文件管理数据，数据库管理数据有如下特点：
1. 速度更快
2. 扩展性更强
3. 安全性更强

## 1.5 为什么选择 Mongodb
操作语法与 JavaScript 类似，容易上手，学习成本低

# 二、核心概念
Mongodb 中有三个重要概念需要掌握
- 数据库（database） 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合
- 集合（collection） 集合类似于 JS 中的数组，在集合中可以存放很多文档
- 文档（document） 文档是数据库中的最小单位，类似于 JS 中的对象

# 三、下载安装与启动
下载地址： https://www.mongodb.com/try/download/community

建议选择 `zip` 类型， 通用性更强

安装到 C 盘的配置步骤如下:
1. 将压缩包移动到 `C:\Program Files` 下，然后解压
2. 创建 `C:\data\db` 目录，`mongodb` 会将数据默认保存在这个文件夹
3. 以 `mongodb` 中 `bin` 目录作为工作目录，启动命令行
4. 运行命令 `mongod`

安装其他盘的配置步骤：
1. 将压缩包移动到自定义目录，然后解压
2. 创建了一个和 `bin` 目录同级 `data\db` 目录来存储 `MongoDB` 产生的数据
3. 配置环境变量。在系统变量中添加 `MongoDB` 的 `bin` 地址。
   1. 例如：我这里添加了`D:\study\software\mongodb-win32-x86_64-windows-5.0.14\bin`
4. 进入 `bin` 目录下，`cmd` 进入 命令行窗口，使用命令的指定存储数据文件的形式启动：`mongod --dbpath=..\data\db`。启动之后可以看到 `MongoDB` 的默认端口是 27017
   1. 游览器上输入：`localhost:27017`，看到 `It looks like you are trying to access MongoDB over HTTP on the native driver port.` 就能证明 `MongoDB` 启动成功
5. 然后可以使用 `mongo` 命令连接本机的 `mongodb` 服务

> 注意：
> - 千万不要选中服务端窗口的内容 ，选中会停止服务，可以 敲回车 取消选中
> - 要用 `cmd/powershell` 启动，不要用 `git bash` 启动，会启动不了

## 3.1 启动
1. 进入 `D:\study\software\mongodb-win32-x86_64-windows-5.0.14\bin` 文件夹
2. 运行 `mongod --dbpath=..\data\db` 启动服务
3. 运行 `mongo` 命令连接本机的 `mongodb` 服务

# 四、命令行交互
## 4.1 数据库命令
1. 显示所有的数据库（如果数据库中没有集合是不会显示出来的）
   ```
   show dbs
   ```
2. 切换到指定的数据库，如果数据库不存在会自动创建数据库
   ```
   use 数据库名
   ```
3. 显示当前所在的数据库
   ```
   db
   ```
4. 删除当前数据库
   ```
   use 库名
   db.dropDatabase()
   ```

## 4.2 集合命令
1. 创建集合
   ```
   db.createCollection('集合名称)
   ```
2. 显示当前数据库中的所有集合
   ```
   show collections
   ```
3. 删除某个集合
   ```
   db.集合名.drop()
   ```
4. 重命名集合
   ```
   db.集合名.renameCollection('newName')
   ```

## 4.3 文档命令
1. 插入文档
   ```
   db.集合名.insert(文档对象);
   ```
2. 查询文档  
   `_id` 是 `mongodb` 自动生成的唯一编号，用来唯一标识文档
   ```
   # 查询集合下的所有数据
   db.集合名.find() 

   # 根据查询条件查询集合下的数据
   db.集合名.find(查询条件)
   db.users.find({age: 20})
   ```
3. 更新文档  
   ```
   db.集合名.update(查询条件,新的文档)

   # 全量更新
   db.集合名.update({name:'张三'},{age:19})

   # 更新部分数据
   db.集合名.update({name:'张三'},{$set:{age:19}})
   ```
4. 删除文档
   ```
   db.集合名.remove(查询条件)
   ```

# 五、Mongoose
## 5.1 介绍
Mongoose 是一个对象文档模型库，官网 http://www.mongoosejs.net/

## 5.2 作用
方便使用代码操作 mongodb 数据库

## 5.3 使用流程
> 下面的代码是8.0 版本的写法，使用 `async/await` 的写法

安装
```
npm i mongoose
```
使用
```js
// 1. 导入 mongoose
const mongoose = require("mongoose");

/**
 * 2. 连接数据库
 * mongodb：协议
 * 127.0.0.1：IP地址
 * 27017：默认端口号
 * bilibili：数据库名称
 */
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

// 3. 设置连接回调
// 连接成功。使用 once()
mongoose.connection.once('open', async () => {
    //4. 创建文档结构对象
    let BookSchema = new mongoose.Schema({
        title: String,
        author: String,
        price: Number
    });
    //5. 创建文档模型对象
    let BookModel = mongoose.model('books', BookSchema);
    //6. 插入文档
    await BookModel.create({
        title: 'fjv',
        author: '吴承恩',
        price: 19.9
    })
    // 7. 关闭连接
    mongoose.disconnect();
})

// 连接出错
mongoose.connection.on('error', () => {
    console.log("连接错误");
})

// 连接关闭
mongoose.connection.on('close', () => {
    console.log("连接关闭");
})
```
> 集合的名称：
> - 在创建集合时，`mongoose` 会使用集合名称的复数来作为集合名来创建集合。
> 如果输入了 `book`， 会自动生成 `books`。如果输入的就是 `books`，则为 `books`

> 设置连接成功回调使用 `once()` 不用 `on()` 的原因：
> - `once()` 只会在一开始初始化后执行一次回调函数
> - 如果暂时连接不上数据库，后面又重新连接上的话，`once()` 这时不会执行。但是 `on()` 会执行回调函数。如果回调函数有一些初始化的代码，这时又重新运行会不太好

## 5.4 字段类型
文档结构可选的常用字段类型列表
|类型| 描述|
|--|--|
String| 字符串
Number| 数字
Boolean| 布尔值
Array| 数组，也可以使用 [] 来标识
Date| 日期
Buffer Buffer| 对象
Mixed| 任意类型，需要使用 mongoose.Schema.Types.Mixed 指定
ObjectId| 对象 ID，需要使用 mongoose.Schema.Types.ObjectId 指定
Decimal128| 高精度数字，需要使用 mongoose.Schema.Types.Decimal128 指定

如果插入的数据的数据类型与定义的不一样，会报错。

## 5.5 字段值验证
Mongoose 有一些内建验证器，可以对字段值进行验证
### 5.5.1 必填项
```js
// 正常写法
title: string

title: {
   type: String,
   required: true // 设置必填项
},
```
### 5.5.2 默认值
```js
author: {
   type: String,
   default: '匿名' //默认值
},
```
### 5.5.3 枚举值
```js
gender: {
   type: String,
   enum: ['男','女'] //设置的值必须是数组中的
},
```
### 5.5.4 唯一值
```js
username: {
   type: String,
   unique: true
},
```
unique 需要 **重建集合** 才能有效果：在已有的集合中设置唯一值是不生效的，需要将集合删掉，再重建集合才行



## 5.6 CURD
数据库的基本操作包括四个，增加（create），删除（delete），修改（update），查（read）

### 5.6.1 增加
插入一条
```js
await BookModel.create({
   title: 'fjv',
   author: '吴承恩',
   price: 19.9
})
```
批量插入。参数为一个数组，数组里面填要添加的数据
```js
await BookModel.insertMany([{
   title: 'test',
   author: '吴承恩',
   price: 20,
},{
   title: 'test1',
   author: '吴承恩1',
   price: 201,
}]);
```
返回值：文档在集合中的具体数据
```js
[
  {
    title: 'test',
    author: '吴承恩',
    price: 20,
    _id: new ObjectId('65a1003926aa6c3da169314c'),
    __v: 0
  },
  {
    title: 'test1',
    author: '吴承恩1',
    price: 201,
    _id: new ObjectId('65a1003926aa6c3da169314d'),
    __v: 0
  }
]
```

### 5.6.2 删除
删除一条数据。删除匹配的第一条数据
```js
await BookModel.deleteOne({title: "test"});
```
批量删除。删除匹配条件的所有数据
```js
await BookModel.deleteMany({title: "test"});
```
返回：删除的结果
```js
{ acknowledged: true, deletedCount: 1 }
```

### 5.6.3 更新
入参：
- 第一个入参为匹配的条件
- 第二个入参为需要更新的字段。只更新指定的字段，不是全量更新

更新一条数据。
```js
let data = await BookModel.updateOne({title: "test"}, {price:300});
```

批量更新
```js
let data = await BookModel.updateMany({title: "test1"}, {price:300});
```

返回结果
```js
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
```

### 5.6.4 查询
查询一条数据
```js
// 查找 title 为 test 的数据
let data = await BookModel.findOne({title: "test"});

// 查找 title 为 test 的数据，且返回的数据仅包含 title、price 和 id 列
let data = await BookModel.findOne({title: "test"}, "title price");
```

根据 id 查找
```js
let data = await  BookModel.findById("65a0d1143cd4af8e2d6ec502");
```

批量查询
```js
// 加条件查询
let data = await BookModel.find({"title": "test1"});

// 查询所有数据
let data = await BookModel.find();
```

## 5.7 条件控制
### 5.7.1 运算符
在 `mongodb` 不能使用 `> < >= <= !==` 等运算符，需要使用替代符号
- `>` 使用 `$gt`
- `<` 使用 `$lt`
- `>=` 使用 `$gte`
- `<=` 使用 `$lte`
- `!==` 使用 `$ne`

例子：
```js
// 通常写法
let data = await BookModel.find({price: 50});

// 加上条件控制。注意使用替代符号要写成对象的形式
let data = await BookModel.find({price: {$gt:50}});
let data = await BookModel.find({price: {$lt:50}});
```


### 5.7.2 逻辑运算
`$or` 逻辑或的情况
```js
let data = await BookModel.find({$or: [{price: 20}, {price: 50}]});
```

`$and` 逻辑与的情况
```js
let data = await BookModel.find({$and: [{price: {$gt:50}}, {price: {$lt:100}}]});
```

使用 `{$and: [...]}`，`{$or: [...]}` 形式编写

### 5.7.3 正则匹配
条件中可以直接使用 JS 的正则语法，通过正则可以进行模糊查询
```js
let data = await BookModel.find({title: /test/}); // 会找寻所有 title 为 test 的数据
```

## 5.8 个性化读取
### 5.8.1 字段筛选
使用 select() 选择筛选的字段
- 0: 不要的字段  
- 1: 要的字段  

```js
let data = await BookModel.find().select({title: 1, author: 1});
```

### 5.8.2 数据排序
使用 sort() 排序
- 1:升序
- -1:倒序

```js
let data = await BookModel.find().sort({price: 1});
let data = await BookModel.find().sort({price: -1});
```

### 5.8.3 数据截取
- 使用 skip(num) 跳过 num 条数据
- 使用 limit(num) 限定返回 num 条数据
- 结合使用可以实现分页

```js
let data = await BookModel.find().limit(2);
let data = await BookModel.find().skip(2).limit(2);
```
