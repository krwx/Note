# useStorage

`useStorage` 是一个 Vue 组合式函数，用于在 Vue 组件中方便地使用浏览器的本地存储（localStorage 或 sessionStorage）。

`useStorage` 的核心是创建一个响应式引用（Ref）。当你修改这个Ref的值时，修改会自动、双向地同步到对应的 localStorage 中；反之，如果 localStorage 的值被其他方式（如另一个浏览器标签页）改变，这个Ref的值也会自动更新

语法：

```js
const state = useStorage(key, defaultValue, storage?, options?)
```

| 参数 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `key` | 存储的唯一键名，字符串类型。 | (必填) |
| `defaultValue` | 初始值，可以是 `ref`、函数、对象或原始值。 | (必填) |
| `storage` | 存储对象，如 `localStorage` (默认) 或 `sessionStorage`。 | `localStorage` |
| `options` | 配置选项，用于控制序列化、合并默认值等行为。 | `undefined` |

例如，存储一个对象非常简单：

```javascript
import { useStorage } from '@vueuse/core';

// 响应式地存储一个对象到 localStorage
const userSettings = useStorage('user-settings', { theme: 'light', volume: 80 });
// 修改会立即同步
userSettings.value.theme = 'dark';
```

`useLocalStorage` 通过 `options` 参数提供了强大的自定义能力。

- `serializer`
  - 该参数用于自定义序列化
  - 不填这个参数默认会根据初始值的数据类型，自动选择合适的序列化方法。
- `mergeDefaults`
  - 默认情况下，若存储已有数据，会直接使用它并忽略默认值。
  - 开启 `mergeDefaults: true` 后，会将默认值与存储值进行**浅合并**。
  - 你也可以传入一个自定义函数进行深度合并。
- `listenToStorageChanges`
  - 此选项默认为 `true`，确保数据在不同标签页间能自动同步。

合并默认值：

```js
localStorage.setItem('my-store', '{"hello": "nihao"}')

const state = useStorage(
  'my-store',
  { hello: 'hi', greeting: 'hello' },
  localStorage,
  { mergeDefaults: true } // <--
)

console.log(state.value.hello) // 'nihao', from storage
console.log(state.value.greeting) // 'hello', from merged default value
```

自定义序列化：

```js
import { useStorage } from '@vueuse/core'

useStorage(
  'key',
  {},
  undefined,
  {
    serializer: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
  },
)
```

## useLocalStorage

语法：`const state = useLocalStorage(key, defaultValue, options?)`

## useSessionStorage

语法：`const state = useSessionStorage(key, defaultValue, options?)`
