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
