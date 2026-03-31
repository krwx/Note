# console

`console.table`

```js
const data = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

console.table(data);
```

***

`console.log()`可以接受任何类型的参数，包括字符串、数字、布尔值、对象、数组、函数等。最厉害的是，它支持占位符!

常用的占位符：

- %s - 字符串
- %d or %i - 整数
- %f - 浮点数
- %o - 对象
- %c - CSS 样式

添加样式。可以使用 `%c` 占位符添加 `CSS` 样式，使输出内容更加美观。

```js
console.log('%c This is a styled message', 'color: red; font-size: 20px;');
```
