# Celery

- [Celery](#celery)
  - [总体思路](#总体思路)
  - [更新](#更新)
    - [更新 git](#更新-git)
    - [更新 conda 环境](#更新-conda-环境)
  - [检查](#检查)
    - [创建 job](#创建-job)
    - [检查 Celery 是否在执行 task](#检查-celery-是否在执行-task)
    - [停止 Celery worker](#停止-celery-worker)
  - [部署（重启 celery）](#部署重启-celery)
  - [重启（重启 apache）](#重启重启-apache)
  - [完整 yml 文件](#完整-yml-文件)
  - [遇到的问题](#遇到的问题)
    - [使用脚本启动 Celery worker](#使用脚本启动-celery-worker)

分为三个阶段：更新、检查、部署和重启。

## 总体思路

1. 首先更新 `git` 和 `conda` 环境
2. 然后检查 `Celery` 是否在执行 `task`。最终输出一份 `child.yml` 来执行子 `pipeline`。
   1. 如果 `Celery` 没有在执行 `task`，可以自动重启 `Celery`。
      - `child.yml` 包含自动关闭 `Celery worker` `job` 和自动重启 `Celery worker` `job`。
   2. 如果 `Celery` 在执行 `task`，那么需要人工等待 task 运行完，然后再手动重启 `Celery`。
      - `child.yml` 包含手动关闭 `Celery worker` `job` 和依赖手动关闭 `Celery worker` `job` 的自动重启 `Celery worker` `job`。
3. 执行 `child.yml` 中的子 `pipeline`
4. 重启 `apache`

## 更新

### 更新 git

yml 文件直接调用 `git pull`：

```yml
update_git:
  stage: update
  script:
    - git pull
```

### 更新 conda 环境

思路：

1. 当 `environment.yml` 才更新 `conda` 环境
2. `activate` `conda` 环境
3. 根据 `environment.yml` 更新 `conda` 环境

```yml
variables:
  CONDA_ACTIVATE: "C:\\Users\\CurrentUser\\AppData\\Local\\miniforge3\\Scripts\\activate.bat"

update_conda_env:
  stage: update
  rules:
    - changes:
        - environment.yml
  script:
    - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && conda env update -f environment.yml --prune"'
```

## 检查

### 创建 job

思路：

1. 创建 job，调用 `check_celery_tasks.py` 脚本检查 `Celery` 是否在执行 `task`，并且把检查结果写入 `celery_status.env` 文件和 `child-ci.yml` 文件。
2. `celery_status.env` 文件会被 `GitLab` 识别为 `dotenv` 报告，里面的变量会被自动注入到后续的 `job` 中，可以在后续的 `job` 中通过环境变量获取检查结果。
3. `child-ci.yml` 文件会被后续的 `trigger` 直接使用，作为子 `pipeline` 的配置文件。

```yml
variables:
  CONDA_ACTIVATE: "C:\\Users\\CurrentUser\\AppData\\Local\\miniforge3\\Scripts\\activate.bat"
  CONDA_ENV: "CondaEnvName"

check_celery:
  stage: check
  needs:
    - job: update_git
    - job: update_conda_env
      optional: true
  script:
    - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && python tools/check_celery_tasks.py --write-dotenv celery_status.env --write-child child-ci.yml"'
  artifacts:
    when: always
    reports:
      dotenv: celery_status.env
    paths:
      - child-ci.yml
```

### 检查 Celery 是否在执行 task

思路：

1. 创建 `check_celery_tasks.py`，通过 `celery` 的 `inspect` API 检查 `Celery` 是否在执行 `task`。
2. 把检查结果写入 `celery_status.env` 文件和 `child-ci.yml` 文件。
   1. `celery_status.env` 文件包含 `CELERY_HAS_TASKS`、`CELERY_TASK_TOTAL`、`CELERY_TASK_ACTIVE`、`CELERY_TASK_RESERVED`、`CELERY_TASK_SCHEDULED` 等变量，供后续的 `job` 使用。
   2. `child-ci.yml` 文件根据是否有正在执行的 `task` 来决定是生成自动重启 `Celery` 的配置还是生成手动重启 `Celery` 的配置。

```py
import argparse
import os
import sys
from typing import Dict, List, Tuple

sys.path.extend(["./", "../"])

from project.celery_app.celery import app

# 手动触发子 pipeline
CHILD_PIPELINE_WITH_MANUAL = """default:
    tags:
        - windows
    before_script:
        - 'if (-Not (Test-Path "$env:PROJECT_DIR")) { throw "PROJECT_DIR not found: $env:PROJECT_DIR" }'
        - 'Set-Location "$env:PROJECT_DIR"'

stages:
    - check
    - deploy

stop_celery_manual:
    stage: check
    when: manual
    script:
        - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && python tools/stop_celery_workers.py --timeout-seconds 120"'

start_celery_manual:
    stage: deploy
    needs:
        - job: stop_celery_manual
    script:
        - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && python tools/check_worker_status.py "'
"""

# 自动触发子 pipeline
CHILD_PIPELINE_WITH_AUTO = """default:
    tags:
        - windows
    before_script:
        - 'if (-Not (Test-Path "$env:PROJECT_DIR")) { throw "PROJECT_DIR not found: $env:PROJECT_DIR" }'
        - 'Set-Location "$env:PROJECT_DIR"'

stages:
    - check
    - deploy

stop_celery_auto:
    stage: check
    script:
        - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && python tools/stop_celery_workers.py --timeout-seconds 120"'

start_celery_auto:
    stage: deploy
    needs:
        - job: stop_celery_auto
    script:
        - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && python tools/check_worker_status.py"'
"""


def _count_tasks(task_map: Dict[str, List[dict]]) -> int:
    total = 0
    for tasks in (task_map or {}).values():
        if tasks:
            total += len(tasks)
    return total


# 调用 celery inspect API 检查是否有正在执行的 task
def inspect_tasks(timeout: int) -> Tuple[bool, dict]:
    inspector = app.control.inspect(timeout=timeout)
    if inspector is None:
        return False, {"active": {}, "reserved": {}, "scheduled": {}}

    active = inspector.active() or {}
    reserved = inspector.reserved() or {}
    scheduled = inspector.scheduled() or {}

    counts = {
        "active": _count_tasks(active),
        "reserved": _count_tasks(reserved),
        "scheduled": _count_tasks(scheduled),
    }
    total = counts["active"] + counts["reserved"] + counts["scheduled"]

    return total > 0, {"counts": counts, "total": total}


def _resolve_ci_path(path: str) -> str:
    base_dir = os.environ.get("CI_PROJECT_DIR") or os.getcwd()
    return os.path.abspath(os.path.join(base_dir, path))


# 把检查结果写入 dotenv 文件，供后续 job 使用
def write_dotenv(path: str, has_tasks: bool, counts: dict, total: int, inspect_error: bool = False) -> None:
    target_path = _resolve_ci_path(path)
    lines = [
        f"CELERY_HAS_TASKS={1 if has_tasks else 0}",
        f"CELERY_TASK_TOTAL={total}",
        f"CELERY_TASK_ACTIVE={counts.get('active', 0)}",
        f"CELERY_TASK_RESERVED={counts.get('reserved', 0)}",
        f"CELERY_TASK_SCHEDULED={counts.get('scheduled', 0)}",
    ]
    if inspect_error:
        lines.append("CELERY_INSPECT_ERROR=1")

    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, "w", encoding="utf-8") as handle:
        handle.write("\n".join(lines) + "\n")

# 把检查结果写入 child-ci.yml 文件，供后续 trigger 直接使用
def write_child_ci(path: str, enable_manual: bool) -> None:
    target_path = _resolve_ci_path(path)
    content = CHILD_PIPELINE_WITH_MANUAL if enable_manual else CHILD_PIPELINE_WITH_AUTO
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, "w", encoding="utf-8") as handle:
        handle.write(content)


def main() -> int:
    parser = argparse.ArgumentParser(description="Check running Celery tasks.")
    parser.add_argument("--timeout", type=int, default=5, help="Inspect timeout in seconds.")
    parser.add_argument("--write-dotenv", dest="dotenv", help="Write task info to a dotenv file.")
    parser.add_argument("--write-child", dest="child_ci", help="Write child pipeline YAML.")
    args = parser.parse_args()

    try:
        has_tasks, info = inspect_tasks(args.timeout)
        counts = info.get("counts", {})
        total = info.get("total", 0)
        print(
            f"Celery tasks: total={total}, active={counts.get('active', 0)}, "
            f"reserved={counts.get('reserved', 0)}, scheduled={counts.get('scheduled', 0)}"
        )

        if args.dotenv:
            write_dotenv(args.dotenv, has_tasks, counts, total)
        if args.child_ci:
            write_child_ci(args.child_ci, has_tasks)

        return 0
    except Exception as exc:
        print(f"Celery inspect failed: {exc}")
        if args.dotenv:
            write_dotenv(args.dotenv, True, {"active": 0, "reserved": 0, "scheduled": 0}, 0, True)
        if args.child_ci:
            write_child_ci(args.child_ci, True)
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

### 停止 Celery worker

思路：

1. 创建 `stop_celery_workers.py`，通过 `celery` 的 `control` API 停止 `Celery worker`。
2. 如果仍有 worker 在工作，则通过 process API 强制杀死 worker 进程。

```py
import argparse
import sys
import time
from typing import List

import psutil

sys.path.extend(["./", "../"])

from project.celery_app.celery import app


def _find_celery_worker_pids() -> List[int]:
    pids = []
    for proc in psutil.process_iter(["pid", "cmdline"]):
        try:
            cmdline = proc.info.get("cmdline") or []
            if not cmdline:
                continue
            joined = " ".join(cmdline).lower()
            if "celery" in joined and " worker" in joined:
                pids.append(proc.info["pid"])
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue
    return pids


def _terminate_pids(pids: List[int]) -> None:
    for pid in pids:
        try:
            proc = psutil.Process(pid)
            proc.terminate()
        except psutil.NoSuchProcess:
            continue


def _kill_pids(pids: List[int]) -> None:
    for pid in pids:
        try:
            proc = psutil.Process(pid)
            proc.kill()
        except psutil.NoSuchProcess:
            continue


def main() -> int:
    parser = argparse.ArgumentParser(description="Stop Celery workers.")
    parser.add_argument("--timeout-seconds", type=int, default=120, help="Wait time before force kill.")
    args = parser.parse_args()

    try:
        app.control.shutdown()
        print("Sent Celery shutdown signal.")
    except Exception as exc:
        print(f"Celery shutdown signal failed: {exc}")

    deadline = time.time() + args.timeout_seconds
    while time.time() < deadline:
        remaining = _find_celery_worker_pids()
        if not remaining:
            print("All Celery workers stopped.")
            return 0
        time.sleep(2)

    remaining = _find_celery_worker_pids()
    if remaining:
        print(f"Force terminating Celery workers: {remaining}")
        _terminate_pids(remaining)
        time.sleep(5)

    remaining = _find_celery_worker_pids()
    if remaining:
        print(f"Force killing Celery workers: {remaining}")
        _kill_pids(remaining)
        time.sleep(2)

    remaining = _find_celery_worker_pids()
    if remaining:
        print(f"Celery workers still running: {remaining}")
        return 1

    print("Celery workers stopped after force kill.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

## 部署（重启 celery）

思路：

1. 创建 `check_worker_status.py`，通过 `psutil` 检查 Celery worker 状态，如果缺失则启动相应的 worker。

```py
import subprocess
import os
import sys
import psutil

sys.path.extend(["./", "../../"])

from utils.log_handler import setup_logger

logger = setup_logger("project_check_worker_status", __file__)

WORKER_CONFIG = {
    "query_worker": {"queue": "query", "prefetch-multiplier": "1", "concurrency": "6"},
    "format_worker": {"queue": "format", "prefetch-multiplier": "1", "concurrency": "6"},
}


def check_worker_status():
    required_workers = list(WORKER_CONFIG.keys())
    running_workers = []
    logger.info("start checking worker status")

    # Check if there is a corresponding worker process in the process list
    for proc in psutil.process_iter(["pid", "name", "cmdline"]):
        try:
            cmdline = proc.info.get("cmdline") or []
            if not cmdline:
                continue
            joined = " ".join(cmdline).lower()
            if "celery" not in joined or " worker" not in joined:
                continue
            for worker in required_workers:
                if worker in joined:
                    running_workers.append(worker)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    running_workers = list(set(running_workers))
    missing_workers = [worker for worker in required_workers if worker not in running_workers]

    if missing_workers:
        logger.info("missing workers: %s", missing_workers)
        for worker in missing_workers:
            try:
                logger.info("start_celery_worker: %s", worker)
                start_celery_worker(worker, WORKER_CONFIG[worker])
            except Exception as exc:
                logger.error("failed to start worker %s: %s", worker, exc)
    else:
        logger.info("All workers are running")


def start_celery_worker(worker_name, config):
    queue = config["queue"]
    concurrency_arg = f" --concurrency={config['concurrency']}" if "concurrency" in config else ""
    prefetch_multiplier_arg = (
        f" --prefetch-multiplier={config['prefetch-multiplier']}" if "prefetch-multiplier" in config else ""
    )
    working_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    inner_command = (
        f"$Host.UI.RawUI.WindowTitle = '{worker_name}';"
        " & 'C:\\Users\\CurrentUser\\AppData\\Local\\miniforge3\\shell\\condabin\\conda-hook.ps1';"
        f" conda activate my_conda_env; $env:CELERY_WORKER_HOSTNAME='{worker_name}';"
        f" python -m celery -A project.celery_app.celery worker --loglevel=info -P threads -Q {queue}"
        f"{concurrency_arg}{prefetch_multiplier_arg} --hostname={worker_name}@%h -E; exit;"
    )
    powershell_command = inner_command

    # start PowerShell process
    creationflags = 0
    if os.name == "nt":  # new console window on Windows
        creationflags = 0x00000010  # CREATE_NEW_CONSOLE
    subprocess.Popen(
        [
            "powershell.exe",
            "-ExecutionPolicy",
            "ByPass",
            "-NoExit",
            "-Command",
            powershell_command,
        ],
        cwd=working_dir,
        creationflags=creationflags,
    )


if __name__ == "__main__":
    try:
        check_worker_status()
    except Exception as exc:
        logger.error("Error checking worker status: %s", exc)

```

## 重启（重启 apache）

思路：

1. 依赖收集 `static` 文件的 `job`
2. 执行重启 `apache` 的命令：`httpd.exe -k restart`

```yml
APACHE_HTTPD: "C:\\Apache24\\bin\\httpd.exe"

restart_apache:
  stage: deploy
  needs:
    - collect_static
  script:
    - 'cmd /c """%APACHE_HTTPD%"" -k restart"'
```

## 完整 yml 文件

`.gitlab-ci.yml`：

```yml
stages:
  - update
  - check
  - deploy
  - restart

variables:
  PROJECT_DIR: "C:\\Projects\\celery-project"
  CONDA_ACTIVATE: "C:\\Users\\CurrentUser\\AppData\\Local\\miniforge3\\Scripts\\activate.bat"
  CONDA_ENV: "CondaEnvName"
  APACHE_HTTPD: "C:\\Apache24\\bin\\httpd.exe"

default:
  tags:
    - windows
  before_script:
    - 'if (-Not (Test-Path "$env:PROJECT_DIR")) { throw "PROJECT_DIR not found: $env:PROJECT_DIR" }'
    - 'Set-Location "$env:PROJECT_DIR"'

update_git:
  stage: update
  script:
    - git pull

update_conda_env:
  stage: update
  rules:
    - changes:
        - environment.yml
  script:
    - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && conda env update -f environment.yml --prune"'

check_celery:
  stage: check
  needs:
    - job: update_git
    - job: update_conda_env
      optional: true
  script:
    - 'cmd /c "call ""%CONDA_ACTIVATE%"" && conda activate %CONDA_ENV% && python tools/check_celery_tasks.py --write-dotenv celery_status.env --write-child child-ci.yml"'
  artifacts:
    when: always
    reports:
      dotenv: celery_status.env
    paths:
      - child-ci.yml

trigger_celery_pipeline:
  stage: check
  needs:
    - job: check_celery
      artifacts: true
  trigger:
    include:
      - artifact: child-ci.yml
        job: check_celery
    strategy: depend

restart_apache:
  stage: restart
  needs:
    - job: update_git
    - job: trigger_celery_pipeline
  script:
    - 'cmd /c """%APACHE_HTTPD%"" -k restart"'
```

## 遇到的问题

### 使用脚本启动 Celery worker

1. 在 GitLab Runner（Windows）服务模式 下是无桌面会话，所以无法弹出窗口，所以在 job 里面运行启动 Celery worker 的脚本，启动的 worker 终端窗口不会显示。
   1. 解决方法：**改用交互式 Runner**。关闭 runner 服务，然后在 runner 文件夹中运行 `.\gitlab-runner.exe run` 命令来启动 runner，这样 runner 启动的终端窗口就会显示，启动的 worker 终端窗口也会显示。
2. 如果直接在 job 里面运行启动 Celery worker 的脚本，job 会一直在等待脚本执行完成，但是启动 Celery worker 的脚本是一个持续运行的脚本，导致 job 一直在运行状态，无法继续执行后续的 job。
   1. 解决方法：不在 job 中运行启动 worker 的脚本，而是直接在 `check_worker_status.py` 脚本中通过 `subprocess` 启动 worker，这样就不会阻塞 job 的执行了。
