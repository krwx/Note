# ANY

ANY 运算符用于将值与子查询返回的每个值进行比较。

如果子查询结果集中**至少有一个值**满足条件，则 ANY 运算符的求值结果为 TRUE。

**1、语法**：

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name operator ANY (subquery);
```

> 注意：`operator` 必须是标准比较运算符（=、<>、!=、>、>=、< 或 <=）。

**2、示例**：

如果 OrderDetails 表中存在 Quantity 等于 10 的任何记录，返回对应 ProductID 的 ProductName：

```sql
SELECT ProductName
FROM Products
WHERE ProductID = ANY (
  SELECT ProductID
  FROM OrderDetails
  WHERE Quantity = 10
);
```
