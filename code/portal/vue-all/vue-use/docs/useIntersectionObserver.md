# useIntersectionObserver

检测目标元素的可见性。观察元素是否进入视口（viewport）或指定父元素的可视区域。

完整 API：

```js
const {
  stop,           // 停止观察函数
  isSupported    // 浏览器是否支持 IntersectionObserver
} = useIntersectionObserver(
  target,         // 要观察的元素（ref）
  callback,       // 回调函数
  options         // 配置选项（可选）
)
```

配置选项：

```js
import { useIntersectionObserver } from '@vueuse/core'

useIntersectionObserver(
  target,
  ([{ isIntersecting, intersectionRatio }]) => {
    // 处理逻辑
  },
  {
    // 根元素，默认为视口
    root: null,
    
    // 根元素的边距，类似 CSS margin
    rootMargin: '0px',
    
    // 阈值（0-1 或数组）
    threshold: 0.1,
    
    // 是否立即触发回调（即使元素不可见）
    immediate: true,
    
    // 初始状态
    initialIsIntersecting: false
  }
)
```

例子：

1、简单使用

```vue
<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { shallowRef, useTemplateRef } from 'vue'

// vue 3.5+ 版本，使用 `useTemplateRef()`
const target = useTemplateRef('target')
// vue 3.4 及以下版本，使用 `ref()`
const target = ref(null)

const targetIsVisible = shallowRef(false)

const { stop } = useIntersectionObserver(
  target,
  ([entry], observerElement) => {
    targetIsVisible.value = entry?.isIntersecting || false
  },
)
</script>

<template>
  <div ref="target">
    <h1>Hello world</h1>
  </div>
</template>
```

2、元素进入视口时执行动画

```vue
<template>
  <div
    ref="animatedElement"
    :class="{ 'animate-in': isVisible }"
  >
    内容
  </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'

const animatedElement = ref(null)
const isVisible = ref(false)

useIntersectionObserver(
  animatedElement,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
      // 可以在这里触发自定义事件
    }
  },
  { threshold: 0.2, rootMargin: '50px' }
)
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
```
