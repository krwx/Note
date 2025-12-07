# Path 模块

- [Path 模块](#path-模块)
  - [\_\_filename](#__filename)
  - [将相对路径转换为绝对路径](#将相对路径转换为绝对路径)

path 模块提供了 操作路径 的功能，我们将介绍如下几个较为常用的几个 API：

|API| 说明|
|--|--|
|path.resolve| 拼接规范的绝对路径（统一 `\` 或 `/` ） 常用|
|path.join| 将指定的路径段连接成一个路径。|
|path.sep| 获取操作系统的路径分隔符|
|path.parse| 解析路径并返回对象|
|path.basename| 获取路径的基础名称|
|path.dirname| 获取路径的目录名|
|path.extname| 获得路径的扩展名|

例子：

```js
const path = require('path');

//获取路径分隔符
console.log(path.sep); // windows: \ 。 Linux： /

//解析路径
let pathname = 'D:/program file/nodejs/node.exe';
console.log(path.parse(pathname));
/**
 * {
  root: 'D:/', // 盘符
  dir: 'D:/program file/nodejs',  // 文件的目录
  base: 'node.exe', // 文件的基础名称
  ext: '.exe', // 文件的扩展名
  name: 'node' // 文件的名称
}
 */

//获取路径基础名称
console.log(path.basename(pathname)) // node.exe

//获取路径的目录名
console.log(path.dirname(pathname)); // D:/program file/nodejs

//获取路径的扩展名
console.log(path.extname(pathname)) // .exe

// 将指定的路径段连接成一个路径
let x = path.join('Users', 'Refsnes', 'demo_path.js');
console.log(x); // Users\Refsnes\demo_path.js
```

拼接路径例子：

```js
console.log(__dirname); // D:\project\Note\portal\node
console.log(__dirname + "/hello.txt"); // D:\project\Note\portal\node/hello.txt

//拼接绝对路径
console.log(path.resolve(__dirname, './hello.txt')); // D:\project\Note\portal\node\hello.txt
console.log(path.resolve(__dirname, 'hello.txt'));  // 路径同上

// 这里只输出 hello.txt 的路径的原因是 /hello.txt 为绝对路径，resolve 会以最近的绝对路径为基准，将后面的相对路径拼接上去
console.log(path.resolve(__dirname, '/hello.txt')); // D:\hello.txt
console.log(path.resolve(__dirname, "/hello.txt", './123')); // D:\hello.txt\123
```

**`resolve()` 可以接收多个路径参数，但是标准的传参为：第一个参数为绝对路径，后面的参数为相对路径。**

## __filename

__filename 保存的是**当前文件的绝对路径**

## 将相对路径转换为绝对路径

```js
const path = require("path");

const absolutePath = path.resolve(__dirname, relativePath);
```
