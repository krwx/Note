# 设置表格展开行中的 tab 组件的默认 tab

思路：

1. 声明一个 `activeTabMap` 保存每行展开后的 `tab` 组件的 `active tab` 的 `name`，key 是行的 `id`
2. 在 table 的 `expand-change` 事件中，设置 `activeTabMap` 中对应行的 `name` 的值为默认 tab 的 `name`
3. 每行的 `tab` 组件的 `v-model` 都绑定到 `activeTabMap` 中对应行的 `name` 上
4. 在展开行的 `tab` 组件上监听 `tab-change` 事件，更新 `activeTabMap` 中对应行的 `name` 的值
5. 组件卸载时清理 `activeTabMap`，避免内存泄漏

```vue
<template>
  <el-table :data="tableData" style="width: 100%" @expand-change="handleExpandChange">
    <el-table-column type="expand">
      <template #default="{ row }">
        <el-tabs v-model="activeTabMap[row.id]" @tab-change="handleTabChange(row.id, $event)">
          <el-tab-pane label="Tab 1" name="tab1">Content of Tab 1</el-tab-pane>
          <el-tab-pane label="Tab 2" name="tab2">Content of Tab 2</el-tab-pane>
          <el-tab-pane label="Tab 3" name="tab3">Content of Tab 3</el-tab-pane>
        </el-tabs>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="Name"></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, onUnmounted } from 'vue'

const tableData = reactive([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])

onUnmounted(() => {
  // 组件卸载时清理 activeTabMap，避免内存泄漏
  activeTabMap = reactive<Record<number, string>>({})
})

const activeTabMap = reactive<Record<number, string>>({})

const handleExpandChange = (row: any) => {
  activeTabMap[row.id] = 'tab1';
}

function handleTabChange(rowId: number, tabName: string) {
  activeTabMap[rowId] = tabName
}

</script>
```
