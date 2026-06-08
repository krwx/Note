# JOIN

- [JOIN](#join)
  - [LEFT JOIN](#left-join)
  - [RIGHT JOIN](#right-join)
  - [FULL JOIN](#full-join)
  - [CROSS JOIN](#cross-join)
  - [SELF JOIN](#self-join)

JOIN 子句用于根据两个或多个表之间的关联列，将它们中的行组合在一起。

以下是 SQL 中不同类型的 JOIN：

- `(INNER) JOIN`：仅返回在两个表中具有匹配值的行
- `LEFT (OUTER) JOIN`：返回左表中的所有行，以及右表中匹配的行
- `RIGHT (OUTER) JOIN`：返回右表中的所有行，以及左表中匹配的行（如果没有匹配，则结果为 NULL）
- `FULL (OUTER) JOIN`：返回左表或右表中有匹配的所有行

1、语法：

```sql
SELECT column1, column2, ...
FROM table1
JOIN table2
ON table1.column_name = table2.column_name;

-- or
SELECT column1, column2, ...
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

2、示例：

```sql
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
```

## LEFT JOIN

`LEFT JOIN` 返回左表 (table1) 的所有行，以及右表 (table2) 中匹配的行。

如果右表中没有匹配的行，则右表中各列的结果将为 `NULL`。

`LEFT JOIN` 和 `LEFT OUTER JOIN` 关键字是等价的 - `OUTER` 关键字是可选的。

**语法**

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

## RIGHT JOIN

`RIGHT JOIN` 返回右表 (table2) 的所有行，以及左表 (table1) 中匹配的行。

如果左表中没有匹配的行，则左表中各列的结果将为 `NULL`。

`RIGHT JOIN` 和 `RIGHT OUTER JOIN` 关键字是等价的 - `OUTER` 关键字是可选的。

**语法**

```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

## FULL JOIN

`FULL JOIN` 在左表或右表中存在匹配时返回所有行。

如果左表中的某行在右表中没有匹配，结果集将包含左行数据以及右表所有列的 `NULL` 值。

如果右表中的某行在左表中没有匹配，结果集将包含右行数据以及左表所有列的 `NULL` 值。

`FULL JOIN` 和 `FULL OUTER JOIN` 关键字是等价的 - `OUTER` 关键字是可选的。

**语法**

```sql
SELECT column_name(s)
FROM table1
FULL JOIN table2
ON table1.column_name = table2.column_name;
```

## CROSS JOIN

`CROSS JOIN` 返回两个表的笛卡尔积，即每个左表行与每个右表行的组合。

**1、语法**

```sql
SELECT column_name(s)
FROM table1
CROSS JOIN table2;
```

**2、示例**：

假设有两个表：

- **colors**：`红色`、`蓝色`
- **sizes**：`S`、`M`、`L`

执行 `CROSS JOIN`：

```sql
SELECT *
FROM colors
CROSS JOIN sizes;
```

结果（2 × 3 = 6 行）：

| color | size |
|-------|------|
| 红色  | S    |
| 红色  | M    |
| 红色  | L    |
| 蓝色  | S    |
| 蓝色  | M    |
| 蓝色  | L    |

## SELF JOIN

表与自身连接。

**1、语法**：

```sql
SELECT column_name(s)
FROM table1 T1, table1 T2
WHERE condition;
-- or
SELECT column_name(s)
FROM table1 T1
JOIN table1 T2
ON condition;
```

**2、示例**：

假设有一个员工表 `Employees`，包含以下字段：

- `EmployeeID`
- `FirstName`
- `LastName`
- `ManagerID`（指向员工的上级）

要查询每个员工及其经理的姓名，可以使用 `SELF JOIN`：

```sql
SELECT E1.FirstName AS EmployeeFirstName, E1.LastName AS EmployeeLastName,
       E2.FirstName AS ManagerFirstName, E2.LastName AS ManagerLastName
FROM Employees E1
LEFT JOIN Employees E2 ON E1.ManagerID = E2.EmployeeID;
```
