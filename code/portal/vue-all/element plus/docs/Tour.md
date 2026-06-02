# Tour 漫游式引导

- [Tour 漫游式引导](#tour-漫游式引导)
  - [基本使用](#基本使用)

用于分步引导用户了解产品功能的气泡组件。 用来引导用户并介绍产品

## 基本使用

**使用步骤**：

1. 在需要引导的元素上使用 `ref` 获取元素实例
2. 使用 `el-tour` 组件包裹 `el-tour-step`，并通过 `v-model` 控制引导的显示与隐藏
3. 在 `el-tour-step` 中设置 `target` 指向对应的元素实例（第一步通过 `ref` 获取的实例，设置的值为 `ref?.$el`），并设置 `title` 和 `description` 来描述引导内容
4. 可以通过在 `el-tour-step` 中添加自定义内容来丰富引导信息，例如图片、文本等

```vue
<template>
  <el-button type="primary" @click="open = true">Begin Tour</el-button>

  <el-divider />

  <el-space>
    <el-button ref="ref1">Upload</el-button>
    <el-button ref="ref2" type="primary">Save</el-button>
    <el-button ref="ref3" :icon="MoreFilled" />
  </el-space>

  <el-tour v-model="open">
    <el-tour-step :target="ref1?.$el" title="Upload File">
      <!-- 自定义内容 -->
      <img
        style="width: 240px"
        src="https://element-plus.org/images/element-plus-logo.svg"
        alt="tour.png"
      />
      <div>Put you files here.</div>
    </el-tour-step>
    <el-tour-step
      :target="ref2?.$el"
      title="Save"
      description="Save your changes"
    />
    <el-tour-step
      :target="ref3?.$el"
      title="Other Actions"
      description="Click to see other"
    />
  </el-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'

import type { ButtonInstance } from 'element-plus'

const ref1 = ref<ButtonInstance>()
const ref2 = ref<ButtonInstance>()
const ref3 = ref<ButtonInstance>()

const open = ref(false)
</script>
```
