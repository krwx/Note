# Form

- [Form](#form)
  - [典型表单](#典型表单)
    - [@submit.prevent](#submitprevent)

## 典型表单

### @submit.prevent

**作用**：

1、**阻止默认提交行为**

- `prevent` 修饰符会自动调用 `event.preventDefault()`
- 防止表单的默认提交（页面刷新跳转）

2、**触发自定义提交逻辑**

- 执行你定义的提交方法
- 可以在提交前进行表单验证、数据收集等操作

***

**使用方法**：

```vue
<template>
  <el-form @submit.prevent="handleSubmit">
    <el-form-item label="用户名">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    
    <el-form-item>
      <!-- 必须指定 native-type="submit" -->
      <el-button type="primary" native-type="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log('表单提交', this.form)
      // 发送请求等操作
      this.submitForm()
    },
    submitForm() {
      // 实际提交逻辑
    }
  }
}
</script>
```

**按钮类型必须正确**，使用 `native-type="submit"`，不是 `type="submit"`

```vue
<!-- 正确 -->
<el-button native-type="submit">提交</el-button>

<!-- 错误（不会触发表单提交） -->
<el-button type="submit">提交</el-button>
```

***

如果不使用 `@submit.prevent`，也可以使用 普通按钮 + `@click`：

```vue
<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <!-- 表单内容 -->
    
    <el-form-item>
      <!-- 使用 @click 处理提交 -->
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 提交逻辑
        }
      })
    }
  }
}
</script>
```
