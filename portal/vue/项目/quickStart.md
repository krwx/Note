# quickStart

- [quickStart](#quickstart)
  - [创建项目](#创建项目)
  - [使用 element-plus](#使用-element-plus)
    - [1. 安装包](#1-安装包)
    - [2. 完整引入](#2-完整引入)
    - [3. 按需导入，通过 vite 实现自动导入（官方推荐）](#3-按需导入通过-vite-实现自动导入官方推荐)

## 创建项目

1. 创建 js 项目

    ```shell
    vue create [项目名字]
    ```

2. **创建 ts 项目**（用这个创建，能集成 vite、ts、pinia、vue-router）  
   使用 create-vue 指令创建项目  
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
