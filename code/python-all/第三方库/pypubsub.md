# pypubsub

- [pypubsub](#pypubsub)
  - [安装](#安装)
  - [语法](#语法)
    - [subscribe](#subscribe)
    - [sendMessage](#sendmessage)
  - [例子](#例子)
    - [同一 py 文件](#同一-py-文件)
    - [不同 py 文件，一个主程序入口](#不同-py-文件一个主程序入口)

`pypubsub` 支持**同一进程**（运行一个脚本相当于）内不同模块通信，通过发布订阅模式实现。不同模块（不同 `.py` 文件）共享同一个进程内的消息总线。

如果不同的 python 脚本分别运行，默认情况下无法直接使用 `pypubsub`，因为 `pypubsub` 是进程内通信库，不涉及网络或跨进程通信。独立进程的内存空间隔离，无法共享 `pypubsub` 的内部状态

注意：

- `sendMessage` 后，所有 `subscribe` 了的模块都可以接收到数据
- 线程安全
  - 如果发布者和订阅者运行在不同线程中，需确保线程安全。
- 导入顺序
  - 确保订阅者在发布者发送消息前已经注册。通常在主文件中先导入订阅者模块，再导入发布者模块。（但是好像没关系）

使用场景：

- 同一进程（同一主程序）内各个模块进行通信

## 安装

命令：`conda install pypubsub`

## 语法

### subscribe

语法：`pub.subscribe(callable, 'topic-path')`

`callable` 可以是 函数 或者 定义了 `__call__` 函数的类 或者 类里面的方法

例子：

```py
def function(): pass

class Foo:
    def method(self): pass

    @staticmethod
    def staticMeth(): pass

    @classmethod
    def classMeth(cls): pass

    def __call__(self): pass

foo = Foo()
```

以下都可以成为 callable：

```txt
function
foo.method
foo
Foo.staticMeth
Foo.classMeth
```

topic 的意思为订阅的事件的名称，数据类型为 string。可以有子 topic：

```py
pub.subscribe(callable, 'root-topic-1')
pub.subscribe(callable, 'root-topic-1.sub-topic-2')
pub.subscribe(callable, 'root-topic-1.sub-topic-2.sub-sub-topic-3')
```

callable 是接收数据用的，如果需要使用接收的数据，需要在参数中使用名称声明。参数关系如下：

|语法|说明|
|--|--|
|callable(arg1)|required: arg1, optional: none|
|callable(arg3=1)|required: none,optional: arg3|
|callable(arg1, arg2, arg3=1, arg4=None) |required: arg1, arg2, optional: arg3, arg4|

### sendMessage

语法：`pub.sendMessage('topic-path-name', **data)`

发送的数据的名称需要使用和 callable 定义的数据的名称一样

```py
pub.sendMessage('root', arg1=obj1, arg2=obj2, arg3=obj3)
```

## 例子

### 同一 py 文件

```py
from pubsub import pub


# ------------ create a listener ------------------

def listener1(arg1, arg2=None):
    print('Function listener1 received:')
    print('  arg1 =', arg1)
    print('  arg2 =', arg2)


# ------------ register listener ------------------

pub.subscribe(listener1, 'rootTopic')

# ---------------- send a message ------------------

print('Publish something via pubsub')
anObj = dict(a=456, b='abc')
pub.sendMessage('rootTopic', arg1=123, arg2=anObj)
```

输出：

```txt
Publish something via pubsub
Function listener1 received:
  arg1 = 123
  arg2 = {'a': 456, 'b': 'abc'}
```

### 不同 py 文件，一个主程序入口

main.py

```py
import subscriber
import other_subscriber # 可以有多个订阅者
import publisher
import other_subscriber
import asyncio


if __name__ == "__main__":
    publisher.publish_update()  # 触发消息发布
    asyncio.run(publisher.test_async()) # 异步，等待发送通知
```

publisher.py

```py
from pubsub import pub
import asyncio


async def test_async():
    await asyncio.sleep(5)
    pub.sendMessage("data_updated", data="123")


def publish_update():
    data = {"value": 42}
    pub.sendMessage("data_updated", data=data)
```

subscriber.py

```py
from pubsub import pub


def on_data_update(data):
    print(f"Received data update: {data}")


# 订阅主题
pub.subscribe(on_data_update, "data_updated")
```

other_subscriber.py

```py
from pubsub import pub


def on_data_update(data):
    print(f"other subscriber received data update: {data}")


# 订阅主题
pub.subscribe(on_data_update, "data_updated")
```

输出：

```txt
Received data update: {'value': 42}
other subscriber Received data update: {'value': 42}
Received data update: 123
other subscriber Received data update: 123
```
