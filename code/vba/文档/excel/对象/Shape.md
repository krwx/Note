# Shape

- [Shape](#shape)
  - [介绍](#介绍)
  - [属性](#属性)
    - [Type](#type)
  - [方法](#方法)
    - [Delete()](#delete)

## 介绍

代表绘图层中的对象，例如自选图形、任意多边形、OLE 对象或图片。

`Shape` 对象是 `Shapes` 集合的成员。 `Shapes` 集合包含某个工作簿中的所有形状。

下例将 `myDocument` 中的第一个形状和名为 “Rectangle 1” 的形状进行水平翻转。

```VB
Set myDocument = Worksheets(1) 
myDocument.Shapes(1).Flip msoFlipHorizontal 
myDocument.Shapes("Rectangle 1").Flip msoFlipHorizontal
```

## 属性

### Type

返回或设置表示形状类型的 `MsoShapeType` 值。

```vb
Debug.Print(ActiveSheet.Shapes(1).Type)
```

## 方法

### Delete()

删除该 Shape 对象

例子：

1、仅删除图片

```vb
Sub DeleteOnlyPictures()
    Dim shp As Shape
    Dim ws As Worksheet
    
    Set ws = ActiveSheet ' 或指定工作表：ThisWorkbook.Sheets("Sheet1")
    
    ' 从后往前遍历（避免删除时索引变化）
    For i = ws.Shapes.Count To 1 Step -1
        Set shp = ws.Shapes(i)
        ' 检查对象类型：msoPicture=13, msoLinkedPicture=11
        If shp.Type = msoPicture Or shp.Type = msoLinkedPicture Then
            shp.Delete
        End If
    Next i
End Sub
```

2、删除指定名称的形状

```vb
Sub DeleteSpecificPicture()
    Dim picName As String
    picName = "Picture 1" ' 替换为实际图片名称
    
    On Error Resume Next
    ActiveSheet.Shapes(picName).Delete
    On Error GoTo 0
End Sub
```

> 要删除 Shapes 的所有形状只能遍历去删除，Shapes 没有提供 Delete()
