# Lighthouse 优化

- [Lighthouse 优化](#lighthouse-优化)
  - [vue 优化](#vue-优化)
    - [懒加载组件](#懒加载组件)
    - [图片懒加载](#图片懒加载)
    - [代码优化](#代码优化)
  - [vite 优化](#vite-优化)
    - [代码分割](#代码分割)
      - [rollup output.manualChunks](#rollup-outputmanualchunks)
    - [图片压缩](#图片压缩)
    - [移除 console/debugger](#移除-consoledebugger)
  - [element-plus 优化](#element-plus-优化)
    - [按需引入](#按需引入)
  - [vue-router 优化](#vue-router-优化)
    - [路由懒加载](#路由懒加载)
  - [axios 优化](#axios-优化)
  - [css 优化](#css-优化)
    - [内联关键 css](#内联关键-css)
  - [CLS 优化](#cls-优化)
  - [TBT 优化](#tbt-优化)

可以使用 `rollup-plugin-visualizer` 查看分包详情。[参考](./vite/usage/打包体积分析.md)

## vue 优化

### 懒加载组件

首屏组件里面不用立即需要的组件都用 `defineAsyncComponent` 包装来懒加载

1. `v-if` 里面的组件
2. `dialog` 组件和 `dialog` 里面的组件

参考 [异步组件](./vue/docs/guide/2--深入组件.md#异步组件) 章节。

### 图片懒加载

首屏需要渲染但是不需要立即显示在浏览器窗口的图片使用懒加载。

参考 [图片懒加载](./vue/usage/加载图片_懒加载.md) 章节。

### 代码优化

1、合理使用响应式 API

```vue
<script setup>
import { shallowRef, shallowReactive, markRaw } from 'vue'

// 大型对象使用浅响应式
const largeList = shallowRef([])

// 不需要响应式的对象
const staticConfig = markRaw({
  version: '1.0.0',
  apiUrl: '...'
})

// 组件使用浅引用
const currentComponent = shallowRef(null)
</script>
```

2、计算属性缓存

```vue
<script setup>
import { computed } from 'vue'

// 复杂计算使用 computed 缓存
const filteredList = computed(() => {
  return list.value.filter(item => item.active)
})

// 避免在模板中写复杂逻辑
</script>
```

3、虚拟滚动优化长列表

## vite 优化

### 代码分割

#### rollup output.manualChunks

`output.manualChunks` 选项允许你手动指定如何将代码拆分成多个块（chunks）。通过提供一个函数或对象，你可以定义哪些模块应该被打包到同一个块中。[参考](../Rollup/docs/tutorial/代码分割.md#手动拆分代码)

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    rollupOptions: {
      output: {
        // 手动控制 chunk 分割
        manualChunks(id) {
          // 1. 将 node_modules 中的包单独打包
          if (id.includes('node_modules')) {
            // 单独打包 lodash
            if (id.includes('lodash') || id.includes('lodash-es')) {
              return 'lodash'
            }
            // 单独打包 element-plus 的 table 组件
            if (id.includes('element-plus') && id.includes('table') && !id.includes('date')) {
              return 'element-plus-table'
            }
            // 单独打包常用的大包
            let arr = ['element-plus', '@element-plus/icons-vue', 'wangeditor', 'vue', 'vue-router', 'pinia', 'axios'];
            let result = arr.find(lib => id.includes(lib))
            if (result) {
              return result
            }
            // 将剩余的 node_modules 打包为 vendor
            return 'vendor'
          }
        }
      }
    },
  }
});
```

### 图片压缩

使用 `vite-plugin-image-optimizer` 插件对图片进行压缩优化。

参考 [图片压缩](./vite/usage/压缩图片.md) 章节。

### 移除 console/debugger

参考 [移除 console](./vite/usage/移除%20console.md) 章节。

## element-plus 优化

### 按需引入

参考 [element-plus 按需引入](../vue-all/element%20plus/docs/start_guide.md#按需引入推荐) 章节。

## vue-router 优化

### 路由懒加载

**所有** `route` 的 `component` 都改成懒加载

参考 [路由懒加载](../vue-all/vue-router/docs/guide/进阶/8--路由懒加载.md) 章节。

## axios 优化

1. 首页如果不需要用到 axios 的，就不要引入
2. axios 里面的代码应该只和 axios 有关，其他工具类的代码不要放在一起
3. 首页页面组件如果某个点击事件才需要使用，则在点击事件里面再 import 引入
4. 首页调用了组合式函数，组合式函数有调用 axios 的，在渲染首页也会导入 axios。两种优化方法：
   1. 可以在组合式函数里面用懒加载的方式引入 axios
   2. 或者封装一个组合式函数导出 axios 示例，如下所示：

```ts
// serviceLoader.ts
import type { AxiosInstance } from 'axios';

// 使用全局变量缓存 axios 实例
let cachedService: AxiosInstance | null = null;
// 返回 Promise 以确保只加载一次
let loadingPromise: Promise<AxiosInstance> | null = null;

/**
 * Lazily loads the shared axios service and ensures interceptors register only once.
 */
export const getService = async (): Promise<AxiosInstance> => {
  // 返回缓存实例
  if (cachedService) {
    return cachedService;
  }
  if (!loadingPromise) {
    // './index' 是 axios 创建实例的文件，默认导出 axios 实例
    // 这里加载 axios 实例
    loadingPromise = import('./index').then((module) => {
      cachedService = module.default;
      return cachedService;
    });
  }
  return loadingPromise;
};
```

## css 优化

### 内联关键 css

手动将首屏渲染的关键 css 内联到 html 里面，减少首屏渲染的请求数量。

```html
<html>
  <head>
    <style>
      /* 这里放置关键 css */
    </style>
  </head>
  <body>
    ...
  </body>
</html>
```

## CLS 优化

为图片/视频设置固定尺寸

```html
<template>
  <!-- ❌ 错误 -->
  <img src="/banner.jpg" />
 
  <!-- ✅ 正确 -->
  <img 
    src="/banner.jpg"
    width="1200"
    height="630"
    style="object-fit: cover; width: 100%; height: auto;"
  />
</template>
```

## TBT 优化

Web Worker 处理 heavy 计算

```js
// utils/heavyCalc.worker.ts
self.onmessage = (e) => {
  const result = heavyCalculation(e.data)
  self.postMessage(result)
}
 
// 在组件中使用
const worker = new Worker(new URL('./heavyCalc.worker.ts', import.meta.url))
worker.postMessage(data)
worker.onmessage = (e) => { /* handle result */ }
```
