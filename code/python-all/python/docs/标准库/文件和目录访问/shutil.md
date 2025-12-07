# shutil

- [shutil](#shutil)
  - [函数](#函数)
    - [move()](#move)
    - [copy()](#copy)
    - [copy() 和其他 copy 函数的区别](#copy-和其他-copy-函数的区别)
    - [copytree()](#copytree)
    - [rmtree()](#rmtree)

`shutil` 模块提供了一系列对文件和文件集合的高阶操作。 特别是提供了一些支持文件拷贝和删除的函数。 对于单个文件的操作，请参阅 `os` 模块。

## 函数

### move()

语法：`shutil.move(src, dst, copy_function=copy2)`

递归地将一个文件或目录 (src) 移到另一位置并返回目标位置。

- dst 存在
  - dst 为目录或或指向目录的符号链接，则 src 将被移到该目录中。
  - dst 为文件，则它可能会被覆盖，具体取决于 `os.rename()` 的语义。
- dst 不存在
  - 相当于调用 `os.rename()` ，将 src 重命名为 dst

```py
import shutil
shutil.move("123.txt", "./file/test.txt")
shutil.move("123.txt", "file")
```

### copy()

语法：`shutil.copy(src, dst, *, follow_symlinks=True)`

- 将**文件** `src` 拷贝到**文件或目录** `dst`。
- `src` 和 `dst` 应为 路径类对象 或字符串。
- 如果 `dst` 指定了一个目录，文件将使用 `src` 中的基准文件名拷贝到 `dst` 中。
- 如果 `dst` 指定了一个已存在的文件，它将被替换。 返回新创建文件所对应的路径。

`copy()` 会拷贝文件数据和文件的权限模式。 其他元数据，例如文件的创建和修改时间不会被保留。 要保留所有原有的元数据，请改用 `copy2()` 。

```py
import shutil

shutil.copy(file_path, folder_path)
```

### copy() 和其他 copy 函数的区别

- copy
  - src 是文件名
  - dst 是目录名或文件名
- copy2
  - src 是文件名
  - dst 是目录名或文件名
  - 和 copy 的区别是会保留元数据
- copyfile
  - src 是文件名
  - dst 是文件名
- copyfileobj
  - src 和 dst 都是 文件型对象
- copytree
  - 递归地将以 src 为根起点的整个目录树拷贝到名为 dst 的目录并返回目标目录。

### copytree()

是将 src 文件夹下的内容复制到 dst 文件夹下，不是将 src 文件夹复制到 dst 文件夹下

如果 dirs_exist_ok 为（默认的）false 且 dst 已存在，则会引发 FileExistsError。 如果 dirs_exist_ok 为真值，则如果拷贝操作遇到已存在的目录时将继续执行，并且在 dst 目录树中的文件将被 src 目录树中对应的文件所覆盖。

### rmtree()

语法：`rmtree(path, ignore_errors=False, onerror=None, *, onexc=None, dir_fd=None)`

- 删除一个完整的目录树
- **path 必须指向一个目录**（但不能是一个目录的符号链接）。
- 如果 `ignore_errors` 为真值，则删除失败导致的错误将被忽略；如果为假值或被省略，则此类错误将通过调用由 onexc 或 onerror 所指定的处理器来处理，或者如果此参数被省略，异常将被传播给调用方。

```py
import shutil

shutil.rmtree("folder_path")
```
