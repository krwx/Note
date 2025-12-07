# Option

- [Option](#option)
  - [Option Base](#option-base)
  - [Option Compare](#option-compare)
  - [Option Explicit](#option-explicit)
  - [Option Private](#option-private)

## Option Base

在 模块级别 用于**声明 数组 下标的默认下限**。

- 由于默认基数为 0，因此不需要 `Option Base` 语句。
- 如果使用，则该语句必须出现在模块中的任何过程之前。
- `Option Base` 只能在模块中出现一次且必须位于包含维度的数组声明前面。
- `Option Base` 语句**只影响该语句所在模块中的数组下限**。

例子：

```vb
Option Base 1 ' Set default array subscripts to 1. 
 
Dim Lower 
Dim MyArray(20), TwoDArray(3, 4) ' Declare array variables. 
Dim ZeroArray(0 To 5) ' Override default base subscript. 
' Use LBound function to test lower bounds of arrays. 
Lower = LBound(MyArray) ' Returns 1. 
Lower = LBound(TwoDArray, 2) ' Returns 1. 
Lower = LBound(ZeroArray) ' Returns 0.
```

## Option Compare

在 模块级别 用于**声明在比较字符串数据时使用的默认比较方法**。

语法:

`Option Compare { Binary | Text | Database }`

Option Compare 语句为模块指定了字符串比较方法（Binary、Text 或 Database）。

如果模块不包括 Option Compare 语句，则**默认文本比较方法为 Binary**。

- `Option Compare Binary` 根据派生自字符的内部二进制表示形式的排序顺序生成字符串比较。 在 Microsoft Windows 中，排序顺序由代码页决定。 典型二进制排序顺序如以下示例中所示：
  - `A < B < E < Z < a < b < e < z < À < Ê < Ø < à < ê < ø`
- `Option Compare Text` 会导致基于由您系统的区域设置决定的区分大小写的文本排序顺序的字符串比较。 使用 选项比较文本对相同字符进行排序时，将生成以下文本排序顺序：
  - `(A=a) < ( À=à) < (B=b) < (E=e) < (Ê=ê) < (Z=z) < (Ø=ø)`
- `Option Compare Database` 只能在 Microsoft Access 中使用。 这将导致基于由执行字符串比较的数据库的区域设置 ID 决定的排序顺序的字符串比较。

例子：

```vb
' Set the string comparison method to Binary. 
Option Compare Binary ' That is, "AAA" is less than "aaa". 
' Set the string comparison method to Text. 
Option Compare Text ' That is, "AAA" is equal to "aaa".
```

## Option Explicit

在模块级别用于**强制显式声明该模块中的所有变量**。

- 当 “选项显式 ”出现在模块中时，必须使用 `Dim、 Private、 Public、 ReDim 或 Static` 语句显式声明所有变量。（理解这句话）
- 如果您要使用未声明的变量名称，则会在编译时出现错误。

例子：

```vb
Option Explicit ' Force explicit variable declaration. 

Dim MyVar ' Declare variable. 

MyInt = 10 ' Undeclared variable generates error. 
MyVar = 10 ' Declared variable does not generate error.
```

## Option Private

在允许跨多个项目引用的主机应用程序中使用时，`Option Private Module`防止模块的内容在其项目外被应用。

```vb
Option Private Module ' Indicates that module is private.
```
