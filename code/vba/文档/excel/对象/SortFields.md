# SortFields

`SortFields` 集合是 `SortField` 对象的集合。 开发人员可以使用该集合存储工作簿、列表和自动筛选的排序状态。

## 方法

### Add 方法

创建新的排序字段，并返回一个 SortFields 对象。

语法：`expression.Add (Key, SortOn, Order, CustomOrder, DataOption)`

- Key
  - 必需  
  - 数据类型为 Region ，即 key 可以是一个区域的值。例如，可以以某一列的数据作为 key
  - 指定用于排序的键值。
- SortOn
  - 可选  
  - 要进行排序的字段。
- Order
  - 可选  
  - 指定排序次序。
- CustomOrder
  - 可选  
  - 指定是否应使用自定义排序次序。
- DataOption
  - 可选  
  - 指定数据选项。

```vb
' 本示例按 Column1 按升序对表（Sheet1 上的 Table1）进行排序。

' 先调用 Clear 方法，以确保清除上一个排序，以便可以应用新排序。
ActiveWorkbook.Worksheets("Sheet1").ListObjects("Table1").Sort.SortFields.Clear

' 添加 SortField
ActiveWorkbook.Worksheets("Sheet1").ListObjects("Table1").Sort.SortFields.Add _
 Key:=Range("Table1[[#All],[Column1]]"), _
 SortOn:=xlSortOnValues, _
 Order:=xlAscending, _
 DataOption:=xlSortNormal

' 调用 Sort 对象以将添加的排序应用于 Table1。
With ActiveWorkbook.Worksheets("Sheet1").ListObjects("Table1").Sort
 .Header = xlYes
 .MatchCase = False
 .Orientation = xlTopToBottom
 .SortMethod = xlPinYin
 .Apply
End With
```

### Clear 方法

清除所有 SortFields 对象。

```vb
' 清除当前 sheet 页的 filter
ActiveSheet.Sort.SortFields.Clear
```
