# json

## 函数

### load()

load()

### loads()

语法：`json.loads(s)`

将 s (一个包含 JSON 文档的 `str`, bytes 或 bytearray 实例) 反序列化为 Python 对象。

```py
obj = json.loads('["foo", {"bar":["baz", null, 1.0, 2]}]')
print(obj) # ['foo', {'bar': ['baz', None, 1.0, 2]}]
```

### dumps()

语法：`json.dumps(obj)`

使用这个 函数 将 `obj` 序列化为 `JSON` 格式的 `str`。
