# npm

- [npm](#npm)
  - [版本号](#版本号)
  - [package.json文件](#packagejson文件)
    - [dependencies 和 devDependencies 的区别](#dependencies-和-devdependencies-的区别)
  - [package-lock.json文件](#package-lockjson文件)
  - [scripts](#scripts)
    - [npm 并行 or 继发](#npm-并行-or-继发)

Node Package Manager，也就是Node包管理器。  
配置文件为 package.json

## 版本号

npm的包通常需要遵从semver版本规范

semver版本规范是X.Y.Z ：

- X主版本号（major）:当你做了不兼容的API修改（可能不兼容之前的版本）
- Y次版本号（minor）:当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）
- Z修订号（patch）:当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug）

^和~的区别 ：

- x.y.z：表示一个明确的版本号
- ^x.y.z：表示x是保持不变的，y和z永远安装最新的版本
- ~x.y.z：表示x和y保持不变的，z永远安装最新的版本

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
