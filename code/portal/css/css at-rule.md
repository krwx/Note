# css at-rule

- [css at-rule](#css-at-rule)
  - [font-face](#font-face)
    - [src 属性](#src-属性)

## font-face

`@font-face` CSS at-rule **指定一个用于显示文本的自定义字体**；字体能从远程服务器或者用户本地安装的字体加载。

取值：

- `font-family`
  - 所指定的字体名字将会被用于 font 或 font-family 属性 ( `i.e. font-family: <family-name>;`)
- `src`
  - 远程字体文件位置的 URL 或者用户计算机上的字体名称，可以使用 local 语法通过名称指定用户的本地计算机上的字体 ( `i.e. src: local('Arial');` )。如果找不到该字体，将会尝试其他来源，直到找到它。
- `font-variant`
- `font-stretch`
- `font-weight`
- `font-style`
  - 对于 src 所指字体的描述。如果所需字体符合描述，则采用本 font-face 所定义的字体。

例子：

```css
@font-face {
  font-family: "Open Sans";
  src:
    url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
    url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
}

/* 使用 Open Sans 字体 */
.iconfont {
  font-family: "Open Sans" !important;
  font-size: 16px;
  font-style: normal;
}
```

### src 属性

`@font-face` 中的 `src` 描述符指定了包含字体数据的资源。

它的值是一个有**优先级**的，以**逗号分割**的外部引用或者本地安装的字体名称。

- 当需要使用字体时，用户代理（指浏览器的意思）将会使用以逗号分隔的参考集中能成功激活的**第一个参考值**。
- 如果是包含无效数据的字体或者本地的字体资源不存在，用户代理将会忽略当前字体并且加载下一个字体。

取值：

- `<url> [ format( <string># ) ]?`
  - 指定一个外部引用，该引用由`“＜url＞（）”`组成，后跟一个**可选提示**，使用 `format()` 函数来描述该URL引用的**字体资源的格式**。
    - `format()` 函数的参数为一个逗号分隔的格式字符串列表，这些字符串表示众所周知的字体格式。如果用户代理不支持指定的格式，它将跳过下载字体资源。如果没有提供格式提示，则始终下载字体资源。
- `<font-face-name>`
  - 使用 `local()` 函数指定本地安装的字体的名称

例子：

```css
@font-face {
  font-family: examplefont;
  src:
    local(Example Font),
    url("examplefont.woff") format("woff"),
    url("examplefont.otf") format("opentype");
}
```
