# OS

os 模块提供了非常丰富的方法用来处理文件和目录

- [OS](#os)
  - [函数](#函数)
    - [os.getcwd()](#osgetcwd)
    - [rename()](#rename)
    - [mkdir(path)](#mkdirpath)
    - [makedirs(name)](#makedirsname)
    - [os.scandir(path)](#osscandirpath)
    - [os.listdir(path='.')](#oslistdirpath)
    - [remove()](#remove)
    - [walk()](#walk)
    - [stat()](#stat)
  - [对象](#对象)
    - [DirEntry](#direntry)
    - [stat\_result](#stat_result)
  - [其他系统信息](#其他系统信息)
    - [os.sep](#ossep)

## 函数

### os.getcwd()

返回表示当前工作目录的字符串。

```py
import os
print(os.getcwd())
# 结果
# D:\Documents\Project\pythonTest
```

### rename()

语法：`os.rename(src, dst, *, src_dir_fd=None, dst_dir_fd=None)`

将文件或目录 `src` 重命名为 `dst`。

在 Windows 环境下，如果 `dst` 已存在，则抛出 `FileExistsError` 异常

```py
os.rename("213.txt", "312.txt")
```

### mkdir(path)

创建一个名为 path 的目录。path 如果包含多级目录会报错

`os.mkdir("folder")`

### makedirs(name)

递归目录创建函数。与 `mkdir()` 类似，但会自动创建到达最后一级目录所需要的中间目录。

```py
os.makedirs("test")
os.makedirs("test1/abc") # 创建了两层文件夹
```

注意：**如果文件夹已存在，再通过 `makedirs` 创建文件夹会报错**

### os.scandir(path)

**获取文件夹内的每个文件的属性信息时用**。

返回一个 `os.DirEntry` 对象的迭代器，它们对应于由 `path` 指定目录中的条目。 这些条目会以**任意顺序生成**，并且不包括特殊条目 `'.'` 和 `'..'`。

如果需要文件类型或文件属性信息，使用 `scandir()` 代替 `listdir()` 可以大大提高这部分代码的性能，因为如果操作系统在扫描目录时返回的是 `os.DirEntry` 对象，则该对象包含了这些信息。

```py
with os.scandir(carrier.sftpPath) as it:
    for entry in it:
        print(entry.name) # 文件的名字
        print(entry.path) # 文件的完整路径
        print(entry.is_file)
        print(entry.is_dir)
```

### os.listdir(path='.')

返回一个包含由 path 指定目录中条目名称组成的列表。 该列表按任意顺序排列，并且不包括特殊条目 '.' 和 '..'

列表只包含当前文件夹的文件夹和文件，不包括文件夹里面的内容

```txt
folder
|--folder1
   |--abc.txt
|--folder2
|--123.txt

返回的结果包括 folder1, folder2, 123.txt 。不包括 abc.txt
```

```py
path = "xxx"
files = os.listdir(path)
for path in files:
    print(path)
```

### remove()

语法：`os.remove(path, *, dir_fd=None)`

- 移除（删除）文件 `path`。
- 如果 `path` 是目录，则会引发 `OSError`。 请使用 `rmdir()` 来移除目录。
- 如果文件不存在，则会引发 `FileNotFoundError`。

在 Windows 上，尝试删除正在使用的文件会抛出异常。而在 Unix 上，虽然该文件的条目会被删除，但分配给文件的存储空间仍然不可用，直到原始文件不再使用为止。

```py
import os

os.remove(file_path)
```

### walk()

语法：`os.walk(top, topdown=True, onerror=None, followlinks=False)`

作用：top 为目录树，从 top 开始检索，生成 top 中的所有文件名。

对于以 top 为根的目录树中的**每个目录**（包括 top 本身），它都会**生成一个三元组** `(dirpath, dirnames, filenames)`。

三元组的说明：

- `dirpath` 是一个字符串，表示目录的路径。
  - 如果三元组是代表子目录的，那么 `dirpath` 为该子目录
  - 为绝对路径
- `dirnames` 是由 `dirpath` 中的**子目录名称组成的列表**
  - 包括指向目录的符号链接，不包括 '.' 和 '..'
- `filenames` 是由 `dirpath` 中**非目录文件名称组成的列表**。
  - 请注意列表中的名称**不包含路径部分**。
  - 要获取 `dirpath` 中 文件或目录的完整路径，以 top 打头，执行 `os.path.join(dirpath, name)`

`topdown` 的说明：

- `topdown` 为 `True` 或未指定，则**在所有子目录的三元组之前生成父目录的三元组**（目录是**自上而下**生成的）。
- `topdown` 为 `False` ，则**在所有子目录的三元组生成之后再生成父目录的三元组**（目录是**自下而上**生成的）。
- 无论 `topdown` 为何值，在生成目录及其子目录的元组之前，都将检索全部子目录列表。

例子：

1、不访问某个子目录

```py
import os
from os.path import join, getsize
for root, dirs, files in os.walk('python/Lib/xml'):
    if '__pycache__' in dirs:
        dirs.remove('__pycache__')  # 不访问 __pycache__ 目录
```

2、`shutil.rmtree()` 的简单实现

```py
# 删除可从 "top" 指定的目录进入的所有东西，
# 假定其中没有符号连接。
# 注意：这很危险！举例来说，如果 top == '/'，
# 它可能删除你所有的硬盘文件。
import os
for root, dirs, files in os.walk(top, topdown=False):
    for name in files:
        os.remove(os.path.join(root, name))
    for name in dirs:
        os.rmdir(os.path.join(root, name)) # 必须使树自下而上遍历，因为 rmdir() 只允许在目录为空时删除目录:
os.rmdir(top)
```

3、打印目录

文件层级：

```txt
test/
├── test1/
│   ├── test3/
│   │   └── test333.txt
│   └── test111.txt
├── test2/
└── abc.txt
```

自上而下

```py
temp_folder_path = r"C:\test"
for root, dirs, files in os.walk(temp_folder_path):
    print("root: ", root)
    for dir in dirs:
        print("dir: ", dir)
    for file in files:
        print("file: ", file)
    print("")

"""
输出：
root:  C:\Users\kevin.chen\Downloads\test
dir:  test1
dir:  test2
file:  abc.txt

root:  C:\Users\kevin.chen\Downloads\test\test1
dir:  test3
file:  test111.txt

root:  C:\Users\kevin.chen\Downloads\test\test1\test3
file:  test333.txt

root:  C:\Users\kevin.chen\Downloads\test\test2
 """
```

自下而上：

```py
temp_folder_path = r"C:\test"
for root, dirs, files in os.walk(temp_folder_path, False):
    print("root: ", root)
    for dir in dirs:
        print("dir: ", dir)
    for file in files:
        print("file: ", file)
    print("")
"""
输出：

root:  C:\Users\kevin.chen\Downloads\test\test1\test3
file:  test333.txt

root:  C:\Users\kevin.chen\Downloads\test\test1
dir:  test3
file:  test111.txt

root:  C:\Users\kevin.chen\Downloads\test\test2

root:  C:\Users\kevin.chen\Downloads\test
dir:  test1
dir:  test2
file:  abc.txt
"""
```

### stat()

语法：`os.stat(path, *, dir_fd=None, follow_symlinks=True)`

获取文件或文件描述符的状态。函数返回一个 `stat_result` 对象。

## 对象

### DirEntry

语法：`class os.DirEntry`

由 `scandir()` 生成的对象，用于显示目录内某个**条目**的文件路径和其他文件属性。  
每次进行 `stat()` 或 `lstat()` 系统调用时，`os.DirEntry` 对象会将结果缓存下来。

`os.DirEntry` 实例所包含的属性和方法如下：

- `name`
  - 本条目的文件名
- `path`
  - 本条目的文件的完整路径
- `is_dir()`
  - 判断本条目是否为文件夹
- `is_file()`
  - 判断本条目是否为文件
- `stat()`
  - 返回本条目对应的 `stat_result` 对象

### stat_result

语法：`class os.stat_result`

对象的属性大致对应于 `stat` 结构体的成员。 它将被用作 `os.stat()`, `os.fstat()` 和 `os.lstat()` 的输出结果。

属性：

- `st_size`
  - 文件大小（以字节为单位）
- `st_atime`
  - 最近的访问时间，以秒为单位。
  - `st_atime_ns` ：以纳秒为单位。
- `st_mtime`
  - 最近的修改时间，以秒为单位。
  - `st_mtime_ns` ：以纳秒为单位。
- `st_ctime`
  - 以秒为单位
  - 3.12 版本
    - 以秒数表示的**元数据最近更改的时间**。
    - `st_ctime` 在 `Windows` 上已被弃用。 请使用 `st_birthtime` **获取文件创建时间**。 在未来，st_ctime 将包含最近的元数据修改时间，与其他平台一样。
  - 3.12 版本之前
    - 在 `Unix` 上表示**最近的元数据更改时间**
    - 在 `Windows` 上表示**创建时间**
  - `st_ctime_ns` ：以纳秒为单位。
- `st_birthtime`
  - 以秒为单位的**文件创建时间**。
  - `st_birthtime_ns` ：以纳秒为单位。

## 其他系统信息

### os.sep

操作系统用来分隔路径不同部分的字符。在 POSIX 上是 `'/'`，在 Windows 上是是 `'\\'`。
