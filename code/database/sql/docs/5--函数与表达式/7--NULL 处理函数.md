# NULL 处理函数

- [NULL 处理函数](#null-处理函数)
  - [COALESCE()](#coalesce)
  - [IFNULL()](#ifnull)
  - [ISNULL()](#isnull)

SQL 提供了一些内置函数来处理 NULL 值，最常见的函数有：

- `COALESCE()` - 推荐的标准函数。（适用于 MySQL、SQL Server 和 Oracle）
- `IFNULL()` - (MySQL)
- `ISNULL()` - (SQL Server)
- `NVL()` - (Oracle)
- `IsNull()` - (MS Access)

## COALESCE()

COALESCE() 函数返回值列表中的**第一个非 NULL 值**。

**1、语法**

```sql
COALESCE(val1, val2, ...., val_n)
```

**2、示例**

返回 Products 表中每个产品的名称和总库存（InStock + InOrder）乘以价格。如果 InOrder 列中的值为 NULL，则将其视为 0：

```sql
SELECT ProductName, Price * (InStock + COALESCE(InOrder, 0))
FROM Products;
```

## IFNULL()

MySQL 的 `IFNULL()` 函数将 NULL 替换为指定的值。

示例，将 NULL 值替换为 0：

```sql
SELECT ProductName, Price * (InStock + IFNULL(InOrder, 0))
FROM Products;
```

## ISNULL()

SQL Server 的 `ISNULL()` 函数将 NULL 替换为指定的值。

示例，将 NULL 值替换为 0：

```sql
SELECT ProductName, Price * (InStock + ISNULL(InOrder, 0))
FROM Products;
```
