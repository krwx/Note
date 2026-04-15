# npm 命令

- [npm 命令](#npm-命令)
  - [查看安装的包](#查看安装的包)
  - [安装包](#安装包)
  - [删除包](#删除包)
  - [更新包](#更新包)
  - [清除缓存](#清除缓存)
  - [强制重新build](#强制重新build)
  - [查看配置列表](#查看配置列表)
  - [设置国内镜像](#设置国内镜像)
  - [设置官网镜像](#设置官网镜像)
  - [登录](#登录)
  - [发布](#发布)
  - [搜索包](#搜索包)
  - [查看全局安装包的位置](#查看全局安装包的位置)

## 查看安装的包

`npm list`

## 安装包

- `npm install` （安装所有包）
- `npm install <pkg>`（安装指定包）
  - `dependencies`
    - `npm i -P <pkg>`
    - `npm i --save-prod <pkg>`
  - `devDependencies`
    - `npm i -D <pkg>`
    - `npm i --save-dev <pkg>`
  - `optionalDependencies`
    - `npm i -O <pkg>`
    - `npm i --save-optional <pkg>`
  - 全局安装
    - `npm i -g <pkg>`
  - 安装指定版本
    - `npm i jquery@1.11.2`

`npm install <pkg>` 默认将包保存到 `dependencies` 中，并且自动修改 `package.json` 文件。

## 删除包

- `npm uninstall <pkg>`
- `npm uninstall [<@scope>/]<pkg>...`
  - 别名: `unlink, remove, rm, r, un`
  - 全局删除
    - `npm remove -g nodemon`

## 更新包

- npm update（更新所有的包）
  - 更新指定的包
    - npm update <包名>
  - 更新全局安装的包
    - npm update -g
  - 安装 `devDependencies` 下丢失的包
    - npm update --save-dev

这个命令将更新所有的包到指定主版本下的最新版本，要符合semver规范。

若 `node_modules` 下包缺失，但 `package.json` 的 `dependencies` 指定了依赖包，此命令还会重新安装新包。

## 清除缓存

- npm cache clean

## 强制重新build

- npm rebuild

## 查看配置列表

- npm config list

## 设置国内镜像

- `npm config set registry https://registry.npmmirror.com`

## 设置官网镜像

- `npm config set registry https://registry.npmjs.org`

## 登录

- npm login

## 发布

- npm publish

## 搜索包

- npm s [包名]

## 查看全局安装包的位置

- npm root -g
