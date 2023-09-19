- [包管理工具](#包管理工具)
  - [npm](#npm)
    - [版本号](#版本号)
    - [package-lock.json文件](#package-lockjson文件)
    - [npm 命令](#npm-命令)
  - [yarn](#yarn)
  - [pnpm](#pnpm)


# 包管理工具
## npm
Node Package Manager，也就是Node包管理器。  
配置文件为 package.json

### 版本号
npm的包通常需要遵从semver版本规范 

semver版本规范是X.Y.Z ：
- X主版本号（major）:当你做了不兼容的API修改（可能不兼容之前的版本） 
- Y次版本号（minor）:当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本） 
- Z修订号（patch）:当你做了向下兼容的问题修正（没有新功能，修复了之前版本的bug） 

^和~的区别 ：
- x.y.z：表示一个明确的版本号 
- ^x.y.z：表示x是保持不变的，y和z永远安装最新的版本
- ~x.y.z：表示x和y保持不变的，z永远安装最新的版本

### package-lock.json文件
package-lock.json 是自动生成的，就是相当于我们的缓存文件，一般是不需要我们自己维护的，里面记录着我们**安装的每个依赖的确定版本**。

属性：
- name：项目的名称
- version：项目的版本
- lockfileVersion：lock文件的版本（更新了几次package-lock.json文件）
- requires：追踪模块的依赖关系
- dependencies：项目的依赖
- integrity：用来从缓存中获取索引，再通过索引去获取压缩包文件

### npm 命令
- 安装包
  - npm install
- 卸载包
  - npm uninstall package
- 清除缓存
  - npm cache clean
- 强制重新build 
  - npm rebuild

## yarn
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

## pnpm
PNPM 是另一个流行的包管理器，旨在比 NPM 更快、更高效。 PNPM 通过使用**共享缓存和硬链接**而不是多次安装它们来实现这一点。这会显着减少磁盘空间使用并缩短安装时间。 PNPM 还包括**多注册表支持、自动重复数据删除和并行安装包**等功能。

如果是使用的pnpm，依赖包将被存放在一个统一的位置，因此：
- 如果你对同一依赖包使用相同的版本，那么磁盘上只有这个依赖包的一份文件
- 如果你对同一依赖包需要使用不同的版本，则仅有 版本之间不同的文件会被存储起来
- 所有文件都保存在硬盘的统一的位置 