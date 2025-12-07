# git 命令

- [git 命令](#git-命令)
  - [clone](#clone)
  - [status](#status)
  - [add](#add)
  - [commit](#commit)
  - [push](#push)
  - [pull](#pull)
  - [check out](#check-out)
  - [stash](#stash)
  - [config](#config)
    - [查看配置](#查看配置)
    - [用户名、邮箱](#用户名邮箱)
    - [代理](#代理)
      - [配置 http 代理](#配置-http-代理)
      - [查看代理](#查看代理)
      - [取消代理](#取消代理)
  - [restore](#restore)

## clone

```shell
git clone `[url]`
```

## status

```shell
git status
```

## add

```shell
git add .
```

## commit

```shell
git commit -m `[description]`
```

## push

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

参数：

- `-u`
  - 例子：`git push -u origin main`
  - `-u` 参数表示 `upstream` ，是“上游”的意思，意思是指定本地分支和远程分支的关联关系。一旦设定以后就可以使用 `git push` 这种简写形式了。`git` 就知道本地的分支要上传到哪个远程仓库，哪个分支。

## pull

```shell
git pull -r
```

## check out

- `git checkout branch`
  - 表示切换分支
- `git check out [-b] branch`
  - 表示以当前分支的当前状态创建新分支并切换到新分支
  - `-b` 表示创建新分支

## stash

- `git statsh`
  - 存储工作区和缓存区
  - `git stash save "test1"` ：可以为本次存储起名字
- `git stash list`
  - 查看之前存储的所有版本列表
- `git stash pop [stash_id]`
  - 恢复具体某一次的版本，如果不指定 `stash_id` ，则默认恢复最新的存储进度

## config

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

## restore

`git restore` 命令用于恢复或撤销文件的更改。  
`git restore` 可以恢复工作区和暂存区中的文件，也可以用于丢弃未提交的更改。

语法：`git restore [<options>] [<pathspec>...]`

- `<pathspec>`：要恢复的文件或目录路径。
- `<options>`：用于定制恢复行为的选项。

options 的取值：

- `--source=<commit>`, `-s=<commit>`
  - 从指定的提交中恢复文件内容。默认为 `HEAD`，即从当前提交恢复。
  - `git restore --source=HEAD~1 file.txt`
- `--staged`, `-S`
  - 恢复暂存区中的文件内容到工作区，即将 `git add .` 的文件恢复
  - `git restore --staged file.txt`
- `--worktree`, `-W`
  - 恢复工作区中的文件，即丢弃对文件的所有未提交更改
  - `git restore file.txt`
  - `git restore --worktree file.txt`
- `-ours`
  - 在合并冲突时，恢复为当前分支的版本（即"我们"的版本）。
  - `git restore --ours file.txt`
- `--theirs`
  - 在合并冲突时，恢复为另一个分支的版本（即"他们"的版本）。
  - `git restore --theirs file.txt`

实例：

- 显示将要恢复的文件和路径，而不实际进行恢复
  - `git restore --dry-run`
- 恢复多个文件
  - `git restore file1.txt file2.txt`
