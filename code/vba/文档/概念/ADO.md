# ADO

Reference 选择以下库：

- Microsoft ADO Ext 6.x for DDL and Security
- Microsoft ActiveX Data Objects (Multi-dimensional) 6.x Library
- Microsoft ActiveX Data Objects Recordset 6.x Library
- Microsoft ActiveX Data Objects 6.x LibraryMicrosoft Jet and Replication Objects 6.x Library

## 连接 MySQL

安装 ODBC 驱动

```vb
   Dim strConnect As String
    Dim cnn As Object  'New ADODB.Connection
    Dim rst As Object
    Dim strSQL As String

    strConnect = "DRIVER={MySQL ODBC 8.0 Unicode Driver};SERVER=localhost;DATABASE=mydata_Test;USER=root;PASSWORD=123456;OPTION=3;"


    Set cnn = CreateObject("ADODB.Connection")

    cnn.ConnectionString = strConnect
    cnn.Open
    If cnn.State Then MsgBox "链接成功。", vbInformation

    strSQL = "select count(1) FCount from t_test "
    Set rst = CreateObject("ADODB.Recordset")
    rst.Open strSQL, cnn, 2, 3
    Debug.Print rst!FCount
    rst.Close
```

## 使用 excel 工作簿作为数据源

[参考1](https://chandoo.org/wp/using-excel-as-your-database/)

[参考2](https://zhuanlan.zhihu.com/p/413420652)

`connect` 的字符串会不一样，需要用 `Microsoft Excel Driver` 作为 `Driver`，使用目标工作簿作为 `DBQ`。其余的操作与连接 `MySQL` 一样

```vb
cnn.ConnectionString = "Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ=" & _
ActiveWorkbook.Path & Application.PathSeparator & ActiveWorkbook.Name
```

SQL 语句的写法不一样：

- 表名为 sheet 的名字，写成 `[sheetName$]`
- 列名对应数据库表格的列名，写成 `[columnName]`

例子：`SELECT * FROM [data$] WHERE [Product]='apple'` 。  
`data` 为 `sheet` 的名字， `Product` 为列名

## 使用 Access 连接 excel 工作簿

[参考](https://zhuanlan.zhihu.com/p/685506809)

```vb
Sub TestDatabase1()
    Dim MyConnect As String
    Dim MyRecordset As ADODB.Recordset
    Dim MySQL As String

    MyConnect = "Provider=MySQL.OLEDB.1;Data Source=" & ThisWorkbook.FullName & ";Extended Properties=Excel 12.0"

    MySQL = "Select * From Sheet1"
    Set MyRecordset = New ADODB.Recordset 
    MyRecordset.Open MySQL, MyConnect, asOpenStatic, adLockReadOnly

    ThisWorkbook.Sheets.Add
    ActiveSheet.Range("A2").CopyFromRecordset MyRecordset
End Sub
```
