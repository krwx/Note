# Inheritance（继承）

- [Inheritance（继承）](#inheritance继承)
  - [介绍](#介绍)
  - [哪些属性可以继承？](#哪些属性可以继承)
    - [1. 可继承的属性](#1-可继承的属性)
    - [2. 不可继承的属性](#2-不可继承的属性)
  - [控制继承的关键字](#控制继承的关键字)

## 介绍

CSS（层叠样式表）中的**继承**是一种机制，它允许子元素从父元素那里获取某些样式属性的值。

## 哪些属性可以继承？

并非所有CSS属性都能被继承。属性通常分为两大类：

### 1. 可继承的属性

大部分与**文本**、**字体**、**列表**和**外观**相关的属性会被继承。

- **字体类**：`font-family`、`font-size`、`font-weight`、`font-style`等。
- **文本类**：`color`、`text-align`、`line-height`、`text-indent`、`letter-spacing`、`word-spacing`等。
- **可见性**：`visibility`（如`hidden`）。
- **列表**：`list-style`（如`list-style-type`、`list-style-image`）。
- **光标**：`cursor`。

### 2. 不可继承的属性

大多数与**布局**、**盒模型**和**背景**相关的属性不会被继承。如果这些属性被继承，会导致布局混乱。

- **盒模型**：`width`、`height`、`margin`、`padding`、`border`。
- **背景**：`background`（除非使用`background`的某些特定值，但通常背景不会继承）。
- **定位**：`position`、`top`、`left`、`z-index`。
- **溢出**：`overflow`。

## 控制继承的关键字

CSS 为控制继承提供了五个特殊的通用属性值。每个 CSS 属性都接收这些值。

- `inherit`  
  - 使子元素获取其父元素的属性值，无论该属性是否默认可继承。
- `initial`  
  - 将属性重置为 CSS 规范定义的初始值（默认值）。
  - 例如，`color: initial;` 通常重置为黑色（不同浏览器略有差异）。
- `unset`  
  - 如果属性是可继承属性，则表现为 `inherit`；如果是不可继承属性，则表现为 `initial`。
- `revert`  
  - 将属性恢复为浏览器用户代理样式表（UA样式）设置的样式，如果不存在UA样式，则相当于 `unset`。
- `revert-layer`  
  - 将属性值还原为**前一个级联层**中对应的值（如果存在），否则回退到用户代理样式（类似于 revert）。
  - 与 `@layer` 结合使用

例子：

```html
<style>
  .parent {
    color: red;
    border: 1px solid black; /* border 通常不可继承 */
  }
  .child {
    border: inherit; /* 强制继承父元素的边框 */
  }
  .reset {
    all: initial; /* 重置所有属性 */
  }
</style>

<div class="parent">
  父元素（红色边框和文字）
  <div class="child">子元素：继承了父元素的边框</div>
  <div class="reset">所有属性被重置，不再继承父元素的红色</div>
</div>
```

`revert-layer` 例子：

```css
@layer base {
  p {
    color: red;
    font-size: 1rem;
  }
}

@layer theme {
  p {
    color: blue;
    font-size: revert-layer; /* 回滚到 base 层的 font-size 值 */
  }
}
```

> `all` 是一个CSS简写属性，可以一次性将所有属性（除了 `unicode-bidi` 和 `direction` ）重置或应用继承。
