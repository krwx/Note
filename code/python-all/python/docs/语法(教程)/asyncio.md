# asyncio

- [asyncio](#asyncio)
  - [基本概念](#基本概念)
  - [基础用法](#基础用法)
  - [并发执行任务](#并发执行任务)
  - [常用API](#常用api)
  - [异步IO操作示例](#异步io操作示例)
  - [完整示例](#完整示例)
  - [底层原理](#底层原理)
    - [1. 核心组件与架构](#1-核心组件与架构)
    - [2. 事件循环（Event Loop）原理](#2-事件循环event-loop原理)
    - [3. 协程（Coroutine）的底层实现](#3-协程coroutine的底层实现)
    - [4. Future 和 Task](#4-future-和-task)

## 基本概念

- 协程 (Coroutine): 用 async def 定义的函数，内部可包含 await 表达式，用于暂停执行直到异步操作完成。
- 事件循环 (Event Loop): 负责调度和执行协程的核心机制。
- 任务 (Task): 对协程的封装，表示一个可被调度的异步操作。

## 基础用法

定义协程

```python
async def my_coroutine():
    print("Start")
    await asyncio.sleep(1)  # 模拟异步操作（如网络请求）
    print("End")
```

运行协程

```python
import asyncio

async def main():
    await my_coroutine()

# Python 3.7+ 使用 asyncio.run() 启动事件循环
asyncio.run(main())
```

## 并发执行任务

创建多个任务并等待完成

```python
async def task(name, delay):
    print(f"Task {name} started")
    await asyncio.sleep(delay)
    print(f"Task {name} finished")

async def main():
    # 同时启动两个任务
    task1 = asyncio.create_task(task("A", 2))
    task2 = asyncio.create_task(task("B", 1))
    
    await task1
    await task2

asyncio.run(main())
```

使用 `gather` 简化多任务

```python
async def main():
    await asyncio.gather(
        task("A", 2),
        task("B", 1)
    )
```

## 常用API

- asyncio.sleep(delay): 非阻塞休眠，模拟异步操作。
- asyncio.create_task(coro): 将协程包装为任务并加入事件循环。
- asyncio.gather(*coros): 并行运行多个协程，返回结果列表。
- asyncio.wait(coros): 控制任务的完成方式（如超时、优先完成等）。

## 异步IO操作示例

结合 `aiohttp` 实现异步 `HTTP` 请求：

```python
import aiohttp

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    html = await fetch("https://example.com")
    print(html[:100])  # 打印部分内容

asyncio.run(main())
```

## 完整示例

```python
import asyncio

async def cook(food, delay):
    print(f"开始烹饪 {food}")
    await asyncio.sleep(delay)
    print(f"{food} 做好了！")
    return f"{food}"

async def main():
    # 同时执行三个任务
    results = await asyncio.gather(
        cook("米饭", 3),
        cook("番茄汤", 2),
        cook("牛排", 4)
    )
    print(f"全部完成: {results}")

asyncio.run(main())
```

输出：

```txt
开始烹饪 米饭
开始烹饪 番茄汤
开始烹饪 牛排
番茄汤 做好了！
米饭 做好了！
牛排 做好了！
全部完成: ['米饭', '番茄汤', '牛排']
```

## 底层原理

### 1. 核心组件与架构

asyncio 的核心是 事件循环（Event Loop），它通过 协程（Coroutine） 和 IO多路复用（IO Multiplexing） 实现单线程下的高效并发。其架构依赖四个核心概念：

|组件| 作用|
|--|--|
|事件循环 |调度协程的执行，监听IO事件，驱动异步操作|
|协程 |可暂停/恢复的函数，用 async/await 定义|
|Future/Task |封装协程的异步操作，保存状态和结果|
|IO多路复用 |通过 epoll (Linux)/kqueue (macOS)/select 监听多个IO事件的高效机制|

### 2. 事件循环（Event Loop）原理

事件循环是一个无限循环，按以下步骤运行：

1. 任务队列检查：从 `Ready Queue` 取出可运行的协程（`Task`）执行。
2. 协程执行：运行协程直到遇到 `await` ，协程让出控制权。
3. IO监听：将阻塞的IO操作（如socket读写）注册到IO多路复用接口（如 epoll）。
4. 事件等待：调用 `epoll_wait()` 等待IO事件发生（此时线程阻塞，但通过异步IO释放CPU）。
5. 事件处理：当IO事件就绪，将关联的回调（如 Future.set_result()）加入 `Ready Queue`。
6. 重复循环：回到步骤1，直到所有任务完成。

### 3. 协程（Coroutine）的底层实现

Python协程基于 **生成器（Generator）** 实现，通过 `yield` 暂停函数执行。`async/await` 是生成器的语法糖：

- `async def` 定义一个协程函数，调用时返回 协程对象（类似生成器对象）。
- `await` 相当于 `yield from`，将控制权交还给事件循环。

协程的状态变化：

- CREATED：协程对象已创建，未执行。
- RUNNING：正在执行。
- SUSPENDED：遇到 await 暂停。
- FINISHED：执行完成，返回结果或抛出异常。

### 4. Future 和 Task

Future 对象

- 作用：表示一个**异步操作的最终结果**，类似 JavaScript 的 Promise。
- 状态：
  - Pending：操作未完成。
  - Done：操作完成（成功或异常）。
- 核心方法：
  - `add_done_callback()`：绑定完成时的回调。
  - `set_result()` / `set_exception()`：标记完成，触发回调。

Task 对象

- 本质：是 Future 的子类，专门封装协程的执行。
- 创建任务：`asyncio.create_task(coro)` 将协程包装为 Task，并加入事件循环队列。
- 执行流程：
  - 事件循环调用 `Task.__step()` 驱动协程执行。
  - 协程 await 时，返回一个 Future。
  - Task 注册自己为该 Future 的回调，暂停执行。
  - 当 Future 完成，事件循环重新调度 Task 继续执行。
