- [1. 初始化本地项目](#1-初始化本地项目)
- [2. 在 github 创建仓库](#2-在-github-创建仓库)
- [3. 本地项目添加远程，推送项目到远程](#3-本地项目添加远程推送项目到远程)


## 1. 初始化本地项目
1. 在要提交的项目的文件夹运行 `git init`
2. 新建 `.gitignore` 文件，配置 git 需要忽略的文件
3. 进行提交，输入以下命令
   1. `git add ./`
   2. `git commit -m ‘init’`

## 2. 在 github 创建仓库
创建仓库

## 3. 本地项目添加远程，推送项目到远程
添加远程
```
git remote add origin 项目地址
```
配置好了 可以通过 `git remote -v` 进行查看

推送项目
```
git push -u origin main
```