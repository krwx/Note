# 克隆
git clone `[url]`

# 查看状态
git status

# 添加文件
git add .

# 提交
git commit -m `[description]`

# 上传
格式：  
git push <远程主机名> <本地分支名>:<远程分支名>

如果本地分支名与远程分支名相同，则可以省略冒号：  
git push <远程主机名> <本地分支名>

github:
git push origin main

项目用到的：
git push origin HEAD:refs/for/master

# 拉最新的代码
git pull -r