# transition

- [transition](#transition)
  - [介绍](#介绍)
  - [过渡属性](#过渡属性)
  - [怎么触发过渡](#怎么触发过渡)

## 介绍

CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。

要设置的：

1. 指定要添加效果的 CSS 属性
2. 指定效果的持续时间，如果没有指定持续时间，则过渡没有效果。  

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

- `transition`：简写属性，用于在一个属性中设置四个过渡属性。
- `transition-property`：规定应用过渡的 CSS 属性的名称。填 `all` 代表所有 CSS 属性都应用过渡。
- `transition-duration`：定义过渡效果花费的时间。默认是 0。
- `transition-timing-function`：规定过渡效果的时间曲线。默认是 "ease"。
- `transition-delay`：规定过渡效果何时开始。默认是 0。

例子：

```css
div {
    transition-property: width;
    transition-duration: 1s;
    transition-timing-function: linear;
    transition-delay: 2s;
}
/* 等价于 */
div {
    transition: width 1s linear 2s;
}
```

```css
div {
    transition-property: width, height, background-color;
    transition-duration: 1s, 2s, 3s;
    transition-timing-function: linear, ease-in, ease-out;
}
```

## 怎么触发过渡

过渡效果在元素的 CSS 属性值发生变化时触发。通常，这些变化是由用户交互（如悬停、点击）或 JavaScript 代码引起的。

- **伪类状态变化**：如 `:hover`、`:focus`、`:active`、`:checked` 等。
- **通过 JavaScript 改变样式**：修改元素的 `class`、直接修改 `style` 属性，或通过 `Element.classList` 等方法添加/移除类名。
- **媒体查询匹配变化**：例如窗口缩放导致不同的 CSS 规则生效。
- **元素自身属性变化**：如 `disabled` 属性改变（对某些表单元素）。
