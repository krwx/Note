# folat

- [folat](#folat)
  - [介绍](#介绍)
    - [规则说明](#规则说明)
    - [示例](#示例)
      - [示例1：文字环绕](#示例1文字环绕)
      - [示例2：块级元素重叠（未建立 BFC）](#示例2块级元素重叠未建立-bfc)
      - [示例3：块级元素重叠（建立 BFC）](#示例3块级元素重叠建立-bfc)
      - [示例4：浮动元素设置 margin](#示例4浮动元素设置-margin)
  - [clear 属性](#clear-属性)
  - [解决父容器高度塌陷](#解决父容器高度塌陷)
    - [1. 额外空标签法（传统方式）](#1-额外空标签法传统方式)
    - [2. 伪元素 clearfix 方法（最经典的现代方案）](#2-伪元素-clearfix-方法最经典的现代方案)
    - [3. 父元素设置 `overflow` 属性（触发 BFC）](#3-父元素设置-overflow-属性触发-bfc)
    - [4. 父元素设置 `display: flow-root`（最简洁的现代方案）](#4-父元素设置-display-flow-root最简洁的现代方案)
    - [5. 父元素也设置浮动（不推荐）](#5-父元素也设置浮动不推荐)
    - [6. 父元素设置 `position: absolute` 或 `fixed`](#6-父元素设置-position-absolute-或-fixed)
    - [原理：为什么 clear 能解决](#原理为什么-clear-能解决)
    - [原理：为什么父元素创建 BFC 后就能包含浮动元素](#原理为什么父元素创建-bfc-后就能包含浮动元素)

## 介绍

CSS 的 `Float` ，会使元素向左或向右移动，其周围的元素也会重新排列。设计初衷是为了实现文字环绕图片的效果。

**`float` 的值**：

- `left`：元素向左浮动
- `right`：元素向右浮动
- `none`：元素不浮动（默认值）
- `inline-start`：元素向行内起始位置浮动
- `inline-end`：元素向行内结束位置浮动

### 规则说明

- 浮动元素会尽可能地向左或向右移动，直到它的外边缘碰到**另一个块的边缘**，或者**另一个浮动元素的外边缘**，或者**页面的边缘**。
- 浮动元素会脱离正常的文档布局流
- 浮动元素**之前**的元素将**不会受到影响**。
- 浮动元素**之后**的元素将**受到影响**。
  - **后续的块级元素会忽略浮动元素**，它们会占据整个容器的宽度，就像浮动元素不存在一样。
    - 如果后续的块级元素建立了 `BFC`（例如设置了 `overflow: hidden`、`display: flex`、`float` 自身等），那么它将不会与浮动元素重叠，而是紧贴在浮动元素的边缘之后。
    - 如果后续的块级元素没有建立 `BFC`，块级元素的盒子可能会与浮动元素发生**重叠**（浮动元素悬在块级元素之上）。
    - 无论是否建立 `BFC`，**该块级元素内部的内联内容依然会环绕浮动元素**。
  - **后续的内联元素会环绕在浮动元素周围**

### 示例

#### 示例1：文字环绕

```html
<html>
<head>
<meta charset="utf-8"> 
</head>
<body>
<p>
<span style="font-size: 50px; float: right">test</span>
这是一些文本。这是一些文本。这是一些文本。
这是一些文本。这是一些文本。这是一些文本。
这是一些文本。这是一些文本。这是一些文本。
这是一些文本。这是一些文本。这是一些文本。
这是一些文本。这是一些文本。这是一些文本。
</p>
</body>
</html>
```

![float-1](../../img/float-1.png)

#### 示例2：块级元素重叠（未建立 BFC）

```html
<html>
<style>
.left {
  float: left;
  width: 100px;
  height: 100px;
  background-color: red;
}
.right {
  width: 100px;
  height: 200px;
  background-color: blue;
}
</style>
<body>
<div>
  <div class="left"></div>
  <div>
    <span>123423423234213423</span>
    <div class="right"></div>
  </div>
</div>
</body>
</html>
```

蓝色框和红色框重叠了，红色框在蓝色框上面，且文字环绕在红色框周围。

![float-2](../../img/float-2.png)

#### 示例3：块级元素重叠（建立 BFC）

```html
<html>
<style>
.left {
  float: left;
  width: 100px;
  height: 100px;
  background-color: red;
}
.right {
  width: 100px;
  height: 200px;
  background-color: blue;
  overflow: hidden; /* 建立 BFC */
}
</style>
<body>
<div>
  <div class="left"></div>
  <div>
    <span>123423423234213423</span>
    <div class="right"></div>
  </div>
</div>
</body>
</html>
```

建立 BFC 后，蓝色框不会与红色框重叠，而是紧贴在红色框的边缘之后。且文字环绕在红色框周围。

![float-3](../../img/float-3.png)

注意：此时，蓝色框如果设置了 `margin-left`，`margin-left` 的起始位置是父元素的左边界线，而不是红色框的右边界线。需要设置 `margin-left` 的值大于红色框的宽度，才能将蓝色框推开红色框。

```css
.right {
  width: 100px;
  height: 200px;
  background-color: blue;
  overflow: hidden; /* 建立 BFC */
  margin-left: 120px; /* 需要设置 margin-left 的值大于红色框的宽度，才能将蓝色框推开红色框 */
}
```

![float-4](../../img/float-4.png)

#### 示例4：浮动元素设置 margin

我们可以在浮动元素上应用 `margin`，对后续元素的影响如下：

1. **后续的内联内容（文本、行内元素）会遵守浮动元素的 `margin` 边界**，在环绕时与浮动元素保持距离。
2. **后续的块级元素（未创建 BFC）会忽略浮动元素的 `margin`**，与浮动元素的边框（而不是 `margin` 边界）发生重叠，**但其内部的内联内容仍会避开浮动元素及其 `margin`**。
3. **后续的块级元素（创建 BFC） 则会与浮动元素的 `margin` 边界 相邻**，不会重叠。

第 1、2 点的例子：

```html
<html>
<style>
.left {
  float: left;
  width: 100px;
  height: 100px;
  background-color: red;
  margin-right: 20px; /* 浮动元素设置 margin */
}
.right {
  width: 100px;
  height: 200px;
  background-color: blue;
}
</style>
<body>
<div>
  <div class="left"></div>
  <div>
    <span>123423423234213423</span>
    <div class="right"></div>
  </div>
</div>
</body>
</html>
```

红色框设置 margin-right 后，文本与红色框之间保持了 20px 的距离。蓝色框不受影响，仍然与红色框重叠。

![float-5](../../img/float-5.png)

第 3 点的例子：

```css
.right {
  width: 100px;
  height: 200px;
  background-color: blue;
  overflow: hidden; /* 建立 BFC */
}
```

蓝色框建立 BFC 后，蓝色框与红色框之间保持了 20px 的距离，不再重叠。

![float-6](../../img/float-6.png)

## clear 属性

`clear` 属性用于控制浮动元素对当前元素盒子的影响。

工作原理：

- 浏览器会在设置了 `clear` 属性的元素上方添加足够的“清除空间”（`margin-top` 会失效，转为上方间距），确保元素出现在浮动元素的下方。
- `clear` 只对块级元素生效。如果应用在内联元素上，将不会产生任何效果。
- `clear` 清除的是它**前面的**浮动元素，不影响**后面的**元素。

**值说明**：

- `none`：默认值，允许左右两侧出现浮动元素
- `left`：左侧**不允许**有浮动元素（元素移到任何左浮动元素的**下面**）
- `right`：右侧**不允许**有浮动元素（元素移到任何右浮动元素的**下面**）
- `both`：左右两侧**都不允许**有浮动元素（最常用）

**`clear: left` 的效果**：

```html
<html>
<style>
.left {
  float: left;
  width: 100px;
  height: 100px;
  background-color: red;
}
.right {
  width: 100px;
  height: 200px;
  background-color: blue;
}
</style>
<body>
<div>
  <div class="left"></div>
  <div style="clear: left;"> <!-- clear: left -->
    <span>123423423234213423</span>
    <div class="right"></div>
  </div>
</div>
</body>
</html>
```

右边的部分不允许左边有浮动的元素，因此右边的部分被推到了红色框的下面。且文字不再环绕在红色框周围。

![float-7](../../img/float-7.png)

`clear: right` 的效果：

```html
<html>
<style>
.left {
  float: right; /* 浮动元素向右浮动 */
  width: 100px;
  height: 100px;
  background-color: red;
}
.right {
  width: 100px;
  height: 200px;
  background-color: blue;
}
</style>
<body>
<div>
  <div class="left"></div>
  <div style="clear: right;"> <!-- clear: right -->
    <span>123423423234213423</span>
    <div class="right"></div>
  </div>
</div>
</body>
</html>
```

设置红色框往右浮动，水平方向上红色框和蓝色框重叠了。

![float-8](../../img/float-8.png)

设置 `clear: right` 后，蓝色框部分不允许右边有浮动的元素，因此蓝色框部分被推到了红色框的下面。

![float-9](../../img/float-9.png)

## 解决父容器高度塌陷

问题：当子元素全部浮动时，子元素脱离了文档流，父容器在计算高度时，不会将浮动的子元素的高度计算在内，导致父容器的高度变为 0。现在需要父容器高度仍然能够包裹住子元素。

例子：

```html
<html>
<style>
.left {
  float: left;
  width: 100px;
  height: 100px;
  background-color: red;
}
.right {
  float: left;
  width: 100px;
  height: 200px;
  background-color: blue;
}
</style>
<body>
<div class="parent" style="background-color: black;">
  <div class="left"></div>
  <div class="right"></div>
</div>
</body>
</html>
```

在红框和蓝框没设置 `float` 时，父容器（黑色框）的高度会被撑开，包裹住红框和蓝框。

![float-10](../../img/float-10.png)

在红框和蓝框设置 `float` 后，父容器（黑色框）的高度变为 0，无法包裹住红框和蓝框。

![float-11](../../img/float-11.png)

现在需要父容器高度仍然能够包裹住子元素，效果如下：

![float-12](../../img/float-12.png)

解决方法如下：

### 1. 额外空标签法（传统方式）

在父容器内的最后，添加一个空的块级元素（如 `<div>`），并为其设置 `clear: both`。

```html
<div class="parent">
  <div class="float-child"></div>
  <div style="clear: both;"></div>
</div>
```

**缺点**：增加无意义的 HTML 结构，不够语义化。

### 2. 伪元素 clearfix 方法（最经典的现代方案）

利用 `::after` 伪元素，在父容器内部最后添加一个看不见的块，并清除浮动。

```css
.parent::after {
  content: "";
  display: table;   /* 或者 block */
  clear: both;
}
```

**优点**：无额外 DOM 元素，兼容性好，是长期推荐的做法。

### 3. 父元素设置 `overflow` 属性（触发 BFC）

为父容器设置 `overflow: auto` 或 `overflow: hidden`，可以创建一个 BFC，使其包含浮动元素。

```css
.parent {
  overflow: hidden; /* 或 auto */
}
```

**优点**：简单，无需额外元素。  
**缺点**：如果父容器内有需要溢出显示的内容（如下拉菜单、阴影），`overflow: hidden` 会将其裁剪。

### 4. 父元素设置 `display: flow-root`（最简洁的现代方案）

`flow-root` 是专门为解决浮动塌陷而生的属性，它会创建一个新的 BFC，且没有任何副作用。

```css
.parent {
  display: flow-root;
}
```

**优点**：语义清晰，代码极简，无副作用。  
**缺点**：在较老浏览器（如 IE）中不支持，但现代项目可放心使用。

### 5. 父元素也设置浮动（不推荐）

让父容器也成为浮动元素，会使其自动包裹子元素高度，但可能导致父容器之外的布局错乱，且需要额外清除父元素带来的浮动影响。

```css
.parent {
  float: left;
}
```

**缺点**：副作用大，通常不单独使用，往往需要配合其他清除浮动的方案。

### 6. 父元素设置 `position: absolute` 或 `fixed`

绝对定位或固定定位也会创建 BFC，使父容器包裹浮动子元素。但这会使父容器脱离文档流，影响后续布局，一般不用于解决高度塌陷。

```css
.parent {
  position: absolute;
}
```

### 原理：为什么 clear 能解决

`clearfix` 方法的本质是：在父容器的末尾插入一个“虚拟”的块级元素，并给这个元素设置 `clear: both`，强制它移动到所有浮动元素的下方。父容器为了包含这个虚拟元素，其高度就会被撑开，从而也把浮动元素包裹进来。

### 原理：为什么父元素创建 BFC 后就能包含浮动元素

当一个元素创建了**块级格式化上下文**（BFC，Block Formatting Context）后，它就会变成一个独立的渲染区域，这个区域与外部隔绝，容器内部的元素无论怎样浮动、外边距如何，都不会“泄漏”到外面

BFC 的一条关键规则就是：**BFC 在计算自身高度时，会将其内部的浮动元素高度也计算在内**。这就是为什么触发 BFC 可以解决父容器高度塌陷的根本原因。
