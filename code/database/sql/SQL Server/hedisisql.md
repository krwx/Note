# hedisisql

hedisisql 不能完全支持 sqlserver

- 在 hedisisql 界面里面，默认列那里给字段设置 `AUTO_INCREMENT` 是会报错的，不能这样给字段设置为自增。
- 通过 sql 语句创建了有自增 id 的表，hedisisql 不能显示自增的信息。因为自增是通过 `IDENTITY` 设置的
