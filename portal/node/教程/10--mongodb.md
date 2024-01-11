- [一、简介](#一简介)
  - [1.1 Mongodb 是什么](#11-mongodb-是什么)
  - [1.2 数据库是什么](#12-数据库是什么)
  - [1.3 数据库的作用](#13-数据库的作用)
  - [1.4 数据库管理数据的特点](#14-数据库管理数据的特点)
  - [1.5 为什么选择 Mongodb](#15-为什么选择-mongodb)
- [二、核心概念](#二核心概念)
- [三、下载安装与启动](#三下载安装与启动)


# 一、简介
## 1.1 Mongodb 是什么
MongoDB 是一个基于分布式文件存储的数据库，官方地址 https://www.mongodb.com/

## 1.2 数据库是什么
数据库（DataBase）是按照数据结构来组织、存储和管理数据的 应用程序

## 1.3 数据库的作用
数据库的主要作用就是 管理数据 ，对数据进行 增（c）、删（d）、改（u）、查（r）

## 1.4 数据库管理数据的特点
相比于纯文件管理数据，数据库管理数据有如下特点：
1. 速度更快
2. 扩展性更强
3. 安全性更强

## 1.5 为什么选择 Mongodb
操作语法与 JavaScript 类似，容易上手，学习成本低

# 二、核心概念
Mongodb 中有三个重要概念需要掌握
- 数据库（database） 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合
- 集合（collection） 集合类似于 JS 中的数组，在集合中可以存放很多文档
- 文档（document） 文档是数据库中的最小单位，类似于 JS 中的对象

# 三、下载安装与启动
下载地址： https://www.mongodb.com/try/download/community

建议选择 `zip` 类型， 通用性更强

安装到 C 盘的配置步骤如下:
1. 将压缩包移动到 `C:\Program Files` 下，然后解压
2. 创建 `C:\data\db` 目录，`mongodb` 会将数据默认保存在这个文件夹
3. 以 `mongodb` 中 `bin` 目录作为工作目录，启动命令行
4. 运行命令 `mongod`

安装其他盘的配置步骤：
1. 将压缩包移动到自定义目录，然后解压
2. 创建了一个和 `bin` 目录同级 `data\db` 目录来存储 `MongoDB` 产生的数据
3. 配置环境变量。在系统变量中添加 `MongoDB` 的 `bin` 地址。
   1. 例如：我这里添加了`D:\study\software\mongodb-win32-x86_64-windows-5.0.14\bin`
4. 进入 `bin` 目录下，`cmd` 进入 命令行窗口，使用命令的指定存储数据文件的形式启动：`mongod --dbpath=..\data\db`。启动之后可以看到 `MongoDB` 的默认端口是 27017
   1. 游览器上输入：`localhost:27017`，看到 `It looks like you are trying to access MongoDB over HTTP on the native driver port.` 就能证明 `MongoDB` 启动成功
5. 然后可以使用 `mongo` 命令连接本机的 `mongodb` 服务

> 注意：
> - 千万不要选中服务端窗口的内容 ，选中会停止服务，可以 敲回车 取消选中
> - 要用 `cmd/powershell` 启动，不要用 `git bash` 启动，会启动不了