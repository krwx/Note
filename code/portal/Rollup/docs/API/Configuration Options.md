# Configuration Options

- [Configuration Options](#configuration-options)
  - [output.format](#outputformat)
  - [output.chunkFileNames](#outputchunkfilenames)
  - [output.entryFileNames](#outputentryfilenames)
  - [output.assetFileNames](#outputassetfilenames)
  - [output.manualChunks](#outputmanualchunks)
  - [output.preserveModules](#outputpreservemodules)
  - [output.preserveModulesRoot](#outputpreservemodulesroot)

## output.format

类型：string  
CLI：`-f/--format <formatspecifier>`  
默认："es"  

该选项用于指定生成的 `bundle` 的格式。满足以下其中之一：

- `amd` – 异步模块加载，适用于 RequireJS 等模块加载器
- `cjs` – CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
- `es` – 将 bundle 保留为 ES 模块文件，适用于其他打包工具，以及支持 `<script type=module>` 标签的浏览器。（别名：esm，module）
- `iife` – 自执行函数，适用于 `<script>` 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。iife 表示“自执行 函数表达式”
- `umd` – 通用模块定义规范，同时支持 amd，cjs 和 iife
- `system` – SystemJS 模块加载器的原生格式（别名：systemjs）

```js
export default {
	output: {
        format: 'es' // or 'cjs'
	}
};
```

## output.chunkFileNames

类型：`string | ((chunkInfo: PreRenderedChunk) => string)`  
CLI：`--chunkFileNames <pattern>`  
默认：`"[name]-[hash].js"`

该选项用于**对代码分割中产生的 chunk 自定义命名**，其值也可以是一个函数，对每个 chunk 调用以返回匹配模式。这种模式支持以下的占位符：

- `[format]`：输出（output）选项中定义的格式（format），例如 es 或 cjs。
- `[hash]`：仅基于最终生成的 chunk 内容的哈希值，其中包括 renderChunk 中的转换部分和其依赖文件哈希值。你也可以通过例如 [hash:10] 设置一个特定的哈希值长度。默认情况下，它会生成一个 base-64 的哈希值。如果你需要减少字符集的大小，可以查看 `output.hashCharacters`。
- `[name]`：chunk 的名称。它可以通过 `output.manualChunks` 选项显示的设置，或者通过插件调用 this.emitFile 设置。否则，它将会根据 chunk 的内容确定。

## output.entryFileNames

该选项用于指定 chunks 的入口文件模式，其值也可以是一个函数，对每个入口文件调用以返回匹配模式。它支持与 `output.chunkFileNames` 相同的占位符。

## output.assetFileNames

类型：`string | ((assetInfo: PreRenderedAsset) => string)`  
CLI：`--assetFileNames <pattern>`  
默认：`"assets/[name]-[hash][extname]"`

该选项用于**自定义构建结果中的静态资源名称**，当值为一个函数，对每个资源调用以返回匹配模式。这种模式支持以下的占位符：

- `[extname]`：包含点的静态资源文件扩展名，例如 `.css`。
- `[ext]`：不包含点的文件扩展名，例如 `css`。
- `[hash]`：基于静态资源内容的哈希。也可以通过例如 `[hash:10]` 设置一个特定的哈希值长度。默认情况下，它会生成一个 base-64 的哈希值。如果你需要减少字符集的大小，可以查看 `output.hashCharacters`。
- `[name]`：静态资源的名称，不包含扩展名。

## output.manualChunks

类型：`{ [chunkAlias: string]: string[] } | ((id: string, {getModuleInfo, getModuleIds}) => string | void)`

该选项允许你**创建自定义的公共块**。当值为对象形式时，可用于更简单、更安全的手动分块，为函数形式时，可以实现更强大且可控的行为。

**1、对象形式**：

属性的 `key` 为块的名称。属性的 `value` 代表一个包含所列出的模块及其所有依赖项的块。

```js
export default {
	output: {
        manualChunks: {
        	lodash: ['lodash'],
        }
	}
};
```

上述例子中，即使你只是使用 `import get from 'lodash/get'` 形式引入，`Rollup` 也会将 `lodash` 的所有模块合并到一个自定义 `chunk` 中。

**2、函数形式**：

每个被解析的模块都会经过该函数处理。如果函数返回字符串，那么该模块及其所有依赖将被添加到以返回字符串命名的自定义 `chunk` 中。

例如，以下例子会创建一个命名为 `vendor` 的 `chunk`，它包含所有在 `node_modules` 中的依赖：

```js
export default {
	output: {
        manualChunks(id) {
        	if (id.includes('node_modules')) {
        		return 'vendor';
        	}
        	return null;
        },
	}
};
```

其他例子：

```javascript
export default {
  input: { entry1: "./src/entry1.js", entry2: "./src/entry2.js" },
  output: {
    dir: "./dist",
    format: "es", // 自定义公共 chunk 规则
    manualChunks(id) {
      // 把 node_modules 里的依赖打包到 vendor.js
      if (id.includes("node_modules")) {
        return "vendor";
      }
      // 把 src/common 相关的代码打包到 common.js
      if (id.includes("src/common")) {
        return "common";
      }
    },
  },
};
```

## output.preserveModules

**1、介绍**

`preserveModules` 是 Rollup 的一个输出选项，作用是：**尽量保留源码的模块结构，不把多个模块合并成少量 chunk。**

在 Vite 里一般这样用：

````ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      }
    }
  }
})
````

开启 `preserveModules` 后：

- `src/views/A.vue`
- `src/views/B.vue`
- `src/utils/x.ts`

这类文件编译后会**尽量对应生成独立的 JS 文件**，也就是更接近：

- `dist/views/A.js`
- `dist/views/B.js`
- `dist/utils/x.js`

而不是全部塞进一个 `index.js`。

**2、场景**

`preserveModules` 更适合：

- **库模式打包**
- 希望输出结构接近源码结构
- 想让每个模块独立发布
- 方便按模块调试或按需引用

不太适合什么场景：

- 对于普通前端应用，尤其是 SPA / 微前端子应用：
  - 会生成**大量小文件**
  - 浏览器请求数会增加
  - 可能影响加载性能
  - 对 qiankun 这种运行方式，路径和资源加载更容易出问题

所以它**不是常规应用构建的推荐方案**。

**3、它和 `manualChunks` 的区别**

`manualChunks` 是“**手动分组**”：

- 把一批模块打成一个 chunk
- 比如 `vue` 单独一个、`element-plus` 单独一个、其他第三方进 `vendor`
- 适合控制“大包拆分”
- `manualChunks` 目标是合并

`preserveModules` 是“**尽量一文件一个模块输出**”：

- 不强调合并优化
- 强调保留原始模块结构
- 适合控制“模块颗粒度”。
- `preserveModules` 目标是拆开

> `preserveModules` 不要和 `manualChunks` 一起用，因为它们的目标相反，可能会导致输出结构混乱。

## output.preserveModulesRoot

`preserveModulesRoot` 用来指定“保留目录结构时的根目录”。

比如：

````ts
output: {
  preserveModules: true,
  preserveModulesRoot: 'src',
}
````

如果你的源文件是：

- TransitionTest.vue

输出时会更像：

- `dist/views/TransitionTest.js`

而不是：

- `dist/src/views/TransitionTest.js`

所以它主要是为了让输出路径更干净。
