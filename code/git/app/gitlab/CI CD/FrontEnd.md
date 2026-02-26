# 前端 CI/CD

- [前端 CI/CD](#前端-cicd)
  - [安装依赖](#安装依赖)
    - [Windows 删除 node\_modules 问题](#windows-删除-node_modules-问题)
  - [构建项目](#构建项目)
  - [部署项目](#部署项目)
  - [完整 yml 文件](#完整-yml-文件)

下面以 vue3 项目为例，使用 pnpm 作为包管理工具。

分为三个阶段：安装依赖、构建项目、部署项目

## 安装依赖

思路：

1. 缓存 pnpm store 目录，避免每次安装依赖都要重新下载包。
   1. `$LOCALAPPDATA` 是 Windows 系统的环境变量，指向当前用户的本地应用数据目录。 pnpm 的 store 目录默认位于 `$LOCALAPPDATA/pnpm/store`，通过缓存这个目录，可以加速依赖安装过程。
2. 执行 `pnpm install` 安装依赖。

```yml
cache:
  key: "pnpm-${CI_COMMIT_REF_SLUG}"
  paths:
    - $LOCALAPPDATA/pnpm/store

install-job:
  stage: install
  script:
    - pnpm install
```

注意的点：

1. 不要缓存 `node_modules` 目录，因为 `node_modules` 目录可能会因为平台不同而不兼容（例如：Windows 和 Linux）。如果缓存了 `node_modules` 目录，可能会导致构建失败或者运行时错误。
   1. Windows 环境问题：
      1. 路径过长：大量依赖层级深，文件路径超过 Windows 默认限制，Runner 读取/打包时报 Incorrect function 或删除失败。
      2. 文件数量太多：上万文件会让压缩/上传极慢，容易超时或中断。
      3. 文件名/符号链接兼容性：部分包包含符号链接或特殊文件名，Windows 处理不稳定。

    ```yml
    # 错误示例：缓存 node_modules 目录
    cache:
      key: "pnpm-${CI_COMMIT_REF_SLUG}"
      paths:
        - node_modules
    ```

2. 不要上传 `node_modules` 目录作为构建产物，因为 `node_modules` 目录可能会很大，上传和下载都会消耗大量的时间和带宽。

    ```yml
    # 错误示例：上传 node_modules 目录作为构建产物
    install-job:
      stage: install
      script:
        - pnpm install
      artifacts:
        expire_in: 1 day
        paths:
          - node_modules
    ```

### Windows 删除 node_modules 问题

`GitLab Runner` 在 `Cleaning up project directory` 阶段删除 `node_modules` 文件，里面的文件路径过长触发了 `Windows` 路径长度限制，会导致删除失败。

解决方法：

1. 启用 git 长路径，运行命令：`git config --system core.longpaths true`

## 构建项目

因为安装依赖我们没有缓存 node_modules 目录，所以构建项目时需要重新安装依赖。

思路：

1. 执行 `pnpm install` 安装依赖。
2. 执行 `pnpm run build` 构建项目。
3. 将构建产物 `dist` 目录上传到 GitLab，供后续部署阶段使用。

```yml
build-job:
  stage: build
  script:
    - pnpm install
    - pnpm run build
  artifacts:
    expire_in: 7 days
    paths:
      - dist
```

## 部署项目

思路：

1. 定义部署阶段的 job，设置 `environment` 为 `production`，并且设置 `dependencies` 为构建阶段的 job，这样部署阶段就能使用构建阶段的产物。
2. 删除 `DEPLOY_DIR` 目录下的所有文件，确保部署目录是干净的。
3. 确保 `DEPLOY_DIR` 目录存在，如果不存在则创建该目录。
4. 使用 `robocopy` 命令复制 `dist` 目录下的文件到 `DEPLOY_DIR` 目录。
   1. `robocopy` 只要有复制/跳过/额外文件等情况，就会返回非 0 的退出码（例如 1、2、3…），`GitLab Runner` 会把 任何非 0 当作失败，所以 `deploy-job` 结束时报 `exit status 1`。
   2. 因为`GitLab Runner` 的 `PowerShell` 执行器会把每一行命令的非 0 退出码当作失败并立刻结束脚本，所以把 `robocopy` 和退出码判断放到同一行命令里，让这一行最终返回 0。

```yml
variables:
  DIST_DIR: "dist"
  DEPLOY_DIR: "C:\\fe\\dist"

deploy-job:
  stage: deploy
  environment: production
  dependencies:
    - build-job
  script:
    - echo "Clean target directory"
    - if (Test-Path "$env:DEPLOY_DIR") { Remove-Item -Path "$env:DEPLOY_DIR\\*" -Recurse -Force }
    - echo "Ensure target directory exists"
    - if (-Not (Test-Path "$env:DEPLOY_DIR")) { New-Item -ItemType Directory -Path "$env:DEPLOY_DIR" | Out-Null }
    - echo "Copy dist to target folder"
    - cmd /c 'robocopy "%DIST_DIR%" "%DEPLOY_DIR%" /MIR /FFT /R:2 /W:5 & if %errorlevel% leq 7 (exit /b 0) else (exit /b %errorlevel%)'
```

## 完整 yml 文件

```yml
stages:
  - install
  - build
  - deploy

variables:
  DIST_DIR: "dist"
  DEPLOY_DIR: "C:\\fe\\dist"

default:
  tags:
    - windows
  before_script:
    - $ErrorActionPreference = "Stop"

cache:
  key: "pnpm-${CI_COMMIT_REF_SLUG}"
  paths:
    - $LOCALAPPDATA/pnpm/store

install-job:
  stage: install
  script:
    - pnpm install

build-job:
  stage: build
  script:
    - pnpm install
    - pnpm run build
  artifacts:
    expire_in: 7 days
    paths:
      - dist

deploy-job:
  stage: deploy
  environment: production
  dependencies:
    - build-job
  script:
    - echo "Clean target directory"
    - if (Test-Path "$env:DEPLOY_DIR") { Remove-Item -Path "$env:DEPLOY_DIR\\*" -Recurse -Force }
    - echo "Ensure target directory exists"
    - if (-Not (Test-Path "$env:DEPLOY_DIR")) { New-Item -ItemType Directory -Path "$env:DEPLOY_DIR" | Out-Null }
    - echo "Copy dist to target folder"
    - cmd /c 'robocopy "%DIST_DIR%" "%DEPLOY_DIR%" /MIR /FFT /R:2 /W:5 & if %errorlevel% leq 7 (exit /b 0) else (exit /b %errorlevel%)'
```
