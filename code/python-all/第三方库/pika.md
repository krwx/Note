# pika

python 使用 rabbimq 的第三方库

## API

### BasicProperties

语法：`classpika.spec.BasicProperties(content_type=None, content_encoding=None, headers=None, delivery_mode=None, priority=None, correlation_id=None, reply_to=None, expiration=None, message_id=None, timestamp=None, type=None, user_id=None, app_id=None, cluster_id=None)`

`content_type` 是消息的一个属性（Message Property），用于标识消息体的 `MIME` 类型（`Multipurpose Internet Mail Extensions`）

常见 `MIME` 类型：

|MIME 类型| 说明|
|--|--|
|application/json| JSON 格式数据（默认字符集为 UTF-8）。|
|application/xml| XML 格式数据。|
|text/plain| 纯文本（例如 text/plain; charset=UTF-8 可指定字符集）。|
|text/html| HTML 格式文本。|
|application/octet-stream| 二进制流数据（默认类型，用于未明确指定类型的二进制文件）。|
|application/x-www-form-urlencoded| 表单编码数据（例如 key1=value1&key2=value2）。|
|multipart/form-data| 多部分表单数据（常用于文件上传）。|
|application/pdf| PDF 文件。|
|image/jpeg| JPEG 图像。|
|application/zip| ZIP 压缩文件。|

在发送消息时设置 `content_type` ：

```python
channel.basic_publish(
    exchange='my_exchange',
    routing_key='my_queue',
    body=json.dumps(data).encode('utf-8'),
    properties=pika.BasicProperties(
        content_type='application/json',  # 明确指定 JSON 类型
        delivery_mode=2  # 持久化消息
    )
)
```
