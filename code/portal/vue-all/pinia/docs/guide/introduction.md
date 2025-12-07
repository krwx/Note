# 介绍

- [介绍](#介绍)
  - [安装](#安装)
  - [Store 是什么？](#store-是什么)
  - [应该在什么时候使用 Store?](#应该在什么时候使用-store)
  - [什么时候不应该使用 Store](#什么时候不应该使用-store)

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。

## 安装

用你喜欢的包管理器安装 `pinia`：

```bash
yarn add pinia
# 或者使用 npm
npm install pinia
```

用 `createPinia()` 创建一个 pinia 实例 (根 store) 并将其传递给应用：

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

## Store 是什么？

Store (如 Pinia) 是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。

换句话说，**它承载着全局状态**。它有点像一个永远存在的组件，每个组件都可以读取和写入它。

它有**三个概念**，[state](./core-concepts/state.md)、[getter](./core-concepts/getters.md) 和 [action](./core-concepts/actions.md)，我们可以假设这些概念相当于组件中的 `data`、 `computed` 和 `methods`。

## 应该在什么时候使用 Store?

一个 Store 应该包含可以在整个应用中访问的数据。这包括在许多地方使用的数据，例如显示在导航栏中的用户信息，以及需要通过页面保存的数据，例如一个非常复杂的多步骤表单。

另一方面，你应该避免在 Store 中引入那些原本可以在组件中保存的本地数据，例如，一个元素在页面中的可见性。

并非所有的应用都需要访问全局状态，但如果你的应用确实需要一个全局状态，那 Pinia 将使你的开发过程更轻松。

## 什么时候不应该使用 Store

有的时候我们会过度使用 store。如果觉得应用程序的 store 过多，你可能需要重新考虑使用 store 的目的。例如其中一些逻辑应该只是组合式函数，或者应该只是组件的本地状态。
