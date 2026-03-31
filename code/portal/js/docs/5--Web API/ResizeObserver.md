# ResizeObserver

- [ResizeObserver](#resizeobserver)
  - [什么是 ResizeObserver？](#什么是-resizeobserver)
  - [为什么需要 ResizeObserver？](#为什么需要-resizeobserver)
  - [基本用法](#基本用法)
    - [1. 创建观察器实例](#1-创建观察器实例)
    - [2. 开始观察元素](#2-开始观察元素)
    - [3. 停止观察](#3-停止观察)
  - [回调参数详解](#回调参数详解)
  - [核心特性](#核心特性)
  - [实际应用场景](#实际应用场景)
    - [场景一：响应式图表重绘](#场景一响应式图表重绘)
    - [场景二：自适应文本大小](#场景二自适应文本大小)
  - [与 window.resize 的区别](#与-windowresize-的区别)
  - [注意事项](#注意事项)
  - [简单示例：监听多个元素](#简单示例监听多个元素)

## 什么是 ResizeObserver？

**ResizeObserver** 是一个 JavaScript 的 API，用于监听元素的尺寸变化。当被观察元素的宽度、高度或边框尺寸发生变化时，会触发回调函数。这对于构建响应式组件、处理动态布局以及实现自适应界面非常有用。

## 为什么需要 ResizeObserver？

在过去，想要监听元素尺寸变化并没有原生且高效的方式：

- `window.resize` 事件只能监听窗口大小变化，无法感知单个元素的尺寸变化。
- 轮询检测元素尺寸会导致性能问题。
- 使用 `MutationObserver` 监听属性变化也不够精准和高效。

`ResizeObserver` 解决了这些痛点，提供了专门、高性能的尺寸监听方案。

## 基本用法

### 1. 创建观察器实例

```javascript
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    console.log('被观察的元素:', entry.target);
    console.log('元素的内容矩形尺寸:', entry.contentRect);
    console.log('元素的边框盒尺寸:', entry.borderBoxSize);
    console.log('元素的内容盒尺寸:', entry.contentBoxSize);
  }
});
```

### 2. 开始观察元素

```javascript
const element = document.querySelector('.my-element');
resizeObserver.observe(element);
```

### 3. 停止观察

```javascript
// 停止观察单个元素
resizeObserver.unobserve(element);

// 停止观察所有元素
resizeObserver.disconnect();
```

## 回调参数详解

回调函数接收一个 `entries` 数组，每个 entry 包含以下重要属性：

| 属性 | 描述 |
| ------ | ------ |
| `target` | 发生尺寸变化的 DOM 元素 |
| `contentRect` | 旧版返回对象，包含 width、height、top、left 等（已部分弃用） |
| `borderBoxSize` | 边框盒尺寸数组（包含 inlineSize 和 blockSize） |
| `contentBoxSize` | 内容盒尺寸数组 |

**注意**：`borderBoxSize` 和 `contentBoxSize` 返回的是数组，以适应未来可能的多列布局场景。通常取第一个元素即可：

```javascript
const width = entry.borderBoxSize[0].inlineSize;
const height = entry.borderBoxSize[0].blockSize;
```

## 核心特性

1. **异步触发**：ResizeObserver 在微任务中异步执行回调，不会阻塞渲染。

2. **批量处理**：在一个动画帧中，多个元素的尺寸变化会被合并，只触发一次回调，提升性能。

3. **观察所有变化**：无论元素尺寸变化的原因是什么（CSS 变化、内容变化、子元素变化等），都能被捕获。

4. **无侵入性**：只负责监听，不会修改元素或影响页面布局。

## 实际应用场景

### 场景一：响应式图表重绘

```javascript
const chartContainer = document.getElementById('chart');
const resizeObserver = new ResizeObserver(() => {
  // 容器尺寸变化时，重新渲染图表
  renderChart(chartContainer);
});
resizeObserver.observe(chartContainer);
```

### 场景二：自适应文本大小

```javascript
const textElement = document.querySelector('.dynamic-text');
const observer = new ResizeObserver((entries) => {
  const { width } = entries[0].contentRect;
  const fontSize = Math.max(12, width / 20);
  textElement.style.fontSize = `${fontSize}px`;
});
observer.observe(textElement);
```

## 与 window.resize 的区别

| 特性 | ResizeObserver | window.resize |
| ------ | ---------------- | --------------- |
| 监听对象 | 任意元素 | 仅 window 对象 |
| 触发时机 | 元素尺寸变化时 | 窗口尺寸变化时 |
| 性能 | 高效，批量处理 | 可能频繁触发 |
| 准确性 | 精确到元素级别 | 只能通过计算获取元素变化 |

## 注意事项

1. **避免在回调中引发循环**：如果在回调中修改了被观察元素的尺寸，可能会再次触发回调，需要谨慎处理，避免无限循环。

2. **初始触发时机**：当调用 `observe()` 时，回调会立即触发一次，获取初始尺寸。

3. **内存管理**：不再需要观察时，记得调用 `disconnect()` 或 `unobserve()` 释放资源。

4. **尺寸单位**：返回的尺寸是逻辑像素（CSS 像素），不受缩放影响。

## 简单示例：监听多个元素

```html
<!DOCTYPE html>
<html>
<body>
<div class="box" id="box1">内容1</div>
<div class="box" id="box2">内容2</div>
<textarea class="box" id="box3">内容3</textarea>
</body>

<script>
const boxes = document.querySelectorAll('.box');
const observer = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    const { width, height } = entry.contentRect;
    if (entry.target.tagName === 'TEXTAREA') {
      entry.target.value = `宽度: ${Math.round(width)}px, 高度: ${Math.round(height)}px`;
    } else {
      entry.target.textContent = `宽度: ${Math.round(width)}px, 高度: ${Math.round(height)}px`;
    }
  });
});

boxes.forEach(box => observer.observe(box));
</script>
</html>

```
