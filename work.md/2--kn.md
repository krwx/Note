# kn

项目难点

1. 同时发送两个验证用户名和邮件地址的请求，请求返回后需要各自处理响应，然后都处理完后再进行业务处理，且两个请求是同时进行的
   1. 只使用 async await 是做不到两个请求同时发出然后同时处理响应
   2. 解决。用 promise.then 处理响应，得到两个 promise，然后调用 Promise.allSettled().then() 最后对两个 promise 进行处理

需求

解决

总结

1. combine zip file into one file
2. compare zip file
3. 做 searatesview 2.0
   1. 找合适的技术栈
   2. 确定架构设计和大概业务流程
