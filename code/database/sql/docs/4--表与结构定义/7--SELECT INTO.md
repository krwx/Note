# SELECT INTO

SELECT INTO 语句用于**创建新表**，并用现有表中的数据填充它。

> 新表将使用与源表中定义的相同列名和数据类型创建。但是，主键、索引或 NOT NULL 约束不会自动转移。

**1、语法**:

复制所有列到新表中：

```sql
SELECT *
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
```

只复制一些列到新表中：

```sql
SELECT column1, column2, column3, ...
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
```

**2、示例**：

创建了 Customers 的一个备份副本：

```sql
SELECT * INTO CustomersBackup2017
FROM Customers;
```

只复制几个列到新表中：

```sql
SELECT CustomerName, ContactName INTO CustomersBackup2017
FROM Customers;
```

只复制德国的客户到新表中：

```sql
SELECT * INTO CustomersGermany
FROM Customers
WHERE Country = 'Germany';
```
