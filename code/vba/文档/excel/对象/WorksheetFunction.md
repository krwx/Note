# WorksheetFunction

- [WorksheetFunction](#worksheetfunction)
  - [方法](#方法)
    - [Count 方法](#count-方法)
    - [CountA 方法](#counta-方法)
    - [Match 方法](#match-方法)

## 方法

### Count 方法

计算**包含数字的单元格的个数**，以及参数列表中的数字的个数。

```vb
public double Count (object Arg1, object Arg2, object Arg3)
```

### CountA 方法

计算**非空单元格**及参数列表中值的个数。

使用 `CountA` 对区域或数组中**包含数据的单元格数**进行计数。

```vb
public double CountA (object Arg1, object Arg2, object Arg3)
```

### Match 方法

返回在指定方式下**与指定数值匹配的数组中元素的相应位置**。

如果需要某个项在某个范围中的位置而不是项本身，请使用 `Match` 而不是 `LookUp` 函数之一。

注意：**返回的是位置**

MATCH 函数的返回值是一个整数，表示查找值在数组或区域中的位置。

语法：`Application.WorksheetFunction.Match (Arg1, Arg2, Arg3)`

- Arg1
  - 必需
  - Lookup_value：用于在表中查找所需值的值。
- Arg2
  - 必需
  - Lookup_array：包含可能查找值的连续单元格区域。
  - **Lookup_array 必须为数组或数组引用**。
- Arg3
  - 可选
  - Match_type：数字 -1、0 或 1。
  - Match_type 指明 Microsoft Excel 如何将 lookup_value 与 lookup_array 中的值进行匹配。

例子：

```vb
Sub ExactMatchExample()
    Dim employees As Range
    Dim lookupValue As String
    Dim result As Variant
    
    ' 设置查找范围
    Set employees = Worksheets("Sheet1").Range("A1:A10")
    
    ' 设置要查找的员工姓名
    lookupValue = "John"
    
    ' 使用MATCH函数进行精确匹配
    result = Application.WorksheetFunction.Match(lookupValue, employees, 0)
    If Not IsError(result) Then
        MsgBox "员工 " & lookupValue & " 在列表中的位置是 " & result
    Else
        MsgBox "未找到匹配项。"
    End If
End Sub
```
