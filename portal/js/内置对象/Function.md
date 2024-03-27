# Function

- [Function](#function)
  - [属性](#属性)
    - [name](#name)

## 属性

### name

`Function` 实例的 `name` 数据属性表示**函数在创建时指定的名称**，或者如果函数是匿名函数，则名称可以是 `anonymous` 或 `''`（空字符串）。

`name` 属性是只读的，不能用赋值运算符修改

```js
function doSomething() {}
doSomething.name; // "doSomething"
```

获取对象的构造函数名称：

```js
function Foo() {} // 或：class Foo {}

const fooInstance = new Foo();
console.log(fooInstance.constructor.name); // "Foo"
```
