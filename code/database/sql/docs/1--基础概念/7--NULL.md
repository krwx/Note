# NULL

NULL 是 SQL 中的一个特殊值，表示缺失或未知的数据。它不同于空字符串或零值，NULL 表示没有值。

无法使用比较运算符（例如 =，< 或 <>）测试 NULL 值。 需要使用 `IS NULL` 或 `IS NOT NULL` 来检查 NULL 值。

`IS NULL` 语法

```sql
SELECT column_names
FROM table_name
WHERE column_name IS NULL;
```

`IS NOT NULL` 语法

```sql
SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;
```
