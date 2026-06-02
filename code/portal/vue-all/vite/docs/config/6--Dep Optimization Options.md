# 依赖优化选项

- [依赖优化选项](#依赖优化选项)
  - [optimizeDeps.exclude](#optimizedepsexclude)
  - [optimizeDeps.include](#optimizedepsinclude)

## optimizeDeps.exclude

- 类型： `string[]`

在预构建中强制排除的依赖项。

```js
export default defineConfig({
  optimizeDeps: {
    exclude: ['some-big-dep'],
  },
})
```

## optimizeDeps.include

- 类型： `string[]`

默认情况下，不在 `node_modules` 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。

```js
export default defineConfig({
  optimizeDeps: {
    include: ['some-linked-dep'],
  },
})
```
