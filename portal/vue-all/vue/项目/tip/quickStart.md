# quickStart

- [quickStart](#quickstart)
  - [创建项目](#创建项目)
  - [使用 element-plus](#使用-element-plus)
    - [1. 安装包](#1-安装包)
    - [2. 完整引入](#2-完整引入)
    - [3. 按需导入，通过 vite 实现自动导入（官方推荐）](#3-按需导入通过-vite-实现自动导入官方推荐)
  - [使用 vue-router](#使用-vue-router)
    - [1. 安装包](#1-安装包-1)
    - [2. 初始化 router](#2-初始化-router)
    - [3. App.vue 显示路由输出结果](#3-appvue-显示路由输出结果)
    - [4. 使用 router 插件](#4-使用-router-插件)
  - [使用 vue-i18n](#使用-vue-i18n)
    - [1. 安装包](#1-安装包-2)
    - [2. 定义语言包、创建实例](#2-定义语言包创建实例)
    - [3. 注册](#3-注册)
    - [4. 组件使用](#4-组件使用)

## 创建项目

1. 创建 js 项目

    ```shell
    vue create [项目名字]
    ```

2. **创建 ts 项目**（用这个创建，能集成 vite、ts、pinia、vue-router）  
   使用 `create-vue` 指令创建项目  
   [指令参考](https://github.com/vuejs/create-vue)

   ```shell
   npm create vue@latest
   <!-- 然后根据指示输入项目名字，选择 typescript  -->
   ```

最普通的 vue 文件：

```js
<script setup>
import { ref } from 'vue';

const str = ref("123");
</script>

<template>
    {{ str }}
</template>

<style scoped>
</style>
```

## 使用 element-plus

### 1. 安装包

```shell
npm install element-plus --save
```

### 2. 完整引入

```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

### 3. 按需导入，通过 vite 实现自动导入（官方推荐）

首先你需要安装 `unplugin-vue-components` 和 `unplugin-auto-import` 这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 Vite 的配置文件中

```ts
// vite.config.ts
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // 注意是在插件中声明
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

在 `vue` 文件直接使用元素即可，不用在 `script` 导入组件

## 使用 vue-router

### 1. 安装包

```shell
npm install vue-router@4
```

使用 `create-vue` 指令创建项目能初始化 `vue-router`

### 2. 初始化 router

创建 `router` 文件夹，创建 `index.js` 文件

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

### 3. App.vue 显示路由输出结果

`App.vue` 文件引入 `RouterView`

```vue
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView></RouterView>
</template>
```

### 4. 使用 router 插件

`main.js` 文件初始化 `App` 时，使用 `router`

```js
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

## 使用 vue-i18n

`Vue I18` 是 `Vue.js` 的国际化插件，它可以轻松地将一些本地化功能集成到应用程序中。

插件基本思路：

1. 定义语言包：需要几种语言展示，就定义几个语言包。
2. 组合语言包对象：创建对象，对语言包进行组合，对象的 `key` 为语言包引用，值为语言包对象。
3. 创建实例：创建 `vue-i18n` 类的对象，添加 `message` 和 `locale` 属性。
4. 挂载：挂载创建的实例对象。

### 1. 安装包

```sh
npm install vue-i18n@9
```

### 2. 定义语言包、创建实例

新建 `lang` 文件夹，新建 `en.ts` 和 `zh-cn.ts` 文件，在文件里面定义语言。下面为 `zh-cn.ts` 文件的代码：

```ts
// src/langurage/zh.js
// 定义中文语言包对象
export default {
  navigateBar: {
    hotspot: '热点',
    experience: '经验',
    focus: '关注',
    recommend: '推荐'
  },
  tabs: {
    work: '作品',
    private: '私密',
    collect: '收藏',
    like: '喜欢'
  }
}
```

在 `lang` 文件夹新建 `index.ts` 文件，声明组合的语言包。创建实例，并导出

```ts
import en from './en'
import zh from './zh-cn'

// 组合语言包对象
const messages = {
  en,
  zh
}

// 创建实例对象
const i18n = createI18n({
  legacy: false, // 设置为 false，启用 composition API 模式
  messages,
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn' //如果出错，则默认的语言：中文简体
})

export default i18n
```

### 3. 注册

在 `main.ts` 文件注册

```ts
// ...

import i18n from '@/lang/index'

const app = createApp(App)

// 注册对象
app.use(i18n)

app.mount('#app')
```

### 4. 组件使用

```vue
<template>
    <div>{{ $t("tabs.work") }}<div>
</template>
```
