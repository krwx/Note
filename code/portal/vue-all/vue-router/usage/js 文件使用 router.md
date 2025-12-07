# js 文件使用 router

- [js 文件使用 router](#js-文件使用-router)
  - [1. **在 `.vue` 文件（组件环境）中使用**](#1-在-vue-文件组件环境中使用)
  - [2. **在普通 JS/TS 文件中的使用方式**](#2-在普通-jsts-文件中的使用方式)
    - [✅ 方法 1：**直接导入路由实例**](#-方法-1直接导入路由实例)
    - [✅ 方法 2：**传递路由实例作为参数**](#-方法-2传递路由实例作为参数)
  - [3. **为什么普通 JS 文件不能直接使用 `useRouter()`？**](#3-为什么普通-js-文件不能直接使用-userouter)
  - [4. **特殊情况：在 Vue Router 导航守卫中使用**](#4-特殊情况在-vue-router-导航守卫中使用)

在 Vue 3 中，通过 `useRouter()` 获取的路由实例主要设计用于 **Vue 组件环境**（`.vue` 文件），但普通 JavaScript/TypeScript 文件也可以通过其他方式访问路由实例。以下是具体分析：

---

## 1. **在 `.vue` 文件（组件环境）中使用**

直接在组件的 `<script setup>` 或 `setup()` 函数中调用：

```vue
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

// 使用路由
router.push('/home');
</script>
```

---

## 2. **在普通 JS/TS 文件中的使用方式**

普通 JS/TS 文件 **不能直接使用 `useRouter()`**，因为它依赖 Vue 的注入上下文（inject API），但可以通过以下替代方案：

### ✅ 方法 1：**直接导入路由实例**

在创建路由的文件（如 `router/index.js`）中导出实例：

```js
// router/index.js
import { createRouter } from 'vue-router';

const router = createRouter({ ... });

export default router; // 导出实例
```

在普通 JS 文件中导入使用：

```js
// utils/auth.js
import router from '@/router'; // 导入路由实例

export function logout() {
  // 使用路由方法
  router.push('/login');
}
```

### ✅ 方法 2：**传递路由实例作为参数**

将路由实例作为参数传入普通函数：

```js
// utils/helper.js
export function navigateToHome(router) {
  router.push('/home');
}
```

在 Vue 组件中调用：

```vue
<script setup>
import { useRouter } from 'vue-router';
import { navigateToHome } from '@/utils/helper';

const router = useRouter();
navigateToHome(router); // 传入路由实例
</script>
```

---

## 3. **为什么普通 JS 文件不能直接使用 `useRouter()`？**

- `useRouter()` 是 Vue 的组合式 API，依赖 **Vue 的依赖注入系统**（在组件实例上下文中生效）。
- 普通 JS 文件没有 Vue 的运行时上下文，调用 `useRouter()` 会抛出类似以下错误：

  ```txt
  Error: inject() can only be used inside setup() or functional components.
  ```

---

## 4. **特殊情况：在 Vue Router 导航守卫中使用**

在路由守卫（定义在路由配置中）可以直接使用路由实例：

```js
// router/index.js
router.beforeEach((to, from, next) => {
  // 这里可直接使用 router 实例
  if (router.currentRoute.value.meta.requiresAuth) {
    // 逻辑处理
  }
  next();
});
```
