- [选择器](#选择器)
  - [类型、类和 ID 选择器](#类型类和-id-选择器)
  - [属性选择器](#属性选择器)
  - [伪类与伪元素](#伪类与伪元素)
    - [伪类](#伪类)
      - [比较 :is() 和 :where()](#比较-is-和-where)
    - [伪元素](#伪元素)
    - [生成带有::before 和::after 的内容](#生成带有before-和after-的内容)
  - [关系选择器（Combiner）](#关系选择器combiner)
- [自定义属性（--\*）：CSS 变量](#自定义属性--css-变量)
- [层叠与继承](#层叠与继承)
  - [继承](#继承)
  - [层叠](#层叠)
    - [资源顺序](#资源顺序)
    - [优先级](#优先级)
- [CSS3 动画](#css3-动画)
  - [transform 属性](#transform-属性)
  - [transform-origin 属性](#transform-origin-属性)
  - [使用动画](#使用动画)
  - [动画属性](#动画属性)
- [CSS3 过渡](#css3-过渡)
  - [过渡属性](#过渡属性)
- [响应式布局](#响应式布局)
  - [实现响应式布局](#实现响应式布局)
- [布局](#布局)
- [@Media](#media)
  - [媒体类型](#媒体类型)
  - [媒体特性](#媒体特性)
  - [逻辑运算符](#逻辑运算符)
- [CSS 排版](#css-排版)
  - [正常布局流](#正常布局流)
  - [弹性盒子](#弹性盒子)
    - [flex模型说明](#flex模型说明)
    - [属性](#属性)
  - [Grid 布局（网格布局）](#grid-布局网格布局)
    - [基本概念](#基本概念)
    - [容器属性](#容器属性)
    - [项目属性](#项目属性)
- [px、em、rem](#pxemrem)
- [模块](#模块)
  - [全局作用域](#全局作用域)
- [浮动](#浮动)
  - [介绍](#介绍)
  - [清除浮动](#清除浮动)
  - [清除浮动元素周围的盒子](#清除浮动元素周围的盒子)


# 选择器
## 类型、类和 ID 选择器
```css
/* 类型选择器 */
span{

}
/* 类选择器 */
.className{

}
/* ID 选择器 */
#id{

}
/* 一个元素有多个类，连着写 */
.classNameA.classNameB {

}
```
## 属性选择器
| 选择器 | 示例 | 描述 |
| ---- | ---- | ---- |
| [attr] |	a[title] |	匹配带有一个名为attr的属性的元素——方括号里的值。|
| [attr=value]| 	a[href="https://example.com"]| 	匹配带有一个名为attr的属性的元素，其值为value——引号中的字符串。|
| [attr~=value]| 	p[class~="special"]	| 匹配带有一个名为attr的属性的元素，其值为value，或者匹配带有一个attr属性的元素，其值有一个或者更多，至少有一个和value匹配。注意，在一列中的好几个值，是用空格隔开的。|
| [attr&#124;=value]	| div[lang&#124;="zh"] | 匹配带有一个名为attr的属性的元素，其值可正为value，或者开始为value，后面紧随着一个连字符（即后面紧跟着 - ）。|
| [attr^=value]	| li[class^="box-"]| 	匹配带有一个名为attr的属性的元素，其值开头为value子字符串。
| [attr$=value]| 	li[class$="-box"]| 	匹配带有一个名为attr的属性的元素，其值结尾为value子字符串
| [attr*=value]| 	li[class*="box"]| 	匹配带有一个名为attr的属性的元素，其值的字符串中的任何地方，至少出现了一次value子字符串。

在大小写不敏感的情况下，匹配属性值的话，你可以在闭合括号之前，使用i值
```css
/* 这里类名为 A 或 a 都会匹配到 */
li[class^="a" i] {
    color: red;
}
```

## 伪类与伪元素
### 伪类
伪类是选择器的一种，它用于选择处于特定状态的元素。一些例子如下：  
|伪类|含义|
|--|--|
:first-child| 第一个子元素  
:last-child| 最后一个子元素  
:only-child| 选择没有兄弟元素的子元素  
:invalid| 表单中验证不通过的元素。匹配诸如`<input>`的位于不可用状态的元素。  
:hover| 上面提到过，只会在用户将指针挪到元素上的时候才会激活，一般就是链接元素。  
:focus| 只会在用户使用键盘控制，选定元素的时候激活。  
:active| 在用户激活（例如点击）元素的时候匹配。  
:checked| 匹配处于选中状态的单选或者复选框。  
:focus| 当一个元素有焦点的时候匹配。  
:hover| 当用户悬浮到一个元素之上的时候匹配。  
:link| 匹配未曾访问的链接。   
:not()| 用来匹配不符合一组选择器的元素。由于它的作用是防止特定的元素被选中，它也被称为反选伪类。**括号内填不匹配的选择器**  
:nth-child(an+b)| 这个 CSS 伪类首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从 1 开始排序，选择的结果为 CSS 伪类:nth-child 括号中表达式（an+b）匹配到的元素集合（n=0，1，2，3...）。a 和 b 都必须为整数，并且元素的第一个子元素的下标为 1。换言之就是，该伪类匹配所有下标在集合 { an + b; n = 0, 1, 2, ...} 中的子元素。另外需要特别注意的是，an 必须写在 b 的前面，不能写成 b+an 的形式。
:is()| :is() CSS 伪类函数以选择器列表作为参数，并选择该列表中任意一个选择器可以选择的元素。但是不能选择伪元素。<br>例如 `:is(ol, ul) :is(ol, ul) `代表 `ol ol、ol ul、ul ol、ul ul`这四个选择器。
:where()| :where() CSS 伪类函数接受选择器列表作为它的参数，将会选择所有能被该选择器列表中任何一条规则选中的元素。
:root| 匹配文档树的根元素。对于 HTML 来说，:root 表示 `<html>` 元素，除了优先级更高之外，与 html 选择器相同。**可以在该伪类里面声明自定义属性**

#### 比较 :is() 和 :where() 
相同点：  
* 做的事情是一样的，作用是一样的
* 使用 :is() 或 :where() 时，如果一个选择器无法解析，整个选择器列表不会被视为无效，而是会忽略不正确或不支持的选择器，并使用其他的选择器。  

区别：
* :is() 会计入整个选择器的优先级（它采用其最具体参数的优先级），而 :where() 的优先级为 0。



### 伪元素
伪元素以类似方式表现，不过表现得是像你往标记文本中加入全新的 HTML 元素一样，而不是向现有的元素上应用类。伪元素开头为双冒号`::`。一些例子如下：  
* ::first-line -- 伪元素选择器会值得信赖地做到这件事——即使单词/字符的数目改变，它也只会选中第一行。  
* ::first-letter -- 匹配元素的第一个字母。  
* ::selection -- 匹配文档中被选择的那部分。  

### 生成带有::before 和::after 的内容
::before 和 ::after 与 content属性一同使用，使用 CSS 将内容插入到你的文档中中。通常不会插入内容，而是插入图标或者图案
```css
/* 这里是在元素前插入了一段内容 */
.box::before {
    content: "This should show before the other content. ";
}   
/* 这里是插入图标 */
.box::after {
    content: " ➥";
}   
/* 这里插入了一个方块，注意 content 为 ""。注意要设置 display，不然显示不出来 */
.box::before {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: rebeccapurple;
    border: 1px solid black;
}   
```

## 关系选择器（Combiner）
1. 后代选择器
   ```css
   /* 匹配处于带有.box类的元素里面的<p>元素 */
    .box p {
        color: red;
    } 
   ```
2. 子代关系选择器  
   子代关系选择器是个大于号（>），只会在选择器选中**直接子元素**的时候匹配（只要层级属于直接子元素，不管上面有多少元素都会匹配到）。继承关系上更远的后代则不会匹配。
   ```css
    ul > li {
        border-top: 5px solid red;
    }  
   ```
3. 邻接兄弟  
    邻接兄弟选择器（+）用来选中恰好处于另一个**在继承关系上同级的元素旁边的物件**。  
    例如，选中所有紧随`<p>`元素之后的`<img>`元素：
    ```css
     p + img {

     }
    ```
4. 通用兄弟  
    如果你想选中一个元素的兄弟元素，即使它们不直接相邻，你还是可以使用通用兄弟关系选择器（~）。    
    **注意：只能选择元素后的兄弟元素，元素前面的兄弟元素不会选中**  
    要选中所有的`<p>`元素**后任何地方**的`<img>`元素，我们会这样做：
    ```css
     p ~ img {

     }
    ```

# 自定义属性（--*）：CSS 变量
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
    
# 层叠与继承
## 继承
继承：一些设置在父元素上的 CSS 属性是可以被子元素继承的，有些则不能。  

控制继承：  
CSS 为控制继承提供了五个特殊的通用属性值。每个 CSS 属性都接收这些值。
* inherit  
设置该属性会使子元素属性和父元素相同。实际上，就是“开启继承”。

* initial  
将应用于选定元素的属性值设置为该属性的初始值。

* revert  
将应用于选定元素的属性值重置为浏览器的默认样式，而不是应用于该属性的默认值。在许多情况下，此值的作用类似于 unset。

* revert-layer  
将应用于选定元素的属性值重置为在上一个层叠层中建立的值。

* unset  
将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial 一样

## 层叠
决定 CSS 规则的因素：资源顺序、优先级。

### 资源顺序
有两条相同权重的规则，后面的规则会应用。可以理解为后面的规则覆盖前面的规则，直到最后一个开始设置样式。  
资源顺序仅在规则的优先级相同时才体现出来

### 优先级
发生冲突的是规则，需要比较的是规则所在的选择器的优先级。

一个选择器的优先级可以说是由三个不同的值（或分量）相加，可以认为是百（ID）十（类）个（元素）——三位数的三个位数：
* ID：选择器中包含 **ID 选择器**则百位得一分。
* 类：选择器中包含**类选择器、属性选择器或者伪类**则十位得一分。
* 元素：选择器中包含**元素、伪元素选择器**则个位得一分。
> 通用选择器（*）、组合符（+、>、~、' '）和调整优先级的选择器（:where()）不会影响优先级。  
> 
> 否定（:not()）和任意匹配（:is()）伪类本身对优先级没有影响，但它们的参数则会带来影响。参数中，对优先级算法有贡献的参数的优先级的最大值将作为该伪类选择器的优先级。

内联样式，即 style 属性内的样式声明，优先于所有普通的样式，无论其优先级如何。  
少用 !important。


# CSS3 动画
## transform 属性
* transform：none ； 	默认值
* transform：translate（）；	移动  平移  单位是px
* transform：rotate（）；	旋转  单位是deg   deg度数
* transform：scale（）；缩放  没有单位  默认值是1
* transform：skew（）；	倾斜   单位是deg
* transform：matrix（）；	矩阵 
* transform：perspective（）；	景深   视距  单位是px
## transform-origin 属性
transform-origin 属性表示在对元素进行变换的时候，设置围绕哪个点进行变化的。默认情况，变换的原点在元素的中心点，即是元素X轴和Y轴的50%处。X 轴和 Y 轴的起点为元素的左上角。

用法：transform-origin: x-axis y-axis z-axis;  
取值为 `<length><percentage>`，或 `left, center, right, top, bottom`关键字中的一个。  
如果取值为数值，那么是从元素的左上角开始算起。
## 使用动画
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
        25%  {background: yellow;}
        50%  {background: blue;}
        100% {background: green;}
    }
 
    @-webkit-keyframes myfirst /* Safari 与 Chrome */
    {
        from {background: red;}
        to {background: yellow;}
    }
   ```
2. 绑定动画到选择器  
   通过 `animation` 属性设置动画相关属性
   ```css
   div {
        animation: myfirst 5s;
        -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
    }
   ```
## 动画属性
* @keyframes：	规定动画。	
* animation：	所有动画属性的简写属性。	
* animation-name：	规定 @keyframes 动画的名称。	
* animation-duration：	规定动画完成一个周期所花费的秒或毫秒。默认是 0。	
* animation-timing-function：	规定动画的速度曲线。默认是 "ease"。	
  * linear	动画从头到尾的速度是相同的。
  * ease	默认。动画以低速开始，然后加快，在结束前变慢。	
  * ease-in	动画以低速开始。	
  * ease-out	动画以低速结束。	
  * ease-in-out	动画以低速开始和结束
* animation-fill-mode：	规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。	
* animation-delay：	规定动画何时开始。默认是 0。	
* animation-iteration-count：	规定动画被播放的次数。默认是 1。持续播放设置为 infinite	
* animation-direction：	规定动画是否在下一周期逆向地播放。默认是 "normal"。	
* animation-play-state：	规定动画是否正在运行或暂停。默认是 "running"。

# CSS3 过渡
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。  
要设置的：1、指定要添加效果的CSS属性；2、指定效果的持续时间，如果没有指定持续时间，则过渡没有效果。  
```css
/* 当鼠标放在div上，div在2s内变宽，在3s内变高 */
div
{
    transition: width 2s, height 3s;
    -webkit-transition: width 2s; /* Safari */
}
div:hover
{
    width:300px;
    height:500px;
}
```
## 过渡属性
* transition：	简写属性，用于在一个属性中设置四个过渡属性。	
* transition-property：	规定应用过渡的 CSS 属性的名称。	
* transition-duration：	定义过渡效果花费的时间。默认是 0。	
* transition-timing-function：	规定过渡效果的时间曲线。默认是 "ease"。	
* transition-delay：	规定过渡效果何时开始。默认是 0。

# 响应式布局
1. 流式布局   
    流式布局就是百分比布局，也称非固定像素布局。它通过将盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。流式布局方式是移动web开发中使用的比较常见的布局方式。设置以下属性是为了保护文本内容无限制扩张或者页面收缩导致内容丢失。
2. flex布局  
3. meta媒体查询  
    meta标签，通过媒体查询 按照不同手机的像素宽高不同，进行条件匹配
    ```css
    @media not|only mediatype and (expressions) {
            /* CSS-Code; */
    }
    ```
    搭配 rem 使用：rem适配布局
    * em：子元素字体大小单位如果使用em是相对于父元素字体大小，而元素的width/height/padding/margin属性用em的话则是相对于该元素的font-size大小。
    * rem：相对于根元素html。
4. vw/vh布局  
    vwl/vh是一个相对单位（类似em和rem相对单位)，所以不同视口（屏幕）下，宽高可以一起变化完成适配。  
    vw是viewport width：视口宽度单位；vh是viewport height：视口高度单位。  
    它们是相对视口的尺寸计算：1vw = 1/100视口宽度，1vh = 1/100视口高度。（固定分为100份）  
    例如：当前视口宽度是520px，则1vw=5.2px。  
    vw/vh布局和百分比布局的区别：百分比是相对于父元素来说的，而vw/vh是相对于当前视口来说的。

## 实现响应式布局
Bootstrap 的 响应式布局或 element-ui 的 row、col 布局 **都是使用 `flex` 布局实现的**。

**原理**：
1. `row`
   1. Bootstrap 的 `row` 代表：设置样式 `display: flex; flex-wrap: wrap`
2. `col-3、col-5`
   1. 类似 `col-3、col-5` 代表：设置 `flex-grow: 0;flex-shrink: 0;flex-basic：`
   2. `flex-basic` 根据 col 后的数字设置，例如 `col-6` 是 25%，`col-4` 是16.6666666667% 。通常使用简写 `flex: 0 0 25%`。
   3. **注意**：`flex-basic` 设置的是**百分比，而不是具体的数值**，例如 100px，这样就可以让物体的初始宽度根据布局的宽度设置
3. `xs、sm、md、lg 和 xl`
   1. Bootstrap 预设了五个响应尺寸：`xs、sm、md、lg 和 xl`。这是使用 `@media` 实现的，五个响应尺寸分别对应不同的屏幕的最小宽度
4. `col-offset-6`
   1. `offet` 指定列偏移量，对应的 css 样式为 `margin-right: 25%`。通过设置 `margin-right` 实现偏移，偏移的值为 `offset` 对应的数字对应的百分比。
   2. 例如：24栏，偏移6栏，即偏移 25%

**实现**:  

html
```html
<div class="paramList">
  <div class="paramBox"></div>
  <div class="paramBox"></div>
</div>
```

css
```css
.paramList {
  display: flex; 
  flex-wrap: wrap;
}

.paramBox {
    width: 200px;
    height: 200px;
    background-color:rgb(243, 243, 243);
    /* 这里 22% 为初始的大小 */
    flex: 0 0 22%;
}

/* 通过 @media 指定不同的屏幕宽度，物品的初始宽度为多少。对应 sm、lg 等尺寸 */
@media only screen and (max-width: 1200px) {
    .paramBox {
        flex: 0 0 30%;
    }
}

@media only screen and (max-width: 1000px) {
    .paramBox {
        flex: 0 0 40%;
    }
}
```

# 布局
1. 自适应布局  
    * 自适应布局的特点是分别为不同的屏幕分辨率定义布局，即创建多个静态布局，每个静态布局对应一个屏幕分辨率范围。  
    * 改变屏幕分辨率可以切换不同的静态局部（页面元素位置发生改变），但在每个静态布局中，页面元素不随窗口大小的调整发生变化。可以把自适应布局看作是静态布局的一个系列。
    * 屏幕分辨率变化时，页面里面元素的位置会变化而大小不会变化。
    * 使用 @media 媒体查询给不同尺寸和介质的设备切换不同的样式。
2. 响应式布局
   * 每个屏幕分辨率下面会有一个布局样式，即元素位置和大小都会变

# @Media
@media 规则可用于基于一个或多个媒体查询的结果来应用样式表的一部分。  
使用它，你可以指定一个媒体查询和一个 CSS 块，当且仅当该媒体查询与正在使用其内容的设备匹配时，该 CSS 块才能应用于该文档。

例子：  
**在 @media 块内写 css 规则**
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

## 媒体类型
媒体类型（media type）描述设备的一般类别。除非使用 not 或 only 逻辑运算符，否则媒体类型是可选的，并且会（隐式地）应用 all 类型。
* all
  * 适用于所有设备。
* print
  * 适用于在打印预览模式下在屏幕上查看的分页材料和文档。（有关特定于这些格式的格式问题的信息，请参阅分页媒体。）
* screen
  * 主要用于屏幕。

## 媒体特性
媒体特性（media feature）描述了用户代理、输出设备或环境的具体特征。
|媒体特征|含义|
|--|--|
max-color| 最大颜色
max-color-index| 最大颜色索引
max-aspect-ratio| 最大宽高比
max-device-aspect-ratio| 最大设备屏幕宽高比
max-device-height| 设备屏幕的最大高度
max-device-width| 设备屏幕的最大宽度
max-height| 最大高度
max-monochrome| 每个像素的最大单色原件个数
max-resolution| 最大分辨率
max-width| 最大宽度
min-color| 最小颜色
min-color-index| 最小颜色索引
min-aspect-ratio| 最小宽高比
min-device-aspect-ratio| 最小设备屏幕宽高比
min-device-height| 设备屏幕的最小高度
min-device-width| 设备屏幕的最小宽度
min-height| 最小高度
min-width| 属性为给定元素设置最小宽度。
min-monochrome| 每个像素的最小单色原件个数
min-resolution| 最小分辨率
prefers-color-scheme | 检测用户倾向于选择亮色还是暗色的配色方案。于媒体查询第 5 版中被添加。

## 逻辑运算符
逻辑运算符（logical operator）`not、and、only 和 or` 可用于联合构造复杂的媒体查询，你还可以通过用逗号分隔多个媒体查询，将它们组合为一个规则。


# CSS 排版
页面布局技术的细节：
* 正常布局流
* display属性
* 弹性盒子
* 网格
* 浮动
* 定位
* CSS 表格布局
* 多列布局

## 正常布局流
正常布局流（normal flow）是指在不对页面进行任何布局控制时，浏览器默认的 HTML 布局方式

## 弹性盒子
Flexbox 是 CSS 弹性盒子布局模块（Flexible Box Layout Module）的缩写，它被专门设计出来用于创建横向或是纵向的一维页面布局。

当设置display: flex时，子元素自动按列进行排列。这是由于它们变成了flex 项 (flex items)，按照 flex 容器（也就是它们的父元素）的一些 flex 相关的初值进行 flex 布局。  
它们整整齐齐排成一行，是因为父元素上 flex-direction 的初值是 row 。它们全都被拉伸至和最高的元素高度相同，是因为父元素上 align-items 属性的初值是 stretch 。这就意味着所有的子元素都会被拉伸到它们的 flex 容器的高度，就是所有 flex 项中最高的一项。所有项目都从容器的开始位置进行排列，排列成一行后，在尾部留下一片空白。  
**flex-direction 的初值是 row，align-items 属性的初值是 stretch**

### flex模型说明
当元素表现为 flex 框时，它们沿着两个轴来布局：
* 主轴（main axis）是沿着 flex 元素放置的方向延伸的轴（比如页面上的横向的行、纵向的列）。该轴的开始和结束被称为 main start 和 main end。
* 交叉轴（cross axis）是垂直于 flex 元素放置方向的轴。该轴的开始和结束被称为 cross start 和 cross end。
* 设置了 display: flex 的父元素（在本例中是 <section>）被称之为 flex 容器（flex container）。
* 在 flex 容器中表现为弹性的盒子的元素被称之为 flex 项（flex item）

### 属性
* flex-direction
  * 定义了主轴的方向
  * 默认值为 row。
  * row：行；column：列；row-reverse：方向反的行；column-reverse：方向反的列
* flex-warp
  * 指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。
  * nowrap：默认值。flex 的元素被摆放到到一行，这可能导致 flex 容器溢出。
  * wrap：flex 元素 被打断到多个行中。cross-start 会根据 flex-direction 的值等价于 start 或before。cross-end 为确定的 cross-start 的另一端。
  * wrap-reverse：和 wrap 的行为一样，但是 cross-start 和 cross-end 互换。
* flex-flow
  * 是 flex-direction 和 flex-wrap 的简写
  * 例子：`flex-flow: row wrap`;
* flex-grow
  * 设置 flex 项 主尺寸 的 flex **增长**系数。（就是会变大的参数）
  * 属性规定为一个 number，负值无效，默认为 0
  * 这个属性规定了 flex-grow 项在 flex 容器中分配剩余空间的相对比例
  * 剩余空间是 flex 容器的大小减去所有 flex 项的大小加起来的大小。**如果所有的兄弟项目都有相同的 flex-grow 系数，那么所有的项目将剩余空间按相同比例分配**，否则将根据不同的 flex-grow 定义的比例进行分配。
* flex-shrink
  * 指定了 flex 元素的**收缩**规则。flex 元素**仅在默认宽度之和大于容器的时候才会发生收缩**，其收缩的大小是依据 flex-shrink 的值。
  * 属性规定为一个 number，负值无效，默认为 1
  * 数字越大，收缩得越厉害
* flex-basic
  * 指定了 flex 元素在主轴方向上的**初始大小**
  * 当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width，flex-basis 具有更高的优先级。
  * 取值为 关键词 content 或者 <'width'>
  * 默认值为 auto
  * 取值为 content 时，可以取 content、fill、max-content、min-content、fit-content
  * 取值为 width 时，输入具体的长度值或百分比
* flex
  * 是 flex-grow、flex-shrink、flex-basic 的缩写
* align-items 
  * 控制 flex 项在**交叉轴**上的位置。
  * **默认的值是 stretch**，其会使所有 flex 项沿着交叉轴的方向拉伸以填充父容器。如果父容器在交叉轴方向上没有固定宽度（即高度），则所有 flex 项将变得与最长的 flex 项一样长（即高度保持一致）。
  * center：使 flex 项保持其原有的高度，但是会在交叉轴居中。
  * flex-start：元素向交叉轴起点对齐。
  * flex-end：元素向交叉轴终点对齐。
  * center：元素在交叉轴轴居中。如果元素在交叉轴轴上的高度高于其容器，那么在两个方向上溢出距离相同。
  * baseline、first baseline、last baseline  
    沿着交叉轴方向，按照项目内的**文字**对齐
* justify-content 
  * 控制 flex 项在主轴上的位置。
  * **默认值是 flex-start**，这会使所有 flex 项都位于主轴的开始处。
  * flex-end 让 flex 项到结尾处。
  * center 可以让 flex 项在主轴居中。
  * space-around 会使所有 flex 项沿着主轴均匀地分布，在任意一端都会留有一点空间。
  * space-between，它和 space-around 非常相似，只是它不会在两端留下任何空间。
* order
  * 给 flex 项排序
  * 所有 flex 项默认的 order 值是 0。
  * order 值大的 flex 项比 order 值小的在显示顺序中更靠后。
* align-content
  * 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  * 该属性对单行弹性盒子模型无效。（即：带有 flex-wrap: nowrap）。
  * start：所有行从容器的起始边缘开始填充。
  * end：所有行从容器的结束边缘开始填充。
  * center：与交叉轴的中点对齐。
  * space-between：所有行在容器中平均分布。相邻两行间距相等。容器的垂直轴起点边和终点边分别与第一行和最后一行的边对齐。
  * space-around：所有行在容器中平均分布，相邻两行间距相等。容器的垂直轴起点边和终点边分别与第一行和最后一行的距离是相邻两行间距的一半。
  * space-evenly：所有行沿垂直轴均匀分布在对齐容器内。每对相邻的项之间的间距，主开始边和第一项，以及主结束边和最后一项，都是完全相同的。
  * stretch：拉伸所有行来填满剩余空间。剩余空间平均地分配给每一行。

## Grid 布局（网格布局）
Flexbox 用于设计横向或纵向的布局，而 Grid 布局则被设计用于同时在两个维度上把元素按行和列排列整齐。

一个网格通常具有许多的列（column）与行（row），以及行与行、列与列之间的间隙，这个间隙一般被称为沟槽（gutter）

Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格
### 基本概念
采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。

划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。  
正常情况下，n行有n + 1根水平网格线，m列有m + 1根垂直网格线，比如三行就有四根水平网格线。

属性区分容器属性和项目属性

### 容器属性
* grid-template-columns 属性定义每一列的列宽
* grid-template-rows 属性定义每一行的行高。
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
* column-gap：设置列与列的间隔（列间距）
* row-gap：设置行与行的间隔（行间距）
* gap：column-gap 和 row-gap 的缩写。
  * 语法为：`gap: <row-gap> <column-gap>;`
  * 如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。
```css
.container {
  column-gap: 20px;
  row-gap: 30px;
  gap: 30px 20px
}
```
* grid-template-areas 属性：指定"区域"（area），一个区域由单个或多个单元格组成
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
* grid-auto-flow 属性：决定容器的子元素的放置顺序。
  * 默认值是 row ，即"先行后列"，即先填满第一行，再开始放入第二行
  * column：先列后行
  * row dense：先行后列，并且尽可能紧密填满，尽量不出现空格
  * column dense：先列后行，并且尽可能紧密填满，尽量不出现空格
```css
grid-auto-flow: column;
```

* justify-items 属性：设置**单元格内容**的水平位置（左中右）
* align-items 属性：设置**单元格内容**的垂直位置（上中下）
* place-items 属性：是align-items属性和justify-items属性的合并简写形式。
  * 格式：place-items: `<align-items>` `<justify-items>`;
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
* justify-content 属性：整个内容区域在容器里面的水平位置（左中右）
* align-content 属性：是整个内容区域的垂直位置（上中下）
* place-content 属性：是align-content属性和justify-content属性的合并简写形式。
  * 格式：place-content: `<align-content>` `<justify-content>`
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
* grid-auto-columns 属性：设置浏览器自动创建的多余网格的列宽
* grid-auto-rows 属性：设置浏览器自动创建的多余网格的行高
```css
/* 如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。 */
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
}
```

### 项目属性
指定项目的位置：
* grid-column-start 属性：左边框所在的垂直网格线
* grid-column-end 属性：右边框所在的垂直网格线
* grid-row-start 属性：上边框所在的水平网格线
* grid-row-end 属性：下边框所在的水平网格线
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
* grid-column 属性：grid-column-start 和 grid-column-end 的合并简写形式
* grid-row 属性：grid-row-start 属性和 grid-row-end 的合并简写形式。
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
* grid-area属性：指定项目放在哪一个区域。
```css
.item-1 {
  grid-area: e;

  /* 还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。 */
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```
* justify-self 属性：设置**单个单元格**内容的水平位置
* align-self 属性：设置**单个单元格**内容的垂直位置
* place-self 属性：align-self属性和justify-self属性的合并简写形式

# px、em、rem
px (pixel) is an absolute unit and is not scalable. It always stays the same size, regardless of the screen size or the user's preferences. This makes it a good choice for small, fixed-size elements like borders, but it can cause problems with accessibility and responsiveness.

em (em) is a relative unit that is based on the font size of the parent element. It can be useful for creating scalable typography, but it can also be unpredictable when nested inside multiple elements with varying font sizes.

rem (root em) is a relative unit that is based on the font size of the root element (which is typically the html element). Unlike em, it is not affected by the font size of the parent element. This makes it a good choice for creating scalable typography and responsive layouts.

So, which one is better to use? It depends on the specific use case. Here are a few general guidelines:
* Use px for small, fixed-size elements like borders or shadows.
* Use em for typography and other scalable elements that need to change size relative to their parent element.
* Use rem for scalable typography and responsive layouts that need to change size relative to the root element.
- 将px用于固定大小的小元素，如边框或阴影。
* 将em用于排版和其他需要相对于其父元素更改大小的可缩放元素。
* 对于需要相对于根元素更改大小的可伸缩排版和响应布局，请使用rem。

px（像素）是一个绝对单位，不可缩放。无论屏幕大小或用户偏好如何，它始终保持相同的大小。

em 和 rem 的区别：
* em：
  * 子元素字体大小单位如果使用em是相对于父元素字体大小
  * 而元素的 `width/height/padding/margin` 属性用em的话则是相对于**该元素**的 `font-size` 大小。
* rem：
  * 相对于根元素 html。元素的字体大小和 `width/height/padding/margin` 都是相对于根元素 html

# 模块
## 全局作用域
CSS Modules 允许使用 `:global(.className)` 的语法，声明一个全局规则。凡是这样声明的class，都不会被编译成哈希字符串。

App.css加入一个全局class。

```css
.title {
  color: red;
}

:global(.title) {
  color: green;
}
```
App.js使用普通的class的写法，就会引用全局class。
```js
import React from 'react';
import styles from './App.css';

export default () => {
  return (
    <h1 className="title">
      Hello World
    </h1>
  );
};
```

# 浮动
## 介绍
CSS 的 Float（浮动），会使元素向左或向右移动，其周围的元素也会重新排列。

- 元素的水平方向浮动，意味着元素只能左右移动而不能上下移动。
- 一个浮动元素会尽量向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
- 浮动元素**之后**的元素将围绕它。
- 浮动元素**之前**的元素将**不会受到影响**。

以 `float:left` 为例：
- **浮动元素会脱离正常的文档布局流**，并吸附到其父容器的左边。
- 在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其**右侧**的空间。


我们可以在浮动元素上应用 `margin`，将文字推开，但不能在文字上应用 margin 将浮动元素推走。
```html
<div class="outer">
	<div class="left">123</div>
	<div class="right">456</div>
</div>
```
```css
.left {
  float: left;
  margin-right: 20px; /* 这里的 margin 会推开文字，但是如果给 class 为 right 的 div 设置背景色会发现不会推开class 为 right 的 div */
}
```
注意：**文字会排布在浮动元素周围，但是浮动元素从正常文档流移出，故段落的盒子仍然保持全部宽度。**

## 清除浮动
不让元素受到浮动元素的影响，通过 `clear` 属性实现的。 `clear` 属性接受下列值：
- left：停止任何活动的左浮动
- right：停止任何活动的右浮动
- both：停止任何活动的左右浮动

## 清除浮动元素周围的盒子
假设一个盒子同时包含了很高的浮动元素和一个很短的段落。盒子会只包含段落，浮动元素溢出盒子。
```html
<div class="wrapper">
  <div class="box">Float</div>

  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus
    aliquam dolor, eu lacinia lorem placerat vulputate.
  </p>
</div>
```
实现目的：**让盒子联合包住浮动的项目以及第一段文字，同时让紧随其后的内容从盒子中清除浮动**

实现方法：
1. 使用 `clear` 属性  
   先向包含浮动内容及其本身的盒子后方插入一些生成的内容，并将生成的内容清除浮动。
    ```css
    .wrapper::after {
      content: "";
      clear: both;
      display: block;
    }
    ```
   这与在浮动盒子后手动添加诸如 div 的 HTML 元素，并设置其样式为 clear:both 是等效的。
2. 使用 `overflow`  
   将包裹元素的 `overflow` 属性设置为除 `visible` 外的其他值。
    ```css
    .wrapper {
      overflow: auto
    }
    ```
3. 使用 `display: flow-root`  
   使用 `display` 属性的 `flow-root` 值来创建块格式化上下文（BFC），在使用上没有副作用。
    ```css
    .wrapper {
      display: flow-root;
    }
    ```