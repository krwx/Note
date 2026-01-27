# MySQL

密码：1234

sql server: 123456asd!

## 安装

<https://blog.csdn.net/xx16755498986/article/details/132411950>

## 表

### 创建

#### id 自增

通过声明 `AUTO_INCREMENT` 表示自增

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);
```
