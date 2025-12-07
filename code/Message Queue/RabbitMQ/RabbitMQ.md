# RabbitMQ

- [RabbitMQ](#rabbitmq)
  - [介绍](#介绍)
  - [模式](#模式)
    - [简单队列模式（点对点）](#简单队列模式点对点)
      - [例子](#例子)
    - [工作队列模式](#工作队列模式)
      - [例子](#例子-1)
    - [发布/订阅模式](#发布订阅模式)
      - [例子](#例子-2)
    - [路由模式](#路由模式)
      - [例子](#例子-3)
    - [主题模式](#主题模式)
    - [RPC 模式](#rpc-模式)
      - [例子](#例子-4)
  - [trace](#trace)
  - [other](#other)
    - [python 程序与 JavaScript 程序跨语言实现消息通信](#python-程序与-javascript-程序跨语言实现消息通信)
    - [界面](#界面)

## 介绍

- 消息队列是一种用于在分布式系统中进行通信的技术。
- 它是一种存储和转发消息的中间件，可以用于将应用程序之间的通信解耦，从而实现高效的异步通信。
- 消息队列允许发送者将消息发送到队列中，而接收者则可以从队列中获取消息并进行处理。
- 这种方式可以帮助系统实现高可用性、高性能、松耦合和可伸缩性。消息队列通常包括生产者（发送消息的应用程序）、消费者（接收消息的应用程序）和队列（存储消息的缓冲区）。

`RabbitMQ`：是由 `erlang` 语言开发，基于 `AMQP` (高级消息队列协议)协议实现的一种消息队列。市面上还有很多消息队列，比如 `Kafka、RocketMQ、Redis` 等

消息队列的作用（优点）：

1. 解耦
   1. 应用程序解耦，通过引入消息队列，不同的应用程序之间可以通过消息队列进行通信，而无需直接调用对方的接口或方法。这样可以降低系统中各个应用程序之间的耦合度，使得它们可以独立演化和扩展，而不会因为对方的变化而受到影响。
2. 流量削峰
   1. 消息队列可以作为一个缓冲区，暂时存储流入的消息，直到系统有足够的资源来处理它们。当系统出现流量高峰时，消息队列可以暂时存储过多的消息，以平滑处理流量的波动，避免系统被突发的高负载压垮。
3. 异步
   1. 发送者在发送消息后可以立即继续执行其他操作，而不需要等待接收者的响应。这样可以提高系统的并发性和响应速度。也可以帮助提高系统的吞吐量，特别是在面对大量请求或处理复杂计算时。发送者可以并行地向多个接收者发送消息，而不会因为等待接收者的响应而阻塞。
4. 顺序性
   1. 虽然并不是所有消息队列都能保证消息的绝对顺序性，但是在许多情况下，消息队列可以保证消息的相对顺序性。即按照发送顺序进行处理，对某些场景要求顺序执行很适合。

RabbitMQ基本结构

|名称|描述|
|--|--|
|Connection（连接 ）|连接是生产者和消费者与RabbitMQ之间的连接。每个生产者和消费者都需要与RabbitMQ建立一个连接，以便发送和接收消息。连接通常是长连接，可以重用以提高性能和效率。|
|Channel（信道）|Channel是连接（Connection）内的逻辑通道，用于完成大部分 `AMQP` 操作，如声明队列、发送和接收消息等。在 RabbitMQ 中引入 Channel（信道）的主要目的是为了提高系统的性能、灵活性和效率。使用 Channel 可以避免频繁地创建和销毁连接，因为一个连接可以包含多个 Channel。这样可以减少连接的开销，节省系统资源，并提高性能。|
|Exchange（交换机）|交换机是消息的接收和分发中心，负责接收生产者发送的消息，并根据指定的路由规则发送到一个或多个队列中。（Exchange相当于Queue的代理，可以设置不同的写入策略，写入到对应的队列中。对于队列的写入，更加灵活）。交换机的类型有：fanout扇出、topic主题、direct直接|
|Queue（队列） |队列是消息的缓存区，用于存储交换机发送的消息。生产者发送的消息最终会被存储在队列中，等待消费者进行消费。队列可以持久化到磁盘，以确保消息不会在RabbitMQ宕机或重启后丢失。|
|Producer（生产者）| 生产者是发送消息到RabbitMQ的应用程序。生产者负责创建消息并将其发送到RabbitMQ的消息队列中。|
|Consumer（消费者）| 消费者是从RabbitMQ队列中接收消息并进行处理的应用程序。消费者可以订阅一个或多个队列，并在消息到达队列时接收并处理它们。消费者负责监听队列中的消息，并将其取出进行处理。|

- `exchange type`：
  - `direct`
    - 路由模式。消息根据绑定的键发送给对应的 queue
  - `topic`
    - 主题模式
  - `headers`
  - `fanout`
    - 发布/订阅模式。将消息发给所有绑定了的 queue
  
## 模式

下面以 python 为例

### 简单队列模式（点对点）

一个消息生产者，一个消息消费者，一个队列。也称为点对点模式。

生产者发送一条消息，消费者就会接收一条消息。

- 在 RabbitMQ 里面，message 是不会直接发送到队列中的，需要先发送至交换机中。可以使用空字符串来指定使用默认的交换机
  - `exchange=""`
- 发送信息时通过 `routing_key` 来指定消息发送到哪个队列
- 以下例子连接的是 `localhost`，如果需要连接其他电脑，需要指明电脑名称或 ip 地址

#### 例子

send.py

```py
import pika

# create connection, connect to localhost
connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

# create queue
channel.queue_declare(queue="hello")

# send message
channel.basic_publish(exchange="", routing_key="hello", body="Hello World!")
print("sent")

connection.close()
```

- `channel.queue_declare(queue='')`
  - 创建 `queue` ，如果 `queue` 已经存在，则不创建
  - 生产者和消费者都应该使用 `queue_declare` 来创建 `queue`。因为有可能消费者比生产者先运行
- `auto_ack=True` 代表接收到的消息都默认处理完，queue 可以清除该消息
- `callback` 接收到的数据的数据类型是字节字符串，调用 `decode()` 转换成字符串

receive.py

```py
import pika, sys, os


def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    channel.queue_declare(queue="hello")

    def callback(ch, method, properties, body):
        print(f"received {body}")

    # 指定监听的 queue 和 callback
    channel.basic_consume(queue="hello", auto_ack=True, on_message_callback=callback)

    print("wait for messages")
    channel.start_consuming() # 这里就一直监听，不会退出程序。后面的语句不会执行
    print("hello")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
```

### 工作队列模式

工作队列又叫做任务队列，正常会按顺序把消息发送给每一个订阅的消费者，

P 发送了消息，第一条 C1 消费，第二条 C2 消费。每个消息只会被一个消费者接收和处理

使用：

- `Message acknowledgment`
  - 消费者接收到数据后，如果消费者处理的过程中中断了， `RabbitMQ` 需要将该消息发送给其他消费者进行处理
  - 通过消费者处理完消息后给 `RabbitMQ` 发送 `ack` 确认实现。方式：
    - 消费时指定 `auto_ack=True`：`channel.basic_consume(..., auto_ack=True,...)`
    - 处理完消息后，在 `callback` 手动发送 `ack` ：`channel.basic_ack(delivery_tag = method.delivery_tag)`
- `Message durability`
  - 如果 `queue` 和消息没有持久化，那么重启 RabbitMQ 服务后， `queue` 和消息会清除掉
  - 持久化 `queue`
    - 创建 `queue` 时使用 `durable=True` 进行持久化：`channel.queue_declare(queue='task_queue', durable=True)`
    - 对已经存在的 `queue` 再使用上面的语句声明会报错。已经存在的队列不能更改其配置，不能让其变持久化
    - 生产者和消费者声明队列时都要同时加上 `durable=True` 参数
  - 持久化 `message`
    - 在发送消息时设置 `delivery_mode` 属性为 `pika.DeliveryMode.Persistent`
- `Fair dispatch`
  - 默认情况下，当 queue 有消息时就会立马派给消费者，不管消费者是否在处理消息。这样如果消费者在处理某个消息花费了很长时间，会无法很快处理下一个消息
  - 可以指定 `prefetch_count=1` 来告诉 `RabbitMQ` 最多给消费者 1 个消息，等消费者发送了 ack 后再派消息给它
    - `channel.basic_qos(prefetch_count=1)`

#### 例子

new_task.py (send message)

```py
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

# create durable queue
channel.queue_declare(queue="task_queue", durable=True)

message = "Hello World!"
for i in range(3):
    sent_message = f"{message}{i}"
    channel.basic_publish(
        exchange="",
        routing_key="task_queue",
        body=sent_message,
        properties=pika.BasicProperties(delivery_mode=pika.DeliveryMode.Persistent), # message durable
    )
    print(f"sent {sent_message}")

connection.close()
```

worker.py (receive message)

```py
import pika, sys, os, time


def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    channel.queue_declare(queue="task_queue", durable=True)

    def callback(ch, method, properties, body):
        data = body.decode()
        print(f"received {data}")
        time.sleep(int(data.split("!")[1]) + 1)
        print("done")
        # 手动 ack
        ch.basic_ack(delivery_tag = method.delivery_tag)

    channel.basic_qos(prefetch_count=1)

    channel.basic_consume(queue="task_queue", on_message_callback=callback)

    print("wait for messages")
    channel.start_consuming()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
```

### 发布/订阅模式

- 发布/订阅模式是一种消息传递模式，它允许发送者（发布者）将消息发布到多个接收者（订阅者）。
- 消息传递模型的核心思想是生产者从不直接向队列发送任何消息。实际上，生产者通常根本不知道消息是否会被传递到任何队列。
- 所以消息传递模式，发布者不需要指定队列。
- 发布/订阅模式交换机类型为 `Fanout` 。
- P 发送了消息，C1、C2、C3 都会接收到该消息

使用：

- `exchange`
  - exchange 接收生产者发送的消息，然后根据 exchange type 将消息派给绑定了的 queue
  - 生产者和消费者都要定义 exchange
  - 定义 exchange：`channel.exchange_declare(exchange='logs', exchange_type='fanout')`
  - 发送信息指定 exchange（无需指定 queue）：`channel.basic_publish(exchange='logs', routing_key='', body=message)`
- 临时 `queue`
  - 用途：临时需要一条 empty 的 queue，且断开连接后清空 `queue` 和 `message`
  - 定义：`result = channel.queue_declare(queue='', exclusive=True)`
    - `queue` 为空字符串
    - `exclusive` 为 `True` ，代表连接断开后会删除 queue
  - 可以通过 `result.method.queue` 获取 queue 的名称。格式类似于 `amq.gen-JzTY20BRgKO-HjmUJj0wLg`
- 将 `queue` 绑定到 `exchange`
  - 语法：`channel.queue_bind(exchange='logs', queue=result.method.queue)`

#### 例子

emit_log.py (send message)

```py
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

# 定义 exchange
channel.exchange_declare(exchange="logs", exchange_type="fanout")

message = "Hello World!"
for i in range(3):
    sent_message = f"{message}{i}"
    # 将消息发送给 exchange，指定 exchange，不需要指定 routing_key (queue)，
    channel.basic_publish(
        exchange="logs",
        routing_key="",
        body=sent_message,
    )
    print(f"sent {sent_message}")

connection.close()
```

receive_log.py (receive message)

```py
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

# 定义 exchange
channel.exchange_declare(exchange="logs", exchange_type="fanout")

# 定义临时 queue
result = channel.queue_declare(queue="", exclusive=True)
queue_name = result.method.queue

# 将 queue 绑定到 exchange
channel.queue_bind(exchange="logs", queue=queue_name)


def callback(ch, method, properties, body):
    print(f" [x] {body}")


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()
```

### 路由模式

路由模式也是一种消息传递模式，是基于消息的路由键（routing key）来将消息从交换机（exchange）发送到一个或多个队列中。相比较于发布/订阅模式，路由模式多了一个 routing key 的概念。

路由模式交换机类型为 `direct` 。

举例说明：

- C1 对应 Q1，C2 对应 Q2。Q1 绑定的键为 info 。Q2 绑定的键为 info、warn 和 log 。
- P 发送键为 info 的消息。exchange 会发送到 Q1、Q2
- P 发送键为 warn 的消息。exchange 只会发送到 Q2
- P 发送键为 log 的消息。exchange 只会发送到 Q2

使用：

- 消费者使用键绑定 `queue` 和 `exchange`。
  - 通过 `routing_key` 指定
  - `channel.queue_bind(exchange=exchange_name, queue=queue_name, routing_key='black')`
  - 一次只能绑定一个键，如果需要绑定多个，则多次调用 `queue_bind()` 来绑定
  - 如果 exchange_type 为 `fanout`，那么即使指定了 `routing_key`，`routing_key` 也不会起任何作用
- 创建 `exchange` ，`exchange_type` 为 `direct`
  - `channel.exchange_declare(exchange='direct_logs', exchange_type='direct')`
- 生产者发送消息，通过 `routing_key` 指定键
  - `channel.basic_publish(exchange='direct_logs', routing_key=severity, body=message)`

#### 例子

emit_log_direct.py (send message)

```py
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

# exchange_type 为 direct
channel.exchange_declare(exchange="direct_logs", exchange_type="direct")

severity = "info"

message = "Hello World!"
channel.basic_publish(
    exchange="direct_logs",
    routing_key=severity, # 指定键
    body=message,
)
print(f"sent {message}")

connection.close()
```

receive_log_direct.py (receive message)

```py
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
channel = connection.channel()

channel.exchange_declare(exchange="direct_logs", exchange_type="direct")

result = channel.queue_declare(queue="", exclusive=True)
queue_name = result.method.queue

# 绑定多个键
severity_list = ["info", "warn", "error"]
for severity in severity_list:
    channel.queue_bind(exchange="direct_logs", queue=queue_name, routing_key=severity)


def callback(ch, method, properties, body):
    print(f" [x] {body}")


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()
```

### 主题模式

基于路由模式，仍然有局限性--它不能基于多个标准进行路由。也就是一个消费者只能接收完全与 `routing key` 相匹配的交换机。

主题模式主要解决路由模式的不足，可以**模糊匹配** `routing key` 。

路由模式交换机类型为 `topic` 。

使用：

- 设置 `exchange_type` 为 `topic`
  - `channel.exchange_declare(exchange='topic_logs', exchange_type='topic')`
- 使用模糊匹配设置键
  - 规则
    - `*` 代表一个单词
    - `#` 代表 0 个或者多个单词
    - key 可以是任何字符串，但是最多为 255 个字节
    - 最好用 `.` 来作分隔符，方便区分

举例说明：

- Q1 对应的键为 `*.orange.*`，Q2 对应的键为 `*.*.rabbit` 和 `lazy.#`
- P 发送了键为 `quick.orange.rabbit` 的消息，Q1 和 Q2 都能接收
- P 发送了键为 `lazy.orange.elephant` 的消息，Q1 和 Q2 都能接收
- P 发送了键为 `quick.orange.fox` 的消息，只有 Q1 能接收
- P 发送了键为 `lazy.brown.fox` 的消息，只有 Q2 能接收
- P 发送了键为 `quick.brown.fox` 的消息，没有匹配的 queue，会被抛弃掉
- P 发送了键为 `lazy.orange.new.rabbit` 的消息，只有 Q2 能接收

### RPC 模式

`RPC` 模式又叫"请求/回复模式"。

`RPC`（`Remote Procedure Call`，远程过程调用）是一种用于在分布式系统中进行通信的技术。它允许一个进程（或线程）调用另一个进程（或线程）的过程（函数或方法），就像调用本地函数一样，而不需要开发者显式处理底层通信细节。

简单说明就是生产者发送一条消息，消费者端执行某个方法，获取值的同时，并返回到生产者。

使用工作队列模式。

流程：

- 生产者是 Client，消费者是 Server
- Client 启动后，会创建一条临时的 queue，用于接收 Server 返回的数据
- Server 启动后，创建一条 queue，名字为 `rpc_queue`，用于接收 Client 发送的 rpc 请求
- Client 发送 rpc 请求到 `rpc_queue`，发送时需设置 `reply_to` 和 `correlation_id` 参数
  - `reply_to`：指定 Server 返回数据时所发送的 queue，即 Client 创建的临时 queue
  - `correlation_id`：标识。用于确认 Server 返回的数据是与 Client 这次发送的 rpc 请求有关
- Server 从 `rpc_queue` 中收到 rpc 请求，开始处理请求，然后将数据发送到 `reply_to` 指定的 queue。发送时需设置 `correlation_id` 参数
- Client 从临时 queue 中收到 Server 返回的数据，检查该数据的 `correlation_id`，如果它是 Client 发送给 Server 的 rpc 请求中设置的 `correlation_id`，则将数据返回给应用程序

#### 例子

Client 发送一个数字，Server 计算斐波那契数列并返回结果。

rpc_server.py

```py
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
channel = connection.channel()

# 创建 rpc_queue
channel.queue_declare(queue="rpc_queue")


def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n - 1) + fib(n - 2)


def on_request(ch, method, props, body):
    n = int(body)
    print(f"fib({n})")
    response = fib(n)

    # 计算完结果后，发送结果到 reply_to 指定的 queue
    ch.basic_publish(
        exchange="", # 默认交换机
        routing_key=props.reply_to,
        properties=pika.BasicProperties(correlation_id=props.correlation_id), # 设置 correlation_id
        body=str(response),
    )
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue="rpc_queue", on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
channel.start_consuming()
```

rpc_client.py。使用 class，存储每次 rpc 请求的响应和 `correlation_id`

```py
import pika, uuid


class FibonacciRpcClient(object):
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
        self.channel = self.connection.channel()

        # 创建临时 queue
        result = self.channel.queue_declare(queue="", exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(queue=self.callback_queue, auto_ack=True, on_message_callback=self.on_response)

        self.response = None
        self.corr_id = None

    # 临时 queue 的 callback
    def on_response(self, ch, method, props, body):
        # 判断 correlation_id 是否相等，看是否与本次 rpc 请求相关
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self, n):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        # 发送 rpc 请求到 rpc_queue
        self.channel.basic_publish(
            exchange="",
            routing_key="rpc_queue",
            properties=pika.BasicProperties(reply_to=self.callback_queue, correlation_id=self.corr_id), # 设置 reply_to 和 correlation_id
            body=str(n),
        )
        # 循环，等待返回结果
        while self.response is None:
            self.connection.process_data_events(time_limit=None)
        return int(self.response)


fibonacci_rpc = FibonacciRpcClient()

print("send request")
response = fibonacci_rpc.call(30)
print(f"get response: {response}")
```

## trace

rabbitmq-plugins enable rabbitmq_tracing

启用了 trace plugin 要重启服务才生效

## other

### python 程序与 JavaScript 程序跨语言实现消息通信

- Python（生产者）：用 `pika` 库向 RabbitMQ 队列发送消息。
- JavaScript（消费者）：
  - `Node.js` 后端：直接用 `amqplib` 库消费消息。
  - 浏览器前端：无法直接连接 RabbitMQ，需通过以下方式：
    - `WebSocket` 代理：使用 `RabbitMQ` 的 `Web-STOMP` 插件，让浏览器通过 `WebSocket` 订阅消息。
    - 后端 API 中转：前端通过 HTTP 轮询或 WebSocket 与后端通信，后端从 RabbitMQ 获取消息后转发。

启用 RabbitMQ Web-STOMP 插件：`rabbitmq-plugins enable rabbitmq_web_stomp`

### 界面

RabbitMQ 中‌ `Ready` ‌和‌ `Unacked` ‌是管理界面中的关键指标，分别代表以下含义：

- `Ready`
  - 表示已到达消息队列且可被消费者消费的消息数量。当生产者发送的消息被 `RabbitMQ` 服务器接收并存储后，这些消息会进入 `‌Ready` ‌状态，等待消费者处理。 ‌
- `Unacked`
  - 指消费者尚未确认（ACK）的消息总数。消费者获取消息后，若未执行 `ACK` 操作（无论是因为处理中或未处理完成），这些消息会持续处于 `‌Unacked` ‌状态，直到消费者明确确认（ACK）或超时未确认被标记为死信。 ‌

两者关系

- `‌Ready + Unacked = Total`‌（队列总消息数）
- 若消费者处理速度慢于生产者， `‌Unacked` ‌会持续增长，可能导致队列积压；反之则消息被快速消费，‌ `Unacked‌` 趋近于0。 ‌

默认用户名：guest
登录密码：guest
