# TypeScript 工具类型

- [TypeScript 工具类型](#typescript-工具类型)
  - [CSSProperties](#cssproperties)

## CSSProperties

`CSSProperties` 是一个由 Vue 提供的 TypeScript 类型，用于描述**内联样式绑定**（即 `:style` 属性）所接受的对象结构。

**基本用法**

在模板中，你可以像这样绑定一个样式对象：

```vue
<template>
  <div :style="boxStyle">Hello Vue 3</div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'

const boxStyle: CSSProperties = {
  color: 'red',
  fontSize: '20px',      // 注意使用驼峰命名（fontSize）而非连字符（font-size）
  backgroundColor: '#f0f0f0',
  marginTop: '10px'
}
</script>
```
