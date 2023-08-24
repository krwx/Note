- [display](#display)
  - [inline值](#inline值)
- [position](#position)


## display
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

### inline值
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


## position
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
