# grid

- [grid](#grid)
  - [介绍](#介绍)
  - [基本概念](#基本概念)
  - [容器属性](#容器属性)
  - [项目属性](#项目属性)

## 介绍

Flexbox 用于设计横向或纵向的布局，而 Grid 布局则被设计用于同时在两个维度上把元素按行和列排列整齐。

一个网格通常具有许多的列（column）与行（row），以及行与行、列与列之间的间隙，这个间隙一般被称为沟槽（gutter）

Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格

## 基本概念

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。

划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。  
正常情况下，n行有n + 1根水平网格线，m列有m + 1根垂直网格线，比如三行就有四根水平网格线。

属性区分容器属性和项目属性

## 容器属性

- grid-template-columns 属性定义每一列的列宽
- grid-template-rows 属性定义每一行的行高。

```css
/* 定义 3 * 3 的网格，每个格子都为 100px */
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;

  /* 也可以设置百分比 */
  grid-template-columns: 33.33% 33.33% 33.33%;

  /* 可以使用 repeat() 设置 */
  /* repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。 */
  grid-template-rows: repeat(3, 33.33%);
  /* repeat()重复某种模式也是可以的 */
  grid-template-columns: repeat(2, 100px 20px 80px);

  /* 单元格的大小是固定的，但是容器的大小不确定时，如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。 */
  grid-template-columns: repeat(auto-fill, 100px);
  /* 除了auto-fill，还有一个关键字auto-fit，两者的行为基本是相同的。
  只有当容器足够宽，可以在一行容纳所有单元格，并且单元格宽度不固定的时候，才会有行为差异：auto-fill会用空格子填满剩余宽度，auto-fit则会尽量扩大单元格的宽度。 */

  /* 为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。 
   fr单位分配的是可用空间而非所有空间
  */
  grid-template-columns: 1fr 2fr;
  grid-template-columns: 150px 1fr 2fr;

  /* minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。 */
  grid-template-columns: 1fr 1fr minmax(100px, 1fr);

  /* auto关键字表示由浏览器自己决定长度。 */
  grid-template-columns: 100px auto 100px;

  /* 设置网格线名称。使用方括号，指定每一根网格线的名字，方便以后的引用。 */
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```

- column-gap：设置列与列的间隔（列间距）
- row-gap：设置行与行的间隔（行间距）
- gap：column-gap 和 row-gap 的缩写。
  - 语法为：`gap: <row-gap> <column-gap>;`
  - 如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。

```css
.container {
  column-gap: 20px;
  row-gap: 30px;
  gap: 30px 20px
}
```

- grid-template-areas 属性：指定"区域"（area），一个区域由单个或多个单元格组成

```css
.container {
  display: grid;
  /* 先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格 */
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';

  /* 多个单元格合并成一个区域的写法如下。将9个单元格分成a、b、c三个区域 */
  grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
  /* 如果某些区域不需要利用，则使用"点"（.）表示。 */
  grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
}
```

- grid-auto-flow 属性：决定容器的子元素的放置顺序。
  - 默认值是 row ，即"先行后列"，即先填满第一行，再开始放入第二行
  - column：先列后行
  - row dense：先行后列，并且尽可能紧密填满，尽量不出现空格
  - column dense：先列后行，并且尽可能紧密填满，尽量不出现空格

```css
grid-auto-flow: column;
```

- justify-items 属性：设置**单元格内容**的水平位置（左中右）
- align-items 属性：设置**单元格内容**的垂直位置（上中下）
- place-items 属性：是align-items属性和justify-items属性的合并简写形式。
  - 格式：place-items: `<align-items>` `<justify-items>`;

```css
/* 
start：对齐单元格的起始边缘。
end：对齐单元格的结束边缘。
center：单元格内部居中。
stretch：拉伸，占满单元格的整个宽度（默认值）。
*/
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

- justify-content 属性：整个内容区域在容器里面的水平位置（左中右）
- align-content 属性：是整个内容区域的垂直位置（上中下）
- place-content 属性：是align-content属性和justify-content属性的合并简写形式。
  - 格式：place-content: `<align-content>` `<justify-content>`

```css
/*
start - 对齐容器的起始边框。
end - 对齐容器的结束边框。
center - 容器内部居中。
stretch - 项目大小没有指定时，拉伸占据整个网格容器。
space-around - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。
*/
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。

- grid-auto-columns 属性：设置浏览器自动创建的多余网格的列宽
- grid-auto-rows 属性：设置浏览器自动创建的多余网格的行高

```css
/* 如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。 */
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
}
```

## 项目属性

指定项目的位置：

- grid-column-start 属性：左边框所在的垂直网格线
- grid-column-end 属性：右边框所在的垂直网格线
- grid-row-start 属性：上边框所在的水平网格线
- grid-row-end 属性：下边框所在的水平网格线

```css
/* 网格线从1开始算起。 */
/* 这里是 1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。 */
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;

  /* 还可以指定为网格线的名字 */
  grid-column-start: header-start;
  grid-column-end: header-end;

  /* 使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格 */
  /* 下面两行的设置 效果一样 */
  grid-column-start: span 2;
  grid-column-end: span 2;
}
```

- grid-column 属性：grid-column-start 和 grid-column-end 的合并简写形式
- grid-row 属性：grid-row-start 属性和 grid-row-end 的合并简写形式。

```css
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

- grid-area属性：指定项目放在哪一个区域。

```css
.item-1 {
  grid-area: e;

  /* 还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。 */
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

- justify-self 属性：设置**单个单元格**内容的水平位置
- align-self 属性：设置**单个单元格**内容的垂直位置
- place-self 属性：align-self属性和justify-self属性的合并简写形式
