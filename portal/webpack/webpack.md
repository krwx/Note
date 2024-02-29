# webpack

- [webpack](#webpack)
  - [概念](#概念)
    - [`bundle` 通常与构建完成的 `chunk` 为一对一的关系](#bundle-通常与构建完成的-chunk-为一对一的关系)
  - [工作流程](#工作流程)
    - [1. 初始化参数](#1-初始化参数)
    - [2. 开始编译](#2-开始编译)
    - [3. 确定入口](#3-确定入口)
    - [4. 编译模块](#4-编译模块)
    - [5. 完成模块编译](#5-完成模块编译)
    - [6. 输出资源](#6-输出资源)
    - [7. 输出完成](#7-输出完成)
  - [打包文件的整体分析。构建后的 JS 产物怎么处理模块导入和依赖关系](#打包文件的整体分析构建后的-js-产物怎么处理模块导入和依赖关系)
  - [tree-shaking 的原理](#tree-shaking-的原理)

## 概念

- `Module`：webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的
- `Chunk`：编译完成准备输出时，webpack 会将 module 按特定的规则组织成一个一个的 chunk，这些 chunk 某种程度上跟最终输出一一对应
- `Bundle`：由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。

总结：

- 我们开发的时候是 `module`，`webpack` 处理时是 `chunk`，最后生成浏览器可以直接运行的 `bundle`。
- `Chunk` 是过程中的代码块，`Bundle` 是结果的代码块。
- `webpack` 最终生成的是 `bundle` ，中间产物是 `chunk`

### `bundle` 通常与构建完成的 `chunk` 为一对一的关系

`bundle` 通常与 `chunk` 为一对一的关系，如下：

```text
// webpack 配置
module.exports = {
  entry: {
    app: './src/index.js',
  },
  // ...
}

此时生成的最终文件为一个 app.js 文件。那么 app 这个 chunk 和生成的 bundle 是一对一的
```

但是某些情况 `bundle` 与 `chunk` 为多对一的关系，如下：

```text
// a.js
import('./b.js').then(res => {...})

a.js 文件动态导入了 b.js 文件，那么最终生成的 bundle 有 0.bundle.js 和  bundle.js 两个文件。

其中一个文件对应 a.js ，另一个文件对应 b.js
```

## 工作流程

关键的 webpack 事件节点：

- compile 开始编译
- make 从入口点分析模块及其依赖的模块，创建这些模块对象
- build-module 构建模块
- after-compile 完成构建
- seal 封装构建结果
- emit 把各个chunk输出到结果文件
- after-emit 完成输出

### 1. 初始化参数

解析 `webpack` 配置参数，合并 `shell` 传入和 `webpack.config.js` 文件配置的参数，形成最后的配置结果。

### 2. 开始编译

上一步得到的参数初始化 `compiler` 对象，注册所有配置的插件，插件监听 `webpack` 构建生命周期的事件节点，做出相应的反应，执行 `compiler` 对象的 `run` 方法开始执行编译。

> webpack 的实际入口是 Compiler 中的 run 方法，run 一旦执行后，就开始了编译和构建流程
>
> compiler.run 后首先会触发 compile(compilation) ，这一步会构建出 Compilation 对象：
这个对象有两个作用 :
>
> - 一是负责组织整个打包过程，包含了每个构建环节及输出环节所对应的方法，可以从图中看到比较关键的步骤，如 `addEntry() , _addModuleChain() ,buildModule() , seal() , createChunkAssets()` (在每一个节点都会触发 webpack 事件去调用各插件)。
> - 二是该对象内部存放着所有 `module` ，`chunk`，生成的 `asset` 以及用来生成最后打包文件的 `template` 的信息。

### 3. 确定入口

根据配置中的 `entry` 找出所有的入口文件。

可以有多个入口，对应生成多个 `bundle`

> 在创建 module 之前，Compiler 会触发 make，并调用 Compilation.addEntry 方法，通过 options 对象的 entry 字段找到我们的入口js文件。

### 4. 编译模块

从入口文件出发，开始解析文件，找出依赖，递归下去。**递归中**根据文件类型和 `loader` 配置，调用所有配置的 `loader` 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。

### 5. 完成模块编译

递归结束后，得到每个文件结果，包含每个模块以及他们之间的**依赖关系**。

可以生成 `dependency graaph` （依赖图）

> 在所有模块及其依赖模块 `build` 完成后，webpack 会监听 `seal` 事件调用各插件对构建后的结果进行封装，要逐次对每个 `module` 和 `chunk` 进行整理，生成编译后的源码，合并，拆分，生成 hash 。 同时这是我们在开发时进行代码优化和功能添加的关键环节

### 6. 输出资源

根据入口 `entry` 和配置模块之间的依赖关系，组装成一个个包含多个模块的 `chunk` ，再将每个 chunk 转换成一个单独的文件加入输出列表中。

### 7. 输出完成

输出所有的chunk到文件系统。

> 最后一步，`webpack` 调用 `Compiler` 中的 `emitAssets()` ，按照 output 中的配置项将文件输出到了对应的 `path` 中

## 打包文件的整体分析。构建后的 JS 产物怎么处理模块导入和依赖关系

## tree-shaking 的原理
