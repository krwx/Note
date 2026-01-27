# 双 Token 无感知刷新

- [双 Token 无感知刷新](#双-token-无感知刷新)
  - [思路](#思路)
    - [后端实现思路](#后端实现思路)
    - [前端实现思路](#前端实现思路)
    - [注意事项](#注意事项)
  - [后端代码 (FastAPI)](#后端代码-fastapi)
  - [前端代码 (Vue3 + Axios)](#前端代码-vue3--axios)

## 思路

### 后端实现思路

核心机制：**双 Token 分层验证**

```txt
Access Token（短期令牌）
├── 用途：接口访问凭证
├── 有效期：短（15-30分钟）
├── 特点：频繁失效，需要刷新

Refresh Token（长期令牌）
├── 用途：刷新 Access Token
├── 有效期：长（7-30天）
├── 特点：相对稳定，存储安全
```

**工作流程：**

1. **登录时**：同时生成 `Access Token` 和 `Refresh Token`
2. **接口访问**：请求头携带 `Access Token` 验证
3. **Token过期检测**：
   - 验证 `Access Token` 是否过期
   - 验证 `Token` 类型是否正确
4. **刷新机制**：
   - 提供独立的 `/refresh` 接口
   - 只接受 `Refresh Token` 作为凭证
   - 返回新的 `Access Token`（不返回新的 `Refresh Token`）
**安全设计要点：**

- **分离职责**：`Access Token` 用于业务，`Refresh Token` 仅用于刷新
- **路径分离**：刷新接口独立，防止误用
- **类型标记**：`Token` `payload` 中包含 `type` 字段区分类型
- **黑名单机制**：支持登出时 `Token` 作废

### 前端实现思路

**核心原理：拦截器 + 队列管理**

**1. 存储策略**

```javascript
// 双 Token 分离存储
localStorage.setItem('access_token', accessToken)   // 频繁读取
localStorage.setItem('refresh_token', refreshToken) // 安全存储
```

**2. 请求流程控制**

```txt
正常请求 → 携带 Access Token → 成功响应
      ↓
Access Token 过期 → 拦截 401 错误
      ↓
检查是否有 Refresh Token
      ↓
发起刷新请求 → 获取新 Access Token
      ↓
更新请求头 → 重新发送原请求
      ↓
返回结果给用户（无感知）
```

**3. 并发请求处理（关键难点）**

```javascript
// 防止多个请求同时触发刷新
let isRefreshing = false      // 刷新状态锁
let requests = []            // 请求等待队列

// 当第一个请求触发刷新时
if (isRefreshing) {
    // 后续请求加入队列等待
    return new Promise(resolve => {
        requests.push(() => resolve(service(config)))
    })
}
```

**4. 拦截器设计**

- **请求拦截器**：自动添加 `Authorization` 头
- **响应拦截器**：
  - 识别 401 错误
  - 触发刷新流程
  - 管理请求重试
- **错误边界**：
  - 刷新失败 → 跳转登录页
  - 网络错误 → 友好提示

### 注意事项

1. **存储安全**：生产环境考虑加密存储或 `HttpOnly Cookie`
2. **刷新频率限制**：后端应限制刷新接口调用频率
3. **多标签页同步**：需要考虑多个浏览器标签的 Token 同步
4. **移动端适配**：移动端需要考虑 Token 持久化策略

## 后端代码 (FastAPI)

1、接口设计：

1. `login` 接口
   1. 验证用户名和密码
   2. 根据用户名创建 `access token` 和 `refresh token`
   3. 返回两个 `token` 给前端
2. 普通接口
   1. 验证 `header` 的 `accessToken` 的有效性
   2. 业务处理
3. `refresh` 接口
   1. 获取 `body` 或 `query param` 的 `refreshToken`
   2. 验证 `refreshToken` 的有效性
   3. 创建新的 `access token` 并返回给前端

2、创建 `token` 步骤：

1. 使用 `jwt.encode` 创建 `token`
2. `access token` 设置较短的过期时间（如 15 分钟）
3. `refresh token` 设置较长的过期时间（如 7 天）

3、验证 `token` 步骤：

1. 使用 `jwt.decode` 验证 `token`，有效期过期会抛出异常
2. 验证 `token` 的数据有效性（如用户名是否存在）

```python
# main.py
from datetime import datetime, timedelta
from typing import Optional, Dict
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import jwt
from jwt.exceptions import InvalidTokenError
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
security = HTTPBearer()

# 配置跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有源，生产环境建议指定具体域名
    allow_credentials=True,  # 允许携带凭证（cookies, authorization headers等）
    allow_methods=["*"],  # 允许所有HTTP方法
    allow_headers=["*"],  # 允许所有头部
)

# 配置
SECRET_KEY = "your-secret-key"  # 生产环境请使用环境变量
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15  # access token 15分钟过期
REFRESH_TOKEN_EXPIRE_DAYS = 7     # refresh token 7天过期

# 模拟用户数据库
fake_users_db = {
    "user1": {
        "username": "user1",
        "password": "password123",
        "disabled": False,
    }
}

# 数据模型
class TokenData(BaseModel):
    username: Optional[str] = None

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class UserLogin(BaseModel):
    username: str
    password: str

# 创建 JWT token 函数
def create_token(data: dict, expires_delta: Optional[timedelta] = None, token_type: str = "access"):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": token_type
    })
    
    # jwt.encode 生成一个 exp 时间过后就会过期的 token
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# 验证 token 函数
def verify_token(token: str, token_type: str = "access"):
    try:
        # jwt.decode 会验证 exp 时间
        # 验证不通过会抛出 jwt.ExpiredSignatureError 异常
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    
        # 检查 token 类型
        if payload.get("type") != token_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type"
            )
        
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        return TokenData(username=username)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

# 获取当前用户
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token_data = verify_token(credentials.credentials, "access")
    user = fake_users_db.get(token_data.username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

@app.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    """登录接口"""
    user = fake_users_db.get(user_data.username)
    if not user or user["password"] != user_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    # 创建 access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_token(
        data={"sub": user_data.username},
        expires_delta=access_token_expires,
        token_type="access"
    )
    
    # 创建 refresh token
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    refresh_token = create_token(
        data={"sub": user_data.username},
        expires_delta=refresh_token_expires,
        token_type="refresh"
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@app.post("/refresh")
async def refresh_token(data: dict):
    """刷新 access token"""
    try:
        # 验证 refresh token
        refresh_token = data['refresh_token']
        token_data = verify_token(refresh_token, "refresh")
        
        # 创建新的 access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        new_access_token = create_token(
            data={"sub": token_data.username},
            expires_delta=access_token_expires,
            token_type="access"
        )
        
        return {
            "access_token": new_access_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

# 需要认证的接口
# 作用：获取当前用户信息，返回信息
@app.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):

    return {
        "message": f"Hello {current_user['username']}",
        "data": "This is protected data"
    }

@app.get("/public")
async def public_route():
    """公开接口"""
    return {"message": "This is public data"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

```

## 前端代码 (Vue3 + Axios)

页面逻辑：

1. `Login` 页面
   1. 用户输入用户名和密码
   2. 调用登录接口，获取 `access token` 和 `refresh token`
   3. 存储两个 `token` 到本地存储（`localStorage`）
2. `Dashboard` 页面
   1. 调用受保护接口，获取数据
   2. `axios` 响应拦截器内部：如果 `access token` 过期，自动使用 `refresh token` 调用刷新 `token` 接口获取刷新后的 `access token` 并重试请求

***

`axios` 实现：

1. `login` 函数：
   1. 调用登录接口，获取 `access token` 和 `refresh token`
   2. 存储两个 `token` 到本地存储（`localStorage`）
2. `logout` 函数：
   1. 清除本地存储的 `token`
   2. 跳转到登录页面
3. `refresh token` 函数：
   1. 调用刷新 `token` 接口，接口传递 `refresh token`，获取新的 `access token`
   2. 存储新的 `access token` 到本地存储，返回新的 `access token`
4. 请求拦截器：
   1. 从本地存储获取 `access token`，并设置到请求头中， `bearer` 认证
5. 响应拦截器：
   1. 如果响应是 401 错误，调用 `refresh token` 函数刷新 `access token`
   2. 刷新成功后，设置新的 `access token`，重试原请求

***

防止多个请求同时过期 导致多次刷新 `token` 的**方案**：

1. 方案一：设置一个刷新标记和请求队列。当在刷新时，新的请求会被加入到队列中，等待刷新完成后再执行
2. 方案二：设置一个 `singleRefreshToken` 变量，该变量为 `Promise` 对象，表示当前的刷新操作。如果有新的请求需要刷新 `token` 且已经在刷新中，则直接返回该 `Promise` 对象，所以刷新请求都会等待该 `Promise` 完成。

***

`router/index.js`：

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/tokenTest/Login.vue'
import Dashboard from '../views/tokenTest/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'default',
      component: Login,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },    
  ],
})
export default router
```

`Login.vue`：

```vue
<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/utils/request'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    await login(form.username, form.password)
    ElMessage.success('登录成功')
    router.push('/dashboard')
  } catch (error) {
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>
```

`Dashboard.vue`：

```vue
<!-- src/views/Dashboard.vue -->
<template>
  <div>
    <h1>仪表板</h1>
    <el-button @click="fetchProtectedData">获取受保护数据</el-button>
    <el-button @click="fetchPublicData">获取公开数据</el-button>
    <el-button @click="handleLogout">退出登录</el-button>
    
    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import request, { logout } from '@/utils/request'
import { ElMessage } from 'element-plus'

const data = ref(null)

const fetchProtectedData = async () => {
  try {
    const result = await request.get('/protected')
    data.value = result
    ElMessage.success('获取数据成功')
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

const fetchPublicData = async () => {
  try {
    const result = await request.get('/public')
    data.value = result
    ElMessage.success('获取数据成功')
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

const handleLogout = () => {
  logout()
  ElMessage.success('已退出登录')
}
</script>
```

`axios` 代码（使用 方案一 防止多个请求同时刷新 token）：

```javascript
// src/utils/request.js
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000
})

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数
let requests = []

// 从本地存储获取 token
function getToken() {
  return {
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token')
  }
}

// 设置 token 到本地存储
function setToken(accessToken, refreshToken) {
  localStorage.setItem('access_token', accessToken)
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken)
  }
}

// 清除 token
function clearToken() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

// 刷新 token 的函数
async function refreshAccessToken() {
  const { refreshToken } = getToken()
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }
  try {
    const response = await axios.post(
        `${service.defaults.baseURL}/refresh`,
        { refresh_token: refreshToken },
    )
    const { access_token } = response.data
    setToken(access_token, refreshToken)
    return access_token
  } catch (error) {
    clearToken()
    router.push('/login')
    throw error
  }
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { accessToken } = getToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const { config, response } = error
    
    // 如果是 401 错误且不是刷新 token 的请求
    if (response && response.status === 401 && !config.url.includes('/refresh')) {
      const { refreshToken } = getToken()
      
      if (!refreshToken) {
        clearToken()
        router.push('/login')
        return Promise.reject(error)
      }
      
      // 如果正在刷新，将请求加入队列
      if (isRefreshing) {
        return new Promise((resolve) => {
          // 将 resolve() 封装成一个函数，加入队列
          // 当刷新完成后会执行这个函数，才会调用 resolve() 继续发送请求
          // 在执行这个函数前，请求会一直等待
          requests.push(() => {
            resolve(service(config))
          })
        })
      }
      
      // 标记开始刷新
      isRefreshing = true
      try {
        // 刷新 token
        const newAccessToken = await refreshAccessToken()
        // 设置新的 token
        config.headers.Authorization = `Bearer ${newAccessToken}`
        // 重新发送当前请求
        const result = await service(config)
        // 执行等待队列中的请求
        requests.forEach(cb => cb())
        requests = []
        return result
      } catch (refreshError) {
        // 刷新失败，跳转到登录页
        clearToken()
        router.push('/login')
        ElMessage.error('登录已过期，请重新登录')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    
    // 其他错误处理
    if (response && response.status === 403) {
      ElMessage.error('没有权限访问')
    } else if (response && response.status >= 500) {
      ElMessage.error('服务器错误，请稍后重试')
    }
    return Promise.reject(error)
  }
)

// 登录函数
export async function login(username, password) {
  try {
    const response = await service.post('/login', {
      username,
      password
    })
    const { access_token, refresh_token } = response
    setToken(access_token, refresh_token)
    return response
  } catch (error) {
    throw error
  }
}

// 登出函数
export function logout() {
  clearToken()
  router.push('/login')
}

export default service
```

防止刷新 accessToken 并发的方案二：

```js
// 声明单例 promise 变量
let singleRefreshToken = null;

async function refreshAccessToken() {
    // 如果有单例 promise，直接返回
    if (singleRefreshToken) {
        console.log("have multi refresh token");
        return singleRefreshToken;
    }

    // 设置单例 promise
    singleRefreshToken = new Promise(async (resolve, reject) => {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('No refresh token available')
        }
        try {
            const response = await axios.post(
                `${service.defaults.baseURL}/refresh`,
                { refresh_token: refreshToken },
            )
            const { access_token } = response.data
            setToken(access_token, refreshToken)
            // resolve 新的 access token
            resolve(access_token)
        } catch (error) {
            clearToken()
            router.push('/login')
            reject(error)
        }
    });

    // 最后需要设置单例 promise 为 null
    singleRefreshToken.finally(() => {
        singleRefreshToken = null;
    });

    return singleRefreshToken;
}

service.interceptors.response.use(
    response => response.data,
    async (error) => {
        const { response, config } = error;
        if (response && response.status === 401 && !config.url.includes('/refresh')) {
            const refreshToken = localStorage.getItem
            // ...
            try {
                const newAccessToken = await refreshAccessToken();

                config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                const result = service(config);

                return result;
            } catch (error) {
                clearToken()
                router.push('/login')
                ElMessage.error('登录已过期，请重新登录')
                return Promise.reject(error)                
            }
        }
        return Promise.reject(error);
    }
);
```

这个方案实现了：

1. **双 Token 机制**：Access Token（短期） + Refresh Token（长期）
2. **无感知刷新**：Access Token 过期时自动用 Refresh Token 刷新
3. **请求队列**：防止并发请求时多次刷新
4. **错误处理**：完善的错误处理和用户提示

使用前请确保：

1. 后端安装必要的依赖：`pip install fastapi uvicorn pyjwt`
2. 前端安装 axios、element-plus 等依赖
3. 根据需要调整 Token 过期时间
4. 生产环境请使用更安全的密钥管理方式
