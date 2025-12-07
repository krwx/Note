# MailItem

## 方法

### Display

为项目显示一个新的 Inspector 对象。即显示 Outlook 发送邮件的窗口。

```vb
Set OutApp = CreateObject("Outlook.Application")
Set OutMail = OutApp.createitem(0)
OutMail.Display
```

### Send

```vb
Set OutApp = CreateObject("Outlook.Application")
Set OutMail = OutApp.createitem(0)
OutMail.Send
```
