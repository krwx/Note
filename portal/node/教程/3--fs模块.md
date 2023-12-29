- [fs 模块介绍](#fs-模块介绍)
- [一、文件写入](#一文件写入)
  - [1-1. writeFile 异步写入](#1-1-writefile-异步写入)
    - [options 选项设置](#options-选项设置)
  - [1-2. writeFileSync 同步写入](#1-2-writefilesync-同步写入)
  - [1-3. appendFile / appendFileSync 追加写入](#1-3-appendfile--appendfilesync-追加写入)
  - [1-4. createWriteStream 流式写入](#1-4-createwritestream-流式写入)
- [二、文件读取](#二文件读取)
  - [2-1 readFile 异步读取](#2-1-readfile-异步读取)
  - [2-2 readFileSync 同步读取](#2-2-readfilesync-同步读取)
  - [2-3 createReadStream 流式读取](#2-3-createreadstream-流式读取)
  - [2-4 实现复制文件](#2-4-实现复制文件)
- [三、文件移动与重命名](#三文件移动与重命名)
- [四、文件删除](#四文件删除)
  - [rm 使用事项](#rm-使用事项)
- [五、文件夹操作](#五文件夹操作)
  - [5-1 mkdir 创建文件夹](#5-1-mkdir-创建文件夹)
  - [5-2 readdir 读取文件夹](#5-2-readdir-读取文件夹)
  - [5-3 rmdir 删除文件夹](#5-3-rmdir-删除文件夹)
- [六、查看资源状态](#六查看资源状态)
- [七、相对路径问题](#七相对路径问题)
- [八、\_\_dirname](#八__dirname)
- [练习--批量重命名](#练习--批量重命名)


# fs 模块介绍
`fs` 全称为 `file system` ，称之为 文件系统 ，是 Node.js 中的 内置模块 ，可以对计算机中的磁盘进行操作。

本章节会介绍如下几个操作：
1. 文件写入
2. 文件读取
3. 文件移动与重命名
4. 文件删除
5. 文件夹操作
6. 查看资源状态

# 一、文件写入
|方法| 说明|
|--|--|
writeFile| 异步写入
writeFileSync| 同步写入
appendFile / appendFileSync| 追加写入
createWriteStream| 流式写入

## 1-1. writeFile 异步写入
语法： `fs.writeFile(file, data[, options], callback)`

参数说明：
- file 文件名
- data 待写入的数据
- options 选项设置 （可选）
- callback 写入回调

返回值： undefined

代码示例：
```js
// require 是 Node.js 环境中的'全局'变量，用来导入模块
const fs = require("fs");

fs.writeFile("./座右铭.txt", "hello", err => {
    //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
    if (err) {
        console.log(err, '写入失败');
        return;
    }
    console.log("写入成功");
})
```
### options 选项设置
参数：
- flag
  - w：写入模式
  - a：追加模式
  - r：读取模式

writeFile 实现追加：
```js
const fs = require("fs");

fs.writeFile("./座右铭.txt", "hello123", {flag: "a"} ,err => {
    if (err) {
        console.log(err, '写入失败');
        return;
    }
    console.log("写入成功");
})
```

## 1-2. writeFileSync 同步写入
语法: `fs.writeFileSync(file, data[, options])`

参数与 `fs.writeFile` 大体一致，只是没有 `callback` 参数

例子：
```js
try{
    fs.writeFileSync('./座右铭.txt', '三人行，必有我师焉。');
}catch(e){
    console.log(e);
}
```

## 1-3. appendFile / appendFileSync 追加写入
`appendFile` 作用是在文件尾部追加内容，appendFile 语法与 writeFile 语法完全相同

语法:
```js
fs.appendFile(file, data[, options], callback)
fs.appendFileSync(file, data[, options])
```

例子：
```js
fs.appendFile('./座右铭.txt','择其善者而从之，其不善者而改之。', err => {
    if(err) throw err;
    console.log('追加成功')
});

fs.appendFileSync('./座右铭.txt','\r\n温故而知新, 可以为师矣');
```

**使用 `\r\n` 进行换行**

## 1-4. createWriteStream 流式写入
语法： `fs.createWriteStream(path[, options])`

参数说明：
- path 文件路径
- options 选项配置（ 可选 ）

例子：
```js
let ws = fs.createWriteStream('./观书有感.txt');

ws.write('半亩方塘一鉴开\r\n');
ws.write('天光云影共徘徊\r\n');
ws.write('问渠那得清如许\r\n');
ws.write('为有源头活水来\r\n');
// 关闭流
ws.end()
```

- 流式写入方式适用于 大文件写入或者频繁写入 的场景
- writeFile 适合于 写入频率较低的场景

# 二、文件读取
文件读取顾名思义，就是通过程序从文件中取出其中的数据，我们可以使用如下几种方式：
|方法| 说明|
|--|--|
readFile| 异步读取
readFileSync| 同步读取
createReadStream| 流式读取

## 2-1 readFile 异步读取
语法： `fs.readFile(path[, options], callback)`

参数说明：
- path 文件路径
- options 选项配置
- callback 回调函数
  - 两个参数，第一个为 err，第二个为 data
  - data 为 buffer 类型的数据

例子：
```js
//导入 fs 模块
const fs = require('fs');

fs.readFile('./座右铭.txt', (err, data) => {
  if(err) throw err;
  console.log(data);
});
```

转换 buffer 数据为 utf-8 形式：
```js
// 1. 通过指定 option，指定 encoding 为 utf-8
fs.readFile('./座右铭.txt', 'utf-8',(err, data) => {
  if(err) throw err;
  console.log(data);
});

// 调用 toString
fs.readFile('./座右铭.txt', (err, data) => {
  if(err) throw err;
  console.log(data.toString());
});
```

## 2-2 readFileSync 同步读取
语法： `fs.readFileSync(path[, options])`

参数说明：
- path 文件路径
- options 选项配置

返回值： `string | Buffer`

```js
let data = fs.readFileSync('./座右铭.txt');
let data2 = fs.readFileSync('./座右铭.txt', 'utf-8')
```

## 2-3 createReadStream 流式读取
语法： `fs.createReadStream(path[, options])`

参数说明：
- path 文件路径
- options 选项配置（ 可选 ）

监听事件：
- 读取数据中需要监听 `data` 事件。
  - 读取的数据为 buffer 数据。
  - 读取流每次读取完一个 64k 数据后就会调用回调函数。所有读取过程会调用多次回调函数
- 读取数据完成需要监听 `end` 事件

例子：
```js
//创建读取流对象
let rs = fs.createReadStream('./观书有感.txt');

//每次取出 64k 数据后执行一次 data 回调
rs.on('data', data => {
  console.log(data);
  console.log(data.length); // 最长为 65536
});

//读取完毕后, 执行 end 回调
rs.on('end', () => {
  console.log('读取完成')
})
```

## 2-4 实现复制文件
方法一，使用 readFileSync
```js
const fs = require("fs");
// 读取文件内容
const data = fs.readFileSync("./座右铭.txt");
// 写入文件
fs.writeFileSync("./座右铭2.txt", data);
```

方法二，使用流式操作
```js
const fs = require("fs");
// 创建读取流对象
const rs = fs.createReadStream("./座右铭.txt");
// 创建写入流对象
const ws = fs.createWriteStream("./座右铭3.txt");
// 绑定 data 事件
rs.on("data" , chunk => {
    ws.write(chunk);
})

// 简写
rs.pipe(ws);
```

建议使用流式操作的理由：
1. readFileSync 或 readFile 需要读取整个文件，然后把文件放在内存中，如果文件过大，内存会占用很多

监测程序运行使用了多少内存，使用 process
```js
const fs = require("fs");
// 引入 process 模块
const process = require("process");

const rs = fs.createReadStream("./座右铭.txt");
const ws = fs.createWriteStream("./座右铭3.txt");

rs.on("data" , chunk => {
    ws.write(chunk);
})
// 在读取文件结束后再输出内存使用情况
rs.on("end", () => {
    console.log(process.memoryUsage());
})

/**
 * 结果如下，看 rss，单位为字节
 * {
  rss: 22102016,
  heapTotal: 5791744,
  heapUsed: 2998288,
  external: 1128413,
  arrayBuffers: 18090
}
 */
```

# 三、文件移动与重命名
在 Node.js 中，我们可以使用 `rename` 或 `renameSync` 来移动或重命名 文件或文件夹

语法：
```js
fs.rename(oldPath, newPath, callback)
fs.renameSync(oldPath, newPath)
```

参数说明：
- oldPath 文件当前的路径
- newPath 文件新的路径
- callback 操作后的回调

例子：
```js
fs.rename('./观书有感.txt', './论语/观书有感.txt', (err) =>{
  if(err) throw err;
  console.log('移动完成')
});

fs.renameSync('./座右铭.txt', './论语/我的座右铭.txt')
```

# 四、文件删除
在 Node.js 中，我们可以使用 `unlink`，`unlinkSync`，`rm`, `rmSync` 来删除文件

语法：
```ja
fs.unlink(path, callback)
fs.unlinkSync(path)

fs.rm(path, callback)
fs.rmSync(path)
```

参数说明：
- path 文件路径
- callback 操作后的回调

例子：
```js
const fs = require('fs');
// unlink
fs.unlink('./test.txt', err => {
  if(err) throw err;
  console.log('删除成功');
});
fs.unlinkSync('./test2.txt')

// rm
fs.rm('./test.txt', err => {
  if(err) throw err;
  console.log('删除成功');
});
fs.rmSync('./test2.txt')
```

## rm 使用事项
- `rm` 不配置 `options` 只能删除文件，不能删除目录
- `rm` 的 `options` 配置了 `{recursive: true}` 可以递归删除目录

# 五、文件夹操作
借助 Node.js 的能力，我们可以对文件夹进行 创建 、 读取 、 删除 等操作

|方法| 说明|
|--|--|
mkdir / mkdirSync| 创建文件夹
readdir / readdirSync| 读取文件夹
rmdir / rmdirSync| 删除文件夹

## 5-1 mkdir 创建文件夹
在 Node.js 中，我们可以使用 `mkdir` 或 `mkdirSync` 来创建文件夹

语法：
```
fs.mkdir(path[, options], callback)
fs.mkdirSync(path[, options])
```

参数说明：
- path 文件夹路径
- options 选项配置（ 可选 ）
  - 配置 `recursive` 为 `true` 可以递归创建文件夹
- callback 操作后的回调

例子：
```js
//异步创建文件夹
fs.mkdir('./page', err => {
  if(err) throw err;
  console.log('创建成功');
});

//递归异步创建
fs.mkdir('./1/2/3', {recursive: true}, err => {
  if(err) throw err;
  console.log('递归创建成功');
});

//递归同步创建文件夹
fs.mkdirSync('./x/y/z', {recursive: true})
```

## 5-2 readdir 读取文件夹
在 Node.js 中，我们可以使用 `readdir` 或 `readdirSync` 来读取文件夹

语法：
```
fs.readdir(path[, options], callback)
fs.readdirSync(path[, options])
```

参数说明：
- path 文件夹路径
- options 选项配置（ 可选 ）
- callback 操作后的回调
  - 两个入参，第一个为 err，第二个为读取的数据 data
  - data 仅包含当前目录的文件的名称，不包括子目录的文件。
  - data 为一个存储字符串的数组

例子：
```js
//异步读取
fs.readdir('./论语', (err, data) => {
  if(err) throw err;
  console.log(data); // 结果：[ 'nodeTest.js', '教程' ]
});

//同步读取
let data = fs.readdirSync('./论语');
console.log(data);
```

## 5-3 rmdir 删除文件夹
在 Node.js 中，我们可以使用 `rmdir` 或 `rmdirSync` 来删除文件夹

语法：
```
fs.rmdir(path[, options], callback)
fs.rmdirSync(path[, options])
```

参数说明：
- path 文件夹路径
- options 选项配置（ 可选 ）
  - 配置 `recursive` 为 `true` 可以递归删除文件夹，即使文件夹内有内容
- callback 操作后的回调

说明：
- 使用 `rmdir` 或 `rmdirSync` 删除单个文件夹，文件夹内要为空，如果存在文件则报错
- 不推荐使用 `rmdir` 配置 `recursive` 来递归删除。使用 rm 配置 recursive 来递归删除

例子：
```js
//异步删除文件夹
fs.rmdir('./page', err => {
  if(err) throw err;
  console.log('删除成功');
});

//异步递归删除文件夹（不推荐）
fs.rmdir('./1', {recursive: true}, err => {
  if(err) {
    console.log(err);
  }
  console.log('递归删除')
});
// 异步递归删除文件夹（推荐）
fs.rm('./1', {recursive: true}, err => {
  if(err) {
    console.log(err);
  }
  console.log('递归删除')
});

//同步递归删除文件夹（不推荐）
fs.rmdirSync('./x', {recursive: true})
```

# 六、查看资源状态
在 Node.js 中，我们可以使用 `stat` 或 `statSync` 来查看资源的详细信息

语法：
```
fs.stat(path[, options], callback)
fs.statSync(path[, options])
```

参数说明：
- path 文件夹路径
- options 选项配置（ 可选 ）
- callback 操作后的回调

```js
//异步获取状态
fs.stat('./data.txt', (err, data) => {
  if(err) throw err;
  console.log(data);

  // 判断文件类型
  console.log(data.isFile()); // true
  console.log(data.isDirectory()); // false
});
//同步获取状态
let data = fs.statSync('./data.txt');
```

结果值对象结构：
- size： 文件体积
- birthtime： 创建时间
- atime：最后访问时间
- mtime： 最后修改时间
- ctime：最后一次修改文件状态时间
- isFile： 检测是否为文件
- isDirectory： 检测是否为文件夹
- ....
```js
// 结果
Stats {
  dev: 514245672,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 3096224745059125,
  size: 18,
  blocks: 0,
  atimeMs: 1703835969608.0771,
  mtimeMs: 1703835969608.0771,
  ctimeMs: 1703835969608.0771,
  birthtimeMs: 1703835966060.2224,
  atime: 2023-12-29T07:46:09.608Z,
  mtime: 2023-12-29T07:46:09.608Z,
  ctime: 2023-12-29T07:46:09.608Z,
  birthtime: 2023-12-29T07:46:06.060Z
}
```

# 七、相对路径问题
fs 模块对资源进行操作时，路径的写法有两种：
- 相对路径
  - `./座右铭.txt` 当前目录下的座右铭.txt
  - `座右铭.txt` 等效于上面的写法，也是当前目录下的座右铭.txt
  - `../座右铭.txt` 当前目录的上一级目录中的座右铭.txt
- 绝对路径
  - `D:/Program Files windows` 系统下的绝对路径
  - `/usr/bin Linux` 系统下的绝对路径

相对路径中所谓的 **当前目录** ，指的是 **命令行的工作目录** ，而并非是文件的所在目录

例子：
```
total
|-- a
|-- b
    |-- create.js
```
`create.js` 是创建路径为 `"./hello.txt"` 的文件。

在 `a` 目录下打开终端运行 `create.js` 文件，会在 `a` 目录下创建 `hello.txt` 文件，而不是在 `b` 目录下创建 `hello.txt` 文件

# 八、__dirname
`__dirname` 保存着 **当前文件所在目录的绝对路径** ，可以使用 `__dirname` 与文件名拼接成绝对路径

例子：
```js
let data = fs.readFileSync(__dirname + '/data.txt');
console.log(data)
```

**注意**：使用 fs 模块的时候，尽量使用 `__dirname` 将路径转化为绝对路径，可以避免终端路径与文件路径不一致所产生的问题。

# 练习--批量重命名
在类似 “1-hello.txt” 的文件名前面加上一个 “0”
```js
//导入 fs 模块
const fs = require('fs');

//读取 code 文件夹
const files = fs.readdirSync('./code');

//遍历数组
files.forEach(item => {
  //拆分文件名
  let data = item.split('-');
  let [num, name] = data;
  //创建新的文件名
  let newName = num + '-' + name;
  //重命名
  fs.renameSync(`./code/${item}`, `./code/${newName}`);
})
```