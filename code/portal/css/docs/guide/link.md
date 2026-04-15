# link

- [link](#link)
  - [链接状态](#链接状态)
    - [顺序问题](#顺序问题)

## 链接状态

链接的样式，可以用任何CSS属性（如颜色，字体，背景等）。

**四个链接状态：**

- `a:link` - 正常，未访问过的链接
- `a:visited` - 用户已访问过的链接
- `a:hover` - 当用户鼠标放在链接上时
- `a:active` - 链接被点击的那一刻

**使用事项：**

- `:visited` 状态的链接可以通过删除浏览器的历史记录的对应记录来重置为 `:link` 状态。
- `:visited` 只有在“这个准确的 URL 已经进过浏览器历史记录”时才会变色，即 URL 是有效的链接才会改变为 `:visited` 状态。

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
<p><b><a href="https://www.baidu.com" target="_blank">这是一个链接</a></b></p>
</body>
</html>
```

### 顺序问题

通常按 `LVHA` 的顺序规则编写 css 样式。`LVHA` 代表 Link, Visited, Hover, Active。

如果不按这个顺序编写样式，可能会导致一些样式无法生效。原因是当同一个链接同时匹配多个状态时，样式声明顺序会决定冲突属性谁覆盖谁。

***

下面举一些例子：

1、如果将 `:hover` 放在 `:link` 之前，那么当用户鼠标悬停在链接上时，`:link` 的样式会覆盖 `:hover` 的样式，导致 `:hover` 的效果无法显示。

```html
<style>
a:hover {color:#FF00FF;} /**不生效**/
a:link {color:#000000;}
</style>
```

2、如果将 `:hover` 放在 `:visited` 之前，当没有点击链接之前，`:hover` 的样式还是会生效；但是当点击链接之后，会同时匹配 `:hover` 和 `:visited` 选择器， `:visited` 的样式会覆盖 `:hover` 的样式，导致 `:hover` 的效果无法显示。

```html
<style>
a:hover {color:#FF00FF;} /**访问链接后不生效**/
a:visited {color:#00FF00;}
</style>
```
