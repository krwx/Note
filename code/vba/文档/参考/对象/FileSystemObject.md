# FileSystemObject 对象

提供对计算机文件系统的访问权限。

说明：

下面的代码展示了如何使用 FileSystemObject 对象来返回可读取或写入的 TextStream 对象：

```VB
Set fs = CreateObject("Scripting.FileSystemObject")
Set a = fs.CreateTextFile("c:\testfile.txt", True)
a.WriteLine("This is a test.")
a.Close
```

在示例代码中：

- CreateObject 函数返回 FileSystemObject (fs)。
- CreateTextFile 方法创建文件作为 TextStream 对象 (a)。
- WriteLine 方法将一行文本写入创建的文本文件。
- Close 方法刷新缓冲区并关闭文件。
