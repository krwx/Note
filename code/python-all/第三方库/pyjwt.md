# PyJWT

我来介绍 Python 中 JWT 编码的基本用法。最常用的是 `PyJWT` 库。

## 1. 安装 PyJWT

```bash
pip install PyJWT
```

## 2. 基本编码示例

```python
import jwt
import datetime

# 设置密钥
SECRET_KEY = "your-secret-key"

# 创建 payload（载荷）
payload = {
    'user_id': 123,
    'username': 'john_doe',
    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),  # 过期时间
    'iat': datetime.datetime.utcnow(),  # 签发时间
    'iss': 'your-app'  # 签发者
}

# 编码生成 JWT
token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
print(f"JWT Token: {token}")
```

## 3. 完整示例代码

```python
import jwt
import datetime
from typing import Dict, Any

class JWTManager:
    def __init__(self, secret_key: str, algorithm: str = 'HS256'):
        self.secret_key = secret_key
        self.algorithm = algorithm
    
    def create_token(self, payload: Dict[str, Any], 
                     expires_in: datetime.timedelta = None) -> str:
        """
        创建 JWT Token
        
        参数:
            payload: 载荷数据
            expires_in: 过期时间间隔，默认24小时
        
        返回:
            JWT Token 字符串
        """
        # 深拷贝 payload，避免修改原始数据
        token_payload = payload.copy()
        
        # 添加标准声明
        now = datetime.datetime.utcnow()
        token_payload['iat'] = now  # 签发时间
        token_payload['nbf'] = now  # 生效时间
        
        # 设置过期时间
        if expires_in:
            token_payload['exp'] = now + expires_in
        else:
            token_payload['exp'] = now + datetime.timedelta(hours=24)
        
        # 编码生成 token
        token = jwt.encode(
            token_payload,
            self.secret_key,
            algorithm=self.algorithm
        )
        
        return token
    
    def verify_token(self, token: str) -> Dict[str, Any]:
        """
        验证并解码 JWT Token
        
        返回:
            解码后的 payload
        """
        try:
            payload = jwt.decode(
                token,
                self.secret_key,
                algorithms=[self.algorithm]
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise Exception("Token 已过期")
        except jwt.InvalidTokenError:
            raise Exception("无效的 Token")

# 使用示例
if __name__ == "__main__":
    # 初始化 JWT 管理器
    jwt_manager = JWTManager(secret_key="super-secret-key-123")
    
    # 创建用户数据
    user_data = {
        'user_id': 12345,
        'username': 'alice',
        'email': 'alice@example.com',
        'role': 'admin'
    }
    
    # 创建 token（2小时后过期）
    token = jwt_manager.create_token(
        payload=user_data,
        expires_in=datetime.timedelta(hours=2)
    )
    
    print(f"生成的 Token: {token}")
    print(f"Token 长度: {len(token)}")
    
    # 验证和解码 token
    try:
        decoded = jwt_manager.verify_token(token)
        print(f"解码后的数据: {decoded}")
    except Exception as e:
        print(f"验证失败: {e}")
```

## 4. 常用算法

```python
import jwt

# HS256 - 对称加密（推荐）
token_hs256 = jwt.encode({'data': 'test'}, 'secret', algorithm='HS256')

# RS256 - 非对称加密（需要公钥私钥）
import cryptography
# 需要先生成 RSA 密钥对
private_key = b'-----BEGIN PRIVATE KEY-----\n...'
public_key = b'-----BEGIN PUBLIC KEY-----\n...'

token_rs256 = jwt.encode({'data': 'test'}, private_key, algorithm='RS256')
```

## 5. 处理不同类型的 token

```python
import jwt
import datetime

# 1. 访问令牌（Access Token） - 短期
def create_access_token(user_id: int):
    payload = {
        'token_type': 'access',
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
        'iat': datetime.datetime.utcnow()
    }
    return jwt.encode(payload, 'secret', algorithm='HS256')

# 2. 刷新令牌（Refresh Token） - 长期
def create_refresh_token(user_id: int):
    payload = {
        'token_type': 'refresh',
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }
    return jwt.encode(payload, 'refresh-secret', algorithm='HS256')
```

## 主要参数说明

`jwt.encode()` 的主要参数：

- `payload`: 要编码的数据字典
- `key`: 密钥字符串
- `algorithm`: 加密算法（默认 HS256）
- `headers`: 可选的头部信息

## 注意事项

1. **密钥安全**: 不要将密钥硬编码在代码中，使用环境变量
2. **过期时间**: 一定要设置合理的过期时间
3. **算法选择**: 推荐使用 HS256 或 RS256
4. **标准声明**: 尽量使用标准声明（exp, iat, sub, iss, aud 等）
5. **错误处理**: 解码时做好异常处理

这是 JWT 编码的基本用法。在实际项目中，通常会配合认证中间件或框架（如 FastAPI、Django REST framework）一起使用。
