# SSMS

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
