# file-saver

## 语法

Import saveAs() from file-saver

```js
import { saveAs } from 'file-saver';
```

```js
FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
```

如果希望`FileSaver.js`自动提供 `Unicode` 文本编码提示，请传递 `{autoBom:true}`。请注意，只有当您的 `blob` 类型设置了 `charset=utf-8` 时，才会执行此操作。

## 例子

### 使用 require() 保存文本

```js
var FileSaver = require('file-saver');
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");
```

### 保存文本

```js
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");
```

### 保存 url

```js
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```

### 保存 canvas

```js
var canvas = document.getElementById("my-canvas");
canvas.toBlob(function(blob) {
    saveAs(blob, "pretty image.png");
});
```

注意：标准的 `HTML5 canvas.toBlob（）`方法并非在所有浏览器中都可用。`canvas-toBlob.js` 是一个跨浏览器的 `canvas` 。

### 保存文件

您可以在不指定文件名的情况下保存File构造函数。如果文件本身已经包含名称，那么有很多方法可以获取文件实例（从存储、文件输入、新构造函数、剪贴板事件）。如果你仍然想更改名称，那么你可以在第二个参数中更改它。

```js
// Note: Ie and Edge don't support the new File constructor,
// so it's better to construct blobs and use saveAs(blob, filename)
var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(file);
```

## 安装

```sh
npm install file-saver --save
```
