# 使用工具

许多 Python 包提供可作为工具使用的应用程序。uv 对轻松调用和安装工具提供了专门的支持。

## 运行工具

`uvx` 命令可以在不安装工具的情况下调用它。

例如，要运行 ruff：

```bash
uvx ruff
```

这完全等同于：

```bash
uv tool run ruff
```

> `uvx` 是 `uv tool run` 的别名。

使用 `uvx` 时，工具会安装到临时的、隔离的环境中。

## 安装工具

如果一个工具经常使用，最好将其安装到持久环境中并添加到 `PATH`，而不是重复调用 `uvx`。

例如，要安装 ruff：

```bash
uv tool install ruff
```
