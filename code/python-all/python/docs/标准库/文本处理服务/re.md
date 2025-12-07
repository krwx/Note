# re

正则表达式操作

- [re](#re)
  - [函数](#函数)
    - [search()](#search)
    - [match()](#match)
    - [search() vs. match()](#search-vs-match)
    - [split()](#split)
  - [flags](#flags)
  - [Pattern 对象](#pattern-对象)
    - [search()](#search-1)
    - [split()](#split-1)
    - [pattern 属性](#pattern-属性)
  - [Match 对象](#match-对象)
    - [group()](#group)
      - [`Match.__getitem__(g)`](#match__getitem__g)

## 函数

### search()

`re.search(pattern, string, flags=0)`

扫描**整个 `string`** 查找正则表达式 `pattern` 产生匹配的**第一个位置**，并返回相应的 `Match` 。 如果字符串中没有与模式匹配的位置则返回 `None`

表达式的行为可通过指定 `flags` 值来修改。 值可以是任意 `flags` 变量，可使用按位 OR (| 运算符) 进行组合。

```py
match = re.search(pattern, string)
if match:
    print("match")
```

### match()

`re.match(pattern, string, flags=0)`

如果 `string` **开头的零个或多个字符**与正则表达式 `pattern` 匹配，则返回相应的 `Match` 。 如果字符串与模式不匹配则返回 `None`

注意即便是 `MULTILINE` 多行模式， `re.match()` 也只匹配字符串的开始位置，而不匹配每行开始。

如果你想定位 `string` 的任何位置，使用 `search()` 来替代（也可参考 search() vs. match() ）

### search() vs. match()

Python 基于正则表达式提供了不同的原始操作:

- `re.match()` 只在字符串的开头位置检测匹配。
- `re.search()` 在字符串中的任何位置检测匹配（这也是 Perl 在默认情况下所做的）
- `re.fullmatch()` 检测整个字符串是否匹配

例如：

```py
re.match("c", "abcdef")    # 不匹配
re.search("c", "abcdef")   # 匹配

re.fullmatch("p.*n", "python") # 匹配

re.fullmatch("r.*n", "python") # 不匹配
```

### split()

语法：`re.split(pattern, string, maxsplit=0, flags=0)`

用 `pattern` 分开 `string` 。 如果在 `pattern` 中捕获到括号，那么所有的组里的文字也会包含在列表里。如果 `maxsplit` 非零， 最多进行 `maxsplit` 次分隔， 剩下的字符全部返回到列表的最后一个元素。

```py
re.split(r'\W+', 'Words, words, words.')
# ['Words', 'words', 'words', ''] 。注意：这里最后一个元素是空字符串

re.split(r'(\W+)', 'Words, words, words.')
# ['Words', ', ', 'words', ', ', 'words', '.', '']

re.split(r'\W+', 'Words, words, words.', maxsplit=1)
# ['Words', 'words, words.']

re.split('[a-f]+', '0a3B9', flags=re.IGNORECASE)
# ['0', '3', '9']
```

如果分隔符里有捕获组合，并且匹配到字符串的开始，那么结果将会以一个空字符串开始。对于结尾也是一样

```py
re.split(r'(\W+)', '...words, words...')
# ['', '...', 'words', ', ', 'words', '...', '']
```

## flags

- `re.I`, `re.IGNORECASE`
  - 执行忽略大小写的匹配；`[A-Z]` 这样的表达式也将匹配小写字母。 完全的 Unicode 匹配 (如 Ü 将匹配 ü) 同样适用，除非使用了 ASCII 旗标来禁用非 ASCII 匹配。

## Pattern 对象

由 `re.compile()` 返回的已编译正则表达式对象。

使用：

```py
import re

pattern = re.compile(r"\d{2}\.\d{2}\.\d{4}")
```

### search()

语法：`Pattern.search(string[, pos[, endpos]])`

扫描整个 string 查找该正则表达式产生匹配的第一个位置，并返回相应的 Match。 如果字符串中没有与模式匹配的位置则返回 None

```py
pattern = re.compile("d")
pattern.search("dog")     # 在索引0处匹配

pattern.search("dog", 1)  # 没有匹配项；搜索不包括“D”
```

### split()

语法：`Pattern.split(string, maxsplit=0)`

等价于 `split()` 函数，使用了编译后的样式。

### pattern 属性

编译对象的原始样式字符串。read-only，不能修改

## Match 对象

由成功的 `match()` 和 `search()` 所返回的匹配对象。

### group()

语法：`Match.group([group1, ...])`

正则表达式被 `()` 括住则为一个子组

- 返回一个或者多个匹配的子组。
- 如果只有一个参数，结果就是一个字符串
- 如果有多个参数，结果就是一个元组（每个参数对应一个项）
- 如果没有参数或者参数为 `0`，相应的返回值就是整个匹配字符串；
- 如果它是一个范围 `[1..99]`，结果就是相应的括号组字符串。

```py
m = re.match(r"(\w+) (\w+)", "Isaac Newton, physicist")

m.group(0)       # 整个匹配
m.group()        # 整个匹配
# 'Isaac Newton'

m.group(1)       # 第一个圆括号标记的子分组。
# 'Isaac'

m.group(2)       # 第二个圆括号标记的子分组。
# 'Newton'

m.group(1, 2)    # 使用多个参数则返回一个元组。
# ('Isaac', 'Newton')
```

如果正则表达式使用了 (`?P<name>...`) 语法， `groupN` 参数就也可能是命名组合的名字。

```py
m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Malcolm Reynolds")

m.group('first_name')
# 'Malcolm'

m.group('last_name')
# 'Reynolds'
```

如果一个组匹配成功多次，就只返回最后一个匹配

```py
m = re.match(r"(..)+", "a1b2c3")  # 匹配 3 次。
m.group(1)                        # 只返回最后一个匹配。
# 'c3'
```

#### `Match.__getitem__(g)`

这个等价于 `m.group(g)`。这允许更方便的引用一个匹配

```py
m = re.match(r"(\w+) (\w+)", "Isaac Newton, physicist")

m[0]       # 整个匹配
# 'Isaac Newton'

m[1]       # 第一个圆括号标记的子分组。
# 'Isaac'

m[2]       # 第二个圆括号标记的子分组。
# 'Newton'
```
