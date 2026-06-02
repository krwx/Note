# WHERE

- [WHERE](#where)
  - [文本字段与数字字段](#文本字段与数字字段)
  - [运算符](#运算符)
    - [结合 AND 和 OR](#结合-and-和-or)

WHERE 子句用于筛选记录。仅提取满足特定条件的那些记录。

WHERE 子句可用于 SELECT、UPDATE、DELETE 语句中。

WHERE 子句后面跟一个条件表达式。只有满足条件的记录才会被选中。

**语法**：

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

**实例**：

选择来自墨西哥的所有客户：

```sql
SELECT * FROM Customers
WHERE Country='Mexico';
```

## 文本字段与数字字段

在 WHERE 子句中，文本字段的值必须用单引号括起来，而数字字段的值则不需要。

```sql
SELECT * FROM Customers
WHERE Country='Mexico' AND Age > 30;
```

## 运算符

WHERE 子句中可以使用以下运算符：

- 比较运算符：=、<>、>、<、>=、<=
- 逻辑运算符：
  - AND
  - OR
  - NOT：用于返回所有不匹配指定条件的记录。
- 其他运算符：
  - IN：为列指定多个可能的值。
  - BETWEEN：介于某个范围内。
  - LIKE：搜索模式。
  - IS NULL：检查 NULL 值。

例如，选择价格在 50 到 60 之间的所有产品：

```sql
SELECT * FROM Products
WHERE Price BETWEEN 50 AND 60;
```

选择名字以 'A' 开头的所有客户：

```sql
SELECT * FROM Customers
WHERE Name LIKE 'A%';
```

选择没有指定国家的所有客户：

```sql
SELECT * FROM Customers
WHERE Country IS NULL;
```

选择名字在 `A`、`B` 和 `C` 的所有客户：

```sql
SELECT * FROM Customers
WHERE Name IN ('A', 'B', 'C');
```

### 结合 AND 和 OR

可以使用 AND 和 OR 运算符来组合多个条件。使用括号来明确条件的优先级。

实例：

选择所有以 'G' 或 'R' 开头的西班牙客户：

```sql
SELECT * FROM Customers
WHERE Country = 'Spain' AND (CustomerName LIKE 'G%' OR CustomerName LIKE 'R%');
```

如果没有了括号，那么就相当于：选择所有客户，他们要么来自西班牙且以 'G' 开头，要么以字母 'R' 开头：

```sql
SELECT * FROM Customers
WHERE Country = 'Spain' AND CustomerName LIKE 'G%' OR CustomerName LIKE 'R%';
```
