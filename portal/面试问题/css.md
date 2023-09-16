## 1. 移动端布局有哪些 / 响应式布局是什么 / 响应式布局有哪些，怎么使用
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
    vw/vh是一个相对单位（类似em和rem相对单位)，所以不同视口（屏幕）下，宽高可以一起变化完成适配。  
    vw是viewport width：视口宽度单位；vh是viewport height：视口高度单位。  
    它们是相对视口的尺寸计算：1vw = 1/100视口宽度，1vh = 1/100视口高度。（固定分为100份）  
    例如：当前视口宽度是520px，则1vw=5.2px。  
    vw/vh布局和百分比布局的区别：百分比是相对于父元素来说的，而vw/vh是相对于当前视口来说的。
5. Bootstrab

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
* 流式布局的特点 是页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。代表作栅栏系统 网格系统.
* 布局特点  
屏幕分辨率变化时，页面里元素的大小会变化而但布局不变
* 设计方法  
使用%百分比定义宽度，高度大都是用px来固定住
* 缺点明显：主要的问题是如果屏幕尺度跨度太大，那么在相对其原始设计而言过小或过大的屏幕上不能正常显示

## 7. 行内布局的特点
行内布局是相邻的元素会在同一行上，宽度为元素的内容宽度，可以通过设置width属性改变宽度
```css
span{
    display:inline;
}
```
* inline（行内元素）:  
  * 使元素变成行内元素，拥有行内元素的特性，即可以与其他行内元素共享一行，不会独占一行.   
  * 不能更改元素的height，width的值，大小由内容撑开.   
  * 可以部分设置margin,padding属性：可以设置水平方向上的（left,right），不可以设置垂直方向上的（top,bottom）
  * 常见的行内元素有：span,a,strong,em,input,img,br等
  * 只有设置行高才可以增加行内框的高度（line-height）

## 8. 说一下块级上下文
相关知识点：
```
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
```
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
        -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
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
## 12. 在项目中有用过 em、rem、px 吗
## 13. flex 布局在什么时候会用
## 14. flex 布局设置换行通过哪个属性设置
## 15. display有哪些取值
## 16. display 为 absolute 的 div，假如它的父 div 的 display 不是 absolute、relative，那么这个 div 以谁为基准
## 17. display 的默认取值是什么
inline