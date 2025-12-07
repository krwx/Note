# Task Scheduler

- [Task Scheduler](#task-scheduler)
  - [介绍](#介绍)
  - [新建 task](#新建-task)
  - [查看 or 编辑 task](#查看-or-编辑-task)
  - [Trigger](#trigger)

## 介绍

在搜索栏搜索 `Task Scheduler`，然后打开

## 新建 task

以新建一个每天都跑，且每隔 2 分钟就跑一次的 task 为例

1. 右键 `Task Schedule Library` ，点击 `New Folder` ，创建新的文件夹
2. 右键新的文件夹，点击 `Create Task`
3. General
   1. `Name` 填写 task 的名字
   2. 勾选 `Hidden` ，运行 `.bat` 文件时不会弹出窗口，会在后台执行
      - 如果没有隐藏，可以更改 `user account` 为 `system`。
      - 步骤：
        - 点击 `Change User or Group`
          - 在 `Enter the object name to select` 里面输入 `system`，点击右侧的 `Check Names`，自动选择 `System`
          - 或者点击 `Advanced`，然后点击 `Find Now`，会列出所有的用户，然后选择 `System`，点击 `OK`
        - 点击 `OK`
      - 原理： `SYSTEM` 账户运行的任务 → 强制在无用户界面的后台会话执行
4. Triggers
   1. 点击 New
   2. `Begin the task` 选择 `On a schedule`
   3. `Settings` 里面选择 `Daily`
   4. `Start` 输入 `12:00:00 AM`
   5. `Advanced Settings` 里面勾选 `Repeat task every` ，输入 `2 minutes`
      - 输入的值最少为 `1 minute`
   6. `for a duration of` 选择 `1 day` 。代表 1 天内一直重复
5. Actions
   1. 点击 New
   2. `Action` 选择 `Start a program`
   3. `Program/script`：点击 `Browse` ，选择 `.bat` 文件
   4. `Start in (optional)`：脚本运行的位置。如果有导入其他模块的，选择运行的 py 文件的路径
6. Conditions
   1. 取消勾选 `Power` 的 `Start the task only if the computer is on AC power`
7. Settings
   1. 取消勾选 `Stop the task if it runs longer than`
   2. 取消勾选 `If the running task does not end when requested, force it to stop`

> 新建一个每天只跑一次的 task，Trigger 里面不用勾选 `Repeat task every`

## 查看 or 编辑 task

选择一个 task 后，点击右侧的 `Actions` 栏中的 `Properties` 选项

## Trigger

- `Begin the task`
  - `On a schedule`
  - `At log on`
