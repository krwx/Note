# SQL ALTER 语句详解

- [SQL ALTER 语句详解](#sql-alter-语句详解)
  - [主要用途分类](#主要用途分类)
    - [1. **修改表结构**](#1-修改表结构)
      - [添加列](#添加列)
      - [删除列](#删除列)
      - [修改列定义](#修改列定义)
      - [重命名列](#重命名列)
    - [2. **管理约束**](#2-管理约束)
      - [添加主键约束](#添加主键约束)
      - [添加外键约束](#添加外键约束)
      - [添加唯一约束](#添加唯一约束)
      - [添加检查约束](#添加检查约束)
      - [删除约束](#删除约束)
    - [3. **重命名表**](#3-重命名表)
    - [4. **管理索引**](#4-管理索引)
      - [创建索引](#创建索引)
      - [删除索引](#删除索引)
  - [数据库特定语法差异](#数据库特定语法差异)
    - [**MySQL**](#mysql)
    - [**SQL Server**](#sql-server)
  - [高级用法](#高级用法)
    - [1. **分区表操作**](#1-分区表操作)
    - [2. **修改表属性**](#2-修改表属性)
    - [3. **触发器管理**](#3-触发器管理)

ALTER 语句是 SQL 中用于修改现有数据库对象结构的关键命令，主要用于修改表、视图、索引等数据库对象。

## 主要用途分类

### 1. **修改表结构**

这是 ALTER 最常用的场景，用于修改已有表的定义。

#### 添加列

```sql
-- 基本语法
ALTER TABLE table_name
ADD column_name data_type [constraints];

-- 示例：添加一个名为 email 的 VARCHAR 列
ALTER TABLE users
ADD email VARCHAR(100);

-- 添加多个列（某些数据库支持）
ALTER TABLE employees
ADD (
    phone VARCHAR(20),
    hire_date DATE DEFAULT CURRENT_DATE
);
```

#### 删除列

```sql
-- 基本语法
ALTER TABLE table_name
DROP COLUMN column_name;

-- 示例：删除 address 列
ALTER TABLE customers
DROP COLUMN address;

-- 删除多个列（某些数据库支持）
ALTER TABLE products
DROP COLUMN old_price,
DROP COLUMN discount_rate;
```

#### 修改列定义

```sql
-- MySQL/PostgreSQL 修改列数据类型
ALTER TABLE users
ALTER COLUMN username TYPE VARCHAR(50);

-- SQL Server 修改列数据类型
ALTER TABLE users
ALTER COLUMN username VARCHAR(50);

-- 修改列约束
ALTER TABLE orders
ALTER COLUMN order_date SET NOT NULL;

-- 修改默认值
ALTER TABLE products
ALTER COLUMN price SET DEFAULT 0.00;

-- 删除默认值
ALTER TABLE products
ALTER COLUMN price DROP DEFAULT;
```

#### 重命名列

```sql
-- MySQL
ALTER TABLE employees
CHANGE old_column_name new_column_name data_type;

-- PostgreSQL/SQL Server
ALTER TABLE employees
RENAME COLUMN old_name TO new_name;
```

### 2. **管理约束**

#### 添加主键约束

```sql
ALTER TABLE students
ADD PRIMARY KEY (student_id);

-- 添加复合主键
ALTER TABLE enrollments
ADD PRIMARY KEY (student_id, course_id);
```

#### 添加外键约束

```sql
ALTER TABLE orders
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id) 
REFERENCES customers(customer_id);

-- 带级联选项
ALTER TABLE order_items
ADD CONSTRAINT fk_order
FOREIGN KEY (order_id)
REFERENCES orders(order_id)
ON DELETE CASCADE;
```

#### 添加唯一约束

```sql
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);
```

#### 添加检查约束

```sql
ALTER TABLE products
ADD CONSTRAINT check_price 
CHECK (price >= 0);
```

#### 删除约束

```sql
-- 删除主键
ALTER TABLE table_name
DROP PRIMARY KEY;

-- 删除外键
ALTER TABLE orders
DROP CONSTRAINT fk_customer;

-- 删除唯一约束
ALTER TABLE users
DROP CONSTRAINT unique_email;
```

### 3. **重命名表**

```sql
-- MySQL
ALTER TABLE old_table_name
RENAME TO new_table_name;

-- SQL Server
EXEC sp_rename 'old_table_name', 'new_table_name';
```

### 4. **管理索引**

#### 创建索引

```sql
-- 创建普通索引
ALTER TABLE employees
ADD INDEX idx_lastname (last_name);

-- 创建唯一索引
ALTER TABLE products
ADD UNIQUE INDEX idx_product_code (product_code);
```

#### 删除索引

```sql
ALTER TABLE employees
DROP INDEX idx_lastname;
```

## 数据库特定语法差异

### **MySQL**

```sql
-- 添加自增主键
ALTER TABLE users
MODIFY COLUMN user_id INT AUTO_INCREMENT PRIMARY KEY;

-- 修改引擎
ALTER TABLE orders ENGINE = InnoDB;

-- 添加全文索引
ALTER TABLE articles
ADD FULLTEXT(title, content);
```

### **SQL Server**

```sql
-- 添加标识列
ALTER TABLE employees
ADD employee_id INT IDENTITY(1,1);

-- 启用/禁用约束
ALTER TABLE orders
NOCHECK CONSTRAINT fk_customer;

-- 修改文件组
ALTER TABLE archive_data
MOVE TO archive_fg;
```

## 高级用法

### 1. **分区表操作**

```sql
-- 添加分区
ALTER TABLE sales
ADD PARTITION p2024 VALUES LESS THAN ('2025-01-01');

-- 删除分区
ALTER TABLE sales
DROP PARTITION p2020;

-- 合并分区
ALTER TABLE sales
MERGE PARTITIONS p2023_q1, p2023_q2
INTO PARTITION p2023_h1;
```

### 2. **修改表属性**

```sql
-- 设置表注释
ALTER TABLE employees 
COMMENT = '员工基本信息表';

-- 修改字符集
ALTER TABLE users
CONVERT TO CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 3. **触发器管理**

```sql
-- 启用/禁用触发器
ALTER TABLE orders
ENABLE TRIGGER trg_order_audit;

ALTER TABLE orders
DISABLE TRIGGER trg_order_audit;
```
