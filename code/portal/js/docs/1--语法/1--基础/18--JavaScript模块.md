# javaScript 模块

- [javaScript 模块](#javascript-模块)
  - [介绍](#介绍)
  - [导出导入](#导出导入)
    - [import 的特点](#import-的特点)
    - [1. 命名导出](#1-命名导出)
    - [2. 导入命名导出](#2-导入命名导出)
    - [3. 默认导出](#3-默认导出)
    - [4. 导入默认导出](#4-导入默认导出)
    - [5. 复合使用（重新导出、re-export）](#5-复合使用重新导出re-export)
    - [6. 动态导入](#6-动态导入)

## 介绍

JavaScript 模块是指将代码分割成独立的文件，每个文件都是一个模块。模块可以导出自己的功能，也可以导入其他模块的功能，从而实现代码的复用和组织。

## 导出导入

### import 的特点

**1、只读属性**

```js
import {a} from "./xxx.js"
a = {}; // error
 
import {a} from "./xxx.js"
a.foo = "hello"; // a = { foo : 'hello' }
```

**2、单例模式**

多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。

```js
import { a } "./xxx.js";
import { a } "./xxx.js";
// 相当于 import { a } "./xxx.js";
 
import { a } from "./xxx.js";
import { b } from "./xxx.js";
// 相当于 import { a, b } from "./xxx.js";
```

### 1. 命名导出

一个模块可以有多个命名导出。

```js
// 📁 utils.js
export const PI = 3.14159;

export function add(a, b) { return a + b; }

export class Circle {
  constructor(radius) { this.radius = radius; }
  area() { return PI * this.radius ** 2; }
}
```

使用 `as` 重命名导出

```js
export { PI as pi, add as sum, Circle as Shape };

let myName = "Tom";
export { myName as exportName }
```

### 2. 导入命名导出

导入时必须使用命名导出相同的名称。

```js
// 导入单个命名成员
import { PI, add } from './utils.js';
```

使用 `as` 重命名导入：

```js
// 重命名
import { add as sum } from './utils.js';
console.log(sum(2, 3));
```

使用 `import * as` 导入所有成员时，通过调用模块对象的属性（命名成员名称）来访问：

```js
import * as Utils from './utils.js';

console.log(Utils.PI);
Utils.add(2, 3);
```

### 3. 默认导出

每个模块**只能有一个默认导出**。

```js
// 📁 logger.js
export default function log(message) {
  console.log(`[LOG]: ${message}`);
}
```

也可以将**默认导出**与**命名导出**混合使用：

```js
export default function main() { /* ... */ }
export const version = '1.0.0';
```

本质：`export default` 其实是导出一个名为 `default` 的命名导出

### 4. 导入默认导出

导入时可以为该导出任意命名。

`import x from './mod.js'` 等价于 `import { default as x } from './mod.js'`。

```js
// 这里给默认导出命名为 log
import log from './logger.js';
log('Hello');
```

同时导入默认和命名导出。默认导出必须放在花括号之前。

```js
import main, { version } from './module.js';
```

使用 `import * as` 导入所有成员时，使用对象的 `default` 属性访问默认导出：

```js
import * as Module from './module.js';
Module.default(); // 调用默认导出
```

### 5. 复合使用（重新导出、re-export）

`export` 和 `import` 可以在同一行中复合使用。直接导出另一个模块的成员，不需要先导入到当前模块，相当于**转发**。

```js
// 使用这种方式，该模块不会导入 foo 与 bar
export { foo, bar } from "methods";
 
// 约等于下面两段语句
import { foo, bar } from "methods";
export { foo, bar };
```

导出所有成员：

```js
export * from "methods";
```

使用 `as` 改名：

```js
// 1. 普通改名
export { foo as bar } from "methods";
// 相当于
import { foo } from "methods";
export { foo as bar };

// 2. 将 foo 转导成 default
export { foo as default } from "methods";
// 相当于
import { foo } from "methods";
export default foo;

// 3. 将 default 转导成 foo
export { default as foo } from "methods";
// 相当于
import { default as foo } from "methods";
export { foo };
```

具体使用例子：

```js
// 📁 methods.js
export default function greet() { console.log("Hello"); }

// 📁 index.js
export { default as foo } from "./methods.js";

// 📁 app.js
import { foo } from "./index.js";
foo(); // 输出 "Hello"
```

### 6. 动态导入

动态导入使用 `import()` 函数，返回一个 Promise，可以在运行时按需加载模块。

```js
// 使用 then()
import('./module.js')
  .then(module => {
    module.default(); // 调用默认导出
  })
  .catch(err => {
    console.error('加载模块失败', err);
  });

// 使用 async/await
async function loadModule() {
  try {
    const module = await import('./module.js');
    module.default(); // 调用默认导出
  } catch (err) {
    console.error('加载模块失败', err);
  }
}
```
