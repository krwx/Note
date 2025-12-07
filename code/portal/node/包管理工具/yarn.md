- [yarn（简单介绍）](#yarn简单介绍)
- [yarn（看这个）](#yarn看这个)
  - [1 yarn 介绍](#1-yarn-介绍)
  - [2 yarn 特点](#2-yarn-特点)
  - [3 yarn 安装](#3-yarn-安装)
  - [4 yarn 常用命令](#4-yarn-常用命令)
  - [5 yarn 配置淘宝镜像](#5-yarn-配置淘宝镜像)

# yarn（简单介绍）
yarn是有Facebook、Google、Exponent和Tilde联合推出了一个新的JS包管理工具

命令：  
- yarn install
- yarn add [package]
- yarn remove [package]
- yarn cache clean

好处：
- Yarn 的缓存机制确保包只下载一次，这意味着后续安装要快得多。
- Yarn 的并行安装过程允许同时安装多个包，这进一步缩短了安装时间。
- 交互式 CLI

# yarn（看这个）
## 1 yarn 介绍
yarn 是由 Facebook 在 2016 年推出的新的 Javascript 包管理工具，官方网址：`https://yarnpkg.com/`

## 2 yarn 特点
yarn 官方宣称的一些特点：
- 速度超快：yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快
- 超级安全：在执行代码之前，yarn 会通过算法校验每个安装包的完整性
- 超级可靠：使用详细、简洁的锁文件格式和明确的安装算法，yarn 能够保证在不同系统上无差异的工作

## 3 yarn 安装
我们可以使用 npm 安装 yarn
```
npm i -g yarn
```

## 4 yarn 常用命令
|功能| 命令|
|--|--|
初始化| `yarn init` / `yarn init -y`
安装包| `yarn add uniq` 生产依赖 <br> `yarn add less --dev` 开发依赖 <br> `yarn global add nodemon` 全局安装 
删除包| `yarn remove uniq` 删除项目依赖包 <br> `yarn global remove nodemon` 全局删除包
安装项目依赖| `yarn`
运行命令别名| `yarn <别名>` # 不需要添加 run

> `yarn` 全局安装包的位置可以通过 `yarn global bin` 来查看，但是全局安装的包不能使用。  
> 例如：使用 `yarn` 全局安装 `nodemon` ，运行 `nodemon` 会报错。这是因为没有给 `nodemon` 设置环境变量，需要手动设置

## 5 yarn 配置淘宝镜像
可以通过如下命令配置淘宝镜像
```
yarn config set registry https://registry.npmmirror.com/
```
可以通过 `yarn config list` 查看 `yarn` 的配置项