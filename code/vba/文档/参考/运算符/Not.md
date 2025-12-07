# Not

用于对表达式执行逻辑非运算。

```vb
Dim A, B, C, D, MyCheck
A = 10: B = 8: C = 6: D = Null    ' Initialize variables.
MyCheck = Not(A > B)    ' Returns False.
MyCheck = Not(B > A)    ' Returns True.
MyCheck = Not(C > D)    ' Returns Null.
MyCheck = Not A    ' Returns -11 (bitwise comparison).
```
