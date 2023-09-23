# `<video>`: 视频嵌入元素
`HTML <video>` 元素 用于在 `HTML` 或者 `XHTML` 文档中嵌入媒体播放器，用于支持文档内的视频播放。

浏览器并不是都支持相同的视频格式，所以你可以在 `<source>`  元素里提供多个视频源，然后浏览器将会使用它所支持的第一个源。

```html
<video controls>
  <source src="myVideo.mp4" type="video/mp4" />
  <source src="myVideo.webm" type="video/webm" />
  <p>
    Your browser doesn't support HTML5 video. Here is a
    <a href="myVideo.mp4">link to the video</a> instead.
  </p>
</video>
```