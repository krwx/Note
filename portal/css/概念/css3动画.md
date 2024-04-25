# CSS3 动画

- [CSS3 动画](#css3-动画)
  - [使用动画](#使用动画)
    - [注意](#注意)
  - [动画属性](#动画属性)
  - [transform-origin 属性](#transform-origin-属性)
  - [transform 属性](#transform-属性)
    - [translate](#translate)

## 使用动画

1. 设置 `keyframes`  
   `@keyframes` 规则内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式。  
   两种设置方式：1、使用 `from、to`； 2、使用百分比，尽量都设置0%和100%

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

### 注意

1. `from、to` 或百分比里面设置的样式都是**相对于原始状态设置的**，而不是相对于上一个状态的样式设置

## 动画属性

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

CSS `animation` 属性是

- `animation-name`，
- `animation-duration`,
- `animation-timing-function`，
- `animation-delay`，
- `animation-iteration-count`，
- `animation-direction`，
- `animation-fill-mode` 和
- `animation-play-state`

属性的一个简写属性形式。

## transform-origin 属性

`transform-origin` 属性表示在对元素进行变换的时候，设置围绕哪个点进行变化的。默认情况，变换的原点在元素的中心点，即是元素X轴和Y轴的50%处。X 轴和 Y 轴的起点为元素的左上角。

用法：`transform-origin: x-axis y-axis z-axis`;  
取值为 `<length><percentage>`，或 `left, center, right, top, bottom`关键字中的一个。  
如果取值为数值，那么是从元素的左上角开始算起。

## transform 属性

- `transform：none` ； 默认值
- `transform：translate（）`；移动  平移  单位是px
- `transform：rotate（）`；旋转  单位是deg   deg度数
- `transform：scale（）`；缩放  没有单位  默认值是1
- `transform：skew（）`；倾斜   单位是deg
- `transform：matrix（）`；矩阵
- `transform：perspective（）`；景深   视距  单位是px

### translate

CSS 属性 `translate` 允许你**声明平移变换**。

值：

- 单个 `<length-percentage>` 值
  - 一个 `<length>` 或 `<percentage>`，指沿 **`X`** 轴平移。等同于在 translate() 函数（2D 平移）中指定单个值。
- 两个 `<length-percentage>` 值
  - 两个 `<length>` 或 `<percentage>` 表示在二维上分别按照指定 **`X`** 轴和 **`Y`** 轴的值进行的平移。等同于在 translate() 函数（2D 平移）中函数指定两个值。
- 三个值
  - 两个 `<length-percentage>` 和单个的 `<length>` 分别指定 **`X`** 轴、**`Y`** 轴、**`Z`** 轴的值进行三维平移。等同于 translate3d() 函数（3D 平移）。
- `none`
  - 表示不应用平移效果。
