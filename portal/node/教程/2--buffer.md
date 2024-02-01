# buffer

- [buffer](#buffer)
  - [1. 概念](#1-概念)
  - [2. 特点](#2-特点)
  - [3. 使用](#3-使用)
    - [3-1. 创建 Buffer](#3-1-创建-buffer)
    - [3-2 Buffer 与字符串的转化](#3-2-buffer-与字符串的转化)
    - [3-3 Buffer 的读写](#3-3-buffer-的读写)

## 1. 概念

Buffer 是一个类似于数组的 对象 ，用于表示固定长度的字节序列

Buffer 本质是**一段内存空间**，专门用来处理 **二进制数据** 。

## 2. 特点

1. Buffer 大小固定且无法调整
2. Buffer 性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为 1 字节（byte）(8个比特位)

## 3. 使用

### 3-1. 创建 Buffer

Node.js 中创建 Buffer 的方式主要如下几种：

1. `Buffer.alloc`

   ```js
   //创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
   let buf_1 = Buffer.alloc(10); // 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>
   ```

2. `Buffer.allocUnsafe`

   ```js
   //创建了一个长度为 10 字节的 Buffer，buffer 中可能存在旧的数据, 可能会影响执行结果，所以叫 unsafe
   let buf_2 = Buffer.allocUnsafe(10);
   ```

3. `Buffer.from`
   1. 将字符或数字转换成二进制。

   ```js
   //通过字符串创建 Buffer
   let buf_3 = Buffer.from('hello');
   // 结果为 <Buffer 68 65 6c 6c 6f>

   //通过数组创建 Buffer
   let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
   // 结果为 <Buffer 69 6c 6f 76 65 79 6f 75>
   ```

alloc 与 allocUnsafe 的区别：

1. alloc 会将 buffer 清零，allocUnsafe 不会
2. allocUnsafe 创建 buffer 的速度比 alloc 快
3. allocUnsafe 可能会有旧的数据，使用时要小心

### 3-2 Buffer 与字符串的转化

我们可以借助 `toString` 方法将 `Buffer` 转为字符串

`toString` 默认是按照 `utf-8` 编码方式进行转换的。

```js
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4.toString())
// 结果为 iloveyou
```

### 3-3 Buffer 的读写

Buffer 可以直接通过 [] 的方式对数据进行处理。

```js
//读取
console.log(buf_3[1]);
//修改
buf_3[1] = 97;
//查看字符串结果
console.log(buf_3.toString())
```

注意:

1. 如果修改的数值超过 255 ，则超过 8 位数据会被舍弃

   ```js
    let buf = Buffer.from("hello");
    buf[0] = 361; // 舍弃高位的数字 ：0001 0110 1001 => 0110 1001。361 => 105
    console.log(buf);
   ```

2. 一个 utf-8 的字符 一般 占 3 个字节

   ```js
    let buf = Buffer.from("你好");
    console.log(buf);
    // 结果为 <Buffer e4 bd a0 e5 a5 bd>
   ```
