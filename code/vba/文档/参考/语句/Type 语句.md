# Type

在 **模块级别** 用于定义包含一个或多个元素的用户定义 **数据类型**。

语法：

```text
[ Private | Public ] Type varname

elementname [ ( [ subscripts ] ) ] As type
[ elementname [ ( [ subscripts ] ) ] As type ]
. . .
End Type
```

Type 语句只能在模块级别使用。 使用 Type 语句声明用户定义类型后，可以在声明 范围内的 任意位置声明该类型的变量。 使用 Dim 、 Private 、 Public 、 ReDim 或 Static 声明用户定义的类型的变量。

在标准模块和类模块中，默认情况下，用户定义的类型是公用的。 可以使用 Private 关键字更改此可见性。

Type 语句仅在模块级别上使用。 如果它在**类模块**中出现，则 Type 语句的前面必须有关键字 `Private` 。

注意：

- 要在模块文件的开头声明类型

例子：

```vb
Type EmployeeRecord    ' Create user-defined type. 
    ID As Integer    ' Define elements of data type. 
    Name As String * 20 
    Address As String * 30 
    Phone As Long 
    HireDate As Date 
End Type 
Sub CreateRecord() 
    Dim MyRecord As EmployeeRecord    ' Declare variable. 
 
    ' Assignment to EmployeeRecord variable must occur in a procedure. 
    MyRecord.ID = 12003    ' Assign a value to an element. 
End Sub
```
