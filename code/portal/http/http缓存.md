# http缓存

- [http缓存](#http缓存)
  - [缓存的位置](#缓存的位置)
  - [http缓存的优点](#http缓存的优点)
  - [强制缓存(Expires和Cache-Control)](#强制缓存expires和cache-control)
  - [协商缓存（Last-Modified / If-Modified-Since和Etag / If-None-Match）](#协商缓存last-modified--if-modified-since和etag--if-none-match)
  - [点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？](#点击刷新按钮或者按-f5按-ctrlf5-强制刷新地址栏回车有什么区别)

HTTP 缓存会存储与请求关联的响应，并将存储的响应复用于后续请求。

ps：**有的地方会将 http 缓存叫做浏览器缓存，不确定这样叫是否合理，还是按 http 缓存叫**

## 缓存的位置

- from memory cache: 就是将资源缓存到内存中，等待下次访问时不需要重新下载资源，而直接从内存中获取。  
- from disk cache：就是将资源缓存到磁盘中，等待下次访问时不需要重新下载资源，而直接从磁盘中获取。

不同点：

- 重新打开新的窗口，memory cache 中数据被清除了，刷新不会
- 重新打开新的窗口，disk cache 中数据没有被清除
- 一般脚本、字体、图片会存在 memory cache 当中。（因为脚本可能随时执行，如果放在磁盘，那么从磁盘取出，IO开销很大）
- 一般非脚本会存在 disk cache 当中，如css等。（因为非脚本不会频繁取出，所以放在磁盘）

## http缓存的优点

- 减少了冗余的数据传输。
- 减少了服务器的负担，大大提升了网站的性能。
- 加快了客户端加载网页的速度

## 强制缓存(Expires和Cache-Control)

强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。  

强制缓存的情况主要有三种，如下：（这里的缓存标识指 Expires 或 Cache-Control）

- 不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求。  
- 存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用**协商缓存**。  
- 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果。  

控制强制缓存的字段分别是 **Expires** 和 **Cache-Control** ，其中 Cache-Control 优先级比 Expires高。

Expires：

1. Expires是HTTP/1.0控制网页缓存的字段；
其值为服务器返回该请求结果缓存的到期时间；
即再次发起该请求时，如果客户端的时间小于Expires的值时，直接使用缓存结果。
2. 到了HTTP/1.1，Expire已经被Cache-Control替代

Cache-Control：

|cache-control：主要用于控制网页缓存| 规则|
| ---- | ---- |
|public| 所有内容都将被缓存（客户端和代理服务器都可缓存）|
|private| 所有内容只有客户端可以缓存，**Cache-Control的默认取值**|
|no-cache| 客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定|
|no-store| 所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存|
|max-age=xxx (xxx is numeric)| 缓存内容将在xxx**秒**后失效|

## 协商缓存（Last-Modified / If-Modified-Since和Etag / If-None-Match）

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。

主要有以下两种情况：

- 协商缓存生效，返回304。即该资源无更新，继续使用该缓存
- 协商缓存失效，返回200和请求结果。

控制协商缓存的字段分别有：**Last-Modified / If-Modified-Since 和 Etag / If-None-Match**。  
其中 Etag / If-None-Match 的优先级比 Last-Modified / If-Modified-Since 高。

**Last-Modified / If-Modified-Since**  

- If-Modified-Since（客户端设置）：  
  是客户端再次发起该请求时，携带上次请求返回的Last-Modified值，通过此字段值告诉服务器该资源上次请求返回的最后被修改时间。
- Last-Modified（服务器设置）：  
  是服务器响应请求时，返回该资源文件在服务器最后被修改的时间。
- 缓存判断条件：  
  服务器的资源最后被修改时间大于If-Modified-Since的字段值，则重新返回资源，状态码为200；否则则返回304，代表资源无更新，可继续使用缓存文件。

**Etag / If-None-Match**:

- If-None-Match（客户端设置）：  
  - 是客户端再次发起该请求时，携带上次请求返回的唯一标识Etag值，通过此字段值告诉服务器该资源上次请求返回的唯一标识值。
- Etag（服务器设置）：  
  - 是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)
- 缓存判断条件：  
  - 会根据If-None-Match的字段值与该资源在服务器的Etag值做对比，一致则返回304，代表资源无更新，继续使用缓存文件；不一致则重新返回资源文件，状态码为200。

Etag / If-None-Match 优先级高于 Last-Modified / If-Modified-Since ，同时存在则只有 Etag / If-None-Match 生效。对于协商缓存，使用 Ctrl+F5强制刷新可以使得缓存无效。

## 点击刷新按钮或者按 F5、按 Ctrl+F5 （强制刷新）、地址栏回车有什么区别？

- 点击刷新按钮或者按 F5：
  - 浏览器直接对本地的缓存文件过期，但是会带上If-Modifed-Since，If-None-Match，这就意味着服务器会对文件检查新鲜度，返回结果可能是 304，也有可能是 200。
- 用户按 Ctrl+F5（强制刷新）：
  - 浏览器不仅会对本地文件过期，而且不会带上 If-Modifed-Since，If-None-Match，相当于之前从来没有请求过，返回结果是 200。
- 地址栏回车：
  - 浏览器发起请求，按照正常流程，本地检查是否过期，然后服务器检查新鲜度，最后返回内容。
