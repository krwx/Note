# 登录 token 认证

大概流程：

1. 用户登录成功后，服务器生成一个唯一的 token，并将其返回给客户端。这个 token 通常是一个加密的字符串，包含用户的身份信息和过期时间。
2. 客户端收到 token 后，通常会将其存储在本地（如浏览器的 localStorage、sessionStorage 或 cookies 中），以便后续请求使用。
3. 在后续的每次请求中，客户端会将 token 附加在请求头（通常是 Authorization 头）中发送给服务器。
4. 服务器在接收到请求时，会从请求头中提取 token，并验证其有效性。验证过程通常包括以下几个步骤：
   - 检查 token 是否存在。
   - 验证 token 的签名，确保其未被篡改。
   - 检查 token 是否过期。
   - 根据 token 中的用户信息，确认用户的身份和权限。
5. 如果 token 验证通过，服务器会处理请求并返回相应的数据；如果验证失败，服务器会返回一个错误响应（如 401 Unauthorized），提示客户端重新登录。
6. 为了提高安全性，服务器通常会设置 token 的过期时间，并在用户登出或 token 过期后，要求用户重新登录以获取新的 token。
7. 在某些情况下，服务器可能会实现 token 刷新机制，即在 token 即将过期时，允许客户端使用一个刷新 token 来获取新的访问 token，而无需重新登录。
8. 在设计 token 认证系统时，可以考虑使用标准的认证协议，如 OAuth 2.0 或 JWT（JSON Web Token），以简化实现过程并提高安全性。

项目实现：

1. 登录后将 token 存储在 localStorage 中
2. 在 axios 请求拦截器中添加 token 到请求头

```javascript
service.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      if (isTokenExpired(token)) {
        alert('Token has expired. Please log in again.');
        removeTokens();
        window.location.href = import.meta.env.VITE_LOGIN_URL;
        return Promise.reject(new Error('Token has expired'));
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);
```

## csrftoken 哪里来的

存放在 cookie
