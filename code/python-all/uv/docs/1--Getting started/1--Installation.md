# 安装 uv

- [安装 uv](#安装-uv)
  - [正常安装](#正常安装)
  - [安装 uv（系统级）](#安装-uv系统级)
    - [1. 安装 uv（系统级）](#1-安装-uv系统级)
    - [2. 设置系统级环境变量](#2-设置系统级环境变量)
    - [3. 加入系统 PATH](#3-加入系统-path)

## 正常安装

独立安装方式，运行命令：

```bash
PS> powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

验证安装

```bash
uv --version
```

## 安装 uv（系统级）

下面的命令都需要以管理员身份打开 PowerShell 来运行。

### 1. 安装 uv（系统级）

执行：

```powershell
# 创建全局目录
New-Item -ItemType Directory -Path "D:\folder\uv\cache", "D:\folder\uv\python", "D:\folder\uv\tools", "D:\folder\uv\bin" -Force

# 安装 uv 到指定目录
$env:UV_INSTALL_DIR = "D:\folder\uv"

# Windows Server 2016（TLS 1.2 问题）
powershell -ExecutionPolicy ByPass -c "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; irm https://astral.sh/uv/install.ps1 | iex"

# 新版 Windows Server（如 2019/2022）直接用：
# powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. 设置系统级环境变量

```powershell
[Environment]::SetEnvironmentVariable("UV_INSTALL_DIR", "D:\folder\uv", "Machine")
[Environment]::SetEnvironmentVariable("UV_CACHE_DIR", "D:\folder\uv\cache", "Machine")
[Environment]::SetEnvironmentVariable("UV_PYTHON_INSTALL_DIR", "D:\folder\uv\python", "Machine")
[Environment]::SetEnvironmentVariable("UV_TOOL_DIR", "D:\folder\uv\tools", "Machine")
[Environment]::SetEnvironmentVariable("UV_TOOL_BIN_DIR", "D:\folder\uv\bin", "Machine")
```

### 3. 加入系统 PATH

```powershell
$oldPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$newPath = "$oldPath;D:\folder\uv;D:\folder\uv\bin"
[Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
```
