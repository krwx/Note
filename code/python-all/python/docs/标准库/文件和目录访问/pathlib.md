# pathlib

面向对象的文件系统路径

该模块提供表示文件系统路径的类

路径类被分为提供纯计算操作而没有 `I/O` 的 纯路径，以及**从纯路径继承**而来但提供 `I/O` 操作的 具体路径。

- 纯路径
  - PurePath
- 具体路径
  - Path
    - 一个 `PurePath` 的子类
  - PosixPath
    - 一个 `Path` 和 `PurePosixPath` 的子类，此类表示一个非 `Windows` 文件系统的具体路径
  - WindowsPath
    - 一个 `Path` 和 `PurePosixPath` 的子类，此类表示一个 `Windows` 文件系统的具体路径

## 具体路径

### Path.expanduser()

返回带有扩展 `~` 和 `~user` 构造的新路径，与 `os.path.expanduser()` 所返回的相同。

如果无法解析家目录，则会引发 `RuntimeError`。

```PY
p = PosixPath('~/films/Monty Python')
p.expanduser()
# output：PosixPath('/home/eric/films/Monty Python')
```
