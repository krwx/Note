# typeof 类型运算符

JavaScript 已经有一个可以在表达式上下文中使用的 typeof 运算符：

```js
// Prints "string"
console.log(typeof "Hello world");
```

TypeScript 添加了一个 typeof 运算符，你可以在类型上下文中使用它来引用变量或属性的类型：

```js
let s = "hello";
let n: typeof s; // 相当于： let n: string
```

这对于基本类型不是很有用，但结合其他类型运算符，你可以使用 `typeof` 方便地表达许多模式。例如，让我们从查看**预定义类型** `ReturnType<T>` 开始。它接受一个函数类型并产生它的返回类型：

```js
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // 相当于：type K = boolean

// 函数返回什么类型的数据，K 就是什么类型的数据
```

如果我们尝试在函数名上使用 `ReturnType`，我们会看到一个指导性错误：

```js
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```

请记住，值和类型不是一回事。要引用值 f 所具有的类型，我们使用 `typeof`：

```js
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
    
/* 
相当于
type P = {
    x: number;
    y: number;
}
*/
```
