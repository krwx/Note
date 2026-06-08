# 安装 python

- [安装 python](#安装-python)
  - [安装命令](#安装命令)
  - [查看已安装的 python 版本](#查看已安装的-python-版本)
  - [升级 python 版本](#升级-python-版本)

uv 会管理 python 的安装，会先下载 python 的安装包，然后**安装到 uv 管理的 python 目录下**。安装完成后，uv 会把安装的 python 版本添加到 uv 管理的 python 版本列表中。

**注意**：uv 安装 python 时不会创建虚拟环境，也不会将 python 安装到虚拟环境中。

## 安装命令

安装最新版 python：

```bash
uv python install
```

安装指定版本的 python：

```bash
uv python install 3.12.5
```

重新安装所有已安装的 python 版本：

```bash
uv python install --reinstall
```

## 查看已安装的 python 版本

```bash
uv python list
```

**输出**：

已安装的 python 版本列表，包含版本号、平台、安装路径等信息。对于未安装的 python 版本，会显示 `<download available>`，表示该版本的安装包已下载，但尚未安装。

```bash
cpython-3.15.0b1-windows-x86_64-none                 <download available>
cpython-3.15.0b1+freethreaded-windows-x86_64-none    <download available>
cpython-3.14.5-windows-x86_64-none                   C:\Users\currentUser\AppData\Roaming\uv\python\cpython-3.14.5-windows-x86_64-none\python.exe
cpython-3.14.5-windows-x86_64-none                   C:\Users\currentUser\.local\bin\python3.14.exe
cpython-3.14.5-windows-x86_64-none                   C:\Users\currentUser\AppData\Roaming\uv\python\cpython-3.14-windows-x86_64-none\python.exe
cpython-3.14.5+freethreaded-windows-x86_64-none      <download available>
cpython-3.13.13-windows-x86_64-none                  <download available>
cpython-3.13.13+freethreaded-windows-x86_64-none     <download available>
cpython-3.12.13-windows-x86_64-none                  <download available>
cpython-3.11.15-windows-x86_64-none                  <download available>
cpython-3.11.3-windows-x86_64-none                   C:\Users\currentUser\AppData\Roaming\uv\python\cpython-3.11.3-windows-x86_64-none\python.exe
cpython-3.11.3-windows-x86_64-none                   C:\Users\currentUser\.local\bin\python3.11.exe
cpython-3.11.3-windows-x86_64-none                   C:\Users\currentUser\AppData\Roaming\uv\python\cpython-3.11-windows-x86_64-none\python.exe
cpython-3.10.20-windows-x86_64-none                  C:\Users\currentUser\AppData\Roaming\uv\python\cpython-3.10.20-windows-x86_64-none\python.exe
cpython-3.10.20-windows-x86_64-none                  C:\Users\currentUser\.local\bin\python3.10.exe
cpython-3.10.20-windows-x86_64-none                  C:\Users\currentUser\AppData\Roaming\uv\python\cpython-3.10-windows-x86_64-none\python.exe
cpython-3.9.25-windows-x86_64-none                   <download available>
cpython-3.8.20-windows-x86_64-none                   <download available>
pypy-3.11.15-windows-x86_64-none                     <download available>
pypy-3.10.16-windows-x86_64-none                     <download available>
pypy-3.9.19-windows-x86_64-none                      <download available>
pypy-3.8.16-windows-x86_64-none                      <download available>
graalpy-3.12.0-windows-x86_64-none                   <download available>
graalpy-3.11.0-windows-x86_64-none                   <download available>
graalpy-3.10.0-windows-x86_64-none                   <download available>
```

## 升级 python 版本

将 python 版本升级到小版本中最新的受支持补丁版本：

```bash
# 升级到 3.12 小版本中最新的受支持补丁版本
uv python upgrade 3.12
```

升级所有 python 版本

```bash
uv python upgrade
```
