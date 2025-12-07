# Debug

Debug 对象有两种方法： `Print` 和 `Assert` 。

## Print

在 “即时”窗口中打印文本。

可以使用**空格或分号**分隔多个表达式。

```vb
Dim MyVar, Str1
MyVar = "Come see me in the Immediate pane."
Str1 = "Str1"

Debug.Print MyVar Str1
Debug.Print MyVar;Str1
```
