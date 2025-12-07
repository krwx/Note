# openpyxl

- [openpyxl](#openpyxl)
  - [简单使用](#简单使用)
    - [workbook](#workbook)
      - [save()](#save)
    - [sheet](#sheet)
      - [worksheet 属性](#worksheet-属性)
    - [dimension](#dimension)
    - [单元格](#单元格)
      - [MergedCell](#mergedcell)
      - [fill](#fill)
        - [PatternFill](#patternfill)
  - [富文本](#富文本)
    - [创建富文本](#创建富文本)
    - [设置富文本](#设置富文本)
    - [修改富文本](#修改富文本)
    - [读取.xlsx文件、获取富文本信息](#读取xlsx文件获取富文本信息)
    - [处理 TextBlock 的文本为空格](#处理-textblock-的文本为空格)

## 简单使用

### workbook

创建空的 workbook

```py
from openpyxl import Workbook

new_workbook = Workbook()

# 保存
new_workbook.save(path)
```

加载 workbook。路径为完整的路径

```py
from openpyxl import load_workbook

# 正常加载，单元格的值为字符串
convert_workbook = load_workbook(entry.path)

# 加载富文本
convert_workbook = load_workbook(entry.path, rich_text=True)
```

#### save()

作用：保存 workbook

语法：`workbook.save(filename)`

- filename 的参数类型为 `StrPath | IO[bytes]`。即可以将 workbook 保存为实际路径的 excel 文件或将 workbook 保存到 IO 中

### sheet

获取所有 sheet 的名称：

```py
name_list = new_workbook.sheetnames
```

判断是否有某个 sheet：

```py
if "Sheet" in new_workbook.sheetnames:
    pass
```

创建 sheet：

```py
new_workbook.create_sheet(title="sheet1")
```

移除 sheet：

```py
# 创建的空 workbook 的 sheet 的名字默认为 “Sheet”
new_workbook.remove(new_workbook["Sheet"])
```

获取 sheet：

```py
sheet = new_workbook["Sheet"]
```

获取 sheet 的名称：

```py
for sheet in workbook:
    print(sheet.title)
```

判断 sheet 是否隐藏：

```py
sheet = new_workbook["Sheet"]
if sheet.sheet_state == "hidden":
    pass
```

修改 sheet 表的名称：

```py
sheet.title = "sheetUpdate"
```

获取行数和列数：

```py
rows = sheet.max_row
columns = sheet.max_column
```

获取当前 active 的 sheet：

```py
sheet = temp_workbook.active
```

遍历 sheet：

```py
for sheet in workbook:
    print(sheet.title)
```

#### worksheet 属性

- “enableFormatConditionsCalculation”
- “filterMode”
- “published”
- “syncHorizontal”
- “syncRef”
- “syncVertical”
- “transitionEvaluation”
- “transitionEntry”
- “tabColor”

设置 `tab` 名的颜色

```py
wb = Workbook()
ws = wb.active

wsprops = ws.sheet_properties
wsprops.tabColor = "1072BA"
```

### dimension

Worksheet 有 row_dimensions 和 column_dimensions 两个属性

- row_dimensions
  - hidden
  - height
- column_dimensions
  - hidden
  - auto_size
  - width

```py
for row in range(1, 10):
    print(sheet.row_dimensions[row].hidden)
    print(sheet.column_dimensions[row].hidden)

print(sheet.column_dimensions['A'].width)
```

### 单元格

获取和修改单个单元格

```py
from openpyxl import Workbook
wb = Workbook()
ws = wb.active

cell = ws["a6"]  # 通过坐标获取
cell2 = ws.cell(1, 2)  # 通过行列下标获取


# 直接修改某个单元格的值
ws["a5"] = 666  
ws['A3'] = datetime.datetime.now().strftime("%Y-%m-%d")  # 修改为时间类型
ws.append([1, 2, 3]) # 在最下面新增一行追加一个或多个值


# 先获取单元格对象然后再进行修改
cell = ws["a6"]
cell.value = 777
print(cell, cell.value)  # 输出：<Cell 'Sheet'.A6> 777

cell2 = ws.cell(6, 1)  # 第6行第1列，即A6
print(cell2, cell2.value)  # 输出：<Cell 'Sheet'.A6> 777


# 单元格坐标信息
print(c.coordinate)  # 单元格坐标，例如A6
print(c.column_letter)  # 单元格列名，例如A
print(c.column)  # 单元列下标，例如1
print(c.row)  # 单元格所在行，例如6
```

获取多个单元格，返回元组

```py
from openpyxl import Workbook
wb = Workbook()
ws = wb.active

i = 1
for x in range(1, 11):
    for y in range(1, 21):
        ws.cell(row=x, column=y, value=i)
        i += 1

row_cells = ws[2]  # 选取第2行（下标从1开始）
print(row_cells)  # 输出：(A2, B2, C2, D2, E2, F2, G2, H2, I2, J2, K2, L2, M2, N2, O2, P2, Q2, R2, S2, T2)

col_cells = ws["b"]  # 选取B列
print(col_cells)  # 输出：(B1, B2, B3, B4, B5, B6, B7, B8, B9, B10)

row_range_cells = ws[2:5]  # 选取2、3、4、5共4行
print(row_range_cells)  # 输出：
# ((A2, B2, C2, D2, E2, F2, G2, H2, I2, J2, K2, L2, M2, N2, O2, P2, Q2, R2, S2, T2),
# (A3, B3, C3, D3, E3, F3, G3, H3, I3, J3, K3, L3, M3, N3, O3, P3, Q3, R3, S3, T3),
# (A4, B4, C4, D4, E4, F4, G4, H4, I4, J4, K4, L4, M4, N4, O4, P4, Q4, R4, S4, T4),
# (A5, B5, C5, D5, E5, F5, G5, H5, I5, J5, K5, L5, M5, N5, O5, P5, Q5, R5, S5, T5))

col_range_cells = ws["B:D"]  # 选取B、C、D共3列
print(col_range_cells)  # 输出：
# ((B1, B2, B3, B4, B5, B6, B7, B8, B9, B10),
# (C1, C2, C3, C4, C5, C6, C7, C8, C9, C10),
# (D1, D2, D3, D4, D5, D6, D7, D8, D9, D10))

range_cells = ws["c3:f6"]  # 选取 C3到F6区域共16个元素
print(range_cells)  # 输出：
# ((C3, D3, E3, F3),
# (C4, D4, E4, F4),
# (C5, D5, E5, F5),
# (C6, D6, E6, F6))
```

通过 `iter_rows` 或 `iter_cols` 取值:

`iter_rows()` 与 `iter_cols()` 都可以指定最大最小的行列，下标从1开始

```py
cells = ws.iter_rows(min_row=1, max_row=3, min_col=2, max_col=5)
for cell in cells:
    print(cell)
# 输出：
# (B1, C1, D1, E1)
# (B2, C2, D2, E2)
# (B3, C3, D3, E3)

cells = ws.iter_cols(min_row=1, max_row=3, min_col=2, max_col=5)
for cell in cells:
    print(cell)
# 输出：
# (B1, B2, B3)
# (C1, C2, C3)
# (D1, D2, D3)
# (E1, E2, E3)
```

也可以使用 `rows` 或 `columns` 属性遍历全部行或列， `values` 属性取出所有值，它们都得到迭代器，但是注意只读模式下 `columns` 属性无效

```py
for cell in ws.rows:
    print(cell)

for cell in ws.columns:
    print(cell)

for row in ws.values:
    for value in row:
        print(value)
```

合并单元格，会保留最左上角的单元格的数据和样式，其他单元格会被清空，即使取消合并。即，合并之后只保留左上角第一个单元格的数据和样式

```py
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
i = 1
for x in range(1, 11):
    for y in range(1, 21):
        ws.cell(row=x, column=y, value=i)
        i += 1

print(ws["C2"].value)  # 输出：23
ws.merge_cells("A1:F3")
ws.unmerge_cells("A1:F3")
print(ws["C2"].value)  # 输出：None
# 等同于下面的代码
# ws.merge_cells(start_row=1, start_column=1, end_row=3, end_column=6)
# ws.unmerge_cells(start_row=1, start_column=1, end_row=3, end_column=6)
```

删除或插入行列

- `.insert_cols(idx=数字编号, amount=要插入的列数)`
- `.insert_rows(idx=数字编号, amount=要插入的行数)`
- `.delete_rows(idx=数字编号, amount=要删除的行数)`
- `.delete_cols(idx=数字编号, amount=要删除的列数)`

插入或删除后对源 workbook 不会有影响，需要 save 成另一个 workbook 才看到改变。但是取单元格的值是改变后的值

```py
from openpyxl import Workbook

wb = Workbook()
ws = wb.active

ws.insert_cols(5)  # 在第5列即E列插入1列，原来的E列及后面的列都往后移动
ws.insert_rows(2, 3)  # 在第2行后面插入3行

ws.delete_cols(2, 3)  # 从2列开始往后删除3列
ws.delete_rows(5, 3)  # 从5行开始往后删除3行
```

可以使用 `move_range()` 移动指定范围的单元格，但是注意，如果移动到的位置原来有数据会被覆盖掉，移动之后公式会丢失，可以通过设置 `translate=True` 来更新，默认是 `False`

- `.move_range("数据区域",rows=,cols=)`：
  - 正整数为向下或向右、负整数为向左或向上

```py
from openpyxl import Workbook
wb = Workbook()
ws = wb.active

ws.move_range("B1:D3", rows=6, cols=-1, translate=False)  # 移动单元格，向下移动6行，向左移动1列
```

#### MergedCell

合并单元格不能修改 `value` 属性，`value` 属性是只读的，且值为 `None`

例子：

判断单元格是否为合并单元格：

```py
from openpyxl.cell import MergedCell

print(isinstance(cell, MergedCell))
```

从当前单元格找到区域最左上的单元格（原理：遍历 Worksheet.merged_cells.ranges 属性，判断当前单元格的坐标是否在 range 里面）：

```py
if isinstance(cell, MergedCell):
    for mergecell in sheet.merged_cells.ranges:
        if cell.coordinate in mergecell:
            cell = sheet.cell(mergecell.min_row, mergecell.min_col)
            break
```

复制 sheet，根据 source sheet 的 merge cell，merge dest sheet 的对应 cell

```py
for merged_range in source_sheet.merged_cells.ranges:
        dest_sheet.merge_cells(
            start_row=merged_range.min_row, start_column=merged_range.min_col, end_row=merged_range.max_row,
            end_column=merged_range.max_col
        )
```

#### fill

fill 属性用于设置单元格的填充属性，值为 `PatternFill` 对象或 `GradientFill` 对象

##### PatternFill

`PatternFill` 语法：

`PatternFill(patternType=None, fgColor=Color(), bgColor=Color(), fill_type=None, start_color=None, end_color=None)`

参数说明：

- patternType
  - 填充模式，常用值：
    - "solid"（纯色）
    - "lightGrid"（网格）
    - "darkHorizontal"（水平条纹）
- fgColor
  - 前景色：网格线/条纹的颜色（纯色填充时即实际颜色）
  - 支持格式：
    - 颜色常量 colors.RED
    - HEX字符串 "FF0000"
- bgColor
  - 背景色：仅对网格/条纹类填充生效（纯色填充时无效）
  - 格式同 fgColor
- fill_type
  - 兼容参数，不使用。相当于 patternType
- start_color
  - 兼容参数，不使用。相当于 fgColor
- end_color
  - 兼容参数，不使用。相当于 bgColor

例子：

```py
from openpyxl import Workbook
from openpyxl.styles import PatternFill, colors

# 创建工作簿和工作表
wb = Workbook()
ws = wb.active

# 1. 纯色填充（红色）
solid_red = PatternFill(
    patternType="solid",  # 填充类型：纯色
    fgColor=colors.RED    # 前景色（纯色填充时实际颜色）
)
ws["A1"].value = "Solid Red"
ws["A1"].fill = solid_red

# 2. 网格填充（黄色前景+蓝色背景）
grid_fill = PatternFill(
    patternType="lightGrid",  # 填充类型：浅色网格
    fgColor="FFFF00",        # 网格线颜色（黄色）
    bgColor="0000FF"         # 背景色（蓝色）
)
ws["B1"].value = "Light Grid"
ws["B1"].fill = grid_fill

# 3. 水平条纹填充（绿色）
hatch_fill = PatternFill(
    patternType="darkHorizontal",  # 填充类型：深色水平条纹
    fgColor="00FF00"              # 条纹颜色（绿色）
)
ws["C1"].value = "Horizontal Stripes"
ws["C1"].fill = hatch_fill

# 保存文件
wb.save("pattern_fill_demo.xlsx")
```

## 富文本

通常来说，一个单元格的样式是一样的，如果要自定义单元格内部分文本的样式，就要用到富文本。

### 创建富文本

- `CellRichText` 对象可以包含 **未格式化文本** 和 `TextBlock`对象 的混合
  - 值不能包含空字符串或空格
- `TextBlock` 对象包含内联字体样式和要按此格式格式化的文本。
- `CellRichText` 对象继承 list，可以当作 list 使用
- `CellRichText` 对象在将元素呈现为字符串或保存文件时不会在元素之间添加空格。

创建 `TextBlock` 对象

```py
from openpyxl.cell.text import InlineFont
from openpyxl.cell.rich_text import TextBlock, CellRichText

# 传递多个参数创建
rich_string1 = CellRichText(
   'This is a test ',
   TextBlock(InlineFont(b=True), 'xxx'),
  'yyy'
)

# 使用 list 创建
red = InlineFont(color='00FF0000')
rich_string1 = CellRichText(['When the color ', TextBlock(red, 'red'), ' is used, you can expect ', TextBlock(red, 'danger')])
```

创建 `InlineFont` 对象

```py
inline_font = InlineFont(rFont='Calibri', # Font name
                         sz=22,           # in 1/144 in. (1/2 point) units, must be integer
                         charset=None,    # character set (0 to 255), less required with UTF-8
                         family=None,     # Font family
                         b=True,          # Bold (True/False)
                         i=None,          # Italics (True/False)
                         strike=None,     # strikethrough
                         outline=None,
                         shadow=None,
                         condense=None,
                         extend=None,
                         color=None,
                         u=None,
                         vertAlign=None,
                         scheme=None,
                         )
```

使用 `InlineFont` 对象。

```py
big = InlineFont(sz="30.0")
medium = InlineFont(sz="20.0")
small = InlineFont(sz="10.0")
bold = InlineFont(b=True)
b = TextBlock

rich_string2 = CellRichText(
      b(big, 'M'),
      b(medium, 'i'),
      b(small, 'x'),
      b(medium, 'e'),
      b(big, 'd')
)
```

获取 `CellRichText` 对象的文本：

```py
rich_string1 = CellRichText(
   'This is a test ',
   TextBlock(InlineFont(b=True), 'xxx'),
  'yyy'
)
text = str(rich_string1) # output: This is a test xxxyyy
```

### 设置富文本

直接赋值给单元格

```py
from openpyxl import Workbook
wb = Workbook()
ws = wb.active
ws['A1'] = rich_string1
ws['A2'] = 'Simple string'
ws.cell(1,3).value = rich_string2
```

### 修改富文本

```py
l = rich_string1.as_list()
print(l)
# output: ['When the color ', 'red', ' is used, you can expect ', 'danger']

print(l.index("danger"))
#output: 3

# 更改 TextBlock 对象的文本
rich_string1[3].text = "fun"
print(str(rich_string1))
# output: 'When the color red is used, you can expect fun'
```

拼接两个富文本。将两个富文本对象解构，传递到 CellRichText 构造函数构造新的富文本对象。

```py
rich_string1 = CellRichText("This is a test ", TextBlock(InlineFont(b=True), "abc"), " yyy")
rich_string2 = CellRichText("This is a test ", TextBlock(InlineFont(b=True), "xxx"), " yyy")

rich_string3 = CellRichText(*rich_string1, "--->(", *rich_string2, ")<---")
```

### 读取.xlsx文件、获取富文本信息

```py
import openpyxl
from openpyxl import load_workbook
from openpyxl.cell.rich_text import TextBlock, CellRichText

filePath = 'you Xlsx file path'

# 打开文件的时候启用富文本，否则读取的是str类型
workbook = load_workbook(filename=filePath, rich_text=True)

sheet1 = workbook[workbook.sheetnames[0]]

# 遍历所有单元格
for row in sheet1.iter_rows():
    for cell in row :
        # 找到带有富文本的单元格
        if isinstance(cell.value, CellRichText) :
        	# 遍历富文本所有元素，包含TextBlock、str
            for e in cell.value :
                if isinstance(e, TextBlock) ：
                    # 输出富文本的字体信息，包括字体、大小、颜色等等
                	print(e.font)
```

### 处理 TextBlock 的文本为空格

当读取 .xlsx 文件，出现 `TextBlock` 的文本为空格并且设置了格式的情况时，如果将这个 `CellRichText` 对象赋值给新的 Workbook 的其中一个单元格，保存并打开这个 Workbook 会提示错误。

出现错误的原因猜测是 openpyxl 保存 Workbook 时没有对有格式的空格处理正确，导致 excel 识别不了。(可以解压 xlsx 文件，查看 xml 文件)

可以通过移除掉有格式的空格解决：

```py
# remove blank space
if isinstance(cell_value, CellRichText):
    transform_list = list(
        filter(lambda x: isinstance(x, str) or (isinstance(x, TextBlock) and x.text != " "), cell_value)
    )
    cell_value = CellRichText(transform_list)
```
