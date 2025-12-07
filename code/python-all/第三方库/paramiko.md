# paramiko

- [paramiko](#paramiko)
  - [简介](#简介)
  - [简单使用](#简单使用)
    - [SSH连接并执行命令](#ssh连接并执行命令)
    - [通过SFTP上传和下载文件](#通过sftp上传和下载文件)
  - [SSHClient](#sshclient)
    - [set\_missing\_host\_key\_policy(policy)](#set_missing_host_key_policypolicy)
    - [connect()](#connect)
    - [close()](#close)
    - [open\_sftp()](#open_sftp)
  - [SFTP](#sftp)
    - [listdir(path)](#listdirpath)
    - [stat(path)](#statpath)
    - [get()](#get)
    - [remove()](#remove)
  - [Key handling(密钥处理)](#key-handling密钥处理)
    - [PKey](#pkey)
      - [from\_private\_key\_file(filename, password=None)](#from_private_key_filefilename-passwordnone)
    - [Ed25519](#ed25519)

## 简介

`ssh` 是一个协议，`OpenSSH` 是其中一个开源实现，

`paramiko` 是 Python的一个库，实现了 `SSHv2` 协议(底层使用 `cryptography` )。

有了 `Paramiko` 以后，我们就可以在 `Python` 代码中直接使用 `SSH` 协议对远程服务器执行操作

## 简单使用

### SSH连接并执行命令

```py
import paramiko

# 创建SSH客户端
client = paramiko.SSHClient()

# 自动添加未知的服务器密钥及策略
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

# 连接SSH服务端
client.connect('hostname', port=22, username='username', password='password')

# 执行命令
stdin, stdout, stderr = client.exec_command('ls -l')

# 获取命令执行结果
result = stdout.read()

print(result.decode())

# 关闭连接
client.close()
```

### 通过SFTP上传和下载文件

```py
import paramiko

# 创建SSH客户端
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('hostname', port=22, username='username', password='password')

# 创建SFTP会话
sftp = client.open_sftp()

# 上传文件
sftp.put('localfile.txt', '/remote/path/remote.txt')

# 下载文件
sftp.get('/remote/path/remote.txt', 'localfile.txt')

# 关闭SFTP会话和SSH连接
sftp.close()
client.close()
```

## SSHClient

`SSH` 服务器会话的高级表示。此类封装了 `Transport` 、`Channel` 和 `SFTPClient` ，以处理身份验证和打开通道的大部分功能。

创建：

```py
import paramiko
client = paramiko.SSHClient()
```

### set_missing_host_key_policy(policy)

设置 连接到没有已知主机密钥的服务器时使用的策略。

`policy` 是一个类，即 `MissingHostKeyPolicy` 的某个子类，如`RejectPolicy`（默认）、`AutoAddPolicy`、`WarningPolicy` 或用户创建的子类。

```py
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
```

- AutoAddPolicy()
  - 用于自动将主机名和新主机密钥添加到本地 `HostKeys` 对象并保存的策略。这由 `SSHClient` 使用。

### connect()

语法：

```py
connect(hostname, port=22, username=None, password=None, pkey=None, key_filename=None, timeout=None, allow_agent=True, look_for_keys=True, compress=False, sock=None, gss_auth=False, gss_kex=False, gss_deleg_creds=True, gss_host=None, banner_timeout=None, auth_timeout=None, channel_timeout=None, gss_trust_dns=True, passphrase=None, disabled_algorithms=None, transport_factory=None, auth_strategy=None)
```

参数：

- hostname (str) – the server to connect to
- port (int) – the server port to connect to
- username (str) – the username to authenticate as (defaults to the current local username)
- password (str) – 用于密码认证；如果未给出密码，也用于私钥解密

### close()

Close this SSHClient and its underlying Transport.

### open_sftp()

Open an SFTP session on the SSH server.

返回值：a new SFTPClient session object

## SFTP

### listdir(path)

语法：`listdir(path='.')`

返回给定 path 文件夹下的 文件的名字的列表

### stat(path)

语法：`stat(path)`

检索有关远程系统上文件的信息。返回值是一个对象，包含文件的信息：

- st_size：文件大小
- st_uid
- st_gid
- st_mode
- st_atime
- st_mtime

### get()

语法：`get(remotepath, localpath, callback=None, prefetch=True, max_concurrent_prefetch_requests=None)`

将远程文件（`remotepath`）作为从SFTP服务器复制到本地主机作为 `localpath` 文件。

参数：

- remotepath (str) – the remote file to copy
- localpath (str) – the destination path on the local host

```py
self.sftp.get(sftpfile, myfile)
```

### remove()

语法：`remove(path)`

删除给定路径下的文件。这只适用于文件，要删除文件夹（目录），请使用`rmdir`。

```py
self.sftp.remove(removethefile)
```

## Key handling(密钥处理)

### PKey

公钥的基类。

#### from_private_key_file(filename, password=None)

通过读取私钥文件创建密钥对象。

如果私钥已加密且 `password` 不是 `None` ，则将使用给定的密码解密密钥（否则将抛出 `PasswordRequiredException` ）。

这个工厂方法将存在于 `PKey` 的所有子类中

参数：

- filename (str) – 读取的文件的名称
- password (str) – 用于解密密钥文件（如果已加密）的可选密码

返回值：a new PKey based on the given private key

例子：

```py
privateKey = paramiko.Ed25519Key.from_private_key_file(sshpath)
```

### Ed25519

是一个类，表示 `Ed25519` 密钥
