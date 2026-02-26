# svg

- [svg](#svg)
  - [1. 在 HTML 中使用 SVG 的几种方式](#1-在-html-中使用-svg-的几种方式)
    - [1.1 内联 SVG](#11-内联-svg)
    - [1.2 通过 `<img>` 标签引用](#12-通过-img-标签引用)
    - [1.3 通过 `<object>` 或 `<embed>` 标签引用](#13-通过-object-或-embed-标签引用)
    - [1.4 作为 CSS 背景图](#14-作为-css-背景图)
  - [2. SVG 的基本形状和元素](#2-svg-的基本形状和元素)
  - [3. SVG 的主要特点](#3-svg-的主要特点)
  - [4. SVG 与 Canvas 的对比](#4-svg-与-canvas-的对比)
  - [5. 简单示例：带交互的 SVG](#5-简单示例带交互的-svg)
  - [6. 注意事项](#6-注意事项)

SVG（Scalable Vector Graphics，可缩放矢量图形）是一种基于 XML 的标记语言，用于描述二维矢量图形。在 HTML 中，可以通过多种方式直接嵌入 SVG 代码或引用 SVG 文件，实现图标、插图、图表等矢量图形的显示。

## 1. 在 HTML 中使用 SVG 的几种方式

### 1.1 内联 SVG

将 SVG 代码直接写入 HTML 文档中，这是最灵活的方式，可以通过 CSS 和 JavaScript 完全控制图形样式和行为。

```html
<!DOCTYPE html>
<html>
<body>
  <svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>
</body>
</html>
```

### 1.2 通过 `<img>` 标签引用

使用 `<img>` 标签的 `src` 属性指向一个 `.svg` 文件。

```html
<img src="icon.svg" alt="矢量图标" width="50" height="50">
```

这种方式无法直接用 CSS 修改 SVG 内部样式，适合静态展示。

### 1.3 通过 `<object>` 或 `<embed>` 标签引用

适用于需要交互或脚本控制的场景。

```html
<object type="image/svg+xml" data="chart.svg" width="300" height="200"></object>
```

### 1.4 作为 CSS 背景图

在 CSS 中设置 `background-image` 为 SVG 文件。

```css
.element {
  background-image: url('pattern.svg');
}
```

## 2. SVG 的基本形状和元素

SVG 提供了一系列基础图形元素，常用有：

- **矩形** `<rect>`
- **圆形** `<circle>`
- **椭圆** `<ellipse>`
- **线条** `<line>`
- **折线** `<polyline>`
- **多边形** `<polygon>`
- **路径** `<path>`（最强大，可绘制任意复杂形状）

示例：绘制一个红色矩形和蓝色圆形

```html
<svg width="200" height="200">
  <rect x="10" y="10" width="80" height="60" fill="red" />
  <circle cx="150" cy="50" r="40" fill="blue" />
</svg>
```

## 3. SVG 的主要特点

- **矢量特性**：无论放大多少倍，图形边缘始终保持清晰，非常适合响应式设计和视网膜屏幕。
- **可样式化**：可以使用 CSS 控制填充色、边框、透明度等（对内联 SVG 有效）。
- **可脚本化**：通过 JavaScript 可以动态修改 SVG 结构、属性和样式，实现动画和交互。
- **轻量**：相比位图，简单图形文件体积更小。
- **可搜索、可压缩**：基于文本的格式，有利于 SEO 和 gzip 压缩。

## 4. SVG 与 Canvas 的对比

| 特性 | SVG | Canvas |
| --- | --- | --- |
| 类型 | 矢量图（XML 描述） | 位图（像素绘制） |
| 缩放 | 无限清晰，无锯齿 | 放大后会模糊 |
| DOM 操作 | 每个图形都是 DOM 节点，可绑定事件 | 只有画布本身是 DOM，图形无法单独绑定事件 |
| 性能 | 图形数量多时 DOM 开销大 | 适合大量像素级操作和游戏渲染 |
| 适用场景 | 图标、图表、交互式矢量图形 | 数据可视化、动画、图像处理 |

## 5. 简单示例：带交互的 SVG

内联 SVG 可以通过 CSS 改变样式，甚至实现简单的悬停效果。

```html
<style>
  svg circle {
    transition: fill 0.3s;
  }
  svg circle:hover {
    fill: orange;
  }
</style>
<svg width="120" height="120">
  <circle cx="60" cy="60" r="50" fill="purple" />
</svg>
```

## 6. 注意事项

- 内联 SVG 需要设置 `viewBox` 属性来定义坐标系和缩放行为。
- 在 `<img>` 标签中使用 SVG 时，出于安全考虑，SVG 内部的脚本和外部资源可能被限制。
- SVG 支持 `<style>` 标签和内联样式，也可以使用类或 ID 进行样式复用。
