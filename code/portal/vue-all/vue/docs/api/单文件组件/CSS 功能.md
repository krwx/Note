# 单文件组件 CSS 功能

- [单文件组件 CSS 功能](#单文件组件-css-功能)
  - [组件作用域 CSS](#组件作用域-css)
    - [子组件的根元素​](#子组件的根元素)
    - [深度选择器​](#深度选择器)
    - [插槽选择器](#插槽选择器)
    - [全局选择器](#全局选择器)
    - [作用域样式须知](#作用域样式须知)
  - [CSS Modules](#css-modules)
    - [自定义注入名称](#自定义注入名称)
    - [与组合式 API 一同使用](#与组合式-api-一同使用)
  - [CSS 中的 v-bind()](#css-中的-v-bind)

## 组件作用域 CSS

当 `<style>` 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素。它的实现方式是通过 `PostCSS` 将以下内容：

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

转换为：

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### 子组件的根元素​

使用 `scoped` 后，父组件的样式将不会渗透到子组件中。

但是，子组件的根节点会同时被 **父组件的作用域样式** 和 **子组件的作用域样式** 影响。

```vue
<!-- Parent.vue -->
<template>
  <div>
    Parent
    <Child />
  </div>
</template>
<style scoped>
div {
  background: #ecf5ff;
}
</style>
```

```vue
<!-- Child.vue -->
<template>
  <!-- 子组件的根 div 会有父组件的 div 样式-->
  <div>
    Child
    <!-- 子组件的内部 div 不会有父组件的 div 样式 -->
    <div>inner text</div>
  </div>
</template>
<style scoped>
/* 这个样式只会影响 Child 组件内部的元素 */
</style>
```

### 深度选择器​

处于 `scoped` 样式中的选择器如果想要影响到子组件，可以使用 `:deep()` 这个伪类：

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

上面的代码会被编译成：

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

### 插槽选择器

默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

使用 `:slotted` 伪类以明确地将插槽内容作为选择器的目标：

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 全局选择器

如果想让其中一个样式规则应用到全局，可以使用 `:global` 伪类来实现 (看下面的代码)：

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

也可以另外创建一个 `<style>` 来实现全局样式。同时还可以写局部样式：

```vue
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>
```

### 作用域样式须知

- **小心递归组件中的后代选择器！** 对于一个使用了 `.a .b` 选择器的样式规则来说，如果匹配到 `.a` 的元素包含了一个递归的子组件，那么所有的在那个子组件中的 `.b` 都会匹配到这条样式规则。（不懂）

## CSS Modules

一个 `<style module>` 标签会被编译为 `CSS Modules` 并且将生成的 CSS class 作为 `$style` 对象暴露给组件：

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

得出的 class 将被哈希化以避免冲突

### 自定义注入名称

你可以通过给 `module` attribute 一个值来自定义注入 class 对象的属性名：

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### 与组合式 API 一同使用

可以通过 `useCssModule` API 在 `setup()` 和 `<script setup>` 中访问注入的 class。

对于使用了自定义注入名称的 `<style module>` 块，`useCssModule` 接收一个匹配的 `module` attribute 值作为第一个参数：

```js
import { useCssModule } from 'vue'

// 在 setup() 作用域中...
// 默认情况下，返回 <style module> 的 class
useCssModule()

// 具名情况下，返回 <style module="classes"> 的 class
useCssModule('classes')
```

示例

```vue
<script setup lang="ts">
import { useCssModule } from 'vue'

const classes = useCssModule()
</script>

<template>
  <p :class="classes.red">red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

## CSS 中的 v-bind()

单文件组件的 `<style>` 标签支持使用 `v-bind` CSS 函数将 CSS 的值链接到动态的组件状态

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```
