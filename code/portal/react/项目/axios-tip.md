# axios-tip

- [axios-tip](#axios-tip)
  - [get 请求获取数据](#get-请求获取数据)

## get 请求获取数据

`axios.get(url).then(res => ...)` 的 res 的结构如下：

```json
{
    "data": {
        "code": "0000",
        "msg": "读取成功",
        "data": "123"
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "384",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {// ...},
    "request": {}
}
```

`res.data` 才是服务器返回的数据
