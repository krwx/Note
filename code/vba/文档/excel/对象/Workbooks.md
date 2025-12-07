# Workbooks

当前在 `Microsoft Excel` 应用程序中打开的所有 `Workbook` 对象的集合。

## 方法

### Add 方法

新建一个工作表。 新工作表将成为活动工作表。

返回值：表示新工作簿的 `Workbook` 对象。

```vb
Dim TEMP_WB As Workbook
Set TEMP_WB = Workbooks.Add
```

### Open 方法

打开一个工作簿。返回表示打开的工作簿的 Workbook 对象。

语法: `Workbooks.Open (FileName、UpdateLinks、ReadOnly、Format、Password、WriteResPassword、IgnoreReadOnlyRecommended、Origin、Delimiter、Editable、Notify、Converter、AddToMru、Local、CorruptLoad)`

例子：

```vb
Workbooks.Open "ANALYSIS.XLS" 
```

Open 的工作簿会变成 ActiveWorkbook
