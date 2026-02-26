# html 问题

## 1. 表单对象 名称是什么属性，提交是什么属性，大数据处理是什么属性，提交后的处理程序是什么属性

- 名称：name
- 提交：method
- 提交后的处理：action
- 大数据处理：enctype

| 功能描述 | 对应 HTML 属性 | 核心作用与关键点 |
| :--- | :--- | :--- |
| **表单对象名称** | **`name`** | 为表单指定一个名称，主要用于在 JavaScript 中获取或操作整个表单对象 。 |
| **提交方法** | **`method`** | 定义数据提交的 HTTP 方法，**`get`** (默认，数据附加在 URL 后) 或 **`post`** (数据包含在请求体中，更安全，适合大量数据) 。 |
| **大数据处理/数据编码** | **`enctype`** | 定义 POST 提交时数据的编码方式。**发送文件** (如 `type="file"`) **必须**设置为 **`multipart/form-data`** 。 |
| **提交后的处理程序** | **`action`** | 指定接收并处理表单数据的服务器端 URL。如果不设置，则默认提交到当前页面的 URL 。 |

**1、属性详解与使用场景**：

1. **表单对象名称 (`name`)**：这个属性更多是给前端开发者用的。比如你可以在 JavaScript 里通过 `document.forms.formName` 来快速引用整个表单，方便进行表单验证或动态控制。

2. **提交方法 (`method`)**：
    - **`method="get"`**：适合提交不敏感、数据量小的搜索查询。因为数据会暴露在 URL 中，有长度限制，且不安全。
    - **`method="post"`**：几乎所有需要修改服务器数据（如注册、上传）或包含敏感信息（如密码）的场景，都应该使用 POST 方法。它没有数据大小限制，更安全。

3. **大数据处理 (`enctype`)**：这个属性很容易被忽略，但**在包含文件上传时至关重要**。如果不设置 `enctype="multipart/form-data"`，文件将无法被正确发送到服务器。它的默认值是 `application/x-www-form-urlencoded`（对空格和特殊字符进行编码），适用于大多数普通文本表单 。

4. **提交后的处理程序 (`action`)**：这是表单数据的“目的地”。它的值可以是一个完整的服务器接口地址（如 `https://api.example.com/login`），也可以是一个相对路径（如 `/login.php`）。如果你想测试表单却还没有后端程序，可以暂时留空或设置为 `#`，让表单提交到当前页面进行调试 。

**2、一个完整的表单示例**：

为了让你更好地理解这些属性是如何协同工作的，可以看下面这个包含了文本输入和文件上传的表单：

```html
<form action="/upload.php" method="post" enctype="multipart/form-data" name="myForm">
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username"><br><br>
  
  <label for="avatar">选择头像：</label>
  <input type="file" id="avatar" name="avatar"><br><br>
  
  <input type="submit" value="提交">
</form>
```

在这个例子中：

- **`name="myForm"`**：给这个表单起个名字，方便 JavaScript 操作。
- **`method="post"`**：用 POST 方法提交，确保文件数据能发送。
- **`enctype="multipart/form-data"`**：**关键步骤**，告诉浏览器要以多部分表单的形式编码数据，这样才能成功上传文件。
- **`action="/upload.php"`**：将数据提交到当前域名下的 `/upload.php` 这个程序进行处理。

## 2. 表单格 行合并是什么属性，列合并是什么属性

- 行合并：rowspan
- 列合并：colspan

## 3. html5有哪些新特性、移除了那些元素？

- 语义化标签。
  - HTML5 提供了新的标签，如 `article、section、nav` 等，这些标签增强了网页的结构性，使得页面内容更加清晰和易于理解，对搜索引擎也更友好。
- 增强型表单。
  - `HTML5` 增加了多种新的表单输入类型，如 `color、date、time、email、url` 等，以及用于不同类型输出的表单元素，如 `calendar` 和 `search`。
  - 还引入了新的表单属性，如 `placeholder` 用于显示提示，以及 `required、pattern、min、max、step、autofocus` 和 `multiple` 等属性，以增强表单的验证和用户体验。
- 多媒体支持。
  - HTML5 支持在网页中直接播放视频和音频，无需使用插件。这些元素允许用户对视频和音频进行控制和操作。
  - 用于媒介回放的 `video` 和 `audio` 元素;
- 画布(`Canvas`)和 `SVG`。
  - `Canvas` 元素用于在网页上绘制图形，支持多种绘制路径和形状
  - `SVG` 则用于创建和展示矢量图形和动画。
