# box alignment

- [box alignment](#box-alignment)
  - [gap](#gap)
    - [1. `row-gap` 与 `column-gap`](#1-row-gap-与-column-gap)
    - [2. `gap`](#2-gap)
    - [3. 示例](#3-示例)
    - [4. 与 `margin` 的区别](#4-与-margin-的区别)

## gap

`gap`、`row-gap` 和 `column-gap` 这三个属性用于设置**容器内子元素之间**的间距，而非子元素与容器边缘的间距。

它们最早在 CSS Grid Layout 中引入，后来被扩展到 Flexbox 和多列布局（Multiple-column Layout）中，极大简化了以往使用 `margin` 处理间距的繁琐方式。

使用场景：**只能用于 `Grid`、`Flexbox` 和多列布局**。对普通文档流中的元素不起作用。

### 1. `row-gap` 与 `column-gap`

- **`row-gap`**：设置行与行之间的间隙（垂直方向）。
- **`column-gap`**：设置列与列之间的间隙（水平方向）。

> 注意：在 Grid 布局中，行与列的概念非常清晰；在 Flexbox 中，`row-gap` 对应主轴方向（通常是水平排列时的行间距），`column-gap` 对应交叉轴方向，但实际表现取决于 `flex-direction`。

**语法：**

```css
.container {
  row-gap: 20px;
  column-gap: 30px;
}
```

**取值**：支持长度单位（`px`、`em`、`rem`、`%` 等）以及 `normal`（默认值，通常为 0）。百分比是相对于容器尺寸的。

### 2. `gap`

`gap` 是 `row-gap` 和 `column-gap` 的简写形式。

- 一个值：同时设置 `row-gap` 和 `column-gap`。
- 两个值：第一个是 `row-gap`，第二个是 `column-gap`。

```css
/* 行和列间隙都是 20px */
.container {
  gap: 20px;
}

/* 行间隙 20px，列间隙 30px */
.container {
  gap: 20px 30px;
}
```

### 3. 示例

Grid 示例

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 10px;  /* 行间隙20px，列间隙10px */
}
```

Flexbox 示例

```css
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;        /* 所有 flex 子项之间横竖都是 1rem */
}
```

多列示例

```css
.article {
  column-count: 3;
  column-gap: 2em;  /* 列之间的空白宽度 */
}
```

### 4. 与 `margin` 的区别

|特性|`gap` / `row-gap` / `column-gap`|`margin`|
|---|---|---|
|控制方向|仅子项之间的间距，无边缘间距|可以控制任意方向的间距，包括与父容器的边缘|
|相邻子项间距叠加|不会叠加，取较大值或应用间隙值|相邻 `margin` 会折叠（垂直方向）|
|适用场景|专门为布局容器设计，语义清晰|通用，但需要手动处理首尾子项的额外边距|
