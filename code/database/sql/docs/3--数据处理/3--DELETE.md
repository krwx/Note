# DELETE

- [DELETE](#delete)
  - [删除所有记录](#删除所有记录)
  - [删除表](#删除表)

SQL DELETE 语句用于删除表中的现有记录。

DELETE 语法

```sql
DELETE FROM table_name WHERE condition;
```

示例：

```sql
DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
```

## 删除所有记录

在不删除表的情况下删除表中的所有行.

```sql
DELETE FROM table_name;
```

## 删除表

使用 `DROP TABLE` 语句完全删除表：

```sql
DROP TABLE table_name;
```
