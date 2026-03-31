# link

链接的样式，可以用任何CSS属性（如颜色，字体，背景等）。

四个链接状态是：

- `a:link` - 正常，未访问过的链接
- `a:visited` - 用户已访问过的链接
- `a:hover` - 当用户鼠标放在链接上时
- `a:active` - 链接被点击的那一刻

当设置为若干链路状态的样式，也有一些顺序规则：

- `a:hover` 必须跟在 `a:link` 和 `a:visited` 后面
- `a:active` 必须跟在 `a:hover` 后面
- `LVHA` 是记忆顺序的缩写，代表 Link, Visited, Hover, Active

例子：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<style>
a:link {color:#000000;}      /* 未访问链接*/
a:visited {color:#00FF00;}  /* 已访问链接 */
a:hover {color:#FF00FF;}  /* 鼠标移动到链接上 */
a:active {color:#0000FF;}  /* 鼠标点击时 */
</style>
</head>
<body>
<p><b><a href="/css/" target="_blank">这是一个链接</a></b></p>
</body>
</html>
```
