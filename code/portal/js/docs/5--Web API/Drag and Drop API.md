# 拖拽 API

- [拖拽 API](#拖拽-api)
  - [一、核心概念](#一核心概念)
  - [二、主要事件](#二主要事件)
  - [三、实现拖放的基本步骤](#三实现拖放的基本步骤)
    - [1. 使元素可拖拽](#1-使元素可拖拽)
    - [2. 监听 `dragstart` 设置拖拽数据](#2-监听-dragstart-设置拖拽数据)
    - [3. 使元素成为有效的放置目标](#3-使元素成为有效的放置目标)
  - [四、`DataTransfer` 方法/属性](#四datatransfer-方法属性)
    - [DataTransferItem](#datatransferitem)
  - [五、文件拖拽示例](#五文件拖拽示例)
  - [六、重要注意事项](#六重要注意事项)
  - [七、简单排序示例（列表内拖拽重排）](#七简单排序示例列表内拖拽重排)

HTML5 的 Drag and Drop API（拖放 API）提供了一套原生的机制，让网页中的元素可以被鼠标拖拽，并放置到指定的目标区域。它适用于实现文件上传、列表排序、卡片移动等交互。

## 一、核心概念

- **拖拽源（drag source）**：被拖拽的元素。通常需要设置 `draggable="true"` 才能被拖拽。
- **放置目标（drop target）**：可以接收被拖拽元素的区域。默认大部分元素不接受放置，需要阻止 `dragenter` / `dragover` 的默认行为。
- **拖拽数据（DataTransfer）**：拖拽过程中传递的数据（文本、URL、文件等），通过 `dataTransfer` 对象存储和读取。

典型的拖拽操作是这样的：用户选中一个可拖拽的（draggable）元素，并将其拖拽（鼠标不放开）到一个可放置的（droppable）元素，然后释放鼠标。

## 二、主要事件

拖拽过程会触发一系列事件（按顺序）：

| 事件        | 触发时机                           | 作用对象       |
|-------------|------------------------------------|----------------|
| `dragstart` | 开始拖拽时（在拖拽源上触发）       | 拖拽源         |
| `drag`      | 拖拽过程中持续触发                 | 拖拽源         |
| `dragenter` | 拖拽元素进入放置目标时             | 放置目标       |
| `dragover`  | 拖拽元素在放置目标上移动时         | 放置目标       |
| `dragleave` | 拖拽元素离开放置目标时             | 放置目标       |
| `drop`      | 在放置目标上松开鼠标（完成放置）   | 放置目标       |
| `dragend`   | 拖拽结束（松开鼠标）               | 拖拽源         |

**注意**：当从操作系统向浏览器中拖拽文件时，不会触发 `dragstart` 和 `dragend` 事件。

## 三、实现拖放的基本步骤

### 1. 使元素可拖拽

设置 `draggable="true"` 属性：

```html
<div id="dragMe" draggable="true">拖拽我</div>
```

### 2. 监听 `dragstart` 设置拖拽数据

```javascript
dragElement.addEventListener('dragstart', (e) => {
  // 存储数据（类型 + 内容）
  e.dataTransfer.setData('text/plain', 'Hello');
  // 设置拖拽效果（copy / move / link）
  e.dataTransfer.effectAllowed = 'copy';
  // 可选：自定义拖拽图标
  // e.dataTransfer.setDragImage(customImage, x, y);
});
```

### 3. 使元素成为有效的放置目标

浏览器对 `dragover` 事件的默认行为是拒绝作为放置目标，即直接导致 `drop` 事件无法触发。因此，必须在放置目标的 `dragover` 事件中调用 `e.preventDefault()` 来允许放置

`drop` 事件最好也调用 `e.preventDefault()` 来阻止默认行为（比如拖拽一个图片到页面上，浏览器会直接打开该图片）。

```javascript
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // 必须，表示允许放置
  e.dataTransfer.dropEffect = 'copy'; // 视觉反馈
});

dropZone.addEventListener('dragenter', (e) => {
  e.preventDefault(); // 可选，但建议阻止
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  console.log('收到数据：', data);
  // 例如：将数据插入到目标区域
  e.target.appendChild(document.createTextNode(data));
});
```

## 四、`DataTransfer` 方法/属性

|属性|说明|
|---|---|
|`dropEffect`|设置或获取当前**放置效果**（用于视觉反馈）。值必须是 `none`、`copy`、`link` 或 `move` 之一。|
|`effectAllowed`|限制允许的**拖拽效果**（copy / move / link …）|
|`files`|拖拽本地文件时，返回 FileList 对象|
|`items`|返回 `DataTransferItemList` 对象，包含所有拖拽数据项|

- 只拖拽文件时，可以使用 `files` 获取文件列表。
- 如果拖拽文件夹时，只需要使用 `items`，并遍历 `items`，通过 `item.webkitGetAsEntry()` 获取 `FileSystemEntry` 对象来获取文件数据。

|方法 / 属性|说明|
|---|---|
|`setData(format, data)`|存储数据（format 常用 `text/plain`, `text/html`, `text/uri-list`）|
|`getData(format)`|读取指定格式的数据|
|`clearData([format])`|清除数据|
|`setDragImage(element, x, y)`|自定义拖拽时的反馈图片|

### DataTransferItem

`DataTransferItem` 对象表示一个拖拽数据项，包含以下属性/方法：

|属性|说明|
|---|---|
|`kind`|数据项类型（"string" 或 "file"）|
|`type`|数据项的 MIME 类型（如 `text/plain`、`image/png`）|

|方法|说明|
|---|---|
|`getAsString(callback)`|如果 `kind` 是 "string"，则调用回调函数并传入字符串数据|
|`getAsFile()`|如果 `kind` 是 "file"，则返回一个 `File` 对象|
|`webkitGetAsEntry()`|返回一个 `FileSystemEntry` 对象（非标准，部分浏览器支持）来表示文件系统中选中的项目。|

## 五、文件拖拽示例

实现将本地图片拖入浏览器并预览：

```html
<div id="dropArea" style="width: 300px; height: 200px; border: 2px dashed #ccc;">
  将图片拖拽到这里
</div>
<img id="preview" style="max-width: 100%;">

<script>
  const dropArea = document.getElementById('dropArea');
  const preview = document.getElementById('preview');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => e.preventDefault());
  });

  dropArea.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        preview.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
</script>
```

## 六、重要注意事项

1. **默认禁止放置**：必须阻止 `dragover` 的默认行为，`drop` 事件才会触发。
2. **拖拽图片/链接**：默认情况下，图片和链接是**可拖拽**的（无需设置 `draggable`）。如果不想让它们被拖拽，可以设置 `draggable="false"`。
3. **拖拽不改变 DOM**：API 本身只负责传递数据，移动或复制元素需要开发者在 `drop` 事件中手动操作 DOM。
4. **跨浏览器差异**：  
   - Firefox 要求拖拽源必须设置 `dataTransfer.setData()`，否则 `dragend` 可能异常。  
   - Safari 对 `dragstart` 中设置 `effectAllowed` 有特殊要求。  
   - 移动端**不支持**该 API（触摸拖拽需另用 touch 事件）。
5. **安全性限制**：不同源（跨域）的拖拽数据读取受限，除非用户明确拖放。

## 七、简单排序示例（列表内拖拽重排）

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<style>
</style>
</head>
<body>
<ul id="sortList">
  <li draggable="true">项目 1</li>
  <li draggable="true">项目 2</li>
  <li draggable="true">项目 3</li>
</ul>

<script>
  let dragSrc = null;
  document.querySelectorAll('#sortList li').forEach(item => {
    item.addEventListener('dragstart', e => {
      dragSrc = item;
      e.dataTransfer.setData('text/plain', item.innerText);
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    item.addEventListener('drop', e => {
      e.preventDefault();
      if (dragSrc !== item) {
        // 将拖拽源节点移动到目标节点前后，实现列表重排
        const parent = item.parentNode;
        const children = [...parent.children];
        const srcIndex = children.indexOf(dragSrc);
        const targetIndex = children.indexOf(item);
        if (srcIndex < targetIndex) {
          parent.insertBefore(dragSrc, item.nextSibling);
        } else {
          parent.insertBefore(dragSrc, item);
        }
      }
    });
  });
</script>
</body>
</html>
```
