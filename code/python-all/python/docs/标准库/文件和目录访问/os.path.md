# os.path

- [os.path](#ospath)
  - [介绍](#介绍)
  - [getsize()](#getsize)
  - [exists()](#exists)
  - [isdir()](#isdir)
  - [isfile()](#isfile)
  - [relpath()](#relpath)
  - [dirname()](#dirname)
  - [getatime()](#getatime)
  - [getmtime()](#getmtime)
  - [getctime()](#getctime)

## 介绍

`os.path` 模块主要用于获取文件的属性。

|方法| 描述|
|--|--|
|`os.path.abspath(path)`| 返回绝对路径字符串。|
|`os.path.basename(path)`| 返回路径中的文件名部分。|
|os.path.commonpath(paths)| 返回指定路径序列中的共同基础路径。|
|os.path.commonprefix(list)| 返回指定路径序列中的共同前缀。|
|`os.path.dirname(path)`| 返回路径中的目录部分。|
|`os.path.exists(path)`| 判断路径是否存在。|
|os.path.lexists(path)| 判断路径是否存在，会解析符号链接。|
|`os.path.getatime(path)`| 返回路径的最后访问时间（浮点数形式的时间戳）。|
|`os.path.getmtime(path)`| 返回路径的最后修改时间（浮点数形式的时间戳）。|
|`os.path.getctime(path)`| 返回路径的创建时间（浮点数形式的时间戳）。|
|`os.path.getsize(path)`| 返回路径指定的文件的大小，以字节为单位。|
|os.path.isabs(path)| 判断路径是否为绝对路径。|
|`os.path.isfile(path)`| 判断路径是否为文件。|
|`os.path.isdir(path)`| 判断路径是否为目录。|
|os.path.islink(path)| 判断路径是否为符号链接。|
|os.path.ismount(path)| 判断路径是否为挂载点。|
|`os.path.join(path1, path2)`| 将两个路径组合成一个。|
|os.path.normcase(path)| 规范化路径的大小写。|
|os.path.normpath(path)| 规范化路径字符串。|
|os.path.realpath(path)| 返回规范化的绝对路径。|
|`os.path.relpath(path, start)`| 返回从 start 路径到 path 的相对路径。|
|os.path.samefile(path1, path2)| 判断两个路径是否指向同一个文件。|
|os.path.sameopenfile(fp1, fp2)| 判断两个打开的文件是否指向同一个文件。|
|os.path.samestat(stat1, stat2)| 判断两个 stat tuple 是否引用同一个文件。|
|`os.path.split(path)`| 返回路径的目录和文件名。|
|os.path.splitdrive(path)| 返回驱动器名称和路径组成的元组。|
|os.path.splitext(path)| 分割路径的文件名和扩展名。|
|os.path.splitunc(path)| 将路径分为共享设备和文件部分。|
|os.path.walk(top, func, arg)| 为 top 目录树中的每个目录调用 func，并向其传递 arg。|

```py
import os.path

# 当前文件名
print(__file__)
# 当前文件名的绝对路径
print( os.path.abspath(__file__) )

""" 
结果：
test.py
/runoob/runoob-test-py/test.py
"""
```

```py
import os
 
print( os.path.basename('/root/runoob.txt') )   # 返回文件名
print( os.path.dirname('/root/runoob.txt') )    # 返回目录路径
print( os.path.split('/root/runoob.txt') )      # 分割文件名与路径
print( os.path.join('root','test','runoob.txt') )  # 将目录和文件名合成一个路径

""" 
结果：
runoob.txt
/root
('/root', 'runoob.txt')
root/test/runoob.txt
"""
```

## getsize()

`os.path.getsize(path)`

返回 `path` 的大小，以字节为单位。如果该文件不存在或不可访问，则抛出 `OSError` 异常。

```py
import os.path
def main():
    print(os.path.getsize("main.py"))
# output: 1713
```

## exists()

`os.path.exists(path)`

如果 `path` 指向一个已存在的路径或已打开的文件描述符，返回 `True`。对于失效的符号链接，返回 `False`。

```py
import os.path
def main():
    print(os.path.exists("main.py"))
# output: True
```

## isdir()

`os.path.isdir(path)`

如果 path 是 现有的 目录，则返回 True。

```py
import os.path
def main():
    print(os.path.isdir("main.py"))
    print(os.path.isdir("folder"))
# output: False
# output: True
```

## isfile()

`os.path.isfile(path)`

如果 `path` 是 现有的 常规文件，则返回 `True`。

本方法会跟踪符号链接，因此，对于同一路径，`islink()` 和 `isfile()` 都可能为 `True`。

```py
import os.path
def main():
    print(os.path.isfile("main.py"))
    print(os.path.isfile("file"))
# output: True
# output: False. file is a folder
```

## relpath()

语法：`os.path.relpath(path, start=os.curdir)`

作用：返回从当前目录或可选的 `start` 目录至 `path` 的**相对文件路径**。

理解：计算怎么从 start 开始，通过进入文件夹或者返回上一层来到达 path 的相对路径

> 这只是一个路径计算：不会访问文件系统来确认 path 或 start 是否存在或其性质。
>
> 在 Windows 上，当 path 和 start 位于不同驱动器时将引发 ValueError。

例子

```py
path1 = r"C:\Users\kevin.chen\Downloads\test\test2\123.txt"
path2 = r"C:\Users\kevin.chen\Downloads\business"

print(os.path.relpath(path1, path2))
# ..\test\test2\123.txt

print(os.path.relpath(path2, path1))
# ..\..\..\business
```

## dirname()

作用：返回路径中的目录部分

例子：

```py
import os.path

path1 = r"C:\Users\Downloads\test\test2\123.txt"
path2 = r"C:\Users\Downloads\business"

print(os.path.dirname(path1))
# C:\Users\Downloads\test\test2

print(os.path.dirname(path2))
# C:\Users\Downloads
```

## getatime()

语法：`os.path.getatime(path)`

返回 path 的**最后访问时间**。  
返回值是一个浮点数，为纪元秒数（参见 time 模块）。  
如果该文件不存在或不可访问，则抛出 OSError 异常。

## getmtime()

语法：`os.path.getmtime(path)`

返回 path 的**最后修改时间**。  
返回值是一个浮点数，为纪元秒数（参见 time 模块）。  
如果该文件不存在或不可访问，则抛出 OSError 异常。

## getctime()

语法：`os.path.getctime(path)`

返回 path 在系统中的 `ctime`

- 在有些系统（比如 `Unix`）上，它是**元数据的最后修改时间**，
- 其他系统（比如 `Windows`）上，它是 **path 的创建时间**。  

返回值是一个数，为纪元秒数（参见 time 模块）。  
如果该文件不存在或不可访问，则抛出 OSError 异常。
