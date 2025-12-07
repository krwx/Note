# SQL Server

- [SQL Server](#sql-server)
  - [表](#表)
    - [创建表](#创建表)
      - [设置自增列](#设置自增列)
      - [NULL](#null)
    - [修改表](#修改表)
  - [Sequence](#sequence)
  - [Schema](#schema)
    - [dbo](#dbo)
  - [用户](#用户)
    - [创建用户](#创建用户)

## 表

### 创建表

#### 设置自增列

使用 `IDENTITY(起始值, 增量)`：`IDENTITY(1,1)` 表示从 1 开始，每次自增 1。

```sql
CREATE TABLE 表名 (
    ID INT IDENTITY(1,1) PRIMARY KEY,  -- 自增列，从1开始，每次增加1
    列名1 数据类型,
    列名2 数据类型,
    ...
);
```

#### NULL

在数据类型后面声明 `NULL` 。声明之后默认值就会为 `NULL`，不用再设置默认值。

```sql
CREATE TABLE 表名 (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    [status] VARCHAR (50) NULL,
    ...
);
```

### 修改表

SQL Server 不允许直接修改现有列为 IDENTITY。需通过以下步骤：

- 创建新表（带自增列）。
- 将旧表数据迁移到新表。
- 删除旧表。
- 重命名新表为旧表名。

## Sequence

在 `DataBase-->Programmability-->Sequences` 可以查看 Sequence

个人理解：Sequence 是一个序列，声明了数字的范围，可以用于设置 id

**使用例子**：

在插入数据时可以用 `NEXT VALUE FOR [sequence]` 获取序列下一个数字，用来做数据

`INSERT INTO celery_taskmeta (id, task_id) OUTPUT inserted.id VALUES (NEXT VALUE FOR task_id_sequence, '123')`

## Schema

### dbo

- `dbo schema` 是每一个数据库的默认 `schema`。
- 默认情况下，通过 `create user Transact-SQL` 命令创建的用户拥有 `dbo` 作为他们默认的 `schema`。
- `dbo schema` 被 dbo 用户账户拥有。
- DBO 是 DataBase Owner 的缩写

## 用户

### 创建用户

1. 进入 SSMS，点击服务器的 Security 的 Logins
2. 右键 Logins，点击 New Login
3. 输出 Login name，即用户名
4. 选择 SQL Server authentication
5. 输入密码
6. 点击 User Mapping，选择用户可以访问的数据库
7. 点击最下面的 OK 按钮
