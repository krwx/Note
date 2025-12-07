# axios

- [axios](#axios)
  - [axios() 函数](#axios-函数)
    - [axios(config)](#axiosconfig)
    - [axios(url\[, config\])](#axiosurl-config)
    - [请求方式别名](#请求方式别名)
  - [Axios 实例](#axios-实例)
    - [直接使用配置对象调用实例: instance(config)](#直接使用配置对象调用实例-instanceconfig)
  - [请求配置](#请求配置)
  - [响应结构](#响应结构)
  - [默认配置](#默认配置)
    - [全局 axios 默认值](#全局-axios-默认值)
    - [自定义实例默认值](#自定义实例默认值)
    - [配置的优先级](#配置的优先级)
  - [拦截器](#拦截器)
    - [拦截器顺序](#拦截器顺序)
    - [请求拦截的错误处理](#请求拦截的错误处理)
    - [请求拦截器不推荐返回 Promise.reject()](#请求拦截器不推荐返回-promisereject)
      - [解决方案](#解决方案)
  - [错误处理](#错误处理)

## axios() 函数

可以向 `axios()` 函数传递相关配置来创建请求

### axios(config)

```js
// 发起一个post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

```js
// 在 node.js 用GET请求获取远程图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

### axios(url[, config])

```js
// 发起一个 GET 请求 (默认请求方式)
axios('/user/12345');
```

### 请求方式别名

为了方便起见，已经为所有支持的请求方法提供了别名。

- axios.request(config)
- `axios.get(url[, config])`
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- `axios.post(url[, data[, config]])`
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])
- axios.postForm(url[, data[, config]])
- axios.putForm(url[, data[, config]])
- axios.patchForm(url[, data[, config]])

```js
axios.get(url).then((response) => {
    // ...
})

axios.post(url, data).then((response) => {
    // ...
})
```

## Axios 实例

您可以使用自定义配置新建一个实例，使用 `axios.create([config])` 创建实例。

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.get(url).then((response) => {
    // ...
})

instance.post(url, data).then((response) => {
    // ...
})
```

### 直接使用配置对象调用实例: instance(config)

除了像 `instance.get()` 或 `instance.post()` 这样的便捷方法外，您还可以直接用配置对象调用 Axios 实例。这与 `axios(config)` 的用法相同，适用于需要基于原始配置重新发送请求的场景。

```js
const instance = axios.create({ baseURL: '/api' });

// 类似于 axios(config)
instance({
  url: '/users',
  method: 'get'
});
```

这种方式便于实现重试逻辑，例如处理认证失败时：

```js
instance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    await refreshToken();
    return instance(error.config); // 重新发送原始请求
  }

  throw error;
});
```

## 请求配置

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `GET` 方法。

常用配置：

- timeout
  - 超时时间，单位为毫秒

```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理

    return data;
  }],

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个可选配置，允许您自定义序列化 `params`。
  paramsSerializer: {

    //自定义编码器函数，以迭代方式发送键/值对。
    encode?: (param: string): string => { /* 在这里进行自定义操作并返回转换后的字符串 */ }, 
    
    // 整个参数的自定义序列化器函数。允许用户模仿 1.x 之前的行为。
    serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions ), 
    
    //用于格式化参数中数组索引的配置。
    indexes: false // 三个可用选项：
    // (1) indexes: null (导致没有括号), 
    // (2) (default) indexes: false (导致空括号),
    // (3) indexes: true (引导空字符串).    
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  
  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },

  // `auth` HTTP Basic Auth
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

  // `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
  // 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // 默认值

  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

  // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 5, // 默认值

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别定义了在 node.js 中执行 http 和 https 请求时使用的自定义代理。
  // 这允许添加诸如 `keepAlive` 之类的选项，这些选项在 Node.js v19.0.0 之前默认未启用。
  // 在 Node.js v19.0.0 之后，不再需要自定义代理来启用 `keepAlive`，
  // 因为 `http.globalAgent` 已经默认启用了 `keepAlive`。
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // see https://axios-http.com/zh/docs/cancellation
  cancelToken: new CancelToken(function (cancel) {
  }),

  // `decompress` indicates whether or not the response body should be decompressed 
  // automatically. If set to `true` will also remove the 'content-encoding' header 
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // 默认值

}
```

## 响应结构

一个请求的响应包含以下信息。

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

当使用 `then` 时，您将接收如下响应:

```js
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

## 默认配置

您可以指定默认配置，它将作用于每个请求。

### 全局 axios 默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 自定义实例默认值

```js
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 配置的优先级

配置将会按优先级进行合并。它的顺序是：

- 在 `lib/defaults/index.js` 中找到的库默认值
- 然后是实例的 `defaults` 属性
- 最后是请求的 `config` 参数

**后面的优先级要高于前面的**。下面有一个例子。

```js
// 使用库提供的默认配置创建实例
// 此时超时配置的默认值是 `0`
const instance = axios.create();

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 2500;

// 重写此请求的超时时间，因为该请求需要很长时间
instance.get('/longRequest', {
  timeout: 5000
});
```

## 拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

语法：

```js
axios.interceptors.request.use(onFulfilled, onRejected)
axios.interceptors.response.use(onFulfilled, onRejected)
```

- onFulfilled
  - 一个函数，接收 `config` 或 `response` 作为参数
  - 必须返回 `config` 或 `response`，或返回一个 `Promise`，否则请求/响应将被中断
- onRejected
  - 一个函数，接收 `error` 作为参数
  - 处理上一个拦截器的错误
  - 必须返回 `Promise.reject(error)`，否则请求/响应将被中断

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你稍后需要移除拦截器，使用 `eject()`：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以给自定义的 axios 实例添加或移除拦截器。

```js
const instance = axios.create();
const myInterceptor = instance.interceptors.request.use(function () {/*...*/});
instance.interceptors.request.eject(myInterceptor);
```

### 拦截器顺序

请求拦截器 先声明 晚执行，响应拦截器 先声明 先执行。

声明的顺序：

```txt
request interceptor 1
request interceptor 2
response interceptor 1
response interceptor 2
```

执行的顺序：

```txt
request interceptor 2
request interceptor 1
response interceptor 1
response interceptor 2
```

### 请求拦截的错误处理

这里的错误包括 返回 Promise.reject() 或抛出异常。

首先声明了两个请求拦截器。

```txt
request interceptor 1
request interceptor 2
```

- interceptor 1 抛出错误
  - 按执行顺序，interceptor 1 是最晚执行的，抛出的错误会直接传递到 **请求函数（发送请求的地方）的 catch 中**
- interceptor 2 抛出错误
  - 按执行顺序，interceptor 2 是最先执行的，抛出的错误会传递到 interceptor 1 的 onRejected 中

### 请求拦截器不推荐返回 Promise.reject()

确实可以在第一个回调中返回 `Promise.reject`，但这会**中断请求流程**：

```javascript
service.interceptors.request.use(
  (config) => {
    // 某些条件下拒绝请求
    if (!isUserLoggedIn()) {
      return Promise.reject(new Error('用户未登录'));
    }
    
    if (config.url.includes('/admin') && !isAdmin()) {
      return Promise.reject(new Error('权限不足'));
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

不推荐这样做的原因：

1. **职责分离问题**
   - 请求拦截器主要职责是**修改请求配置**
   - 业务验证逻辑应该放在**业务层**或**响应拦截器**

2. **调试困难**

   ```javascript
   // 这样调试时会困惑：是请求没发出？还是服务器没响应？
   service.get('/api/data')
     .catch(error => {
       console.log(error); // 是网络错误？还是拦截器拒绝？
     });
   ```

3. **破坏拦截器链**

   ```javascript
   // 多个拦截器时，最后一个拦截器reject会跳过前面声明的所有拦截器
   service.interceptors.request.use((config) => {
     console.log('拦截器1');  // 这个永远不会执行
     return config;
   });
   
   service.interceptors.request.use((config) => {
     console.log('拦截器2');
     return Promise.reject(new Error('中断'));
   });
   ```

#### 解决方案

方案1：业务层先验证再发送请求

```javascript
// 先验证，再发送请求
async function validateRequest(config) {
  if (!config.url) {
    throw new Error('URL不能为空');
  }
  if (!isUserLoggedIn()) {
    throw new Error('请先登录');
  }
  return true;
}

// 使用方式
async function sendRequest() {
  try {
    await validateRequest(config);
    const response = await service.request(config);
    return response;
  } catch (error) {
    console.error(error);
  }
}
```

方案2：封装一个工具类，放置共用的验证逻辑，先验证再发送请求

```js
// 使用前置验证函数
class ApiService {
  async request(config) {
    // 1. 先验证
    const validation = this.validateRequest(config);
    if (!validation.valid) {
      throw new Error(validation.message);
    }
    
    // 2. 再通过拦截器发送
    return this.axiosInstance.request(config);
  }
  
  validateRequest(config) {
    // 验证逻辑
    return { valid: true, message: '' };
  }
}
```

## 错误处理

使用 `.catch()` 处理错误

- `error` 的属性：
  - response
  - request
  - message
  - config
- `error` 的方法
  - `toJSON()`

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

使用 `validateStatus` 配置选项，可以自定义抛出错误的 HTTP code。

```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 状态码小于500不抛出错误
  }
})
```

使用 `toJSON` 可以获取更多关于HTTP错误的信息。

```js
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```
