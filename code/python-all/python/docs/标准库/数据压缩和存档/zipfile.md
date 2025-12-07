# zipfile

- [zipfile](#zipfile)
  - [ZipFile 类](#zipfile-类)
    - [函数](#函数)
      - [namelist()](#namelist)
      - [infolist()](#infolist)
      - [extractall()](#extractall)
      - [close()](#close)
      - [write()](#write)

## ZipFile 类

用于读写 `ZIP` 文件的类。参数为压缩文件的路径

```py
import zipfile
def main():
    # 声明 ZipFile 类
    zip_object = zipfile.ZipFile("pythonTest.zip")
```

声明：`class zipfile.ZipFile(file, mode='r', compression=ZIP_STORED, allowZip64=True, compresslevel=None, *, strict_timestamps=True, metadata_encoding=None)`

参数：

- mode
  - 'r' 来读取一个存在的文件
  - 'w' 来覆盖写入新的文件
    - 通常用这个
  - 'a' 来添加到一个存在的文件
  - 'x' 来仅新建并写入新的文件

### 函数

#### namelist()

语法：`ZipFile.namelist()`

返回按名称排序的归档成员列表（返回的是压缩文件里面的文件的名称的列表）。

```py
import zipfile
def main():
    zip_object = zipfile.ZipFile("pythonTest.zip")
    print(zip_object.namelist())
# output：['New folder/', 'New folder1/']
```

#### infolist()

- 返回一个列表，其中包含每个归档成员的 `ZipInfo` 对象。
- 如果 zip 文件里面有一个文件夹，文件夹里面有文件，那么 infolist() 返回的 list 不是只有一个文件夹 info 的 list，而是包含了文件夹 info 和文件夹里面所有文件 info 的 list，文件 info 的 name 为 `{folder}/{file_name}`

```py
import zipfile
def main():
    zip_object = zipfile.ZipFile("pythonTest.zip")
    for info in info_list:
        print(info.filename)
        print(info.isdir())
```

#### extractall()

语法：`ZipFile.extractall(path=None, members=None, pwd=None)`

从压缩文件中提取出所有成员放入当前工作目录。

- `path` 指定一个要放入的不同目录。
- `members` 为可选项且必须为 `namelist()` 所返回列表的一个子集。
  - 作用：传递该参数，会只解压出指定的文件出来
- `pwd` 是 bytes 对象形式的用于**解密已加密文件的密码**。

```py
import zipfile
def main():
    zip_object = zipfile.ZipFile("pythonTest.zip")
    zip_object.extractall("./")
    zip_object.extractall("./", ["New folder/"])
```

#### close()

语法：`ZipFile.close()`

关闭归档文件。

你必须在退出程序之前调用 `close()` 否则将不会写入关键记录数据。

#### write()

语法：`ZipFile.write(filename, arcname=None, compress_type=None, compresslevel=None)`

作用：将文件添加到 ZIP 存档

参数：

- `filename`
  - 要添加到 ZIP 的源文件路径（如 `"data.txt"`）。
- `arcname`（关键参数）
  - 作用：**指定文件在 ZIP 中的存储路径**
    - 如 `"docs/data.txt"`，`docs` 为 zip 文件的文件名，`data.txt` 就直接在 zip 文件的第一层级
    - 如 `C:\user\docs\data.txt`，会忽略盘符，然后 `zip` 文件底下会有一个 `user` 文件夹， `user` 文件夹下有 `docs` 文件夹， `docs` 文件夹有 `data.txt`
  - 默认值 `None`：使用 `filename` 的原始路径（可能包含父目录）
  - 不同文件的 `arcname` 是不一样的，如果设置一样的值会报异常，因为这就代表在 zip 文件有相同名称的文件
  - 一定要指定，且为相对路径
    - 如果为绝对路径，那么 zip 文件也会包含绝对路径上的不必要的文件夹
- `compress_type`
  - 可选值：
    - `zipfile.ZIP_STORED`（不压缩）
    - `zipfile.ZIP_DEFLATED`（默认，DEFLATE 压缩）
  - 若未设置，使用 ZipFile 初始化时的压缩类型
- `compresslevel`（Python 3.7+）
  - 压缩级别（0-9），仅当 compress_type=ZIP_DEFLATED 时有效
  - 默认值：-1（zlib 的默认级别，通常为 6）

使用：

```py

import os, zipfile

# 假如 data 文件夹里面有 123.txt 文件，然后现在将 data 文件夹打包，zip 文件解压后为 data 文件夹
folder_path = r"C:\test\data"
zip_file_path = r"C:\test\data.zip"

with zipfile.ZipFile(zip_file_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(folder_path):
        for file in files:
             # 获取要放到 zip 里面的文件的完整路径
            file_path = os.path.join(root, file) # C:\test\data\123.txt

            # 获取在 zip 里面的存储路径
            file_in_zip_path = os.path.relpath(file_path, os.path.dirname(folder_path))
            # 相当于
            file_in_zip_path = os.path.relpath(file_path, r"C:\test") # data\123.txt 。前面要有 data，这样 zip 解压后才为 data 文件夹
            
            # 写入 zip
            zipf.write(file_path, file_in_zip_path)
```
