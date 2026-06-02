# 通用方法

- [通用方法](#通用方法)
  - [pandas.concat](#pandasconcat)
  - [pandas.isna](#pandasisna)

## pandas.concat

沿特定轴连接 pandas 对象。

**1、语法**

`pandas.concat(objs, *, axis=0, join='outer', ignore_index=False, keys=None, levels=None, names=None, verify_integrity=False, sort=<no_default>, copy=<no_default>)`

**2、参数**

- `objs`: `Series` 或 `DataFrame` 对象的迭代器或映射
  - 如果传递了映射，则键将用作 `keys` 参数，除非它已传递，在这种情况下将选择值。
  - 任何 `None` 对象都将被静默删除，除非它们全部为 `None`，在这种情况下将引发 `ValueError`。
- `axis`: `{0/’index’, 1/’columns’}`, 默认 `0`
  - 沿哪个轴进行连接。
  - `0` 代表沿着行连接，`1` 代表沿着列连接。对于 Series 来说，只有 axis=0 是有效的。
- `join`: `{‘inner’, ‘outer’}`, 默认 `outer`
  - 如何处理其他轴（或轴）上的索引。
  - `inner` 表示取交集，`outer` 表示取并集。
- `ignore_index`: `bool`, 默认 `False`
  - 如果为 `False`，则保留连接轴上的索引值。生成的轴将标记为连接轴上的索引值的并集。
  - 如果为 `True`，则不使用连接轴上的索引值，重新生成索引。生成的轴将标记为 `0, ..., n - 1`。
- `keys`: 序列，默认 `None`
  - 指定 `keys` 将在结果中创建一个分层索引，以便能够区分来自不同输入对象的行。
- levels: 序列列表，默认 None
  - 用于构造 MultiIndex 的特定级别（唯一值）。否则，它们将从键中推断出来。
- `names`: 列表，默认 `None`
  - 给 `keys` 创建的分层索引级别设置名称。
- `verify_integrity`: 布尔值，默认 `False`
  - 检查新连接的轴是否包含重复项，防止重复索引。
- `sort`: `bool`，默认值 `False`
  - 对非连接轴进行排序，按字母顺序进行排序，调整顺序。
  - 假如连接轴是行（axis=0），则对列进行排序；如果连接轴是列（axis=1），则对行进行排序。

返回值：

- 当沿索引（axis=0）连接所有 Series 时，将返回 Series。
- 当 objs 包含至少一个 DataFrame 时，将返回 DataFrame。
- 当沿列（axis=1）连接时，将返回 DataFrame。

**3、示例**

3.1、连接 Series 时，默认沿着行连接：

> index 可能会重复

```py
>>> s1 = pd.Series(["a", "b"])
>>> s2 = pd.Series(["c", "d"])
>>> pd.concat([s1, s2])
0    a
1    b
0    c
1    d
dtype: str
```

3.2、通过将 `ignore_index` 选项设置为 `True` 来清除现有索引并重置结果中的索引。

```py
>>> pd.concat([s1, s2], ignore_index=True)
0    a
1    b
2    c
3    d
dtype: str
```

3.3、使用 `keys` 选项在数据最外层添加分层索引

```py
>>> pd.concat([s1, s2], keys=["s1", "s2"])
s1  0    a
    1    b
s2  0    c
    1    d
dtype: str
```

3.4、使用 `names` 选项为创建的索引键添加标签。

```py
>>> pd.concat([s1, s2], keys=["s1", "s2"], names=["Series name", "Row ID"])
Series name  Row ID
s1           0         a
             1         b
s2           0         c
             1         d
dtype: str
```

3.5、组合具有相同列的两个 `DataFrame` 对象。

```py
>>> df1 = pd.DataFrame([["a", 1], ["b", 2]], columns=["letter", "number"])
>>> df2 = pd.DataFrame([["c", 3], ["d", 4]], columns=["letter", "number"])
>>> pd.concat([df1, df2])
  letter  number
0      a       1
1      b       2
0      c       3
1      d       4
```

3.6、结合具有不同列的两个 `DataFrame` 对象。列交集之外的列将用 `NaN` 值填充。

```py
>>> df3 = pd.DataFrame([["c", 3, "cat"], ["d", 4, "dog"]], columns=["letter", "number", "animal"])
>>> pd.concat([df1, df3])
  letter  number animal
0      a       1    NaN
1      b       2    NaN
0      c       3    cat
1      d       4    dog
```

3.7、组合具有相同列的 DataFrame 对象，并仅返回相同列的数据，方法是将 `inner` 传递给 `join` 关键字参数。

```py
>>> pd.concat([df1, df3], join="inner")
  letter  number
0      a       1
1      b       2
0      c       3
1      d       4
```

3.8、通过传递 `axis=1` 来将 `DataFrame` 对象沿 `x` 轴水平组合。

```py
>>> df4 = pd.DataFrame([["bird", "polly"], ["monkey", "george"]], columns=["animal", "name"])
>>> df4
  animal    name
0   bird   polly
1  monkey  george

>>> pd.concat([df1, df4], axis=1)
  letter  number  animal    name
0      a       1    bird   polly
1      b       2  monkey  george
```

3.9、使用 `verify_integrity` 选项防止结果包含重复的索引值。

> 可以使用 `ignore_index=True` 来避免重复索引值

```py
>>> df5 = pd.DataFrame([1], index=["a"])
>>> df6 = pd.DataFrame([2], index=["a"])
>>> pd.concat([df5, df6], verify_integrity=True)
Traceback (most recent call last):
    ...
ValueError: Indexes have overlapping values: ['a']
```

3.10、将 `Series` 追加到 `DataFrame` 对象末尾。

```py
>>> df7 = pd.DataFrame({"a": 1, "b": 2}, index=[0])
>>> df7
    a   b
0   1   2
>>> new_row = pd.Series({"a": 3, "b": 4})
>>> new_row
a    3
b    4
dtype: int64
>>> pd.concat([df7, new_row.to_frame().T], ignore_index=True)
    a   b
0   1   2
1   3   4
```

## pandas.isna

检测对象中的缺失值，指示值是否缺失。

**1、语法**

`pandas.isna(obj)`

**2、参数**

- `obj`: 要检查的对象，可以是 `DataFrame`、`Series` 或其他类型。

返回值：

- 对于标量输入，返回一个标量布尔值。
- 对于数组输入，返回一个布尔数组，指示每个相应元素是否缺失。

**3、示例**

3.1、检测标量

```py
>>> pd.isna("dog")
False

>>> pd.isna(pd.NA)
True

>>> pd.isna(np.nan)
True
```

3.2、检测 `np.array`。返回一个布尔数组，指示每个相应元素是否缺失。

```py
>>> array = np.array([[1, np.nan, 3], [4, 5, np.nan]])
>>> array
array([[ 1., nan,  3.],
       [ 4.,  5., nan]])
>>> pd.isna(array)
array([[False,  True, False],
       [False, False,  True]])
```

3.4、对于 `Series` 和 `DataFrame`，返回相同类型的对象，其中包含布尔值。

```py
>>> df = pd.DataFrame([["ant", "bee", "cat"], ["dog", None, "fly"]])
>>> df
     0    1    2
0  ant  bee  cat
1  dog  NaN  fly
>>> pd.isna(df)
       0      1      2
0  False  False  False
1  False   True  False
```

```py
# 检测第二列的数据
>>> pd.isna(df[1])
0    False
1     True
Name: 1, dtype: bool
```
