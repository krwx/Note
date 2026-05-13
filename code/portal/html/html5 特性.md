# HTML5 特性总结

- [HTML5 特性总结](#html5-特性总结)
  - [1. 语义化标签](#1-语义化标签)
  - [2. 多媒体支持](#2-多媒体支持)
  - [3. 图形与动画](#3-图形与动画)
  - [4. 表单增强](#4-表单增强)
  - [5. 存储机制](#5-存储机制)
  - [6. 离线与缓存](#6-离线与缓存)
  - [7. 设备访问能力](#7-设备访问能力)
  - [8. 通信增强](#8-通信增强)
  - [9. 性能与并发](#9-性能与并发)
  - [10. 拖放 API](#10-拖放-api)
  - [11. 其他实用特性](#11-其他实用特性)
  - [12. 移除或废弃的旧特性](#12-移除或废弃的旧特性)

HTML5 引入了许多新特性，极大地增强了网页的功能性和用户体验。以下是主要的新特性分类总结：

## 1. 语义化标签

用更清晰的标签描述网页结构，提高可读性和 SEO：

- `<header>`、`<footer>`、`<nav>`、`<article>`、`<section>`、`<aside>`、`<main>`、`<figure>`、`<figcaption>` 等。

## 2. 多媒体支持

原生支持音视频，无需插件（如 Flash）：

- `<audio>`：播放音频，支持 MP3、WAV、OGG 等格式。
- `<video>`：播放视频，支持 MP4、WebM、OGG 等格式。
- 提供 `<source>` 标签指定多格式备源，以及 `<track>` 添加字幕。

## 3. 图形与动画

- **Canvas (`<canvas>`)**：通过 JavaScript 动态绘制 2D 图形、图表、游戏画面等。
- **SVG**：矢量图形，支持缩放不失真，可内联在 HTML 中。
- **WebGL**（常与 Canvas 结合）：渲染 3D 图形。

## 4. 表单增强

新的 input 类型和属性，提升移动端体验和输入验证：

- **新类型**：`email`、`url`、`tel`、`number`、`date`、`range`、`color`、`search` 等。
- **新属性**：`placeholder`、`required`、`pattern`、`autofocus`、`autocomplete`、`multiple`、`step` 等。
- **新元素**：`<datalist>`（提供输入建议）、`<output>`（显示计算结果）、`<progress>`、`<meter>`。

## 5. 存储机制

- **localStorage**：永久存储，容量约 5-10MB，不随会话清除。
- **sessionStorage**：单会话存储，标签页关闭即清除。
- **IndexedDB**：更强大的客户端 NoSQL 数据库，适合存储大量结构化数据。

## 6. 离线与缓存

- **Application Cache (AppCache)**（已基本废弃，推荐 Service Workers）：允许离线访问网站。
- **Service Workers**：作为浏览器与网络之间的代理，支持离线、推送通知、后台同步等（属于 PWA 技术）。

## 7. 设备访问能力

- **Geolocation**：获取用户地理位置。
- **设备方向/运动**：`DeviceOrientationEvent` 和 `DeviceMotionEvent`。
- **摄像头/麦克风**：通过 `getUserMedia()` API 访问。
- **电池状态**、**网络信息**（如类型、有效带宽）等。

## 8. 通信增强

- **WebSocket**：全双工实时通信，适用于聊天、游戏、实时数据。
- **Server-Sent Events (SSE)**：服务器向客户端推送数据。
- **WebRTC**：浏览器间实时音视频通信及点对点数据传输。

## 9. 性能与并发

- **Web Workers**：在后台线程运行 JavaScript，避免阻塞 UI。
- **requestAnimationFrame**：优化动画性能。
- **Page Visibility API**：检测页面是否可见。
- **History API**：无刷新改变 URL（`pushState`、`replaceState`）。

## 10. 拖放 API

原生拖拽支持：通过 `dragstart`、`dragend`、`dragover`、`drop` 等事件，使元素或文件可拖放。

## 11. 其他实用特性

- **内容可编辑**：`contenteditable` 属性使元素可被用户直接编辑。
- **微数据**（Microdata）和 **ARIA** 角色：增强语义和可访问性。
- **`<template>`** 标签：存放客户端克隆的 HTML 模板。
- **`<dialog>`** 标签：原生模态框支持。

## 12. 移除或废弃的旧特性

- 移除 `<frame>`、`<frameset>`、`<font>`、`<center>`、`<big>` 等纯表现层标签。
- 移除 `noshade`、`bgcolor`、`align` 等属性，建议使用 CSS 替代。
