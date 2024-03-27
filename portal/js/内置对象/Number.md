# Number

- [Number](#number)
  - [方法](#方法)
    - [Number.prototype.toFixed()](#numberprototypetofixed)
      - [为什么 (2.55).toFixed(1) 的输出结果为 2.5 而不是 2.6](#为什么-255tofixed1-的输出结果为-25-而不是-26)
    - [Number.prototype.toString()](#numberprototypetostring)

## 方法

### Number.prototype.toFixed()

`toFixed()` 方法使用定点表示法来格式化一个数值。

`numObj.toFixed(digits)`

参数：

- digits
  - 小数点后数字的个数；介于 0 到 20（包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。

返回值：

- 使用定点表示法表示给定数字的**字符串**（注意是字符串）。

返回一个数值的字符串表现形式，不使用指数记数法，而是在小数点后有 `digits` 位数字。该数值在必要时进行**四舍五入**，另外在必要时会用 0 来填充小数部分，以便小数部分有指定的位数。

```js
var numObj = 12345.6789;

numObj.toFixed(); // 返回 "12346"：进行四舍六入五看情况，不包括小数部分
numObj.toFixed(1); // 返回 "12345.7"：进行四舍六入五看情况
numObj.toFixed(6); // 返回 "12345.678900"：用 0 填充

(1.23e20).toFixed(2); // 返回 "123000000000000000000.00"

(1.23e-10).toFixed(2); // 返回 "0.00"

(2.34).toFixed(1); // 返回 "2.3"

(2.35).toFixed(1); // 返回 '2.4'. Note it rounds up

(2.55).toFixed(1); // 返回 '2.5'. Note it rounds down - see warning above

-(2.34).toFixed(1); // 返回 -2.3（由于操作符优先级，负数不会返回字符串）
(-2.34).toFixed(1); // 返回 "-2.3"（若用括号提高优先级，则返回字符串）
```

#### 为什么 (2.55).toFixed(1) 的输出结果为 2.5 而不是 2.6

TODO: 总结  
[参考](https://zhuanlan.zhihu.com/p/31202697)

(1.55).toFixed(100) = "1.5500000000000000444089209850062616169452667236328125000000000000000000000000000000000000000000000000"

(2.55).toFixed(100) = "2.5499999999999998223643160599749535322189331054687500000000000000000000000000000000000000000000000000"

(3.55).toFixed(100) = "3.5499999999999998223643160599749535322189331054687500000000000000000000000000000000000000000000000000"

### Number.prototype.toString()

`Number` 值的 `toString()` 方法返回表示该数字值的字符串。

语法：

```js
toString()
toString(radix)
```

`radix` ：可选，一个整数，范围在 2 到 36 之间，用于指定表示数字值的基数。默认为 10。

例子：

```js
const x = 6;
console.log(x.toString(2)); // "110"
console.log((254).toString(16)); // "fe"
console.log((-10).toString(2)); // "-1010"
console.log((-0xff).toString(2)); // "-11111111"
```
