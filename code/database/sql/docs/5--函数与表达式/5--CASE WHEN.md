# CASE WHEN

CASE 表达式用于根据 SQL 语句中指定的条件定义不同的结果。

CASE 表达式会逐个检查条件，并在找到第一个匹配项时停止（类似于 if-then-else 语句）。

- 因此，一旦某个条件为真，它将停止处理并返回结果。
- 如果没有条件为真，则返回 ELSE 子句中的值。
- 如果没有 ELSE 子句且没有条件为真，则返回 NULL。

**1、语法**

```sql
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  WHEN conditionN THEN resultN
  ELSE default_result
END;
```

最好给 CASE 表达式一个别名，以便在结果集中引用它：

```sql
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  WHEN conditionN THEN resultN
  ELSE default_result
END AS alias_name;
```

> 如果没有指定别名，则结果集中的列名通常为 `CASE`（不同数据库可能有所不同）。

**2、示例**

这里我们使用 CASE 表达式对数据（Price）进行分类，并创建一个新列（PriceCategory），用于显示每个产品所属的价格类别：

```sql
SELECT ProductName, Price,
CASE
  WHEN Price < 20 THEN 'Low Cost'
  WHEN Price BETWEEN 20 AND 50 THEN 'Medium Cost'
  ELSE 'High Cost'
END AS PriceCategory
FROM Products;
```

结果：

```txt
ProductName    Price    PriceCategory
------------   -----    -------------
Product A      15       Low Cost
Product B      30       Medium Cost
Product C      60       High Cost
```
