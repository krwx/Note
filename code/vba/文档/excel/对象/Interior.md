# Interior

代表一个对象的内部。

## 属性

### Color 属性

返回或设置 单元格底纹的颜色或图形对象的填充颜色。

应用：**可以用于设置单元格的背景色**

```vb
ActiveCell.Interior.Color = vbYellow
```

### ColorIndex 属性

返回或设置一个 Variant 值，它代表内部颜色。

`ColorIndex` 的值可指定为当前调色板中颜色的索引值，也可指定为下列 `XlColorIndex` 常量之一：`xlColorIndexAutomatic` 或 `xlColorIndexNone`。

```vb
ActiveCell.Interior.ColorIndex = 3
```
