# SSMS

- [SSMS](#ssms)
  - [创建脚本](#创建脚本)
  - [删除表](#删除表)
  - [导出数据](#导出数据)
  - [修改列](#修改列)

## 创建脚本

[官网指导](https://learn.microsoft.com/en-us/ssms/scripting/generate-and-publish-scripts-wizard?f1url=%3FappId%3DDev15IDEF1%26l%3Den-US%26k%3Dk(sql13.swb.generatescriptswizard.setscriptingoptions.f1)%26rd%3Dtrue)

作用：创建脚本导出表结构和数据

step：

1. 右键数据库，选择 `Tasks-->Generate Scripts`
2. `Choose Objects`
   1. 选择 `Select specific database objects`
   2. 选择要导出的表
3. `Set Scripting Options`
   1. 选择 `Save as script file`，导出为 `sql` 文件
   2. 点击右上方的 `Advanced`
   3. 找到 `Types of data to script`
      - `Schema only`：只导出表结构
      - `Schema and data`：导出表结构和数据
4. 一直点击下一步直到保存脚本成功

执行脚本：

1. 将 sql 文件拖到 SSMS 里面，点击上方的 `Execute` 按钮

## 删除表

step：

1. 右键表，选择 `Delete`，会弹一个 Delete Object 窗口
2. 点击 Show Dependencies，可以看到该表的依赖项和 依赖本表的其他表
3. 点击 OK 删除表

## 导出数据

前提：安装 `SQL Server Native Client`（[下载地址](https://www.microsoft.com/en-us/download/details.aspx?id=50402)）

step:

1. 前往 `对象资源管理器`，右键数据库，选择 `Tasks-->Export Data`，会弹出 SQL Server 导出向导
2. 在 `Choose a Data Source` 窗口
   1. `Data source` 选择 `SQL Server Native Client 11.0`
   2. `Server name` 填导出数据的服务器地址
   3. 选择认证方式
   4. `Database` 填要导出数据的数据库
3. 在 `Choose a Destination` 窗口
   1. `Destination` 选择 `SQL Server Native Client 11.0`
   2. `Server name` 填导入数据的服务器地址
   3. 选择认证方式
   4. `Database` 填要导入数据的数据库
4. 选择 `Copy data from one or more tables or views`
5. 选择要导出的表
   1. 如果 `destination` 不存在该 `table`，会新建。
   2. 如果 `destination` 存在该 `table`，会追加数据。
6. 点击下一步直到完成导出

## 修改列

1、修改 varchar 的长度从 50 改为 100，SSMS 会报错：

```txt
Saving changes is not permitted. The changes you have made require the following tables to be dropped and re-created. You have either made changes to a table that can't be re-created or enabled the option Prevent saving changes that require the table to be re-created.
```

直接执行 ALTER 语句就好

```sql
ALTER TABLE table_name
ALTER COLUMN column_name VARCHAR(100) NULL;
```
