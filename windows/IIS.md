# IIS

- [IIS](#iis)
  - [介绍](#介绍)
  - [打开 ISS](#打开-iss)
  - [安装 IIS 7.0](#安装-iis-70)
  - [使用](#使用)
    - [反向代理](#反向代理)
      - [ARR](#arr)
      - [URL Rewrite](#url-rewrite)
  - [Server Certificates](#server-certificates)
  - [日志](#日志)

## 介绍

log 的存放路径：`C:\inetpub\logs\LogFiles\W3SVC2`

## 打开 ISS

在搜索栏输入 `IIS` ，选择 `Internet Information Service (IIS) Manager`

## 安装 IIS 7.0

安装了 `IIS 7.0 CoreWebEngine` 才能安装 `URL Rewrite` 和 `ARR` 等模块。

通过**控制面板**安装

- 打开 “控制面板”。
- 点击 “程序和功能”。
- 在左侧菜单中选择 “打开或关闭 Windows 功能”。
- 在弹出的窗口中，找到 “`Internet Information Services`” 并展开它。
- 选择 “`World Wide Web Services`” 下的 “`Application Development Features`” 和 “`Common HTTP Features`”。
- 点击 “确定” 开始安装。

## 使用

### 反向代理

[博客](https://blog.csdn.net/bigcarp/article/details/141928360)

`IIS` 实现反向代理功能,必须同时安装 `URL Rewrite` 和 `Application RequestRouting(ARR)` 两个模块,缺一不可。

- `URL Rewrite`: 负责定义反向代理规则。解析传入的请求 URL ,根据预定义的规则将请求重写或重定向为新的目标 URL (通常是后端服务器的 URL )。
- `ARR`: 负责接收 `URL Rewrite` 转发的请求,并将这些请求代理到后端服务器处理。

默认 `IIS` 没有这两个模块, 需要自己下载安装

- `ARR`:
  - <https://www.iis.net/downloads/microsoft/application-request-routing>
- `URL Rewrite`:
  - <https://www.iis.net/downloads/microsoft/url-rewrite>

#### ARR

1. 在主机的 `IIS` 找到 `Application Request Routing Cache`，双击进入
2. 点击右侧 `Actions` 栏的 `Proxy` 中的 `Server Proxy Settings`
3. 勾选上 `Enable proxy` ，点击右侧的 `Apply` 应用修改

#### URL Rewrite

1. 选择 `Sites` 中要设置的 `Site`，在 `IIS` 里面双击 `URL Rewrite`
2. 点击右侧 `Actions` 栏的 `Add Rule(s)` 来添加规则
3. 会弹框来选择 `rule template`，选择 `Inbound rules` 的 `Blank rule`，点击 `OK`
4. 输入规则内容
   - `Name` 填 `rule` 的名字，随便填
   - `Match URL` 块设置如何匹配规则
      - 默认使用正则表达式匹配规则
      - `Requested URL`：是否匹配规则，默认是匹配规则
      - `Using`：匹配规则的模式。默认为 Regular Expressions，即正则表达式
      - `Pattern`：规则的模板
   - `Action` 块设置匹配规则后的行为
      - `Action type`  
         - `Rewrite`：重写 URL。匹配规则后，直接改为访问对应的 URL，但是浏览器的 URL 还是保持不变
         - `Redirect`：重定向。匹配规则后，重定向到对应的 URL，浏览器的 URL 变为对应的 URL
      - `Action Properties`
         - 使用 `{R:1}` 表示 `.*`
         - `Rewrite URL`  
            - 例子：`Pattern` 为 `^test(.*)`，`Rewrite URL` 为 `http://localhost:8100/hello/{R:1}`，那么访问 `http://mycomputer.com/test/rest/123`，就会改写为访问 `http://localhost:8100/hello/rest/123`，但是浏览器的 URL 还是为 `http://mycomputer.com/test/rest/123`
         - `Redirect URL`
            - 例子：`Pattern` 为 `^test(.*)`，`Redirect URL` 为 `http://localhost:8100/hello/{R:1}`，那么访问 `http://mycomputer.com/test/rest/123`，就会重定向到 `http://localhost:8100/hello/rest/123`，但是浏览器的 URL 也会变成 `http://localhost:8100/hello/rest/123`
5. 点击右侧的 `Apply` 应用规则

## Server Certificates

介绍：

- 在主机的 `IIS` 找到 `Server Certificates`，双击进入
- 这里是管理 web server 用于配置给网站的 SSL 的证书

操作：

- 导出证书（PFX 文件）
  - 选择一个证书，点击右侧 `Actions` 栏的 `Export`
  - `Export to` ： 选择导出的路径
  - `Password` ：用于后续操作 PFX 文件的密码

## 日志

日志存放在 `C:\inetpub\logs\LogFiles\W3SVC1` 的文件夹。

在这个目录下，可以找到以 `u_exYYMMDD.log` 的格式命名的错误日志文件，这些文件中包含了服务器错误、HTTP错误、应用程序池崩溃等信息，主要能看到访问了哪些 url 。
