# Dictionary

`References` 勾选 `Microsoft Scripting Runtime`

> `Microsoft Scripting Runtime` 包含 `Dictionary` 和 `FileSystemObject` 对象

字典的 key 是区分数据类型的，所以如果 key 为 Integer 的，那么不能用传递 String 类型的数据，也要用 Integer 类型的数据才行。

- [Dictionary](#dictionary)
  - [定义字典](#定义字典)
  - [新增元素](#新增元素)
  - [删除元素](#删除元素)
  - [获取字典元素的个数](#获取字典元素的个数)
  - [获取字典的值](#获取字典的值)
  - [修改](#修改)
  - [判断字典中是否包含关键字](#判断字典中是否包含关键字)
  - [遍历字典](#遍历字典)
  - [比较模式](#比较模式)
  - [other](#other)

## 定义字典

```vb
Dim dict
' 创建Dictionary
Set dict = CreateObject("Scripting.Dictionary")
```

## 新增元素

```vb
' 增加项目
dict.Add "A", 300
dict.Add "B", 400
dict.Add "C", 500
```

如果添加已经添加了的 key，会报错

## 删除元素

```vb
dict.Remove ("A")

' 删除所有项目
dict.Removeall
```

## 获取字典元素的个数

```vb
dict.Count
```

## 获取字典的值

```vb
Value = dict.Item("B")
```

## 修改

```vb
' 修改关键字对应的值,如不存在则创建新的项目
dict.Item("B") = 1000
dict.Item("D") = 800
```

## 判断字典中是否包含关键字

```vb
dict.exists ("B")
```

## 遍历字典

```vb
' for 循环
Dim k, v
k = dict.keys
v = dict.Item
For i = 0 To dict.Count - 1
    key = k(i)
    Value = v(i)
    Debug.print key & Value
Next

' for each 循环
Dim key
For Each key in dict
    Debug.print "key:" & key & ";value:" & dict(key)
Next
```

获取 keys 只能定义一个变量然后赋值给它，不能直接 `Dict.keys(0)` 这样使用，会报错

## 比较模式

设置或者返回在 Dictionary 对象中进行字符串关键字比较时所使用的比较模式

语法：`object.CompareMode[ = compare]`

`compare` 就是一个代表比较模式的值。可以使用的值是 0 (二进制)、1 (文本), 2 (数据库)。

```vb
Dict.CompareMode = vbTextCompare
```

## other

由于本地窗口的限制，在 Debug 时对字典显示的 item 只支持到 256 个。这个只是在本地窗口的显示个数，不影响字典的内容，能存储超过 256 个元素。
