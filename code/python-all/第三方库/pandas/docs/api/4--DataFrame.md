# DataFrame

- [DataFrame](#dataframe)
  - [DataFrame.at](#dataframeat)
  - [DataFrame.iat](#dataframeiat)
  - [DataFrame.copy](#dataframecopy)
  - [DataFrame.drop\_duplicates](#dataframedrop_duplicates)
  - [DataFrame.explode](#dataframeexplode)
  - [DataFrame.groupby](#dataframegroupby)
  - [DataFrame.itertuples](#dataframeitertuples)
  - [DataFrame.loc](#dataframeloc)
  - [DataFrame.iloc](#dataframeiloc)
  - [DataFrame.T](#dataframet)
  - [DataFrame.tail](#dataframetail)
  - [DataFrame.to\_dict](#dataframeto_dict)

## DataFrame.at

通过行/列标签对访问单个值。

与 `loc` 类似，两者都提供基于标签的查找。如果您只需要在 `DataFrame` 或 `Series` 中**获取或设置单个值**，请使用 `at`。

**1、语法**

`DataFrame.at`

**2、示例**

DataFrame 例子：

```py
>>> df = pd.DataFrame(
...     [[0, 2, 3], [0, 4, 1], [10, 20, 30]],
...     index=[4, 5, 6],
...     columns=["A", "B", "C"],
... )
>>> df
    A   B   C
4   0   2   3
5   0   4   1
6  10  20  30
```

2.1、访问单个值

```py
>>> df.at[4, "B"]
np.int64(2)
```

2.2、设置单个值

```py
>>> df.at[4, "B"] = 10
>>> df.at[4, "B"]
np.int64(10)
```

2.3、在 `Series` 中获取值

```py
>>> df.loc[5].at["B"]
np.int64(4)
```

## DataFrame.iat

通过行/列的整数位置访问单个值。与 `DataFrame.iat` 类似。

```py
df.iat[0, 1]
```

## DataFrame.copy

制作 DataFrame 的副本。

**1、语法**

`DataFrame.copy(deep=True)`

**2、参数**

- `deep`: `bool`, 默认 `True`
  - 默认执行深拷贝，完全独立的新对象，数据、索引、列名均复制到新内存。
  - 当 `deep=False` 时，返回新容器，但内部数据仍引用原 DataFrame 的数据块

**3、示例**

1、默认情况下，`copy()` 会执行深拷贝：

```py
>>> df = pd.DataFrame({"A": [1, 2], "B": [3, 4]})
>>> df_copy = df.copy()
>>> df.iat[0, 0] = 10
>>> df_copy
   A  B
0  1  3
1  2  4
```

2、使用浅拷贝，修改原 DataFrame 的数据会影响副本：

```py
>>> df = pd.DataFrame({"A": [1, 2], "B": [3, 4]})
>>> df_copy = df.copy(deep=False)
>>> df.iat[0, 0] = 10
>>> df_copy
    A  B
0  10  3
1   2  4
```

## DataFrame.drop_duplicates

返回已删除重复行的 DataFrame。

**1、语法**

`DataFrame.drop_duplicates(subset=None, *, keep='first', inplace=False, ignore_index=False)`

**2、参数**

- `subset`: 列标签或标签的可迭代对象，可选
  - 仅考虑特定列来标识重复项，**默认情况下使用所有列**。
- `keep`: `{‘first’, ‘last’, False}`, 默认为 `‘first’`
  - 确定保留哪些重复项（如果有）。
    - `‘first’` : 删除重复项，但保留第一个出现的。
    - `‘last’` : 删除重复项，但保留最后一个出现的。
    - `False` : 删除所有重复项。
- `inplace`: `bool`, 默认为 `False`
  - 如果为 `True`，则直接在原 DataFrame 上进行操作，而不是返回一个新的 DataFrame。
  - 如果为 `False`，则返回一个新的 DataFrame，原 DataFrame 不变。
- `ignore_index`: `bool`, 默认为 `False`
  - 如果为 `True`，则结果轴将标记为 `0, 1, ..., n - 1`。

**3、示例**

DataFrame 例子：

```py
>>> df = pd.DataFrame(
...     {
...         "brand": ["Yum Yum", "Yum Yum", "Indomie", "Indomie", "Indomie"],
...         "style": ["cup", "cup", "cup", "pack", "pack"],
...         "rating": [4, 4, 3.5, 15, 5],
...     }
... )
>>> df
    brand style  rating
0  Yum Yum   cup     4.0
1  Yum Yum   cup     4.0
2  Indomie   cup     3.5
3  Indomie  pack    15.0
4  Indomie  pack     5.0
```

3.1、默认情况下，根据所有列删除重复的行

```py
>>> df.drop_duplicates()
    brand style  rating
0  Yum Yum   cup     4.0
2  Indomie   cup     3.5
3  Indomie  pack    15.0
4  Indomie  pack     5.0
```

3.2、指定 `subset` 来根据特定列删除重复的行

```py
>>> df.drop_duplicates(subset=["brand"])
    brand style  rating
0  Yum Yum   cup     4.0
2  Indomie   cup     3.5
```

3.3、使用 `keep` 参数来保留最后一个出现的重复项

```py
>>> df.drop_duplicates(subset=["brand", "style"], keep="last")
    brand style  rating
1  Yum Yum   cup     4.0
2  Indomie   cup     3.5
4  Indomie  pack     5.0
```

## DataFrame.explode

将列表类型的每个元素转换为一行，复制索引值。

**1、语法**

`DataFrame.explode(column, ignore_index=False)`

**2、参数**

- `column`: `IndexLabel`
  - 要展开的列的名称。
  - 对于多列，请指定一个非空列表，其中每个元素都是字符串或元组，并且所有指定的列在其列表中都必须具有与框架的同一行匹配的长度。
- `ignore_index`: `bool`, 默认为 `False`
  - 如果为 `True`，则重新索引结果，结果索引将标记为 `0, 1, …, n - 1`

**3、示例**

DataFrame 例子：

```py
>>> df = pd.DataFrame(
...     {
...         "A": [[0, 1, 2], "foo", [], [3, 4]],
...         "B": 1,
...         "C": [["a", "b", "c"], np.nan, [], ["d", "e"]],
...     }
... )
>>> df
           A  B          C
0  [0, 1, 2]  1  [a, b, c]
1        foo  1        NaN
2         []  1         []
3     [3, 4]  1     [d, e]
```

3.1、单列展开

```py
>>> df.explode("A")
     A  B          C
0    0  1  [a, b, c]
0    1  1  [a, b, c]
0    2  1  [a, b, c]
1  foo  1        NaN
2  NaN  1         []
3    3  1     [d, e]
3    4  1     [d, e]
```

3.2、多列展开

```py
>>> df.explode(["A", "C"])
# or
>>> df.explode(list("AC"))
     A  B    C
0    0  1    a
0    1  1    b
0    2  1    c
1  foo  1  NaN
2  NaN  1  NaN
3    3  1    d
3    4  1    e
```

## DataFrame.groupby

使用 mapper 或者 columns 组成的 series 对 DataFrame 进行分组。

**1、语法**

`DataFrame.groupby(by=None, level=None, *, as_index=True, sort=True, group_keys=True, observed=True, dropna=True)`

**2、参数**

- `by`: 映射、函数、标签、`pd.Grouper` 或此类列表
  - 用于确定 groupby 的分组。如果 by 是一个函数，它会在对象索引的每个值上调用。如果传递了 dict 或 Series，则将使用 Series 或 dict 的值来确定分组（Series 的值首先对齐；请参阅 .align() 方法）。如果传递了长度等于行数的列表或 ndarray（请参阅 groupby 用户指南），则将按原样使用这些值来确定分组。可以为 self 中的列传递标签或标签列表以进行分组。请注意，元组将被解释为（单个）键。
- `level`: int、level 名称或此类序列，默认为 None
  - 如果轴是 MultiIndex（分层），则按特定级别或级别分组。不要同时指定 by 和 level。
- `as_index`: bool，默认为 True
  - 返回以组标签作为索引的对象。仅与 DataFrame 输入相关。as_index=False 有效地产生“SQL 风格”的分组输出。此参数对过滤（请参阅用户指南中的过滤）没有影响，例如 head()、tail()、nth() 以及转换（请参阅用户指南中的转换）。
- `sort`: bool，默认为 True
  - 对组键进行排序。通过关闭此项可以获得更好的性能。注意这不会影响每个组内的观察顺序。Groupby 保留每个组内的行顺序。如果为 False，则组将按其在原始 DataFrame 中出现的顺序显示。此参数对过滤（请参阅用户指南中的过滤）没有影响，例如 head()、tail()、nth() 以及转换（请参阅用户指南中的转换）。
- `group_keys`: bool，默认为 True
  - 调用 apply 且 by 参数产生一个类似索引（即转换）的结果时，将组键添加到索引以标识各个部分。默认情况下，当结果的索引（和列）标签与输入匹配时，不会包含组键，否则会包含。
- `observed`: bool，默认为 True
  - 这仅在任何分组器是Categoricals时适用。如果为True：仅显示分类分组器的已观察值。如果为False：显示分类分组器的所有值。
- `dropna`: bool，默认为 True
  - 如果为 True，并且如果组键包含 NA 值，则 NA 值将与行/列一起被删除。如果为 False，则 NA 值也将被视为组中的键。

返回值：

- `DataFrameGroupBy` 对象。一个包含有关分组信息的 groupby 对象。

**3、示例**

DataFrame 例子：

```py
>>> df = pd.DataFrame(
...     {
...         "Animal": ["Falcon", "Falcon", "Parrot", "Parrot"],
...         "Max Speed": [380.0, 370.0, 24.0, 26.0],
...     }
... )
>>> df
   Animal  Max Speed
0  Falcon      380.0
1  Falcon      370.0
2  Parrot       24.0
3  Parrot       26.0
>>> df.groupby(["Animal"]).mean()
        Max Speed
Animal
Falcon      375.0
Parrot       25.0
```

3.1、可以使用 level 参数按分层索引的不同级别进行 groupby。

## DataFrame.itertuples

返回一个迭代器，用于迭代 DataFrame 中每行的命名元组。

**1、语法**

`DataFrame.itertuples(index=True, name='Pandas')`

**2、参数**

- `index`: `bool`, 默认为 `True`
  - 如果为 `True`，索引会作为元组的第一个元素。
- `name`: `str` 或 `None`, 默认为 `'Pandas'`
  - 命名元组的名称。
  - 如果为 `None`，将返回普通元组。

**3、示例**

3.1、遍历 DataFrame

```py
>>> df = pd.DataFrame({"num_legs": [4, 2], "num_wings": [0, 2]}, index=["dog", "hawk"])
>>> df
      num_legs  num_wings
dog          4          0
hawk         2          2
>>> for row in df.itertuples():
...     print(row)
Pandas(Index='dog', num_legs=4, num_wings=0)
Pandas(Index='hawk', num_legs=2, num_wings=2)
```

3.2、读取元组中的值：

```py
>>> df = pd.DataFrame({"num_legs": [4, 2], "num_wings": [0, 2]}, index=["dog", "hawk"])
>>> df
      num_legs  num_wings
dog          4          0
hawk         2          2
>>> for row in df.itertuples():
...     print(row.num_legs, row.num_wings)
4 0
2 2
```

3.3、通过将 `index` 参数设置为 `False`，我们可以移除索引作为元组的第一个元素

```py
>>> for row in df.itertuples(index=False):
...     print(row)
Pandas(num_legs=4, num_wings=0)
Pandas(num_legs=2, num_wings=2)
```

3.4、通过设置 `name` 参数，我们可以为生成的命名元组设置自定义名称

```py
>>> for row in df.itertuples(name="Animal"):
...     print(row)
Animal(Index='dog', num_legs=4, num_wings=0)
Animal(Index='hawk', num_legs=2, num_wings=2)
```

## DataFrame.loc

通过 **标签** 或 **布尔数组** 访问一组行和列。**可以获取或设置数据**。

**1、语法**

`DataFrame.loc[]`

**2、参数**

接收两个参数，第一个参数用于指定行，第二个参数用于指定列。第一个参数是必需的，而第二个参数是可选的。如果第二个参数被省略，默认选择所有列。

**指定行的参数**允许接收：

- 一个单一的标签，例如 `df.loc['a']`。
- 一个标签列表，例如 `df.loc[['a', 'b', 'c']]`。
- 一个标签切片，例如 `df.loc['a':'f']`。
- 一个布尔列表，例如 `df.loc[[True, False, True]]`。
- 一个可对齐的布尔 Series，例如 `df.loc[pd.Series([True, False, True], index=["a", "b", "c"])]`。
- 返回布尔 Series 的条件，例如 `df.loc[df['Column1'] > 0]`。
- 一个可对齐的 Index。例如 `df.loc[pd.Index(["a", "b", "c"])]`。
- 一个函数，例如 `df.loc[lambda df: df['Column1'] > 0]`。

**指定列的参数**允许接收：

- 一个单一的标签，例如 `df.loc[:, 'Column1']`。
- 一个标签列表，例如 `df.loc[:, ['Column1', 'Column2']]`。
- 一个标签切片，例如 `df.loc[:, 'Column1':'Column3']`。

**3、示例**

DataFrame 例子：

```py
>>> df = pd.DataFrame(
...     [[1, 2], [4, 5], [7, 8]],
...     index=["cobra", "viper", "sidewinder"],
...     columns=["max_speed", "shield"],
... )
>>> df
            max_speed  shield
cobra               1       2
viper               4       5
sidewinder          7       8
```

**3.1、获取值**

3.1.1、**单个标签**。获取**一行数据**（返回 `Series`）

```py
>>> df.loc["viper"]
max_speed    4
shield       5
Name: viper, dtype: int64
```

3.1.2、**标签列表**。需要在 `[[...]]` 中传递标签列表。获取**多行数据**（返回 `DataFrame`）

```py
>>> df.loc[["viper", "sidewinder"]]
            max_speed  shield
viper               4       5
sidewinder          7       8
```

> `df.loc["viper", "sidewinder"]` 和 `df.loc[("viper", "sidewinder")]` 会引发 `KeyError`，因为第二个参数必须是列标签，而不是行标签。

3.1.3、**行的单个标签和列的单个标签**。获取**单个值**

```py
>>> df.loc["cobra", "shield"]
2
```

3.1.4、**标签切片**。获取连续的**行数据**（返回 `DataFrame`）

```py
>>> df.loc["viper":"sidewinder"]
            max_speed  shield
viper               4       5
sidewinder          7       8
```

3.1.5、**行的标签切片和列的单个标签**。获取连续行的**单列数据**（返回 `Series`）

请注意，切片的开始和结束都包含在内。

```py
>>> df.loc["cobra":"viper", "max_speed"]
cobra    1
viper    4
Name: max_speed, dtype: int64
```

获取所有行的单列数据，即**获取该列数据**：

```py
>>> df.loc[:, "max_speed"]
cobra        1
viper        4
sidewinder   7
Name: max_speed, dtype: int64
```

3.1.6、**布尔列表**。获取满足条件的**行数据**（返回 `DataFrame`）

列表长度必须与行轴长度相同。

```py
>>> df.loc[[False, True, True]]
            max_speed  shield
viper               4       5
sidewinder          7       8
```

3.1.7、**布尔 Series**。获取满足条件的**行数据**（返回 `DataFrame`）

Series 的索引必须与 DataFrame 的行索引对齐（index 长度相同且值相同，顺序可以不同）。

```py
>>> df.loc[pd.Series([False, True, False], index=["viper", "sidewinder", "cobra"])]
                     max_speed  shield
sidewinder          7       8
```

3.1.8、**index**。获取对应 index 的**行数据**（返回 `DataFrame`）

```py
>>> df.loc[pd.Index(["cobra", "viper"])]
       max_speed  shield
cobra          1       2
viper          4       5

>>> df.loc[pd.Index(["cobra", "viper"], name="foo")]
       max_speed  shield
foo
cobra          1       2
viper          4       5
```

3.1.9、**返回布尔 Series 的条件**。获取满足条件的**行数据**（返回 `DataFrame`）

```py
>>> df.loc[df["shield"] > 6]
            max_speed  shield
sidewinder          7       8
```

3.1.10、**返回布尔 Series 的条件并且指定列标签列表**。获取满足条件的**行数据**（返回 `Series`）

```py
>>> df.loc[df["shield"] > 3, ["max_speed"]]
            max_speed
viper               4
sidewinder          7

>>> df.loc[df["shield"] > 3, "max_speed"]
viper               4
sidewinder          7
```

3.1.11、**使用 `&` 连接多个条件**。需要使用括号将每个条件括起来。获取满足条件的**行数据**（返回 `DataFrame`）

```py
>>> df.loc[(df["max_speed"] > 1) & (df["shield"] < 8)]
            max_speed  shield
viper          4       5
```

3.1.12、**使用 `|` 连接多个条件**。需要使用括号将每个条件括起来。获取满足条件的**行数据**（返回 `DataFrame`）

```py
>>> df.loc[(df["max_speed"] > 4) | (df["shield"] < 5)]
            max_speed  shield
cobra               1       2
sidewinder          7       8
```

3.1.13、**使用 `lambda` 函数**。获取满足条件的**行数据**（返回 `DataFrame`）

```py
>>> df.loc[lambda df: df["shield"] == 8]
            max_speed  shield
sidewinder          7       8
```

**3.2、设置值**

3.2.1、为所有匹配标签列表的项目设置值

```py
>>> df.loc[["viper", "sidewinder"], ["shield"]] = 50
>>> df
            max_speed  shield
cobra               1       2
viper               4      50
sidewinder          7      50
```

3.2.2、为整行设置值

```py
>>> df.loc["cobra"] = 10
>>> df
            max_speed  shield
cobra              10      10
viper               4      50
sidewinder          7      50
```

```py
>>> df.loc["cobra"] = [100, 200]
>>> df
            max_speed  shield
cobra             100     200
viper               4      50
sidewinder          7      50
```

3.2.3、为整列设置值

```py
>>> df.loc[:, "max_speed"] = 30
>>> df
            max_speed  shield
cobra              30      10
viper              30      50
sidewinder         30      50
```

3.2.4、为匹配条件的行设置值

```py
>>> df.loc[df["shield"] > 35] = 0
>>> df
            max_speed  shield
cobra              30      10
viper               0       0
sidewinder          0       0
```

3.2.5、给单个值赋值

```py
>>> df.loc["viper", "shield"] += 5
>>> df
            max_speed  shield
cobra              30      10
viper               0       5
sidewinder          0       0
```

3.2.6、使用 `Series` 或 `DataFrame` 进行设置时，会根据索引标签设置值，而不是根据索引位置。

```py
>>> shuffled_df = df.loc[["viper", "cobra", "sidewinder"]]
>>> df.loc[:] += shuffled_df
>>> df
            max_speed  shield
cobra              60      20
viper               0      10
sidewinder          0       0
```

**3.3、在具有整数标签索引的 DataFrame 上获取值**

DataFrame 例子：

```py
>>> df = pd.DataFrame(
...     [[1, 2], [4, 5], [7, 8], [10, 11]],
...     index=[7, 8, 9, 10],
...     columns=["max_speed", "shield"],
... )
>>> df
   max_speed  shield
7          1       2
8          4       5
9          7       8
10         10      11
```

```py
>>> df.loc[7:9]
   max_speed  shield
7          1       2
8          4       5
9          7       8
```

**3.4、在具有 MultiIndex 的 DataFrame 获取值**

DataFrame 例子：

```py
>>> tuples = [
...     ("cobra", "mark i"),
...     ("cobra", "mark ii"),
...     ("sidewinder", "mark i"),
...     ("sidewinder", "mark ii"),
...     ("viper", "mark ii"),
...     ("viper", "mark iii"),
... ]
>>> index = pd.MultiIndex.from_tuples(tuples)
>>> values = [[12, 2], [0, 4], [10, 20], [1, 4], [7, 1], [16, 36]]
>>> df = pd.DataFrame(values, columns=["max_speed", "shield"], index=index)
>>> df
                     max_speed  shield
cobra      mark i           12       2
           mark ii           0       4
sidewinder mark i           10      20
           mark ii           1       4
viper      mark i            7       1
           mark ii          16      36
```

3.4.1、**单个标签**。返回一个带有子索引的 DataFrame。

```py
>>> df.loc["cobra"]
         max_speed  shield
mark i          12       2
mark ii          0       4
```

3.4.2、**索引元组**。返回一个 Series。

```py
>>> df.loc[("cobra", "mark ii")]
max_speed    0
shield       4
Name: (cobra, mark ii), dtype: int64
```

使用 `[[]]` 会返回 DataFrame:

```py
>>> df.loc[[("cobra", "mark ii")]]
               max_speed  shield
cobra mark ii          0       4
```

3.4.3、**父索引标签和子索引标签**。返回一个 Series。

```py
>>> df.loc["cobra", "mark i"]
max_speed    12
shield        2
Name: (cobra, mark i), dtype: int64
```

3.4.4、**索引元组和单个列标签**。返回一个值。

```py
>>> df.loc[("cobra", "mark ii"), "shield"]
4
```

3.4.5、**从索引元组到单个标签的切片**

```py
>>> df.loc[("cobra", "mark i") : "viper"]
                     max_speed  shield
cobra      mark i           12       2
           mark ii           0       4
sidewinder mark i           10      20
           mark ii           1       4
viper      mark i            7       1
           mark ii         16      36
```

3.4.6、**从索引元组到索引元组的切片**

```py
>>> df.loc[("cobra", "mark i") : ("viper", "mark i")]
                    max_speed  shield
cobra      mark i          12       2
           mark ii          0       4
sidewinder mark i          10      20
           mark ii          1       4
viper      mark i           7       1
```

**3.5、使用 Series 添加新列**

在将 Series 赋值给 `.loc[row_indexer, col_indexer]` 时，pandas 会根据索引标签对 Series 进行对齐，而不是根据顺序或位置。

```py
>>> df = pd.DataFrame({"A": [1, 2, 3]}, index=[0, 1, 2])
>>> s = pd.Series([10, 20], index=[1, 0])
>>> df.loc[:, "B"] = s  # 添加新列 B
>>> df
   A   B
0  1  20.0
1  2  10.0
2  3 NaN
```

## DataFrame.iloc

通过 **Integer** 访问一组行和列。**可以获取或设置数据**。

`DataFrame.iloc[]` 主要用于基于位置的索引，使用整数位置来选择行和列，而不是标签。

使用方法和 `loc` 类似。

```py
df.iloc[0]  # 获取第一行数据
df.iloc[0:2]  # 获取前两行数据
```

## DataFrame.T

返回 DataFrame 的转置。

**1、语法**

`DataFrame.T`

与 `DataFrame.transpose()` 等价。

**2、示例**

```py
>>> df = pd.DataFrame({"col1": [1, 2], "col2": [3, 4]})
>>> df
   col1  col2
0     1     3
1     2     4
```

```py
>>> df.T
      0  1
col1  1  2
col2  3  4
```

## DataFrame.tail

返回最后 n 行。

**1、语法**

`DataFrame.tail(n=5)`

**2、参数**

- `n`: int, 默认值 5
  - 要返回的行数。
  - 如果 n 为负数，则返回除前 n 行以外的所有行。
  - 如果 n 大于 DataFrame 的行数，则返回整个 DataFrame。

**3、示例**

3.1、获取最后 3 行

```py
>>> df = pd.DataFrame({"col1": [1, 2, 3, 4, 5, 6], "col2": [7, 8, 9, 10, 11, 12]})
>>> df.tail(3)
   col1  col2
3     4    10
4     5    11
5     6    12
```

3.2、获取除前 2 行以外的所有行

```py
>>> df = pd.DataFrame({"col1": [1, 2, 3, 4, 5, 6], "col2": [7, 8, 9, 10, 11, 12]})
>>> df.tail(-2)
   col1  col2
2     3     9
3     4    10
4     5    11
5     6    12
```

## DataFrame.to_dict

将 DataFrame 转换为字典。

**1、语法**

`DataFrame.to_dict(orient='dict', *, into=<class 'dict'>, index=True)`

**2、参数**

- `orientstr`: `{‘dict’, ‘list’, ‘series’, ‘split’, ‘tight’, ‘records’, ‘index’}`
  - 决定字典值的类型。
    - `‘dict’` (默认) : dict 格式为 `{列 -> {索引 -> 值}}`
    - `‘list’` : dict 格式为 `{列 -> [值]}`
    - `‘series’` : dict 格式为 `{列 -> Series(值)}`
    - `‘split’` : dict 格式为 `{‘index’ -> [索引], ‘columns’ -> [列], ‘data’ -> [值]}`
    - `‘tight’` : dict 格式为 `{‘index’ -> [索引], ‘columns’ -> [列], ‘data’ -> [值], ‘index_names’ -> [索引名称], ‘column_names’ -> [列名称]}`
    - `‘records’` : list 格式为 `[{列 -> 值}, … , {列 -> 值}]`
    - `‘index’` : dict 格式为 `{索引 -> {列 -> 值}}`

**3、示例**

1、简单使用

```py
>>> df = pd.DataFrame(
...     {"col1": [1, 2], "col2": [0.5, 0.75]}, index=["row1", "row2"]
... )
>>> df
      col1  col2
row1     1  0.50
row2     2  0.75

>>> df.to_dict()
{'col1': {'row1': 1, 'row2': 2}, 'col2': {'row1': 0.5, 'row2': 0.75}}
```

2、指定 `orient` 参数

```py
>>> df.to_dict("series")
{'col1': row1    1
         row2    2
Name: col1, dtype: int64,
'col2': row1    0.50
        row2    0.75
Name: col2, dtype: float64}
```

```py
>>> df.to_dict("split")
{'index': ['row1', 'row2'], 'columns': ['col1', 'col2'],
 'data': [[1, 0.5], [2, 0.75]]}
```

```py
# 每一个 dict 代表一行数据
>>> df.to_dict("records")
[{'col1': 1, 'col2': 0.5}, {'col1': 2, 'col2': 0.75}]
```

```py
>>> df.to_dict("index")
{'row1': {'col1': 1, 'col2': 0.5}, 'row2': {'col1': 2, 'col2': 0.75}}
```

```py
>>> df.to_dict("tight")
{'index': ['row1', 'row2'], 'columns': ['col1', 'col2'],
 'data': [[1, 0.5], [2, 0.75]], 'index_names': [None], 'column_names': [None]}
```
