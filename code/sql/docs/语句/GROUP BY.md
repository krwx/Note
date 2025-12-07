# GROUP BY

GROUP BY 语句用于结合聚合函数，根据一个或多个列对结果集进行分组。

`SELECT site_id, SUM(count) AS nums FROM access_log GROUP BY site_id;`

注意：

- 5.7 版本后 `group by` 语句只能返回 `group by` 的字段
  - 原因：mysql 版本 5.7 之后默认的模式是 `ONLY_FULL_GROUP_BY` 。
  - [参考](https://www.jb51.net/article/251380.htm)
