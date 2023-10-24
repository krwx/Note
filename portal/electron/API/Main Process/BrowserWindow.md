- [BrowserWindow](#browserwindow)
- [待窗口加载页面完成后显示窗口](#待窗口加载页面完成后显示窗口)
- [父子窗口](#父子窗口)
- [模态窗口](#模态窗口)
- [构造函数](#构造函数)
- [实例事件](#实例事件)
  - [事件: 'ready-to-show'](#事件-ready-to-show)
- [静态方法](#静态方法)
  - [BrowserWindow.fromWebContents(webContents)](#browserwindowfromwebcontentswebcontents)
- [实例属性](#实例属性)
  - [win.webContents 只读](#winwebcontents-只读)
  - [win.title](#wintitle)
- [实例方法](#实例方法)
  - [win.destroy()](#windestroy)
  - [win.close()](#winclose)
  - [win.focus()](#winfocus)
  - [win.blur()](#winblur)
  - [win.show()](#winshow)
  - [win.hide()](#winhide)
  - [win.maximize()](#winmaximize)
  - [win.minimize()](#winminimize)
  - [win.center()](#wincenter)
  - [win.setTitle(title)](#winsettitletitle)
  - [win.setMenu(menu) （Linux Windows）](#winsetmenumenu-linux-windows)

# BrowserWindow
**创建并控制浏览器窗口**。  
进程：主进程

# 待窗口加载页面完成后显示窗口
使用 `ready-to-show` 事件，定义为：在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出该事件。

在此事件后显示窗口将没有视觉闪烁：
```js
const { BrowserWindow } = require('electron')
// 设置 false 为 false
const win = new BrowserWindow({ show: false })

// 在 ready-to-show 事件中显示窗口
win.once('ready-to-show', () => {
  win.show()
})
```
> `BrowserWindow` 的 `show` 属性默认为 `true` ，即立即打开窗口。如果要不显示窗口，设置为 `false`

# 父子窗口
通过使用 `parent` 选项，你可以创建子窗口：
```js
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
```
`child` 窗口将总是显示在 `top` 窗口的顶部.

# 模态窗口
模态窗口是禁用父窗口（点击父窗口无反应）的子窗口，创建模态窗口必须设置 `parent` 和 `modal` 选项：
```js
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
// 设置 parent 和 modal 属性。modal 为 true
const child = new BrowserWindow({ parent: top, modal: true, show: false })

child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

# 构造函数
`new BrowserWindow([options])`  
通过 `options` 可以创建一个具有原生属性的 `BrowserWindow` 。

`options` 参数：
- `width` 整数型 (可选) - 窗口的宽度（以像素为单位）。 默认值为 800。
- `height` 整数型 (可选) - 窗口的高度（以像素为单位）。 默认值为 600。
- `useContentSize` boolean (可选) - width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 **默认值为 false**.
- `center` boolean (可选) - 窗口是否在屏幕居中. **默认值为 false**.
- `minHeight` Integer(可选) - 窗口的最小高度。 默认值为 0.
- `maxWidth` Integer(可选)-窗口的最大宽度。 默认值不限
- `maxHeight` Integer (可选) - 窗口的最大高度。 默认值不限
- `resizable` boolean (可选) - 窗口大小是否可调整。 **默认值为 true**。
- `show` boolean (可选) - 窗口是否在创建时显示。 **默认值为 true**。
- `frame` boolean (可选) - 设置为 false 时可以创建一个无边框窗口 **默认值为 true**。
- `parent` BrowserWindow (可选) - 指定父窗口 默认值为 null.
- `modal` boolean (可选) - 当前是否为模态窗口。 **只有当窗口是子窗口时才起作用。 默认值为 false**
- `backgroundColor` string (可选) - 窗口背景色，格式为 Hex, RGB, RGBA, HSL, HSLA 或 CSS 命名颜色。
- `transparent` boolean (可选) - 使窗口 **透明**。 默认值为 false. 在Windows上，仅在无边框窗口下起作用。
- `webPreferences` WebPreferences (optional) - Settings of web page's features.
  - `devTools` boolean (可选) - 是否开启 `DevTools`. 如果设置为 false, 则无法使用 `BrowserWindow.webContents.openDevTools ()` 打开 DevTools。 **默认值为 true**。
  - `nodeIntegration` boolean (可选) - 是否启用 `Node integration`. **默认值为 false**.（开发设置为 `true`）
  - `nodeIntegrationInWorker` boolean (可选) - 是否在Web工作器中启用了Node集成. **默认值为 false**.（开发设置为 `true`）
  - `preload` string (可选) -在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。
  - `webSecurity` boolean (可选) - 当设置为 `false`, 它将禁用同源策略 (通常用来测试网站), 如果此选项不是由开发者设置的，还会把 allowRunningInsecureContent设置为 true. 默认值为 true。

# 实例事件
## 事件: 'ready-to-show'
当页面已经渲染完成(但是还没有显示) 并且窗口可以被显示时触发

# 静态方法
## BrowserWindow.fromWebContents(webContents)
参数：
* webContents。WebContents结构

返回值：
* 返回 `BrowserWindow | null` 
* 返回拥有给定 `webContents` 的窗口，否则如果内容不属于一个窗口，返回 `null` 。

# 实例属性
## win.webContents 只读
此窗口拥有的 WebContents 对象。 所有与网页相关的事件和操作都将通过它完成。

## win.title
A string property that determines the title of the native window.

Electron 默认的窗口标题是工程 `index.html` 中的 `title` 名称。

# 实例方法
## win.destroy()
强制关闭窗口, 除了closed之外，close，unload 和 beforeunload 都不会被触发

## win.close()
尝试关闭窗口。 该方法与用户手动单击窗口的关闭按钮效果相同。 但网页可能会取消这个关闭操作。 查看 关闭事件。

## win.focus()
聚焦于窗口

## win.blur()
取消窗口的聚焦

## win.show()
显示并聚焦于窗口

## win.hide()
隐藏窗口

## win.maximize()
最大化窗口。 如果窗口尚未显示，该方法也会将其显示 (但不会聚焦)。

## win.minimize()
最小化窗口。 在某些平台上, 最小化的窗口将显示在Dock中。

## win.center()
将窗口移动到屏幕中央。

## win.setTitle(title)
title string  
将**原生窗口**的标题更改为 title。

## win.setMenu(menu) （Linux Windows）
menu： Menu | null  
将 menu 设置为窗口的菜单栏。