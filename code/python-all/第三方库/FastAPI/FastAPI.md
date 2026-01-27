# FastAPI

## 取 query param 和 body

取 body：

```python
@app.post("/refresh")
async def refresh_token(data: dict):
    refresh_token = data['refresh_token']
```

取 query param：

```python
@app.get("/refresh")
async def refresh_token(refresh_token: str):
    # url 为 /refresh?refresh_token=xxxx
    # 直接使用 refresh_token
    print(refresh_token)
```

## 跨域设置

在 FastAPI 中设置跨域（CORS）非常简单，以下是几种常见的配置方式：

1、**基本跨域设置**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 配置跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有源，生产环境建议指定具体域名
    allow_credentials=True,  # 允许携带凭证（cookies, authorization headers等）
    allow_methods=["*"],  # 允许所有HTTP方法
    allow_headers=["*"],  # 允许所有头部
)

@app.get("/")
async def main():
    return {"message": "Hello World"}
```

***

2、**更安全的配置（推荐）**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 指定允许的源
origins = [
    "http://localhost:3000",
    "https://example.com",
    "https://www.example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 仅允许指定的源
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # 指定允许的方法
    allow_headers=[
        "Authorization",
        "Content-Type",
        "Accept",
        "Origin",
        "X-Requested-With",
    ],  # 指定允许的头部
    expose_headers=["X-Custom-Header"],  # 允许浏览器访问的自定义响应头
    max_age=600,  # 预检请求缓存时间（秒）
)

@app.get("/")
async def main():
    return {"message": "Hello World"}
```
