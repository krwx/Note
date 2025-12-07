# IIf

返回两个部分之一，具体取决于的计算结果。相当于 js 的三元表达式

语法:

`IIf(expr, truepart, falsepart)`

- `expr` ：要计算的表达式。必填。
- `truepart` ：expr 为 True 时返回的**值或表达式**。必填。
- `falsepart` ：expr 为 False 时返回的**值或表达式**。必填。

例子：

使用 IIf 函数计算 TestMe 过程的 参数 CheckIt ，如果量大于 1000，则返回单词“Large”;否则返回单词“Small”。

```VB
Function CheckIt (TestMe As Integer)
    CheckIt = IIf(TestMe > 1000, "Large", "Small")
End Function
```

注意：

- truepart 和 falsepart 的表达式会先计算再来判断 expr ，所以这两个 part 要在任何条件都能算出来的值。如果算不出来会报错。
