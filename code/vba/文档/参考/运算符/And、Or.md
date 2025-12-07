# And、Or

## And

用于对两个表达式执行**逻辑接合**。

- 如果两个表达式的计算结果均为 `True` ，result 为 True。
- 如果任一表达式的计算结果为 `False` ， 则 result 为 False。

And 运算符还对两个数值表达式中相同位置的位执行按位比较

```vb
Dim A, B, C, D, MyCheck
A = 10: B = 8: C = 6: D = Null    ' Initialize variables.
MyCheck = A > B And B > C         ' Returns True.
MyCheck = B > A And B > C         ' Returns False.
MyCheck = A > B And B > D         ' Returns Null.
MyCheck = A And B                 ' Returns 8 (bitwise comparison).
```

## Or

用于对两个表达式执行**逻辑或运算**。

如果任一或两个表达式的计算结果为 `True` ，那么 result 为 `True` 。

Or 运算符还对两个数值表达式中位置相同的位执行按位比较，

```vb
Dim A, B, C, D, MyCheck
A = 10: B = 8: C = 6: D = Null    ' Initialize variables.
MyCheck = A > B Or B > C    ' Returns True.
MyCheck = B > A Or B > C    ' Returns True.
MyCheck = A > B Or B > D    ' Returns True.
MyCheck = B > D Or B > A    ' Returns Null.
MyCheck = A Or B    ' Returns 10 (bitwise comparison).
```
