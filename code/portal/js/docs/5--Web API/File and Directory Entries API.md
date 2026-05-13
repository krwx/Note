# 文件与目录条目 API

- [文件与目录条目 API](#文件与目录条目-api)
  - [FileSystemEntry](#filesystementry)
  - [FileSystemFileEntry](#filesystemfileentry)

## FileSystemEntry

`FileSystemEntry` 是一个接口，表示文件系统中的一个条目，可以是文件或目录。它包含以下属性和方法：

|属性|说明|
|---|---|
|`isFile`|如果条目是一个文件，则为 `true`|
|`isDirectory`|如果条目是一个目录，则为 `true`|
|`name`|条目的名称（不包含路径）|
|`fullPath`|条目的完整路径（从根目录开始）|
|`filesystem`|所属的文件系统对象|

## FileSystemFileEntry

`FileSystemFileEntry` 是 `FileSystemEntry` 的一个子接口，表示一个文件条目。它除了继承 `FileSystemEntry` 的属性外，还包含以下方法：

|方法|说明|
|---|---|
|`file(callback)`|获取文件对象，回调函数接收一个 `File` 对象|

```js
fileEntry.file((file) => {
  console.log(file.name); // 输出 `File` 对象的文件名
  console.log(file.size); // 输出 `File` 对象的文件大小
});
```
