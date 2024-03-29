# git 命令

- [git 命令](#git-命令)
  - [克隆](#克隆)
  - [查看状态](#查看状态)
  - [添加文件](#添加文件)
  - [提交](#提交)
  - [上传](#上传)
    - [参数](#参数)
  - [拉最新的代码](#拉最新的代码)
  - [配置](#配置)
    - [查看配置](#查看配置)
    - [用户名、邮箱](#用户名邮箱)
    - [代理](#代理)
      - [配置 http 代理](#配置-http-代理)
      - [查看代理](#查看代理)
      - [取消代理](#取消代理)

## 克隆

```shell
git clone `[url]`
```

## 查看状态

```shell
git status
```

## 添加文件

```shell
git add .
```

## 提交

```shell
git commit -m `[description]`
```

## 上传

格式：

```shell
git push <远程主机名> <本地分支名>:<远程分支名>
```

如果本地分支名与远程分支名相同，则可以省略冒号：  

```shell
git push <远程主机名> <本地分支名>
```

github:

```shell
git push origin main
```

项目用到的：

```shell
git push origin HEAD:refs/for/master
```

### 参数

- `-u`
  - 例子：`git push -u origin main`
  - `-u` 参数表示 `upstream` ，是“上游”的意思，意思是指定本地分支和远程分支的关联关系。一旦设定以后就可以使用 `git push` 这种简写形式了。`git` 就知道本地的分支要上传到哪个远程仓库，哪个分支。

## 拉最新的代码

```shell
git pull -r
```

## 配置

### 查看配置

查看所有配置

```shell
git config --list
```

### 用户名、邮箱

```shell
git config --global user.name <用户名>
git config --global user.email <邮箱>
```

### 代理

#### 配置 http 代理

vpn：代理IP地址和端口号可以通过 Windows 中的代理服务器设置中，点击编辑按钮看到

```shell
git config --global http.proxy <代理IP地址>:<端口号>

git config --global http.proxy 127.0.0.1:11223
git config --global https.proxy 127.0.0.1:11223
```

#### 查看代理

```shell
git config --global --get http.proxy
git config --global --get https.proxy
```

#### 取消代理

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```
