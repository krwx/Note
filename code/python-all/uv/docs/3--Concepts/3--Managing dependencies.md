# 管理依赖

## 添加依赖

```bash
uv add [dependency]
```

从 `requirements.txt` 导入依赖：

```bash
uv add -r requirements.txt
```

> uv add 命令需要有一个项目环境才能运行。
>
> uv add 命令不会自动创建项目环境。

## 删除依赖

```bash
uv remove [dependency]
```

## 更改依赖

下面的命令会删除现有的 `httpx`，并安装满足 `httpx>0.1.0` 的最新版本：

```bash
uv add "httpx>0.1.0"
```
