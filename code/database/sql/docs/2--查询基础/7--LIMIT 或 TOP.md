# LIMIT 或 TOP

- [LIMIT 或 TOP](#limit-或-top)
  - [LIMIT](#limit)
  - [TOP](#top)

在 SQL 中，`LIMIT` 和 `TOP` 是用于限制查询结果数量的关键字。它们的使用方式取决于所使用的数据库系统。

## LIMIT

`LIMIT` 关键字用于指定查询结果中返回的行数。它通常与 `OFFSET` 一起使用，以实现分页查询。

主要在 `MySQL` 和 `PostgreSQL` 中使用。

**语法**：

```sql
SELECT column1, column2, ...
FROM table_name
LIMIT number_of_rows OFFSET offset_value;
```

**示例**：

```sql
-- 查询前 5 行数据
SELECT * FROM employees
LIMIT 5;

-- 查询第 6 到第 10 行数据
SELECT * FROM employees
LIMIT 5 OFFSET 5;

-- 查询后 5 行数据
SELECT * FROM employees
ORDER BY id DESC
LIMIT 5;
```

## TOP

`TOP` 关键字用于指定查询结果中返回的前几行数据。它主要在 `SQL Server` 中使用。

**语法**：

```sql
SELECT TOP number_of_rows column1, column2, ...
FROM table_name;
```

**示例**：

```sql
-- 查询前 5 行数据
SELECT TOP 5 employees.name, employees.position FROM employees;
SELECT TOP 5 * FROM employees;
```
