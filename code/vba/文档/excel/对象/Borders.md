# Borders

`Borders` 对象为四个 `Border` 对象的集合

使用 `Borders(index)`（其中 index 标识边框）返回单个 `Border` 对象。

`Index` 可以是 `XlBordersIndex` 常量之一：`xlDiagonalDown、 xlDiagonalUp、 xlEdgeBottom、 xlEdgeLeft、 xlEdgeRight、 xlEdgeTop、 xlInsideHorizontal 或 xlInsideVertical`。

```vb
' 下例向第一张工作表上的单元格 A1 添加双边框。
Worksheets(1).Range("A1").Borders.LineStyle = xlDouble

' 下例将单元格区域 A1:G1 的底部边框颜色设置为红色。
Worksheets("Sheet1").Range("A1:G1").Borders(xlEdgeBottom).Color = RGB(255, 0, 0)
```
