# BETWEEN

- [BETWEEN](#between)
  - [BETWEEN 与文本值](#between-与文本值)
  - [BETWEEN 与日期](#between-与日期)

BETWEEN 运算符在 WHERE 子句中使用，**用于选择指定范围内的值**。

该范围是包含性的 - **范围的开始值和结束值都包含在结果中**。

语法：

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

实例：

选择价格在 10 到 20 之间的所有产品：

```sql
SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20;
```

## BETWEEN 与文本值

以下 SQL 语句选择所有 ProductName 按字母顺序在 `Geitost` 和 `Louisiana Hot Spiced Okra` 之间的产品：

```sql
SELECT * FROM Products
WHERE ProductName BETWEEN 'Geitost' AND 'Louisiana Hot Spiced Okra'
ORDER BY ProductName;
```

## BETWEEN 与日期

以下 SQL 语句选择所有在 1996 年 7 月下的订单：

```sql
SELECT * FROM Orders
WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31';
```
