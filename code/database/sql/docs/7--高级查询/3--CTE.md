# CTE

- [CTE](#cte)
  - [介绍](#介绍)
  - [基本语法](#基本语法)
    - [示例：简单 CTE](#示例简单-cte)
  - [多个 CTE](#多个-cte)
  - [递归 CTE](#递归-cte)
    - [语法](#语法)
    - [示例：遍历部门层级](#示例遍历部门层级)
  - [CTE 的优点](#cte-的优点)
  - [注意事项](#注意事项)

## 介绍

**CTE**（Common Table Expression，公用表表达式）是 SQL 中一种临时结果集的定义方式，它存在于单个语句（如 `SELECT`、`INSERT`、`UPDATE`、`DELETE`）的执行范围内。可以把它看作是一个**临时的命名查询**，在后续的主查询中可以被多次引用。

CTE 的出现主要是为了提升复杂查询的可读性和可维护性，同时也能实现递归查询（这是传统子查询或视图难以做到的）。

## 基本语法

```sql
WITH cte_name (column1, column2, ...) AS (
    -- CTE 的查询定义
    SELECT ...
)
-- 主查询，可以引用 cte_name
SELECT * FROM cte_name;
```

- `WITH` 关键字表示开始定义 CTE。
- `cte_name` 是给这个临时结果集起的名字。
- 括号内的 `(column1, ...)` 可选，用于显式指定列名（如果省略，则使用内部查询的列名）。
- 之后的主查询（`SELECT` / `INSERT` 等）可以使用这个 `cte_name` 像使用普通表或视图一样。

### 示例：简单 CTE

假设有一个员工表 `employees`，我们想找出部门平均工资高于 5000 的部门。

```sql
WITH dept_avg AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT department_id, avg_salary
FROM dept_avg
WHERE avg_salary > 5000;
```

没有 CTE 的话，你需要写子查询，可能会嵌套较深；而使用 CTE，逻辑更清晰。

## 多个 CTE

可以在一个 `WITH` 后面定义多个 CTE，用逗号分隔。后面的 CTE 可以引用前面定义的 CTE。

```sql
WITH 
    cte1 AS (SELECT ...),
    cte2 AS (SELECT ... FROM cte1 ...)
SELECT * FROM cte2;
```

## 递归 CTE

CTE 的一个强大功能是支持**自引用**，即递归 CTE。它常用于处理树形结构或图数据，比如组织架构、菜单树、路径枚举等。

### 语法

```sql
WITH RECURSIVE cte_name AS (
    -- 初始查询（锚点成员）
    SELECT ...
    UNION ALL
    -- 递归查询（递归成员）
    SELECT ... FROM cte_name WHERE ...
)
SELECT * FROM cte_name;
```

- `RECURSIVE` 关键字告诉数据库这是递归 CTE（某些数据库如 SQL Server、PostgreSQL 要求 `RECURSIVE`，Oracle 不需要）。
- 锚点成员产生第一层结果。
- 递归成员引用 CTE 自身，层层迭代直到条件不满足（`WHERE` 子句终止）。

### 示例：遍历部门层级

假设有 `departments` 表，包含 `id`, `name`, `parent_id`。

```sql
WITH RECURSIVE dept_tree AS (
    -- 起始：顶层部门（parent_id 为 NULL）
    SELECT id, name, parent_id, 1 AS level
    FROM departments
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- 递归：找到下一级子部门
    SELECT d.id, d.name, d.parent_id, dt.level + 1
    FROM departments d
    JOIN dept_tree dt ON d.parent_id = dt.id
)
SELECT * FROM dept_tree;
```

这个查询会返回整个部门树，并标出层级。

## CTE 的优点

| 优点 | 说明 |
| ----- | ------ |
| **可读性高** | 将复杂查询拆解为有意义的命名块，逻辑清晰 |
| **可重复引用** | 同一个 CTE 可以在主查询中多次使用，避免重复子查询 |
| **递归能力** | 轻松处理层次数据，无需使用临时表或游标 |
| **便于调试** | 可以单独测试 CTE 部分，逐步构建查询 |
| **性能优化潜力** | 数据库可能对 CTE 做优化（但某些情况下也可能物化，需注意） |

## 注意事项

1. **作用范围**：CTE 只存在于当前语句，语句结束后自动释放。不能在不同的查询之间共享。
2. **递归限制**：为防止无限循环，大多数数据库有递归深度限制（如 PostgreSQL 默认 100 层），可以手动调整。
3. **性能考量**：
   - 在非递归场景下，CTE 和派生表（子查询）通常性能相近。
   - 某些数据库（如 PostgreSQL）会将 CTE 视为优化边界（即物化），可能导致性能不如预期。但现代版本已允许 `MATERIALIZED` / `NOT MATERIALIZED` 控制。
4. **数据库差异**：
   - SQL Server、PostgreSQL、DB2、SQLite 支持 `WITH RECURSIVE`。
   - Oracle 使用 `CONNECT BY` 或者 `WITH` 但不用 `RECURSIVE` 关键字。
   - MySQL 自 8.0 起支持非递归和递归 CTE。
