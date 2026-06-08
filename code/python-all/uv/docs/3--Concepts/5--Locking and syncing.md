# 锁定与同步

- [锁定与同步](#锁定与同步)
  - [自动锁定与同步](#自动锁定与同步)
  - [创建锁文件](#创建锁文件)
  - [同步环境](#同步环境)
  - [升级包版本](#升级包版本)
  - [导出锁文件](#导出锁文件)

锁定（Locking）是将项目依赖解析到 **锁文件（lockfile）** 的过程。

同步（Syncing）是从锁文件中安装一部分包到 **项目环境** 的过程。

## 自动锁定与同步

在 uv 中，锁定和同步是_自动_的。例如，当使用 `uv run` 时，项目会在调用所请求的命令之前被锁定和同步。这确保了项目环境始终是最新的。同样，读取锁文件的命令，如 `uv tree`，也会在运行前自动更新它。

要在不检查锁文件是否为最新的情况下使用它，请使用 `--frozen` 选项：

```bash
uv run --frozen ...
```

同样，要在不检查环境是否为最新的情况下运行命令，请使用 `--no-sync` 选项：

```bash
uv run --no-sync ...
```

## 创建锁文件

虽然锁文件是自动创建的，但也可以使用 `uv lock` 显式创建或更新锁文件：

```bash
uv lock
```

## 同步环境

虽然环境是自动同步的，但也可以使用 `uv sync` 显式同步：

```bash
uv sync
```

如果项目没有环境，会自动创建环境（创建 `.venu` 目录）并安装所有依赖项。如果项目已经有环境，uv 将安装锁文件中缺失的包，并删除环境中锁文件中不再需要的包。

## 升级包版本

升级所有包：

```bash
uv lock --upgrade
```

将单个包升级到最新版本：

```bash
uv lock --upgrade-package <package>
```

将单个包升级到特定版本：

```bash
uv lock --upgrade-package <package>==<version>
```

## 导出锁文件

可以使用 `uv export --format requirements-txt` 将 `uv.lock` 导出为 `requirements.txt` 格式。然后，生成的 `requirements.txt` 文件可以通过 `uv pip install` 或其他工具（如 pip）进行安装。

> `requirements.txt` 文件用作依赖管理的替代方案。不要同时使用 `uv.lock` 和 `requirements.txt` 文件。
