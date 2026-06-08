# In

- [In](#in)
  - [NOT IN](#not-in)
  - [IN (SELECT)](#in-select)

IN 操作符允许您在 WHERE 子句中规定多个值。

SQL `IN` 语法

```sql
SELECT column1, column2, ...
FROM table_name
WHERE column IN (value1, value2, ...);
```

参数说明：

- `column1, column2, ...` ：要选择的字段名称，可以为多个字段。如果不指定字段名称，则会选择所有字段。
- `table_name` ：要查询的表名称。
- `column` ：要查询的字段名称。
  - **注意：只能有一个查询的字段**
- `value1, value2, ...` ：要查询的值，可以为多个值。

例子：

```sql
SELECT * FROM Websites WHERE name IN ('Google','菜鸟教程');
```

## NOT IN

通过在 IN 运算符前面使用 NOT 关键字，您可以返回不属于列表中任何值的所有记录。

实例：

返回不是来自 'Germany'、'France' 或 'UK' 的所有客户：

```sql
SELECT * FROM Customers
WHERE Country NOT IN ('Germany', 'France', 'UK');
```

## IN (SELECT)

您也可以在 WHERE 子句中将 IN 与子查询一起使用。使用子查询，您可以返回主查询中所有存在于子查询结果中的记录。

实例：

以下 SQL 语句会返回在 Orders 表中有订单的所有客户：

```sql
SELECT * FROM Customers
WHERE CustomerID IN (SELECT CustomerID FROM Orders);
```
