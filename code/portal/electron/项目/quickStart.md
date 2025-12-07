# quickStart

- [quickStart](#quickstart)
  - [创建项目](#创建项目)
    - [vue 项目（js）](#vue-项目js)
      - [1. 创建 vue 项目](#1-创建-vue-项目)
      - [2. 添加 electron 依赖](#2-添加-electron-依赖)
      - [3. 添加主进程文件main.js、预加载脚本preload.js](#3-添加主进程文件mainjs预加载脚本preloadjs)
      - [4. 引入 Electron Forge](#4-引入-electron-forge)
      - [5. 更改 package.json，指定electron主进程文件路径，添加启动指令](#5-更改-packagejson指定electron主进程文件路径添加启动指令)
      - [6. 启动 electron，执行 npm start](#6-启动-electron执行-npm-start)
      - [7. electron 打包](#7-electron-打包)
    - [遇到的问题](#遇到的问题)
      - [vue 项目，electron 打包后，路由展示为空白](#vue-项目electron-打包后路由展示为空白)

## 创建项目

### vue 项目（js）

#### 1. 创建 vue 项目  

```shell
npm create vue@latest
```

参考 vue 项目的 [quickStart.md](../../vue/项目/quickStart.md)

#### 2. 添加 electron 依赖

```shell
npm install --save-dev electron
```

#### 3. 添加主进程文件main.js、预加载脚本preload.js

在项目根目录（是根目录，不是 src 文件夹）创建 `electron` 文件夹，在里面创建 `main.js` 和 `preload.js`

main.js

```js
const { app, protocol, BrowserWindow, globalShortcut } = require('electron')
// 需在当前文件内开头引入 Node.js 的 'path' 模块
const path = require('path')
 
app.commandLine.appendSwitch("--ignore-certificate-errors", "true");
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } }
]);
 
const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 960,
        minHeight: 540,
        width: 960,
        height: 540,
        //窗口是否在屏幕居中. 默认值为 false
        center: true,
        //设置为 false 时可以创建一个无边框窗口 默认值为 true。
        frame: true,
        //窗口是否在创建时显示。 默认值为 true。
        show: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false,
        }
    })
    win.setMenu(null)
    // 生产环境，加载打包好的 index.html
    if (app.isPackaged) {
        win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
    } else {
      // 开发环境，加载运行前端服务器的地址。vite 用 localhost 的地址
        win.loadURL('http://127.0.0.1:5173/')
           //win.loadURL('http://localhost:5173/')
        win.webContents.openDevTools()
    }
    globalShortcut.register("CommandOrControl+Shift+i", function () {
        win.webContents.openDevTools();
    });
 
}
 
app.whenReady().then(() => {
 
    createWindow()
 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
```

preload.js。下面的代码只是例子，和 electron 的配置没关系

```js
// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })
```

#### 4. 引入 Electron Forge

使用 `Electron Forge` 进行打包

安装依赖：

```shell
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

#### 5. 更改 package.json，指定electron主进程文件路径，添加启动指令

添加

```js
"main": "electron/main.js"
"scripts": {
  "start": "vite | electron-forge start"
}
```

注意 `electron` 的启动指令要用 `Electron Forge` 的指令，不能再用回 `electron` 的指令

#### 6. 启动 electron，执行 npm start

运行命令，前端开启 `web dev server`

```shell
vite
```

运行命令，调试 `electron` 。注意要在另一个终端运行命令

```shell
electron-forge start
```

`start` 指令:

```shell
vite | electron-forge
```

如果启动后是空包的，可能是 `vite` 启动后的地址不是 127.0.0.1 ，而是 localhost 。

这时可以将主进程文件 `main.js` 第34行 `win.loadURL('http://127.0.0.1:5173/')` 修改为 `win.loadURL('http://localhost:5173/')`

#### 7. electron 打包

在项目根目录下新建 `build\electron-icon` 文件夹，然后分别将.icns、.ico、.png类型文件放置此文件夹下

在 `package.json` 添加 `author、description、build` 字段，同时在 `scripts` 字段添加 `electron:build` 命令

package.json:

```json
{
  "name": "electron-vue-spcc",
  "version": "0.0.0",
  "private": true,
  "main": "electron/main.js",
  "author": {
    "name": "lsl",
    "email": "lsl@lsl.com.cn"
  },
  "description": "lsl",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
    "format": "prettier --write src/",
    "start": "vite | electron-forge start",
    "electron:build": "vite build && electron-forge make",
  },
  "dependencies": {
    "electron-squirrel-startup": "^1.0.0",
    "element-plus": "^2.3.14",
    "pinia": "^2.1.6",
    "vue": "^3.3.4",
    "vue-router": "^4.2.4"
  },
  "devDependencies": {
    "@electron-forge/cli": "^6.4.2",
    "@electron-forge/maker-deb": "^6.4.2",
    "@electron-forge/maker-rpm": "^6.4.2",
    "@electron-forge/maker-squirrel": "^6.4.2",
    "@electron-forge/maker-zip": "^6.4.2",
    "@electron-forge/plugin-auto-unpack-natives": "^6.4.2",
    "@rushstack/eslint-patch": "^1.3.3",
    "@vitejs/plugin-vue": "^4.3.4",
    "@vue/eslint-config-prettier": "^8.0.0",
    "electron": "^27.0.0",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "prettier": "^3.0.3",
    "unplugin-auto-import": "^0.16.6",
    "unplugin-vue-components": "^0.25.2",
    "vite": "^4.4.9"
  },
  "build": {
    "appId": "lsl.first.app",
    "productName": "ElectronApp",
    "copyright": "Copyright © 2023 lsl",
    "directories": {
      "output": "dist_electron"
    },
    "win": {
      "icon": "./build/electron-icon/icon.ico",
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64"
          ]
        }
      ]
    },
    "dmg": {
      "contents": [
        {
          "x": 410,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 130,
          "y": 150,
          "type": "file"
        }
      ]
    },
    "linux": {
      "icon": "./build/electron-icon/icon.png",
      "target": "AppImage"
    },
    "mac": {
      "icon": "./build/electron-icon/icon.icns"
    },
    "files": [
      "./dist",
      "./electron",
      "!**/node_modules/**"
    ],
    "asar": false,
    "nsis": {
      "oneClick": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "./build/electron-icon/icon.ico",
      "uninstallerIcon": "./build/electron-icon/icon.ico",
      "installerHeaderIcon": "./build/electron-icon/icon.ico",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }
}
```

修改 `vite.config.js` ,添加 base 字段

```js
import { fileURLToPath, URL } from 'node:url'
 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
 
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

执行 `npm run electron:build` 指令，打包内容会输出到 `out` 文件夹中

### 遇到的问题

#### vue 项目，electron 打包后，路由展示为空白  

路由问题，把 `history` 模式改为 `hash` 模式：将 `createWebHistory` 改为 `createWebHashHistory`

```js
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // ...路由
  ]
})
```
