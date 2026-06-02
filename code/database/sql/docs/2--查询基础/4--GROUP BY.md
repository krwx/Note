# GROUP BY

GROUP BY 语句根据一个或多个列对结果集进行分组。例如，“找出每个国家的客户数量”。

分组的结果是每个分组返回一行。GROUP BY 语句通常与聚合函数一起使用，以对每个分组执行计算。

> 聚合函数：`COUNT()`, `MAX()`, `MIN()`, `SUM()`, `AVG()`

语法：

```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);
```

示例：

以下 SQL 语句列出了每个国家的客户数量：

```sql
SELECT Country, COUNT(CustomerID) AS [Number of Customers]
FROM Customers
GROUP BY Country;
```
