# 集合运算

- [集合运算](#集合运算)
  - [UNION](#union)
  - [UNION ALL](#union-all)

## UNION

UNION 运算符用于组合两个或多个 SELECT 语句的结果集。UNION 运算符会**自动从结果集中删除重复的行**。

UNION 的要求：

- `UNION` 中的每个 `SELECT` 语句必须具有相同数量的列
- 各列还必须具有相似的数据类型
- 每个 `SELECT` 语句中的列顺序也必须相同

> 结果集中的列名通常等于第一个 `SELECT` 语句中的列名。

**1、语法**：

```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```

**2、示例**：

返回 Customers 表和 Suppliers 表中唯一的（不同的）国家：

```sql
SELECT Country FROM Customers
UNION
SELECT Country FROM Suppliers
ORDER BY Country;
```

## UNION ALL

UNION ALL 运算符用于组合两个或多个 SELECT 语句的结果集。与 UNION 不同，UNION ALL **不会删除重复的行**。

**1、语法**：

```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

**2、示例**：

返回 Customers 表和 Suppliers 表中的所有国家/地区（也包括重复值）：

```sql
SELECT Country FROM Customers
UNION ALL
SELECT Country FROM Suppliers
ORDER BY Country;
```
