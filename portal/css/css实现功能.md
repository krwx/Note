# css 实现功能

- [css 实现功能](#css-实现功能)
  - [单行、多行文本显示省略号](#单行多行文本显示省略号)
  - [实现三栏](#实现三栏)
  - [图片居中](#图片居中)
  - [图片旋转](#图片旋转)

## 单行、多行文本显示省略号

1. 单行显示文本，超出显示省略号，很容易实现（需要加宽度 `width` 属来兼容部分浏览）：

    ```css
    width:200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    ```

2. 多行文本显示，限制行数，超出显示省略号，如下实现：

    ```css
    width:200px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    ```

## 实现三栏

```html
	<body>
		<div class="outer">
			<div class="left">123</div>
			<div class="center">
				center
			</div>
			<div class="right">
				<div>
					<button>test</button>
				</div>
			</div>
		</div>
	</body>
```

(1) 绝对布局。中间和右边设置 position: absolute

```css
		.outer {
			height: 200px;
			position: relative;
		}
		.left {
			height: 100%;
			background-color: antiquewhite;
			width: 150px
		}
		.right {
			background-color: red;
			height: 100%;
			width: 80px;
			
			position: absolute;
			top: 0;
			right: 0;
		}
		.center {
			background-color: dodgerblue;
			
			position: absolute;
			left: 150px;
			top: 0;
			bottom: 0;
			right: 80px;
		}
```

(2) 绝对布局。左边和右边设置 position: absolute

```css
.outer {
  position: relative;
  height: 100px;
}

.left {
  position: absolute;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: absolute;
  top: 0;
  right: 0;

  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
  background: lightgreen;
}
```

(3) flex布局的方式。左右两栏的放大和缩小比例都设置为0，基础大小设置为固定的大小，中间一栏设置为auto

```css
.outer {
  display: flex;
  height: 100px;
}

.left {
  flex: 0 0 100px;
  background: tomato;
}

.right {
  flex: 0 0 200px;
  background: gold;
}

.center {
  flex: auto;
  background: lightgreen;
}
```

(4) 浮动的方式。左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的margin值，注意这种方式，**中间一栏必须放到最后**。

```html
	<body>
		<div class="outer">
			<div class="left">123</div>
			
			<div class="right">
				<div>
					<button>test</button>
				</div>
			</div>
			<div class="center">
				center
			</div>
		</div>
	</body>
```

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: right;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  height: 100px;
  margin-left: 100px;
  margin-right: 200px;
  background: lightgreen;
}
```

(5) 圣杯布局。利用浮动和负边距来实现。

- 父级元素设置左右的 padding，
- 三列均设置向左浮动，**中间一列放在最前面**，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，
- 通过设置 margin 负值将其移动到上一行，
- 再利用相对定位，定位到两边

```html
		<div class="outer">
			<div class="center">
				center
			</div>
			<div class="left">123</div>
			<div class="right">
				<div>
					<button>test</button>
				</div>
			</div>
		</div>
```

```css
.outer {
  height: 100px;
  padding-left: 100px;
  padding-right: 200px;
}

.left {
  position: relative;
  left: -100px;  /* 因为父级元素设置了 padding，所以需要设置 left 移动到边框处 */

  float: left;
  margin-left: -100%;  /* 移动到上一行 */

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: relative;
  left: 200px;

  float: right;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}
```

(6) 双飞翼布局

- 双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的。  
- 即 wrapper 占一行，left 和 right 都是下一行的，但是通过 float 、 position: relative 和 margin 等设置移动到上一行。
- center 通过设置 margin 来产生左右两边的空间

```html
<div class="outer">
    <div class="wrapper">
      <div class="center">圣杯-middle</div>
    </div>
    <div class="left">圣杯-left</div>
    <div class="right">圣杯-right</div>
</div>
```

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: left;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.wrapper {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
}
```

(7) grid 布局也可以

```css
		.left {
			height: 100%;
			background-color: antiquewhite;
			width: 100px;
			
			grid-column: 1 / 1;
		}
		.right {
			background-color: red;
			height: 100%;
			width: 200px;
			
			grid-column: 3 / 3;
		}
		.center {
			background-color: dodgerblue;
			
			grid-column: 2 / 2;
		}
		
		.outer {
			display: grid;
			grid-template-columns: 100px auto 200px;
			grid-template-rows: 200px
		}
```

## 图片居中

图片居中：

```css
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
```

图片左右居中：

```css
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
```

## 图片旋转

通过 `animation-play-state` 设置动画的播放状态，通过 添加 class 开始动画

```css
	.detail-play image {
		/* 设置图片暂停旋转 */
		animation: 10s liner move infinite;
		animation-play-state: paused;
	}
	/* 设置图片旋转 */
	.detail-play .detail-play-run {
		animation-play-state: running;
	}
	@keyframes move {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
```

```html
<div class="detail-play">
  <image :src="songDetail.al.picUrl" :class="{ 'detail-play-run': isPlayRotate }"></image>
</div>
```
