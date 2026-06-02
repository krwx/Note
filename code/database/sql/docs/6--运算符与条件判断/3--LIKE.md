# LIKE

LIKE 操作符在 WHERE 子句中使用，可在列中搜索指定的模式。

LIKE 操作符经常与两个通配符一起使用：

- 百分号 `%` 表示零个、一个或多个字符
- 下划线 `_` 表示一个单一的字符

语法

```sql
SELECT column1, column2, ...
FROM table_name
WHERE columnN LIKE pattern;
```
