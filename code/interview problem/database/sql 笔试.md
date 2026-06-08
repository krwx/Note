# sql 笔试

- [sql 笔试](#sql-笔试)
  - [1、查询部门 ID 为 5 且月薪大于 10000 的员工姓名和入职日期](#1查询部门-id-为-5-且月薪大于-10000-的员工姓名和入职日期)
  - [2. 计算 2023 年每个用户的总消费金额,并筛选总金额超过 5000 元的用户](#2-计算-2023-年每个用户的总消费金额并筛选总金额超过-5000-元的用户)
  - [3. 使用窗口函数计算每个员工的薪水相对于上一年同一部门的平均薪水的增长比率](#3-使用窗口函数计算每个员工的薪水相对于上一年同一部门的平均薪水的增长比率)

## 1、查询部门 ID 为 5 且月薪大于 10000 的员工姓名和入职日期

场景: 员工表 employees 包含字段: emp_id(员工ID)、emp_name(姓名)、salary(月薪)、dept_id(部门ID)、hire_date(入职日期)。

```sql
SELECT emp_name, hire_date
FROM employees
WHERE dept_id = 5 AND salary > 10000;
```

## 2. 计算 2023 年每个用户的总消费金额,并筛选总金额超过 5000 元的用户

场景: 订单表 orders 包含字段: order_id(订单ID)、user_id(用户ID)、amount(金额)、order_date(日期)。

```sql
SELECT user_id, SUM(amount) AS total_amount
FROM orders
WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY user_id
HAVING total_amount > 5000;
```

## 3. 使用窗口函数计算每个员工的薪水相对于上一年同一部门的平均薪水的增长比率

场景: 员工表 employees 包含字段: employee_id,(员工ID)、emp_name(姓名)、salary(月薪)、department_id,(部门ID)、hire_date(入职日期)。

```sql
SELECT 
```
