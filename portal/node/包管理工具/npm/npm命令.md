- [安装包](#安装包)
- [删除包](#删除包)
- [清除缓存](#清除缓存)
- [强制重新build](#强制重新build)
- [查看配置列表](#查看配置列表)
- [设置国内镜像](#设置国内镜像)
- [设置官网镜像](#设置官网镜像)
- [登录](#登录)
- [发布](#发布)
- [搜索包](#搜索包)
- [查看全局安装包的位置](#查看全局安装包的位置)

# 安装包
- npm install （安装所有包）
  - 生产环境
    - npm i -S <包名>
    - npm i --save <包名>
  - 开发环境
    - npm i -D <包名>
    - npm i --save-dev <包名>
  - 全局安装
    - npm i -g <包名>
  - 安装指定版本
    - `npm i jquery@1.11.2`

# 删除包
- npm uninstall <包名>
- `npm uninstall [<@scope>/]<pkg>...`
  - 别名: `unlink, remove, rm, r, un`
  - 全局删除
    - npm remove -g nodemon

# 清除缓存
- npm cache clean

# 强制重新build 
- npm rebuild

# 查看配置列表
- npm config list

# 设置国内镜像
- `npm config set registry https://registry.npmmirror.com`

# 设置官网镜像
- `npm config set registry https://registry.npmjs.org`
# 登录
- npm login

# 发布
- npm publish

# 搜索包
- npm s [包名]

# 查看全局安装包的位置
- npm root -g