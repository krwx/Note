# jade

```ts
<script setup lang="ts">
</script>
```

vue3 报错解决：无法找到模块“xxx.vue”的声明文件 xxx隐式拥有 “any“ 类型。

解决方法：在项目根目录或 src 文件夹下创建一个后缀为 env.d.ts 的文件，并写入以下内容：

```ts
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
```

鼠标放到 span 上面，怎么做阴影？

看提示是怎么做的？
