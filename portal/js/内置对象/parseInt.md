# parseInt

`parseInt(string, radix)` 解析一个字符串并返回指定基数的十进制整数，`radix` 是 2-36 之间的整数，表示被解析字符串的基数。

```js
console.log(parseInt('123'));
// 123 (default base-10)

console.log(parseInt('123', 10));
// 123 (explicitly specify base-10)

console.log(parseInt('   123 '));
// 123 (whitespace is ignored)

console.log(parseInt('077'));
// 77 (leading zeros are ignored)

console.log(parseInt('1.9'));
// 1 (decimal part is truncated)

console.log(parseInt('ff', 16));
// 255 (lower-case hexadecimal)

console.log(parseInt('0xFF', 16));
// 255 (upper-case hexadecimal with "0x" prefix)

console.log(parseInt('xyz'));
// NaN (input can't be converted to an integer)
```

`parseInt(string, radix);`

参数

- `string`
  - 要被解析的值。如果参数不是一个字符串，则将其转换为字符串 (使用 ToString抽象操作)。字符串开头的空白符将会被忽略。
- `radix` （可选）
  - 从 2 到 36 的整数，表示**进制的基数**。
  - 例如指定 16 表示被解析值是十六进制数。
  - 如果超出这个范围，将返回 `NaN`。
  - 假如指定 0 或未指定，基数将会根据字符串的值进行推算。
  - 注意，推算的结果不会永远是默认值 `10`！文章后面的描述解释了当参数 `radix` 不传时该函数的具体行为。
  - **字符串中的数字不能大于 `radix` 才能正确返回数字结果值**。
    - 假如基数为 2，那么数字为 0 和 1，不能大于 2
    - 假如基数为 10，那么数字为 0~9，不能大于 10

返回值

- 从给定的字符串中解析出的一个整数。
- 或者 `NaN` ，当 `radix` 小于 2 或大于 36，或 第一个非空格字符不能转换为数字。

## 描述

**`parseInt` 函数将其第一个参数转换为一个字符串，对该字符串进行解析，然后返回一个整数或 `NaN`。**

对于 `radix` 为 10 以上的，英文字母表示大于 9 的数字。例如，对于十六进制数（基数 16），则使用 A 到 F。

如果 `radix` 是 `undefined、0` 或未指定的，J`avaScript` 会假定以下情况：

- 如果输入的 `string` 以 `0x` 或 `0X`（一个 0，后面是小写或大写的 X）开头，那么 `radix` 被假定为 `16`，字符串的其余部分被当做十六进制数去解析。
- 如果输入的 `string` 以 `"0"（0）`开头，`radix` 被假定为 `8`（八进制）或 `10`（十进制）。具体选择哪一个 `radi`x 取决于实现。`ECMAScript 5` 澄清了应该使用 `10` (十进制)，但不是所有的浏览器都支持。因此，在使用 `parseInt` 时，一定要指定一个 `radix`。
- 如果输入的 `string` 以任何其他值开头，`radix` 是 10 (十进制)。

如果第一个字符不能转换为数字，`parseInt` 会返回 `NaN`。

解析规则：

- **如果 `parseInt` 遇到的字符不是指定 `radix` 参数中的数字，它将忽略该字符以及所有后续字符，并返回到该点为止已解析的整数值。`parseInt` 将数字截断为整数值。允许前导和尾随空格。**
- 如果第一个字符不能转换为数字，`parseInt` 会返回 `NaN`。
- 个人理解：`parseInt` 遇到非数字的字符，就会停止解析，返回之前解析的内容。

## 示例

以下例子均返回15:

```js
parseInt("0xF", 16);
parseInt("F", 16);
parseInt("17", 8);
parseInt(021, 8);
parseInt("015", 10);
parseInt(15.99, 10);
parseInt("15,123", 10);
parseInt("FXX123", 16);
parseInt("1111", 2);
parseInt("12", 13);

// 留意下面的例子
parseInt("15 * 3", 10);
parseInt("15e2", 10);
parseInt("15px", 10);
```

以下例子均返回 NaN:

```js
parseInt("Hello", 8); // 根本就不是数值
parseInt("546", 2); // 除了“0、1”外，其他数字都不是有效二进制数字
```
