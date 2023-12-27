## 时间戳转 js 的 Date 类型。
时间戳例子：1416626934319
```js
function trans(value) {
	const date = new Date(value);
	return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
}
```

## 数组去重
`arr = [...new Set(arr)]`

## 数组截断：
```js
if (searchHistory.value.length > 10) {
	searchHistory.value.length = 10;
}
```