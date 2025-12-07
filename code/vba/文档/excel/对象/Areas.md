# Areas

由选定区域内的多个子区域或连续单元格块组成的集合。

- 没有单数 Area 对象;
- Areas 集合的各个成员是 Range 对象。
- 在 Areas 集合中，选定区域内每个离散的连续单元格区域都有一个 Range 对象。
- 如果选定区域内只有一个子区域，则 Areas 集合包含一个与该选定区域对应的 Range 对象。
- 某些操作不能在选定区域内的多个子区域上同时执行；必须在选定区域内的单个子区域上循环，对每个单独的子区域分别执行该操作。

## 属性

### Count

返回一个 Long 值，它代表集合中对象的数量。

```vb
'此示例显示 Sheet1 上所选范围内中的列数。 代码还将检测选定区域中是否包含多个子区域；如果包含，则对多重选定区域中每个子区域进行循环。
Sub DisplayColumnCount() 
 Dim iAreaCount As Integer 
 Dim i As Integer 
 
 Worksheets("Sheet1").Activate 
 iAreaCount = Selection.Areas.Count 
 
 If iAreaCount <= 1 Then 
 MsgBox "The selection contains " & Selection.Columns.Count & " columns." 
 Else 
 For i = 1 To iAreaCount 
 MsgBox "Area " & i & " of the selection contains " & _ 
 Selection.Areas(i).Columns.Count & " columns." 
 Next i 
 End If 
End Sub
```
