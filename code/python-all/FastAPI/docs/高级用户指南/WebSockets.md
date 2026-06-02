# WebSockets

- [WebSockets](#websockets)
  - [安装 websockets](#安装-websockets)
  - [创建 websocket](#创建-websocket)
  - [管理多个 websocket 连接](#管理多个-websocket-连接)

## 安装 websockets

```bash
pip install websockets
# or
conda install websockets
```

## 创建 websocket

步骤：

1. 导入 `WebSocket` 类
2. 创建一个 websocket 路由：
   - 使用 `websocket` 装饰器
   - 定义一个 websocket 端点函数，参数为 `WebSocket` 对象
3. 在函数中：
   - 接受连接：`await websocket.accept()`
   - 在 while 循环中：
     - 接收消息：`data = await websocket.receive_text()`
     - 发送消息：`await websocket.send_text(f"Message text was: {data}")`

```python
from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
```

简单使用示例：

```python
from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@app.get("/")
async def get():
    return HTMLResponse(html)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
```

- `await websocket.receive_text()`：接收客户端发送的文本消息
- `await websocket.send_text(...)`：向客户端发送文本消息
- `await websocket.receive_bytes()`：接收客户端发送的二进制消息
- `await websocket.send_bytes(...)`：向客户端发送二进制消息

## 管理多个 websocket 连接

可以构建一个连接管理器来管理多个 websocket 连接，例如：

```py
from fastapi import WebSocket, WebSocketDisconnect
from typing import List

class ConnectionManager:
    def __init__(self):
        # 用于存储所有活跃的WebSocket连接
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        # 接受新的WebSocket连接请求
        await websocket.accept()
        # 将新连接存入管理列表
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        # 从管理列表中移除断开的连接
        self.active_connections.remove(websocket)

    async def send_message(self, message: str, websocket: WebSocket):
        # 向指定的单个客户端发送消息
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        # 向所有已连接的客户端广播消息
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except WebSocketDisconnect:
                # 如果发送失败（如客户端已断开），则将其移除
                self.disconnect(connection)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # 接收消息后广播给所有连接的客户端
            await manager.broadcast(f"Message text was: {data}")
    except WebSocketDisconnect:
        # 处理客户端断开连接的情况
        manager.disconnect(websocket)
```
