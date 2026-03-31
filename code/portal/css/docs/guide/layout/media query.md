# 媒体查询

- [媒体查询](#媒体查询)
  - [介绍](#介绍)
  - [查询语法](#查询语法)
    - [`@media` 规则](#media-规则)
    - [`media=` 属性](#media-属性)
  - [媒体类型](#媒体类型)
  - [媒体特性](#媒体特性)
  - [逻辑运算符](#逻辑运算符)

## 介绍

媒体查询（media query）是 CSS3 中引入的一种功能，允许内容的呈现适应不同的输出设备和环境。  

媒体查询是响应式设计的核心技术之一，使得网页能够在各种设备上提供良好的用户体验。

## 查询语法

### `@media` 规则

`@media` 规则可用于基于一个或多个媒体查询的结果来应用样式表的一部分。  

使用它，你可以指定一个媒体查询和一个 CSS 块，当且仅当该媒体查询与正在使用其内容的设备匹配时，该 CSS 块才能应用于该文档。

语法（**在 @media 块内写 css 规则**）：

```css
@media not|only mediatype and (expressions) {
    /* CSS 代码...; */
}
```

例子：

```css
@media (min-width: 576px) {
  .app {
    display: inline;
  }
}

/* 嵌套至其他的 at 条件规则中 */
@supports (display: flex) {
  @media screen and (min-width: 900px) {
    article {
      display: flex;
    }
  }
}
```

搭配 `em`、`rem` 使用：

```css
@media (min-width: 30rem) {
  /* 当视口宽度至少为 30rem 时应用的样式 */
  .container {
    width: 20rem;
  }
}
```

### `media=` 属性

`media` 属性可用于在不同的媒体上使用不同的样式文件

```html
<link rel="stylesheet" src="styles.css" media="screen" />
<link rel="stylesheet" src="styles.css" media="print" />
```

## 媒体类型

媒体类型（media type）描述设备的一般类别。没有指定媒体类型会被认为是 `all`。

- all
  - 适用于所有设备
- print
  - 用于打印机
- screen
  - 主要用于屏幕
- speech
  - 用于屏幕阅读器

```css
@media print {
  body {
    font-size: 12pt;
  }
}

@media screen {
  body {
    font-size: 16px;
  }
}
```

## 媒体特性

媒体特性（media feature）描述了用户代理、输出设备或环境的具体特征。

|媒体特征|含义|
|--|--|
|max-color|最大颜色|
|max-color-index|最大颜色索引|
|max-aspect-ratio|最大宽高比|
|max-device-aspect-ratio|最大设备屏幕宽高比|
|max-device-height|设备屏幕的最大高度|
|max-device-width|设备屏幕的最大宽度|
|max-height|最大高度|
|max-monochrome|每个像素的最大单色原件个数|
|max-resolution|最大分辨率|
|max-width|最大宽度|
|min-color|最小颜色|
|min-color-index|最小颜色索引|
|min-aspect-ratio|最小宽高比|
|min-device-aspect-ratio|最小设备屏幕宽高比|
|min-device-height|设备屏幕的最小高度|
|min-device-width|设备屏幕的最小宽度|
|min-height|最小高度|
|min-width|属性为给定元素设置最小宽度。|
|min-monochrome|每个像素的最小单色原件个数|
|min-resolution|最小分辨率|
|orientation|定义输出设备中的页面可见区域高度是否大于或等于宽度。|
|prefers-color-scheme|检测用户倾向于选择亮色还是暗色的配色方案。于媒体查询第 5 版中被添加。|

例子：

```css
/* 在屏幕可视窗口尺寸小于 480 像素的设备上修改背景颜色 */
@media screen and (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
```

## 逻辑运算符

逻辑运算符 `not`、`and`、`only` 和 `or` 可用于联合构造复杂的媒体查询

> `or` 是 css4 新语法，与 `,` 等价

```css
/* 宽度至少为 30 em 的横向的设备 */
@media (min-width: 30em) and (orientation: landscape) { ... }

/* 宽度至少为 30 em 的横向的带屏幕的设备 */
@media screen and (min-width: 30em) and (orientation: landscape) { ... }
```

当只要匹配各种媒体特性中的任何一种时，可以使用 `,` 分隔的列表来应用样式。

```css
/* 设备的最小高度为 680px 或为纵向模式的屏幕设备 */
@media (min-height: 680px), screen and (orientation: portrait) { ... }
```

`not` 关键字会反转整个媒体查询的含义。它只会否定要应用的特定媒体查询。 （因此，它不会应用于以 `,` 分隔的媒体查询列表中的每个媒体查询。）

```css
@media not all and (monochrome) { ... }
/* 等价于 */
@media not (all and (monochrome)) { ... }
```

```css
@media not screen and (color), print and (color) { ... }
/* 等价于 */
@media (not (screen and (color))), print and (color) { ... }
```
