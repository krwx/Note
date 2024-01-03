const http = require("http");

const server = http.createServer((request, response) => {
    // 获取请求的方法
    // console.log(request.method); // GET

    // 获取请求的 url，只包含 url 中的路径与查询字符串
    // console.log(request.url); // /search?keyword=html&num=1

    // 获取 HTTP 协议的版本号
    // console.log(request.httpVersion);

    // 获取 HTTP 的请求头
    /* console.log(request.headers);
    console.log(request.headers.host); */

    // 获取请求体，使用 body 变量保存
    let body = "";
    // 绑定 data 事件，每有数据传输过来执行回调函数，chunk 代表传递的数据，为 buffer 类型
    request.on("data", chunk => {
        body += chunk; // 这里加运输自动将 buffer 转 string
        // body += chunk.toString(); // 这样也可以
    })
    // 绑定 end 事件
    request.on("end", () => {
        console.log(body);

        // 设置响应
        response.setHeader("content-type", "text/html;charset=utf-8")
        response.end("你好");
    })
})

server.listen(9000, () => {
    console.log("服务已经启动");
})