# 快速使用

- [快速使用](#快速使用)
  - [安装 uv](#安装-uv)
  - [基础使用](#基础使用)
    - [1️⃣ 创建项目](#1️⃣-创建项目)
    - [2️⃣ 安装依赖](#2️⃣-安装依赖)
    - [3️⃣ 运行代码](#3️⃣-运行代码)
    - [4️⃣ 同步依赖](#4️⃣-同步依赖)
    - [5️⃣ 查看包](#5️⃣-查看包)
    - [6️⃣ Python 版本管理](#6️⃣-python-版本管理)

## 安装 uv

官方脚本：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

验证安装

```bash
uv --version
```

## 基础使用

### 1️⃣ 创建项目

```bash
uv init my-project
cd my-project
```

或

```bash
cd my-project
uv init
```

👉 自动生成：

- pyproject.toml
- .venv（虚拟环境）

### 2️⃣ 安装依赖

```bash
uv add requests
uv add pandas
```

### 3️⃣ 运行代码

```bash
uv run main.py
```

### 4️⃣ 同步依赖

```bash
uv sync
```

### 5️⃣ 查看包

```bash
uv pip list
```

### 6️⃣ Python 版本管理

```bash
uv python install 3.11
uv python pin 3.11
```
