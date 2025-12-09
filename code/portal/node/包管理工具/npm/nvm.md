# nvm

## 一、介绍

`nvm` 全称 `Node Version Manager` 顾名思义它是用来管理 node 版本的工具，方便切换不同版本的 Node.js

[csdn教程](https://blog.csdn.net/qq_22182989/article/details/125387145)

## 二、使用

`nvm` 的使用非常的简单，跟 `npm` 的使用方法类似

### 2.1 下载安装

首先先下载 `nvm`，下载地址 <https://github.com/coreybutler/nvm-windows/releases>  
选择 `nvm-setup.exe` 下载即可

> 最好直接安装在C盘，那么就不要再配环境变量了

如果电脑之前已经下载了 node ，那么安装的时候有可能会卸载掉原来的 node。

但是可能没有卸载干净，运行 nvm 命令的时候会报错 `node is not recognized as an internal or external command`。解决方法

1. 寻找这些文件夹并删除它们：
    - C:\Program Files (x86)\Nodejs
    - C:\Program Files\Nodejs
    - C:\Users{User}\AppData\Roaming\npm(或%appdata%\npm)
    - C:\Users{User}\AppData\Roaming\npm-cache(或%appdata%\npm-cache)
2. 检查您的 `%PATH%` 环境变量以确保没有引用 `Nodejs` 或 `npm` 存在。

### 2.2 常用命令

|命令| 说明|
|--|--|
|nvm list available | 显示所有可以下载的 Node.js 版本|
|nvm list | 显示已安装的版本|
|nvm install 18.12.1 | 安装 18.12.1 版本的 Node.js|
|nvm install latest | 安装最新版的 Node.js|
|nvm uninstall 18.12.1 | 删除某个版本的 Node.js|
|nvm use 18.12.1 | 切换 18.12.1 的 Node.js|

安装 node：

```shell
nvm list available
nvm install 18.12.1
nvm use 18.12.1
```
