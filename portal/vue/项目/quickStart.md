- [创建项目](#创建项目)

# 创建项目
1. 创建 js 项目
```
vue create [项目名字]
```
2. 创建 ts 项目  
   [指令参考](https://github.com/vuejs/create-vue)
```
npm create vue@latest
<!-- 然后根据指示输入项目名字，选择 typescript  -->
```

普通 vue 文件：
```js
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electron-vue-test'
  }
</script>

<style>
  /* CSS */
</style>

// 分割线

<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <!-- 直接使用ref，自动解包 -->>
  <span>{{ publishedBooksMessage }}</span>
</template>
```
