# pnpm workspace

- [pnpm workspace](#pnpm-workspace)
  - [1. 介绍](#1-介绍)
  - [2. 如何配置 pnpm workspace？](#2-如何配置-pnpm-workspace)
    - [1. 创建仓库结构](#1-创建仓库结构)
    - [2. 创建 pnpm-workspace.yaml](#2-创建-pnpm-workspaceyaml)
    - [3. 修改 package.json](#3-修改-packagejson)
    - [4. 引用 workspace 中的包](#4-引用-workspace-中的包)
      - [4.1 通过别名引用](#41-通过别名引用)
      - [4.2 使用 pnpm add 命令](#42-使用-pnpm-add-命令)
    - [5. 发布 workspace 包](#5-发布-workspace-包)
  - [配置](#配置)
    - [linkWorkspacePackages](#linkworkspacepackages)

## 1. 介绍

**定义：**

pnpm 的 workspace 是一项原生支持**单仓库多包（Monorepo）**的强大功能。它允许你在一个仓库中管理多个项目（包），并自动处理它们之间的依赖关系，同时利用 pnpm 独有的硬链接与符号链接机制，极大地节省磁盘空间并提升安装速度。通过在仓库根目录定义 `pnpm-workspace.yaml` 文件，你可以声明哪些子目录是独立的工作包。

***

**核心特性：**

1. **基于内容寻址的存储**  
   所有依赖都存储在全局 store 中，项目中的 `node_modules` 只是这些文件的硬链接。不同项目使用同版本依赖时，磁盘上仅存一份。

2. **符号链接管理本地包**  
   当一个包依赖另一个本地包时，pnpm 会在 `node_modules` 中创建一个符号链接，直接指向源文件目录。修改源码会即时生效，无需重新安装。

3. **过滤器（--filter）**  
   可以对指定包运行命令，例如 `pnpm --filter @my/ui build`，大幅提升 CI 效率。

4. **workspace 协议**  
   在 `package.json` 的依赖声明中，可以使用 `"workspace:*"`、`"workspace:^1.2.3"` 等语法，pnpm 在发布时会自动将这些引用转换为真实的版本号。

## 2. 如何配置 pnpm workspace？

### 1. 创建仓库结构

```txt
my-monorepo/
├── packages/
│   ├── ui/
│   │   └── package.json
│   └── utils/
│       └── package.json
├── apps/
│   └── web/
│       └── package.json
├── pnpm-workspace.yaml
└── package.json (根目录)
```

### 2. 创建 pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  # 排除特定文件夹
  - '!**/test/**'
```

### 3. 修改 package.json

根目录 `package.json`：

- 删除 `main`、`test` 属性
- 清空 `scripts` 里面的命令，或者删除 `scripts` 属性
- 根目录可以不设 `private: true`，但推荐设置以阻止意外发布
- 还可以在根目录定义共用的 `devDependencies`，如 `typescript`、`eslint` 等，通过 `-w` 标志安装。

示例：

```json
{
  "name": "my-monorepo",
  "private": true,
  "devDependencies": {
    "typescript": "^4.0.0",
    "eslint": "^7.0.0"
  },
  "license": "ISC",
  "packageManager": "pnpm@10.25.0"
}
```

***

包 `package.json`：

- 设置 `name` 为包的名称
- 设置 `type` 为 `module`
- 设置 `main` 为入口的 js 文件（例如 `dist/index.js`）

示例：

```json
{
  "name": "@my-project/utils",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "license": "ISC"
}
```

### 4. 引用 workspace 中的包

#### 4.1 通过别名引用

在 `package.json` 中，可以使用 `workspace` 协议引用其他本地包：

```json
{
  "dependencies": {
    "@my-project/utils": "workspace:*"
  }
}
```

发布后，pnpm 会自动将 `workspace:*` 替换为实际版本号，确保依赖关系正确：`"@my-project/utils": "npm:1.0.0"`。

#### 4.2 使用 pnpm add 命令

- `pnpm add <pkg>@workspace:*`
- `pnpm add <pkg> --workspace`
- `pnpm add <pkg>`（需要 `linkWorkspacePackages` 配置为 `true`，才会自动链接工作区中的包）

### 5. 发布 workspace 包

发布包时会自动转换版本号。

例子，假设本地包 B 的版本是 `1.2.3`：

- `workspace:~` 在发布时会被替换成 `~1.2.3`
- `workspace:^` 在发布时会被替换成 `^1.2.3`
- `workspace:*` 在发布时会被替换成 `1.2.3`（固定版本）

例如：在 workspace 中有 `foo， bar， qar， zoo` ，它们都是版本 `1.5.0`

```json
{
	"dependencies": {
		"foo": "workspace:*",
		"bar": "workspace:~",
		"qar": "workspace:^",
		"zoo": "workspace:^1.5.0"
	}
}
```

将会被转化为：

```json
{
	"dependencies": {
		"foo": "1.5.0",
		"bar": "~1.5.0",
		"qar": "^1.5.0",
		"zoo": "^1.5.0"
	}
}
```

## 配置

下面的配置都在 `.npmrc` 文件中进行设置。

`.npmrc` 文件可以放在**项目根目录**，也可以放在用户目录（`~/.npmrc`）中，后者会被所有项目共享。

### linkWorkspacePackages

- 默认值： `false`
- 类型：`true`、`false`、`deep`

示例：`linkWorkspacePackages = true`

说明：

- 设置为 `true` 后，本地可用的软件包将被链接到 `node_modules` 中而不是从注册源下载。
  - `pnpm add pkg`：会链接工作区中的 `pkg` 包。
  - `pnpm add pkg@workspace:*`：同样会链接工作区中的 `pkg` 包。
- 设置为 `deep` 后，子依赖项也会链接到本地包。
- 设置为 `false` 后，将从注册源下载并安装软件包。但是 `workspace` 仍然可以通过使用 `workspace:` 范围协议进行链接。
  - `pnpm add pkg`：会从 `npm registry` 安装最新版本的 `pkg`。
  - `pnpm add pkg@workspace:*`：才会链接工作区中的 `pkg` 包。

> 版本说明：
>
> - pnpm v9 及以上：默认值为 `false`，不再自动链接工作区包。
> - pnpm v8 及以下：默认值为 `true`，会自动链接工作区包。
