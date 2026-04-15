# 前端 CI/CD

- [前端 CI/CD](#前端-cicd)
  - [安装依赖](#安装依赖)
    - [Windows 删除 node\_modules 问题](#windows-删除-node_modules-问题)
    - [Runner 没有缓存的问题](#runner-没有缓存的问题)
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

### Runner 没有缓存的问题

Runner 没有指定缓存的类型，导致 Runner 不知道要使用哪个缓存，会报错，但是不影响执行 job。

报错信息：`ERROR: Could not create cache adapter   error=cache factory not found: factory for cache adapter "" was not registered`

解决方法：

1. 在 `config.toml` 文件中指定缓存的类型，例如：

    ```toml
    [session_server]
      session_timeout = 1800
    [[runners]]
      name = "test"
      url = "http://gitlab.example.com/"
      token = "xxxx"
      executor = "shell"
      [runners.cache]
        Type = "s3"
        Path = "cache/"
        Shared = true
        [runners.cache.s3]
          ServerAddress = "s3.amazonaws.com"
          AccessKey = "xxxx"
          SecretKey = "xxxx"
          BucketName = "gitlab-cache"
          BucketLocation = "us-east-1"
    ```

2. 不使用缓存，直接删除 pipeline 的 `cache` 配置
   - 单机 `Windows shell runner`，不需要跨机器共享缓存，可以不使用缓存
   - `s3`、`gcs` 和 `azure` 这三种都是远程缓存，适用于分布式 Runner 共享缓存的场景

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
2. 在部署阶段的脚本中，先检查部署目录的父目录是否存在，如果不存在则创建父目录。
3. 删除临时部署目录（`DEPLOY_STAGING_DIR`、`DEPLOY_BACKUP_DIR`）。
   - `DEPLOY_STAGING_DIR` 是用来存放构建产物的临时目录，`DEPLOY_BACKUP_DIR` 是用来备份当前线上版本的临时目录。
4. 创建一个新的 `staging` 目录。
5. 使用 `robocopy` 命令复制 `dist` 目录下的文件到 `staging` 目录。
6. 将 `live` 目录重命名为 `backup` 目录，将 `staging` 目录重命名为 `live` 目录，这样就完成了部署。
7. 如果部署过程中出现任何错误，则回滚到之前的版本。删除 `live` 目录，将 `backup` 目录重命名为 `live` 目录。

`robocopy` 命令的注意事项：

1. `robocopy` 只要有复制/跳过/额外文件等情况，就会返回非 0 的退出码（例如 1、2、3…），`GitLab Runner` 会把任何非 0 当作失败，所以命令结束后的同一行需设置 `exit code` 为 0

```yml
variables:
  DIST_DIR: "dist"
  DEPLOY_LIVE_DIR: "D:\\deploy\\fe\\live"
  DEPLOY_STAGING_DIR: "D:\\deploy\\fe\\live__staging"
  DEPLOY_BACKUP_DIR: "D:\\deploy\\fe\\live__backup"

deploy-job:
  stage: deploy
  environment: production
  dependencies:
    - build-job
  script:
    - echo "Check parent directory"
    - $deployParentDir = Split-Path -Path "$env:DEPLOY_LIVE_DIR" -Parent
    - if (-Not (Test-Path "$deployParentDir")) { New-Item -ItemType Directory -Path "$deployParentDir" -Force | Out-Null }
    - echo "Clean old staging and backup directories"
    - if (Test-Path "$env:DEPLOY_STAGING_DIR") { Remove-Item -Path "$env:DEPLOY_STAGING_DIR" -Recurse -Force }
    - if (Test-Path "$env:DEPLOY_BACKUP_DIR") { Remove-Item -Path "$env:DEPLOY_BACKUP_DIR" -Recurse -Force }
    - echo "Copy dist to staging folder"
    - New-Item -ItemType Directory -Path "$env:DEPLOY_STAGING_DIR" -Force | Out-Null
    - |
        & robocopy "$env:DIST_DIR" "$env:DEPLOY_STAGING_DIR" /MIR /FFT /R:2 /W:5
          if ($LASTEXITCODE -le 7) {
            $global:LASTEXITCODE = 0
          }
          else {
            throw "Robocopy to staging failed with exit code $LASTEXITCODE"
          }
    - echo "Swap live folder with staging folder"
    - |
      try {
        if (Test-Path "$env:DEPLOY_LIVE_DIR") {
          Rename-Item -Path "$env:DEPLOY_LIVE_DIR" -NewName ([System.IO.Path]::GetFileName($env:DEPLOY_BACKUP_DIR)) -Force
        }
        Rename-Item -Path "$env:DEPLOY_STAGING_DIR" -NewName ([System.IO.Path]::GetFileName($env:DEPLOY_LIVE_DIR)) -Force
        echo "Deploy completed successfully"
      }
      catch {
        echo "Deploy switch failed, start rollback"
        if (Test-Path "$env:DEPLOY_LIVE_DIR") {
          Remove-Item -Path "$env:DEPLOY_LIVE_DIR" -Recurse -Force
        }
        if (Test-Path "$env:DEPLOY_BACKUP_DIR") {
          Rename-Item -Path "$env:DEPLOY_BACKUP_DIR" -NewName ([System.IO.Path]::GetFileName($env:DEPLOY_LIVE_DIR)) -Force
          echo "Rollback completed"
        }
        throw
      }
```

## 完整 yml 文件

```yml
stages:
  - build
  - deploy

workflow:
  rules:
    - if: '$CI_COMMIT_BRANCH == "master"'
      when: always
    - when: never

variables:
  DIST_DIR: "dist"
  DEPLOY_LIVE_DIR: "D:\\deploy\\fe\\live"
  DEPLOY_STAGING_DIR: "D:\\deploy\\fe\\live__staging"
  DEPLOY_BACKUP_DIR: "D:\\deploy\\fe\\live__backup"

default:
  tags:
    - windows
  before_script:
    - $ErrorActionPreference = "Stop"

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
    - echo "Check parent directory"
    - $deployParentDir = Split-Path -Path "$env:DEPLOY_LIVE_DIR" -Parent
    - if (-Not (Test-Path "$deployParentDir")) { New-Item -ItemType Directory -Path "$deployParentDir" -Force | Out-Null }
    - echo "Clean old staging and backup directories"
    - if (Test-Path "$env:DEPLOY_STAGING_DIR") { Remove-Item -Path "$env:DEPLOY_STAGING_DIR" -Recurse -Force }
    - if (Test-Path "$env:DEPLOY_BACKUP_DIR") { Remove-Item -Path "$env:DEPLOY_BACKUP_DIR" -Recurse -Force }
    - echo "Copy dist to staging folder"
    - New-Item -ItemType Directory -Path "$env:DEPLOY_STAGING_DIR" -Force | Out-Null
    - |
        & robocopy "$env:DIST_DIR" "$env:DEPLOY_STAGING_DIR" /MIR /FFT /R:2 /W:5
          if ($LASTEXITCODE -le 7) {
            $global:LASTEXITCODE = 0
          }
          else {
            throw "Robocopy to staging failed with exit code $LASTEXITCODE"
          }
    - echo "Swap live folder with staging folder"
    - |
      try {
        if (Test-Path "$env:DEPLOY_LIVE_DIR") {
          Rename-Item -Path "$env:DEPLOY_LIVE_DIR" -NewName ([System.IO.Path]::GetFileName($env:DEPLOY_BACKUP_DIR)) -Force
        }
        Rename-Item -Path "$env:DEPLOY_STAGING_DIR" -NewName ([System.IO.Path]::GetFileName($env:DEPLOY_LIVE_DIR)) -Force
        echo "Deploy completed successfully"
      }
      catch {
        echo "Deploy switch failed, start rollback"
        if (Test-Path "$env:DEPLOY_LIVE_DIR") {
          Remove-Item -Path "$env:DEPLOY_LIVE_DIR" -Recurse -Force
        }
        if (Test-Path "$env:DEPLOY_BACKUP_DIR") {
          Rename-Item -Path "$env:DEPLOY_BACKUP_DIR" -NewName ([System.IO.Path]::GetFileName($env:DEPLOY_LIVE_DIR)) -Force
          echo "Rollback completed"
        }
        throw
      }
```
