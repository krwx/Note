# git

- [git](#git)
  - [概念](#概念)
    - [冲突](#冲突)
      - [二进制文件冲突](#二进制文件冲突)
    - [放弃修改](#放弃修改)
    - [commit](#commit)
    - [取消 git 配置](#取消-git-配置)
  - [代码托管平台](#代码托管平台)
  - [流程](#流程)
    - [pull](#pull)
    - [在 develop 分支改动完后的流程](#在-develop-分支改动完后的流程)
    - [git 流程解释](#git-流程解释)
      - ["Merge branch 'master' of ssh://..."](#merge-branch-master-of-ssh)
      - ["Merge branch 'master' into 'kevin\_DEV'"](#merge-branch-master-into-kevin_dev)
  - [git flow](#git-flow)
  - [查看配置](#查看配置)
    - [查看全局配置](#查看全局配置)
    - [查看仓库级别的配置](#查看仓库级别的配置)
    - [查看系统级别的配置](#查看系统级别的配置)
    - [查看特定配置项的值](#查看特定配置项的值)
  - [设置](#设置)

## 概念

带 `origin` 字眼的是远端分支

`git pull` = `git fetch` + `git merge`

### 冲突

#### 二进制文件冲突

二进制文件以 example.pdf 为例

1、决定要保留的版本

你可以选择保留本地版本或远程版本的 example.pdf。使用以下命令来选择版本：

```sh
# 保留你的本地版本（HEAD）：
git checkout --ours example.pdf

# 保留远程版本：
git checkout --theirs example.pdf
```

2、标记冲突为已解决

选择完要保留的版本后，使用 git add 将文件标记为冲突已解决：

```sh
git add example.pdf
```

在软件或编辑器操作：

- vscode 操作不了
  - 解决冲突是通过改变文件内容（即代码）解决的。对于二进制文件 vscode 读取不了，只是单纯改 oid ，这样解决不了冲突，还会导致文件崩坏
- Source Tree 可以操作
  - 在 SourceTree 点击 solve conflict ，选择 accept current 或 accept incoming 。这里是直接替换了文件。

### 放弃修改

1、未使用 `git add` 缓存代码

```sh
git checkout --filename
git checkout .              # 放弃所有修改
```

2、已使用 `git add` 缓存代码，未使用 `git commit`

```sh
git reset HEAD filename
git reset HEAD              # 放弃所有文件修改
```

reset 后的修改会回到工作区，如果还要放弃修改，再运行 `git checkout .`

3、已经使用 `git commit` 提交了代码

```sh
# 丢弃所有的更改
git reset --hard HEAD^      # 回退到上一次commit的修改状态
git reset --hard commit id  # 回退到任意版本

# 保留工作区和暂存区的内容
git reset --soft HEAD^ 
```

### commit

```sh
# 将暂存区内容提交到版本库, 进入 vi 命令界面输入提交信息
git commit

# 将某些已被跟踪的文件提交到版本库（包含工作区和版本库）
git commit [file1] [file2] [...]

# 将暂存区内容提交到版本库, 无需进入 vi 命令界面输入提交信息
git commit -m [message]

# 跳过 git add, 将所有已被跟踪的文件更改提交到版本库
git commit -am [message]

# 使用一次新的commit, 替代上一次提交
# 如果代码没有任何新变化, 则用来改写上一次commit的提交信息
git commit --amend -m [message]
```

### 取消 git 配置

删除 `.git` 文件夹

## 代码托管平台

- Github
- Gitee
- Bitbucket

## 流程

- git add .
- git commit -m ""
- git pull
- git push

### pull

- 提交代码时，commit 后再 pull
- 不提交代码时
  - 当要 pull 下来的修改的文件没有本地修改的文件时，可以直接 pull
  - 当要 pull 下来的修改的文件有本地修改的文件时
    - 直接 pull 会报本地修改的文件和远端修改的文件冲突，无法 pull
    - 所以先 stash 后再 pull，pull 完然后 pop stash，如果有冲突不会删除 stash，会保留 stash；如果没有冲突则会删除 stash

### 在 develop 分支改动完后的流程

- 在 `develop` 分支 `commit`
- 切换到 `master` 分支
- `master` 分支 `merge develop` 分支
  - 如果 merge 时有冲突的话，需要在文件内修改代码来解决冲突，然后在 `source tree` mark resolved
- 切换到 `develop` 分支
- `develop` 分支 `merge master` 分支
  - 如果上面有冲突的地方已解决冲突，那么此时 `merge develop` 分支不会有冲突，因为已经 resolved 。文件的内容为已解决冲突后的内容
  - `develop` 分支要 `merge master` 分支的原因：更新 develop 分支的代码，确保与 master 分支的内容保持一致
- `push` `master` 和 `develop` 分支
  - 这时两条线会合并到一起，即 develop 的线合并到 master 的主线上

### git 流程解释

#### "Merge branch 'master' of ssh://..."

- 出现这个 `merge` 的原因是两个人同时对 `master` 分支进行改动
- 假设 A 和 B 同时对 master 分支改动，B 改动完 push 到 master 分支。A 这时 pull ，并 push 到 master 分支。因为 A 不是基于 B 的改动改动的，所以 A 这时的 master 分支为主线，B 的 master 分支会叉出另一条线，然后合并到 A 这条主线，代表 A merge 了 B 的改动 (`git1`)
- 如果 A 基于 B 的改动 改动，那么就会是一条线 (`git2`)
- 出现该情况的操作
  - sourceTree
    - A commit 之后执行 pull ，需要手动 commit "merge B"
  - git bash
    - A commit 之后执行 pull，会自动监测是否需要 commit "merge B" ，需要的话会让输入 commit 的信息，然后自动 commit
- 出现这种情况总共会 commit 2 次，push 1 次

git1：![git1](./img/git1.png) 。A 为蓝色的线，B 为绿色的线

git2: ![git2](./img/git2.png)

#### "Merge branch 'master' into 'kevin_DEV'"

- merge `master` 分支到 `kevin_DEV` 分支
- 这时主线应该是 `kevin_DEV` 分支， `master` 为叉出来的分支

## git flow

```txt
1、git merge master
2、解决冲突
3、commit
4、git push
```

## 查看配置

查看 Git 配置的方法取决于你想查看的是全局配置还是特定仓库的配置。Git 配置可以分为三个级别：

1. 系统级别 (`--system`): 应用于系统中所有用户和所有仓库。
2. 全局级别 (`--global`): 应用于当前用户的所有仓库。
3. 仓库级别 (`--local`): 应用于特定的仓库。

### 查看全局配置

要查看当前用户的全局 Git 配置，你可以使用以下命令：

```bash
git config --global --list
```

### 查看仓库级别的配置

要查看特定仓库的 Git 配置，首先需要进入该仓库的目录，然后使用以下命令：

```bash
git config --local --list
```

或者更常用的是省略 `--local` 选项，因为这是默认选项：

```bash
git config --list
```

### 查看系统级别的配置

要查看系统级别的 Git 配置，你需要有足够的权限（通常是管理员或超级用户），然后使用以下命令：

```bash
git config --system --list
```

### 查看特定配置项的值

如果你只想查看某个特定配置项的值，可以指定配置项的名称，例如，查看用户的名字：

```bash
git config --global user.name
```

或者查看仓库级别的用户邮箱：

```bash
git config --local user.email
```

或者系统级别的用户签名：

```bash
git config --system user.signingkey
```

## 设置

```sh
#set user name
git config&nbsp;--global user.name “Your Name”

#set email
git config&nbsp;--global user.email “your.mailbox@abc.com”

#generate ssh key
ssh-keygen -t ed25519 -C “your.mailbox@abc.com”

#copy ssh key
clip < ~/.ssh/id_ed25519.pub

#to paste SSH key in git.int.com
#test for the setting is working or not
ssh -T git@git.int.com

ssh -T git@gitlab.aws.int.kn
```
