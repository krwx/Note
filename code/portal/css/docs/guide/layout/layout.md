# 布局

- [布局](#布局)
  - [排版](#排版)
  - [px、em、rem](#pxemrem)
  - [适配不同的屏幕分辨率](#适配不同的屏幕分辨率)
    - [1. 自适应布局](#1-自适应布局)
    - [2. 响应式布局](#2-响应式布局)
      - [实现响应式布局](#实现响应式布局)

## 排版

排版相关概念：

- 正常布局流
  - 正常布局流（normal flow）是指在不对页面进行任何布局控制时，浏览器默认的 HTML 布局方式
- display
- position
- float
- Flexbox
- Grid
- column-count

## px、em、rem

- `px`
  - `pixel`（像素），是一个绝对单位，不可缩放。无论屏幕大小或用户偏好如何，它始终保持相同的大小。
- `em`
  - 元素的 **字体大小单位** 使用 `em` 是相对于**父元素字体大小**
  - 元素的 `width/height/padding/margin` 属性用 `em` 则是相对于该元素本身的 `font-size` 大小。
- `rem`
  - 相对于根元素 `html`。

使用场景：

- 将 `px` 用于固定大小的小元素，如边框或阴影。
- 将 `em` 用于排版和其他需要相对于其父元素更改大小的可缩放元素。
- 将 `rem` 用于需要相对于根元素更改大小的可伸缩排版和响应布局。

## 适配不同的屏幕分辨率

为了适配不同的屏幕分辨率，布局可以分为两大类：

1. 自适应布局
2. 响应式布局

### 1. 自适应布局

**核心思想**：

分别为不同的屏幕分辨率定义布局。创建多个静态布局，每个静态布局对应一个屏幕分辨率范围。

**实现方式**：

- 通过检测设备类型或屏幕宽度，选择加载其中一套布局。
- 使用 `@media` 媒体查询给不同的屏幕分辨率切换不同的样式。

### 2. 响应式布局

**核心思想**：

- 一套代码，自动适配所有屏幕。
- 布局使用 **相对单位**（`%`、`vw`、`vh`、`flex`、`grid`），配合媒体查询微调，让页面自动根据不同的屏幕尺寸进行调整。

**实现方式**：

1. 百分比布局（流式布局）
   - 它通过将盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩
2. `Flexbox`、`Grid` 布局
3. `vw`、`vh` 布局

上述的方式都可以搭配 **媒体查询** 使用

#### 实现响应式布局

Bootstrap 的 响应式布局或 element-ui 的 row、col 布局 **都是使用 `flex` 布局实现的**。

**原理**：

1. `row`
   1. Bootstrap 的 `row` 会设置样式 `display: flex; flex-wrap: wrap`
2. `col-3、col-5`
   1. 页面总共分为 24 栏，每个 `col` 后的数字代表占多少栏，
   2. 例如 `col-6` 代表占 6 栏，即占总宽度的 25%，会设置 `flex-grow: 0; flex-shrink: 0; flex-basis: 25%`。通常使用简写 `flex: 0 0 25%`。
3. `col-offset-6`
   1. `col-offset-[number]` 指定当前元素往右偏移多少列。
   2. 原理：设置 `margin-left` 实现偏移，`margin-left` 的值为要偏移多少列对应的百分比。
   3. `col-offset-6` 代表当前项往右偏移 6 列，对应 `margin-left: 25%`
4. `xs、sm、md、lg 和 xl`
   1. Bootstrap 预设了五个响应尺寸：`xs、sm、md、lg 和 xl`。这是使用 `@media` 实现的，五个响应尺寸分别对应不同的屏幕的最小宽度

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
