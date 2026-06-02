# UPDATE

UPDATE 语句用于修改表中的现有记录。

UPDATE 语法：

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

> UPDATE 语句中的 WHERE 子句是可选的。如果省略 WHERE 子句，则表中的所有记录都将被更新。

示例：

```sql
UPDATE Customers
SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
WHERE CustomerID = 1;
```
