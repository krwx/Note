- [display](#display)
  - [inline值](#inline值)
- [position](#position)
- [box-shadow](#box-shadow)
  - [语法](#语法)


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
|flow-root|	生成一个块级元素盒，其会建立一个新的块级格式化上下文，定义格式化上下文的根元素。
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
元素的位置相对于浏览器窗口是固定位置。  
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

