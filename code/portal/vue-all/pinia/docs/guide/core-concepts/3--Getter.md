# Getter

- [Getter](#getter)
  - [访问其他 getter](#访问其他-getter)
  - [向 getter 传递参数](#向-getter-传递参数)
  - [访问其他 store 的 getter](#访问其他-store-的-getter)
  - [使用 `setup()` 时的用法 %{#usage-with-setup}%](#使用-setup-时的用法-usage-with-setup)

Getter 完全等同于 store 的 state 的计算值(`computed`)。

可以通过 `defineStore()` 中的 `getters` 属性来定义它们。**推荐**使用箭头函数，并且它将接收 `state` 作为第一个参数：

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

直接访问 store 实例上的 getter ：

```vue
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

## 访问其他 getter

与计算属性一样，你也可以组合多个 getter。通过 `this`，你可以访问到其他任何 getter。在这种情况下，**你需要为这个 getter 指定一个返回值的类型**。

```ts [counterStore.ts]
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
  },
})
```

## 向 getter 传递参数

_Getter_ 只是幕后的**计算**属性，所以不可以向它们传递任何参数。不过，你可以在 _getter_ 返回一个函数，该函数可以接受任意参数，然后返回经过处理的数据：

```js
export const useUserListStore = defineStore('userList', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

并在组件中使用：

```vue
<script setup>
import { useUserListStore } from './store'
const userList = useUserListStore()

// 直接使用
console.log(userList.getUserById(2))

// 解构使用
const { getUserById } = storeToRefs(userList)
console.log(getUserById.value.getUserById(2))
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

## 访问其他 store 的 getter

想要使用另一个 store 的 getter 的话，那就直接在 _getter_ 内使用就好：

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## 使用 `setup()` 时的用法 %{#usage-with-setup}%

作为 store 的一个属性，你可以直接访问任何 getter(与 state 属性完全一样)：

```vue
<script setup>
const store = useCounterStore()
store.count = 3
store.doubleCount // 6
</script>
```
