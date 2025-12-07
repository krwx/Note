# Collection

- [Collection](#collection)
  - [Add 方法](#add-方法)
  - [Item 方法](#item-方法)
  - [Remove 方法](#remove-方法)
  - [Count 属性](#count-属性)

Collection 对象是一组可称为“单元”的有序项。

集合成员无需共用相同的数据类型。

- 使用 `Add` 方法来添加成员
- 使用 `Remove` 方法来删除成员
- 使用 `Item` 方法返回集合中的特定成员
- 使用 `For Each...Next` 语句循环访问整个集合

声明：

```vb
Dim Result As New Collection
```

下标从 1 开始算

## Add 方法

语法：`object.Add item, key, before, after`

- item
  - 必填。
  - 指定要添加到集合的成员的任何类型的表达式。
- key
  - 可选。
  - 指定可用于替代 位置索引访问集合的成员 的唯一字符串表达式。
- before
  - 可选。
  - 指定集合中的相对位置的表达式。
  - 要添加的成员放置在 `before` 参数标识的成员的签名。
  - 如果是 数值表达式， 则 `before` 必须是从 `1` 到集合的 `Count` 属性值的数字。
  - 如果是字符串表达式，则 `before` 必须对应于引用的成员添加到集合时指定的**键**。
- after
  - 可选。
  - 用法同 `before`

注意：**before 不能同时使用 after ，只能用其中一个**

```vb
Dim ProductCollection As New Collection

ProductCollection.Add item:="123"
Debug.Print ProductCollection.Count
```

## Item 方法

语法：`object.Item(index)`

- index
  - 必填。
  - 一个指定集合的成员位置的表达式。
  - 如果为 数值表达式， 则索引 必须是从 1 到集合的 Count 属性值的数字。
  - 如果 为字符串表达式， 则索引 必须与在将引用的成员添加到集合时指定的 键参数 相对应。

```vb
Debug.Print MyCollection(1)
Debug.Print MyCollection.Item(1)
```

## Remove 方法

语法：`object.Remove(index)`

- index
  - 必填。
  - 一个指定集合的成员位置的表达式。
  - 如果为 数值表达式， 则索引 必须是从 1 到集合的 Count 属性值的数字。
  - 如果 为字符串表达式， 则索引 必须与在将引用的成员添加到集合时指定的 键参数 相对应。

此示例演示如何使用 `Remove` 方法删除 `Collection` 对象： `MyClasses`。 此代码将在循环的每个迭代上删除其索引为 1 的对象。

```vb
Dim Num, MyClasses As New Collection
For Num = 1 To MyClasses.Count    
    MyClasses.Remove 1    ' Remove the first object each time
            ' through the loop until there are 
            ' no objects left in the collection.
Next Num
```

## Count 属性

返回 Long（长整型），其中包含集合中的对象数。 只读。

`MyClasses.Count`
