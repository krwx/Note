# git stash

贮藏（stash）会处理工作目录的脏的状态——即跟踪文件的修改与暂存的改动——然后将未完成的修改保存到一个栈上， 而你可以在任何时候重新应用这些改动（甚至在不同的分支上）。

- [git stash](#git-stash)
  - [贮藏修改](#贮藏修改)
  - [查看贮藏](#查看贮藏)
  - [应用贮藏](#应用贮藏)
    - [`git stash apply` 和 `git stash pop` 的区别](#git-stash-apply-和-git-stash-pop-的区别)
  - [删除贮藏](#删除贮藏)
  - [查看差异](#查看差异)

## 贮藏修改

贮藏修改，将新的贮藏推送到栈上，运行 `git stash` 或 `git stash push`

```sh
$ git stash
Saved working directory and index state \
  "WIP on master: 049d078 added the index file"
HEAD is now at 049d078 added the index file
(To restore them type "git stash apply")
```

贮藏的同时添加贮藏信息：`git stash save "info"`

## 查看贮藏

查看贮藏的东西，可以使用 `git stash list`

```sh
$ git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log
```

## 应用贮藏

使用 `git stash apply` 应用贮藏：

- `git stash apply`：不指定一个贮藏，Git 认为指定的是最近的贮藏
- `git stash apply stash@{2}`：通过名字指定应用某个贮藏
  - 名字的格式一定为 `stash@{number}`

```sh
$ git stash apply
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   index.html
	modified:   lib/simplegit.rb

no changes added to commit (use "git add" and/or "git commit -a")
```

也可以使用 `git stash pop` 应用贮藏：

- `git stash pop`：不指定一个贮藏，Git 认为指定的是最近的贮藏
- `git stash pop stash@{2}`：通过名字指定应用某个贮藏
  - 名字的格式一定为 `stash@{number}`

### `git stash apply` 和 `git stash pop` 的区别

- `git stash pop` 命令会在 `stash` 应用之后丢弃 `stash`（默认情况下指的是最顶部的）
  - 除非 `git stash pop` 后存在冲突，在这种情况下，它将不会删除该 `stash`
- `git stash apply` 会将其保留在存储列表中，以备日后重用

`git stash pop` = `git stash apply` && `git stash drop`

## 删除贮藏

删除一个贮藏，使用 `git stash drop [stash_id]`  
如果不指定stash_id，则默认删除最新的存储进度。

```sh
git stash drop 
git stash drop stash@{0}
```

清除所有的存储进度：`git stash clear`

## 查看差异

使用 `git stash show` 查看堆栈中最新保存的 stash 和当前目录的差异。

```sh
git stash show

# 指定查看哪个 stash
git stash show stash@{1}

# 查看差异的详细信息
git stash show -p 
```
