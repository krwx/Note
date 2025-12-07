# input

- [input](#input)
  - [type 类型](#type-类型)
    - [📝 文本输入类](#-文本输入类)
    - [🔢 数字选择类](#-数字选择类)
    - [📅 日期时间类](#-日期时间类)
    - [✅ 选择类](#-选择类)
    - [📁 文件上传](#-文件上传)
    - [🎨 特殊输入](#-特殊输入)
    - [🖱️ 按钮类](#️-按钮类)
    - [📋 示例代码](#-示例代码)
  - [`<input type="file">`](#input-typefile)
    - [属性](#属性)
      - [accept](#accept)
    - [唯一文件类型说明符](#唯一文件类型说明符)

## type 类型

### 📝 文本输入类

- **`text`** - 单行文本输入（默认）
- **`password`** - 密码输入（隐藏字符）
- **`email`** - 电子邮件地址输入
- **`tel`** - 电话号码输入
- **`url`** - URL地址输入
- **`search`** - 搜索框
- **`hidden`** - 隐藏输入字段

### 🔢 数字选择类

- **`number`** - 数字输入（带增减按钮）
- **`range`** - 滑块控件（范围选择）

### 📅 日期时间类

- **`date`** - 日期选择器
- **`time`** - 时间选择器
- **`datetime-local`** - 本地日期时间选择器
- **`month`** - 年月选择器
- **`week`** - 周选择器

### ✅ 选择类

- **`checkbox`** - 复选框
- **`radio`** - 单选框

### 📁 文件上传

- **`file`** - 文件选择器

### 🎨 特殊输入

- **`color`** - 颜色选择器

### 🖱️ 按钮类

- **`submit`** - 提交按钮
- **`reset`** - 重置按钮
- **`button`** - 普通按钮
- **`image`** - 图像提交按钮

### 📋 示例代码

```html
<!-- 文本输入 -->
<input type="text" placeholder="用户名">
<input type="email" placeholder="邮箱">

<!-- 数字 -->
<input type="number" min="0" max="100">

<!-- 日期 -->
<input type="date">
<input type="time">

<!-- 选择 -->
<input type="checkbox" id="agree">
<input type="radio" name="gender" value="male">

<!-- 文件 -->
<input type="file">

<!-- 按钮 -->
<input type="submit" value="提交">
<input type="button" value="点击我">

<!-- 颜色 -->
<input type="color">
```

## `<input type="file">`

带有 `type="file"` 的 `<input>` 元素允许用户可以从他们的设备中选择一个或多个文件。选择后，这些文件可以使用提交表单的方式上传到服务器上，或者通过 Javascript 代码和文件 API 对文件进行操作。

### 属性

#### accept

`accept` 属性是一个字符串，它定义了文件 `input` 应该接受的文件类型。这个字符串是一个以**逗号**为分隔的唯一文件类型说明符列表。

```html
<input
  type="file"
  id="docpicker"
  accept=".doc,.docx,application/msword" />
```

### 唯一文件类型说明符

唯一文件类型说明符是一个**字符串**，表示在 `file` 类型的 `<input>` 元素中用户可以选择的文件类型。每个唯一文件类型说明符可以采用下列形式之一：

- 一个以英文句号（“.”）开头的合法的不区分大小写的文件名扩展名。例如：`.jpg`、`.pdf` 或 `.doc`。
- 一个不带扩展名的 MIME 类型字符串。
- 字符串 `audio/*`，表示“**任何音频文件**”。
- 字符串 `video/*`，表示“**任何视频文件**”。
- 字符串 `image/*`，表示“**任何图片文件**”。
