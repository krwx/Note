# **内容安全策略 (Content Security Policy, CSP)**

- [**内容安全策略 (Content Security Policy, CSP)**](#内容安全策略-content-security-policy-csp)
  - [**什么是 CSP？**](#什么是-csp)
  - [**核心工作原理**](#核心工作原理)
  - [**主要指令示例**](#主要指令示例)
  - [**关键字来源**](#关键字来源)
  - [**部署模式**](#部署模式)
  - [**示例配置**](#示例配置)
  - [**如何应对内联脚本和样式？**](#如何应对内联脚本和样式)
  - [**CSP 的好处**](#csp-的好处)
  - [**注意事项**](#注意事项)
  - [**调试技巧**](#调试技巧)
  - [**具体使用例子**](#具体使用例子)
    - [**1. 基本用法：HTTP 响应头**](#1-基本用法http-响应头)
    - [**2. HTML Meta 标签方式**](#2-html-meta-标签方式)
    - [**3. 解决内联脚本问题（使用 nonce）**](#3-解决内联脚本问题使用-nonce)
    - [**4. 解决内联脚本问题（使用 hash）**](#4-解决内联脚本问题使用-hash)
    - [**5. 仅报告模式（测试阶段）**](#5-仅报告模式测试阶段)
    - [**7. 不同框架的 CSP 配置**](#7-不同框架的-csp-配置)
    - [**8. Nginx 配置示例**](#8-nginx-配置示例)
    - [**9. Express.js 服务器示例**](#9-expressjs-服务器示例)
    - [**12. 监控和分析 CSP 违规**](#12-监控和分析-csp-违规)

## **什么是 CSP？**

CSP 是一个**网页安全机制**，用于检测和缓解某些类型的攻击，特别是**跨站脚本（XSS）** 和数据注入攻击。它通过允许网站管理员控制哪些资源（如脚本、样式表、图片等）可以被浏览器加载来实现。

## **核心工作原理**

CSP 通过 **HTTP 响应头** 或 HTML 的 `<meta>` 标签来定义一系列**策略指令**，告诉浏览器哪些内容来源是受信任的，从而阻止恶意内容的执行。

## **主要指令示例**

以下是一些常见的 CSP 指令：

1. **`default-src`**  
   默认策略，适用于未指定的大多数资源类型。  

   ```txt
   Content-Security-Policy: default-src 'self'
   ```

   表示只允许从当前域名加载资源。

2. **`script-src`**  
   控制 JavaScript 的来源。  

   ```txt
   script-src 'self' https://apis.google.com
   ```

   允许来自当前域名和 `https://apis.google.com` 的脚本。

3. **`style-src`**  
   控制样式表的来源。

4. **`img-src`**  
   控制图片的来源。

5. **`connect-src`**  
   控制 AJAX、WebSocket 等连接的来源。

6. **`font-src`**  
   控制字体文件的来源。

7. **`object-src`**  
   控制 `<object>`、`<embed>`、`<applet>` 等插件的来源。

8. **`frame-src`**  
   控制 `<frame>` 和 `<iframe>` 的来源。

9. **`report-uri`**  
   指定一个 URI，浏览器会将违反 CSP 的行为报告到该地址。

10. **`frame-ancestors`**  
   用于控制页面是否可以被嵌入到 `<frame>、<iframe>、<object>、<embed> 或 <applet>` 中，从而防止点击劫持（`click jacking`）攻击。

## **关键字来源**

- **`'self'`**：只允许当前源（协议、域名、端口）。
- **`'none'`**：禁止任何来源。
- **`'unsafe-inline'`**：允许内联资源（如 `<script>` 标签中的代码）。
- **`'unsafe-eval'`**：允许 `eval()` 等动态代码执行。
- **`https:`**：允许所有 HTTPS 资源。
- **`data:`**：允许 `data:` URI（如图片的 base64 编码）。

## **部署模式**

1. **仅报告模式**  
   使用 `Content-Security-Policy-Report-Only` 头，仅报告违规而不阻止内容，用于测试策略。

   ```txt
   Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report-endpoint/
   ```

2. **强制执行模式**  
   使用 `Content-Security-Policy` 头，直接阻止违规内容。

## **示例配置**

以下是一个相对严格的 CSP 配置示例：

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted.cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://images.example.com;
  report-uri /csp-violation-report-endpoint/
```

- 默认只允许同源资源。
- 脚本只允许同源和指定的 CDN。
- 样式允许同源和内联（某些框架可能需要）。
- 图片允许同源、data URI 和指定域名。
- 违规报告发送到指定端点。

## **如何应对内联脚本和样式？**

如果网站有内联脚本或样式，CSP 默认会阻止。解决方案：

1. 使用 `'unsafe-inline'`（不推荐，降低安全性）。
2. 使用 **nonce**（一次性随机数）：

   ```html
   <script nonce="abc123">
     // 只有 nonce 匹配的脚本才会执行
   </script>
   ```

   响应头：

   ```txt
   script-src 'nonce-abc123'
   ```

3. 使用 **hash**：

   ```txt
   script-src 'sha256-abc123...'
   ```

## **CSP 的好处**

1. **有效缓解 XSS 攻击**：阻止恶意脚本执行。
2. **减少数据泄露风险**：限制资源加载来源。
3. **提供报告机制**：帮助监控潜在攻击。

## **注意事项**

1. 过于严格的策略可能**破坏网站功能**，建议逐步实施。
2. CSP **不能完全替代其他安全措施**（如输入验证、输出编码）。
3. 某些第三方服务（如 Google Analytics、社交媒体插件）可能需要额外配置。

## **调试技巧**

1. 始终先在**仅报告模式**下测试。
2. 使用浏览器开发者工具的 **Console** 和 **Network** 面板查看 CSP 违规报告。
3. 监控 `report-uri` 收到的报告，调整策略。

## **具体使用例子**

### **1. 基本用法：HTTP 响应头**

```http
# 只允许同源资源，阻止所有外部资源
Content-Security-Policy: default-src 'self'

# 允许同源和指定的 CDN
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net

# 允许内联样式但阻止内联脚本
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'
```

### **2. HTML Meta 标签方式**

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 使用 meta 标签设置 CSP -->
    <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self'; 
                   script-src 'self' https://code.jquery.com;
                   style-src 'self' 'unsafe-inline';
                   img-src 'self' data: https://images.unsplash.com;">
</head>
<body>
    <!-- 来自 code.jquery.com 的脚本可以加载 -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- 内联样式可以执行 -->
    <style>
        body { color: blue; }
    </style>
    
    <!-- 来自 unsplash 的图片可以加载 -->
    <img src="https://images.unsplash.com/photo-12345">
</body>
</html>
```

### **3. 解决内联脚本问题（使用 nonce）**

```html
<!-- 服务器端生成随机的 nonce 值，每个页面请求都不同 -->
<?php 
$nonce = base64_encode(random_bytes(16)); 
header("Content-Security-Policy: script-src 'nonce-$nonce'");
?>

<!-- HTML 中 -->
<script nonce="<?php echo $nonce; ?>">
    // 这个内联脚本可以执行
    console.log('Hello with nonce!');
</script>

<script>
    // 这个脚本会被 CSP 阻止！
    alert('Blocked!');
</script>
```

### **4. 解决内联脚本问题（使用 hash）**

```http
Content-Security-Policy: script-src 'sha256-abc123'
```

```html
<script>
    // 计算这个脚本内容的 SHA256 哈希值
    // echo -n "alert('Hello, world!');" | openssl sha256 -binary | openssl base64
    // 得到: abc123... (实际会更长)
    alert('Hello, world!');
</script>
```

### **5. 仅报告模式（测试阶段）**

```http
# 只报告违规，不阻止（用于调试）
Content-Security-Policy-Report-Only: 
  default-src 'self';
  script-src 'self';
  report-uri /csp-violation-report/;
  report-to csp-endpoint;
```

```javascript
// 前端 JavaScript 处理 CSP 违规报告
// 可以自定义报告行为
if (navigator.userAgent.includes('Chrome')) {
    // 使用新的 Reporting API
    const observer = new ReportingObserver((reports) => {
        reports.forEach(report => {
            if (report.type === 'csp-violation') {
                console.warn('CSP Violation:', report.body);
                // 发送到自己的监控系统
                sendToMonitoring(report.body);
            }
        });
    }, { buffered: true });
    observer.observe();
}
```

### **7. 不同框架的 CSP 配置**

**React 应用：**

```http
# React 通常需要 unsafe-inline 或 nonce
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
```

**Vue.js 应用：**

```javascript
// Vue 需要 unsafe-eval 用于开发环境，生产环境可以移除
// 使用 vue-meta 插件动态设置 CSP
export default {
  metaInfo() {
    return {
      meta: [
        { 
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-eval';"
        }
      ]
    }
  }
}
```

### **8. Nginx 配置示例**

```nginx
server {
    listen 80;
    server_name example.com;
    
    # 基本 CSP
    add_header Content-Security-Policy 
        "default-src 'self';
         script-src 'self' https://trusted.cdn.com;
         style-src 'self' 'unsafe-inline';
         img-src 'self' data: https:;
         report-uri /csp-report;";
    
    # 或者使用变量动态生成 nonce
    location / {
        # 生成随机 nonce
        set $nonce $request_id;
        
        add_header Content-Security-Policy 
            "script-src 'nonce-$nonce' 'strict-dynamic' https:;
             object-src 'none';
             base-uri 'self';";
        
        # 在响应中替换 NONCE_PLACEHOLDER
        sub_filter_once off;
        sub_filter NONCE_PLACEHOLDER $nonce;
    }
    
    # CSP 违规报告端点
    location /csp-report {
        access_log /var/log/nginx/csp-violations.log;
        return 204;
    }
}
```

### **9. Express.js 服务器示例**

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

// 生成 nonce 中间件
app.use((req, res, next) => {
    // 为每个请求生成唯一的 nonce
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    
    // 设置 CSP 头
    res.setHeader(
        'Content-Security-Policy',
        `default-src 'self';
         script-src 'self' 'nonce-${res.locals.nonce}' https://cdn.jsdelivr.net;
         style-src 'self' 'unsafe-inline';
         img-src 'self' data: https:;
         report-uri /api/csp-report;`
    );
    next();
});

// 渲染页面时使用 nonce
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>CSP Example</title>
        </head>
        <body>
            <h1>Hello CSP!</h1>
            <!-- 允许执行的脚本 -->
            <script nonce="${res.locals.nonce}">
                console.log('This script will run');
            </script>
            
            <!-- 会被阻止的脚本 -->
            <script>
                console.log('This will be blocked by CSP');
            </script>
            
            <!-- 来自可信 CDN 的脚本 -->
            <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js" 
                    nonce="${res.locals.nonce}"></script>
        </body>
        </html>
    `);
});

// CSP 违规报告端点
app.post('/api/csp-report', express.json(), (req, res) => {
    console.log('CSP Violation:', req.body);
    // 这里可以存储到数据库或发送到监控系统
    res.status(204).send();
});

app.listen(3000);
```

### **12. 监控和分析 CSP 违规**

```python
# Python Flask 示例：收集 CSP 报告
from flask import Flask, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

@app.route('/csp-report', methods=['POST'])
def csp_report():
    report = request.get_json()
    
    # 记录违规
    violation = {
        'timestamp': datetime.now().isoformat(),
        'user_agent': request.user_agent.string,
        'document_uri': report['csp-report'].get('document-uri'),
        'violated_directive': report['csp-report'].get('violated-directive'),
        'blocked_uri': report['csp-report'].get('blocked-uri'),
        'ip_address': request.remote_addr
    }
    
    # 保存到数据库或日志文件
    with open('csp-violations.log', 'a') as f:
        f.write(json.dumps(violation) + '\n')
    
    # 发送警报（如果有严重违规）
    if 'blocked-uri' in report['csp-report']:
        send_alert(violation)
    
    return jsonify({'status': 'ok'})

def send_alert(violation):
    # 发送到 Slack、Email 等
    print(f"ALERT: CSP Violation - {violation}")
```
