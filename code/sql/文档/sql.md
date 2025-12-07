# sql

字符串不能有 "\" ，可以有 "/"

判断是否为空，用 `is NULL`

## 插入

如果SQL表的列名是SQL的保留关键字，那么在插入数据时，需要用 反引号(``) 或者 方括号[] 将列名括起来。

以MySQL为例，假设表名为example，列名为key，是保留关键字。

```sql
INSERT INTO `example`(`key`) VALUES ('value');
-- 或者
INSERT INTO [example]([key]) VALUES ('value');
```
