# dialog
显示用于打开和保存文件、警报等的本机系统对话框。

## 方法

### showOpenDialog
作用：打开文件对话框

语法：  
`dialog.showOpenDialog([browserWindow, ]options)`

返回 `Promise<Object>` - resolve包含以下内容的object：
* `canceled` boolean - 对话框是否被取消。
* `filePaths` string[] - 用户选择的文件路径的数组. 如果对话框被取消，这将是一个空的数组。
* `bookmarks` string[] (optional) (macOS MAS) - 一个数组， filePaths 数组，base64编码字符串包含安全范围书签数据。 securityScopedBookmarks 必须启用才能捕获数据。 (返回值见 这里的表格。)