# Outlook

## 使用

1. 创建 Outlook 应用对象
2. 调用 Outlook 应用对象的 createitem() 创建邮件

```vb
Sub TestOutlook
    Set OutApp = CreateObject("Outlook.Application")
    Set OutMail = OutApp.createitem(0)
    
    html = "<!DOCTYPE html><html><body>"
    html = html & "<div style='font-family:Arial, Helvetica; font-size: 14px; max-width: 768px;'>"
    html = html & "hello"
    html = html & "</div></body></html>"
    
    With OutMail
        .To = "abcd@123.com"
        .CC = ""
        .BCC = ""
        .Subject = "hello"
        .HTMLBody = html
        .display
    End With
    
    Set OutMail = Nothing
    Set OutApp = Nothing
End Sub
```
