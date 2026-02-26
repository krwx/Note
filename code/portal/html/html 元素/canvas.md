# canvas

- [canvas](#canvas)
  - [基本用法](#基本用法)
  - [获取绘图上下文](#获取绘图上下文)
  - [2D 绘图基础](#2d-绘图基础)
    - [1. 绘制矩形](#1-绘制矩形)
    - [2. 路径（Path）](#2-路径path)
    - [3. 圆弧与圆](#3-圆弧与圆)
    - [4. 文本](#4-文本)
    - [5. 图像](#5-图像)
    - [6. 像素操作](#6-像素操作)
  - [动画与更新](#动画与更新)
  - [性能提示](#性能提示)
  - [与 SVG 的区别](#与-svg-的区别)
  - [3D 绘图：WebGL](#3d-绘图webgl)
  - [实际应用场景](#实际应用场景)
  - [example](#example)

`<canvas>` 是 HTML5 新增的一个元素，它允许通过 `JavaScript` 在网页上动态绘制图形、图像或动画。你可以把它理解为一个画布，脚本可以在上面绘制任意内容。**只有一个 DOM 节点**

## 基本用法

```html
<canvas id="myCanvas" width="400" height="300" style="border:1px solid #000;">
  您的浏览器不支持 canvas 标签。
</canvas>
```

- `width` 和 `height` 属性指定画布的尺寸（默认 300×150 像素）。
- 标签内的文本会在浏览器不支持 canvas 时显示。

## 获取绘图上下文

要实际绘图，需要通过 JavaScript 获取绘图上下文。最常用的是 **2D 上下文**：

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

`ctx` 对象提供了所有 2D 绘图的方法和属性。

## 2D 绘图基础

### 1. 绘制矩形

canvas 支持三种矩形绘制方式：

- `fillRect(x, y, w, h)`：填充矩形
- `strokeRect(x, y, w, h)`：矩形边框
- `clearRect(x, y, w, h)`：清除指定区域

```javascript
ctx.fillStyle = 'red';
ctx.fillRect(20, 20, 100, 50);
ctx.strokeStyle = 'blue';
ctx.strokeRect(140, 20, 100, 50);
```

### 2. 路径（Path）

路径可以绘制任意形状：

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);     // 起点
ctx.lineTo(150, 100);    // 直线到
ctx.lineTo(50, 150);
ctx.closePath();         // 闭合路径（可选）
ctx.strokeStyle = 'green';
ctx.stroke();            // 描边
// 或 ctx.fill(); 填充
```

### 3. 圆弧与圆

```javascript
ctx.beginPath();
ctx.arc(200, 150, 40, 0, Math.PI * 2); // 圆心 (200,150)，半径40，完整圆
ctx.fillStyle = 'orange';
ctx.fill();
```

### 4. 文本

```javascript
ctx.font = '24px Arial';
ctx.fillStyle = 'purple';
ctx.fillText('Hello Canvas', 50, 200);  // 填充文本
ctx.strokeText('Hello Canvas', 50, 250); // 空心文本
```

### 5. 图像

可以将现有图片绘制到 canvas 上：

```javascript
const img = new Image();
img.src = 'image.png';
img.onload = () => {
  ctx.drawImage(img, 0, 0, 200, 150); // 绘制图片并缩放
};
```

### 6. 像素操作

通过 `getImageData` 和 `putImageData` 可以逐像素操作：

```javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data; // [R, G, B, A, R, G, B, A, ...]
// 修改像素...
ctx.putImageData(imageData, 0, 0);
```

## 动画与更新

利用 `requestAnimationFrame` 可以创建流畅动画：

```javascript
function draw( timestamp ) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 更新绘图逻辑...
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
```

注意每次动画帧需要清除画布，再绘制新内容。

## 性能提示

- 尽量减少绘图操作的数量。
- 对于复杂动画，考虑使用离屏 canvas 进行预绘制。
- 避免在动画循环中频繁创建大对象。

## 与 SVG 的区别

| canvas | SVG |
| -------- | ----- |
| 基于像素（位图） | 基于矢量（保留图形对象） |
| 通过脚本绘制，绘制后不再保留图形对象 | 图形对象可附加事件，易于修改 |
| 适合像素级操作、实时渲染（如游戏） | 适合高保真、可交互的图形（如图标、图表） |

## 3D 绘图：WebGL

通过 `canvas.getContext('webgl')` 可以获得 WebGL 上下文，用于绘制高性能 3D 图形。这需要更复杂的着色器编程。

## 实际应用场景

- 数据可视化（图表、走势图）
- 游戏开发（Canvas 小游戏）
- 图像编辑（滤镜、裁剪）
- 动画特效（粒子系统）
- 签名板、绘图板

## example

以下是一个简单的 HTML canvas 使用示例，它会在画布上绘制一个红色矩形、一个蓝色圆形和一些文字：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Canvas 简单示例</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f0f0f0;
        }
        canvas {
            border: 2px solid #333;
            background: #fff;
        }
    </style>
</head>
<body>
    <canvas id="myCanvas" width="400" height="300"></canvas>

    <script>
        // 获取 canvas 元素和绘图上下文
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        // 1. 绘制一个红色填充矩形
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 100, 80);

        // 2. 绘制一个蓝色边框的圆形
        ctx.beginPath();
        ctx.arc(250, 150, 40, 0, Math.PI * 2); // 圆心 (250,150)，半径 40
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 5;
        ctx.stroke();

        // 3. 绘制一段文字
        ctx.font = '20px Arial';
        ctx.fillStyle = 'green';
        ctx.fillText('Hello Canvas!', 120, 250);

        // 4. 绘制一条直线（可选）
        ctx.beginPath();
        ctx.moveTo(50, 200);
        ctx.lineTo(350, 200);
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 2;
        ctx.stroke();
    </script>
</body>
</html>
```

**说明：**

- 创建了一个 400×300 的画布，并添加了简单的 CSS 居中样式。
- 通过 `getContext('2d')` 获取 2D 绘图对象。
- 分别演示了 `fillRect`（填充矩形）、`arc`（绘制圆形轮廓）和 `fillText`（绘制文本）的基本用法。
- 还额外绘制了一条紫色直线，展示路径的使用。

你可以将这段代码保存为一个 `.html` 文件，然后在浏览器中打开，即可看到效果。如果想进一步学习，可以尝试修改坐标、颜色或添加点击交互等。
