# npm

- [npm](#npm)
  - [版本号](#版本号)
  - [package.json文件](#packagejson文件)
    - [dependencies 和 devDependencies 的区别](#dependencies-和-devdependencies-的区别)
  - [package-lock.json文件](#package-lockjson文件)
  - [scripts](#scripts)
    - [npm 并行 or 继发](#npm-并行-or-继发)
    - [钩子](#钩子)
    - [管道](#管道)
  - [安全](#安全)
    - [npm 投毒](#npm-投毒)
    - [npm audit](#npm-audit)

Node Package Manager，也就是Node包管理器。  
配置文件为 package.json

## 版本号

npm 的包通常需要遵从 semver 版本规范

semver 版本规范是 `X.Y.Z` ：

- X 主版本号（major）:当你做了不兼容的API修改（可能不兼容之前的版本）
- Y 次版本号（minor）:当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）
- Z 修订号（patch）:当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）

^ 和 ~ 的区别 ：

- x.y.z：表示一个明确的版本号
- ^x.y.z：表示 x 是保持不变的，y 和 z 永远安装最新的版本
- ~x.y.z：表示 x 和 y 保持不变的，z 永远安装最新的版本

> 安装包：  
> 使用 `npm i` 依据 `package.json` 和 `packagelock.json` 的依赖声明安装项目依赖，不会下载最新的包  
> 使用 `npm i <包名>` 会下载最新的包，并更新 `package.json` 的包的版本号

## package.json文件

作用：

- lists the packages that your project depends on.
- allows you to specify the versions of a package that your project can use using semantic versioning rules.
- makes your build reproducible, and therefore much easier to share with other developers.

属性：

- name - 包名。
- version - 包的版本号。
- description - 包的描述。
- homepage - 包的官网 url 。
- author - 包的作者姓名。
- contributors - 包的其他贡献者姓名。
- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- keywords - 关键字

### dependencies 和 devDependencies 的区别

运行 `npm install` 会同时下载 `dependencies` 和 `devDependencies` 的包

官方解释：

- `"dependencies"`: Packages required by your application in production.
- `"devDependencies"`: Packages that are only needed for local development and testing.

对于开发网站或应用，差别不大，因为使用 `webpack` 打包会把 `js` 或 `ts` 文件引入的包都一起打包。

**它们的区别在发布一个 `npm package` 时出现**。发布包是不会把 `devDependencies` 的包打包进来，因为别的项目使用这个发布的包是不需要这个包开发或测试需要的包，只需要它生产环境下需要的包，即 `dependencies` 。

## package-lock.json文件

package-lock.json 是自动生成的，就是相当于我们的缓存文件，一般是不需要我们自己维护的，里面记录着我们**安装的每个依赖的确定版本**。

属性：

- name：项目的名称
- version：项目的版本
- lockfileVersion：lock文件的版本（更新了几次package-lock.json文件）
- requires：追踪模块的依赖关系
- dependencies：项目的依赖
- integrity：用来从缓存中获取索引，再通过索引去获取压缩包文件

作用：

- 当我们安装依赖时，`package-lock.json` 文件会自动生成。里面会描述上一次更改后的确切的依赖管理树，包含了唯一的版本号和相关的包信息。之后的 `npm install` 会根据 `package-lock.json` 文件进行安装，保证不同环境、不同时间下的依赖是一样的；
- 由于 `package-lock.json` 文件中记录了下载源地址，可以加快我们的 `npm install` 速度。

## scripts

### npm 并行 or 继发

`npm` 脚本里面需要执行多个任务，那么需要明确他们的执行顺序

- 并行执行（即同时的平行执行），可以使用 `&` 符号；
- 继发执行（即只有前一个任务成功，才执行下一个任务），可以使用 `&&` 符号。

```shell
# package.json  sciptes中添加两个打包环境的命令
# 案例1：并发
"build:all": "vue-cli-service build --mode gather & vue-cli-service build --mode manager",

# 案例2：继发
"build:all": "vue-cli-service build --mode gather && vue-cli-service build --mode manager",
```

### 钩子

`npm` 脚本有 `pre` 和 `post` 两个钩子。

举例来说，`build` 脚本命令的钩子就是 `prebuild` 和 `postbuild` 。

```shell
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行 `npm run build` 的时候，会自动按照下面的顺序执行。

`npm run prebuild && npm run build && npm run postbuild`

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。

```shell
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子。

- prepublish，postpublish
- preinstall，postinstall
- preuninstall，postuninstall
- preversion，postversion
- pretest，posttest
- prestop，poststop
- prestart，poststart
- prerestart，postrestart

自定义的脚本命令也可以加上 `pre` 和 `post` 钩子。

### 管道

在npm脚本中，可以使用管道（`|`）来将一个命令的输出作为另一个命令的输入。在`Unix-like`系统中，可以使用 `bash` 来执行这样的操作。

例如，如果你想将 `echo` 命令的输出传递给另一个命令，可以这样写：

```js
{
  "scripts": {
    "example": "echo 'Hello World' | wc -w"
  }
}
```

在这个例子中，`echo 'Hello World'` 输出了文本 `Hello World` ，然后通过管道（`|`）将这个输出传递给 `wc -w` 命令，后者是 `Unix` 系统中的单词计数命令。

## 安全

### npm 投毒

npm 投毒（npm poisoning）是一种针对 JavaScript 生态系统（尤其是 npm 仓库）的恶意攻击行为。攻击者通过上传包含恶意代码的软件包，或劫持合法软件包，试图破坏开发者的项目、窃取敏感信息或传播恶意软件。以下是详细介绍：

**1. 攻击方式**

- **恶意软件包上传**  
  攻击者创建名称与合法包相似（如拼写错误）的包，诱使开发者错误安装。
- **劫持合法包**  
  通过窃取维护者账户或利用漏洞，在合法包中注入恶意代码。
- **依赖混淆攻击**  
  上传与私有包同名的公共包，利用构建工具默认从公共仓库下载的特性植入恶意代码。
- **供应链攻击**  
  在包的依赖链中植入恶意代码，即使合法包也可能通过依赖被感染。

**2. 典型案例**

- **event-stream 事件**  
  2018 年，流行的 `event-stream` 包被注入恶意代码，针对 Copay 比特币钱包窃取私钥。
- **eslint-scope 攻击**  
  攻击者通过窃取维护者账号，在 `eslint-scope` 中植入窃取 npm 凭证的代码。
- **ua-parser-js 事件**  
  2021 年，该包被劫持后植入恶意代码，用于窃取系统信息。

**3. 防御措施**

- **审核依赖**  
  使用 `npm audit` 或第三方工具（如 Snyk、Sonatype）扫描漏洞。
- **锁定依赖版本**  
  通过 `package-lock.json` 或 `yarn.lock` 固定版本，避免意外更新。
- **最小化依赖**  
  减少不必要的包，降低攻击面。
- **使用可信源**  
  从官方 npm 仓库下载，避免使用未经验证的镜像。
- **自动化监控**  
  集成安全工具（如 GitHub Dependabot）实时检测风险。
- **双因素认证（2FA）**  
  为 npm 账户启用 2FA，防止账号劫持。

### npm audit

使用 `npm audit` 是防范 npm 投毒（供应链攻击）的关键步骤，它能扫描项目依赖中的已知安全漏洞。以下是具体使用方法。

***

**基础扫描与修复**

在你的项目根目录（确保存在 `package.json` 和 `package-lock.json`）下运行命令：

| 命令 | 作用与说明 |
| :--- | :--- |
| **`npm audit`** | **基本扫描**。检查并列出所有漏洞，包含路径、严重等级（低/中/高/致命）和建议。 |
| **`npm audit fix`** | **自动修复**。自动安装兼容的更新来修复漏洞。这是最常用的修复命令。 |
| **`npm audit fix --force`** | **强制修复**。当常规修复无效时，此命令会强制更新到安全版本，但**可能引入不兼容的变更**。使用前建议先测试。 |
| **`npm audit fix --dry-run --json`** | **模拟修复**。预览修复将执行的操作，并以 JSON 格式输出计划，**不会实际修改文件**。 |

***

**`npm audit fix` 版本号说明**：

`npm audit fix` 会修改 `package.json` 和 `package-lock.json` 中的版本号

以 `axios` 包说明，`1.0.0` - `1.11.0` 有漏洞，修复版本为 `1.13.2`

- 如果 `package.json` 中的版本号是 `"axios": "^1.0.0"`，**不会更改版本号**，因为 `^1.0.0` 已经包含了 `1.13.2`
- 如果 `package.json` 中的版本号是 `"axios": "~1.0.0"` 或者 `"axios": "1.0.0"`，则会更新为 `"axios": "^1.13.2"`
  - 因为 `package.json` 需要变更，所以要使用 `npm audit fix --force` 来强制更新

***

**例子**

axios 包有风险：

```sh
$ npm audit

# npm audit report
axios  1.0.0 - 1.11.0
Severity: high
Axios Cross-Site Request Forgery Vulnerability - https://github.com/advisories/GHSA-wf5p-g6vw-rhxx
Axios is vulnerable to DoS attack through lack of data size check - https://github.com/advisories/GHSA-4hjh-wcwx-xvwj
axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL - https://github.com/advisories/GHSA-jr5f-v2jv-69x6
fix available via `npm audit fix`
node_modules/axios

1 high severity vulnerability

To address all issues, run:
  npm audit fix
```

**注意**：

- `npm audit` 的原理是将项目依赖树信息发送到 npm 官方服务器进行比对（信息会脱敏处理）。
- 某些深层次或涉及重大变更的漏洞可能无法自动修复，需要你手动评估并更新 `package.json`。
