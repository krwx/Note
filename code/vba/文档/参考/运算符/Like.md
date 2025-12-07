# Like

用于比较两个字符串。

语法：

`result = string Like pattern`

- 如果 string 与 pattern 匹配，则 result 为 True；
- 如果没有匹配项，则 result 为 False。
- 如果 string 或 pattern 为 Null，则 result 为 Null。

|pattern 中的字符| string 的匹配项|
|--|--|
|?| 任意单个字符。|
|*| 零个或多个字符。|
|#| 任何个位数 (0-9) 。|
|[ charlist ]| charlist 内的任意单个字符。|
|[ !charlist ]| charlist 外的任意单个字符。|

```vb
Dim MyCheck
MyCheck = "aBBBa" Like "a*a"    ' Returns True.
MyCheck = "F" Like "[A-Z]"    ' Returns True.
MyCheck = "F" Like "[!A-Z]"    ' Returns False.
MyCheck = "a2a" Like "a#a"    ' Returns True.
MyCheck = "aM5b" Like "a[L-P]#[!c-e]"    ' Returns True.
MyCheck = "BAT123khg" Like "B?T*"    ' Returns True.
MyCheck = "CAT123khg" Like "B?T*"    ' Returns False.
MyCheck = "ab" Like "a*b"    ' Returns True.
MyCheck = "a*b" Like "a [*]b"    ' Returns False.
MyCheck = "axxxxxb" Like "a [*]b"    ' Returns False.
MyCheck = "a [xyz" Like "a [[]*"    ' Returns True.
MyCheck = "a [xyz" Like "a [*"    ' Throws Error 93 (invalid pattern string).
```
