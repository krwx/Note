# InputBox

在对话框中显示提示，等待用户输入文本或单击按钮，然后**返回包含文本框内容的字符串**。

语法：`InputBox (prompt，[title]，[default]，[xpos]，[ypos]，[helpfile，context])`

- prompt
  - 必需项。
  - 字符串表达式在对话框中显示为消息。 prompt 的最大长度约为 1024 个字符，具体取决于所使用的字符的宽度。
  - 如果 `prompt` 包含多行， 可以使用回车符 `(Chr(13))` 、换行符 `(Chr (10))` 或回车换行符组合 `((Chr(13) & (Chr(10))` 来分隔各行。
- title
  - 可选。
  - 对话框标题栏中显示的字符串表达式。 如果省略 title，则标题栏中将显示应用程序名称。
- default
  - 可选。
  - 文本框中显示的字符串表达式，在未提供其他输入时作为默认响应。 如果省略了 default，文本框将显示为空。
- xpos
  - 可选。
  - 指定对话框的左边缘与屏幕的左边缘的水平距离（以缇为单位）的数值表达式。 如果省略了 xpos，对话框将水平居中。
- ypos
  - 可选。
  - 指定对话框的上边缘与屏幕的顶部的垂直距离（以缇为单位）的数值表达式。 如果省略了 ypos，对话框将位于屏幕垂直方向往下大约三分之一的位置。
- helpfile（少用）
  - 可选。
  - 用于标识帮助文件的字符串表达式，前者用于为对话框提供上下文相关的帮助。 如果提供 helpfile，则也必须提供 context。
- context（少用）
  - 可选。
  - 帮助上下文数值的数值表达式，该数值由帮助作者为相应的帮助主题分配。 如果提供 context，则也必须提供 helpfile。

例子：

- 如果用户选择“确定”或按 Enter 键，变量MyValue将包含用户输入的值。
- **如果用户选择 “取消”，则返回长度为零的字符串**。

```vb
Dim Message, Title, Default, MyValue
Message = "Enter a value between 1 and 3"    ' Set prompt.
Title = "InputBox Demo"    ' Set title.
Default = "1"    ' Set default.

' Display message, title, and default value.
MyValue = InputBox(Message, Title, Default)

' Use Helpfile and context. The Help button is added automatically.
MyValue = InputBox(Message, Title, , , , "DEMO.HLP", 10)

' Display dialog box at position 100, 100.
MyValue = InputBox(Message, Title, Default, 100, 100)
```
