# State

- [State](#state)
  - [TypeScript](#typescript)
  - [访问 `state`](#访问-state)
  - [重置 state](#重置-state)
  - [变更 state](#变更-state)
  - [订阅 state](#订阅-state)
    - [刷新时机](#刷新时机)
    - [取消订阅](#取消订阅)

## TypeScript

确保启用了 strict，或者至少启用了 noImplicitThis，Pinia 将自动推断您的状态类型！

但是，可以手动给数据设置类型：

```ts
const useStore = defineStore('storeId', {
  state: () => {
    return {
      // 用于初始化空列表
      userList: [] as UserInfo[],
      // 用于尚未加载的数据
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

或者用一个接口定义 state，并添加 `state()` 的返回值的类型。

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

## 访问 `state`

默认情况下，你可以通过 `store` 实例访问 state，直接对其进行读写。

```js
const store = useStore()

store.count++
```

## 重置 state

使用**选项式 API** 时，你可以通过调用 store 的 `$reset()` 方法将 state 重置为初始值。

```js
const store = useStore()
store.$reset()
```

在 `$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态。

在**组合式 API** 中，您需要创建自己的 `$reset()` 方法，然后也是调用 `$reset()` 重置 state：

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})

// 使用
const store = useCounterStore()
store.$reset()
```

## 变更 state

除了用 `store.count++` 直接改变 store，你还可以调用 `$patch` 方法。它允许你用一个 `state` 的补丁对象在同一时间更改多个属性：

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

如果要修改集合类型的数据需要创建一个新的集合来替换它。因此，`$patch` 方法也接受一个函数，在函数里面操作 state 会更改实际的 state。

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.count += 2
})
```

## 订阅 state

可以通过 store 的 `$subscribe()` 方法侦听 state 及其变化。比起普通的 `watch()`，使用 `$subscribe()` 的好处是 _subscriptions_ 在 _patch_ 后只触发一次 (例如，当使用上面的函数版本时)。

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'

  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'

  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 保存到 localStorage
  localStorage.setItem('cart', JSON.stringify(state))
})
```

### 刷新时机

在底层实现上，`$subscribe()` 使用了 Vue 的 `watch()` 函数。你可以传入 `watch()` 相同的参数（例如：deep、flush）。

当你想要在 **每次** state 变化后立即触发订阅时很有用：

```ts{4}
cartStore.$subscribe((mutation, state) => {
  // 每当状态发生变化时，将整个 state 保存到 localStorage
  localStorage.setItem('cart', JSON.stringify(state))
}, { flush: 'sync' })
```

### 取消订阅

默认情况下，_state subscription_ 会被绑定到添加它们的组件上 (如果 store 在组件的 `setup()` 里面)。这意味着，当该组件被卸载时，它们将被自动删除。

如果你想在组件卸载后依旧保留它们，请将 `{ detached: true }` 作为第二个参数：

```vue
<script setup>
const someStore = useSomeStore()
// 此订阅器即便在组件卸载之后仍会被保留
someStore.$subscribe(callback, { detached: true })
</script>
```

如果你想手动取消订阅，可以调用 `$subscribe()` 返回的取消函数：

```ts
const unsubscribe = someStore.$subscribe(callback)
// 取消订阅
unsubscribe()
```
