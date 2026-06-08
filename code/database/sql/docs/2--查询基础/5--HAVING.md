# HAVING 子句

在 SQL 中增加 `HAVING` 子句原因是， `WHERE` 关键字无法与聚合函数一起使用。

HAVING 子句可以让我们**筛选分组后的各组数据**。

SQL HAVING 语法

```sql
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1
HAVING condition;
```

参数说明：

- column1：要检索的列。
- aggregate_function(column2)：一个聚合函数，例如SUM、COUNT、AVG等，应用于column2的值。
- table_name：要从中检索数据的表。
- GROUP BY column1：根据column1列的值对数据进行分组。
- HAVING condition：一个条件，用于筛选分组的结果。只有满足条件的分组会包含在结果集中。

例子：

1、列出每个国家的客户数量。只包括客户数超过 5 个的国家：

```sql
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;
```

2、列出注册订单超过 10 个的员工：

```sql
SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders
FROM (Orders INNER JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID)
GROUP BY LastName
HAVING COUNT(Orders.OrderID) > 10;
```

## `where` 和 `having` 的区别

`where` 和 `having` 之后都是筛选条件，但是有区别的：

- `where` 在 `group by` 前， `having` 在 `group by` 之后
- 聚合函数（`avg、sum、max、min、count`），不能作为条件放在 `where` 之后，但可以放在 `having` 之后
