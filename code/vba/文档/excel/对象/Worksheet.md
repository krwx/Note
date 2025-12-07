# Worksheet

- [Worksheet](#worksheet)
  - [属性](#属性)
    - [UsedRange 属性](#usedrange-属性)
    - [Sort 属性](#sort-属性)
    - [Name 属性](#name-属性)
    - [AutoFilterMode 属性](#autofiltermode-属性)
    - [FilterMode 属性](#filtermode-属性)
    - [ProtectContents 属性](#protectcontents-属性)
    - [Visible 属性](#visible-属性)
  - [方法](#方法)
    - [Delete](#delete)
    - [Move](#move)
    - [ShowAllData](#showalldata)
    - [Protect 方法](#protect-方法)
    - [Unprotect 方法](#unprotect-方法)
  - [事件](#事件)
    - [Change](#change)
    - [SelectionChange](#selectionchange)
    - [BeforeRightClick](#beforerightclick)

## 属性

### UsedRange 属性

返回一个 `Range` 对象，该对象代表**指定工作表上使用的区域**。 此为只读属性。

例子：`ActiveSheet.UsedRange.Select`

### Sort 属性

返回 Sort 对象。 此为只读属性。

### Name 属性

返回 sheet 的名字，即 tab name

### AutoFilterMode 属性

如果当前在工作表上显示有“**自动筛选”下拉箭头**，则该值为 True。 读/写 Boolean。

本属性与 FilterMode 属性互相独立。

如果当前显示下拉箭头，则此属性返回 True。 可以将该属性设置为 False 以删除箭头，但不能将其设置为 True。

```vb
Debug.Print ActiveSheet.AutoFilterMode
```

### FilterMode 属性

如果工作表处于筛选模式，则为 True。 **只读 Boolean**。

疑问：筛选模式是什么样？

### ProtectContents 属性

如果工作表内容是受保护的，则为 True。只读 Boolean。

若要启用内容保护，请使用 `Protect` 方法，并将 `Contents` 参数设置为 `True` （默认为 True）。

```vb
' 如果 sheet1 的内容处于保护状态，则此示例显示一个消息框。
If Worksheets("Sheet1").ProtectContents = True Then 
 MsgBox "The contents of Sheet1 are protected." 
End If
```

### Visible 属性

返回或设置一个 `XlSheetVisibility` 值，该值确定对象是否可见。

```vb
' 本示例隐藏 Sheet1。
Worksheets("Sheet1").Visible = False

' 本示例将 Sheet1 设置为可见。
Worksheets("Sheet1").Visible = True
```

## 方法

### Delete

删除调用该方法的 Sheet

例子：删除当前的 Sheet：

```vb
ActiveSheet.Delete
```

> 删除 `Worksheet` 对象时，此方法将显示一个对话框，提示用户确认删除。 默认显示此对话框。 在 Worksheet 对象上调用时，如果用户在对话框中选择“取消”，则 Delete 方法将返回一个布尔值，该布尔值为 False;如果用户选择“删除”，则返回 True。
>
> 要删除工作表但不显示对话框，请将 `Application.DisplayAlerts` 属性设置为 `False`。

### Move

将工作表移到工作簿中的其他位置。

语法：`expression.Move (Before, After)`

如果既不指定 `Before` 也不指定 `After` ，`Microsoft Excel` 将新建一个工作簿，其中包含所移动的工作表。

```vb
' 此示例将当前活动工作簿的 Sheet1 移到 Sheet3 之后。
Worksheets("Sheet1").Move after:=Worksheets("Sheet3")
```

### ShowAllData

使当前筛选列表的所有行均可见。 如果正在使用自动筛选，则本方法将下拉列表框内容改为“（全部）”。

注意：**只能在包含使用 `AutoFilter` 命令筛选的列表的工作表上运行**。

```vb
Worksheets("Sheet1").ShowAllData
```

### Protect 方法

保护工作表使其不被修改。

语法：`expression.Protect (Password, DrawingObjects, Contents, Scenarios, UserInterfaceOnly, AllowFormattingCells, AllowFormattingColumns, AllowFormattingRows, AllowInsertingColumns, AllowInsertingRows, AllowInsertingHyperlinks, AllowDeletingColumns, AllowDeletingRows, AllowSorting, AllowFiltering, AllowUsingPivotTables)`

```vb
ActiveSheet.Protect
```

### Unprotect 方法

去除工作表或工作簿中的保护。 如果工作表或工作簿不是受保护的，则此方法不起作用。

语法：`expression.Unprotect (Password)`

- Password
  - 可选 Variant
  - 一个字符串，指定用于解除工作表或工作簿保护的密码，此密码是区分大小写的。
  - 如果工作表或工作簿不设密码保护，则省略此参数。
  - 如果对**工作表**省略此参数，而该工作表又设有密码保护，Microsoft Excel 将提示您输入密码。
  - 如果对**工作簿**省略此参数，而该工作簿又设有密码保护，则该方法将失效.

```vb
ActiveSheet.Unprotect
```

## 事件

### Change

当用户**更改工作表中的单元格**，或外部链接引起单元格的更改时发生此事件。

语法：

```vb
Private Sub Worksheet_Change(ByVal Target as Range) 
    ...
End Sub
```

`Target` 是必需的。是 `Range` 数据类型，代表更改的区域，可以是多个单元格。

以下代码示例将更改的单元格的颜色设为蓝色。

```vb
Private Sub Worksheet_Change(ByVal Target as Range) 
    Target.Font.ColorIndex = 5 
End Sub
```

### SelectionChange

当工作表上的**选定区域发生改变时**发生此事件。

本示例滚动工作簿窗口，直至选定区域位于窗口的左上角。

```vb
Private Sub Worksheet_SelectionChange(ByVal Target As Range) 
 With ActiveWindow 
 .ScrollRow = Target.Row 
 .ScrollColumn = Target.Column 
 End With 
End Sub
```

### BeforeRightClick

右键单击工作表时发生此事件，此事件先于默认的右键单击操作。

语法：

```vb
Private Sub Worksheet_BeforeRightClick(ByVal Target As Range, Cancel As Boolean)
...
End Sub
```

参数：

|名称 |必需/可选| 数据类型| 说明|
|--|--|--|--|
|Target| 必需| 区域| 右键单击发生时最靠近鼠标指针的单元格。|
|Cancel| 必需| Boolean| 默认为 False 。 如果在 Sub 里面将此参数设为 True，则在 Sub 结束后，不执行默认的右击单击操作。|

此示例为 B1:B10 单元格添加新的快捷菜单项。

```vb
Private Sub Worksheet_BeforeRightClick(ByVal Target As Range, Cancel As Boolean) 
  Dim icbc As Object 
  For Each icbc In Application.CommandBars("cell").Controls 
    If icbc.Tag = "brccm" Then icbc.Delete 
  Next icbc
  If Not Application.Intersect(Target, Range("b1:b10")) Is Nothing Then 
    With Application.CommandBars("cell").Controls.Add(Type:=msoControlButton, before:=6, temporary:=True) 
      .Caption = "New Context Menu Item" 
      .OnAction = "MyMacro" 
      .Tag = "brccm" 
    End With 
  End If
End Sub
```
