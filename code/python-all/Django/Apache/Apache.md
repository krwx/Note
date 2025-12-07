# Apache

- [Apache](#apache)
  - [介绍](#介绍)
  - [安装](#安装)
  - [命令](#命令)
  - [日志](#日志)
  - [使用时遇到的问题](#使用时遇到的问题)
    - [启动报错](#启动报错)
    - [python 项目导入其他项目的模块报错](#python-项目导入其他项目的模块报错)

## 介绍

是一个服务器

默认端口为 4200

## 安装

1. 到 <https://www.apachelounge.com/download/> 下载安装包
2. 解压安装包，将里面的 `Apache24` 文件夹复制到 C 盘，路径应该为 `C:\Apache24`
3. 修改 `C:\Apache24\conf\httpd.conf` 文件，更改 `Lisen` 后面的端口，默认是监听 80 端口的
4. 用管理员身份运行 cmd，运行下面的命令

   ```bash
   cd C:\Apache24\bin
   httpd -k install
   httpd -k start
   ```

5. 浏览器浏览 `localhost:xxxx`, 如果看到 "It works" 代表安装成功

## 命令

在 `C:\Apache24\bin`  路径下运行命令

启动

```sh
httpd -k start
```

重启

```sh
httpd -k restart
```

关闭

```sh
httpd -k stop
```

## 日志

log 的存放路径：`C:\Apache24\logs`

- access.log：记录访问 apache 的 url
- error.log：记录日志

## 使用时遇到的问题

### 启动报错

- 日志：`Starting the 'Apache2.4' service(OS 5)Access is denied.  : AH10012: Failed to open the 'Apache2.4' service`
- 解决：需要用管理员身份打开 `cmd`，然后运行 `httpd -k start`

### python 项目导入其他项目的模块报错

- 原因
  - python 运行在 apache 上面，所以当前运行 python 脚本的位置为 `C:\\Apache24`，即搜索模块是在这里搜索的，所以是搜索不到需要导入进来的模块的
  - `os.getcwd()` 也是返回 `C:\\Apache24` 的
- 解决
  - 往 `sys.path` 添加绝对路径
  - `sys.path.append(r"D:\OtherProgram\TargetProject")`
