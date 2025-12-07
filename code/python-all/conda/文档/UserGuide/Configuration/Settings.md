# Settings

- [Settings](#settings)
  - [General configuration](#general-configuration)
    - [proxy\_servers](#proxy_servers)
  - [Advanced configuration](#advanced-configuration)
    - [envs\_dirs](#envs_dirs)

## General configuration

### proxy_servers

作用：设置代理服务器。默认 `proxy_servers` 的值为 `{}`

默认情况下，代理设置从 `HTTP_proxy` 和 `HTTPS_proxy` **环境变量**或系统中提取。

设置它们会覆盖默认值：

```txt
proxy_servers:
    http: http://user:pass@corp.com:8080
    https: http://user:pass@corp.com:8080
```

```bash
conda config --set proxy_servers.http http://user:pass@proxy.server:port
conda config --set proxy_servers.https https://user:pass@proxy.server:port
```

## Advanced configuration

### envs_dirs

作用: 指定环境目录。决定存放包缓存的位置

如果设置了该配置，那么将不会使用根前缀

配置方式：

1、`.condarc` 配置

```txt
envs_dirs:
  - ~/my-envs
  - /opt/anaconda/envs
```

2、命令：`conda config --add envs_dirs /path/to/your/envs`

> 使用 `CONDA_ENVS_PATH` 环境变量会覆盖该设置
