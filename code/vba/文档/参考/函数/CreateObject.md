# CreateObject

创建并返回对 `ActiveX` 对象的引用。

语法:

`CreateObject(class, [ servername ])`

class: 必需；Variant (String)。 要创建对象的应用程序名称和类。

```vb
' Declare an object variable to hold the object 
' reference. Dim as Object causes late binding. 
Dim ExcelSheet As Object
Set ExcelSheet = CreateObject("Excel.Sheet")
```
