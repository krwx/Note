# Runner 配置

- [Runner 配置](#runner-配置)
  - [全局](#全局)
    - [concurrent](#concurrent)
  - [`[[runners]]` 配置](#runners-配置)
    - [limit](#limit)
    - [request\_concurrency](#request_concurrency)

[官网参考](https://gitlab.cn/docs/runner/configuration/advanced-configuration/)

## 全局

### concurrent

**1、说明**

限制所有注册 runners 可以同时运行的作业数量。每个 `[[runners]]` 部分可以定义其自己的限制，但此值为所有这些值的组合设置一个最大值。

例如，值为 `10` 意味着不超过 `10` 个作业可以同时运行。`0` 是被禁止的。如果使用此值，runner 进程会因严重错误退出。

**2、示例**

runner 进程最多同时处理 10 个作业：

```toml
concurrent = 10

[[runners]]
  name = "my-runner"
  url = "https://gitlab.com/"
```

## `[[runners]]` 配置

`[[runners]]` 部分定义了一个 runner 的配置。可以有多个 `[[runners]]` 部分来配置多个 runner。

### limit

**1、说明**

限制此注册 runner 可以同时处理的作业数量。

**默认值**是 `0`，表示不限制同时处理的作业数量。

**2、示例**

my-runner 最多同时处理 5 个作业：

```toml
[[runners]]
  name = "my-runner"
  url = "https://gitlab.com/"
  limit = 5
```

### request_concurrency

**1、说明**

限制 Runner 获取新作业的并发请求数量。默认值为 1。必须小于或等于全局 `concurrent`。

设置策略：

1. 低负载/小规模环境
   - 保持默认值 1 即可。
2. 高负载/大规模环境
   - 可以尝试从 4 或 5 开始设置，找到一个平衡点，避免因设置过大而导致无效请求堆积，或设置过小而影响效率。

**2、示例**

Runner 最多同时处理 4 个获取新作业的请求：

```toml
[[runners]]
  name = "my-runner"
  url = "https://gitlab.com/"
  request_concurrency = 4
```
