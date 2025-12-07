# Len 函数

返回包含 **字符串中的字符数** 或 **存储变量所需的字节数的长整数** 。

语法：

`Len (string | varname)`

Len 函数语法包含以下部分：

- string：任何有效的字符串表达式。 如果字符串包含 Null，则返回 Null。
- varname：任何有效的变量名称。
  - 如果 varname 包含 Null，则返回 Null。
  - 如果 varname 是变量，则 Len 会像处理 String 一样处理它，并始终返回其包含的字符数

```vb
Type CustomerRecord    ' Define user-defined type.
    ID As Integer    ' Place this definition in a 
    Name As String * 10    ' standard module.
    Address As String * 30
End Type

Dim Customer As CustomerRecord    ' Declare variables.
Dim MyInt As Integer, MyCur As Currency
Dim MyString, MyLen

MyString = "Hello World"    ' Initialize variable.
MyLen = Len(MyInt)    ' Returns 2.
MyLen = Len(Customer)    ' Returns 42.
MyLen = Len(MyString)    ' Returns 11.
MyLen = Len(MyCur)    ' Returns 8.
```
