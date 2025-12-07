# debug

- [debug](#debug)
  - [1. 创建 launch.json](#1-创建-launchjson)
  - [2. 触发任务](#2-触发任务)
  - [3. 设置断点](#3-设置断点)
  - [4. 调试](#4-调试)

## 1. 创建 launch.json

1. 打开 VSCode，进入 `Run and Debug` 侧边栏。
2. 点击 `Create a launch.json file`，选择 `Python` 环境。
3. 在生成的 `launch.json` 中添加 `Celery Worker` 的调试配置：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Celery Worker",
            "type": "debugpy",
            "request": "launch",
            "module": "celery",
            "args": [
                // "-A", "your_project.celery_app",  替换为你的 Celery App 模块路径
                "-A", "qc.celery_app", // 例子：qc 为 Celery App 的名称
                "worker",
                "--loglevel=info",
                "--pool=solo"  // 使用单进程池，避免多进程调试问题
            ],
            "env": {
                "PYTHONPATH": "${workspaceFolder}"
            }
        }
    ]
}
```

## 2. 触发任务

在测试文件中写代码，直接调用任务。这样就会发生消息到队列中

```py
from your_project.tasks import your_task

if __name__ == "__main__":
    # 同步调用（触发断点）
    your_task.delay()  # 或者 your_task.apply_async()
```

## 3. 设置断点

在代码中设置断点

## 4. 调试

两种运行调试的方式：

1. 点击右上角运行按钮的下拉按钮，选择 `Python Debugger: Debug using launch.json`
2. 进入 `Run and Debug` 侧边栏，上方选择 `Debugger` 的地方选择 `Celery Worker`（该名称为 `launch.json` 中的 `name`），点击运行

运行后会自动从队列中取消息，并运行对应的 task，会停在断点处。
