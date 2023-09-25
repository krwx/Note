# 方法

## BrowserWindow.fromWebContents(webContents)
参数：
* webContents。WebContents结构

返回值：
* 返回 `BrowserWindow | null` 
* 返回拥有给定 `webContents` 的窗口，否则如果内容不属于一个窗口，返回 `null` 。