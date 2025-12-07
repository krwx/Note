# Set

将对象引用分配给变量或属性。

以下示例演示如何使用 Dim 声明类型 Form1 为的数组。 实际上不存在 的 Form1 实例。 此外，Set 将对 Form1 的新实例的引用分配给 myChildForms 变量。

```vb
Dim myChildForms(1 to 4) As Form1 
Set myChildForms(1) = New Form1 
Set myChildForms(2) = New Form1 
Set myChildForms(3) = New Form1 
Set myChildForms(4) = New Form1
```

- 通常，当您使用 `Set` 将对象引用分配给变量时，不会为此变量创建对象的副本。 相反，将创建对该对象的引用。
- 多个对象变量可引用同一个对象。
- 由于此类变量是对该对象而非对象副本的引用，因此，对该对象进行的任何更改都将反映在引用该对象的所有变量中。
- 但是，当您在 `Set` 语句中使用 `New` 关键字时，您实际上将创建对象的实例。
