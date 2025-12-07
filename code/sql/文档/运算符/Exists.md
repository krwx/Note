# Exists

`EXISTS` 运算符用于判断查询子句是否有记录，如果有一条或多条记录存在返回 True，否则返回 False。

SQL EXISTS 语法

```sql
SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);
```

condition 要与 column_name(s) 有关联？

例子：

access_log 表的 site_id 与 Websites 表的 id 是相同数据的，下面的例子为查找总访问量(count 字段)大于 200 的网站是否存在。

```sql
SELECT Websites.name, Websites.url 
FROM Websites 
WHERE EXISTS (SELECT count FROM access_log WHERE Websites.id = access_log.site_id AND count > 200);
```
