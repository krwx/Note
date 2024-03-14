# json-server

- [json-server](#json-server)
  - [遇到的问题](#遇到的问题)
    - [查询值为 true 或 false 的数据，返回空数组](#查询值为-true-或-false-的数据返回空数组)

## 遇到的问题

### 查询值为 true 或 false 的数据，返回空数组

新版本的 `json-server` 会返回空数组

解决：安装旧版本的 `json-server`

```shell
npm i -g json-server@0.17.1
```
