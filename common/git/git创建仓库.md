# git 创建仓库

- [git 创建仓库](#git-创建仓库)
  - [1. 初始化本地项目](#1-初始化本地项目)
  - [2. 在 github 创建仓库](#2-在-github-创建仓库)
  - [3. 本地项目添加远程，推送项目到远程](#3-本地项目添加远程推送项目到远程)

## 1. 初始化本地项目

1. 在要提交的项目的文件夹运行以下命令
   1. `git init`
   2. `git add README.md`
2. 新建 `.gitignore` 文件，配置 git 需要忽略的文件
3. 进行提交，输入以下命令
   1. `git add ./`
   2. `git commit -m ‘init’`
   3. `git branch -M main`

## 2. 在 github 创建仓库

1. 在 `Repositories` 界面点击 `New` 按钮
2. 输入仓库名
3. 不要勾选 `Add a README file`
4. 点击 `Create Repository` 按钮

## 3. 本地项目添加远程，推送项目到远程

添加远程

```shell
git remote add origin 项目地址
```

配置好了 可以通过 `git remote -v` 进行查看

推送项目

```shell
git push -u origin main
```
