# itertools

- [itertools](#itertools)
  - [函数](#函数)
    - [product()](#product)
    - [groupby()](#groupby)
    - [chain()](#chain)
      - [内存高效](#内存高效)

## 函数

### product()

语法：`itertools.product(*iterables, repeat=1)`

作用：可迭代对象输入的笛卡儿积。

可选参数 `repeat` 为要重复的次数。例如，`product(A, repeat=4)` 和 `product(A, A, A, A)` 是一样的。

大致相当于生成器表达式中的嵌套循环。例如， `product(A, B)` 和 下面代码返回结果一样。

```py
for x in A：
    for y in B:
        print(x, y)
```

```py
# product('ABCD', 'xy') → Ax Ay Bx By Cx Cy Dx Dy
# product(range(2), repeat=3) → 000 001 010 011 100 101 110 111

# 例子
import itertools
def main():
    A = [1, 2, 3]
    B = [2, 3, 4]
    for x, y in itertools.product(A, B):
        print(x, y)
""" 
结果：
1 2
1 3
1 4
2 2
2 3
2 4
3 2
3 3
3 4
"""
```

不使用 product 的代码：

```py
list_a = [1, 2020, 70]
list_b = [2, 4, 7, 2000]
list_c = [3, 70, 7]

for a in list_a:
    for b in list_b:
        for c in list_c:
            if a + b + c == 2077:
                print(a, b, c)
# 70 2000 7
```

使用 product 的代码：

```py
from itertools import product

list_a = [1, 2020, 70]
list_b = [2, 4, 7, 2000]
list_c = [3, 70, 7]

for a, b, c in product(list_a, list_b, list_c):
    if a + b + c == 2077:
        print(a, b, c)
# 70 2000 7
```

### groupby()

语法：`itertools.groupby(iterable, key=None)`

创建一个迭代器，返回 `iterable` 中连续的键和组。 `key` 是一个**计算元素键值函数**。**返回的组本身也是一个迭代器**

注意：**假如要对 list 分组，首先要调用 `sorted()` 获取 `iterable`，再调用 `groupby()`**

```py
groups = []
uniquekeys = []
data = sorted(data, key=keyfunc)
for k, g in groupby(data, keyfunc):
    groups.append(list(g))      # 将 group 迭代器以列表形式保存
    uniquekeys.append(k)
```

获取分组的数据的长度

```py
def group_test():
    for key, group in groupby(sorted(data_list, key=get_key_func), key=get_key_func):
        result[key] = len(list(group))

def get_key_func(item):
    return item.key
```

### chain()

`itertools.chain()` 用于将多个可迭代对象（如列表、元组、集合等）连接成一个连续的迭代器。  
它不会创建新的组合数据结构，而是按需生成元素，因此内存效率高，特别适合处理大型数据集。

语法：

`itertools.chain(*iterables)`

- `*iterables`：一个或多个可迭代对象（如列表、元组、字符串等）。

返回：一个迭代器。如果要转换为 list，需要调用 `list()`

例子：

示例 1：**连接不同可迭代对象**。可用于拼接 list

```python
import itertools

list1 = [1, 2, 3]
tuple1 = (4, 5)
set1 = {6, 7}

# 连接三个可迭代对象
chained = itertools.chain(list1, tuple1, set1)

print(list(chained))  
# 输出（集合顺序可能不同）: [1, 2, 3, 4, 5, 6, 7]
```

示例 2：处理字符串

```python
words = ["hello", "world"]
chars = "!"

chained = itertools.chain(*words, chars)  # 拆包字符串
print(list(chained))  
# 输出: ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd', '!']
```

示例 3：高效处理大型数据（避免内存爆炸）

```python
# 生成两个包含 1000 万个数字的迭代器
gen1 = (x for x in range(10**7))
gen2 = (x for x in range(10**7, 2*10**7))

# 连接它们（几乎不占额外内存）
chained = itertools.chain(gen1, gen2)

# 逐元素处理（如计数）
count = sum(1 for _ in chained)
print(count)  # 输出: 20000000
```

注意事项：

- 迭代器只能遍历一次，如需重复使用需重新创建：

    ```python
    chained = chain([1,2], [3,4])
    list(chained)  # [1,2,3,4]
    list(chained)  # []  (已耗尽)
    ```

#### 内存高效

`itertools.chain()` 不创建中间列表，直接按需迭代元素。

对比：

1. 传统列表操作（立即求值）

    ```python
    a = [1, 2, 3]
    b = [4, 5, 6]
    combined = a + b  # 立即创建新列表[1,2,3,4,5,6]，占用完整内存
    ```

    - ✅ 优点：可随机访问任意元素（如 `combined[3]`）
    - ❌ 缺点：数据量大时内存占用高

2. chain 的按需生成（惰性求值）

    ```python
    import itertools
    chained = itertools.chain([1, 2, 3], [4, 5, 6])  # 此时不生成任何元素！

    # 只有迭代时才会按需生成元素
    for element in chained:
        print(element)  # 每次循环生成一个元素
    ```

    - ✅ 内存中只保留当前处理的一个元素
    - ❌ 无法随机访问（如 `chained[3]` 会报错）
