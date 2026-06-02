# 构建选项

- [构建选项](#构建选项)
  - [build.cssCodeSplit](#buildcsscodesplit)
  - [build.minify](#buildminify)
  - [build.rolldownOptions](#buildrolldownoptions)
  - [build.rollupOptions](#buildrollupoptions)
  - [build.sourcemap](#buildsourcemap)

## build.cssCodeSplit

- 类型： `boolean`
- 默认： `true`

启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 会被保留为单独的 CSS chunk，并在对应异步 chunk 被加载时一并获取。

如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。

```js
export default defineConfig({
  build: {
    cssCodeSplit: true,
  }
})
```

## build.minify

- 类型： `boolean | 'oxc' | 'terser' | 'esbuild'`
- 默认： 客户端构建默认为`'oxc'`，SSR构建默认为 false

设置为 false 可以禁用代码压缩。

默认使用 `Oxc Minifier`，它比 terser 快 30~90 倍，但压缩率仅差 0.5~2%。基准测试

当设置为 `'esbuild'` 或 `'terser'` 时，必须分别安装 esbuild 或 Terser。

```sh
npm add -D esbuild
npm add -D terser
```

## build.rolldownOptions

直接自定义底层 Rolldown 包。这与 Rolldown 配置文件导出的选项相同。

更多详情请参阅 [Rolldown 选项文档](https://rolldown.rs/reference/)。

```js
export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20000,
          groups: [
            {
              name: 'vendor',
              test: /node_modules/,
            },
          ],
        },
      },
    }
  }
})
```

## build.rollupOptions

**v8**:

已弃用

此选项是 `build.rolldownOptions` 选项的别名。请使用 `build.rolldownOptions` 选项代替。

**v6**:

直接自定义底层 Rollup 包。这与 Rollup 配置文件导出的选项相同。

更多详情请参阅 [Rollup 选项文档](https://rollupjs.org/configuration-options/)。

```js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        },
      },
    }
  }
})
```

## build.sourcemap

- 类型： `boolean` | `'inline'` | `'hidden'`
- 默认： `false`

构建后是否生成 source map 文件。

如果为 `true`，将会创建一个独立的 source map 文件。如果为 `'inline'`，source map 将作为一个 data URI 附加在输出文件中。`'hidden'` 的工作原理与 `true` 相似，只是 bundle 文件中相应的注释将不被保留。

```js
export default defineConfig({
  build: {
    sourcemap: false,
  }
})
```
