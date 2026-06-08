# ALL

ALL 运算符用于将值与子查询返回的每个值进行比较。

如果子查询结果集中的**每个值都满足条件**，则 ALL 运算符的求值结果为 TRUE。

**1、语法**：

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name operator ALL (subquery);
```

2、示例：

查询价格高于所有饮料类商品价格的商品名称：

```sql
SELECT ProductName
FROM Products
WHERE Price > ALL (
  SELECT Price
  FROM Products
  WHERE CategoryName = "drinks"
);
```
