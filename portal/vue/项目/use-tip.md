## 组件传递 prop
子组件内通过 `defineProps` 方法定义 `props`。

如果需要在 `script` 中使用 `props`，那么将 `defineProps()` 的返回值赋给一个变量使用。

`template` 直接使用 `{{prop的名称}}` 显示 `prop`