# log

celery.app

```py
import logging, os, time
from datetime import datetime
from logging.handlers import TimedRotatingFileHandler
from celery import Celery
from celery.signals import after_setup_logger, after_setup_task_logger
from kombu import Queue

app = Celery(
    "proj",
    broker="amqp://",
    backend="rpc://",
    include=["proj.tasks", "proj.other_tasks"],
)

app.conf.task_queues = (
    Queue("feeds", routing_key="feeds"),
    Queue("default"),
)

app.conf.update(
    result_expires=3600,
    task_routes={"proj.tasks.*": {"queue": "feeds"}},
)


def custom_namer(default_name):
    """
    将默认的 filename.log.2023-08-15 格式改为
    filename-2023-08-15.log
    """
    file_name, timestamp = os.path.splitext(default_name)
    timestamp = timestamp[1:]
    base_file_name, ext = os.path.splitext(file_name)
    return f"{base_file_name}-{timestamp}{ext}"


# ===== 1. Worker 主日志配置 =====
@after_setup_logger.connect
def setup_worker_logger(logger, *args, **kwargs):
    formatter = logging.Formatter(
        "[%(asctime)s] [PID:%(process)d] %(levelname)s @ %(name)s: %(message)s"
    )

    log_folder = f"./proj/Log/worker/{datetime.now().year}/{datetime.now().second}"
    if not os.path.exists(log_folder):
        os.makedirs(log_folder)
    log_file_path = f"{log_folder}/worker.log"

    handler = TimedRotatingFileHandler(
        log_file_path,
        when="s",
        backupCount=5,
        encoding="utf-8",
    )
    handler.namer = custom_namer
    handler.setFormatter(formatter)
    handler.setLevel(logging.INFO)

    logger.addHandler(handler)


# ===== 2. 任务专用日志配置 =====
@after_setup_task_logger.connect
def setup_task_logger(logger, *args, **kwargs):
    task_formatter = logging.Formatter(
        "[%(asctime)s] [TASK:%(task_id)s] %(levelname)s - %(message)s"
    )

    log_folder = f"./proj/Log/task/{datetime.now().year}/{datetime.now().second}"
    if not os.path.exists(log_folder):
        os.makedirs(log_folder)
    log_file_path = f"{log_folder}/task.log"

    handler = TimedRotatingFileHandler(
        log_file_path,
        when="s",
        backupCount=5,
        encoding="utf-8",
    )
    handler.namer = custom_namer
    handler.setFormatter(task_formatter)
    handler.setLevel(logging.DEBUG)

    logger.addHandler(handler)


if __name__ == "__main__":
    app.start()

# celery -A proj worker -l INFO -P eventlet
# celery -A proj.celery_app.celery worker -l INFO -P eventlet
# 要在 proj 的上一层目录运行

```
