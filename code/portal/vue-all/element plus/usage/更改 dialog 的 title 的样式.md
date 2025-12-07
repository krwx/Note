# 更改 dialog 的 title 的样式

- [更改 dialog 的 title 的样式](#更改-dialog-的-title-的样式)
  - [方法 1：使用 `header-class` 属性（推荐）](#方法-1使用-header-class-属性推荐)
  - [方法 2：使用插槽自定义标题](#方法-2使用插槽自定义标题)

在 Vue3 中使用 Element Plus 的 Dialog 组件时，可以通过以下几种方式修改标题样式：

## 方法 1：使用 `header-class` 属性（推荐）

```vue
<template>
  <el-dialog
    v-model="dialogVisible"
    title="自定义标题"
    :header-class="'custom-header'"
  >
    <!-- 内容 -->
  </el-dialog>
</template>

<style scoped>
/* 深度选择器穿透 */
:deep(.custom-header) {
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  padding: 20px;
  border-radius: 8px 8px 0 0;
}

:deep(.custom-header .el-dialog__title) {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}
</style>
```

## 方法 2：使用插槽自定义标题

```vue
<template>
  <el-dialog v-model="dialogVisible">
    <template #header>
      <div class="custom-header-slot">
        <span class="title">🌈 自定义标题</span>
        <el-tag type="success">New</el-tag>
      </div>
    </template>
    <!-- 内容 -->
  </el-dialog>
</template>

<style>
.custom-header-slot {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #e3f2fd;
  padding: 15px 20px;
  border-bottom: 2px dashed #64b5f6;
}

.custom-header-slot .title {
  font-family: 'Arial Rounded MT Bold', sans-serif;
  color: #1565c0;
  font-size: 1.4rem;
  letter-spacing: 1px;
}
</style>
```
