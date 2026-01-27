# 共享选项

- [共享选项](#共享选项)
  - [resolve.alias](#resolvealias)
  - [oxc](#oxc)
  - [esbuild](#esbuild)

## resolve.alias

在 `vite.config.js` 中配置路径别名，可以简化导入路径。

类型：`Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>`

将会被传递到 `@rollup/plugin-alias` 作为 `entries` 的选项。也可以是一个对象，或一个 `{ find, replacement, customResolver }` 的数组。

当使用文件系统路径的别名时，请始终使用**绝对路径**。相对路径的别名值会原封不动地被使用，因此无法被正常解析。

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 给 src 设置 '@' 别名
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

## oxc

类型： `OxcOptions | false`

最常见的用例是自定义 JSX：

```js
export default defineConfig({
  oxc: {
    jsx: {
      runtime: 'classic',
      pragma: 'h',
      pragmaFrag: 'Fragment',
    },
  },
})
```

默认情况下，Oxc转换 会被应用在 `ts、jsx、tsx` 文件。你可以通过 `oxc.include` 和 `oxc.exclude` 对要处理的文件类型进行配置。

设置为 `false` 来禁用 Oxc 转换。

## esbuild

v8 已弃用

此选项在内部被转换为 oxc 选项。请使用 oxc 选项代替。
