# useDark

`useDark` 用于在实现暗黑模式的切换和管理。它提供了一个响应式引用（Ref），表示当前的主题状态（暗黑模式或浅色模式）。当修改这个 Ref 的值时，页面的主题会自动切换。

`useDark` 与 `usePreferredDark` 和 `useStorage` 组合。

- 启动时，它从 `localStorage/sessionStorage` 中读取值（默认键：`vueuse-color-scheme`，该键是可配置的）以查看是否有用户配置的配色方案，如果没有，它将使用用户的系统首选项。
- 当你更改 `isDark` 引用时，它将更新相应元素的属性，然后将首选项存储到 `storage` 以进行持久化。
- `storage` 存储的值的规则：
  - 当系统主题为浅色模式时，网页的浅色模式的值为 `auto`，暗黑模式的值为 `dark`
  - 当系统主题为暗黑模式时，网页的浅色模式的值为 `light`，暗黑模式的值为 `auto`

> 当更改 `localStorage/sessionStorage` 的值时，`isDark` 引用也会自动更新。

当 `isDark` 为 true，默认将 `dark` 类应用于 `html` 标签：

```html
<!--light-->
<html>
  ...
</html>

<!--dark-->
<html class="dark">
  ...
</html>
```

> 请注意，`useDark` 仅处理 DOM 属性更改，以便你在 CSS 中应用正确的选择器。它不会为你处理实际的样式、主题或 CSS。

## 自定义应用于 html 的属性

例子：

```js
const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
```

```html
<!--light-->
<html>
  <body color-scheme="light">
    ...
  </body>
</html>

<!--dark-->
<html>
  <body color-scheme="dark">
    ...
  </body>
</html>
```

## 自定义存储 storage 的 key

```js
import { useDark } from '@vueuse/core'

export const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
})
```

## 使用例子

```vue
<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

    <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>
```
