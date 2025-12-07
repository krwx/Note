# keyof 类型运算符

`keyof` 运算符采用对象类型并生成其键的字符串或数字字面联合。

```js
type Point = { x: number; y: number };
type P = keyof Point;

// 相当于
type P = "x" | "y"
```

如果该类型具有 `string` 或 `number` 索引签名，则 `keyof` 将返回这些类型：

```js
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // type A = number
    

 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // type M = string | number
```

请注意，在这个例子中，M 是 `string | number` - 这是因为 `JavaScript` 对象键总是被强制转换为字符串，所以 `obj[0]` 总是与 `obj["0"]` 相同。
