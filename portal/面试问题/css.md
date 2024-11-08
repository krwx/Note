# css

- [css](#css)
  - [1. 移动端布局有哪些 / 响应式布局是什么 / 响应式布局有哪些，怎么使用](#1-移动端布局有哪些--响应式布局是什么--响应式布局有哪些怎么使用)
  - [2. 移动端的适配](#2-移动端的适配)
  - [3. 哪些网页需要做成响应式布局](#3-哪些网页需要做成响应式布局)
  - [4. css有没有子选择器](#4-css有没有子选择器)
  - [5. css 选择器权重。一个元素如果被多个类命中，怎么选择](#5-css-选择器权重一个元素如果被多个类命中怎么选择)
  - [6. 布局流的特点 / 流式布局的特点](#6-布局流的特点--流式布局的特点)
  - [7. 行内布局的特点](#7-行内布局的特点)
  - [8. 说一下块级上下文](#8-说一下块级上下文)
  - [9. 工作时在什么地方运用 flex 布局，怎么使用](#9-工作时在什么地方运用-flex-布局怎么使用)
  - [10. 有了解css3的动画吗？](#10-有了解css3的动画吗)
  - [11. 怎么将一个div水平垂直居中（可以设置 display 为 table）](#11-怎么将一个div水平垂直居中可以设置-display-为-table)
  - [11. 讲一下 em、rem、px 的区别](#11-讲一下-emrempx-的区别)
  - [12. 在项目中有用过 em、rem、px 吗](#12-在项目中有用过-emrempx-吗)
  - [13. flex 布局在什么时候会用](#13-flex-布局在什么时候会用)
  - [14. flex 布局设置换行通过哪个属性设置](#14-flex-布局设置换行通过哪个属性设置)
  - [15. display有哪些取值](#15-display有哪些取值)
  - [16. display 为 absolute 的 div，假如它的父 div 的 display 不是 absolute、relative，那么这个 div 以谁为基准](#16-display-为-absolute-的-div假如它的父-div-的-display-不是-absoluterelative那么这个-div-以谁为基准)
  - [17. display 的默认取值是什么](#17-display-的默认取值是什么)
  - [18. 怎么实现三栏布局，左右两边是固定的。flex布局的话，三栏的flex-basic、flex-glow、flex-shirnk怎么设置](#18-怎么实现三栏布局左右两边是固定的flex布局的话三栏的flex-basicflex-glowflex-shirnk怎么设置)
  - [19. css自定义属性怎么写，在哪里定义](#19-css自定义属性怎么写在哪里定义)
  - [20. 讲一下有哪些盒子模型，各自的特点是什么](#20-讲一下有哪些盒子模型各自的特点是什么)
  - [21. 怎么指定盒子模型](#21-怎么指定盒子模型)
  - [22. BFC 是什么](#22-bfc-是什么)
  - [23. 怎么实现两栏布局（左边宽度固定，右边自适应）](#23-怎么实现两栏布局左边宽度固定右边自适应)
  - [24. flex布局怎么实现垂直居中。为什么 justify-content：center 可以实现](#24-flex布局怎么实现垂直居中为什么-justify-contentcenter-可以实现)
  - [25. css 自定义颜色的四种方法（包括RGB（百分比））](#25-css-自定义颜色的四种方法包括rgb百分比)
  - [26. 有一个字体文件很大,但是只需要其中几种字体,怎么处理](#26-有一个字体文件很大但是只需要其中几种字体怎么处理)
  - [27. animation 有哪些相关的值](#27-animation-有哪些相关的值)
  - [28. 怎么实现一个 div 水平向右再向左的动画](#28-怎么实现一个-div-水平向右再向左的动画)

## 1. 移动端布局有哪些 / 响应式布局是什么 / 响应式布局有哪些，怎么使用

1. 流式布局
    流式布局就是百分比布局，也称非固定像素布局。它通过将盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。流式布局方式是移动web开发中使用的比较常见的布局方式。设置以下属性是为了保护文本内容无限制扩张或者页面收缩导致内容丢失。
2. flex布局  
3. meta媒体查询  
    meta标签，通过媒体查询 按照不同手机的像素宽高不同，进行条件匹配

    ```css
        @media not|only mediatype and (expressions) {
            /- CSS-Code; -/
        }
    ```

    搭配 rem 使用：rem适配布局
    - em：子元素字体大小单位如果使用em是相对于父元素字体大小，而元素的width/height/padding/margin属性用em的话则是相对于该元素的font-size大小。
    - rem：相对于根元素html。
4. vw/vh布局  
    vw/vh是一个相对单位（类似em和rem相对单位)，所以不同视口（屏幕）下，宽高可以一起变化完成适配。  
    vw是viewport width：视口宽度单位；vh是viewport height：视口高度单位。  
    它们是相对视口的尺寸计算：1vw = 1/100视口宽度，1vh = 1/100视口高度。（固定分为100份）  
    例如：当前视口宽度是520px，则1vw=5.2px。  
    vw/vh布局和百分比布局的区别：百分比是相对于父元素来说的，而vw/vh是相对于当前视口来说的。
5. Bootstrab（实际也是 flex 布局）

## 2. 移动端的适配

## 3. 哪些网页需要做成响应式布局

1. 企业官网建设  
    企业官网一般以资讯和产品类型的为主，对个性化设计要求不高，所以采用响应式网站设计对企业来说就便捷性来说，挺合适的。
2. 建设普通网站  
    如果你的网站以产品和资讯内容为主，对个性化设计和个性化形象要求不高，用响应式网站设计就可以。因为普通资讯类的网站页面结构比较单一，比较适合响应式网站布局。如果是功能型的网站，针对页面的整体排版、样式和用户体验的要求较高，就只能采用其它形式的建站模式。
3. 有多终端需求的  
    为了适应更多终端，节约成本，开发设计一个普通的网站采用响应式无疑是最好的选择。因为如果根据不同设备分别打造多个版本的网页的话，就成本、人力和时间都会有所增加。所以，就维护角度来说，响应式网站无疑是最节省且管理起来最轻松的。
4. 简单商城网站建设  
    国内的电商类网站页面布局太复杂，展现的内容非常多，移动端的屏幕大小有限，所以电商类网站做响应式设计的用户体验差。一般常见的就是，规划适合移动端布局的网站页面设计，根据不同的终端，开发不同的网站页面。但国外的和很多商城网站建设，产品布局简洁且有规则，就比较适合响应式网站。  

## 4. css有没有子选择器

有。 > 为直接子代选择器

## 5. css 选择器权重。一个元素如果被多个类命中，怎么选择

``` html
      <div class="c1">
        <div class="c2">
            <div class="c3">
                <p class="c4">123</p>
            </div>
        </div>
      </div>
      <!-- .c1 .c2{} 与 .c2 .c3{} 哪个权重更重 -->
```

若选择器权重相同，则选择晚声明的选择器
  
## 6. 布局流的特点 / 流式布局的特点

- 流式布局的特点 是页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。代表作栅栏系统 网格系统.
- 布局特点  
屏幕分辨率变化时，页面里元素的大小会变化而但布局不变
- 设计方法  
使用%百分比定义宽度，高度大都是用px来固定住
- 缺点明显：主要的问题是如果屏幕尺度跨度太大，那么在相对其原始设计而言过小或过大的屏幕上不能正常显示

## 7. 行内布局的特点

行内布局是相邻的元素会在同一行上，宽度为元素的内容宽度，可以通过设置width属性改变宽度

```css
span{
    display:inline;
}
```

- inline（行内元素）:  
  - 使元素变成行内元素，拥有行内元素的特性，即可以与其他行内元素共享一行，不会独占一行.
  - 不能更改元素的height，width的值，大小由内容撑开.
  - 可以部分设置margin,padding属性：可以设置水平方向上的（left,right），不可以设置垂直方向上的（top,bottom）
  - 常见的行内元素有：span,a,strong,em,input,img,br等
  - 只有设置行高才可以增加行内框的高度（line-height）

## 8. 说一下块级上下文

相关知识点：

```text
块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

通俗来讲
•BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。
•如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。

创建BFC

（1）根元素或包含根元素的元素
（2）浮动元素float＝left|right或inherit（≠none）
（3）绝对定位元素position＝absolute或fixed
（4）display＝inline-block|flex|inline-flex|table-cell或table-caption
（5）overflow＝hidden|auto或scroll(≠visible)
```

回答：

```text
BFC指的是块级格式化上下文，一个元素形成了BFC之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到BFC中的内部元素。一个BFC就像是一个隔离区域，和其他区域互不影响。

一般来说根元素是一个BFC区域，浮动和绝对定位的元素也会形成BFC，display属性的值为inline-block、flex这些属性时也会创建BFC。还有就是元素的overflow的值不为visible时都会创建BFC。
```

## 9. 工作时在什么地方运用 flex 布局，怎么使用

在输入框前后加图标按钮用到，使图标和输入框对齐

## 10. 有了解css3的动画吗？

1. 设置 keyframes  
   @keyframes 规则内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式。  
   两种设置方式：1、使用 from、to； 2、使用百分比，尽量都设置0%和100%

   ```css
    @keyframes myfirst
    {
        from {background: red;}
        to {background: yellow;}
    }
    @keyframes myfirst
    {
        0%   {background: red;}
        100% {background: green;}
    }
   ```

2. 绑定动画到选择器  
   通过 `animation` 属性设置动画相关属性

   ```css
   div {
        animation: myfirst 5s;
        -webkit-animation: myfirst 5s; /- Safari 与 Chrome -/
    }
   ```

有尝试做过一个太极自转的动画。设置 transform: rotate(-360deg);

## 11. 怎么将一个div水平垂直居中（可以设置 display 为 table）

   设置 display 为 table-cell

   ```css
   <!-- 设置父元素 -->
   .parent {
    display: table-cell;
    vertical-align：middle;
    text-align: center
   }
   <!-- 子元素 -->
   .child {
    display: inline-block
   }
   ```

## 11. 讲一下 em、rem、px 的区别

px（像素）是一个绝对单位，不可缩放。无论屏幕大小或用户偏好如何，它始终保持相同的大小。

em 和 rem 的区别：

- em：
  - 子元素字体大小单位如果使用em是相对于父元素字体大小
  - 而元素的 `width/height/padding/margin` 属性用em的话则是相对于--该元素--的 `font-size` 大小。
- rem：
  - 相对于根元素 html。元素的字体大小和 `width/height/padding/margin` 都是相对于根元素 html

## 12. 在项目中有用过 em、rem、px 吗

## 13. flex 布局在什么时候会用

1. 在输入框旁边添加按钮会用到，用于调整水平高度

## 14. flex 布局设置换行通过哪个属性设置

- flex-warp
  - 指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。
  - nowrap：默认值。flex 的元素被摆放到到一行，这可能导致 flex 容器溢出。
  - wrap：flex 元素 被打断到多个行中。cross-start 会根据 flex-direction 的值等价于 start 或before。cross-end 为确定的 cross-start 的另一端。
  - wrap-reverse：和 wrap 的行为一样，但是 cross-start 和 cross-end 互换。

## 15. display有哪些取值

| 值  | 描述 |
| ---- | ---- |
|none | 此元素不会被显示。|
|block | 此元素将显示为块级元素，此元素前后会带有换行符。|
|inline| 默认。此元素会被显示为内联元素，元素前后没有换行符。|
|inline-block| 行内块元素。（CSS2.1 新增的值）|
|inline-flex| |
|inline-grid| |
|list-item| 此元素会作为列表显示。|
|run-in| 此元素会根据上下文作为块级元素或内联元素显示。|
|table| 此元素会作为块级表格来显示（类似 `<table>`），表格前后带有换行符。|
|inline-table| 此元素会作为内联表格来显示（类似 `<table>`），表格前后没有换行符。|
|table-row-group| 此元素会作为一个或多个行的分组来显示（类似 `<tbody>`）。|
|table-header-group| 此元素会作为一个或多个行的分组来显示（类似 `<thead>`）。|
|table-footer-group| 此元素会作为一个或多个行的分组来显示（类似 `<tfoot>`）。|
|flow-root| **生成一个块级元素盒**，其会建立一个新的**块级格式化上下文**，定义格式化上下文的根元素。|
|table-row| 此元素会作为一个表格行显示（类似 `<tr>`）。|
|table-column-group| 此元素会作为一个或多个列的分组来显示（类似 `<colgroup>`）。|
|table-column| 此元素会作为一个单元格列显示（类似 `<col>`）|
|table-cell| 此元素会作为一个表格单元格显示（类似 `<td>` 和 `<th>`）|
|table-caption| 此元素会作为一个表格标题显示（类似 `<caption>`）|
|inherit| 规定应该从父元素继承 display 属性的值。|
|flex|  flex布局|
|grid|  grid布局|

## 16. display 为 absolute 的 div，假如它的父 div 的 display 不是 absolute、relative，那么这个 div 以谁为基准

绝对定位的元素的位置相对于最近的已定位父元素（即非 static 的父元素），如果元素没有已定位的父元素，那么它的位置相对于`<html>`。  

## 17. display 的默认取值是什么

inline

## 18. 怎么实现三栏布局，左右两边是固定的。flex布局的话，三栏的flex-basic、flex-glow、flex-shirnk怎么设置

[三栏布局](../css/css实现功能.md/#实现三栏)

flex布局的话，三栏的flex-basic、flex-glow、flex-shirnk怎么设置：

- 左栏
  - flex-basic 设置初始的宽度
  - flex-glow 和 flex-shirnk 设置 0
- 中间
  - flex 设置 auto
- 右栏
  - flex-basic 设置初始的宽度
  - flex-glow 和 flex-shirnk 设置 0

## 19. css自定义属性怎么写，在哪里定义

带有前缀 -- 的属性名，比如 --example--name，表示的是带有值的自定义属性，其可以通过 `var()` 函数在全文档范围内复用的。

例子：

```css
/* 在 :root 声明自定义属性 */
:root {
  --first-color: #488cff;
  --second-color: #ffff8c;
}
/* 通过 var() 函数获取自定义属性 */
#firstParagraph {
  background-color: var(--first-color);
  color: var(--second-color);
}
```

## 20. 讲一下有哪些盒子模型，各自的特点是什么

（1）有两种盒子模型：IE盒模型（border-box）、W3C标准盒模型（content-box）  
（2）盒模型：分为内容（content）、填充（padding）、边界（margin）、边框（border）四个部分

IE盒模型和W3C标准盒模型的区别：

（1）W3C标准盒模型：属性width，height只包含内容content，不包含border和padding  
（2）IE盒模型：属性width，height包含content、border和padding，指的是content
+padding+border。

## 21. 怎么指定盒子模型

由 `box-sizing`（CSS新增的属性）控制，默认值为 `content-box` ，即标准盒模型；
如果将 `box-sizing` 设为 `border-box` 则用的是IE盒模型。

## 22. BFC 是什么

BFC指的是块级格式化上下文，一个元素形成了BFC之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到BFC中的内部元素。一个BFC就像是一个隔离区域，和其他区域互不影响。

## 23. 怎么实现两栏布局（左边宽度固定，右边自适应）

1. flex
2. 右边设置 width：100%
3. 不知道 float 怎么设置。回答了左边设置 float:left，面试官问右边不会顶上吗
   1. 所以右边要设置 margin-left
4. 还有什么方法

[两栏布局](../css/css实现功能.md/#实现两栏)

## 24. flex布局怎么实现垂直居中。为什么 justify-content：center 可以实现

设置 `align-items: center;`

因为主轴的 direction 为 row ？

## 25. css 自定义颜色的四种方法（包括RGB（百分比））

CSS的四种定义颜色的方法分别为: 十六进制数 、RGB 函数(整数) 、 RGB函数(百分比) 、 颜色名称。

```css
.demo {
  color: orange;
  color: rgb(255,0,0); 
  color: rgb(100%,0%,0%); 
  color: #D1483E; 

  color: rgba(255,0,0,0.2);
}
```

## 26. 有一个字体文件很大,但是只需要其中几种字体,怎么处理

`font-spider`

字蛛是一款可以压缩字体文件的小工具，其主要的原理就是，通过 `html` 页面获得文字以及对应的字体文件，然后把已经使用文字保留，没有的文字去除，生成一个新的字体文件。

安装：

```shell
npm i -g font-spider
```

使用

```shell
font-spider index.html
```

命令执行完会在原字体处生成一个新的字体文件，而旧的文件会保存在 `font-spider` 文件夹下，新生成的就是压缩后的字体文件。至此，工具的使用方法介绍完了。

## 27. animation 有哪些相关的值

- `@keyframes`：规定动画。
- `animation`：所有动画属性的简写属性。
- `animation-name`：规定 `@keyframes` 动画的名称。
- `animation-duration`：规定动画完成一个周期所花费的秒或毫秒。默认是 0。
- `animation-timing-function`：规定动画的速度曲线。默认是 "ease"。
  - `linear`：动画从头到尾的速度是相同的。
  - `ease`：默认。动画以低速开始，然后加快，在结束前变慢。
  - `ease-in`：动画以低速开始。
  - `ease-out`：动画以低速结束。
  - `ease-in-out`：动画以低速开始和结束
- `animation-fill-mode`：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
- `animation-delay`：规定动画何时开始。默认是 0。
- `animation-iteration-count`：规定动画被播放的次数。默认是 1。持续播放设置为 infinite
- `animation-direction`：规定动画是否在下一周期逆向地播放。默认是 "normal"。
- `animation-play-state`：规定动画是否正在运行或暂停。默认是 "running"。

## 28. 怎么实现一个 div 水平向右再向左的动画

```html
	<body>
		<div class="ani">123</div>
	</body>
	<style>
		@keyframes move {
			50% {
				transform: translate(100px);
			}
			100% {
				transform: translate(0px);
			}
		}
		.ani {
			animation: move 5s;
		}
	</style>
```
