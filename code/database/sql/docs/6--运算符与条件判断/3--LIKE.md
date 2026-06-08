# LIKE

- [LIKE](#like)
  - [以 ... 开头](#以--开头)
  - [以 ... 结尾](#以--结尾)
  - [包含特定字符](#包含特定字符)
  - [没有通配符](#没有通配符)

LIKE 操作符在 WHERE 子句中使用，可在列中搜索指定的模式。

LIKE 操作符经常与两个通配符一起使用：

- 百分号 `%` 表示零个、一个或多个字符
- 下划线 `_` 表示一个单一的字符

语法：

```sql
SELECT column1, column2, ...
FROM table_name
WHERE columnN LIKE pattern;
```

示例：

1、选择所有以字母 "a" 开头的客户：

```sql
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%';
```

2、选择某个城市的客户，城市的名称就像 "a" 后面跟着任何两个字符：

```sql
SELECT * FROM Customers
WHERE City LIKE 'a__';
```

## 以 ... 开头

1、返回所有以 'La' 开头的客户：

```sql
SELECT * FROM Customers
WHERE CustomerName LIKE 'La%';
```

2、返回所有以 'a' 或 'b' 开头的客户：

```sql
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%' OR CustomerName LIKE 'b%';
```

## 以 ... 结尾

1、返回所有以 'a' 结尾的客户：

```sql
SELECT * FROM Customers
WHERE CustomerName LIKE '%a';
```

2、返回所有以 "b" 开头并以 "s" 结尾的客户：

```sql
SELECT * FROM Customers
WHERE CustomerName LIKE 'b%s';
```

## 包含特定字符

返回所有包含短语 'or' 的客户：

```sql
SELECT * FROM Customers
WHERE CustomerName LIKE '%or%';
```

## 没有通配符

如果没有指定通配符，则短语必须完全匹配才能返回结果。和 `=` 操作符一样。

实例:

返回来自西班牙的所有客户：

```sql
SELECT * FROM Customers
WHERE Country LIKE 'Spain';
```
