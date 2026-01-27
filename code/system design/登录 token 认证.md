# 登录 token 认证

- [登录 token 认证](#登录-token-认证)
  - [单 token 认证流程](#单-token-认证流程)
  - [双 token 认证流程](#双-token-认证流程)
    - [核心概念](#核心概念)
    - [完整认证流程](#完整认证流程)
    - [安全增强措施](#安全增强措施)
    - [架构图](#架构图)
  - [csrftoken 哪里来的](#csrftoken-哪里来的)

## 单 token 认证流程

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
7. 在设计 token 认证系统时，可以考虑使用标准的认证协议，如 OAuth 2.0 或 `JWT`（JSON Web Token），以简化实现过程并提高安全性。

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

## 双 token 认证流程

[双 Token 无感知刷新机制实现](../portal/js/usage/双%20Token%20无感知刷新.md)

双 Token 认证是一种常见的身份验证机制，使用 **Access Token（访问令牌）** 和 **Refresh Token（刷新令牌）** 组合来平衡安全性和用户体验。

### 核心概念

1、Access Token（访问令牌）

- **作用**：用于访问受保护的资源
- **有效期**：短期（通常15分钟-2小时）
- **存储位置**：前端内存/本地存储
- **安全风险**：较高（被盗用后可在有效期内访问）

2、Refresh Token（刷新令牌）

- **作用**：用于获取新的 Access Token
- **有效期**：长期（几天到几个月）
- **存储位置**：安全的 HttpOnly Cookie 或后端存储
- **安全风险**：较低（不直接访问资源）

### 完整认证流程

**步骤1：用户登录**

1. 用户提交凭证（用户名/密码）到后端。
2. 后端验证凭证，若通过则生成：
   - Access Token（短期）
   - Refresh Token（长期）
3. 后端将 Refresh Token 存储到数据库或缓存（与用户关联），并将两个 Token 返回给前端。

**步骤2：前端存储 Token**

- Access Token：存储在内存或本地存储（localStorage/sessionStorage）。注意：存储在内存更安全，但刷新页面会丢失；本地存储有 XSS 风险。
- Refresh Token：建议存储在 HttpOnly Cookie 中（防止 XSS），或者使用安全的前端存储方式。

**步骤3：使用 Access Token 访问受保护资源**

- 前端在请求API时，在Authorization头中携带Access Token（例如：`Bearer <access_token>`）。
- 后端验证Access Token的有效性（签名、过期时间等），若有效则返回数据。

**步骤4：Access Token 过期**

- 当 Access Token 过期后，后端会返回 401 Unauthorized 错误。

**步骤5：使用 Refresh Token 刷新 Access Token**

1. 前端检测到 401 错误后，使用 Refresh Token 请求后端的刷新接口。
2. 后端验证 Refresh Token：
   - 检查 Refresh Token 是否有效且未过期。
   - 检查该 Refresh Token 是否与存储的（在数据库或缓存中）一致。
3. 若验证通过，后端生成新的 Access Token（可选生成新的 Refresh Token）。
4. 后端将新的 Access Token 返回给前端，前端更新存储的 Access Token。

**步骤6：重复步骤3-5**

- 新的 Access Token 用于后续请求，直到再次过期。

**步骤7：用户登出或 Refresh Token 过期**

- 登出：前端清除存储的 Token，后端使 Refresh Token 失效（从存储中删除）。
- Refresh Token 过期：用户需要重新登录。

### 安全增强措施

**1、Token 存储策略对比**

| 存储位置 | 优点 | 缺点 |
| --------- | ------ | ------ |
| **内存** | 最安全，刷新即丢失 | 页面刷新需要重新登录 |
| **localStorage** | 持久化 | 易受 XSS 攻击 |
| **HttpOnly Cookie** | 防 XSS | 需防 CSRF |
| **Session Storage** | 标签页关闭即清除 | 标签页间不共享 |

```javascript
// 后端：安全的 Cookie 设置
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,      // 防止 JS 访问
  secure: true,        // 仅 HTTPS
  sameSite: 'strict',  // 防 CSRF
  path: '/api/auth/refresh', // 限制路径
  maxAge: 7 * 24 * 60 * 60 * 1000
});
```

**2、安全监控**

- 记录 Token 使用次数和频率
- 检测异常地理位置/设备
- 实现 Token 黑名单机制
- 限制 Refresh Token 使用频率

### 架构图

```txt
┌─────────┐    1.登录请求    ┌─────────┐
│         ├─────────────────►│         │
│  前端    │                 │  后端    │
│         │◄────────────────┤         │
└─────────┘  2.返回双Token  └─────────┘
     │                           │
     │ 3.存Token                 │ 存Refresh Token到DB
     ▼                           ▼
┌─────────────────┐        ┌─────────────┐
│Access Token:内存 │        │Refresh Token│
│Refresh: Cookie  │        │  数据库/Redis│
└─────────────────┘        └─────────────┘
     │                           │
     │ 4.API请求(带Access Token)│
     ├───────────────────────────►
     │                           │
     │ 5.Token过期(401)          │
     │◄──────────────────────────┤
     │                           │
     │ 6.用Refresh Token刷新     │
     ├───────────────────────────►
     │                           │
     │ 7.返回新Access Token      │
     │◄──────────────────────────┤
```

## csrftoken 哪里来的

存放在 cookie
