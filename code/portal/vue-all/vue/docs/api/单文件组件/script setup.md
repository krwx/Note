# `<script setup>`

- [`<script setup>`](#script-setup)
  - [defineOptions()](#defineoptions)

## defineOptions()

这个宏可以用来直接在 `<script setup>` 中声明组件选项，而不必使用单独的 `<script>` 块：

```vue
<script setup>
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
</script>
```

选项说明：

- `name`：组件名称。
- `customOptions`：自定义选项，可以在组件实例上访问。
- `inheritAttrs`：是否继承父组件的属性。
  - 默认值为 `true` 时，当父组件传递属性给子组件，但子组件没有用 props 声明这些属性时，默认会自动“透传”到子组件的根元素上。
  - 设置为 `false` 后，父组件传递的属性将不会自动添加到子组件的根元素上，而是需要通过 `$attrs` 显式访问和使用。

```vue
<script setup>
defineOptions({
  // 禁用默认的属性继承，这时你需要手动在模板中指定透传属性去向
  inheritAttrs: false
})
</script>

<template>
  <!-- $attrs 包含了所有未被 props 声明的透传属性 -->
  <div class="wrapper" v-bind="$attrs">
    我是一个按钮组件
  </div>
</template>
```
