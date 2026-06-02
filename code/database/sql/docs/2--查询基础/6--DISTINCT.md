# SELECT DISTINCT

SELECT DISTINCT 语句用于仅返回不同的（唯一的）值。

在表中，一个列可能包含许多重复值 - 有时您只想列出不同的值。

**语法**：

```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

实例：

从 "Customers" 表中选择所有不同的国家：

```sql
SELECT DISTINCT Country FROM Customers;
```

## COUNT

通过在名为 `COUNT` 的函数中使用 `DISTINCT` 关键字，我们可以返回不同国家的数量。

```sql
SELECT COUNT(DISTINCT Country) FROM Customers;
```
