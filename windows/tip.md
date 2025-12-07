# Tip

1. `win + k` ，打开投屏设置

## 终端打开浏览器并访问 url

### PowerShell

方法 1：直接使用 Start-Process

```sh
Start-Process "https://www.example.com"
```

方法 2：使用 CMD 的 start 命令

```sh
# 调用 cmd.exe 的 start 命令
cmd /c start "" "https://www.example.com"

# 更简洁的写法
start "https://www.example.com"
```

### CMD

```sh
cmd /c start "" "https://www.example.com"
```
