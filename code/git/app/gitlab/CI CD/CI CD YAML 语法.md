# CI CD YAML 语法

[官网参考](https://docs.gitlab.cn/docs/jh/ci/yaml/)

## 全局关键词

### environment

**1、说明**

作用：定义作业部署到的环境名称。

环境名称可以是任意字符串，例如 `production`、`staging`、`testing` 等等。

可以在 Gitlab 界面的 `Operate` -> `Environments` 页面看到定义的环境。

**2、示例**

```yaml
some-job:
  environment: production
```
