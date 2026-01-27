# kn

项目难点

1. 同时发送两个验证用户名和邮件地址的请求，请求返回后需要各自处理响应，然后都处理完后再进行业务处理，且两个请求是同时进行的
   1. 只使用 async await 是做不到两个请求同时发出然后同时处理响应
   2. 解决。用 promise.then 处理响应，得到两个 promise，然后调用 Promise.allSettled().then() 最后对两个 promise 进行处理

需求

解决

总结

## 项目

### SeaRatesView

**fe**：

技术栈：vue 3.5 + vite 6.4 + pinia 3 + element-plus 2.13 + axios 1.13 + vue-router 4.5 + typescript + wangEditor 5.1.23

1. 查询报错页面显示错误框。
2. 实现发送邮件和创建 ticket 的模态框，可以在富文本编辑器编辑邮件内容和 ticket 内容
3. 实现展示 rate info 的组件
4. 根据 dev、prod 环境配置 vite，动态切换 api url
5. 封装错误提示框组件
6. 搜索条件添加 commodity、client 两个输入框
7. 登录流程验证用户名、密码输入框，按下回车后能自动聚焦到下一个输入框，最后一个输入框按下回车后能提交表单
8. 使用 tooltip 和 icon 显示 rate remark
9. 前端访问部署在服务器的 Celery Flower 监控页面，带权限控制

**be**：

技术栈：python 12 + django + sqlAlchemy + O365

1. 实现发送邮件和创建 ticket 的 API 接口。使用 O365 发送邮件
2. 部署 django 程序到 apache 服务器，使用 IIS 进行路由转发
3. 添加 task error info 的 api
4. 添加搜索 ldap 用户名和邮箱地址的 api。添加搜索 jira 用户名的 api

**celery**：

技术栈：python 12 + celery + sqlAlchemy + pandas + rabbitmq + sql server

1. 设计主程序，找合适的技术栈： celery。确定架构设计和大概业务流程，设计 query、format 和 issue checker 等 task 完成业务流程
2. celery 配置
   1. 设置 logger
   2. 重试任务。数据库操作失败也重试任务
   3. 保存任务结果到数据库
   4. worker 挂掉后重启 worker
3. 使用 lru cache 保存 issue 表数据
4. 部署前端和后端到 Apache 服务器，使用 IIS 进行路由转发，部署 Celery worker 到 windows 服务器。创建 script 脚本方便运行 Celery worker
5. Celery 保存错误信息到数据库
6. 分配资源给不同的 task 和 worker，提高程序的运行速度。
7. 使用 SolarWinds Database Performance Analyzer 分析数据库 sql 的运行效率，优化 sql 语句。大数据查询的时间减了一半
8. 使用 pandas 转换 rate 的 XML 数据，插入数据库
9. 当程序报错时发送邮件通知管理员

### fxap2.0

技术栈：python 11 + openpyxl + pandas

1. combine zip file into one file
2. compare zip file
