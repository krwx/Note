# other

## 在 vue3 中实现 vue2 的 filters 过滤器功能

[link](https://blog.csdn.net/weixin_43953518/article/details/128905225?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-128905225-blog-128913128.235%5Ev38%5Epc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-128905225-blog-128913128.235%5Ev38%5Epc_relevant_default_base3&utm_relevant_index=2)

vue3取消了vue2中的过滤器，但是变相一下，可以在双括号表达式中使用方法，所以也是可以间接实现的，功能简单，请看下面实例代码filters

```vue
<template>
  <div v-for="(item, index) in list" :key="index">
    <span>{{ item.name }}</span>
    <span>{{ filters(item.id) }}</span>
  </div>
</template>

<script>
export default {
  setup() {
    let list = [
      {
        name: "张三",
        id: 1,
      },
      {
        name: "李四",
        id: 2,
      }
    ];
    
    function filters(id) {
      let txt = "";
      switch (id) {
        case 1:
          txt = "张三id";
          break;
        case 2:
          txt = "李四id";
          break;
      }
      return txt;
    }
    return {
      list,
      filters,
    };
  },
};
</script>
```
