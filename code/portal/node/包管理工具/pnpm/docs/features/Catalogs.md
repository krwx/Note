# Catalogs

- [Catalogs](#catalogs)
  - [一、什么是 Catalog？解决了什么问题？](#一什么是-catalog解决了什么问题)
  - [二、如何在 `pnpm-workspace.yaml` 中定义 Catalog？](#二如何在-pnpm-workspaceyaml-中定义-catalog)
    - [1️⃣ 默认 Catalog（推荐单版本线）](#1️⃣-默认-catalog推荐单版本线)
    - [2️⃣ 具名 Catalogs（多版本并行）](#2️⃣-具名-catalogs多版本并行)
  - [三、子包如何引用 Catalog？（catalog: 协议）](#三子包如何引用-catalogcatalog-协议)
    - [引用默认 Catalog](#引用默认-catalog)
    - [引用具名 Catalog](#引用具名-catalog)
  - [四、发布时的自动转换（与 `workspace:` 类似）](#四发布时的自动转换与-workspace-类似)
  - [五、Catalog 相关的高级配置（v10.12+）](#五catalog-相关的高级配置v1012)

## 一、什么是 Catalog？解决了什么问题？

在传统 Monorepo 中，如果 20 个子包都用 React，你必须确保 20 个 `package.json` 里的 `react` 版本都是 `^18.2.0`。升级时就要改 20 个文件，极易遗漏或冲突。

**Catalog 的解决方案**：  
你**只在 `pnpm-workspace.yaml` 里定义一次版本**，所有子包通过 `"react": "catalog:"` 引用。升级时**只改 YAML 里的一行**，所有子包自动生效。

**核心优势**：

- ✅ **维护唯一版本**：整个工作区强制或推荐使用单一版本，避免依赖地狱。
- ✅ **轻松升级**：改一处配置等于改所有包，极大降低维护成本。
- ✅ **消灭合并冲突**：升级依赖不再改动 `package.json`，多人协作时 Git 冲突归零。

## 二、如何在 `pnpm-workspace.yaml` 中定义 Catalog？

Catalogs 定义在 `pnpm-workspace.yaml` 中，支持两种形式：**默认 Catalog** 和 **具名 Catalogs**。

### 1️⃣ 默认 Catalog（推荐单版本线）

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

# 默认 catalog，通过 "catalog:" 或 "catalog:default" 引用
catalog:
  react: ^18.3.1
  react-dom: ^18.3.1
  lodash: ^4.17.21
```

### 2️⃣ 具名 Catalogs（多版本并行）

适用于**渐进式升级**或**维护多个大版本**的场景（如同时支持 React 17 和 React 18）。

```yaml
# pnpm-workspace.yaml
catalog:   # 仍然可以保留默认版本
  react: ^16.14.0

catalogs:
  react17:
    react: ^17.0.2
    react-dom: ^17.0.2
  react18:
    react: ^18.2.0
    react-dom: ^18.2.0
  tools:   # 你甚至可以按用途分类
    typescript: ~5.4.0
    eslint: ^8.56.0
```

> 📌 **注意**：`catalog`（单数）定义默认 Catalog；`catalogs`（复数）定义多个具名 Catalog，两者可以**共存**，非常灵活。

---

## 三、子包如何引用 Catalog？（catalog: 协议）

在子包的 `package.json` 中，无需写死版本号，使用 **`catalog:` 协议**即可。

### 引用默认 Catalog

```json
{
  "name": "@app/web",
  "dependencies": {
    "react": "catalog:",        // 自动使用 default 里的 ^18.3.1
    "lodash": "catalog:"       // 自动使用 default 里的 ^4.17.21
  }
}
```

### 引用具名 Catalog

```json
{
  "name": "@legacy/app",
  "dependencies": {
    "react": "catalog:react17", // 明确使用 react17 目录的 ^17.0.2
    "react-dom": "catalog:react17"
  }
}
```

**支持字段**：`dependencies`、`devDependencies`、`peerDependencies`、`optionalDependencies` 以及 `pnpm.overrides`。

---

## 四、发布时的自动转换（与 `workspace:` 类似）

当你运行 `pnpm publish` 或 `pnpm pack` 时，`catalog:` 协议会被**自动替换为真实的版本号**（来自 YAML 中定义的范围）。

例如本地开发时写 `"react": "catalog:react18"`，发布后的 `package.json` 里会变成 `"react": "^18.2.0"`。这样**发布出去的包可以被任何包管理器正常安装**，不依赖 pnpm workspace。

---

## 五、Catalog 相关的高级配置（v10.12+）

随着 pnpm 10.12 - 10.15 的迭代，Catalog 拥有了更精细的控制能力。

| 配置项 | 引入版本 | 说明 | 默认值 |
| -------- | ------ | ------ | -------- |
| **`catalogMode`** | v10.12.1 | 控制 `pnpm add` 时是否自动写入 Catalog：<br>`manual`：手动（默认），不自动添加。<br>`strict`：严格模式，**只允许**来自 Catalog 的版本，否则报错。<br>`prefer`：优先使用 Catalog 版本，若无则 fallback 到直接依赖。 | `manual` |
| **`cleanupUnusedCatalogs`** | v10.15.0 | 设置为 `true` 后，`pnpm install` 时会**自动删除 `pnpm-workspace.yaml` 中未被任何子包引用的 Catalog 条目**。 | `false` |

**配置示例**（`pnpm-workspace.yaml`）：

```yaml
# 开启严格模式，强制团队统一版本
catalogMode: strict
# 自动清理无用条目
cleanupUnusedCatalogs: true

catalog:
  react: ^18.3.1
  typescript: ~5.4.5
```
