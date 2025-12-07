# 定义 Store

- [定义 Store](#定义-store)
  - [Option Store（选项式写法）](#option-store选项式写法)
  - [Setup Store（组合式写法）](#setup-store组合式写法)
  - [使用 Store](#使用-store)
  - [从 Store 解构](#从-store-解构)

用 `defineStore()` 定义 Store ，它的第一个参数要求是一个**独一无二的**名字

这个**名字** ，也被用作 _id_ ，是必须传入的， Pinia 将用它来连接 store 和 devtools。为了养成习惯性的用法，将返回的函数命名为 _use..._ 是一个符合组合式函数风格的约定。

`defineStore()` 的第二个参数可接受两类值：Setup 函数或 Option 对象。

```js
import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

## Option Store（选项式写法）

与 Vue 的选项式 API 类似，我们也可以传入一个带有 `state`、`actions` 与 `getters` 属性的 Option 对象

```js {2-10}
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

你可以认为 `state` 是 store 的数据 (`data`)，`getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。

## Setup Store（组合式写法）

使用组合式写法，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

于上面选项式写法一样的例子：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

在 _Setup Store_ 中：

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

注意，要让 pinia 正确识别 `state`，你**必须**在 setup store 中返回 **`state` 的所有属性**。

Setup store 也可以依赖于全局**提供**的属性，比如路由。任何[应用层面提供](https://vuejs.org/api/application.html#app-provide)的属性都可以在 store 中使用 `inject()` 访问，就像在组件中一样：

```ts
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // 这里假定 `app.provide('appProvided', 'value')` 已经调用过
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
```

> 不要返回像 `route` 或 `appProvided` (上例中)之类的属性，因为它们不属于 store，而且你可以在组件中直接用 `useRoute()` 和 `inject('appProvided')` 访问。

选项式和组合式的取舍：推荐使用组合式写法，能够使用更多的组合式函数

## 使用 Store

你可以在一个文件定义任意多的 store，但为了让使用 pinia 的益处最大化(比如允许构建工具自动进行代码分割以及 TypeScript 推断)，**你应该在不同的文件中去定义 store**。

一旦 store 被实例化，你可以直接访问在 store 的 `state`、`getters` 和 `actions` 中定义的任何属性。

store 是一个用 `reactive` 包装的对象，所以你可以直接访问它的属性，而不需要使用 `.value`。

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'

const store = useCounterStore()

// 访问 store 的 state
const count = store.count

// 访问 store 的 getter
const doubleValue = store.doubleCount

// 访问 store 的 action
store.increment()
</script>
```

## 从 Store 解构

- 解构属性
  - 不能直接解构，这样会失去其响应性。需要使用 `storeToRefs()` 进行解构，它将为每一个响应式属性创建引用。
- 解构 action
  - 可以直接从 store 中解构 action

```vue
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()

// 解构属性
const { name, doubleCount } = storeToRefs(store)

// 名为 increment 的 action 可以被解构
const { increment } = store
</script>
```
