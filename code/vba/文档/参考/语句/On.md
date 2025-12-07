# On

## On Error 语句

启用错误处理例程并指定该例程在程序中的位置；还可用于禁用错误处理例程。

语法：

- `On Error GoTo line`
  - 启用错误处理例程，该例程从所需行参数中指定的行开始。
  - line 参数是任何行标签或行号。
  - 如果发生 运行时错误 ，控制分支到 行，使错误处理程序处于活动状态。
  - 指定的 line 必须与 On Error 语句在同一个过程中；否则将出现编译时错误。
- `On Error Resume Next`
  - 指定发生运行时错误时，控件将紧跟在发生错误的语句后面的 语句 ，并继续执行。
- `On Error GoTo 0`
  - 禁用当前过程中的任何已启用的错误处理程序。

## On...Gosub，On...GoTo 语句

根据表达式的值，分支到多个指定的行之一。

语法：

- `On expression GoSub destinationlist`
- `On expression GoTo destinationlist`

参数：

- expression
  - 必填。
  - 任何计算结果为一个介于 之间的整数（含 0 和 255）的数值表达式。 如果 expression 为整数之外的任何数字，则在计算它之前将对它进行舍入。
- destinationlist
  - 必填。
  - 用**逗号**分隔的行号或行标签的列表。

expression 的值确定将哪一个行分支到 `destinationlist` 。即假如值为 3 ，那么会执行 `destinationlist` 的第三个 `branch`

例子：

```vb
Sub OnGosubGotoDemo() 
Dim Number, MyString 
 Number = 2 ' Initialize variable. 
 ' Branch to Sub2. 
 On Number GoSub Sub1, Sub2 ' Execution resumes here after 
 ' On...GoSub. 
 On Number GoTo Line1, Line2 ' Branch to Line2. 
 ' Execution does not resume here after On...GoTo. 
 Exit Sub 
Sub1: 
 MyString = "In Sub1" : Return 
Sub2: 
 MyString = "In Sub2" : Return 
Line1: 
 MyString = "In Line1" 
Line2: 
 MyString = "In Line2" 
End Sub
```
