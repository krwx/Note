# Worksheets

指定工作簿或活动工作簿中所有 `Worksheet` 对象的集合。 每个 `Worksheet` 对象都代表一个工作表。

- [Worksheets](#worksheets)
  - [方法](#方法)
    - [Add 方法](#add-方法)
    - [Delete 方法](#delete-方法)

## 方法

### Add 方法

创建新的工作表、图表或宏工作表。 **新工作表成为活动工作表**。

语法：`expression.Add (Before, After, Count, Type)`

- Before
  - 可选  
  - 指定工作表的对象，新建的工作表将置于此工作表之前。
- After
  - 可选  
  - 指定工作表的对象，新建的工作表将置于此工作表之后。
- Count
  - 可选  
  - 要添加的工作表数。 默认值为 1。
- Type
  - 可选  
  - 指定工作表类型。 可以是以下 `XlSheetType` 常量之一： `xlWorksheet、 xlChart、 xlExcel4MacroSheet` 或 `xlExcel4IntlMacroSheet` 。
  - 如果要基于现有模板插入工作表，请指定模板的路径。
  - 默认值为 `xlWorksheet` 。

返回值：表示新工作表、图表或宏工作表的 Object 值。

注意：**如果同时省略 `Before` 和 `After` ，则新工作表插入到活动工作表之前。**

### Delete 方法

删除其中一个 sheet

`Worksheets.Delete(sheetName)`

如果要关闭弹出提示信息的确认框，通过设置 `Application.DisplayAlerts` 实现

```vb
' 确认框关闭
Application.DisplayAlerts = False
Worksheets("dataTest").Delete
' 确认框打开
Application.DisplayAlerts = True
```
