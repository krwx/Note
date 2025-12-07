# Range

- [Range](#range)
  - [属性](#属性)
    - [Hidden](#hidden)
    - [Row 属性](#row-属性)
    - [Column 属性](#column-属性)
    - [Columns](#columns)
    - [Address](#address)
    - [End](#end)
    - [CurrentRegion 属性](#currentregion-属性)
    - [Offset 属性](#offset-属性)
    - [Resize 属性](#resize-属性)
    - [Interior 属性](#interior-属性)
    - [Borders 属性](#borders-属性)
    - [EntireRow 属性](#entirerow-属性)
    - [MergeCells 属性](#mergecells-属性)
    - [MergeArea 属性](#mergearea-属性)
    - [NumberFormat 属性](#numberformat-属性)
    - [Cells 属性](#cells-属性)
  - [方法](#方法)
    - [Find()](#find)
    - [FindNext()](#findnext)
    - [Copy()](#copy)
    - [PasteSpecial()](#pastespecial)
    - [Insert()](#insert)
    - [Replace()](#replace)
    - [AutoFit()](#autofit)
    - [SpecialCells()](#specialcells)
    - [AutoFilter()](#autofilter)
    - [RemoveDuplicates()](#removeduplicates)
    - [ClearContents](#clearcontents)
    - [Delete](#delete)

## 属性

### Hidden

返回或设置一个 值，它指明是否隐藏**行或列**。

**只有 行 或 列 才能用这个属性。**

```vb
'隐藏 Sheet1 的 C 列。
Worksheets("Sheet1").Columns("C").Hidden = True
```

### Row 属性

返回区域中第一个区域的第一行的行号。 Long 类型，只读。

### Column 属性

返回指定区域中**第一块中的第一列的列号**。 Long 类型，只读。

### Columns

返回一个 `Range` 对象，它表示指定区域中的列。

当应用于作为多区域选择的 `Range` 对象时，此属性仅返回范围的第一个区域的列。 例如，如果 `Range` 对象有两个区域（`A1：B2` 和 `C3：D4`），`Selection.Columns.Count` 则返回 2，而不是 4。

返回的区域可能位于指定区域之外。 例如，`Range("A1:B2").Columns(5).Select` 返回单元格 `E1:E2`。

```vb
'本示例将名为 myRange 的区域第一列中每个单元格的值设置为 0 (零) 。
Range("myRange").Columns(1).Value = 0


'此示例显示 Sheet1 上所选范围内中的列数。 如果选择了多个子区域，此示例将对每一个子区域进行循环。
Public Sub ShowNumberOfColumnsInSheet1Selection
   Worksheets("Sheet1").Activate 
   
   Dim selectedRange As Excel.Range
   Set selectedRange = Selection
   
   Dim areaCount As Long
   areaCount = Selection.Areas.Count 
   
   If areaCount <= 1 Then 
      MsgBox "The selection contains " & _ 
             Selection.Columns.Count & " columns." 
   Else 
      Dim areaIndex As Long
      areaIndex = 1 
      For Each area In Selection.Areas 
         MsgBox "Area " & areaIndex & " of the selection contains " & _ 
                area.Columns.Count & " columns." 
         areaIndex = areaIndex + 1 
      Next 
   End If
End Sub
```

### Address

返回表示使用宏语言的区域引用的 `String` 值。

语法：

`expression.Address (RowAbsolute, ColumnAbsolute, ReferenceStyle, External, RelativeTo)`

`expression` 一个表示 `Range` 对象的变量。

例子：

```vb
Set mc = Worksheets("Sheet1").Cells(1, 1) 
MsgBox mc.Address() ' $A$1 
MsgBox mc.Address(RowAbsolute:=False) ' $A1 
MsgBox mc.Address(ReferenceStyle:=xlR1C1) ' R1C1 
MsgBox mc.Address(ReferenceStyle:=xlR1C1, _ 
 RowAbsolute:=False, _ 
 ColumnAbsolute:=False, _ 
 RelativeTo:=Worksheets(1).Cells(3, 3)) ' R[-2]C[-2]
```

### End

返回一个 `Range` 对象，它表示**包含源范围的区域末尾的单元格**。 相当于按 End+向上键、End+向下键、End+向左键或 End+向右键。 此为只读 `Range` 对象。

语法：`expression.End (Direction)`

Direction 取值： `XlDirection` 枚举

```vb
' 本示例选定包含单元格 B4 的区域中 B 列顶端的单元格。
Range("B4").End(xlUp).Select

' 本示例选定包含单元格 B4 的区域中第 4 行尾端的单元格。
Range("B4").End(xlToRight).Select

' 本示例将选定区域从单元格 B4 延伸至第四行最后一个包含数据的单元格。
Range("B4", Range("B4").End(xlToRight)).Select

Set lastCell = ws.Cells(ws.Rows.Count, ws.Columns.Count).End(xlToLeft)
```

### CurrentRegion 属性

返回一个 代表 当前区域的 `Range` 对象。 当前区域是空白行和空白列的任何组合所限定的区域。 只读。

```vb
' 1. 此示例选择 Sheet1 上的当前区域。
Worksheets("Sheet1").Activate 
ActiveCell.CurrentRegion.Select


' 2. 此示例假定你已在 Sheet1 上具有含标题行的表。 该示例选择表而不选择标题行。 在运行此示例之前，活动单元格必须位于表内。
' Offset 只是区域偏移了，区域的大小还是不变。如果要不选择标题行，需要减小区域的大小，减少一行
Set tbl = ActiveCell.CurrentRegion 
tbl.Offset(1, 0).Resize(tbl.Rows.Count - 1, _ 
 tbl.Columns.Count).Select
```

### Offset 属性

返回一个 `Range` 对象，它表示指定区域以外的一个区域。

语法：`expression.Offset (RowOffset, ColumnOffset)`

- RowOffset
  - 可选
  - 要偏移范围的行数（正、负或 0 (零) ）。 正值表示向下偏移，负值表示向上偏移。
  - 默认值为 0。
- ColumnOffset
  - 可选
  - 要偏移范围的列数（正、负或 0 (零) ）。 正值表示向右偏移，负值表示向左偏移。
  - 默认值为 0。

```vb
Worksheets("Sheet1").Activate 
ActiveCell.Offset(rowOffset:=3, columnOffset:=3).Activate
```

注意：**区域只是偏移了，但是区域的大小是不变的**

### Resize 属性

调整指定区域的大小。 返回一个 `Range` 对象，该对象代表重设大小的区域。

语法：`expression.Resize(RowSize、 ColumnSize)`

- RowSize
  - 可选
  - 新区域中的行数。 如果省略此参数，则区域中的行数保持不变。
- ColumnSize
  - 可选  
  - 新区域中的列数。 如果省略此参数，则区域中的列数保持不变。

```vb
' 此示例调整 Sheet1 中选定区域的大小，使之增加一行和一列。
Worksheets("Sheet1").Activate 
numRows = Selection.Rows.Count 
numColumns = Selection.Columns.Count 
Selection.Resize(numRows + 1, numColumns + 1).Select
```

### Interior 属性

返回一个 `Interior` 对象，表示指定的对象的内部。

### Borders 属性

返回一个 `Borders` 集合，该集合代表样式或单元格区域的边框 (包括定义为条件格式) 一部分的区域。

### EntireRow 属性

返回一个 Range 对象，该对象代表包含指定区域的一行或多行。 此为只读属性。

```vb
' 此示例对包含活动单元格的行中的第一个单元格赋值。
ActiveCell.EntireRow.Cells(1, 1).Value = 5
```

### MergeCells 属性

如果区域内包含合并单元格，此属性的值为 True。 读/写 Variant。

```vb
' 设置包含单元格 A3 的合并区域的值。
Set ma = Range("a3").MergeArea 
If Range("a3").MergeCells Then 
  ma.Cells(1, 1).Value = "42" 
End If
```

### MergeArea 属性

返回一个 Range 对象，该对象代表包含指定单元格的合并区域。

只读 varient。

注意：

- 如果指定的单元格不在合并区域中，则此属性返回指定的单元格。
  - 即如果单元格不是合并的单元格，`MergeArea` 属性返回该单元格本身

```vb
' 设置包含单元格 A3 的合并区域的值。
Set ma = Range("a3").MergeArea 
If ma.Address = "$A$3" Then 
  MsgBox "not merged" 
Else 
  ma.Cells(1, 1).Value = "42" 
End If
```

合并单元格中不是第一个单元格的其他单元格如何获取值：

```vb
ActiveSheet.Cells(RowNumber, ColumnNumber).MergeArea.Cells(1, 1)
```

### NumberFormat 属性

返回或设置一个 Variant 值，它表示对象的格式代码。

如果指定区域中的所有单元格的数字格式不一致，则此属性将返回 Null。

```vb
Worksheets("Sheet1").Range("A17").NumberFormat = "General" 
Worksheets("Sheet1").Rows(1).NumberFormat = "hh:mm:ss" 
Worksheets("Sheet1").Columns("C"). _ 
 NumberFormat = "$#,##0.00_);[Red]($#,##0.00)"
```

设置格式为文本

```vb
Worksheets("Sheet1").Range("A1").NumberFormat = "@" 
```

### Cells 属性

返回一个 `Range` 对象，它表示指定区域中的单元格。

如果使用 `Cells` 但不使用对象限定符，则等效于 `ActiveSheet.Cells`。

## 方法

### Find()

在区域中查找特定信息。

语法：`expression.Find (What, After, LookIn, LookAt, SearchOrder, SearchDirection, MatchCase, MatchByte, SearchFormat)`

`expression` 一个表示 `Range` 对象的变量。

**返回值**：一个 `Range` 对象，它代表在其中找到该信息的第一个单元格。

|名称| 必需/可选| 数据类型| 说明|
|--|--|--|--|
|What| 必需|| 要搜索的数据。 可为字符串或任意 Microsoft Excel 数据类型。|
|After| 可选|| 要在其后开始搜索的单元格。 从用户界面搜索时，这对应于活动单元格的位置。 <br><br> 请注意，After 必须是区域内的单个单元格。 请注意，搜索在此单元格之后开始；在方法回绕到此单元格之前，不会搜索指定的单元格。 <br><br> 如果未指定此参数，搜索将在区域左上角的单元格后面开始。|
|LookIn| 可选|| 搜索什么类型的数据。可以是下列 `XlFindLookIn` 常量之一：`xlFormulas、xlValues、xlComments 或 xlCommentsThreaded。`|
|LookAt| 可选|| 可以是下列 `XlLookAt` 常量之一：`xlWhole 或 xlPart`。<br><br>`xlPart` ：匹配任一部分搜索文本。<br>`xlWhole` ：匹配全部搜索文本。<br><br> 默认是 `xlPart`|
|SearchOrder| 可选|| 可以是以下 `XlSearchOrder` 常量之一：`xlByRows 或 xlByColumns`。|
|SearchDirection| 可选|| 可以是以下 `XlSearchDirection` 常量之一： `xlNext 或 xlPrevious`。|
|MatchCase| 可选|| 如果为 True，则搜索区分大小写。 默认值为 False。|
|MatchByte| 可选|| 仅在选择或安装了双字节语言支持时使用。 如果为 True，则双字节字符仅匹配双字节字符。 如果为 False，则双字节字符匹配其单字节等效字符。|
|SearchFormat| 可选|| 搜索格式。|

- 使用 `FindNext` 和 `FindPrevious` 方法可重复搜索。
- 如果未发现匹配项，此方法返回 `Nothing` 。 Find 方法不会影响所选内容或活动单元格。
- 每次使用此方法时，都会保存 `LookIn、LookAt、SearchOrder` 和 `MatchByte` 的设置。
  - 如果在下次调用此方法时不指定这些参数的值，则使用保存的值。
  - 设置这些参数会更改“查找”对话框中的设置，更改“查找”对话框中的设置会更改省略参数时使用的已保存值。
  - **为避免出现问题，请在每次使用此方法时显式设置这些参数。**

**注意：**

**当搜索到达指定的搜索区域末尾时，它会绕到该区域开头位置。 若要在发生此绕回时停止搜索，请保存第一个找到的单元格的地址，然后针对此保存的地址测试每个连续找到的单元格地址。**

```vb
Public Sub Button12_Click()
    Dim c As Range
    Set c = ActiveSheet.Range("A1:N10").Find(What:="200", LookIn:=xlValues, LookAt:=xlPart)
    
    Dim address As String
    address = c.address
    
    If Not c Is Nothing Then
        Do
            c.Select
            Set c = ActiveSheet.Range("A1:N10").FindNext(c)
        Loop While Not c Is Nothing And c.address <> address
    End If
End Sub
```

例子：

```vb
'此示例在第一个工作表的单元格区域 A1:A500 中查找包含值 2 的所有单元格，并将整个单元格的值更改为 5。 也就是说，值 1234 和 99299 均包含2，并且单元格的值将变为 5。
Sub FindValue()
    
    Dim c As Range
    Dim firstAddress As String

    With Worksheets(1).Range("A1:A500") 
        Set c = .Find(2, lookin:=xlValues) 
        If Not c Is Nothing Then 
            firstAddress = c.Address 
            Do 
                c.Value = 5 
                Set c = .FindNext(c) 
            Loop While Not c Is Nothing
        End If 
    End With
    
End Sub
```

### FindNext()

继续使用 `Find` 方法开始的搜索。 查找匹配相同条件的下一个单元格，并返回表示该单元格的 Range 对象。 该操作不影响选定内容和活动单元格。

语法：

```vb
expression.FindNext (After)
'expression: A variable that represents a Range object.
```

- After
  - 可选
  - 指定一个单元格，查找将从该单元格之后开始。 从用户界面搜索时，这对应于活动单元格的位置。

### Copy()

作用：将区域复制到**指定的区域**或**剪贴板**。

语法：`expression.Copy (Destination)`

参数：

- Destination
  - 可选
  - 指定要将指定区域复制到的新区域。
  - **如果省略此参数，则 Microsoft Excel 会将区域复制到剪贴板。**

例子：

```vb
' 此实例将工作表 Sheet1 上单元格 A1:D4 中的公式复制到工作表 Sheet2 上的单元格 E5:H8 中。
Worksheets("Sheet1").Range("A1:D4").Copy _ 
    destination:=Worksheets("Sheet2").Range("E5:H8")
```

### PasteSpecial()

作用：粘贴已复制到指定区域的 Range 对象。

语法：`expression.PasteSpecial(Paste, Operation, SkipBlanks, Transpose)`

参数：

|名称 |必需/可选| 数据类型 |说明|
|--|--|--|--|
|Paste |可选| `XlPasteType` |要粘贴的区域部分，例如 xlPasteAll 或 xlPasteValues。|
|Operation |可选| `XlPasteSpecialOperation`| 粘贴操作，例如 xlPasteSpecialOperationAdd。|
|SkipBlanks |可选| Variant |如果为 True，则不将剪贴板上区域中的空白单元格粘贴到目标区域中。 默认值为 False。|
|Transpose |可选 |Variant| 如果为 True ，则表示在粘贴区域时转置行和列。 默认值为 False。|

例子：

1、只做粘贴操作

```vb
Range("A1").Copy
Range("B1").PasteSpecial Paste:=xlPasteValues ' 选择性粘贴值
```

2、用 Sheet1 上单元格区域 C1:C5 加上单元格区域 D1:D5 的内容的和来替换单元格区域 D1:D5 中的数据。

```vb
With Worksheets("Sheet1") 
 .Range("C1:C5").Copy 
 .Range("D1:D5").PasteSpecial _ 
  Operation:=xlPasteSpecialOperationAdd 
End With
```

### Insert()

作用：在工作表或宏表中插入一个单元格或单元格区域，其他单元格相应移位以腾出空间。在当前的地方插入。

语法：`expression.Insert(Shift, CopyOrigin)`

参数：

- `Shift`
  - 可选
  - 指定单元格的调整方式。
  - 可以是以下 `XlInsertShiftDirection` 常量之一：
    - `xlShiftToRight`（向右移动单元格）
    - `xlShiftDown`（向下移动单元格）
  - 如果省略此参数，Microsoft Excel 将根据区域的形状确定调整方式。
- `CopyOrigin`
  - 可选
  - 复制源。即从何处复制插入单元格的格式。
  - 可以是以下 `XlInsertFormatOrigin` 常量之一：
    - `xlFormatFromLeftOrAbove` (默认) （从上方和/或左侧单元格复制格式）
    - `xlFormatFromRightOrBelow`（从下方和/或右侧单元格复制格式）

例子：

1、在第二行插入一行，复制第 3 行的格式

```vb
Range("2:2").Insert CopyOrigin:=xlFormatFromRightOrBelow
```

2、复制第二行数据，插入到第五行中，即第五行为第二行的数据

原理：`Copy()` 复制第二行数据到剪贴板，`Insert()` 在检测到剪贴板中有复制内容时，会隐式触发粘贴。这是 VBA 的默认行为，旨在简化插入复制数据的流程。

```vb
ActiveSheet.Rows(2).Copy
ActiveSheet.Rows(5).Insert Shift:=xlDown
```

### Replace()

返回 Boolean ，表示指定区域内是否有要替换的字符，并替换字符。

不会更改 Selection 或 ActiveCell

语法：`expression.Replace (What, Replacement, LookAt, SearchOrder, MatchCase, MatchByte, SearchFormat, ReplaceFormat)`

参数：

- What
  - 必需
  - 希望 Microsoft Excel 搜索的字符串。
- Replacement
  - 必需
  - 替换的字符串。
- LookAt
  - 可选
  - 可以是下列 `XlLookAt` 常量之一： `xlWhole` 或 `xlPart` 。
- SearchOrder
  - 可选
  - 可以是以下 `XlSearchOrder` 常量之一： `xlByRows` 或 `xlByColumns` 。
- MatchCase
  - 可选
  - 如果为 `True` ，则搜索区分大小写。
- MatchByte
  - 可选
  - 仅当已在 Microsoft Excel 中选择或安装双字节语言支持时，才使用此参数。 如果为 True，则双字节字符仅匹配双字节字符。 如果为 False，则双字节字符匹配其单字节等效字符。
- SearchFormat
  - 可选
  - 该方法的搜索格式。
- ReplaceFormat
  - 可选
  - 方法的替换格式。

> 每次使用此方法时，都会保存 LookAt、 SearchOrder、 MatchCase 和 MatchByte 的设置。 如果在下次调用此方法时不指定这些参数的值，则使用保存的值。

```vb
' 此示例会使用三角函数 COS 替换每个函数 SIN。 替换范围是工作表 Sheet1 上的 A 列。
Worksheets("Sheet1").Columns("A").Replace _ 
 What:="SIN", Replacement:="COS", _ 
 SearchOrder:=xlByColumns, MatchCase:=True
```

### AutoFit()

更改区域中的列宽或行高以达到最佳匹配。

`Range` 对象必须是行或行范围，或者列或列范围;否则，此方法将生成错误。

```vb
' 本示例调整工作表 Sheet1 中从 A 到 I 的列，以获得最适当的列宽。
Worksheets("Sheet1").Columns("A:I").AutoFit


' 本示例调整工作表 Sheet1 上从 A 到 E 的列，以获得最适当的列宽，但该调整仅依据单元格区域 A1:E1 中的内容进行。
Worksheets("Sheet1").Range("A1:E1").Columns.AutoFit
```

### SpecialCells()

返回一个 Range 对象，该对象代表与指定类型和值匹配的所有单元格。

语法：`expression.SpecialCells (Type, Value)`

- Type
  - 必需
  - 数据类型： `XlCellType`
  - 要包含的单元格。
- Value
  - 可选
  - 数据类型： `Variant`
  - 如果 Type 是 `xlCellTypeConstants` 或 `xlCellTypeFormulas` ，则此参数用于确定结果中要包含的单元格类型。 将这些值相加可返回多种类型的单元格。 默认情况下，将选择所有常量或公式，无论类型如何。

```vb
' 本示例选定工作表 Sheet1 中已用区域的最后一个单元格。
Worksheets("Sheet1").Activate 
ActiveSheet.Cells.SpecialCells(xlCellTypeLastCell).Activate
```

### AutoFilter()

通过 `AutoFilter` 筛选列表。

语法：`expression.AutoFilter (Field, Criteria1, Operator, Criteria2, SubField, VisibleDropDown)`

如果忽略全部参数，此方法仅在指定区域切换自动筛选下拉箭头的显示。

参数：

- Field
  - 可选 Variant
  - 相对于作为筛选基准字段（从列表左侧开始，最左侧的字段为第一个字段）的字段的整型偏移量。
- Criteria1
  - 可选 Variant
  - 条件（字符串；例如，“101”）。 使用 "=" 查找空白字段，使用 "<>" 查找非空白字段，使用 "><" 选择数据类型中的（否数据）字段。
  - 如果此参数被省略，条件为“全部”。 如果 Operator 是 xlTop10Items，则 Criteria1 指定项数（例如“10”）。
- Operator
  - 可选 XlAutoFilterOperator
  - 一个指定筛选器类型的 XlAutoFilterOperator 常量。
- Criteria2
  - 可选 Variant
  - 第二个条件（字符串）。 与 Criteria1 和 Operator 一起组合成复合筛选条件。 也用作日期字段的单一条件（按日、月或年筛选）。 后跟一个数组，该数组用于详述和筛选 Array(Level, Date)。 其中，Level 为 0-2（年、月、日），Date 为筛选期内的一个有效日期。
- SubField
  - 可选 Variant
  - 对其应用条件的数据类型中的字段（例如，来自地理位置的“人口”字段或来自股票的“交易量”字段）。 省略此值目标是“（显示值）”。
- VisibleDropDown
  - 可选 Variant
  - 如果为 True，则显示已筛选字段的 AutoFilter 下拉箭头。 如果为 False，则隐藏已筛选字段的 AutoFilter 下拉箭头。 默认情况下为 True。

### RemoveDuplicates()

从值区域中删除重复的值。

语法：`expression.RemoveDuplicates(Columns, Header)`

注意：

- 以行为单位去删除
- 判断重复的标准：判断 Columns 的那几列是不是都有重复的数据
  - 假如只有 1 列，那么就看这一列有没有重复的数据
  - 假如有 A、B 两列，那么看 A 列的重复数据的那几行，B 列的数据是否也重复。重复就删除

参数：

- Columns
  - 必需 Variant
  - 包含重复信息的列的**索引数组**。
- Header
  - 可选 XlYesNoGuess
  - 指定第一行是否包含标题信息。
  - xlNo 是默认值；如果希望 Excel 确定标题，则指定 xlGuess。

```vb
' 下面的代码示例删除前 2 列的重复项。
ActiveSheet.Range("A1:C100").RemoveDuplicates Columns:=Array(1,2), Header:=xlYes
```

### ClearContents

清理区域中的公式和值.

语法：`expression.ClearContents`

`expression` 一个表示 `Range` 对象的变量。

例子：清除工作表 1 上单元格 A1:G37 中的公式和值，但单元格格式和条件格式保留不变。

```vb
Worksheets("Sheet1").Range("A1:G37").ClearContents
```

### Delete

删除对象。

语法：`expression.Delete`

```vb
ActiveSheet.Rows(10).Delete
```
