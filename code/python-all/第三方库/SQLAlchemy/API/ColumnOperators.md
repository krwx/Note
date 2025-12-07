# ColumnOperators

- [ColumnOperators](#columnoperators)
  - [in\_()](#in_)

## in_()

实现 in 操作符

语法：`in_(other)`

**other 的取值的类型**：

1、列表

```py
stmt.where(column.in_([1, 2, 3]))

# WHERE COL IN (?, ?, ?)
```
