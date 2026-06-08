# Series

- [Series](#series)
  - [Series.fillna](#seriesfillna)
  - [Series.isin](#seriesisin)
  - [Series.notna](#seriesnotna)
  - [Series.str.contains](#seriesstrcontains)
  - [Series.str.split](#seriesstrsplit)
  - [Series.to\_frame](#seriesto_frame)
  - [Series.to\_list](#seriesto_list)

## Series.fillna

用 `value` 填充 `NA/NaN` 值。

**1、语法**

`Series.fillna(value, *, axis=None, inplace=False, limit=None)`

**2、参数**

- `value`: 标量、字典、Series 或 DataFrame
  - 用于填充缺失值的值。
- `axis`: {0 or ‘index’} for Series, {0 or ‘index’, 1 or ‘columns’} for DataFrame
  - 沿指定轴填充。
  - 对于 Series，此参数未使用，默认为 0。
- `inplace`: bool，默认值 False
  - 是否在原地修改 Series。
  - 如果为 `True`，则直接修改原 Series，返回 None。
  - 如果为 `False`，则返回一个修改后的 Series。
- `limit`: 整数，可选
  - 填充的最大数量。

返回值:

- 填充缺失值后的 Series。

**3、示例**

3.1、使用标量填充缺失值：

```py
>>> s = pd.Series([1, 2, None, 4, None])
>>> s.fillna(0)
0    1.0
1    2.0
2    0.0
3    4.0
4    0.0
dtype: float64
```

3.2、使用字典填充缺失值：

```py
>>> s = pd.Series([1, 2, None, 4, None], index=['a', 'b', 'c', 'd', 'e'])
>>> s.fillna({'c': 0, 'e': 5})
a    1.0
b    2.0
c    0.0
d    4.0
e    5.0
dtype: float64
```

## Series.isin

检查 Series 中的元素是否存在于 values 中。

**1、语法**

`Series.isin(values)`

**2、参数**

- `values`: `set` 或 `list-like`
  - 要测试的值的序列。传入单个字符串将引发 `TypeError`。

返回值:

- 一个布尔 Series，表示 Series 中的每个元素是否包含在 values 中。

**3、示例**

3.1、检查 Series 中的元素是否存在于列表中：

```py
>>> s = pd.Series(
...     ["llama", "cow", "llama", "beetle", "llama", "hippo"], name="animal"
... )
>>> s.isin(["cow", "llama"])
0     True
1     True
2     True
3    False
4     True
5    False
Name: animal, dtype: bool
```

3.2、字符串和整数是不同的，因此不可比较：

```py
>>> pd.Series([1]).isin(["1"])
0    False
dtype: bool
>>> pd.Series([1.1]).isin(["1.1"])
0    False
dtype: bool
```

3.3、过滤数据

```py
>>> s = pd.Series(["llama", "cow", "llama", "beetle", "llama", "hippo"], name="animal")
>>> s[s.isin(["cow", "llama"])]
0    llama
1      cow
2    llama
4    llama
dtype: object
```

## Series.notna

返回一个布尔 Series，表示 Series 中的每个元素是不是 NA/NaN。

**1、语法**

`Series.notna()`

**2、示例**

```py
>>> ser = pd.Series([5, 6, np.nan])
>>> ser
0    5.0
1    6.0
2    NaN
dtype: float64
>>> ser.notna()
0     True
1     True
2    False
dtype: bool
```

## Series.str.contains

根据 Series 或 Index 中的字符串是否包含给定的模式或正则表达式，返回**布尔值**的 Series 或 Index。

**1、语法**

`Series.str.contains(pat, case=True, flags=0, na=<no_default>, regex=True)`

**2、参数**

- `pat`: `str`
  - 字符序列或正则表达式。
- `case`: `bool`，默认为 `True`
  - 如果为 True，则区分大小写。
- `flags`: `int`, 默认值 `0` (无标志)
  - 传递给 re 模块的标志，例如 re.IGNORECASE。
- `na`: 标量，可选
  - 默认 `na=NaN`。如果值为 `NaN`，则结果返回 `NaN`。
    - 将包含 `NaN` 的布尔 `Series` 用于索引 `df[...]` 时，Pandas 会抛出错误：`ValueError: cannot index with vector containing NA / NaN values`。**所以需要将 `na` 设置为 `False` 或 `True` 来处理缺失值**。
  - 设置为 `False` 则将缺失值视为不匹配（返回 `False`）。缺失行会被过滤掉。**推荐使用**。
  - 设置为 `True` 则将缺失值视为匹配（返回 `True`）。缺失行会被保留。
- `regex`: 布尔值，默认为 True
  - 如果为 True，则假定 pat 是一个正则表达式。
  - 如果为 False，则将 pat 视为文字字符串。

返回值：

- 如果 pat 是一个正则表达式，则返回一个布尔 Series 或 Index，表示每个字符串是否包含匹配项。
- 如果 pat 是一个文字字符串，则返回一个布尔 Series 或 Index，表示每个字符串是否包含该匹配字符串。

**3、示例**

3.1、仅使用文字模式返回布尔值的 Series。

```py
>>> s1 = pd.Series(["Mouse", "dog", "house and parrot", "23", np.nan])
>>> s1.str.contains("og", regex=False)
0    False
1     True
2    False
3    False
4      NaN
dtype: bool
```

3.2、使用正则表达式返回布尔值的 Series。

```py
>>> s1 = pd.Series(["Mouse", "dog", "house and parrot", "23", np.nan])
>>> s1.str.contains("house|dog", regex=True)
0    False
1     True
2     True
3    False
4      NaN
dtype: bool
```

3.3、使用 `na` 参数处理缺失值。

```py
>>> s1 = pd.Series(["Mouse", "dog", "house and parrot", "23", np.nan])
>>> s1.str.contains("house|dog", regex=True)
0    False
1     True
2     True
3    False
4      NaN
dtype: bool

>>> s1.str.contains("house|dog", regex=True, na=False)
0    False
1     True
2     True
3    False
4    False
dtype: bool

>>> s1.str.contains("house|dog", regex=True, na=True)
0    False
1     True
2     True
3    False
4     True
dtype: bool
```

3.4、过滤数据

```py
>>> s1 = pd.Series(["Mouse", "dog", "house and parrot", "23", np.nan])
>>> s1[s1.str.contains("house|dog", regex=True)]
1                 dog
2    house and parrot
dtype: object
```

## Series.str.split

在给定分隔符/定界符周围分割字符串。

**1、语法**

`Series.str.split(pat=None, *, n=-1, expand=False, regex=None)`

**2、参数**

- `pat`: `str` 或已编译的正则表达式，可选
  - 用于分割的字符串或正则表达式。如果未指定，则按空格分割。
- `n`: `int`，默认为 `-1`（全部）
  - 限制输出中的分割次数。 `None`、`0` 和 `-1` 将被解释为返回所有分割。
  - 如果找到的分割数 > n，则仅进行前 n 次分割
- `expand`: `bool`，默认为 `False`
  - 将分割后的字符串扩展为独立的列。
  - 如果为 `True`，则 `Series` 返回 `DataFrame`，`Index` 返回 `MultiIndex`，扩展维度。
  - 如果为 `False`，则返回 `Series`/`Index`，包含字符串列表。
- `regex`: `bool`，默认为 `None`
  - 确定传入的 `pat` 是否为正则表达式。
  - 如果为 `True`，则假设传入的模式是正则表达式。
  - 如果为 `False`，则将模式视为文字字符串。
  - 如果为 `None` 且 pat 的长度为 1，则将 pat 视为文字字符串。
  - 如果为 `None` 且 pat 的长度不为 1，则将 pat 视为正则表达式。
  - 如果 pat 是已编译的正则表达式，则不能设置为 `False`

**3、示例**

## Series.to_frame

将 Series 转换为 DataFrame。

**1、语法**

`Series.to_frame(name=<no_default>)`

**2、参数**

- `name`: object, 可选
  - 传入的 name 代替 series 的 name。

**3、示例**

```py
>>> s = pd.Series([1, 2, 3], name="numbers")
>>> s.to_frame()
   numbers
0        1
1        2
2        3

# 替换了 Series 原来的 name
>>> s.to_frame(name="nums")
   nums
0     1
1     2
2     3
```

## Series.to_list

将 Series 转换为列表。

**1、语法**

`Series.to_list()`

**2、示例**

```py
>>> s = pd.Series([1, 2, 3])
>>> s.to_list()
[1, 2, 3]
```
