# tip

- [tip](#tip)
  - [small tip](#small-tip)
  - [macro 跑得慢的原因](#macro-跑得慢的原因)
  - [搜索的字符串不在 FindNext() 返回的结果内](#搜索的字符串不在-findnext-返回的结果内)
  - [使用 Replace() 后，单元格的值自动有中划线](#使用-replace-后单元格的值自动有中划线)

## small tip

1. 数据类型不会自动转换。
   1. 假如一个数据为 Long 型，那么不能将它计算后的值赋值给 Integer 型的数据
2. 遍历单元格时，要判断是否有隐藏行或隐藏列
3. 创建 mapping 时，确认名字是否前后有空格
4. 二维数组怎么放在 `Range` 对象里面。通过 `Value` 属性实现
   1. `ActiveSheet.Range("A1:D4").Value = DataArr`
5. `ActiveSheet.Columns("A").Value` 是一个二维数组
6. 运行 `FX` 里面的 `sub` ：`Application.Run "RATES_2019.xlsb![sub name]"`
7. `Mod_GetLocalPath.bas` 里面的 Sub 可以获取当前文件的实际路径，而不是 `one drive` 的 `http` 路径
8. 获取 `Range` 对象时记得要用 `Set` ，不然就获取了 `Range` 的 `Value`
9. 合并的单元格：除了第一个单元格，其他单元格都是没有值的
10. 单元格显示 "000" 字符串：
    1. 在前面加上 "'" 单引号，`"'" & "000"`
    2. 设置单元格格式为文本：`.Range("A1").NumberFormat = "@"`
11. 复制行
    1. `PFXS.Rows(FXRow).Copy PFXS.Rows(FXRow + 1)`

## macro 跑得慢的原因

- 太多单元格的操作
- tab 中有很多图片，然后对单元格进行操作也会变慢

## 搜索的字符串不在 FindNext() 返回的结果内

每次使用 Find() 时，都会保存 `LookIn、LookAt、SearchOrder` 和 `MatchByte` 的设置。如果在下次调用此方法时不指定这些参数的值，则使用保存的值。

因为 FindNext() 它是用 Find() 保存的值，假如现在再找 "abc"，但是中途调用 Find() 找了 "123"，那么再调用 FindNext() 就会变成找 "123"

```vb
With Sht
    Dim FindCell
    Set FindCell = .UsedRange.Find("abc", LookAt:=xlWhole)
    If FindCell Is Nothing Then Exit Sub
    Dim Address As String
    Address = FindCell.Address
    Do
        ' 对 FindCell 进行业务操作
        ' ...
        ' 中途调用 Find() 查找 123
        Dim FindOtherCell
        Set FindOtherCell = .UsedRange.Find("abc", LookAt:=xlWhole)

        ' 这里就会变成找 123 了
        Set FindCell = .UsedRange.FindNext(FindCell)
    Loop While Not FindCell Is Nothing And FindCell.Address <> Address
End With
```

解决方法：定义一个 list，将找到的所以 Cell 放到 list 中，然后再遍历 list 进行业务操作

```vb
With Sht
    Dim FindCell
    Set FindCell = .UsedRange.Find("abc", LookAt:=xlWhole)
    If FindCell Is Nothing Then Exit Sub
    Dim Address As String
    Address = FindCell.Address
    Dim CellList, TempCell
    Set CellList = CreateObject("System.Collections.ArrayList")
    Do
        CellList.Add FindCell
        Set FindCell = .UsedRange.FindNext(FindCell)
    Loop While Not FindCell Is Nothing And FindCell.Address <> Address
    ' 遍历 list
    For Each TempCell In CellList
        ' 进行业务操作，这里可以 Find() 其他 Cell
        Dim FindOtherCell
        Set FindOtherCell = .UsedRange.Find("abc", LookAt:=xlWhole)        
    Next PORCell
End With
```

## 使用 Replace() 后，单元格的值自动有中划线

问题：有一个单元格，展示价钱，格式为 `Currency`，显示的文本为 `10$`，值为 `vbLf 10`。使用 `Replace` 将 `vbLf` 替换为 `""`，然后单元格就显示中划线

原因：单元格的 `format` 的 `Font` 的 `Effects` 勾选了 `Strikethrough` 。单元格的值前面有 `vbLf` ，所以 `Currency` 的格式没有生效，所有没有 `Strikethrough` 。但是当把 `vbLf` 删掉后，格式就生效了，然后就会有 `Strikethrough`
