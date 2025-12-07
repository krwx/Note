# pandas

- [pandas](#pandas)
  - [介绍](#介绍)
  - [Series](#series)
    - [创建](#创建)
    - [删除](#删除)
    - [修改](#修改)
    - [查询](#查询)
  - [DataFrame](#dataframe)
    - [DataFrame--创建](#dataframe--创建)
    - [DataFrame--查询](#dataframe--查询)
      - [访问行](#访问行)
      - [访问列](#访问列)
      - [DataFrame 的属性和方法](#dataframe-的属性和方法)
      - [过滤](#过滤)
    - [DataFrame--修改](#dataframe--修改)
      - [DataFrame 的合并](#dataframe-的合并)
    - [DataFrame--删除](#dataframe--删除)
  - [other](#other)
  - [Pandas Excel 文件操作](#pandas-excel-文件操作)

## 介绍

`Pandas` 一个强大的分析结构化数据的工具集，基础是 `Numpy` （提供高性能的矩阵运算）。

特点：

- `Pandas` 的主要数据结构是 `Series`（一维数据）与 `DataFrame`（二维数据）。
  - `Series` 是一种类似于一维数组的对象，它由一组数据（各种 `Numpy` 数据类型）以及一组与之相关的数据标签（即索引）组成。
  - `DataFrame` 是一个表格型的数据结构，它含有一组有序的列，每列可以是不同的值类型（数值、字符串、布尔型值）。`DataFrame` 既有行索引也有列索引，它可以被看做由 `Series` 组成的字典（共同用一个索引）。
- 数据加载与保存：Pandas 可以从各种数据源加载数据，包括 CSV 文件、Excel 表格、SQL 数据库、JSON 文件等，并且可以将处理后的数据保存到这些格式中。
- 数据可视化：Pandas 结合了 Matplotlib 库，可以轻松地进行数据可视化，绘制各种统计图表，如折线图、散点图、直方图等。

## Series

Pandas Series **类似表格中的一个列**（column），类似于一维数组，可以保存任何数据类型。

特点:

- **索引**： 每个 `Series` 都有一个索引，它可以是整数、字符串、日期等类型。如果不指定索引，Pandas 将默认创建一个从 `0` 开始的整数索引。
- **缺失数据**：Series 可以包含缺失数据，Pandas 使用 `NaN（Not a Number）`来表示缺失或无值。

### 创建

可以使用 pd.Series() 构造函数创建一个 Series 对象，传递一个数据数组（可以是列表、NumPy 数组等）和一个可选的索引数组。

`pandas.Series(data=None, index=None, dtype=None, name=None, copy=False, fastpath=False)`

参数说明：

- data：Series 的数据部分，可以是列表、数组、字典、标量值等。如果不提供此参数，则创建一个空的 Series。
- index：Series 的索引部分，用于对数据进行标记。可以是列表、数组、索引对象等。如果不提供此参数，则创建一个默认的整数索引。
- dtype：指定 Series 的数据类型。可以是 NumPy 的数据类型，例如 np.int64、np.float64 等。如果不提供此参数，则根据数据自动推断数据类型。
- name：Series 的名称，用于标识 Series 对象。如果提供了此参数，则创建的 Series 对象将具有指定的名称。
- copy：是否复制数据。默认为 False，表示不复制数据。如果设置为 True，则复制输入的数据。
- fastpath：是否启用快速路径。默认为 False。启用快速路径可能会在某些情况下提高性能。

```py
import pandas as pd

a = [1, 2, 3, 4]

# 创建 series
myvar = pd.Series(a)
print(myvar)
""" 
output：
0 1
1 2
2 3
3 4
dtype: int64
"""

# 获取多个值
subset = s[1:4]  # 获取索引为1到3的值

# 指定索引
myvar = pd.Series(a, index = ["x", "y", "z"])
print(myvar)
""" 
output：
x 1
y 2
z 3
dtype: object
"""

# 根据索引值读取数据:
print(myvar["y"]) # 2
print(s['x':'z'])  # 返回索引标签 'a' 到 'c' 之间的元素
print(s[:3])  # 返回前三个元素


# 使用字典创建。字典的 key 变成了索引值。
myvar = pd.Series({1: "Google", 2: "Runoob", 3: "Wiki"})
print(myvar)
""" 
output：
1 Google
2 Runoob
3 Wiki
dtype: object
"""

# 设置索引和名称.
sites = {1: "Google", 2: "Runoob", 3: "Wiki"}
# 如果我们只需要字典中的一部分数据，只需要指定需要数据的索引即可
myvar = pd.Series(sites, index = [1, 2], name="RUNOOB-Series-TEST" )
print(myvar)
""" 
output：
1 Google
2 Runoob
Name:RUNOOB-Series-TEST, dtype: object
"""

# 通过赋值给新的索引标签来添加元素
myvar['e'] = 5  # 在 Series 中添加一个新的元素，索引标签为 'e'
```

### 删除

```py
# 使用 del 删除指定索引标签的元素。
del myvar['a']  # 删除索引标签 'a' 对应的元素

# 使用 drop 方法删除一个或多个索引标签，并返回一个新的 Series。
myvar_dropped = myvar.drop(['b'])  # 返回一个删除了索引标签 'b' 的新 Series
```

### 修改

基本运算：

```py
# 算术运算
result = series * 2  # 所有元素乘以2

# 过滤
filtered_series = series[series > 2]  # 选择大于2的元素

# 数学函数
import numpy as np
result = np.sqrt(series)  # 对每个元素取平方根
```

### 查询

计算统计数据：使用 Series 的方法来计算描述性统计。

```py
print(s.sum())  # 输出 Series 的总和
print(s.mean())  # 输出 Series 的平均值
print(s.max())  # 输出 Series 的最大值
print(s.min())  # 输出 Series 的最小值
print(s.std())  # 输出 Series 的标准差
```

属性和方法：

```py
s = pd.Series([1, 2, 3, 4])

# 获取索引
index = s.index # RangeIndex(start=0, stop=4, step=1)

# 获取值数组
values = s.values # [1 2 3 4]

# 获取描述统计信息
stats = s.describe()
""" 
output:
count    4.000000
mean     2.500000
std      1.290994
min      1.000000
25%      1.750000
50%      2.500000
75%      3.250000
max      4.000000
dtype: float64
"""

# 获取最大值和最小值的索引
max_index = s.idxmax() # 3
min_index = s.idxmin() # 0

# 其他属性和方法
print(s.dtype)   # 数据类型。int64
print(s.shape)   # 形状，返回一个元组，包含数组的维度。(4,)
print(s.size)    # 元素个数。4

print(s.head())  # 前几个元素，默认是前 5 个
""" 
output:
0    1
1    2
2    3
3    4
dtype: int64
"""

print(s.tail())  # 后几个元素，默认是后 5 个
""" 
output:
0    1
1    2
2    3
3    4
dtype: int64
"""
```

## DataFrame

特点：

- **二维结构**： DataFrame 是一个二维表格，可以被看作是一个 Excel 电子表格或 SQL 表，具有行和列。可以将其视为多个 Series 对象组成的字典。
- **索引**：DataFrame 可以拥有行索引和列索引，类似于 Excel 中的行号和列标。

### DataFrame--创建

DataFrame 构造方法如下：

`pandas.DataFrame(data=None, index=None, columns=None, dtype=None, copy=False)`

参数说明：

- data：DataFrame 的数据部分，可以是字典、二维数组、Series、DataFrame 或其他可转换为 DataFrame 的对象。如果不提供此参数，则创建一个空的 DataFrame。
- **index：DataFrame 的行索引**，用于标识每行数据。可以是列表、数组、索引对象等。如果不提供此参数，则创建一个默认的整数索引。
- **columns：DataFrame 的列索引**，用于标识每列数据。可以是列表、数组、索引对象等。如果不提供此参数，则创建一个默认的整数索引。
- dtype：指定 DataFrame 的数据类型。可以是 NumPy 的数据类型，例如 np.int64、np.float64 等。如果不提供此参数，则根据数据自动推断数据类型。
- copy：是否复制数据。默认为 False，表示不复制数据。如果设置为 True，则复制输入的数据。

**使用列表创建**:

```py
import pandas as pd

data = [['Google', 10], ['Runoob', 12], ['Wiki', 13]]

# 创建DataFrame
df = pd.DataFrame(data, columns=['Site', 'Age'])

# 使用astype方法设置每列的数据类型
df['Site'] = df['Site'].astype(str)
df['Age'] = df['Age'].astype(float)

print(df)
""" 
     Site   Age
0  Google  10.0
1  Runoob  12.0
2    Wiki  13.0
"""
```

**使用字典创建**:

```py
# 第一种方式，传递字典
data = {'Site':['Google', 'Runoob', 'Wiki'], 'Age':[10, 12, 13]}
df = pd.DataFrame(data)
print (df)

# 第二种方式，传递 list ，list 中的元素使用字典（key/value），其中字典的 key 为列名:
data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}]
df = pd.DataFrame(data)
print (df)
""" 
output：
   a   b     c
0  1   2   NaN
1  5  10  20.0
"""
```

**指定索引值**:

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

df = pd.DataFrame(data, index = ["day1", "day2", "day3"])

print(df)
""" 
output:
      calories  duration
day1       420        50
day2       380        40
day3       390        45
"""
```

**从 Series 创建 DataFrame**：通过 pd.Series() 创建。

```py
s1 = pd.Series(['Alice', 'Bob', 'Charlie'])
s2 = pd.Series([25, 30, 35])
s3 = pd.Series(['New York', 'Los Angeles', 'Chicago'])
df = pd.DataFrame({'Name': s1, 'Age': s2, 'City': s3})
```

### DataFrame--查询

#### 访问行

使用 `loc` 属性返回指定行的数据，如果没有设置索引，第一行索引为 0，第二行索引为 1，以此类推:

注意：返回结果其实就是一个 `Pandas Series` 数据。

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

# 数据载入到 DataFrame 对象
df = pd.DataFrame(data)

# 返回第一行
print(df.loc[0])
# 返回第二行
print(df.loc[1])
""" 
output:

calories    420
duration     50
Name: 0, dtype: int64
calories    380
duration     40
Name: 1, dtype: int64
"""
```

使用 `[[ ... ]]` 格式返回多行数据，`...` 为各行的索引，以逗号隔开,返回结果其实就是一个 `Pandas DataFrame` 数据。

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

# 数据载入到 DataFrame 对象
df = pd.DataFrame(data)

# 返回第一行和第二行
print(df.loc[[0, 1]])

"""
output:
   calories  duration
0       420        50
1       380        40
"""
```

Pandas 可以使用 `loc` 属性返回指定索引对应到某一行:

```py
data = {
  "calories": [420, 380, 390],
  "duration": [50, 40, 45]
}

df = pd.DataFrame(data, index = ["day1", "day2", "day3"])

# 指定索引
print(df.loc["day2"])

"""
output:
calories    380
duration     40
Name: day2, dtype: int64
"""
```

#### 访问列

```py
# 通过列名访问
print(df['Column1'])
print(df.Column1)

# 访问多行
print(df[['Name', 'Age']])  # 提取多列
   
# 通过 .loc[] 访问
print(df.loc[:, 'Column1'])

# 通过 .iloc[] 访问
print(df.iloc[:, 0])  # 假设 'Column1' 是第一列

# 访问单个元素
print(df['Name'][0])
print(df.loc[0, 'Name'])
```

#### DataFrame 的属性和方法

```py
print(df.shape)     # 二维数组的维度。返回一个元组，类似 (2,5)
print(df.columns)   # 列名
print(df.index)     # 索引
print(df.head())    # 前几行数据，默认是前 5 行
print(df.tail())    # 后几行数据，默认是后 5 行
print(df.info())    # 数据信息
print(df.describe())# 描述统计信息
print(df.mean())    # 求平均值
print(df.sum())     # 求和
```

- shape
  - shape 可能不反映 Excel 实际数据的最大行号的原因
    - 如果 Excel 文件尾部有多个全空行（例如文件总行数为 100，但实际数据到第 5 行），`df.shape[0]` 可能远大于实际数据行数。
    - 若通过 `header` 或 `skiprows` 跳过了某些行（例如设置 `header=0` 跳过了标题行），`df.shape[0]` 将不再对应原始 Excel 行号

#### 过滤

使用布尔表达式：根据条件过滤 DataFrame。

```py
# 过滤出 Column1 列大于 2 的行
filter_df = df[df['Column1'] > 2]
```

使用 `isin()`:

```py
# 过滤出 Column1 列为 1 或 2 或 3 的行
filter_df = df[df['Column1'].isin([1, 2, 3])]
```

### DataFrame--修改

```py
# 修改列数据：直接对列进行赋值。
df['Column1'] = [10, 11, 12]

# 添加新列：给新列赋值。
df['NewColumn'] = [100, 200, 300]
```

添加新行：使用 loc 或 concat 方法。

```py
# 使用 loc 为特定索引添加新行
df.loc[3] = [13, 14, 15, 16]
```

`concat()` 方法用于合并两个或多个 `DataFrame`，当你想要添加一行到另一个 `DataFrame` 时，可以将新行作为一个新的 `DataFrame`，然后使用 `concat()`：

```py
# 使用concat添加新行
new_row = pd.DataFrame([[4, 7]], columns=['A', 'B'])  # 创建一个只包含新行的DataFrame
df = pd.concat([df, new_row], ignore_index=True)  # 将新行添加到原始DataFrame

print(df)
```

**修改某一列特定几行元素的值**：

```py
data = {
  "mango": [420, 380, 390],
  "apple": [50, 40, 45],
  "pear": [1, 2, 3],
  "banana": [23, 45,56],
  "type":['Truck','Van','Tram']
}
df = pd.DataFrame(data)

print(df)

# 获取 type 列的值为 Truck 或 Van 的行
array = df.type.isin(['Truck','Van'])
# 修改这些行的 type 列的值为 Car
df.loc[array,'type'] = 'Car'

print(df)
```

#### DataFrame 的合并

合并：使用 `concat` 或 `merge` 方法。

```py
# 纵向合并
pd.concat([df1, df2], ignore_index=True)

# 横向合并
pd.merge(df1, df2, on='Column1')
```

### DataFrame--删除

删除列：使用 drop 方法。

```py
df_dropped = df.drop('Column1', axis=1)
```

删除行：同样使用 drop 方法。

```py
df_dropped = df.drop(0)  # 删除索引为 0 的行
```

## other

使用条件筛选获取特定行和列的值：

- 使用条件筛选获取满足条件的行：`filtered_rows = df[df['column_name'] condition]`
- 使用条件筛选获取满足条件的特定列：`filtered_columns = df.loc[row_index, ['column_name1', 'column_name2']]`

使用位置索引获取特定行和列的值：

- 通过行和列的位置索引获取单个值：`value = df.iloc[row_index, column_index]`
- 通过行的位置索引获取整行数据：`row_data = df.iloc[row_index]`
- 通过列的位置索引获取整列数据：`column_data = df.iloc[:, column_index]`

## Pandas Excel 文件操作

|操作| 方法| 说明|
|--|--|--|
|读取 Excel 文件| pd.read_excel()| 读取 Excel 文件，返回 DataFrame|
|将 DataFrame 写入 Excel|DataFrame.to_excel()| 将 DataFrame 写入 Excel 文件|
|加载 Excel 文件| pd.ExcelFile()| 加载 Excel 文件并访问多个表单|
|使用 ExcelWriter 写多个表单| pd.ExcelWriter()| 写入多个 DataFrame 到同一 Excel 文件的不同表单|
