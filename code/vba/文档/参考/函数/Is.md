# Is

- [Is](#is)
  - [IsMissing 函数](#ismissing-函数)
  - [IsNumeric 函数](#isnumeric-函数)
  - [IsEmpty 函数](#isempty-函数)
  - [IsNull 函数](#isnull-函数)
  - [IsArray 函数](#isarray-函数)
  - [IsError 函数](#iserror-函数)
  - [IsDate 函数](#isdate-函数)

## IsMissing 函数

返回一个 布尔 值，该值指示是否已将可选的 `Variant` 参数 传递给 过程。

## IsNumeric 函数

返回指示表达式是否可评估为数值的`Boolean`值。

- 如果整个表达式 被识别为数字，则“IsNumeric”返回“True”，否则，返回“False”。
- 如果表达式 是数据表达式，则“IsNumeric”返回“False”。

```vb
Dim MyVar, MyCheck
MyVar = "53"    ' Assign value.
MyCheck = IsNumeric(MyVar)    ' Returns True.

MyVar = "459.95"    ' Assign value.
MyCheck = IsNumeric(MyVar)    ' Returns True.

MyVar = "45 Help"    ' Assign value.
MyCheck = IsNumeric(MyVar)    ' Returns False.
```

## IsEmpty 函数

语法：`IsEmpty (expression)`

`IsEmpty` 在变量未初始化或显式设置为 Empty 时返回 True；否则，返回 False。

如果 `expression` 包含多个变量，则始终返回 False。

例子，判断单元格是否为空：

```vb
Sub CheckIfCellIsEmpty()
    If IsEmpty(Range("A1").Value) Then
        MsgBox "单元格A1为空"
    Else
        MsgBox "单元格A1不为空"
    End If
End Sub
```

## IsNull 函数

返回指示表达式是否包含无效数据 (Null) 的 Boolean 值。

个人理解：就是判断是否为 `Null`

## IsArray 函数

返回指示变量 是否是数组的 `Boolean` 值。

```vb
Dim MyArray(1 To 5) As Integer, YourArray, MyCheck    ' Declare array variables.
YourArray = Array(1, 2, 3)    ' Use Array function.
MyCheck = IsArray(MyArray)    ' Returns True.
MyCheck = IsArray(YourArray)    ' Returns True.
```

## IsError 函数

返回一个 Boolean 值，指示表达式是否为错误值。

检查 Function 返回的是否为错误值：

```vb
Dim ReturnVal, MyCheck
ReturnVal = UserFunction()
MyCheck = IsError(ReturnVal)    ' Returns True.
```

## IsDate 函数

如果表达式是日期或可识别为有效日期或时间，则返回 True ；否则，它将返回 False 。

```vb
Dim MyVar, MyCheck
MyVar = "04/28/2014"    ' Assign valid date value.
MyCheck = IsDate(MyVar)    ' Returns True.

MyVar = "April 28, 2014"    ' Assign valid date value.
MyCheck = IsDate(MyVar)    ' Returns True.

MyVar = "13/32/2014"    ' Assign invalid date value.
MyCheck = IsDate(MyVar)    ' Returns False.

MyVar = "04.28.14"    ' Assign valid time value.
MyCheck = IsDate(MyVar)    ' Returns True.

MyVar = "04.28.2014"    ' Assign invalid time value.
MyCheck = IsDate(MyVar)    ' Returns False.
```
