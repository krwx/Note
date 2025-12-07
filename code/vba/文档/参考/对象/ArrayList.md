# ArrayList

`ArrayList` 与内置的 `Collection` 对象类似，但提供了更丰富的功能，包括排序、数组转换、删除所有元素项目等。

然而， `ArrayList` 不是 `VBA` 内置的对象，需要添加对 `mscorlib.dll` 库的引用

注意：**ArrayList 中的下标从0开始，最后一个元素的下标为其元素数量减1。**

- [ArrayList](#arraylist)
  - [定义](#定义)
  - [数量](#数量)
  - [添加元素](#添加元素)
  - [遍历](#遍历)
  - [反转](#反转)
  - [排序](#排序)
  - [克隆](#克隆)
  - [复制ArrayList到数组](#复制arraylist到数组)
  - [删除](#删除)
  - [查找](#查找)

## 定义

```vb
Dim alCol As New ArrayList

Dim alCol As ArrayList
Set alCol = New ArrayList

Dim alCol As Object
Set alCol = CreateObject("System.Collections.ArrayList")
```

## 数量

Count 属性

```vb
Dim alCol As ArrayList
Set alCol = New ArrayList

Debug.Print alCol.Count
```

## 添加元素

使用 Add

```vb
Sub testAdd()
    Dim alCol As Object
    Set alCol =CreateObject("System.Collections.ArrayList")

    alCol.Add "1l"
    alCol.Add "22"

    Debug.Print alCol(0) ' print 11
End Sub
```

使用 Insert 方法在指定位置插入元素：

```vb
Sub testAdd()
    Dim alCol As Object
    Set alCol =CreateObject("System.Collections.ArrayList")

    alCol.Add "1l"
    alCol.Add "22"

    alCol.Insert 0, "Office"

    Debug.Print alCol(0) ' print Office
End Sub
```

## 遍历

```vb
Sub testAdd()
    Dim alCol As Object
    Set alCol = CreateObject("System.Collections.ArrayList")

    alCol.Add "1l"
    alCol.Add "22"

    alCol.Insert 0, "Office"

    ' 使用For循环
    For i = 0 To alCol.Count - 1
        Debug.Print alCol(i)
    Next i

    ' 使用For Each循环
    For Each item In alCol
        Debug.Print item
    Next item
End Sub
```

## 反转

使用 `Reverse` 方法

```vb
Sub testAdd()
    Dim alCol As Object
    Set alCol =CreateObject("System.Collections.ArrayList")

    alCol.Add "1l"
    alCol.Add "22"

    alCol.Reverse
End Sub
```

## 排序

`Sort` 方法对 `ArrayList` 按**升序**排列：

```vb
Sub testSort()
    Dim alCol As Object
    Set alCol = CreateObject("System.Collections.ArrayList")
    alCol.Add "3"
    alCol.Add "1"

    '排序
    alCol.Sort
    Debug.Print "升序排列"
    DebugPrint alCol
End Sub

Sub DebugPrint(alColl As Object)
    Dim i As Long
    For i = 0 To alColl.Count - 1
        Debug.Print alColl(i)
    Next i
End Sub
```

`Sort` 方法之后，再使用 `Reverse` 方法，将按照降序排列:

```vb
Sub testSort()
    Dim alCol As Object
    Set alCol = CreateObject("System.Collections.ArrayList")
    alCol.Add "3"
    alCol.Add "1"

    '排序
    alCol.Sort
    alCol.Reverse
    Debug.Print "降序排列"
    DebugPrint alCol
End Sub
```

## 克隆

使用 `Clone` 方法可以创建 `ArrayList` 的全新副本：

```vb
Sub testClone()
    Dim alColl1 As Object
    Set alColl1 = CreateObject("System.Collections.ArrayList")

    '添加元素
    alColl1.Add "11"
    alColl1.Add "22"
    alColl1.Add "33"

    '创建副本
    Dim alColl2 As Object
    Set alColl2 = alColl1.Clone
    '删除
    alColl1.Clear

    Debug.Print "alColl1包含元素:"
    DebugPrint alColl1
    Debug.Print "alColl2包含元素:"
    DebugPrint alColl2
End Sub

Sub DebugPrint(alColl As Object)
    Dim i As Long
    For i = 0 To alColl.Count - 1
        Debug.Print alColl(i)
    Next i
End Sub
```

## 复制ArrayList到数组

`ToArray` 方法可以将 `ArrayList` 复制到数组：

```vb
Sub testClone()
    Dim alColl As Object
    Set alColl = CreateObject("System.Collections.ArrayList")

    '添加元素
    alColl.Add "11"
    alColl.Add "22"
    alColl.Add "33"

    '复制
    Dim arr As Variant
    arr = alColl.ToArray

    '打印
    Debug.Print "打印数组元素:"
    DebugPrintArray arr
End Sub

Sub DebugPrintArray(arr As Variant)
    Dim i As Long
    For i = LBound(arr) To UBound(arr)
        Debug.Print arr(i)
    Next i
End Sub
```

## 删除

数据全部清空

```vb
Dim alCol As Object
Set alCol = CreateObject("System.Collections.ArrayList")
alColl.Clear
```

删除方式一：

```vb
' 其中，item必须是存在的，否则删除无效，且无错误。
Dim alCol As Object
Set alCol = CreateObject("System.Collections.ArrayList")
alCol.Remove item
```

删除方式二

```vb
' 其中，index必须存在，否则出错
Dim alCol As Object
Set alCol = CreateObject("System.Collections.ArrayList")
alCol.removeAt index
```

## 查找

使用 `Contains`

```vb
Private Sub Command5_Click()
    Dim alCol As Object
    Set alCol = CreateObject("System.Collections.ArrayList")
    alCol.Add "11"

    Dim sItem As String
    sItem = "11"
    
    Dim s As String
    s = IIf(AL.Contains(sItem), "数据存在", "数据不存在")
    MsgBox sItem & "查找结果：" & vbCrLf & s
End Sub
```
