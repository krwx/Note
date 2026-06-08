# INSERT INTO SELECT

INSERT INTO SELECT 语句**从一个现有表中复制数据，并将其插入到另一个现有表中**。

INSERT INTO SELECT 语句要求源表和目标表的数据类型匹配。

> 目标表中的已有记录不会受到影响。

**1、语法**：

将一个表的所有列复制到另一个表中：

```sql
INSERT INTO table2
SELECT * FROM table1
WHERE condition;
```

只将一个表的某些列复制到另一个表中：

```sql
INSERT INTO table2 (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
FROM table1
WHERE condition;
```

**2、示例**：

将 "Suppliers" 复制到 "Customers"（未填充数据的列将包含 NULL）

```sql
INSERT INTO Customers (CustomerName, City, Country)
SELECT SupplierName, City, Country FROM Suppliers;
```
