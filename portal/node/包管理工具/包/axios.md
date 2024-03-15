# axios

- [axios](#axios)
  - [axios 与 fetch 的区别](#axios-与-fetch-的区别)
    - [使用技术不同](#使用技术不同)
    - [兼容性](#兼容性)
    - [请求拦截器和响应拦截器](#请求拦截器和响应拦截器)
    - [响应超时](#响应超时)
    - [请求参数的格式](#请求参数的格式)
    - [响应数据格式的转化](#响应数据格式的转化)
    - [错误处理](#错误处理)

## axios 与 fetch 的区别

### 使用技术不同

1. `axios` 是基于 `promise` 实现对 `ajax` 技术的一种封装，而 `ajax` 是基于 `JS` 的 `XMLHttpRequest` 对象封装的
2. `fetch` 同样是基于 `promise`，但不是对 `ajax` 的封装， 和 `XMLHttpRequest` 对象也没有太多的关系，`fetch` 是 `JS` 的原生 `API` ，相较于 axios 对浏览器的性能有不错提升

### 兼容性

1. `Axios` 支持更广泛的浏览器和 `Node.js` 版本，
2. `Fetch` 只能在较新的浏览器中使用，或需要使用 `polyfill` 兼容旧版浏览器。

### 请求拦截器和响应拦截器

1. `Axios` 可以拦截请求和响应，可以全局配置默认的请求头等，
2. `Fetch` 目前不支持这些功能。

### 响应超时

1. `Axios` 设置响应超时非常简单，直接设置 `timeout` 属性就可以了

    ```js
    axios({
      method: "post",
      url: "http://example.com/",
      timeout: 4000, // 请求4秒无响应则会超时
      data: {
        firstName: "David",
        lastName: "Pollock",
      },
    })
      .then((response) => {
        /* 处理响应 */
      })
    ```

2. Fetch设置起来就远比Axios麻烦

### 请求参数的格式

1. `Axios` 请求的参数放到 `data` 属性中，以**对象**的方式进行传递，
2. `Fetch` 需要放到 `body` 属性中，以**字符串**的方式进行传递，这也就导致需要指定请求数据的格式为 `JSON` 格式，同时需要使用 `JSON.stringify` 将请求数据格式转换成 `JSON` 格式

Axios：

```js
axios({
    url: 'http://www.ggbone.com/post',
    method: 'POST',
    data: {
        name: 'GGBone',
        age: 18
    }
})
.then((res) => {
    console.log('请求成功');
    return res.json()
}, (err) => {
    console.log('请求失败原因：'+ err);
})
```

Fetch：

```js
fetch('http://www.ggbone.com/post', {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        name: 'GGBone',
        age: 18
    })
})
.then((res) => {
    console.log('请求成功');
    return res.json()
}, (err) => {
    console.log('请求失败原因：'+ err);
})
```

### 响应数据格式的转化

1. `Axios` 默认返回 `JSON` 格式的数据，
2. `Fetch` 返回的是 `Response` 对象，需要自己通过 `Response` 的方法（如 `json()、text()` 等）将结果转换成所需的格式。

Fetch提供的转化API有下面几种：

- arrayBuffer()
- blob()
- json()
- text()
- formData()

### 错误处理

1. `Axios` 对于请求错误可以直接抛出异常，方便进行错误处理，
2. `Fetch` 的错误处理比较繁琐，需要手动检查 `Response.ok` 属性。
   1. `try/catch` 用于在 `Promise` 被拒绝时获取错误（网络或 CORS 问题）
   2. `response.ok` 用于在 `Promise` 得到解决时处理服务器错误（例如 404 或 500）
