# https

- [https](#https)
  - [概念](#概念)
    - [SSL](#ssl)
    - [证书标准](#证书标准)
    - [编码格式](#编码格式)
    - [相关的文件扩展名](#相关的文件扩展名)
    - [证书编码的转换](#证书编码的转换)
  - [获得证书](#获得证书)
    - [向权威证书颁发机构申请证书](#向权威证书颁发机构申请证书)
    - [生成自签名的证书](#生成自签名的证书)
  - [根据 PFX 生成 KEY 和 CRT](#根据-pfx-生成-key-和-crt)
  - [openssl](#openssl)
    - [使用 openssl](#使用-openssl)
    - [命令](#命令)
  - [other](#other)

## 概念

### SSL

- `SSL`
  - 全称：`Secure Sockets Layer`
  - https 就是带加密的 http 协议,而 https 的加密是基于 SSL 的
- `OpenSSL`
  - OpenSSL 是 SSL 的一个实现，SSL 只是一种规范

### 证书标准

`X.509` - 这是一种证书标准,主要定义了证书中应该包含哪些内容.其详情可以参考 `RFC5280` , SSL 使用的就是这种证书标准.

### 编码格式

同样的 `X.509` 证书,可能有不同的编码格式,目前有以下两种编码格式.

`PEM`

- 全称：`Privacy Enhanced Mail`
- 打开看文本格式,以`"-----BEGIN..."`开头, `"-----END..."`结尾,内容是 `BASE64` 编码.
- 查看 PEM 格式证书的信息的命令:
  - `openssl x509 -in certificate.pem -text -noout`
- `Apache` 和 `*NIX` 服务器偏向于使用这种编码格式.

`PEM` 文件例子：

```txt
-----BEGIN CERTIFICATE-----
[content]
-----END CERTIFICATE-----
```

`DER`

- 全称：`Distinguished Encoding Rules`
- 打开看是二进制格式,不可读.
- 查看 DER 格式证书的信息的命令:
  - `openssl x509 -in certificate.der -inform der -text -noout`
- `Java` 和 `Windows` 服务器偏向于使用这种编码格式.

### 相关的文件扩展名

`CRT`

- **证书文件**
- CRT 应该是 `certificate` 的三个字母
- 常见于 `*NIX` 系统,
- 可能是 `PEM` 编码,也可能是 `DER` 编码,大多数应该是 `PEM` 编码

`CER`

- **证书文件**
- 还是 `certificate`
- 常见于 `Windows` 系统
- 可能是 `PEM` 编码,也可能是 `DER` 编码,大多数应该是 `DER` 编码.

`KEY`

- **密钥文件**
- 通常用来存放一个公钥或者私钥
- 编码可能是 `PEM` ,也可能是 `DER` .
- **查看** `KEY` 的办法:
  - `PEM` 格式：`openssl rsa -in mykey.key -text -noout`
  - `DER` 格式：`openssl rsa -in mykey.key -text -noout -inform der`

`CSR`

- 全称 `Certificate Signing Request`, 即**证书签名请求**
- 这个并不是证书, 而是向权威证书颁发机构**获得签名证书的申请**, 其核心内容是一个公钥 (当然还附带了一些别的信息), 在生成这个申请的时候, 同时也会生成一个私钥, 私钥要自己保管好.
- **查看**的办法
  - `PEM` 格式：`openssl req -noout -text -in my.csr`
  - `DER` 格式：`openssl req -noout -text -in my.csr -inform der`

`PFX/P12`

- `PFX（PKCS#12）`是公钥加密技术12号标准的实现规范，主要用于**存储加密的私钥、数字证书及证书链**，形成以 `.pfx` 或 `.p12` 为扩展名的二进制文件
- 对 `*nix` 服务器来说,一般 `CRT` 和 `KEY` 是分开存放在不同文件的。但 Windows 的 `IIS` 则将它们存在一个 `PFX` 文件中(因此这个文件包含了证书及私钥)
- `PFX` 通常会有一个"提取密码", 当要读取里面的信息时，需要提供提取密码
- `PFX` 使用的是 `DER` 编码,
- 把 `PFX` 转换为 `PEM` 编码
  - 命令：`openssl pkcs12 -in for-iis.pfx -out for-iis.pem -nodes`
  - 这个时候会提示你输入提取代码。
  - `for-iis.pem` 就是可读的文本.
- 生成 `PFX` 的命令:
  - `openssl pkcs12 -export -in certificate.crt -inkey privateKey.key -out certificate.pfx -certfile CACert.crt`
  - 解释：输入 CRT 文件和 KEY 文件，输出一个 PFX 文件
  - `-certfile CACert.crt`，其中 `CACert.crt` 是CA(权威证书颁发机构)的根证书（不理解传递这个证书是什么意思）

### 证书编码的转换

`PEM` 转为 `DER`：`openssl x509 -in cert.crt -outform der -out cert.der`

`DER` 转为 `PEM`：`openssl x509 -in cert.crt -inform der -outform pem -out cert.pem`

(提示:要转换 KEY 文件也类似,只不过把 x509 换成 rsa ,要转 CSR 的话,把 x509 换成 req...)

## 获得证书

### 向权威证书颁发机构申请证书

- 使用命令生成一个 `CSR` : `openssl req -newkey rsa:2048 -new -nodes -keyout my.key -out my.csr`
- 把 `CSR` 交给权威证书颁发机构, 权威证书颁发机构对此进行签名, 完成.
- 保留好 `CSR` , 当权威证书颁发机构颁发的证书过期的时候, 你还可以用同样的 `CSR` 来申请新的证书, `KEY` 保持不变.

### 生成自签名的证书

- 在生成证书的过程中会要你填一堆信息, 其实真正要填的只有 `Common Name` , 通常填写你服务器的域名, 如 `"yourcompany.com"` , 或者你服务器的IP地址, 其它都可以留空的
- **生产环境中还是不要使用自签的证书**, 否则浏览器会不认, 或者如果你是企业应用的话能够强制让用户的浏览器接受你的自签证书也行.
- 向权威机构要证书通常是要钱的, 但现在也有免费的, 仅仅需要一个简单的域名验证即可

命令：

- `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout myserver.key -out myserverca.crt -subj  "/C=cn/ST=js/L=nj/O=mycompany/OU=IT/CN=mycompany.com/emailAddress=test@qq.com"`
  - `-keyout`：输出的 KEY 文件
  - `-out`：输出的 CRT 文件
  - `-subj`：填写的信息
    - `CN`：域名
    - `emailAddress`：邮箱地址

浏览器行为：

- 访问 https 协议的 url，浏览器识别到网站使用自签证书后，就会认为连接不是 secure，然后如果确定继续访问的话，url 会从 https 变成 http

## 根据 PFX 生成 KEY 和 CRT

IIS 导出 PFX 时会要求输入密码用于后续操作 PFX 文件使用

步骤：

1. 根据 PFX 文件生成 PEM 文件
2. 根据 PEM 文件分别生成 KEY 文件和 CRT 文件

```bash
openssl pkcs12 -in WMSVC-SHA2.pfx -nodes -out server.pem
# 运行后需要输入密码

openssl rsa -in server.pem -out server.key

openssl x509 -in server.pem -out server.crt
```

## openssl

### 使用 openssl

有两种方法使用 openssl

1. 下载并安装 openssl 软件
2. 创建 conda 环境，在环境里面安装 openssl，然后在环境里面使用 openssl 命令

### 命令

测试连接并展示证书文件。可以看出是不是自签证书

```bash
openssl s_client -connect localhost:8100 -servername localhost -showcerts
```

## other

[工具网站](https://www.chinassl.net/ssltools/index.html)
