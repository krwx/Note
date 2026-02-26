# pnpm workspace

- [pnpm workspace](#pnpm-workspace)
  - [一、什么是 pnpm workspace？](#一什么是-pnpm-workspace)
  - [二、为什么需要 workspace？](#二为什么需要-workspace)
  - [三、核心特性](#三核心特性)
  - [四、如何配置 pnpm workspace？](#四如何配置-pnpm-workspace)
    - [1. 创建仓库结构](#1-创建仓库结构)
    - [2. 编写 pnpm-workspace.yaml](#2-编写-pnpm-workspaceyaml)
    - [3. 根目录 package.json 可选](#3-根目录-packagejson-可选)
    - [4. 通过别名引用 workspace 中的包](#4-通过别名引用-workspace-中的包)
    - [5. 发布 workspace 包](#5-发布-workspace-包)
  - [五、常用命令与工作流](#五常用命令与工作流)
  - [六、与其他工具的对比](#六与其他工具的对比)
  - [七、适用场景](#七适用场景)
  - [八、总结](#八总结)

pnpm 的 workspace 是一项原生支持**单仓库多包（Monorepo）**的强大功能。它允许你在一个仓库中管理多个项目（包），并自动处理它们之间的依赖关系，同时利用 pnpm 独有的硬链接与符号链接机制，极大地节省磁盘空间并提升安装速度。

## 一、什么是 pnpm workspace？

pnpm workspace 是 pnpm 内置的对 Monorepo 架构的支持。通过在仓库根目录定义 `pnpm-workspace.yaml` 文件，你可以声明哪些子目录是独立的工作包。pnpm 会将这些包视为独立的项目，但又能将它们相互链接，实现本地包之间的即时引用，而不必先发布到 NPM。

## 二、为什么需要 workspace？

在开发多个相互依赖的 npm 包时（例如 UI 组件库、工具函数库、主应用），传统方案通常是：

- 分别维护多个仓库，通过 `npm link` 手动链接调试，流程繁琐。
- 或者将所有代码放到一个仓库，但使用 npm/yarn 简单平铺安装，会导致依赖重复、版本冲突等问题。

pnpm workspace 通过**中心化依赖管理**和**自动软链接**解决了这些问题：

- **本地包相互引用**：`"@my-project/utils": "workspace:*"` 自动指向本地源码。
- **依赖去重**：所有包的公共依赖会被提升到根 `node_modules`，避免重复下载。
- **节省磁盘**：pnpm 使用内容寻址存储，相同版本的依赖只保存一份物理文件。
- **严格的隔离**：即使使用 Workspace，每个包的 `node_modules` 结构依然遵循 pnpm 的严格原则，防止非法访问未声明的依赖。

## 三、核心特性

1. **基于内容寻址的存储**  
   所有依赖都存储在全局 store 中，项目中的 `node_modules` 只是这些文件的硬链接。不同项目使用同版本依赖时，磁盘上仅存一份。

2. **符号链接管理本地包**  
   当一个包依赖另一个本地包时，pnpm 会在 `node_modules` 中创建一个符号链接，直接指向源文件目录。修改源码会即时生效，无需重新安装。

3. **过滤器（--filter）**  
   可以对指定包运行命令，例如 `pnpm --filter @my/ui build`，大幅提升 CI 效率。

4. **workspace 协议**  
   在 `package.json` 的依赖声明中，可以使用 `"workspace:*"`、`"workspace:^1.2.3"` 等语法，pnpm 在发布时会自动将这些引用转换为真实的版本号。

## 四、如何配置 pnpm workspace？

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

### 2. 编写 pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  # 排除特定文件夹
  - '!**/test/**'
```

### 3. 根目录 package.json 可选

根目录可以不设 `private: true`，但推荐设置以阻止意外发布。你还可以在根目录定义共用的开发依赖，如 `typescript`、`eslint` 等，通过 `-w` 标志安装。

### 4. 通过别名引用 workspace 中的包

在子包的 `package.json` 中，可以使用 workspace 协议引用其他本地包：

```json
{
  "dependencies": {
    "@my-project/utils": "workspace:*"
  }
}
```

发布后，pnpm 会自动将 `workspace:*` 替换为实际版本号，确保依赖关系正确：`"@my-project/utils": "npm:1.0.0"`。

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

## 五、常用命令与工作流

| 命令 | 说明 |
| ------ | ------ |
| `pnpm install` | 在根目录执行，为所有 workspace 包安装依赖，并自动链接本地包 |
| `pnpm add -w typescript` | 为根目录添加公共开发依赖 |
| `pnpm --filter utils add lodash` | 仅为 `utils` 包添加 `lodash` 依赖 |
| `pnpm run --filter web dev` | 运行 `web` 包的 `dev` 脚本 |
| `pnpm publish -r` | 按拓扑顺序发布所有有更新的包 |

## 六、与其他工具的对比

| 工具 | 特点 |
| ------ | ------ |
| **npm/yarn classic** | 不支持原生 workspace，依赖平铺，重复率高 |
| **Yarn 2+ (Berry)** | 自带 workspace，但依赖安装在 `.yarn/cache`，相对较重 |
| **Lerna** | 专为发布管理设计，常与 yarn/pnpm 配合，非包管理器 |
| **pnpm workspace** | 结合了包管理器与 workspace，性能卓越，磁盘占用极低 |

相比 Yarn 或 npm 的 workspace，pnpm 的 workspace **不会将依赖扁平化**，因此能防止幽灵依赖；同时 pnpm 独有的存储方式让多个 Monorepo 项目共享同一份依赖副本，**磁盘效率更高**。

## 七、适用场景

- 开发组件库 + 演示项目（Storybook）
- 后端服务 + 共享的业务逻辑层
- 微前端子应用集合
- 工具函数集合 + CLI 工具

## 八、总结

pnpm workspace 是目前 Monorepo 方案中**轻量、快速、严谨**的选择。它不需要额外工具（如 Lerna）即可完成本地包管理、依赖安装、构建与发布。如果你的团队正在寻找一款现代化的 Monorepo 解决方案，pnpm workspace 非常值得尝试。
