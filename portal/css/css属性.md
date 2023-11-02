- [display](#display)
  - [inline值](#inline值)
- [position](#position)
- [box-shadow](#box-shadow)
  - [语法](#语法)
- [white-space](#white-space)
- [text](#text)
  - [text-overflow](#text-overflow)
    - [语法](#语法-1)
- [background](#background)
  - [background-image](#background-image)
  - [background-position](#background-position)
  - [background-size](#background-size)
- [font](#font)
  - [font-family](#font-family)
  - [font-style](#font-style)
  - [font-weight](#font-weight)
- [filter](#filter)


# display
display 属性设置元素是否被视为块或者内联元素以及用于子元素的布局，例如流式布局、网格布局或弹性布局。  

默认值为 **inline**。不能继承

| 值	| 描述 |
| ---- | ---- |
|none|	此元素不会被显示。
|block|	此元素将显示为块级元素，此元素前后会带有换行符。
|inline|	默认。此元素会被显示为内联元素，元素前后没有换行符。
|inline-block|	行内块元素。（CSS2.1 新增的值）
|inline-flex| 
|inline-grid|
|list-item|	此元素会作为列表显示。
|run-in|	此元素会根据上下文作为块级元素或内联元素显示。
|table|	此元素会作为块级表格来显示（类似 `<table>`），表格前后带有换行符。
|inline-table|	此元素会作为内联表格来显示（类似 `<table>`），表格前后没有换行符。
|table-row-group|	此元素会作为一个或多个行的分组来显示（类似 `<tbody>`）。
|table-header-group|	此元素会作为一个或多个行的分组来显示（类似 `<thead>`）。
|table-footer-group|	此元素会作为一个或多个行的分组来显示（类似 `<tfoot>`）。
|flow-root|	**生成一个块级元素盒**，其会建立一个新的**块级格式化上下文**，定义格式化上下文的根元素。
|table-row|	此元素会作为一个表格行显示（类似 `<tr>`）。
|table-column-group|	此元素会作为一个或多个列的分组来显示（类似 `<colgroup>`）。
|table-column|	此元素会作为一个单元格列显示（类似 `<col>`）
|table-cell|	此元素会作为一个表格单元格显示（类似 `<td>` 和 `<th>`）
|table-caption|	此元素会作为一个表格标题显示（类似 `<caption>`）
|inherit|	规定应该从父元素继承 display 属性的值。
|flex|  flex布局
|grid|  grid布局

## inline值
display: inline：元素为内联，不代表元素内的元素是内联的。该值只针对当前元素。

**inline、block、inline-block的区别**：  
* inline（行内元素）:  
  * 使元素变成行内元素，拥有行内元素的特性，即可以与其他行内元素共享一行，不会独占一行.   
  * 不能更改元素的height，width的值，大小由内容撑开.   
  * 可以部分设置margin,padding属性：可以设置水平方向上的（left,right），不可以设置垂直方向上的（top,bottom）
  * 常见的行内元素有：span,a,strong,em,input,img,br等
  * 只有设置行高才可以增加行内框的高度（line-height）
* block（块级元素）:  
  * 使元素变成块级元素，独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度. 
  * 能够改变元素的height，width的值. 
  * 可以设置padding，margin的各个属性值，top，left，bottom，right都能够产生边距效果.
* inline-block（融合行内于块级）:
  * 结合了inline与block的一些特点，结合了上述inline的第1个特点和block的第2,3个特点。即元素共享一行，但是可以改变元素的 height 、 width 值。
  * 让元素像行内元素一样水平的依次排列，但是框的内容仍然符合块级框的行为。
  * 不独占一行，多个相邻的行内元素仍在一行内排列，直到排列不下才换行。
  * 可以设置width,height。可以设置padding,margin。


# position
定位 (positioning) 能够让我们把一个元素从它原本在正常布局流 (normal flow) 中应该在的位置移动到另一个位置。  
position 属性指定了元素的定位类型。  
position 属性的五个值：static、relative、fixed、absolute、sticky。  
**position 属性的默认值为 static**

* static 定位  
HTML 元素的默认值，即没有定位，遵循正常的文档流对象。  
静态定位的元素不会受到 top, bottom, left, right影响。
* fixed 定位  
元素的位置**相对于浏览器窗口**是固定位置。  
即使窗口是滚动的它也不会移动  
**Fixed定位使元素的位置与文档流无关，因此不占据空间。**
Fixed定位的元素和其他元素重叠。
* relative 定位  
相对定位元素的定位是相对其正常位置。  
移动相对定位元素，但它原本所占的空间不会改变。  
**相对定位元素经常被用来作为绝对定位元素的容器块。**  
* absolute 定位  
绝对定位的元素的位置相对于最近的已定位父元素（即非 static 的父元素），如果元素没有已定位的父元素，那么它的位置相对于`<html>`。  
脱离了文档流
* sticky 定位  
sticky 定位可以称之为粘性定位。  
粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。  
**它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。**  
元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。  
这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。 

z-index属性：  
* z-index属性指定了一个元素的堆叠顺序（哪个元素应该放在前面，或后面）
* 一个元素可以有正数或负数的堆叠顺序
* 具有更高堆叠顺序的元素总是在较低的堆叠顺序元素的前面。
* 注意： 如果两个定位元素重叠，没有指定z - index，最后定位在HTML代码中的元素将被显示在最前面。

# box-shadow
- CSS box-shadow 属性用于在元素的框架上添加阴影效果。
- 你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。
- 该属性可设置的值包括阴影的 X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。

## 语法
```css
/* x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow:
  3px 3px red,
  -1em 0 0.4em olive;
```

向元素添加单个 box-shadow 效果时使用以下规则：

- 当给出两个、三个或四个 `<length>`值时。
  - 如果只给出两个值，那么这两个值将会被当作 `<offset-x><offset-y>` 来解释。
  - 如果给出了第三个值，那么第三个值将会被当作`<blur-radius>`解释。
  - 如果给出了第四个值，那么第四个值将会被当作`<spread-radius>`来解释。
- 可选，inset关键字。
- 可选，`<color>`值。

取值：

- `inset`
  - 如果没有指定inset，**默认阴影在边框外**，即阴影向外扩散。 使用 inset 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。此时阴影会在边框之内 (即使是透明边框）、背景之上、内容之下。
- `<offset-x> <offset-y>`
  - 这是头两个 `<length>` 值，用来设置阴影偏移量。x,y 是按照数学二维坐标系来计算的，只不过 y 垂直方向向下。 
  - `<offset-x>` 设置水平偏移量，正值阴影则位于元素右边，负值阴影则位于元素左边。 
  - `<offset-y>` 设置垂直偏移量，正值阴影则位于元素下方，负值阴影则位于元素上方。可用单位请查看 `<length>` 。 
  - 如果两者都是 0，那么阴影位于元素后面。这时如果设置了`<blur-radius>` 或`<spread-radius>` 则有模糊效果。需要考虑 inset
- `<blur-radius>` 
  - 这是第三个 `<length>` 值。值越大，模糊面积越大，阴影就越大越淡。不能为负值。默认为 0，此时阴影边缘锐利。本规范不包括如何计算模糊半径的精确算法，但是，它详细说明如下：
  - 对于长而直的阴影边缘，它会创建一个过渡颜色用于模糊 以阴影边缘为中心、模糊半径为半径的局域，过渡颜色的范围在完整的阴影颜色到它最外面的终点的透明之间。 （译者注：对此有兴趣的可以了解下数字图像处理的模糊算法。）
- `<spread-radius>`
  - 这是第四个 `<length>` 值。取正值时，阴影扩大；取负值时，阴影收缩。默认为 0，此时阴影与元素同样大。需要考虑 inset
- `<color>`
  - 相关事项查看 `<color>` 。如果没有指定，则由浏览器决定——通常是color的值，不过目前 Safari 取透明。

# white-space
CSS white-space 属性用于设置如何处理元素内的**空白字符**。
```css
/* 单个关键字值 */
white-space: normal;
white-space: nowrap;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;
white-space: break-spaces;

/* white-space-collapse 和 text-wrap 简写值 */
white-space: collapse balance;
white-space: preserve nowrap;
```
取值：
- normal
  - 连续的空白符会被**合并**。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。
- nowrap
  - 和 normal 一样合并空白符，但**阻止源码中的文本换行**。
- pre
  - 连续的空白符会被**保留**。仅在遇到换行符或 `<br>` 元素时才会换行。
- pre-wrap
  - 连续的空白符会被**保留**。在遇到换行符或 `<br>` 元素时，或者根据填充行框盒子的需要换行。
- pre-line
  - 连续的空白符会被**合并**。在遇到换行符或 `<br>` 元素时，或者根据填充行框盒子的需要换行。

# text
## text-overflow
`text-overflow CSS` 属性用于确定如何提示用户**存在隐藏的溢出内容**。其形式可以是裁剪、显示一个省略号（`“…”`）或显示一个自定义字符串。

`text-overflow` 属性并不会强制“溢出”事件的发生，因此为了能让文本能够溢出容器，你需要在元素上添加几个额外的属性：`overflow` 和 `white-space`
```css
overflow: hidden;
white-space: nowrap;
```

`text-overflow` 属性只对那些在**块级元素**溢出的内容有效

简单理解：
- 文本有溢出，本属性才会起作用。  
- 要让文本溢出通过 `overflow` 和 `white-space` 实现

### 语法
`text-overflow` 属性可能被赋予一个或者两个值。
- 如果赋一个值，指的行末溢出行为（从左至右的文本右末端，从右至左的文本左末端）。
- 如果赋两个值，第一个值指定行左端溢出行为，第二个值指定行右端溢出行为。

```css
text-overflow: clip;
text-overflow: ellipsis ellipsis;
```
取值：
- clip
  - **默认值**。这个关键字会在内容区域的极限处截断文本，因此可能会在单词的中间发生截断。
- ellipsis
  - 这个关键字会用一个省略号（`'…'`）来表示被截断的文本。这个省略号被添加在内容区域中，因此会减少显示的文本。如果空间太小以至于连省略号都容纳不下，那么这个省略号也会被截断。

# background
## background-image
CSS `background-image` 属性用于为一个元素设置一个或者多个背景图像。

可以提供由**逗号**分隔的多个值来指定多个背景图像。

在绘制时，图像以 z 方向堆叠的方式进行。先指定的图像会在之后指定的图像上面绘制。因此指定的第一个图像“最接近用户”。  （**即有多个图像，先声明的图像会在最上方**）

然后元素的边框 `border` 会在它们之上被绘制，而 `background-color` 会在它们之下绘制。

语法：  
`<image>`、`<gradient>` 是数据类型
```
background-image = 
  <bg-image>#  

<bg-image> = 
  <image>  |
  none     

<image> = 
  <url>       |
  <gradient>  

<url> = 
  url( <string> <url-modifier>* )  |
  src( <string> <url-modifier>* )  
```

例子：
```css
background-image: linear-gradient(to bottom, red, blue),
                  url("../../media/examples/lizard.png");

background-image: url("startransparent.gif"), url("catfront.png");
```

## background-position
`background-position` CSS 属性为每一个背景图片**设置初始位置**。这个位置是相对于由 `background-origin` 定义的位置图层的。

取值：
- `<position>`

  - : 一个 `<position>` 定义一组 x/y 坐标（相对于一个元素盒子模型的边界），来放置项目。它可以使用一到四个值进行定义。

    **一个值的语法：** 值可能是：

    - 关键字 `center`，用来居中背景图片。
    - 关键字 `top`、`left`、`bottom`、`right` 中的一个。用来指定把这个项目（原文为 item）放在哪一个边界。另一个维度被设置成 50%，所以这个项目（原文为 item）被放在指定边界的中间位置。
    - `<length>` 或 `<percentage>`。指定相对于左边界的 x 坐标，y 坐标被设置成 50%。

    **两个值的语法：** 一个定义 x 坐标，另一个定义 y 坐标。每个值可以是：

    - 关键字 `top`、`left`、`bottom`、`right` 中的一个。如果这里给出 `left` 或 `right`，那么这个值定义 x 轴位置，另一个值定义 y 轴位置。如果这里给出 `top` 或 `bottom`，那么这个值定义 y 轴位置，另一个值定义 x 轴位置。
    - `<length>` 或 `<percentage>`。如果另一个值是 `left` 或 `right`，则该值定义相对于顶部边界的 Y。如果另一个值是 `top` 或 `bottom`，则该值定义相对于左边界的 X。如果两个值都是 `<length>` 或 `<percentage>` 值，则第一个定义 X，第二个定义 Y。
    - 注意：如果一个值是 `top` 或 `bottom`，那么另一个值不可能是 `top` 或 `bottom`。如果一个值是 `left` 或 `right`，那么另一个值不可能是 `left` 或 `right`。也就是说，例如，`top top` 和 `left right` 是无效的。
    - 排序：配对关键字时，位置并不重要，因为浏览器可以重新排序，写成 `top left` 或 `left top` 其产生的效果是相同的。使用 `<length>` 或 `<percentage>` 与关键字配对时顺序非常重要，定义 X 的值放在前面，然后是定义 Y 的值， `right 20px` 和 `20px right` 的效果是不相同的，前者有效但后者无效。`left 20%` 或 `20% bottom` 是有效的，因为 X 和 Y 值已明确定义且位置正确。
    - 默认值是 `left top` 或者 `0% 0%`。

    **三个值的语法：** 两个值是关键字值，第三个是前面值的偏移量：

    - 第一个值是关键字 `top`、`left`、`bottom`、`right`，或者 `center`。如果设置为 `left` 或 `right`，则定义了 X。如果设置为 `top` 或 `bottom`，则定义了 Y，另一个关键字值定义了 X。
    - `<length>` 或 `<percentage>`，如果是第二个值，则是第一个值的偏移量。如果是第三个值，则是第二个值的偏移量。
    - 单个长度或百分比值是其前面的关键字值的偏移量。一个关键字与两个 `<length>` 或 `<percentage>` 值的组合无效。

    **四个值的语法：** 第一个和第三个值是定义 X 和 Y 的关键字值。第二个和第四个值是前面 X 和 Y 关键字值的偏移量：

    - 第一个值和第三个值是关键字值 `top`、`left`、`bottom`、 `right` 之一。如果设置为 `left` 或 `right`，则定义了 X。如果设置为 `top` 或 `bottom`，则定义了 Y，另一个关键字值定义了 X。
    - 第二个和第四个值是 `<length>` 或 `<percentage>`。第二个值是第一个关键字的偏移量。第四个值是第二个关键字的偏移量。

例子：
```css
/* Keyword values */
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;

/* <percentage> values */
background-position: 25% 75%;

/* <length> values */
background-position: 1cm 2cm;
background-position: 10ch 8em;

/* Multiple images */
background-position:
  0 0,
  center;

/* Edge offsets values */
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
```

## background-size
`background-size` 设置背景图片大小。图片可以保有其原有的尺寸，或者拉伸到新的尺寸，或者在保持其原有比例的同时缩放到元素的可用空间的尺寸。

初始值：	`auto auto`

属性值：
- `<length>`
  - `<length>` 值，指定背景图片大小，不能为负值。
- `<percentage>`
  - `<percentage>` 值，指定背景图片相对背景区（background positioning area）的百分比。
- auto
  - 以背景图片的比例缩放背景图片。
- cover
  - 缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。和 contain 值相反，cover 值尽可能大的缩放背景图像并保持图像的宽高比例（图像不会被压扁）。该背景图以它的全部宽或者高覆盖所在容器。当容器和背景图大小不同时，背景图的 左/右 或者 上/下 部分会被裁剪。
- contain
  - 缩放背景图片以完全装入背景区，可能背景区部分空白。contain 尽可能的缩放背景并保持图像的宽高比例（图像不会被压缩）。该背景图会填充所在的容器。当背景图和容器的大小的不同时，容器的空白区域（上/下或者左/右）会显示由 background-color 设置的背景颜色。

```css
/* 关键字 */
background-size: cover
background-size: contain

/* 一个值：这个值指定图片的宽度，图片的高度隐式的为 auto */
background-size: 50%
background-size: 12px
background-size: auto

/* 两个值 */
/* 第一个值指定图片的宽度，第二个值指定图片的高度 */
background-size: 50% auto
background-size: 3em 25%
background-size: auto auto

/* 逗号分隔的多个值：设置多重背景 */
background-size: auto, auto     /* 不同于 background-size: auto auto */
background-size: 50%, 25%, 25%
background-size: 6px, auto, contain
```

# font
## font-family
CSS 属性 `font-family` 允许你通过给定一个有先后顺序的，由字体名或者字体族名组成的列表来为选定的元素**设置字体**。

属性值用**逗号**隔开。浏览器会选择列表中第一个该计算机上有安装的字体，或者是通过 `@font-face` 指定的可以直接下载的字体。

属性 `font-family` 列举一个或多个由逗号隔开的字体族。每个字体族由 `<family-name>` 或 `<generic-name>` 值指定。
- `<family-name>`
一个字体族的名字。例如"Times" 和 "Helvetica" 都是字体族名。字体族名可以包含空格，但包含空格时应该用引号。
- `<generic-name>`
通用字体族名是一种备选机制，用于在指定的字体不可用时给出较好的字体。通用字体族名都是关键字，所以不可以加引号。在列表的末尾应该至少有一个通用字体族名。以下是该属性可能的取值以及他们的定义。
  - serif、sans-serif、monospace、cursive、fantasy、system-ui、ui-serif、fangsong 等等

例子：
```css
/* 一个字体族名和一个通用字体族名 */
font-family: "Gill Sans Extrabold", sans-serif;
font-family: "Goudy Bookletter 1911", sans-serif;

/* 仅有一个通用字体族名 */
font-family: serif;
font-family: sans-serif;
font-family: monospace;
```

## font-style
`font-style` CSS 属性允许你选择 `font-family` 字体下的 `italic` 或 `oblique` 样式。
- `Italic` 字体一般是现实生活中的草书，相比无样式的字体，通常会占用较少的水平空间，
- `oblique` 字体一般只是常规字形的倾斜版本。

取值：
- normal
  - 选择 font-family 的常规字体。
- italic
  - 选择 **斜体**，如果当前字体没有可用的斜体版本，会选用倾斜体（oblique ）替代。
- oblique
  - 选择 **倾斜体**，如果当前字体没有可用的倾斜体版本，会选用斜体（italic ）替代。

```css
font-style: normal;
font-style: italic;
font-style: oblique;
```

## font-weight
`font-weight` CSS 属性指定了字体的**粗细程度**。一些字体只提供 `normal` 和 `bold` 两种值。

值
- normal
  - 正常粗细。**与 400 等值**。
- bold
  - 加粗。**与 700 等值**。
- lighter
  - 比从父元素继承来的值更细 (处在字体可行的粗细值范围内)。
- bolder
  - 比从父元素继承来的值更粗 (处在字体可行的粗细值范围内)。
- `<number>`
  - 一个介于 **1 和 1000 (包含)** 之间的 <number> 类型值。更大的数值代表字体重量粗于更小的数值 (或一样粗)。\

例子：
```css
/* Keyword values */
font-weight: normal;
font-weight: bold;

/* Keyword values relative to the parent */
font-weight: lighter;
font-weight: bolder;

/* Numeric keyword values */
font-weight: 100;
font-weight: 200;
font-weight: 800;
```

# filter
CSS `filter` 属性将**模糊或颜色偏移**等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。

当单个 `filter` 属性具有多个函数时，滤镜将**按顺序依次应用**。

`filter` 属性可设置为 `none` 或下面列出的一个或多个函数。
- blur()
  - 将高斯模糊应用于输入图像。
  - filter: blur(5px);
- brightness()
  - 将线性乘法器应用于输入图像，以调整其亮度。值为 0% 将创建全黑图像；值为 100% 会使输入保持不变，其他值是该效果的线性乘数。如果值大于 100% 将使图像更加明亮。
  - filter: brightness(2);
- contrast()
  - 调整输入图像的对比度。值是 0% 将使图像变灰；值是 100%，则无影响；若值超过 100% 将增强对比度。
  - filter: contrast(200%);
- drop-shadow()
  - 使用 `<shadow>` 参数沿图像的轮廓生成阴影效果。阴影语法类似于 `<box-shadow>`（在 CSS 背景和边框模块中定义），但不允许使用 inset 关键字以及 spread 参数。与所有 filter 属性值一样，任何在 drop-shadow() 后的滤镜同样会应用在阴影上。
  - filter: drop-shadow(16px 16px 10px black);
- grayscale()
  - 将图像转换为灰度图。值为 100% 则完全转为灰度图像，若为初始值 0% 则图像无变化。值在 0% 到 100% 之间，则是该效果的线性乘数。
  - filter: grayscale(100%);
- hue-rotate() 
  - 应用色相旋转。`<angle>` 值设定图像会被调整的色环角度值。值为 0deg，则图像无变化。
  - filter: hue-rotate(90deg);
- invert() 
  - 反转输入图像。值为 100% 则图像完全反转，值为 0% 则图像无变化。值在 0% 和 100% 之间，则是该效果的线性乘数。
  - filter: invert(100%);
- opacity()
  - 应用透明度。值为 0% 则使图像完全透明，值为 100% 则图像无变化。
  - filter: opacity(50%);
- saturate()
  - 改变图像饱和度。值为 0% 则是完全不饱和，值为 100% 则图像无变化。超过 100% 则增加饱和度。
  - filter: saturate(200%);
- sepia()
  - 将图像转换为深褐色。值为 100% 则完全是深褐色的，值为 0% 图像无变化。
  - filter: sepia(100%);