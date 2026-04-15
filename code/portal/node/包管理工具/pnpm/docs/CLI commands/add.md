# `add <pkg>`

- [`add <pkg>`](#add-pkg)
  - [介绍](#介绍)
  - [来源](#来源)
    - [npm registry](#npm-registry)
    - [Workspace](#workspace)
  - [配置项](#配置项)
    - [--workspace](#--workspace)

## 介绍

安装软件包及其依赖的任何软件包。 默认情况下，任何新软件包都被安装为生产依赖项（`devDependencies`）。

| 命令 | 含义 |
| --- | --- |
| `pnpm add sax` | 保存到 dependencies |
| `pnpm add -D sax` | 保存到 devDependencies |
| `pnpm add -O sax` | 保存到 optionalDependencies |
| `pnpm add -g sax` | 安装全局依赖 |
| `pnpm add sax@next` | 安装 next 标签的版本 |
| `pnpm add sax@3.0.0` | 指定 3.0.0 版本 |

## 来源

### npm registry

`pnpm add pkg` **默认**会从 `npm registry` 安装 `pkg` 的最新版本。

### Workspace

如果在**工作空间**( **Workspace** )中执行 `add` 命令：

**1. `pkg` 是 `npm registry` 中的一个包**

- `pnpm` 会检查工作空间中其他项目是否已经使用了该包。如果有项目已经使用，则会安装已使用过的版本范围。
- **举例：**
  - 现在要安装 `react` 包，最新版本为 `react@19`。
  - 但如果工作空间中已有项目安装了 `react@17`，则 `pnpm` 会安装 `react@17`。

**2. `pkg` 是工作空间（Workspace）中的一个本地包**

- **pnpm v9 及以上：**
  - `link-workspace-packages` 默认值为 `false`，`pnpm` 不再自动链接工作区包。
  - `pnpm add pkg`：会从 `npm registry` 安装最新版本的 `pkg`。
  - `pnpm add pkg@workspace:*`：才会链接工作区中的 `pkg` 包。
- **pnpm v8 及以下：**
  - `pnpm add pkg` 会自动链接工作区中的 `pkg` 包。

## 配置项

### --workspace

仅添加在工作空间中找到的本地包。如果 `pkg` 不是工作空间中的本地包，则会报错。

**示例：**

`pnpm add @common/utils --workspace`：只会链接工作区中的 `@common/utils` 包，如果没有找到则会报错。
