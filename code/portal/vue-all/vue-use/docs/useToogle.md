# useToogle

具有实用函数的**布尔切换器**。

`useToggle` 提供了一种简便的方法来管理布尔值的切换。它返回一个包含当前布尔值和一个切换函数的数组。调用切换函数会将布尔值从 `true` 切换到 `false`，反之亦然。

但是当你传递 `ref` 时， `useToggle` 将只返回一个简单的切换函数：

语法：

```js
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'

// 直接调用
const [value, toggle] = useToggle()

// 传递 ref
const otherValue = ref(false)
const otherToggle = useToggle(otherValue)
```

直接调用的例子：

```vue
<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const [value, toggle] = useToggle()
</script>

<template>
  <div>
    <p>Value: {{ value ? 'ON' : 'OFF' }}</p>
    <button @click="toggle()">
      Toggle
    </button>
    <button @click="value = true">
      Set ON
    </button>
    <button @click="value = false">
      Set OFF
    </button>
  </div>
</template>
```

传递 ref 的例子：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'

const isVisible = ref(false)
const toggleVisibility = useToggle(isVisible)
</script>
<template>
  <div>
    <p>Is Visible: {{ isVisible ? 'Yes' : 'No' }}</p>
    <button @click="toggleVisibility()">
      Toggle Visibility
    </button>
  </div>
</template>
```

注意：请注意，切换函数接受第一个参数作为覆盖值。为**避免传入事件对象**，不要直接将切换函数传递给模板中的事件处理程序。相反，使用一个内联箭头函数或方法调用。

```vue
<template>
  <!-- caution: $event will be pass in -->
  <button @click="toggle">Toggle</button>

  <!-- recommended to do this -->
  <button @click="toggle()">Toggle</button>
</template>
```
