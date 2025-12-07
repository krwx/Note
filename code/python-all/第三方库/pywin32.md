# pywin32

- [pywin32](#pywin32)
  - [windowsAPI](#windowsapi)
  - [pywin32模块](#pywin32模块)
  - [使用 excel com 组件](#使用-excel-com-组件)

```sh
conda install pywin32
```

## windowsAPI

Windows API（Application Programming Interface）是一组函数、数据结构、指令集等的集合，用于操作和控制 Windows 操作系统的各种功能和特性。它提供了一种通过编程方式与 Windows 进行交互的接口。

Windows API 允许开发人员使用编程语言（如C/C++、Python等）调用和使用 Windows 操作系统的内部功能

## pywin32模块

pywin32 是一个 Python 扩展模块，它提供了与 Windows 操作系统的 API 进行交互的功能。具体而言，pywin32 模块可以用于在 Python 中调用和操作 Windows 的各种系统功能，包括但不限于以下功能：

- 与 `Windows API` 的交互：pywin32 提供了对 Windows 的 API 函数的封装，使得在 Python 中可以直接调用这些 API 函数进行操作，如创建和管理进程、访问和修改注册表、操作文件和文件夹等。
- `COM` 组件和 `ActiveX` 对象的操作：pywin32 支持使用 COM 技术（Component Object Model）与 Windows 操作系统中的 COM 组件进行交互。通过pywin32，可以创建、操纵和使用COM组件、ActiveX对象和OLE对象，实现与Windows应用程序和组件的集成。
- `Windows` 服务的管理：pywin32 提供了管理 Windows 服务的功能，可以通过 pywin32 创建和管理 Windows 服务，包括安装、启动、停止和删除 Windows 服务。
- `GUI` 编程：pywin32 模块还提供了与 `Windows` 的图形用户界面（GUI）进行交互的功能。它可以创建和操作 `Windows` 窗口、对话框，以及访问和修改窗口控件的属性和事件。

## 使用 excel com 组件

```py
from win32com.client.gencache import EnsureDispatch

# 创建 excel 对象 
excel = EnsureDispatch("Excel.Application")

# 加载 workbook
workbook = excel.Workbooks("test.xlsb")

# 获取 sheet
sheet = workbook.Sheets("Sheet1")

# 获取 UsedRange
usedrange = sheet.UsedRange
cell = usedrange.Find("NAC", LookAt=True) # True 为匹配整个单词
```

使用 excel 的常量

```py
from win32com.client.gencache import EnsureDispatch
from win32com.client import constants

excel = EnsureDispatch("Excel.Application")
# 获取 sheet 对象
sheet = excel.Workbooks("test.xlsb").Sheets("Sheet1")

# 获取 sheet 的最后一行。sheet 最后一行的单元格使用了 constants.xlUp。
last_row = sheet.Cells(sheet.Rows.Count, 1).End(constants.xlUp).Row
```
