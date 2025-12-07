# Creating projects

- [Creating projects](#creating-projects)
  - [创建项目文件](#创建项目文件)
  - [创建环境](#创建环境)
  - [创建 python 项目](#创建-python-项目)
  - [添加新的依赖](#添加新的依赖)

在本教程中，我们将介绍如何使用 `environment.yml` 文件在 `conda` 中设置一个新的 Python 项目。该文件将帮助您跟踪依赖项并与他人共享您的项目。

## 创建项目文件

创建空文件夹，在空文件夹里面创建 `environment.yml` 文件，内容：

```yml
name: my-project
channels:
  - defaults
dependencies:
  - python
```

## 创建环境

在 `environment.yml` 文件所在的文件夹打开终端，输入下面的命令通过 yml 文件创建环境

```sh
conda env create --file environment.yml
```

在 conda 终端输入命令切换环境：

```sh
conda activate my-project
```

注意：**切换环境要在 conda 终端执行，在其他终端例如 git bash 执行会报错**

## 创建 python 项目

创建 main.py 文件：

```py
def main():
    print("Hello, conda!")

if __name__ == "__main__":
    main()
```

运行 py 文件：

```sh
python main.py
```

## 添加新的依赖

在 `environment.yml` 添加 `pandas` 依赖

```yml
name: pythonTest
channels:
  - defaults
dependencies:
  - python
  - pandas
```

运行更新命令，自动下载 pandas 包：

```sh
conda env update --file environment.yml
```

python 文件使用 pandas 包：

```py
import pandas as pd
def main():
    print("Hello, conda!")

if __name__ == "__main__":
    main()
```
