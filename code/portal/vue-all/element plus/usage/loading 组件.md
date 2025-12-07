# loading 组件

element-plus 没有提供一个 loading 组件，但是我们可以通过给图标添加 `is-loading` 类来实现旋转效果。

以下是一个输入框，然后后面有一个 loading 图标的例子。

```vue
<template>
  <el-input v-model="inputValue" placeholder="正在查询...">
    <template #suffix>
      <el-tooltip content="后台正在加载数据，请稍候。" placement="top">
        <!-- 重点：为 el-icon 添加 is-loading 类 -->
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </el-tooltip>
    </template>
  </el-input>
</template>

<script setup>
import { ref } from 'vue';
import { ElInput, ElTooltip, ElIcon } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';

const inputValue = ref('');
</script>
```
