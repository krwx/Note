# 简单 web 操作

- [简单 web 操作](#简单-web-操作)
  - [重新加载当前页面](#重新加载当前页面)
  - [滚动到页面顶部](#滚动到页面顶部)
  - [滚动到页面底部](#滚动到页面底部)
  - [重定向](#重定向)
  - [打开新窗口或标签页](#打开新窗口或标签页)
  - [复制文本到粘贴板](#复制文本到粘贴板)

## 重新加载当前页面

```js
location.reload();
```

## 滚动到页面顶部

```js
window.scrollTo(0, 0);
```

## 滚动到页面底部

```js
window.scrollTo(0, document.body.scrollHeight);
```

## 重定向

```js
window.location.href = "https://www.example.com";
```

## 打开新窗口或标签页

```js
window.open("https://www.example.com", "_blank");
```

## 复制文本到粘贴板

```js
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Text copied to clipboard');
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
  });
}
```
