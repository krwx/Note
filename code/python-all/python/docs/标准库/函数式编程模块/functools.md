# functools

- [functools](#functools)
  - [reduce()](#reduce)
  - [lru\_cache()](#lru_cache)
  - [cache()](#cache)

## reduce()

reduce() 函数会对参数序列中元素进行累积。

函数将一个数据集合（链表，元组等）中的所有数据进行下列操作：用传给 reduce 中的函数 function（有两个参数）先对集合中的第 1、2 个元素进行操作，得到的结果再与第三个数据用 function 函数运算，最后得到一个结果。

语法：`reduce(function, iterable[, initializer])`

参数：

- function -- 函数，有两个参数
- iterable -- 可迭代对象
- initializer -- 可选，初始参数

```py
# 从 functools 导入 reduce
from functools import reduce

def add(x, y) :            # 两数相加
    return x + y

sum1 = reduce(add, [1,2,3,4,5])   # 计算列表和：1+2+3+4+5
sum2 = reduce(lambda x, y: x+y, [1,2,3,4,5])  # 使用 lambda 匿名函数
print(sum1)
print(sum2)
```

## lru_cache()

`functools.lru_cache` 是 Python 标准库中的一个装饰器，用于实现最近最少使用（`Least Recently Used`）缓存机制。它可以显著提高递归函数或计算密集型函数的性能，特别适用于需要重复计算相同参数的场景。

核心功能：

- 缓存结果：自动存储函数调用的结果
- **LRU 策略：当缓存满时，自动丢弃最久未使用的结果**
- **线程安全**：可在多线程环境中使用

使用场景推荐：

- 纯函数（同样输入必然得到同样输出）
- 计算成本高的函数（数据库查询、复杂计算）
- **参数可哈希**（不可变类型如数字/字符串/元组）

> 只在程序运行时缓存，重新启动程序相当于重来

语法：

- `@functools.lru_cache(maxsize=128, typed=False)`

参数：

- maxsize
  - 最大缓存数量（建议设为 2 的幂）
  - maxsize 参数**限制的是缓存条目的数量（即不同参数组合的数量），而非单个返回值的大小**。
    - 当缓存中的条目数达到 maxsize 时，新增的调用会触发 LRU（最近最少使用）淘汰机制。
    - 如果某个函数返回的数据非常大（如 1GB），它仍会被缓存（只要条目数未超限）。
  - 设为 None 表示无限制（慎用）
  - 默认值：128
- typed
  - 是否区分参数类型
  - 为 True: `f(3)` 和 `f(3.0)` 视为不同调用
  - 默认值：False

使用：

1、查看缓存状态

`cache_info()` 方法，用于查看缓存命中情况。它返回一个命名元组，包含以下信息：

- `hits`：缓存命中的次数
- `misses`：缓存未命中的次数
- `maxsize`：缓存的最大大小
- `currsize`：当前缓存的大小

```python
cache_info = expensive_func.cache_info()
print(cache_info)
# 输出示例: CacheInfo(hits=3, misses=8, maxsize=128, currsize=8)
```

2、清空缓存

`cache_clear()`

```python
expensive_func.cache_clear()  # 重置缓存
```

3、缓存方法，只能在类中使用

```python
class DataProcessor:
    @lru_cache
    def process(self, data):
        return expensive_operation(data)
```

4、简单使用

```py
from functools import lru_cache

@lru_cache
def calc(x):
  return x * x

print(5)
print(5) # 取缓存
```

5、优化递归函数（经典斐波那契数列）

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print(fib(100))  # 秒级计算（无缓存会指数级爆炸）
```

> 如需限制缓存大小，考虑第三方库 `cachetools`

## cache()

`cache()` 相当于 `lru_cache(maxsize=None)`。无大小限制的缓存。**缓存会无限增长**，直到显式清除或程序结束。也是线程安全的。

适用场景：

- 结果集有限且内存占用可控的情况（如参数组合固定的数学计算）。

使用：

```py
from functools import cache  # Python 3.9+

@cache
def factorial(n):
    if n == 0: 
        return 1
    return n * factorial(n - 1)
```
