- [单行、多行文本显示省略号](#单行多行文本显示省略号)
- [实现三栏](#实现三栏)
- [图片居中](#图片居中)
- [图片旋转](#图片旋转)


# 单行、多行文本显示省略号
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

# 实现三栏
(1) 绝对布局。中间和右边设置 position: absolute
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
	<style>
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
	</style>
```
(2) grid 布局也可以
```html
	<body>
		<div class="gridTest">			
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
	<style>
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
		
		.gridTest {
			display: grid;
			grid-template-columns: 100px auto 200px;
			grid-template-rows: 200px
		}
	</style>
```

# 图片居中
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

# 图片旋转
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