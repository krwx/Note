# configparser

- [configparser](#configparser)
  - [基本使用](#基本使用)
  - [受支持的 INI 文件结构](#受支持的-ini-文件结构)
  - [支持的数据类型](#支持的数据类型)
  - [值的插值](#值的插值)
  - [函数](#函数)
    - [read()](#read)

配置文件解析器

## 基本使用

`configparser` 类可以读取和写入 `INI` 文件

注意：

- `DEFAULT` 小节，它为所有其他小节提供了默认值
- 值不用加双引号

配置文件例子：

```ini
[DEFAULT]
ServerAliveInterval = 45
Compression = yes
CompressionLevel = 9
ForwardX11 = yes

[forge.example]
User = hg

[topsecret.server.example]
Port = 50022
ForwardX11 = no
```

写入配置：

```py
import configparser
config = configparser.ConfigParser()
# 设置默认值
config['DEFAULT'] = {'ServerAliveInterval': '45',
                     'Compression': 'yes',
                     'CompressionLevel': '9'}
# 设置值
config['forge.example'] = {}
config['forge.example']['User'] = 'hg'
config['topsecret.server.example'] = {}
topsecret = config['topsecret.server.example']
topsecret['Port'] = '50022'     # mutates the parser
topsecret['ForwardX11'] = 'no'  # same here
config['DEFAULT']['ForwardX11'] = 'yes'

# 插入新的 section
config['new.section'] = {}
config['new.section']["newValue"] = "value"

# 写入配置
with open('example.ini', 'w') as configfile:
  config.write(configfile)
```

读取配置：

```py
config = configparser.ConfigParser()
config.sections()
# 读取文件
config.read('example.ini') # output：['example.ini']
config.sections() # output：['forge.example', 'topsecret.server.example']

'forge.example' in config # output：True
'python.org' in config # output：False

config['forge.example']['User'] # output：'hg'
config['DEFAULT']['Compression'] # output：'yes'

topsecret = config['topsecret.server.example']
topsecret['ForwardX11'] # output：'no'

# 会打印默认的值
for key in config['forge.example']:  
    print(key)
""" 
output：
user
compressionlevel
serveraliveinterval
compression
forwardx11
"""
```

将多个配置读入单个 `ConfigParser` 是可以的，其中最近添加的配置具有最高优先级。 任何冲突的键都会从更近的配置获取并且先前存在的键会被保留。

```py
config_override = configparser.ConfigParser()
config_override.read(['example.ini', 'override.ini'])

print(config_override['DEFAULT']['Compression'])
```

## 受支持的 INI 文件结构

配置文件是由小节组成的，每个小节都有一个 `[section]` 标头，加上多个由特定字符串 (默认为 `=` 或 `:` ) 分隔的键/值条目。

- 在默认情况下，小节名对大小写敏感而**键对大小写不敏感**。
- 键和值开头和末尾的空格会被移除。
- 在解释器配置允许时值可以被省略，在此情况下键/值分隔符也可以被省略。
- 值还可以跨越多行，只要值的其他行带有比第一行更深的缩进。
- 依据解析器的具体模式，空白行可能会被视为多行值的组成部分或是被忽略。
- 配置文件可以包含注释，要带有指定字符前缀 (默认为 `#` 和 `;` )。 注释可以单独出现于原本的空白行，并可使用缩进。

例如：

```ini
[Simple Values]
key=value
spaces in keys=allowed
you can also use : to delimit keys from values

[All Values Are Strings]
values like this: 1000000
or this: 3.14159265359
are they treated as numbers? : no
integers, floats and booleans are held as: strings
can use the API to get converted values directly: true

[Multiline Values]
chorus: I'm a lumberjack, and I'm okay
    I sleep all night and I work all day

[No Values]
key_without_value
empty string value here =

[You can use comments]
# like this
; or this
```

## 支持的数据类型

配置解析器总是将值在内部存储为字符串，需要其他数据类型时，要自己转换:

```py
int(topsecret['Port'])
# 50022
float(topsecret['CompressionLevel'])
# 9.0
```

配置解析器提供了一系列便捷的获取方法来处理整数、浮点数和布尔值：

- getint()
- getfloat()
- getboolean()

```py
topsecret.getboolean('ForwardX11')
# False
config['forge.example'].getboolean('ForwardX11')
# True
config.getboolean('forge.example', 'Compression')
# True
```

## 值的插值

```ini
[Paths]
home_dir: /Users
my_dir: %(home_dir)s/lumberjack
my_pictures: %(my_dir)s/Pictures

[Escape]
# use a %% to escape the % sign (% is the only character that needs to be escaped):
gain: 80%%
```

在上面的例子里， `ConfigParser` 的 `interpolation` 设为 `BasicInterpolation()`，这会将 `%(home_dir)s` 求解为 `home_dir` 的值 (在这里是 `/Users`)。 `%(my_dir)s` 的将被实际求解为 `/Users/lumberjack`。 所有插值都是按需进行的，这样引用链中使用的键不必以任何特定顺序在配置文件中指明。

当 `interpolation` 设为 `None` 时，解析器会简单地返回 `%(my_dir)s/Pictures` 作为 `my_pictures` 的值，并返回 `%(home_dir)s/lumberjack` 作为 `my_dir` 的值。

## 函数

### read()

语法：`read(filenames, encoding=None)`

用途：尝试读取并解析一个包含文件名的可迭代对象，返回一个被成功解析的文件名列表。

如果 `filenames` 为字符串、`bytes` 对象或 `path-like object`，它会被当作单个文件来处理。

如果 filenames 中名称对应的某个文件无法被打开，该文件将被忽略。

可以指定包含多个潜在配置文件位置的可迭代对象（例如当前目录、用户家目录以及某个系统级目录）(**列表**)，存在于该可迭代对象中的所有配置文件都将被读取。

如果名称对应的文件全都不存在，则 `ConfigParser` 实例将包含一个空数据集。

```py
import configparser, os

config = configparser.ConfigParser()
config.read_file(open('defaults.cfg'))
config.read(['site.cfg', os.path.expanduser('~/.myapp.cfg')],
            encoding='cp1250')
```
