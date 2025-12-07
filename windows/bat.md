# bat

- [bat](#bat)
  - [命令](#命令)
    - [start](#start)

## 命令

### start

作用：`start` 命令用于在新窗口中启动应用程序、命令或批处理文件。

语法：`start ["title"] [/d path] [/i] [/min] [/max] [/separate | /shared] [/low | /normal | /high | /realtime] [/wait] [/b] [command/program] [parameters]`

参数：

- `“title”`: 可选参数，指定窗口标题。
- `/d path`: 可选参数，指定启动程序的工作目录。
- `/i`: 可选参数，以新窗口中的分离模式启动程序。
- `/min`: 可选参数，启动程序时最小化窗口。
- `/max`: 可选参数，启动程序时最大化窗口。
- `/separate | /shared`: 可选参数，指定启动程序时使用的窗口类型。
  - `/separate` 表示在新的独立窗口启动程序（默认值），
  - `/shared` 表示在共享控制台窗口中启动程序。
- `/low | /normal | /high | /realtime`: 可选参数，指定启动程序时使用的进程优先级。
  - `/low` 表示低优先级
  - `/normal` 表示正常优先级（默认值）
  - `/high` 表示高优先级
  - `/realtime` 表示实时优先级。
- `/wait`: 可选参数，等待程序结束后再退出。
- `/b`: 可选参数，以**后台模式**启动程序。不创建新窗口。使用后可能无法直接与目标程序交互。
  - 如果 `bat` 文件里面使用 `start /b` ，那么运行这个 `bat` 文件不会再创建新的窗口，而是在当前窗口运行程序
