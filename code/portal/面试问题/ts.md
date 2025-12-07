# ts

- [ts](#ts)
  - [1. ts 的 枚举有什么特点，枚举前加 const 有什么作用（会直接解析名称为对应数值）](#1-ts-的-枚举有什么特点枚举前加-const-有什么作用会直接解析名称为对应数值)
  - [2. ts 有什么特点](#2-ts-有什么特点)
  - [3. webpack 怎么解析 ts](#3-webpack-怎么解析-ts)

## 1. ts 的 枚举有什么特点，枚举前加 const 有什么作用（会直接解析名称为对应数值）

枚举允许开发者定义一组命名常量。使用枚举可以更轻松地记录意图，或创建一组不同的案例

```js
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

枚举前加 const 有什么作用是声明了常量枚举。

常量枚举只能使用常量枚举表达式，并且与常规枚举不同，它们**在编译期间会被完全删除**。

```js
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
 
let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
```

在生成的代码中会变成

```js
"use strict";
let directions = [
    0 /* Direction.Up */,
    1 /* Direction.Down */,
    2 /* Direction.Left */,
    3 /* Direction.Right */,
];
```

## 2. ts 有什么特点

静态类型，声明时确定类型，之后不允许修改；

编译运行，始终先编译成JavaScript再运行；

强类型，一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了

1. 静态类型检查
2. 面向对象特性。TS新增了类、接口、泛形等等这些特性。代码更加规范，更易于阅读和扩展
3. 模块化
    1. 利用TS中的关键词module，可以达到类似于命名空间的效果，而export可以控制是否被外部空间所访问到。且声明的module可以嵌套，访问时使用.作为分割符。

## 3. webpack 怎么解析 ts

首先，执行以下命令安装 `TypeScript` 编译器和 `loader`：

```shell
npm install --save-dev typescript ts-loader
```

添加 tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

配置 webpack 处理 TypeScript

webpack.config.js：

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

上面的配置将会指定 `./src/index.ts` 为入口文件，并通过 `ts-loader` 加载所有 `.ts` 和 `.tsx` 文件，并在当前目录 输出 一个 `bundle.js` 文件。
