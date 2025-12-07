# Workbook

- [Workbook](#workbook)
  - [属性](#属性)
    - [Path](#path)
  - [方法](#方法)
    - [close()](#close)

## 属性

### Path

返回一个 String 类型的值，该值代表此工作簿对象所在文件夹的完整路径。

## 方法

### close()

语法：`expression.Close (SaveChanges, FileName, RouteWorkbook)`

`expression` 代表 `Workbook` 对象的变量。

|名称| 必需/可选| 数据类型| 说明|
|--|--|--|--|
|SaveChanges| 可选| Variant| 如果工作簿无更改，则忽略该参数。 如果工作簿存在更改且其在其他打开的窗口中显示，则忽略此参数。 如果工作簿中有改动且工作簿未显示在任何其他打开的窗口中，则由此参数指定是否应保存更改。 如果设为 True，则保存对工作簿所做的更改。<br/> <br/>如果尚未与工作簿关联的文件名，则使用 FileName 。 如果省略 FileName ，则要求用户提供文件名。|
|FileName| 可选| Variant| 在此文件名下保存更改。|

```vb
Workbooks("BOOK1.XLS").Close SaveChanges:=False

ActiveWorkbook.Close SaveChanges:=False
```
