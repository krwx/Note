# 配置 vite

- [配置 vite](#配置-vite)
  - [情景配置](#情景配置)
  - [异步配置](#异步配置)
  - [在配置中使用环境变量](#在配置中使用环境变量)

当以命令行方式运行 `vite` 时，Vite 会自动解析项目根目录下名为 `vite.config.js` 的配置文件（也支持其他 JS 和 TS 扩展名）。

最基础的配置文件是这样的：

```js [vite.config.js]
export default {
  // 配置选项
}
```

或者使用 `defineConfig` 工具函数：

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

你可以显式地通过 `--config` 命令行选项指定一个配置文件（相对于 `cwd` 路径进行解析）

```bash
vite --config my-config.js
```

## 情景配置

如果配置文件需要基于（`serve` 或 `build`）`command` 或者不同的 `mode` 来决定选项，亦或者是一个 `SSR` 构建（`isSsrBuild`）、一个正在预览的构建产物（`isPreview`），则可以选择导出这样一个函数：

不同 `command` `return` 不同配置：

```js
import { defineConfig } from 'vite'
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})
```

直接 `return` 配置，在配置里根据 `mode` 设置不同选项：

```js
import { defineConfig } from 'vite'
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  return {
    // vite 配置
    base: mode === 'production' ? '/my-app/' : '/',
  }
})
```

需要注意的是，在 Vite 的 API 中，在开发环境下 `command` 的值为 `serve`（在 CLI 中， `vite dev` 和 `vite serve` 是 `vite` 的别名），而在生产环境下为 `build`（`vite build`）。

## 异步配置

如果配置需要调用一个异步函数，也可以转而导出一个异步函数。这个异步函数也可以通过 `defineConfig` 传递，以便获得更好的智能提示：

```js twoslash
import { defineConfig } from 'vite'
// ---cut---
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite 配置
  }
})
```

## 在配置中使用环境变量

在 `vite.config.js` 里面，可用的环境变量仅限于当前进程环境中已经存在的变量（`process.env`）。  
Vite 推迟加载任何 `.env*` 文件，直到用户配置解析完成之后。

这意味着：在你的 `vite.config.*` 运行时，定义在 `.env`、`.env.local`、`.env.[mode]` 或 `.env.[mode].local` 中的变量不会自动注入到 `process.env` 中。它们会在稍后自动加载，并通过 `import.meta.env` 暴露给应用程序代码。

但是，如果 `.env*` 文件中的值必须影响配置本身（例如设置 `server.port`、条件性启用插件或计算 `define` 替换），你可以使用 `loadEnv` 函数手动加载它们。

```js twoslash
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有
  // `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      // 提供从 env var 派生的显式应用程序级常量。
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // 例如：使用 env var 有条件地设置开发服务器端口。
    server: {
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
    },
  }
})
```
