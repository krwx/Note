const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require('mime'); 

const server = http.createServer((request, response) => {
    // 获取请求路径
    const pathname = new URL(request.url, "http://127.0.0.1:9000").pathname;
    // 拼接路径
    const root = __dirname + "/page";
    const filePath = root + pathname;
    // 读取文件
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 注意：因为响应为中文，所以要设置 utf-8 。其他文件类型设置对应类型的 header
            response.setHeader("content-type", "text/html;charset=utf-8")
            // 根据错误展示对应提示
            switch(err.code){
                case 'ENOENT':
                  response.statusCode = 404;
                  response.end('<h1>404 Not Found</h1>');
                  break;
                case 'EPERM':
                  response.statusCode = 403;
                  response.end('<h1>403 Forbidden</h1>');
                  break;
                default:
                  response.statusCode = 500;
                  response.end('<h1>Internal Server Error</h1>');
                  break;
            }
            return;
        }
        // 获取文件的后缀名
        const ext = path.extname(pathname).slice(1);
        // 设置 content-type 响应头
        const type = ext == "html" ? mimes[ext] + ";charset=utf-8" : mimes[ext] || "application/octet-stream";
        response.setHeader("content-type", type);

        response.end(data);
    })
})

server.listen(9000, () => {
    console.log("服务已经启动");
})