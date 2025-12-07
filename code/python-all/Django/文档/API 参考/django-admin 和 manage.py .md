# django-admin 和 manage.py

- [django-admin 和 manage.py](#django-admin-和-managepy)
  - [介绍](#介绍)
  - [命令](#命令)
    - [check](#check)
    - [makemigrations](#makemigrations)
    - [migrate](#migrate)
    - [runserver](#runserver)

## 介绍

`django admin` 是 Django 用于管理任务的命令行实用程序。这份文件概述了它所能做的一切。

此外，`manage.py` 会在每个 Django 项目中自动创建。它做的事情和 `django-admin` 一样

用法：

```bash
django-admin <command> [options]
python manage.py <command> [options]
python -m django <command> [options]
```

## 命令

### check

语法：`python manage.py check [options]`

作用：使用 **系统检查框架** 来检查整个 Django 项目的常见问题。

- **check [app_label [app_label ...]]**
  - 默认情况下，将检查所有应用程序。你可以通过提供应用程序标签的列表作为参数来检查一部分应用程序：

    ```bash
    python manage.py check auth admin myapp
    ```

- **--tag TAGS, -t TAGS**
  - 系统检查框架执行许多不同类型的检查，这些检查被 分类为标签。你可以使用这些标签将执行的检查限制为特定类别中的检查。例如，要只执行模型和兼容性检查，请运行：

    ```bash
    django-admin check --tag models --tag compatibility
    ```

- **--database DATABASE**
  - 指定要运行需要数据库访问的检查的数据库：

    ```bash
    django-admin check --database default --database other
    ```

- **--list-tags**
  - 列出所有可用的标签。

- **--deploy**
  - 激活一些仅在部署环境中相关的附加检查。
  - 你**可以在本地开发环境中使用**这个选项，但由于你的本地开发设置模块可能不包含许多生产设置，所以你可能希望将 `check` 命令指向不同的设置模块，可以通过设置 `DJANGO_SETTINGS_MODULE` 环境变量或通过传递 `--settings` 选项来实现：`django-admin check --deploy --settings=production_settings`
  - 或者你**可以直接在生产或暂存部署上运行**它，以验证是否使用了正确的配置（省略 --settings）。

### makemigrations

语法：`python manage.py makemigrations [options]`

作用：根据检测到的模型变化**创建新的迁移**

### migrate

语法：`python manage.py migrate [options]`

作用：将数据库状态与当前的模型集和迁移同步

### runserver

语法：`python manage.py runserver [options]`

作用：在本地机器上启动一个轻量级的开发网络服务器。默认情况下，该服务器在 IP 地址 `127.0.0.1` 的 `8000` 端口上运行。你可以明确地传递一个 IP 地址和端口号。

开发服务器会根据需要为每个请求自动重新加载 Python 代码。你不需要重新启动服务器以使代码更改生效。然而，**有些操作，如添加文件不会触发重启**，所以在这些情况下你必须重启服务器。

参数：

- --noreload
  - 禁用自动加载器。这意味着，如果特定的 Python 模块已经被加载到内存中，那么你在服务器运行时所做的任何 Python 代码更改将 不会 生效。
- --nothreading
  - 在开发服务器中禁止使用线程。默认情况下，服务器是多线程的。
- --ipv6, -6
  - 开发服务器使用 IPv6。这将默认 IP 地址从 127.0.0.1 改为 ::1。

使用不同端口和地址的例子：

- IP 地址 `127.0.0.1` 上的端口 `8000`：
  - `python manage.py runserver`
- IP 地址 `1.2.3.4` 上的端口 `8000`：
  - `python manage.py runserver 1.2.3.4:8000`
- IP 地址 `127.0.0.1` 上的端口 `7000`：
  - `python manage.py runserver 7000`
- IP 地址 `1.2.3.4` 上的端口 `7000`：
  - `python manage.py runserver 1.2.3.4:7000`
