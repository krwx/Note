# 移除 console

针对 Vite 8.0 使用 **Oxc** 作为默认压缩工具的新变化，配置移除 `console` 的方法与之前使用 Terser 时有所不同。

## 🔧 配置方法

在 `vite.config.js` 文件中，你需要通过 `build.oxc` 选项来配置 **Oxc** 的压缩行为。

使用 `oxc.compress.drop_console` 选项来移除所有的 console 语句。以下是一个示例配置：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    // 1. 在 Vite 8.0 中，压缩器默认已经改成了 'oxc'，此处可省略
    // minify: 'oxc', 
    
    // 2. 配置 Oxc 选项
    oxc: {
      compress: {
        // 核心配置：移除 console 语句
        drop_console: true,
        // 同时也可以移除 debugger 语句
        drop_debugger: true
      }
    }
  }
})
```

## ⚠️ 重要说明与备选方案

配置时需要注意以下几点：

* **版本确认**：请确保你的 Vite 版本 ≥ 8.0。你可以通过运行 `npm list vite` 来确认。
* **备选方案**：如果你在配置 Oxc 时遇到问题，或者希望临时切换回原来的工具链，Vite 仍然支持使用 Terser 或 esbuild。
  * **切换回 Terser**：安装 `@rollup/plugin-terser` 插件，并将 `build.minify` 选项设置为 `'terser'`，然后使用 `terserOptions` 进行配置。
  * **使用 esbuild**：将 `build.minify` 选项设置为 `'esbuild'`，并使用 `esbuild` 选项进行配置（例如：`esbuild: { drop: ['console', 'debugger'] }`）。
