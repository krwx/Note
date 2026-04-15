# Source Tree

- [Source Tree](#source-tree)
  - [使用](#使用)
    - [克隆仓库](#克隆仓库)
    - [克隆远端分支](#克隆远端分支)
    - [推送分支（push）](#推送分支push)
    - [Git-flow](#git-flow)
      - [管理 Feature 分支](#管理-feature-分支)
  - [注意点](#注意点)

## 使用

### 克隆仓库

步骤：

1. 在 Source Tree 中点击 `Clone` 按钮，输入远程仓库的 URL 地址，选择本地存储路径，然后点击 `Clone` 按钮即可克隆仓库到本地。
   - 克隆仓库到本地，默认只克隆默认分支

2. `Advanced Options` 中有 `checkout branch` 下拉框，可以选择一个分支，选择之后会在克隆完仓库后 checkout 到该分支。本地只有 1 个分支，即选择的分支，没有默认分支。
   - 相当于执行 `git clone --branch <branch_name> <repository_url>` 命令，

### 克隆远端分支

步骤：

1. 打开仓库界面。在 SourceTree 左侧的 **“BRANCHES”** (分支) 面板下，你只能看到 `develop` 分支（或 `master`）。

2. 展开 **“Remotes”** (远程) -> **“origin”**，你将能看到所有远端分支。下面以 `origin/master` 为例，说明如何将远端分支克隆到本地。

3. 右键点击 `origin/master` 这个远程分支，在弹出的菜单中选择 **“Checkout origin/master”**。

4. 然后会弹出 `Checkout` 对话框，在对话框中，SourceTree 在 `New local branch name` 输入框会自动推荐一个本地分支名 `master`，通常保持默认就好，点击 **“OK”** 确认。

5. 完成后，你就能在 **“BRANCHES”** 面板下看到 `master` 分支了，并且它会自动跟踪对应的远程分支。

### 推送分支（push）

步骤：

1. 点击 SourceTree 上方的 **“Push”** 按钮，打开 `Push` 对话框。
2. 勾选要推送的分支，选择远程仓库（通常是 `origin`），然后点击 **“Push”** 按钮即可将本地分支推送到远程仓库。

### Git-flow

SourceTree 内置了对 Git-flow 的支持，可以帮助你更方便地使用 Git-flow 进行分支管理。

[参考博客](https://cloud.tencent.com/developer/article/2372075)

> 使用 Sourcetree 的 Git Flow 功能时，它的**所有操作都严格在本地执行**，不会直接改动远程仓库。要让远程仓库同步本地改动，必须手动推送。

#### 管理 Feature 分支

1. 新建 Feature 分支：

   - 在 SourceTree 中，点击顶部的 **“Git Flow”** 按钮，选择 **“Start New Feature”**，输入 Feature 分支的名称（例如 `feature/login`），然后点击 **“OK”**。SourceTree 会自动从 `develop` 分支创建一个新的 Feature 分支。

   - 后续功能在分支上 commit，然后 push 到远端，远端会创建该 feature 分支。

2. 完成 Feature 分支：

   - 当 Feature 分支开发完成后，点击 **“Git Flow”** 按钮，选择 **“Finish Feature”**，SourceTree 会自动将 Feature 分支合并回 `develop` 分支，并删除本地的 Feature 分支。

   - 注意：SourceTree 不会自动删除远程的 Feature 分支，你需要手动推送删除操作来删除远程的 Feature 分支。有三种方式：
       1. 在 SourceTree 中，右键点击远程的 Feature 分支，选择 **“Delete”** 来删除远程分支。
       2. 在命令行中执行 `git push origin --delete feature/login` 来删除远程分支。
       3. 点击 SourceTree 上方的 **“Push”** 按钮，在 `Push` 对话框中，勾选要删除的远程分支（通常会显示为 `origin/feature/login`），然后点击 **“Push”** 按钮，SourceTree 会自动推送删除操作来删除远程分支。

## 注意点

- 通常叉出来的分支没有指定分支名的话，通常都是 `master` 分支的改动。
- 不能完全根据分支的颜色判断是什么分支，因为分支的颜色会变，要根据 `merge` `branch` 的信息判断
