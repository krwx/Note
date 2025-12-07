# git 安装

1. 去官网下载 `git` 安装包，运行安装包，安装 `git`
2. 配置用户名和邮箱

   ```shell
    git config --global user.name <用户名>
    git config --global user.email <邮箱>
   ```

3. 设置行尾为 `lf`

   ```shell
    git config --global core.autocrlf input
   ```

   `vscode` 也要设置 `lf`
4. 生成 ssh key ，github 添加 ssh key，这样就可以通过 ssh 的方式克隆项目
