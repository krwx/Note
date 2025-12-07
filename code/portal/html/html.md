# html

- [html](#html)
  - [表格](#表格)
    - [使用表格](#使用表格)
  - [attribute](#attribute)
    - [tabindex](#tabindex)

## 表格

### 使用表格

## attribute

### tabindex

当使用`tab`按钮进行导航时，`tabindex` 属性指定 focus 的元素的顺序。

```html
<!DOCTYPE html>
<html>
<body>

<div tabindex="1">W3Schools</div><br>
<div tabindex="3">Google</div><br>
<div tabindex="2">Microsoft</div>

<script>
// At start, set focus on the first div
document.getElementsByTagName('div')[0].focus();
</script>

<p tabindex="4"><b>Note:</b> Try navigating the elements by using the "Tab" button on your keyboard.</p>

</body>
</html>
```
