# Exists

`EXISTS` 运算符用于判断查询子句是否有记录，如果有一条或多条记录存在返回 True，否则返回 False。

SQL EXISTS 语法

```sql
SELECT column_name(s)
FROM table_name
WHERE EXISTS
(SELECT column_name FROM table_name WHERE condition);
```

例子：

1、列出产品价格低于 20 的供应商

```sql
SELECT SupplierName
FROM Suppliers
WHERE EXISTS (SELECT ProductName FROM Products WHERE Products.SupplierID = Suppliers.supplierID AND Price < 20);
```

2、列出产品价格等于 22 的供应商

```sql
SELECT SupplierName
FROM Suppliers
WHERE EXISTS (SELECT ProductName FROM Products WHERE Products.SupplierID = Suppliers.supplierID AND Price = 22);
```
