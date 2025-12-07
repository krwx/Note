# sys

- [sys](#sys)
  - [变量](#变量)
    - [path](#path)
  - [函数](#函数)
    - [getsizeof()](#getsizeof)
    - [getrecursionlimit()](#getrecursionlimit)
    - [setrecursionlimit()](#setrecursionlimit)

## 变量

### path

`sys.path` ：一个由字符串组成的列表，用于指定模块的搜索路径。初始化自环境变量 `PYTHONPATH`，再加上一条与安装有关的默认路径。

在默认情况下，如在程序启动时被初始化的时候，会有潜在的不安全路径被添加到 `sys.path` 的开头 (在作为的 `PYTHONPATH` 结果被插入的条目 之前 位置):

- `python -m module` 命令行：添加当前工作目录。
- `python script.py` 命令行：添加脚本的目录。 如果是一个符号链接，则会解析符号链接。
- `python -c code` 和 `python (REPL)` 命令行：添加一个空字符串，这表示当前工作目录。

> 如果不想添加这个具有潜在不安全性的路径，请使用 `-P` 命令行选项或 `PYTHONSAFEPATH` 环境变量。

程序可以出于自己的目的随意修改此列表。 应当只将字符串添加到 `sys.path` 中

扩展搜索路径：

```py
import sys
sys.path.extend(["./", "../", "./file_handler"])

# or
sys.path.append("./")
sys.path.append("../")
sys.path.append("./file_handler")
```

注意：

- 如果有的包需要添加搜索路径后才能使用的话，需要在 `sys.path.extend()` 后才能 `import`

## 函数

### getsizeof()

语法：`sys.getsizeof(object[, default])`

返回对象的大小（**以字节为单位**）。  
该对象可以是任何类型。  
所有内建对象返回的结果都是正确的，但对于第三方扩展不一定正确

只计算直接分配给对象的内存消耗，不计算它所引用的对象的内存消耗。

```py
import sys
a = [1, 2, 3]
print(sys.getsizeof(a))
```

### getrecursionlimit()

语法：`sys.getrecursionlimit()`

作用：返回当前的递归限制值，即 Python 解释器堆栈的最大深度。

### setrecursionlimit()

语法：`sys.setrecursionlimit(limit)`

作用：将 `Python` 解释器堆栈的最大深度设置为 `limit`。此限制可防止无限递归导致的 C 堆栈溢出和 Python 崩溃。

最大深度默认为 1000

不同平台所允许的最高限值不同。当用户有需要深度递归的程序且平台支持更高的限值，可能就需要调高限值。进行该操作需要谨慎，因为过高的限值可能会导致崩溃。
