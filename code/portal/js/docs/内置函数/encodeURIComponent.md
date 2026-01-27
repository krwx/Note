# encodeURIComponent

- [encodeURIComponent](#encodeuricomponent)
  - [基本功能](#基本功能)
  - [编码规则](#编码规则)
    - [会被编码的字符](#会被编码的字符)
    - [不会被编码的字符](#不会被编码的字符)
  - [与 `encodeURI()` 的区别](#与-encodeuri-的区别)
  - [实际应用场景](#实际应用场景)
    - [1. 构建查询参数](#1-构建查询参数)
    - [2. 处理特殊字符](#2-处理特殊字符)
    - [3. JSON 数据传递](#3-json-数据传递)
  - [解码：`decodeURIComponent()`](#解码decodeuricomponent)
  - [注意事项和最佳实践](#注意事项和最佳实践)
    - [1. **何时使用**](#1-何时使用)
    - [2. **处理异常**](#2-处理异常)
    - [3. **现代 API 的替代方案**](#3-现代-api-的替代方案)
  - [常见问题](#常见问题)
    - [1. **为什么需要编码？**](#1-为什么需要编码)
    - [2. **双编码问题**](#2-双编码问题)
    - [3. **性能考虑**](#3-性能考虑)

## 基本功能

`encodeURIComponent()` 用于将字符串编码为 URI 组件（如查询参数、路径片段等）。

```javascript
const str = "hello world & 你好";
const encoded = encodeURIComponent(str);
console.log(encoded);
// 输出: "hello%20world%20%26%20%E4%BD%A0%E5%A5%BD"
```

## 编码规则

### 会被编码的字符

- **保留字符**: `; , / ? : @ & = + $`
- **特殊字符**: `#`
- **非 ASCII 字符**: 中文、日文、表情符号等
- **空格**: 变为 `%20`
- **其他不安全字符**: `< > " ' { } | \ ^ ~ [ ] `` 等

### 不会被编码的字符

- **字母数字**: `A-Z a-z 0-9`
- **连字符**: `- _ . ! ~ * ' ( )`

## 与 `encodeURI()` 的区别

```javascript
const url = "https://example.com/search?q=hello world&lang=zh";

// encodeURI() - 用于完整 URL，保留 URL 结构
console.log(encodeURI(url));
// "https://example.com/search?q=hello%20world&lang=zh"

// encodeURIComponent() - 用于 URL 组成部分
console.log(encodeURIComponent(url));
// "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Dzh"
```

**关键区别**：

- `encodeURI()`：不编码 `:/?#[]@!$&'()*+,;=` 等 URL 结构字符
- `encodeURIComponent()`：编码几乎所有特殊字符

## 实际应用场景

### 1. 构建查询参数

```javascript
const params = {
  q: "JavaScript教程",
  page: 1,
  sort: "price desc"
};

// 错误做法
const badURL = `/search?q=${params.q}&page=${params.page}`;
// 如果 params.q 包含 &，会破坏 URL 结构

// 正确做法
const queryString = Object.entries(params)
  .map(([key, value]) => 
    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  )
  .join('&');

const goodURL = `/search?${queryString}`;
// /search?q=JavaScript%E6%95%99%E7%A8%8B&page=1&sort=price%20desc
```

### 2. 处理特殊字符

```javascript
// 包含特殊字符的搜索词
const searchTerm = "C# & C++ > Java";
const safeTerm = encodeURIComponent(searchTerm);
// "C%23%20%26%20C%2B%2B%20%3E%20Java"

// 在 URL 中使用
fetch(`/api/search?q=${safeTerm}`);
```

### 3. JSON 数据传递

```javascript
const data = {
  user: { name: "张三", age: 25 },
  timestamp: Date.now()
};

// 将对象转为 JSON 字符串后再编码
const encodedData = encodeURIComponent(JSON.stringify(data));
// "%7B%22user%22%3A%7B%22name%22%3A%22%E5%BC%A0%E4%B8%89%22%2C%22age%22%3A25%7D%2C%22timestamp%22%3A1234567890%7D"

// 作为参数传递
const url = `/save?data=${encodedData}`;
```

## 解码：`decodeURIComponent()`

```javascript
const encoded = "hello%20world%20%26%20%E4%BD%A0%E5%A5%BD";
const decoded = decodeURIComponent(encoded);
console.log(decoded); // "hello world & 你好"
```

## 注意事项和最佳实践

### 1. **何时使用**

```javascript
// ✅ 正确：编码查询参数值
`/api/search?q=${encodeURIComponent(query)}`

// ✅ 正确：编码路径片段
`/users/${encodeURIComponent(username)}/profile`

// ❌ 错误：不要编码整个 URL
// encodeURIComponent("https://example.com/path")  // 错误！

// ✅ 正确：用 encodeURI() 编码完整 URL
encodeURI("https://example.com/path?q=test")
```

### 2. **处理异常**

```javascript
function safeEncode(str) {
  try {
    return encodeURIComponent(str);
  } catch (e) {
    console.error("编码失败:", e);
    return "";
  }
}

function safeDecode(encodedStr) {
  try {
    return decodeURIComponent(encodedStr);
  } catch (e) {
    console.error("解码失败:", e);
    return encodedStr; // 返回原始字符串
  }
}
```

### 3. **现代 API 的替代方案**

```javascript
// 使用 URLSearchParams（自动编码）
const params = new URLSearchParams({
  q: "hello world & more",
  lang: "zh-CN"
});
console.log(params.toString());
// "q=hello+world+%26+more&lang=zh-CN"

// 使用 URL API
const url = new URL("https://example.com/search");
url.searchParams.set("q", "test & special");
console.log(url.href);
```

## 常见问题

### 1. **为什么需要编码？**

```javascript
// 如果不编码，URL 会被误解
const userInput = "search&filter=price"; // 用户输入
const badURL = `/search?q=${userInput}`; // 会错误解析为两个参数

// 编码后
const safeURL = `/search?q=${encodeURIComponent(userInput)}`;
// /search?q=search%26filter%3Dprice
```

### 2. **双编码问题**

```javascript
// 避免重复编码
const str = "hello%20world";
const wrong = encodeURIComponent(encodeURIComponent(str)); // 错误
const correct = encodeURIComponent(str); // 正确
```

### 3. **性能考虑**

对于大量数据的编码，考虑使用更高效的方法：

```javascript
// 批量编码
const encodeBatch = (items) => items.map(encodeURIComponent);

// 使用 TextEncoder（现代 API）
const encoder = new TextEncoder();
const encoded = encoder.encode("你好"); // Uint8Array
```
