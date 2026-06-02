# ORDER BY

- [ORDER BY](#order-by)
  - [按多列排序](#按多列排序)
  - [同时使用 ASC 和 DESC](#同时使用-asc-和-desc)

ORDER BY 关键字用于对结果集进行升序或降序排序。

默认对结果集进行升序 (`ASC`) 排序。要按降序对记录进行排序，请使用 `DESC` 关键字。

语法：

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

实例：

```sql
SELECT * FROM Products
ORDER BY Price;

SELECT * FROM Products
ORDER BY Price DESC;
```

## 按多列排序

以下 SQL 语句从 "Customers" 表中选择所有客户，并按 "Country" 和 "CustomerName" 列进行排序。

这意味着它按国家排序，但如果某些行具有相同的国家，则按 CustomerName 对它们进行排序：

```sql
SELECT * FROM Customers
ORDER BY Country, CustomerName;
```

## 同时使用 ASC 和 DESC

以下 SQL 语句从 "Customers" 表中选择所有客户，并按 "Country" 列升序和 "CustomerName" 列降序进行排序：

```sql
SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;
```
