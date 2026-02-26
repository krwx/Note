# Location

- [Location](#location)
  - [主要属性](#主要属性)
    - [基本属性](#基本属性)
  - [常用方法](#常用方法)
    - [1. `assign()` - 加载新页面](#1-assign---加载新页面)
    - [2. `replace()` - 替换当前页面](#2-replace---替换当前页面)
    - [3. `reload()` - 重新加载页面](#3-reload---重新加载页面)
  - [实际应用示例](#实际应用示例)
    - [1. 获取和解析查询参数](#1-获取和解析查询参数)
    - [2. 页面跳转和重定向](#2-页面跳转和重定向)
    - [3. 构建URL](#3-构建url)
    - [4. 修改URL而不重新加载页面](#4-修改url而不重新加载页面)

`window.location` 是JavaScript中表示当前页面URL的对象，它提供了访问和操作URL各个部分的方法和属性。

## 主要属性

### 基本属性

```javascript
// 获取完整的URL
console.log(window.location.href);
// 例如：https://www.example.com:8080/path/page.html?query=value#section1

// 获取URL的各个部分
console.log(window.location.protocol);  // "https:"
console.log(window.location.host);      // "www.example.com:8080"
console.log(window.location.hostname);  // "www.example.com"
console.log(window.location.port);      // "8080"
console.log(window.location.pathname);  // "/path/page.html"
console.log(window.location.search);    // "?query=value"
console.log(window.location.hash);      // "#section1"
console.log(window.location.origin);    // "https://www.example.com:8080" (只读)
```

## 常用方法

### 1. `assign()` - 加载新页面

```javascript
// 跳转到新页面，会记录到浏览器历史记录中
window.location.assign('https://www.example.com/newpage');
```

### 2. `replace()` - 替换当前页面

```javascript
// 替换当前页面，不会在浏览器历史记录中留下当前页面
// 用户不能使用后退按钮返回到原页面
window.location.replace('https://www.example.com/newpage');
```

### 3. `reload()` - 重新加载页面

```javascript
// 重新加载当前页面
window.location.reload();      // 可能从缓存加载
window.location.reload(true);  // 强制从服务器重新加载
```

## 实际应用示例

### 1. 获取和解析查询参数

```javascript
// 获取查询字符串
const queryString = window.location.search; // "?id=123&name=John"

// 解析查询参数
const params = new URLSearchParams(window.location.search);
console.log(params.get('id'));   // "123"
console.log(params.get('name')); // "John"

// 或者使用传统方式
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
```

### 2. 页面跳转和重定向

```javascript
// 简单的页面跳转（最常用）
window.location.href = 'https://www.example.com/newpage';

// 延迟跳转
setTimeout(() => {
  window.location.href = '/dashboard';
}, 3000);

// 条件跳转
if (!userLoggedIn) {
  window.location.replace('/login'); // 使用replace防止后退到登录前页面
}
```

### 3. 构建URL

```javascript
// 动态构建URL
function buildURL(base, params) {
  const url = new URL(base);
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  return url.toString();
}

const newURL = buildURL('/search', { q: 'javascript', sort: 'date' });
window.location.href = newURL;
```

### 4. 修改URL而不重新加载页面

```javascript
// 修改hash（用于单页应用路由）
window.location.hash = 'section2';

// 修改查询参数（现代浏览器支持）
const url = new URL(window.location.href);
url.searchParams.set('page', '2');
window.history.pushState({}, '', url); // 不重新加载页面
```
