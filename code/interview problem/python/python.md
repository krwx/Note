# python

- [python](#python)
  - [1. django 的 ORM 是什么？怎么使用](#1-django-的-orm-是什么怎么使用)
  - [2. 了解 python 的装饰器、迭代器和生成器吗](#2-了解-python-的装饰器迭代器和生成器吗)
  - [3. 说一下你们 python 是怎么使用日志的](#3-说一下你们-python-是怎么使用日志的)
  - [4. 有用过后端日志中间件吗？/ 有接触过 Elasticsearch、Kafka 吗](#4-有用过后端日志中间件吗-有接触过-elasticsearchkafka-吗)
  - [5. 了解 python 的全局解释器（锁）](#5-了解-python-的全局解释器锁)
  - [6. python 平时是怎么性能优化的](#6-python-平时是怎么性能优化的)
  - [7. 使用 lru\_cache 解决过什么问题](#7-使用-lru_cache-解决过什么问题)

## 1. django 的 ORM 是什么？怎么使用

“Django ORM 是 Django 框架的对象关系映射工具，它让开发者用 Python 类和对象来操作数据库，无需写 SQL。使用时先定义模型类，然后通过迁移命令创建表；接着就可以通过模型管理器（如 objects）进行增删改查，支持链式过滤、聚合、关联查询等。注意点包括惰性查询集、N+1 问题优化以及事务管理。当 ORM 难以应对复杂查询时，也可以执行原生 SQL。”

## 2. 了解 python 的装饰器、迭代器和生成器吗

装饰器是一个可调用对象（通常是函数或类），它接收一个函数作为参数，并返回一个新函数，从而在不修改原函数代码的前提下动态增强其功能。

```py
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logger
def add(x, y):
    return x + y
```

迭代器是实现了 `__iter__()` 和 `__next__()` 方法的对象，它代表一个数据流，支持惰性求值，只能向前遍历。

```py
class CountDown:
    def __init__(self, n):
        self.n = n
    def __iter__(self):
        return self
    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1
```

生成器是一种特殊的迭代器，通过 `yield` 关键字定义，可以挂起函数的执行状态并在下次调用时恢复。

```py
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
print(next(gen))  # 0
print(next(gen))  # 1
```

## 3. 说一下你们 python 是怎么使用日志的

> “在我们项目中，日志系统是严格按照**生产环境标准**设计的，核心原则是：**可配置、非侵入、支持多输出、便于检索**。”
>
> **第一，我们统一使用Python标准库的`logging`模块，禁止任何`print`**。因为`logging`天然支持线程安全、日志级别、格式化和异常堆栈记录。
>
> **第二，日志配置与业务代码分离**。我们不会在代码里硬编码`basicConfig`，而是通过配置文件（YAML或JSON）或环境变量来定义。  
> 比如，生产环境我会使用`dictConfig`一次性配置：
>
> - **不同处理器**：控制台输出（开发环境）+ 文件轮转（生产环境）+ 错误日志单独文件。
> - **合理设置日志级别**：开发用DEBUG，生产用INFO或WARNING。
> - **使用`RotatingFileHandler`或`TimedRotatingFileHandler`**：防止磁盘写满，例如按天切分，保留30天。
>
> **第三，日志格式包含关键上下文**。我们默认格式是：  
> `"%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s"`  
> 这样能快速定位到代码位置。另外会加入`%(process)d`和`%(thread)d`方便排查并发问题。
>
> **第四，针对不同模块获取独立的logger**：  
> 在每个Python文件里都使用`logger = logging.getLogger(__name__)`，这样日志天然带包路径，按模块开关日志非常方便。
>
> **第五，注意异常日志的写法**：  
> 捕获异常时，用`logger.exception('xxx')`或`logger.error('xxx', exc_info=True)`，这样会保留完整调用栈，而不是只打印字符串。
>
> **第六，几个进阶实践**：
>
> - **避免在循环中计算高成本日志**：例如`logger.debug(f'result: {expensive_func()}')`，建议用`logger.debug('result: %s', expensive_func())`，因为`logging`会先判断级别才格式化。
> - **结构化日志**（可选）：对需要走ELK等系统的场景，我们会输出JSON格式，用`python-json-logger`库，便于日志平台索引。
> - **与第三方库协同**：例如在FastAPI/Django中，我们用`dictConfig`覆盖默认日志配置，把框架的日志也纳入统一管理。
>
> **最后，我们也会监控日志本身**：比如通过sentry捕获ERROR及以上日志，并告警。”

## 4. 有用过后端日志中间件吗？/ 有接触过 Elasticsearch、Kafka 吗

> “有接触过，而且正是用在**日志处理**场景中。
>
> **先说 Elasticsearch**：  
> 我们之前用 ELK（Elasticsearch + Logstash + Kibana）搭建过日志平台。  
>
> - Elasticsearch 负责**存储和索引**日志，支持全文搜索和聚合分析。  
> - 应用产生的日志（JSON 格式）通过 **Filebeat** 或 **Logstash** 采集，送到 ES 中。  
> - 我实际用过它的 `query DSL` 来排查线上问题，比如按 `request_id` 或 `耗时 > 500ms` 快速过滤。  
> - 另一个常用功能是 **索引生命周期管理**，自动归档或删除老日志，控制磁盘成本。
>
> **再说 Kafka**：  
> Kafka 在日志系统中的角色是**异步缓冲与解耦**。  
>
> - 当业务并发高时，如果应用直接写 ES，可能因 ES 压力大或网络抖动导致日志丢失。  
> - 我们会在应用侧使用 `kafka-python` 或 `confluent-kafka` 将日志异步发送到 Kafka 主题。  
> - 然后 **Logstash** 或 **Fluentd** 消费 Kafka 的消息，批量写入 ES。这样即使 ES 短暂不可用，日志也能积压在 Kafka 中不丢。  
> - Kafka 的多分区机制还可以保证同一个 `request_id` 的日志顺序写入，方便排查。
>
> **一个典型的架构**：  
> `Python应用(JSON日志) → Kafka → Logstash → Elasticsearch → Kibana`  
> 我们在中间件里直接输出结构化的 JSON 日志（不经过文件），使用异步 `KafkaProducer` 发送，对业务性能影响很小。
>
> 当然，中小规模项目未必需要 Kafka 和 ES，直接 `TimedRotatingFileHandler` + 本地文件就能满足。但我们当时日日志量上 TB，这套方案确实解决了**高可靠、可检索**的问题。”

## 5. 了解 python 的全局解释器（锁）

**1. 一句话定义**  
> “GIL 是 CPython 解释器中的一个互斥锁，它确保同一时刻只有一个线程在执行 Python 字节码。”

**2. 为什么需要 GIL**  
> “CPython 的内存管理（尤其是引用计数）不是线程安全的。GIL 通过单线程执行避免了复杂的锁竞争，简化了内存管理实现，也提升了单线程任务的执行效率（比如不需要频繁加锁/解锁）。这是早期 Python 设计时的权衡，很多 C 扩展库也依赖 GIL。”

**3. GIL 带来的核心影响**  
> **对 CPU 密集型任务**：多线程无法利用多核加速，因为同一时刻只能运行一个线程，反而可能因上下文切换降低性能。  
> **对 I/O 密集型任务**：GIL 影响不大。线程在等待 I/O（如网络、磁盘）时会主动释放 GIL，其他线程可以运行，因此多线程依然适合 I/O 密集型场景。

**4. 如何规避或缓解 GIL 限制**  

> - **使用多进程**（`multiprocessing` 模块）：每个进程有独立 GIL，可真正并行，适合 CPU 密集任务。  
> - **使用异步编程**（`asyncio`）：单线程并发，避免 GIL 问题，适合高 I/O 场景。  
> - **使用 C 扩展或 NumPy 等计算库**：耗时操作在 C 层执行，可以释放 GIL（如 `numpy.dot`）。  
> - **换用无 GIL 的 Python 解释器**：如 Jython、IronPython，或正在实验中的 `nogil` 分支（PEP 703 已提案将 GIL 设为可选）。

**5. 补充说明（加分点）**  
> “需要指出的是，GIL 是 CPython 的实现细节，不是 Python 语言本身的要求。Python 3.13 开始引入了 **自由线程（free-threading）** 的实验性支持，可以编译时不启用 GIL，但尚不稳定。对于绝大多数应用，理解 GIL 有助于正确选择并发模型：I/O 用线程/异步，CPU 用多进程或 C 扩展。”

## 6. python 平时是怎么性能优化的

> “Python性能优化，我遵循 **‘先测量，后优化’** 的原则。避免过早优化，先通过 profiling 找出真正的瓶颈。
>
> 具体我会从以下几个层次入手：
>
> **第一层：算法与数据结构优化（性价比最高）**
>
> - 用 `set` 或 `dict` 做成员查找，代替 `list` 的 `O(n)` 遍历。
> - 使用 `collections.deque` 做双端队列操作，`heapq` 实现堆等。
> - 字符串拼接用 `join()` 而不是循环里的 `+`。
>
> **第二层：善用Python内置特性**
>
> - 多用 `map`、`filter`、列表推导式，它们底层用C循环，比`for`快。
> - 使用 `functools.lru_cache` 做函数结果缓存（递归优化必备）。
> - 局部变量缓存：把频繁访问的全局/属性赋值给局部变量（比如 `local_append = list.append`）。
>
> **第三层：并发与并行**
>
> - IO密集型：用 `asyncio` 或 `threading` 提升吞吐量。
> - CPU密集型：用 `multiprocessing` 绕过GIL，或者用 `concurrent.futures.ProcessPoolExecutor`。
>
> **第四层：借助外部工具**
>
> - 数值计算：用 `numpy` / `pandas` 向量化，替代Python循环。
> - JIT加速：用 `numba` 装饰器加速数值函数。
> - 关键模块用 `cython` 重写或直接调用C扩展。
>
> **第五层：解释器与运行时调优**
>
> - 调整 `PYTHONOPTIMIZE`、`sys.setrecursionlimit`。
> - 使用 `pypy` 替换CPython（适合长时间运行的程序）。
> - 内存优化：用 `__slots__` 减少实例内存，用生成器代替大列表。
>
> **最后，工具链必不可少**：
>
> - `cProfile` / `snakeviz` 找热点函数。
> - `memory_profiler` 查内存占用。
> - `timeit` 对比小代码片段。”

## 7. 使用 lru_cache 解决过什么问题

> “`functools.lru_cache` 是 Python 内置的一个装饰器，用于实现函数结果的**最近最少使用（LRU）缓存**。它通过缓存函数的返回值来避免重复计算，从而提升性能。以下是我使用 `lru_cache` 解决过的一些典型问题：
> 1、**斐波那契数列**：计算斐波那契数列的递归算法存在大量重复计算，使用 `lru_cache` 可以显著提升性能。
> 2、在某个 api 接口中，某个函数需要频繁调用，并且输入参数有限，使用 `lru_cache` 可以避免重复计算，提高响应速度。
> 3、在 celery task 中需要调用多个接口获取数据，task 可能会被频繁调用，使用 `lru_cache` 可以缓存接口结果，减少网络请求次数，提高效率。
