# 输入/输出

- [输入/输出](#输入输出)
  - [读取数据](#读取数据)
  - [pandas.read\_excel](#pandasread_excel)
  - [pandas.json\_normalize](#pandasjson_normalize)
  - [pandas.read\_sql\_query](#pandasread_sql_query)
  - [pandas.DataFrame.to\_excel](#pandasdataframeto_excel)

## 读取数据

|函数|说明|
|--|--|
|pd.read_csv(filename)|读取 CSV 文件；|
|pd.read_excel(filename)|读取 Excel 文件；|
|pd.read_sql(query, connection_object)|从 SQL 数据库读取数据；|
|pd.read_json(json_string)|从 JSON 字符串或 JSON 文件中读取数据；|
|pd.read_html(url)|从 HTML 页面中读取数据。|
|pd.json_normalize(data)|将半结构化 JSON 数据规范化为 DataFrame。|

```py
import pandas as pd

# 从 CSV 文件中读取数据
df = pd.read_csv('data.csv')

# 从 Excel 文件中读取数据
df = pd.read_excel('data.xlsx')

# 从 SQL 数据库中读取数据
import sqlite3
conn = sqlite3.connect('database.db')
df = pd.read_sql('SELECT * FROM table_name', conn)

# 从 JSON 字符串中读取数据
json_string = '{"name": "John", "age": 30, "city": "New York"}'
df = pd.read_json(json_string)

# 从 HTML 页面中读取数据
url = 'https://www.runoob.com'
dfs = pd.read_html(url)
df = dfs[0] # 选择第一个数据框
```

## pandas.read_excel

`pd.read_excel()` 方法用于从 Excel 文件中读取数据并加载为 `DataFrame`。它支持读取 `.xls` 和 `.xlsx` 格式的文件。

**1、语法**

`pandas.read_excel(io, sheet_name=0, *, header=0, names=None, index_col=None, usecols=None, dtype=None, engine=None, converters=None, true_values=None, false_values=None, skiprows=None, nrows=None, na_values=None, keep_default_na=True, na_filter=True, verbose=False, parse_dates=False, date_parser=<no_default>, date_format=None, thousands=None, decimal='.', comment=None, skipfooter=0, storage_options=None, dtype_backend=<no_default>, engine_kwargs=None)`

**2、参数说明**

- `io`：这是必需的参数，指定了要读取的 Excel 文件的路径或文件对象。
  - 数据类型：`str, ExcelFile, xlrd.Book, path object, or file-like object`
  - 任何有效的字符串路径都可以接受。字符串可以是 URL。
  - 如果要传入路径对象，pandas 接受任何 `os.PathLike`。
  - 如果要传入“文件类对象”，指的是具有 `read()` 方法的对象，例如文件句柄或 `StringIO`。
- `sheet_name`：
  - 指定要读取的工作表名称或索引。
  - 默认为 `0`，即第一个工作表。
  - `1`：第二个工作表作为 DataFrame
  - `"Sheet1"`：加载名为“Sheet1”的工作表
  - `[0, 1, "Sheet5"]`：加载第一个、第二个和名为“Sheet5”的工作表，作为 DataFrame 字典
  - `None`：返回一个包含每个工作表 DataFrame 的字典。
- `header`: `int`, `list of int`, `default` `0`
  - 指定用作列名的行。
  - 默认为 `0`，即第一行。
  - 如果传递一个整数列表，则将使用这些行作为多级列索引。
  - 如果没有标题行，请使用 `None`。
- names=None：用于指定列名的列表。如果提供，将覆盖文件中的列名。
- index_col=None：指定用作行索引的列。可以是列的名称或数字。
- usecols=None：指定要读取的列。可以是列名的列表或列索引的列表。
- dtype=None：指定列的数据类型。可以是字典格式，键为列名，值为数据类型。
- engine=None：指定解析引擎。默认为None，pandas 会自动选择。
- converters=None：用于转换数据的函数字典。
- true_values=None：指定应该被视为布尔值True的值。
- false_values=None：指定应该被视为布尔值False的值。
- skiprows=None：指定要跳过的行数或要跳过的行的列表。
- nrows=None：指定要读取的行数。
- `na_values=None`
  - 除了默认的值，额外的应该被视为缺失值的值。
  - 数据类型：`str, list-like, or dict, default None`
  - 如果传递了 `dict`，则指定每列的 `NA` 值。
  - 默认值：`'', '#N/A', '#N/A N/A', '#NA', '-1.#IND', '-1.#QNAN', '-NaN', '-nan', '1.#IND', '1.#QNAN', '<NA>', 'N/A', 'NA', 'NULL', 'NaN', 'n/a', 'nan', 'null'`
- `keep_default_na=True`
  - 指定是否要将默认的缺失值（例如NaN）解析为 `NA`。
  - 与 `na_values` 的关系
    - `keep_default_na` 为 `True`
      - `na_values` 不为 `None`，则将默认的缺失值和 `na_values` 解析为 NA 值
      - `na_values` 为 `None`，则只解析默认的缺失值
    - `keep_default_na` 为 `False`
      - `na_values` 不为 `None`，则只解析 `na_values` 里面的值
      - `na_values` 为 `None`，不解析
  - 如果 `na_filter` 为 `False`，则不会解析，会忽略掉 `keep_default_na` 和 `na_values`
- `na_filter=True`
  - 指定是否要将数据转换为NA。
  - 设置为 `False` 则不转换。在能确保数据没有 `N/A` 时使用能提高性能
- verbose=False：指定是否要输出详细的进度信息。
- parse_dates=False：指定是否要解析日期。
- `date_parser=<no_default>`：用于解析日期的函数。
- date_format=None：指定日期的格式。
- thousands=None：指定千位分隔符。
- decimal='.'：指定小数点字符。
- comment=None：指定注释字符。
- skipfooter=0：指定要跳过的文件末尾的行数。
- storage_options=None：用于云存储的参数字典。
- `dtype_backend=<no_default>`：指定数据类型后端。
- engine_kwargs=None：传递给引擎的额外参数字典。

**3、示例**

3.1、如果 data.xlsx 文件中有多个表单，可以通过指定 `sheet_name` 来读取特定表单的数据

```py
import pandas as pd

# 读取默认的第一个表单
df = pd.read_excel('data.xlsx')

# 读取指定表单的内容（表单名称）
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# 读取多个表单，返回一个字典
dfs = pd.read_excel('data.xlsx', sheet_name=['Sheet1', 'Sheet2'])

# 自定义列名并跳过前两行
df = pd.read_excel('data.xlsx', header=None, names=['A', 'B', 'C'], skiprows=2)
print(df)
```

3.2、读取 api 接口中的 excel 文件

```py
import pandas as pd
import io

def post(request):
    # 获取上传的文件
    file = request.FILES['file']
    
    # 读取 Excel 文件
    content = file.read()
    df = pd.read_excel(io.BytesIO(content))
    
    # 处理 DataFrame（例如，打印内容）
    print(df)
    
    return HttpResponse("文件已处理")
```

3.2、读取 excel 文件的所有工作表

返回的结果的类型是一个字典，键是工作表的名称，值是对应的 DataFrame。

```py
import pandas as pd

df = pd.read_excel('data.xlsx', sheet_name=None)
print(df)
"""
{
  "Sheet1": some DataFrame,
  "Sheet2": some DataFrame,
}
"""
```

## pandas.json_normalize

将半结构化 JSON 数据规范化为 DataFrame。

> 与 `read_json()` 不同，`read_json` 是读取 **json 文件**，将读取的数据转换为 DataFrame；而 `json_normalize` 是将 **json 数据**规范化为 DataFrame。

**1、语法**

`pandas.json_normalize(data, record_path=None, meta=None, meta_prefix=None, record_prefix=None, errors='raise', sep='.', max_level=None)`

**2、参数**

- `data`: `dict`, `dicts` 列表, 或 `dicts` 的 `Series`
  - 未序列化的 JSON 对象。

返回值：

- DataFrame
  - 规范化后的数据，表示为 pandas DataFrame。

**3、示例**

1、简单使用

```py
>>> data = [
...     {"id": 1, "name": {"first": "Coleen", "last": "Volk"}},
...     {"name": {"given": "Mark", "family": "Regner"}},
...     {"id": 2, "name": "Faye Raker"},
... ]
>>> pd.json_normalize(data)
    id name.first name.last name.given name.family        name
0  1.0     Coleen      Volk        NaN         NaN         NaN
1  NaN        NaN       NaN       Mark      Regner         NaN
2  2.0        NaN       NaN        NaN         NaN  Faye Raker
```

## pandas.read_sql_query

将 SQL 查询读取到 DataFrame 中。

返回一个与查询字符串结果集对应的 DataFrame。

**1、语法**

`pandas.read_sql_query(sql, con, index_col=None, coerce_float=True, params=None, parse_dates=None, chunksize=None, dtype=None, dtype_backend=<no_default>)`

**2、参数**

- `sql`: `str SQL` 查询或 `SQLAlchemy Selectable` (select 或 text 对象)
  - 要执行的 SQL 查询。
- `con`: `SQLAlchemy connectable`, `str`, 或 `sqlite3` 连接
  - 数据库连接对象或数据库 URI 字符串。
  - 使用 `SQLAlchemy` 可以使用该库支持的任何数据库。
  - 如果是一个 DBAPI2 对象，则只支持 `sqlite3`。

**3、示例**

```py
>>> from sqlalchemy import create_engine
>>> engine = create_engine("sqlite:///database.db")
>>> sql_query = "SELECT int_column FROM test_data"
>>> with engine.connect() as conn, conn.begin():
...     data = pd.read_sql_query(sql_query, conn)
```

## pandas.DataFrame.to_excel

`to_excel()` 方法用于将 DataFrame 写入 Excel 文件，支持 `.xls` 和 `.xlsx` 格式。

指定目标文件名来将单个对象写入 `Excel` `.xlsx` 文件。  
要写入多个工作表，需要创建一个 `ExcelWriter` 对象并指定目标文件名，然后在文件中指定要写入的工作表。

**1、语法**

`DataFrame.to_excel(excel_writer, *, sheet_name='Sheet1', na_rep='', float_format=None, columns=None, header=True, index=True, index_label=None, startrow=0, startcol=0, engine=None, merge_cells=True, inf_rep='inf', freeze_panes=None, storage_options=None, engine_kwargs=None, autofilter=False)`

**2、参数**

- `excel_writer`：
  - 文件路径或 现有的 `ExcelWriter` 对象。
- `sheet_name`: `str`，默认为 `‘Sheet1’`
  - 指定写入的工作表名称。
- na_rep=''：指定在 Excel 文件中表示缺失值（NaN）的字符串，默认为空字符串。
- float_format=None：指定浮点数的格式。如果为 None，则使用 Excel 的默认格式。
- columns=None：指定要写入的列。如果为 None，则写入所有列。
- header=True：指定是否写入列名作为第一行。如果为 False，则不写入列名。
- `index`: `bool`，默认 True
  - 指定是否写入索引作为第一列。
  - 如果为 `False`，则不写入索引。
- `index_label`: 指定索引列的标签。如果为 None，则不写入索引标签。
- `startrow`: 指定开始写入的行号，默认从第0行开始。
- `startcol`: 指定开始写入的列号，默认从第0列开始。
- `engine`: `str`，可选
  - 指定写入 Excel 文件时使用的引擎，默认为 None，pandas 会自动选择。
  - 可选 `‘openpyxl’` 或 `‘xlsxwriter’`。
- `merge_cells`: 指定是否合并单元格。如果为 True，则合并具有相同值的单元格。
- `inf_rep`: 指定在 Excel 文件中表示无穷大值的字符串，默认为 'inf'。
- `freeze_panes`: 指定冻结窗格的位置。如果为 None，则不冻结窗格。
- `storage_options`: 用于云存储的参数字典。
- `engine_kwargs`: 传递给引擎的额外参数字典。

**3、示例**

3.1、创建、写入和保存工作簿

```py
>>> df1 = pd.DataFrame(
...     [["a", "b"], ["c", "d"]],
...     index=["row 1", "row 2"],
...     columns=["col 1", "col 2"],
... )
>>> df1.to_excel("output.xlsx")
```

3.2、指定工作表名称

```py
>>> df1.to_excel("output.xlsx", sheet_name="MySheet")
```

3.3、写入数据到工作簿中的多个工作表，则必须指定一个 `ExcelWriter` 对象

```py
>>> df2 = df1.copy()
>>> with pd.ExcelWriter("output.xlsx") as writer:
...     df1.to_excel(writer, sheet_name="Sheet_name_1")
...     df2.to_excel(writer, sheet_name="Sheet_name_2")
```

3.4、也可通过 `ExcelWriter` 追加数据到现有的 Excel 文件

```py
>>> with pd.ExcelWriter("output.xlsx", mode="a") as writer:
...     df1.to_excel(writer, sheet_name="Sheet_name_3")
```