- 地理定位。
  - `HTML5` 提供了 `Geolocation API`，用于获取用户的地理位置信息，这在基于位置的应用中非常有用。
- Web 存储。
  - HTML5 提供了 Web 存储 API，包括 `localStorage` 和 `sessionStorage` ，用于在浏览器中存储数据，并在不同页面和会话中保持数据一致性。
- `Web Workers`。
  - `Web Workers` 允许开发者在后台运行 JavaScript 代码，而不阻塞页面的其他操作，提高了网页性能。
- 拖放 `API`。
  - HTML5 支持拖放功能，允许用户通过拖放来上传文件。
- 响应式设计。
  - HTML5 支持响应式设计，使得网页能够根据不同设备的屏幕大小和方向进行调整。

移除的元素有：

- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframes；

## 4. HTML5 的离线储存怎么使⽤，⼯作原理能不能解释⼀下？

HTML5 的离线储存主要指让 Web 应用在无网络连接时也能访问的技术。目前有两种主流方案：**Application Cache (AppCache)** 和 **Service Worker**。由于 AppCache 已被标准废弃，现在推荐使用 Service Worker。

**1. Application Cache（已废弃，了解即可）**

**使用方法**

1. 创建一个缓存清单文件（如 `cache.manifest`），列出需要离线缓存的资源：

    ```txt
    CACHE MANIFEST
    # 版本号或注释
    index.html
    style.css
    script.js
    images/logo.png

    NETWORK:
    login.php  # 需要联网的资源

    FALLBACK:
    / /offline.html  # 离线时的替代页面
    ```

2. 在 HTML 中引用该清单文件：

```html
<html manifest="cache.manifest">
```

**工作原理**

- 浏览器首次访问页面时，会根据 `manifest` 下载并缓存所有列出的资源。
- 之后无论在线还是离线，浏览器都会优先使用缓存中的资源，除非 `manifest` 文件更新（浏览器会检测 `manifest` 变化并触发更新）。
- 优点：实现简单；缺点：缓存机制笨拙、更新不可控、容易导致页面展示旧内容，因此已被废弃。

---

**2. Service Worker（当前标准）**

Service Worker 是一个独立于页面的 JavaScript 线程，可以拦截网络请求、操作缓存，实现精细的离线策略。

**使用方法**

1. **注册 Service Worker**  
   在页面的 JavaScript 中注册：

   ```javascript
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js')
       .then(reg => console.log('注册成功', reg))
       .catch(err => console.log('注册失败', err));
   }
   ```

2. **编写 Service Worker 脚本（sw.js）**  
   它包含三个主要生命周期事件：`install`、`activate` 和 `fetch`。

   ```javascript
   // 定义缓存的名称和资源列表
   const CACHE_NAME = 'my-cache-v1';
   const urlsToCache = [
     '/',
     '/style.css',
     '/script.js',
     '/image.png'
   ];

   // 安装事件：预缓存资源
   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then(cache => cache.addAll(urlsToCache))
     );
   });

   // 激活事件：清理旧版本缓存
   self.addEventListener('activate', event => {
     event.waitUntil(
       caches.keys().then(keys => 
         Promise.all(keys.map(key => {
           if (key !== CACHE_NAME) {
             return caches.delete(key);
           }
         }))
       )
     );
   });

   // 拦截网络请求
   self.addEventListener('fetch', event => {
     event.respondWith(
       // 尝试从缓存中匹配请求
       caches.match(event.request)
         .then(response => {
           // 如果缓存中有，返回缓存；否则从网络获取
           return response || fetch(event.request);
         })
     );
   });
   ```

**工作原理**

- **独立线程**：Service Worker 运行在独立线程，不会阻塞页面渲染。
- **基于 HTTPS**：出于安全考虑，Service Worker 只能在 HTTPS 或 localhost 下运行。
- **事件驱动**：
  - `install`：首次安装时触发，通常在此缓存静态资源。
  - `activate`：激活时触发，常用于清理旧缓存。
  - `fetch`：每次页面发起网络请求时触发，可拦截并自定义响应（从缓存返回、从网络返回、或两者结合）。
- **Cache API**：提供 `caches` 对象，允许存储 `Request` / `Response` 对，支持细粒度的缓存管理。
- **离线访问**：一旦资源被缓存，即便断网，页面也能从缓存加载。
