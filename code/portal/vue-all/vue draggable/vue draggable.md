# vue draggable

- [vue draggable](#vue-draggable)
  - [介绍](#介绍)
  - [安装与使用](#安装与使用)
  - [配置与事件](#配置与事件)
  - [应用](#应用)
    - [拖拽表格行](#拖拽表格行)

## 介绍

`vuedraggablenext`（`vue-draggable-next`）是一个专为 **Vue 3** 生态打造的拖拽排序组件库。底层依赖于功能强大的 **`Sortable.js`** 库，旨在帮助开发者轻松实现流畅的拖拽交互体验。

**核心特性：**

- **Vue 3 原生适配**：完美兼容 Vue 3，特别是 Composition API。内置响应式系统能实现数据层与视图层的自动同步，拖拽后数据模型会自动更新。
- **轻量高性能**：打包后体积小巧，gzip 压缩后仅约 **7KB**，对项目负担极小。
- **移动端友好**：底层 Sortable.js 默认支持触摸事件，因此在手机、平板上也能提供流畅的拖拽体验。
- **功能全面**：支持单列表内排序、不同列表间拖拽、自定义拖拽手柄（handle）等，几乎涵盖了所有拖拽场景。
- **TypeScript 支持**：提供完整的类型定义，有助于提升代码的健壮性和开发效率。

***

**与 SortableJS 的关系：**

`vue-draggable-next` 本质上是 `SortableJS` 的一个 Vue 3 专用"包装器"（wrapper）。它巧妙地将 `SortableJS` 强大的拖拽引擎与 Vue 的响应式系统整合在一起，让开发者只需要操作数据就能实现拖拽，而无需关心底层的 DOM 操作。

## 安装与使用

**1. 安装**

```bash
yarn add vuedraggable@next

npm i -S vuedraggable@next
```

**2. 注册与基础用法**

下面以拖拽列表为例说明如何使用：

1. 在 Vue 组件中引入 `draggable` 组件，
2. 用 `draggable` 包裹需要拖拽的列表元素。
3. 使用 `v-model` 或 `:list` 绑定一个响应式数组，组件会自动处理拖拽逻辑并更新数组顺序。
4. 在 `#item` 插槽中定义每个列表项的渲染方式。

```vue
<template>
  <!-- 通过 v-model 绑定你的数组 -->
  <draggable v-model="myList" item-key="id">
    <!-- #item 插槽用于渲染列表中的每一项 -->
    <template #item="{ element }">
      <div>{{ element.name }}</div>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable' // 或 vue-draggable-next

const myList = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])
</script>
```

## 配置与事件

**配置：**

- **`v-model` / `list`**：
  - 将组件与一个响应式数组双向绑定，拖拽结束后会自动更新数组顺序。官方推荐的现代用法是使用 `v-model`。
  - `v-model` 与 `list` 的效果是一样的，没有区别
  - 不能同时使用 `v-model` 和 `list`，否则会报错
- **`item-key`**：
  - 必填项，用于给每个可拖拽项提供一个唯一标识，以优化 Vue 的渲染性能。
- **`tag`**：
  - 指定 `draggable` 组件渲染成什么 HTML 标签，默认是 `div`。
- **`handle`**：
  - 用于实现拖拽手柄功能，即只有在点击/长按特定元素才能触发拖拽。
  - 传递一个 CSS 选择器字符串，例如 `.drag-handle`，表示只有点击具有 `.drag-handle` 类名的元素时才会触发拖拽。
- **`group`**：
  - 实现跨列表拖拽的核心。给不同列表设置相同的 `group` 名称，即可实现项目在不同列表间的自由移动。
- **`disabled`**：
  - 设置是否禁用拖拽功能。
- **`clone`**：
  - 一个函数，用于定义在跨列表拖拽时，如何克隆被拖拽的对象。
- **`move`**：
  - 一个函数，在拖拽移动过程中被频繁调用，可以在此函数中返回 `false` 来阻止拖拽，实现更精细的控制（如禁止移动特定项）。
- **`ghostClass` / `dragClass` / `selectedClass`**：
  - 分别用于设置拖拽时“占位元素”、“被拖拽元素”和“被选中元素”的 CSS 类名，方便进行样式定制。
  - “占位元素”是指在拖拽过程中，原位置会留下一个占位元素来提示用户当前拖拽项的位置。
- **`forceFallback`**：
  - 是否强制使用 Sortable.js 内部的回退方案来处理拖拽。如果遇到某些拖拽样式问题，可以尝试开启此选项。

***

**事件监听**

`draggable` 组件还提供了多个事件，方便在拖拽操作的不同阶段执行自己的逻辑，例如：

- **`@start` / `@end`**：分别在拖拽开始和结束时触发。
- **`@change`**：当列表顺序发生变化（拖拽完成）时触发，通过参数可以获取详细的变化信息。

## 应用

### 拖拽表格行

思路：

1. 将 `draggable` 组件包裹在 `tbody` 上，并设置 `tag="tbody"`，这样就能让表格行成为可拖拽的元素。
2. 设置 `v-model` 绑定一个响应式数组，数组中的每个对象代表一行数据。
3. 在 `#item` 插槽中定义每行的渲染方式。
4. 可选。设置 `handle` 属性为一个 CSS 选择器，例如 `.drag-handle`，这样只有点击具有 `.drag-handle` 类名的元素时才会触发拖拽，避免用户在点击表格内容时误触拖拽。

```vue
<template>
  <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%">
    <thead>
      <tr>
        <th style="width: 50px">拖动</th>
        <th>ID</th>
        <th>姓名</th>
      </tr>
    </thead>
    <!-- 关键：用 draggable 包裹 tbody，并设置 tag="tbody" -->
    <!-- 这里设置 handle 为 '.drag-handle'，只有点击 class 为 drag-handle 的元素才能触发拖拽 -->
    <draggable
      tag="tbody"
      item-key="id"
      v-model="items"
      handle=".drag-handle"
      ghost-class="dragging-ghost"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <tr>
          <td class="drag-handle" style="cursor: grab; text-align: center">☰</td>
          <td>{{ element.id }}</td>
          <td>{{ element.name }}</td>
        </tr>
      </template>
    </draggable>
  </table>

  <pre style="margin-top: 20px">排序结果：{{ items }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable' // 或 vue-draggable-next

const items = ref([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
])

function onDragEnd(event) {
  console.log('拖拽结束', event)
}
</script>
<style scoped>
/* 拖拽时的半透明样式 */
.dragging-ghost {
  opacity: 0.5;
}
</style>
```
