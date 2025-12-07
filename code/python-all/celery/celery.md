# celery

用 logging.get_logger() 获取 logger 后，用这个 logger 打印日记还是会打印到 celery 中

- 是的，会把日志同时打印到自定义的 logger 和 celery 的日志里面

## eventlet（不一定准确）

在 Python 中，Celery 使用 eventlet 作为其事件循环库时，并不会直接利用多进程（multiprocessing）的特性。这是因为 eventlet 是一个轻量级的并发库，它通过在单个 Python 进程内部使用协程（coroutines）来模拟并发执行。这种方式避免了操作系统层面的进程创建和管理的开销，从而使得 eventlet 非常适合于 I/O 密集型任务。

注意事项

- I/O 密集型任务：eventlet 非常适合 I/O 密集型任务，如网络请求、文件读写等。对于 CPU 密集型任务（如大量的数学计算），使用 eventlet 可能不是最佳选择，因为这会阻塞整个进程的事件循环。
- 进程隔离：虽然 eventlet 提供了协程级别的并发，但它不支持真正的进程隔离。如果你的任务需要完全独立的进程空间（例如，需要不同的环境变量或不同的 Python 解释器），则应考虑使用真正的多进程池（如 multiprocessing）。
- 性能：对于高负载的 CPU 密集型任务，使用真正的多进程 (multiprocessing) 通常能提供更好的性能和资源利用率。你可以在 Celery 中通过设置 worker_pool = 'prefork' 来启用多进程池。
- eventlet 和 gevent 都是协程
