# logging

- [logging](#logging)
  - [概念](#概念)
    - [Logger (日志记录器)](#logger-日志记录器)
      - [常用方法(debug、info、error)](#常用方法debuginfoerror)
    - [Handler (处理器)](#handler-处理器)
    - [Formatter (格式器)](#formatter-格式器)
    - [Filter (过滤器)](#filter-过滤器)
    - [配置方式对比](#配置方式对比)
  - [使用 logging 配置](#使用-logging-配置)
  - [使用 logger 配置](#使用-logger-配置)
    - [logger](#logger)
    - [Handler](#handler)
      - [FileHandler](#filehandler)
      - [BaseRotatingHandler](#baserotatinghandler)
        - [RotatingFileHandler](#rotatingfilehandler)
        - [TimedRotatingFileHandler](#timedrotatingfilehandler)
        - [更改 TimedRotatingFileHandler 的文件的命名规则](#更改-timedrotatingfilehandler-的文件的命名规则)
    - [Formatter](#formatter)
    - [Filter](#filter)
    - [使用](#使用)
  - [使用 dictConfig](#使用-dictconfig)
  - [多个模块共用一个 Logger](#多个模块共用一个-logger)
    - [创建共享 Logger 对象](#创建共享-logger-对象)
    - [使用日志继承机制](#使用日志继承机制)
    - [使用第三方库](#使用第三方库)
  - [LogRecord 格式](#logrecord-格式)
    - [LogRecord 添加自定义值](#logrecord-添加自定义值)
  - [handler](#handler-1)

## 概念

logging 模块是线程安全的，但在多进程中需要特殊处理（每个进程需要单独配置）

图解：

```txt
[Your Code]
    │
    ↓ (调用logging方法)
[Logger] 
    │ 
    ↓ (创建LogRecord)
[Filter] → 决定是否继续处理
    │
    ↓
[Handler]
    │
    ↓ (应用Formatter)
[Formatter] → 最终输出格式
    │
    ↓
[输出目标] (文件/控制台/网络等)
```

日志级别：

- DEBUG：详细信息，通常只在调试时使用
- INFO：确认程序按预期运行
- WARNING：表明发生了意外情况，或即将发生问题
- ERROR：由于更严重的问题，程序无法执行某些功能
- CRITICAL：严重错误，程序可能无法继续运行

### Logger (日志记录器)

作用：应用程序直接交互的接口，负责产生日志记录

特性：

- 形成层次结构（通过点号分隔，如 `parent.child`）
- 有日志级别（`DEBUG, INFO, WARNING, ERROR, CRITICAL`）
- 可以设置传播行为（`propagate`）

#### 常用方法(debug、info、error)

- `logger.debug(), logger.info(), logger.warning(), logger.critical()`
- `logger.error()`
  - **不会自动记录堆栈信息**，如果要记录堆栈信息，需要另外写：
  - 设置 `exc_info=True` 参数。自动记录堆栈信息，但是不能改变堆栈信息的格式

    ```py
    import logging
    try:
        1 / 0
    except Exception:
        logging.error("发生除零错误", exc_info=True)
    ```

  - 使用 `traceback` 模块手动获取堆栈信息并记录，可以自己更改堆栈的信息

    ```py
    import logging
    import traceback

    stack_trace = traceback.format_exc()
    logging.error("堆栈跟踪:\n%s", stack_trace)
    ```

- `logger.exception()` (专门记录异常)
  - 自动记录异常和堆栈信息，会在最后面打印堆栈信息
  - 日志级别为 `ERROR`
  - 与 `logging.error("...", exc_info=True)` 效果一样
- `logger.log()` (通用记录方法)
- `logger.setLevel()`

### Handler (处理器)

作用：决定日志记录的发往目的地

常见类型：

- `StreamHandler`：输出到流（如控制台）
- `FileHandler`：输出到文件
- `RotatingFileHandler`：按大小轮转的日志文件
- `TimedRotatingFileHandler`：按时间轮转的日志文件
- `SMTPHandler`：发送邮件
- `SocketHandler`：发送到网络套接字

关键方法：

- `handler.setLevel()` (可设置与logger不同的级别)
- `handler.setFormatter()`
- `handler.addFilter()`

### Formatter (格式器)

作用：定义日志记录的最终输出格式

常用格式字段：

- `%(asctime)s`：日志创建时间
- `%(name)s`：logger名称
- `%(levelname)s`：日志级别
- `%(message)s`：日志消息
- `%(pathname)s`：调用日志的源文件路径
- `%(lineno)d`：调用日志的代码行号
- `%(funcName)s`：调用日志的函数名

示例：

```python
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
```

### Filter (过滤器)

作用：提供比日志级别更细粒度的控制

典型用法：

```python
class MyFilter(logging.Filter):
    def filter(self, record):
        # 只允许包含特定关键词的消息通过
        return 'important' in record.getMessage()

logger.addFilter(MyFilter())
```

### 配置方式对比

|配置方式|适用场景|优点|缺点|
|--|--|--|--|
|basicConfig|简单脚本|快速简单|功能有限|
|logger 配置|中小型项目|灵活直观|修改需要改代码|
|dictConfig|大型项目/生产环境|强大灵活，支持复杂配置|学习曲线稍高|

## 使用 logging 配置

使用 `logging.basic_config()` 进行配置

作用：通过使用默认的 `Formatter` 创建一个 `StreamHandler` 并将其加入根日志记录器来为日志记录系统执行基本配置。（即默认是将日志输出到控制台，指定了 `filename` 才输出到文件）

支持以下关键字参数。

|格式|描述|
|--|--|
|`filename`|使用指定的文件名创建一个 `FileHandler`，而不是 `StreamHandler`。如果是路径则输出到指定路径的文件。|
|`filemode`|如果指定了 `filename`，则用此 模式 打开该文件。 默认模式为 'a'。|
|`format`|使用指定的格式字符串作为处理器。 默认为属性以冒号分隔的 `levelname, name` 和 `message`。|
|`datefmt`|使用指定的日期/时间格式，与 `time.strftime()` 所接受的格式相同。|
|`style`|如果指定了 format，将为格式字符串使用此风格。 `'%'`, `'{'` 或 `'$'` 分别对应于 printf 风格, str.format() 或 string.Template。 默认为 '%'。|
|`level`|设置根记录器级别为指定的 level.|
|`stream`|使用指定的流初始化 StreamHandler。 请注意此参数与 filename 不兼容 —— 如果两者同时存在，则会引发 ValueError。|
|`handlers`|如果指定，这应为一个包含要加入根日志记录器的已创建处理器的可迭代对象。 任何尚未设置格式描述符的处理器将被设置为在此函数中创建的默认格式描述符。 请注意此参数与 filename 或 stream 不兼容 —— 如果两者同时存在，则会引发 ValueError。|
|`force`|如果将此关键字参数指定为 true，则在执行其他参数指定的配置之前，将移除并关闭附加到根记录器的所有现有处理器。|
|`encoding`|如果此关键字参数与 filename 一同被指定，则其值会在创建 FileHandler 时被使用，因而也会在打开输出文件时被使用。|
|`errors`|如果此关键字参数与 filename 一同被指定，则其值会在创建 FileHandler 时被使用，因而也会在打开输出文件时被使用。 如果未指定，则会使用值 'backslashreplace'。 请注意如果指定为 None，它将被原样传给 open()，这意味着它将会当作传入 'errors' 一样处理。|

将日志输出到文件：

```py
import logging


logging.basicConfig(
    filename="app.log",  # 日志文件名
    filemode="a",  # 追加模式
    level=logging.INFO,  # 记录级别
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


def hello():
    logging.info("info logging")
    logging.warning("warn logging")


if __name__ == "__main__":
    hello()
```

指定 handlers（指定了 handlers，就不能配置 filename 和 filemode，会报错）：

```py
import logging

file_path = r"C:\Project\pythonTest\logging\123.log"
file_handler = logging.FileHandler(file_path)

logging.basicConfig(
    level=logging.INFO,  # 记录级别
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[file_handler], # 注意要传递可迭代对象
    datefmt="%Y-%m-%d %H:%M:%S",
)


def hello():
    logging.info("info logging")
    logging.warning("warn logging")


if __name__ == "__main__":
    hello()
```

## 使用 logger 配置

### logger

`logging.getLogger(name=None)`

- 返回一个由 `name` 指定名称的日志记录器，或者如果 `name` 为 `None` 则返回层级结构中的**根日志记录器**。
- 如果指定了 `name`，它通常是以点号分隔的带层级结构的名称如 `'a', 'a.b'` 或 `'a.b.c.d'`。
- `name` 建议使用 `__name__`
- 多次使用相同的名字调用 `getLogger()` 会一直返回相同的 `Logger` 对象的引用。

`Logger` 对象的函数:

- `setLevel(level)`
- `addHandler(hdlr)`
  - 将指定的处理器 hdlr 添加到此记录器。
- `addFilter(filter)`
  - 将指定的过滤器 filter 添加到此记录器。
- `removeFilter(filter)`
  - 此记录器中删除指定的过滤器 filter。
- `getChild(suffix)`
  - 返回由后缀确定的该记录器的后代记录器。
  - 因此，`logging.getLogger('abc').getChild('def.ghi')` 与 `logging.getLogger('abc.def.ghi')` 将返回相同的记录器。

### Handler

`Handler` 对象的函数:

- `setLevel(level)`
- `setFormatter(fmt)`
  - 将处理器的格式设为 `fmt`。 `fmt` 参数必须为 `Formatter` 实例或 `None`。
- `addFilter(filter)`
  - 将指定的过滤器 `filter` 添加到此处理器。
- `removeFilter(filter)`
  - 从此处理器中删除指定的过滤器 `filter` 。

#### FileHandler

语法：`class logging.FileHandler(filename, mode='a', encoding=None, delay=False, errors=None)`

- filename：日志文件的名称或路径
- encoding：编码
  - 如果日志涉及中文，需设置为 `encoding='utf-8'`

#### BaseRotatingHandler

轮换文件处理程序类 `RotatingFileHandler` 和 `TimedRotatingFileHandler` 的基类

属性：

- `namer`
  - 如果此属性被设为一个可调用对象，则 `rotation_filename()` 方法会委托给该可调用对象。 传给该可调用对象的形参与传给 `rotation_filename()` 的相同。
- `rotator`
  - 如果此属性被设为一个可调用对象，则 `rotate()` 方法会委托给该可调用对象。 传给该可调用对象的形参与传给 `rotate()` 的相同。
- `rotation_filename(default_name)`
  - **当轮换时修改日志文件的文件名**。
  - 提供该属性以便可以提供自定义文件名。
  - 默认实现会调用处理程序的 `'namer'` 属性，如果它是可调用对象的话，并传给它默认的名称。 如果该属性不是可调用对象 (默认值为 None)，则将名称原样返回。
  - 参数:
    - `default_name` -- 日志文件的默认名称。
- `rotate(source, dest)`
  - **当执行轮换时，轮换当前日志**（执行轮换的操作）。
  - 默认实现会调用处理程序的 `'rotator'` 属性，如果它是可调用对象的话，并传给它 `source` 和 `dest` 参数。 如果该属性不是可调用对象 (默认值为 None)，则将源简单地重命名为目标。
  - 参数:
    - `source` -- 源文件名。 这通常为基本文件名，例如 'test.log'。
    - `dest` -- 目标文件名。 这通常是源被轮换后的名称，例如 'test.log.1'。

##### RotatingFileHandler

`RotatingFileHandler` 类位于 `logging.handlers` 模块，它支持磁盘日志文件的轮换。

默认情况下，文件会无限增长

语法：`class logging.handlers.RotatingFileHandler(filename, mode='a', maxBytes=0, backupCount=0, encoding=None, delay=False, errors=None)`

使用：`from logging.handlers import RotatingFileHandler`

参数：

- `filename`
  - 指定的日志的文件名
- `mode`
  - 未指定 `mode`，则会使用 `'a'`
- `encoding`
  - 如果 `encoding` 不为 `None`，则会将其用作打开文件的编码格式
- `delay`
  - 如果 `delay` 为真值，则文件打开会被推迟至第一次调用 `emit()`
- `errors`
  - 如果提供了 `errors`，它会被用于确定编码格式错误的处理方式。

轮换的规则：

- 你可以使用 `maxBytes` 和 `backupCount` 值来允许文件以预定的大小执行 `rollover`。
- 当即将超出预定大小时，将关闭旧文件并打开一个新文件用于输出。
- 只要当前日志文件长度接近 `maxBytes` 就会发生轮换；但是如果 `maxBytes` 或 `backupCount` 两者之一的值为零，就不会发生轮换，因此你通常要设置 `backupCount` 至少为 1，而 `maxBytes` 不能为零。
- 当 `backupCount` 为非零值时，系统将通过为原文件名添加扩展名 `'.1'`, `'.2'` 等来保存旧日志文件。
  - 例如，当 `backupCount` 为 5 而基本文件名为 `app.log` 时，你将得到 `app.log, app.log.1, app.log.2` 直至 `app.log.5`。
  - **当前被写入的文件总是 `app.log`。 当此文件写满时，它会被关闭并重户名为 `app.log.1`**，而如果文件 `app.log.1, app.log.2` 等存在，则它们会被分别重命名为 `app.log.2, app.log.3` 等等。
- 如果 `backupCount` 不为 0 ，那么保存的旧日志文件的个数最多为 `backupCount`。如果保存的日志的数量超过 `backupCount`，那么最老的日志将会被删掉

方法：

- `emit(record)`
  - 将记录输出到文件，以适应上文所描述的轮换。

##### TimedRotatingFileHandler

`TimedRotatingFileHandler` 类位于 `logging.handlers` 模块，它支持**基于特定时间间隔的磁盘日志文件轮换**。

指定的文件会被打开并用作日志记录的流。 对于轮换操作它还会设置文件名前缀。 轮换的发生是基于 `when` 和 `interval` 的积。

语法：`class logging.handlers.TimedRotatingFileHandler(filename, when='h', interval=1, backupCount=0, encoding=None, delay=False, utc=False, atTime=None, errors=None)`

参数：

- `when`
  - 使用 `when` 指定 `interval` 的值，即指定是间隔多少秒或者间隔多少小时来对日志进行轮换
  - 类型
    - `S`（秒）、`M`（分钟）、`H`（小时）、`D`（天）、`WO`-`W6`（工作日，0=星期一）、`midnight`（如果未指定 `atTime` 则在午夜执行轮换，否则将使用 `atTime`）
    - 当使用基于星期的轮换时，星期一为 `'W0'`，星期二为 `'W1'`，以此类推直至星期日为 `'W6'`。 在这种情况下，传入的 `interval` 值不会被使用。
    - 当 `when` 为 `midnight` 时
      - `when='midnight', interval=1`：每天生成新日志文件‌
      - `when='midnight', interval=3`：每隔 3 天生成新日志文件‌
      - `when='midnight', interval=0`：此配置无效（`interval` 必须 ≥ 1）
- `interval`
  - 默认为 1。为 int 类型
- `utc`
  - 如果 utc 参数为真值，将使用 UTC 时间；否则会使用本地时间。
- `backupCount`
  - 如果 `backupCount` 不为零，则最多将保留 `backupCount` 个文件，而如果当轮换发生时创建了更多的文件，则最旧的文件会被删除。
- `atTime`
  - 如果 `atTime` 不为 `None`，则它必须是一个 `datetime.time` 的实例，该实例指定轮换在一天内的发生时间，用于轮换被设为“在午夜”或“在每星期的某一天”之类的情况。
- `errors`
  - 如果提供了 `errors`，它会被用于确定编码格式错误的处理方式。

轮换规则：

- 系统将通过为文件名添加扩展名来保存旧日志文件。 扩展名是基于日期和时间的，根据轮换间隔的长短使用 `strftime` 格式 `%Y-%m-%d_%H-%M-%S`
- 当首次计算下次轮换的时间时（即当处理程序被创建时），**现有日志文件的上次被修改时间或者当前时间会被用来计算下次轮换的发生时间**，不是文件中最后一条 log 的写入时间。
- 简单理解：
  - 假设 when 为 `S`， `interval` 为 10，如果日志一直在记录是都会保存到同一个日志文件里面。当现在需要记录日志的当前时间与上一次编辑日志文件的时间相差大于 `10 s`，那么就会新建一个日志文件记录当前日志
  - 假设 when 为 `midnight`， `interval` 为 1，如果日志文件的**上次被修改时间**与当前时间不是同一天，那么就会新建一个日志文件记录当前日志

例子：

```py
from logging.handlers import TimedRotatingFileHandler

formatter = logging.Formatter(
    "[%(asctime)s] [PID:%(process)d] %(levelname)s @ %(name)s: %(message)s"
)
log_file_path = "worker.log"

# 每天轮换一次
handler = TimedRotatingFileHandler(
    log_file_path,
    when="midnight",
    encoding="utf-8",
    utc=True
)
handler.setFormatter(formatter)
handler.setLevel(logging.INFO)

logger.addHandler(handler)
```

##### 更改 TimedRotatingFileHandler 的文件的命名规则

通过设置 `TimedRotatingFileHandler` 的 `namer` 属性设置

```py
import logging, os
from logging.handlers import TimedRotatingFileHandler


logger = logging.getLogger("test")
logger.setLevel(logging.INFO)


def custom_namer(default_name):
    """
    将默认的 filename.log.2023-08-15 格式改为
    filename-2023-08-15.log
    """
    file_name, timestamp = os.path.splitext(default_name)
    timestamp = timestamp[1:]
    base_file_name, ext = os.path.splitext(file_name)
    return f"{base_file_name}-{timestamp}{ext}"


file_path = r"logger.log"
file_handler = TimedRotatingFileHandler(file_path, when="S", interval=3)
file_handler.setLevel(logging.DEBUG)
file_handler.namer = custom_namer

formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)


def hello():
    logger.info("info logging")
    print("123")
    logger.warning("warn logging")
    logger.info("warn logging important")


if __name__ == "__main__":
    hello()
```

### Formatter

语法：`class logging.Formatter(fmt=None, datefmt=None, style='%', validate=True, *, defaults=None)`

作用：负责将一个 `LogRecord` 转换为可供人类或外部系统解读的输出字符串。

参数：

- `fmt`
  - `str`
  - 用于日志记录整体输出的给定 style 形式的格式字符串。 可用的映射键将从 LogRecord 对象的 LogRecord 属性 中提取。 如果未指定，则将使用 '%(message)s'，即已记录的日志消息。
- `datefmt`
  - `str`
  - 用于日志记录输出的日期/时间部分的给定 style 形式的格式字符串。 如果未指定，则将使用 formatTime() 中描述的默认值。

### Filter

任何一个包含有相同语义的 `filter` 方法的实例都为 `Filter`，例子：

```py
class MyFilter(logging.Filter):
    def filter(self, record):
        # 只记录包含特定关键词的消息
        return 'important' in record.getMessage()

my_filter = MyFilter()
logger.addFilter(my_filter)
# or
logger.addFilter(MyFilter())
```

或者使用函数：

```py
def my_filter_func(record):
    # 只记录包含"important"的消息
    return "important" in record.getMessage()
logger.addFilter(my_filter_func)

# 使用 lambda
logger.addFilter(lambda record: record.levelno >= logging.WARNING)
```

### 使用

1. 创建 logger
2. 创建 handler（FileHandler 或者 StreamHandler）
3. 创建 formatter，handler 设置 formatter
   1. 不设置 formatter 的话打印出来的 log 只有内容
4. 创建 filter，handler 添加 filter（可选）
5. 创建 filter，logger 添加 filter（可选）
6. logger 添加 handler

```py
import logging

# 创建logger
logger = logging.getLogger('my_app')
logger.setLevel(logging.DEBUG)

# 创建文件处理器
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.INFO)

# 创建控制台处理器
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# 创建格式器并添加到处理器
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

# 将处理器添加到logger
logger.addHandler(file_handler)
logger.addHandler(console_handler)

logger.info('这条信息会同时出现在控制台和文件中')
```

## 使用 dictConfig

配置 root logger：

```py
import logging.config

logging.config.dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'default',
            'level': 'INFO'
        }
    },
    'root': {
        'level': 'DEBUG',
        'handlers': ['console']
    }
})
```

配置自定义 logger：

```py
# logging_config.py
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'INFO',
            'stream': 'ext://sys.stdout'
        },
    },
    'loggers': {
        'my_app': {  # 父logger
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False
        }
    }
}

# __init__.py
import logging.config
from logging_config import LOGGING_CONFIG

logging.config.dictConfig(LOGGING_CONFIG)

# module1.py
import logging
logger = logging.getLogger('my_app.module1')

# module2.py
import logging
logger = logging.getLogger('my_app.module2')
```

## 多个模块共用一个 Logger

### 创建共享 Logger 对象

两种方式：

1、在单独配置模块中定义:

```py
# logger_config.py
import logging

# 配置共享logger
shared_logger = logging.getLogger('my_app')
shared_logger.setLevel(logging.INFO)

# 添加处理器
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
shared_logger.addHandler(handler)

# 其他模块使用
# module1.py
from logger_config import shared_logger

shared_logger.info("模块1的消息")

# module2.py
from logger_config import shared_logger

shared_logger.warning("模块2的警告")
```

2、使用 `__name__` 创建子 `logger`：

```py
# logger_config.py
import logging

# 配置共享logger
shared_logger = logging.getLogger('my_app')
shared_logger.setLevel(logging.INFO)

# 添加处理器
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
shared_logger.addHandler(handler)

# 其他模块使用
# module1.py
from logger_config import shared_logger

logger = shared_logger.getChild('module1')
logger.info("模块1的详细信息")

# module2.py
from logger_config import shared_logger

logger = shared_logger.getChild('module2')
logger.info("模块2的详细信息")
```

### 使用日志继承机制

项目结构：

```py
my_project/
├── __init__.py
├── logging_config.py
├── module1.py
└── module2.py
```

原理：

- my_project 项目外的文件调用里面的 module 时，会运行 `__init__.py` 文件从而配置了父 logger
- 如果是直接运行 module1.py 是不会输出日志的，因为没有运行 `__init__.py`，没有配置父 logger，所以用不了父 logger 的配置

logging_config.py

```py
import logging

def setup_parent_logger(parent_name='my_custom_logger'):
    """配置自定义名称的父logger"""
    
    # 创建父logger
    parent_logger = logging.getLogger(parent_name)
    parent_logger.setLevel(logging.INFO)
    
    # 避免重复配置
    if not parent_logger.handlers:
        # 创建控制台处理器
        console_handler = logging.StreamHandler()
        
        # 设置格式
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_handler.setFormatter(formatter)
        
        # 添加处理器
        parent_logger.addHandler(console_handler)
    
    return parent_logger
```

init.py

```py
from .logging_config import setup_parent_logger

# 初始化父logger（使用自定义名称）
setup_parent_logger('my_special_logger')
```

module1.py

```python
import logging

# 创建子logger（自动继承父logger配置）
logger = logging.getLogger('my_special_logger.module1')

def do_task():
    logger.info("这是module1的信息")
    logger.debug("这条不会显示（因为父logger级别是INFO）")
```

module2.py

```python
import logging

# 创建子logger
logger = logging.getLogger('my_special_logger.module2')

def do_task():
    logger.warning("这是module2的警告")
```

test.py（另外一个项目的文件）

```py
from my_project import module1, module2

module1.do_task()
module2.do_task()
```

### 使用第三方库

loguru

## LogRecord 格式

|属性名称|格式|描述|
|--|--|--|
|args|此属性不需要用户进行格式化。|合并到 msg 以产生 message 的包含参数的元组，或是其中的值将被用于合并的字典（当只有一个参数且其类型为字典时）。|
|asctime|`%(asctime)s`|表示人类易读的 LogRecord 生成时间。 默认形式为 '2003-07-08 16:49:45,896' （逗号之后的数字为时间的毫秒部分）。|
|created|`%(created)f`|当 LogRecord 被创建的时间（即 time.time_ns() / 1e9 所返回的值）。|
|exc_info|此属性不需要用户进行格式化。|异常元组（例如 sys.exc_info）或者如未发生异常则为 None。|
|filename|`%(filename)s`|pathname 的文件名部分。|
|funcName|`%(funcName)s`|函数名包括调用日志记录.|
|levelname|`%(levelname)s`|消息文本记录级别（'DEBUG'，'INFO'，'WARNING'，'ERROR'，'CRITICAL'）。|
|levelno|`%(levelno)s`|消息数字的记录级别 (DEBUG, INFO, WARNING, ERROR, CRITICAL).|
|lineno|`%(lineno)d`|发出日志记录调用所在的源行号（如果可用）。|
|message|`%(message)s`|记入日志的消息，即 msg % args 的结果。 这是在唤起 Formatter.format() 时设置的。|
|module|`%(module)s`|模块 (filename 的名称部分)。|
|msecs|`%(msecs)d`|LogRecord 被创建的时间的毫秒部分。|
|msg|此属性不需要用户进行格式化。|在原始日志记录调用中传入的格式字符串。 与 args 合并以产生 message，或是一个任意对象 (参见 使用任意对象作为消息)。|
|name|`%(name)s`|用于记录调用的日志记录器名称。|
|pathname|`%(pathname)s`|发出日志记录调用的源文件的完整路径名（如果可用）。|
|process|`%(process)d`|进程ID（如果可用）|
|processName|`%(processName)s`|进程名（如果可用）|
|relativeCreated|`%(relativeCreated)d`|以毫秒数表示的 LogRecord 被创建的时间，即相对于 logging 模块被加载时间的差值。|
|stack_info|此属性不需要用户进行格式化。|当前线程中从堆栈底部起向上直到包括日志记录调用并引发创建当前记录堆栈帧创建的堆栈帧信息（如果可用）。|
|thread|`%(thread)d`|线程ID（如果可用）|
|threadName|`%(threadName)s`|线程名（如果可用）|
|taskName|`%(taskName)s`|asyncio.Task 名称（如果可用）。|

### LogRecord 添加自定义值

在创建时可使用此功能将你自己的值注入 LogRecord。 你可以使用以下模式:

```py
old_factory = logging.getLogRecordFactory()

def record_factory(*args, **kwargs):
    record = old_factory(*args, **kwargs)
    record.custom_attribute = 0xdecafbad
    return record

logging.setLogRecordFactory(record_factory)
```

## handler

| 处理器类 | 功能 |
| ------- | ----- |
| `StreamHandler` | 发送消息到流（如标准输出、文件对象等） |
| `FileHandler` | 将消息发送到硬盘文件 |
| `RotatingFileHandler` | 发送消息到硬盘文件，支持最大日志文件大小和日志文件轮换 |
| `TimedRotatingFileHandler` | 发送消息到硬盘文件，按特定时间间隔轮换日志文件 |
| `SocketHandler` | 将消息发送到TCP/IP套接字（3.4起支持Unix域套接字） |
| `DatagramHandler` | 将消息发送到UDP套接字（3.4起支持Unix域套接字） |
| `SMTPHandler` | 将消息发送到指定的电子邮件地址 |
| `SysLogHandler` | 将消息发送到Unix syslog守护程序（可在远程计算机上） |
| `NTEventLogHandler` | 将消息发送到Windows NT/2000/XP事件日志 |
| `MemoryHandler` | 将消息发送到内存中的缓冲区，满足特定条件时刷新 |
| `HTTPHandler` | 使用GET或POST方法将消息发送到HTTP服务器 |
| `WatchedFileHandler` | 监视要写入日志的文件，文件更改时重新打开（仅类Unix系统有用） |
| `QueueHandler` | 将消息发送到队列（如queue或multiprocessing模块中的队列） |
| `NullHandler` | 不对日志消息执行任何操作，用于避免“找不到日志记录器处理器”警告 |
