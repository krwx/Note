# input

- [input](#input)
  - [`<input type="file">`](#input-typefile)
    - [属性](#属性)
      - [accept](#accept)
    - [唯一文件类型说明符](#唯一文件类型说明符)

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
