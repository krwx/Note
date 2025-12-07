# conf

配置文件路径：`C:\Apache24\conf\httpd.conf`

- [conf](#conf)
  - [日志](#日志)
  - [Virtual host](#virtual-host)
  - [Rewrite](#rewrite)
  - [SSL](#ssl)
  - [Authorization](#authorization)
  - [python](#python)

## 日志

设置日志等级

```conf
# Possible values include: debug, info, notice, warn, error, crit, alert, emerg.
LogLevel debug
```

## Virtual host

to learn

## Rewrite

用于重写路径

```conf
# 加载 rewrite 模块
LoadModule rewrite_module modules/mod_rewrite.so
```

例子，看不懂做了啥：

```conf
    # Vue
    <Directory "D:\OtherProgram\searatesviewwebfe\dist">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        RewriteEngine On
        RewriteBase /

        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
```

## SSL

配置 HTTPS

```conf
# 加载 ssl 模块
LoadModule ssl_module modules/mod_ssl.so
```

## Authorization

Apache 默认是过滤 `Authorization` 请求头的

取消过滤：

```conf
WSGIPassAuthorization On

# or
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

## python

`WSGIApplicationGroup %{GLOBAL}` 的作用：

- 强制应用程序使用 Python 主解释器（main interpreter）
- Pandas 依赖的 NumPy 等科学计算库包含C语言编写的扩展模块，这些模块不完全支持 Python 子解释器环境
- 如果没有设置为 python 主解释器会导致 导入卡死

```conf
WSGIApplicationGroup %{GLOBAL}
```
