# In

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
