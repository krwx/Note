# vue

## 加前缀

- vite.config.js 文件中添加 base 配置

      ```js
      export default defineConfig({
        base: process.env.NODE_ENV === 'production' ? "/test/" : '/',
        plugins: [vue()],
      })
      ```

- 在 Vue Router 设置中添加 base 路径：

      ```js
      // src/router/index.js
      import { createRouter, createWebHistory } from 'vue-router'

      const router = createRouter({
        history: createWebHistory('/test/'), // 添加基础路径
        routes: [
          // 你的路由配置
        ]
      })
      ```

## 根据当前环境使用对应的环境变量

在 .env.development 和 .env.production 文件设置环境变量

使用 `import.meta.env.` 导入变量

变量名一定要以 `VITE_` 开头

## 实现一个 loading 的组件

vue 没有单独的 loading 的组件，都是全局或者区域覆盖 loading

实现：可以用 icon，使用 Loading icon，然后给 icon 添加 is-loading class，那么组件会自动旋转

[官网](https://cn.element-plus.org/zh-CN/component/icon#%E7%BB%93%E5%90%88-el-icon-%E4%BD%BF%E7%94%A8)
