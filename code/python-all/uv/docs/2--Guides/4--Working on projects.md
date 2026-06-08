# 管理项目

- [管理项目](#管理项目)
  - [创建一个新项目](#创建一个新项目)
  - [项目结构](#项目结构)
    - [`pyproject.toml`](#pyprojecttoml)
    - [`.python-version`](#python-version)
    - [`.venv`](#venv)
    - [`uv.lock`](#uvlock)
  - [管理依赖项](#管理依赖项)
  - [运行命令](#运行命令)

uv 支持管理 Python 项目，这些项目在 `pyproject.toml` 文件中定义其依赖项。

## 创建一个新项目

你可以使用 `uv init` 命令创建一个新的 Python 项目：

```bash
uv init hello-world
cd hello-world
```

或者，你可以在工作目录中初始化一个项目：

```bash
mkdir hello-world
cd hello-world
uv init
```

uv 将创建以下文件：

```txt
├── .gitignore
├── .python-version
├── README.md
├── main.py
└── pyproject.toml
```

## 项目结构

一个项目由几个协同工作的重要部分组成，这些部分允许 uv 管理你的项目。

除了 `uv init` 创建的文件外，当你第一次运行项目命令（即 `uv run`、`uv sync` 或 `uv lock`）时，uv 将在你的项目根目录中**创建一个虚拟环境**和 `uv.lock` 文件。

一个完整的列表如下所示：

```text
.
├── .venv
│   ├── bin
│   ├── lib
│   └── pyvenv.cfg
├── .python-version
├── README.md
├── main.py
├── pyproject.toml
└── uv.lock
pyproject.toml
pyproject.toml 包含关于你的项目的元数据：
```

> `uv venv` 只会创建虚拟环境（`.venv` 文件夹），并使用最新的 Python 版本。不会创建 `pyproject.toml`、`.python-version` 或 `uv.lock` 文件。
>
> ```bash
> uv venv
> ```
>
> ```txt
> Using CPython 3.14.5
> Creating virtual environment at: .venv
> Activate with: .venv\Scripts\activate
> ```

### `pyproject.toml`

```txt
[project]
name = "hello-world"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
dependencies = []
```

你将使用此文件指定依赖项，以及项目的详细信息，如其描述或许可证。你可以手动编辑此文件，或使用 `uv add` 和 `uv remove` 等命令从终端管理你的项目。

### `.python-version`

`.python-version` 文件包含项目的默认 Python 版本。此文件告诉 uv 在创建项目的虚拟环境时使用哪个 Python 版本。

### `.venv`

`.venv` 文件夹包含你的项目的虚拟环境，这是一个与系统其余部分隔离的 Python 环境。uv 将在此处安装你的项目的依赖项。

文件夹结构如下所示：

```text
.venv
├── Scripts
│   ├── activate.bat
│   └── python.exe
├── lib\site-packages
│   ├── package1
│   └── package2
└── pyvenv.cfg
```

`pyvenv.cfg` 文件包含有关虚拟环境的信息，如其 Python 版本和系统路径。

```txt
home = C:\Users\currentUser\AppData\Roaming\uv\python\cpython-3.10-windows-x86_64-none
implementation = CPython
uv = 0.11.18
version_info = 3.10.20
include-system-site-packages = false
prompt = searatesview2-0
```

- `home`：uv 管理的 Python 版本的安装路径
- `implementation`：Python 实现（如 CPython、PyPy 等）
- `uv`：uv 的版本
- `version_info`：Python 版本信息

### `uv.lock`

`uv.lock` 是一个跨平台的锁文件，包含有关你的项目依赖项的精确信息。与用于指定项目广泛需求的 `pyproject.toml` 不同，锁文件包含安装在项目环境中的确切解析版本。

此文件应检入版本控制，以便在不同机器上实现一致且可复现的安装。

`uv.lock` 是一个人类可读的 TOML 文件，但由 uv 管理，不应手动编辑。

## 管理依赖项

使用 `uv add` 命令添加依赖项：

```bash
uv add requests
```

安装指定版本的依赖：

```bash
uv add 'requests==2.31.0'
```

移除依赖：

```bash
uv remove requests
```

要升级一个包，请使用带有 `--upgrade-package` 标志的 `uv lock`：

```bash
$ uv lock --upgrade-package requests
```

## 运行命令

在每次调用 `uv run` 之前，uv 将验证锁文件是否与 `pyproject.toml` 同步，以及环境是否与锁文件同步，从而使你的项目保持同步，无需手动干预。

```bash
uv run main.py
```

也可以先手动更新环境，然后激活环境，再运行脚本：

```bash
uv sync
.venv\Scripts\activate
python main.py
```

> 虚拟环境必须处于活动状态才能在没有 uv run 的情况下在项目中运行脚本和命令。虚拟环境的激活因 shell 和平台而异。
