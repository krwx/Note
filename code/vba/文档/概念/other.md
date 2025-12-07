# other

- [other](#other)
  - [调用 Sub 和 Function 过程](#调用-sub-和-function-过程)
  - [代码约定](#代码约定)
  - [Sheet](#sheet)

## 调用 Sub 和 Function 过程

若要从其他过程中调用某个 `Sub` 过程，请键入该过程的名称并包含任何所需的参数值。

不需要使用 `Call` 语句，但如果使用了该语句，**则必须将任何参数包含在圆括号内**。

```vb
Sub Main() 
 MultiBeep 56 
 Message 

 <!-- 调用多个参数 -->
 HouseCalc 99800, 43100 
 Call HouseCalc(380950, 49500) 
End Sub 
 
Sub MultiBeep(numbeeps) 
 For counter = 1 To numbeeps 
 Beep 
 Next counter 
End Sub 
 
Sub Message() 
 MsgBox "Time to take a break!" 
End Sub

Sub HouseCalc(price As Single, wage As Single) 
 If 2.5 * wage <= 0.8 * price Then 
 MsgBox "You cannot afford this house." 
 Else 
 MsgBox "This house is affordable." 
 End If 
End Sub
```

若要使用函数的返回值，请将该函数分配给变量并将参数包含在圆括号内，如以下示例所示。

```vb
Answer3 = MsgBox("Are you happy with your salary?", 4, "Question 3") 
```

传递命名参数

- Sub 或 Function 过程中的语句可使用命名参数将值传递给所调用的过程。
- 您可以按照任何顺序列出命名参数。
- 命名参数包含参数的名称后跟一个冒号和一个等号 (`:=`) 以及分配给该参数的值。

```vb
MsgBox Title:="Task Box", Prompt:="Task Completed!"

answer3 = MsgBox(Title:="Question 3", _ 
Prompt:="Are you happy with your salary?", Buttons:=4)
```

## 代码约定

撇号 (`'`) 引入代码注释。

```VB
' This is a comment; these two lines
' are ignored when the program is running.
```

太长而无法放在一行的行（除了备注以外）可以在下一行继续，方法是使用行继续符，它是**单个前导空格后跟一个下划线** ( _)：

```VB
Sub Form_MouseDown (Button As Integer, _
Shift As Integer, X As Single, Y As Single)
```

## Sheet

可以直接用 Sheet 的名字去调用 Sheet 的方法或属性

```vb
' 假设 Sheet 的名称为 Sheet1 
Sheet1.Range("A1") = "123"
```
