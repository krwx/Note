# start guide

- [start guide](#start-guide)
  - [引入 element-plus](#引入-element-plus)
    - [完整引入（不推荐，❌）](#完整引入不推荐)
    - [按需引入（推荐，✅）](#按需引入推荐)

## 引入 element-plus

### 完整引入（不推荐，❌）

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

### 按需引入（推荐，✅）

安装 `unplugin-vue-components` 和 `unplugin-auto-import` 这两款插件

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

修改 `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

从完整导入切到按需引入需修改 `main.ts`，将完整导入的代码删掉

```ts
// 删除之前
import { createApp } from 'vue'
import ElementPlus from 'element-plus' // 删除这行
import 'element-plus/dist/index.css' // 删除这行
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus) // 删除这行
app.mount('#app')
```

```ts
// 删除之后
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')
```
