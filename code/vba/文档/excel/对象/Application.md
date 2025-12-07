# Application

- [Application](#application)
  - [属性](#属性)
    - [Selection](#selection)
    - [WorksheetFunction 属性](#worksheetfunction-属性)
    - [ScreenUpdating](#screenupdating)
    - [StatusBar 属性](#statusbar-属性)
    - [Cursor 属性](#cursor-属性)
  - [方法](#方法)
    - [InputBox](#inputbox)
    - [Run 方法](#run-方法)

## 属性

有用的属性：

- ActiveCell
  - 活动单元格
- ActiveChart
  - 活动图表工作表
- ActiveSheet
  - 活动表
- ActiveWindow
  - 活动窗口
- ActiveWorkbook
  - 活动工作簿
- Selection
  - 被选中的对象。可以是 Range 对象、Shape 对象、ChartObject 对象
- ThisWorkbook
  - 包含了正被执行的 VBA 过程的工作簿。该对象和 ActiveWorkbook 对象可能一样也可能不一样

### Selection

- Selection.value：值
- Selection.count：数量
- Selection.Areas：选中对象的区域
- Selection.Clear：清空选中区域

### WorksheetFunction 属性

返回 `WorksheetFunction` 对象。 此为只读属性。

### ScreenUpdating

如果屏幕更新已启用，此属性的值为 True。 读/写 Boolean。

**禁用屏幕更新可以加快宏代码的速度**。 这样将看不到宏的执行过程，但宏的执行速度加快了。当宏结束运行后，请记住将 ScreenUpdating 属性设置回 True。

```vb
Application.ScreenUpdating = False
' 执行耗时会影响屏幕的操作
Application.ScreenUpdating = True
```

### StatusBar 属性

返回或设置状态栏中的文字。 读/写 String。

```vb
' 将状态栏文字设为“Please be patient...”
Application.StatusBar = "Please be patient..." 
```

### Cursor 属性

返回或设置 Microsoft Excel 中鼠标指针的外观。 可读/写 `XlMousePointer`。

`XlMousePointer` 可以是以下常量之一：

- xlDefault。 默认指针。
- xlIBeam。 I 形指针。
- xlNorthwestArrow。 西北向箭头指针。
- xlWait。 沙漏型指针。

注意：**当宏停止运行时，`Cursor` 属性不会自动重设。 在宏停止运行前，应将指针重设为 `xlDefault` 。**

```vb
Application.Cursor = xlDefault 
```

## 方法

### InputBox

显示用于用户输入的对话框。 返回在对话框中输入的信息。

语法：`expression.InputBox (Prompt, Title, Default, Left, Top, HelpFile, HelpContextID, Type)`

- 对话框中有“确认”按钮和“取消”按钮。
  - 如果选择“确认”按钮，InputBox 返回在对话框中输入的值。
  - **如果选择“取消”按钮，InputBox 返回 False**。

- Prompt
  - 必需
  - String
  - 要在对话框中显示的消息。 此参数可以是字符串、数字、日期或布尔值（在消息显示前，Microsoft Excel 会自动将此值强制转换为 String ）。
  - 最大长度为 255 个字符，否则不会出现提示，应用程序的方法将立即返回错误 2015。
- Title
  - 可选
  - Variant
  - 输入框的标题。 如果省略此参数，则默认标题为“输入”。
- Default
  - 可选
  - Variant
  - 指定在对话框最初显示时文本框中显示的值。 如果省略此参数，即表示将文本框留空。 此值可以是 Range 对象。
- Left
  - 可选
  - Variant
  - 指定对话框相对于屏幕左上角的 X 坐标（以磅为单位）。
- Top
  - 可选
  - Variant
  - 指定对话框相对于屏幕左上角的 Y 坐标（以磅为单位）。
- HelpFile（少用）
  - 可选
  - Variant
  - 此输入框使用的帮助文件名。 如果有 HelpFile 和 HelpContextID 参数，对话框中会显示帮助按钮。
- HelpContextID（少用）
  - 可选
  - Variant
  - HelpFile 中帮助主题的上下文 ID 号。
- Type（重点）
  - 可选
  - Variant
  - **指定返回的数据类型**。 如果省略此参数，则对话框返回文本。

下表列出了可以在 Type 参数中传递的值。 可以是一个值，也可以将多个值相加。 例如，对于可接受文本和数字的输入框，将 Type 设置为 1 + 2。

|值| 说明|
|--|--|
|0| 公式|
|1| 数字|
|2| 文本（字符串）|
|4| 逻辑值（True 或 False）|
|8| Range 对象形式的单元格引用|
|16| 错误值，如 #N/A|
|64| 数值数组|

如果 Type 为 8，InputBox 返回 Range 对象。 必须使用 Set 语句，将结果分配给 Range 对象，如下面的示例所示。

```VB
Set myRange = Application.InputBox(prompt := "Sample", type := 8)
```

如果不使用 Set 语句，此变量就会被设置为区域中的值，而不是 Range 对象本身。

```vb
' 此示例提示用户在 Sheet1 中选择单元格。 此示例使用 Type 参数，以确保返回值是有效的单元格引用（Range 对象）。
Worksheets("Sheet1").Activate 
Set myCell = Application.InputBox( _ 
    prompt:="Select a cell", Type:=8)


' 此示例使用 InputBox，允许用户选择要传递给用户定义的函数“MyFunction”的区域，这将乘以区域中的三个值并返回结果。
Sub Cbm_Value_Select()
   'Set up the variables.
   Dim rng As Range
   
   'Use the InputBox dialog to set the range for MyFunction, with some simple error handling.
   Set rng = Application.InputBox("Range:", Type:=8)
   If rng.Cells.Count <> 3 Then
     MsgBox "Length, width and height are needed -" & _
         vbLf & "please select three cells!"
      Exit Sub
   End If
   
   'Call MyFunction by value using the active cell.
   ActiveCell.Value = MyFunction(rng)
End Sub

Function MyFunction(rng As Range) As Double
   MyFunction = rng(1) * rng(2) * rng(3)
End Function
```

### Run 方法

运行一个宏或者调用一个函数。 该方法可用于运行用 Visual Basic 或 Microsoft Excel 宏语言编写的宏。

语法：`Application.Run VBAPath`

```vb
Application.Run "RPA15_VBA.xlsb!COSU_LC"
```
