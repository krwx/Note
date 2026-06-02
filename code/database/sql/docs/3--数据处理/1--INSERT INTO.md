# INSERT INTO

- [INSERT INTO](#insert-into)
  - [插入多行](#插入多行)

INSERT INTO 语句用于在表中插入新记录。

编写 INSERT INTO 语句有两种方式：

**语法 1**：

同时指定列名和要插入的值：

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

**语法 2**：

如果要为表的所有列插入值，可以省略列名。但是，值的顺序必须与表中列的顺序相同：

```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

示例：

```sql
INSERT INTO Customers
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');

INSERT INTO Customers (CustomerName, City, Country)
VALUES ('Cardinal', 'Stavanger', 'Norway');
```

## 插入多行

可以在一个语句中插入多行。请确保每组值之间用逗号 `,` 分隔。

```sql
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES
('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway'),
('Greasy Burger', 'Per Olsen', 'Gateveien 15', 'Sandnes', '4306', 'Norway'),
('Tasty Tee', 'Finn Egan', 'Streetroad 19B', 'Liverpool', 'L1 0AA', 'UK');
```
