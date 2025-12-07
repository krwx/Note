# Managing environments

- [Managing environments](#managing-environments)
  - [通过命令行创建环境](#通过命令行创建环境)
  - [使用 environment.yml 创建环境](#使用-environmentyml-创建环境)
  - [更新环境](#更新环境)
  - [克隆环境](#克隆环境)
  - [查看环境](#查看环境)
  - [查看环境安装的包](#查看环境安装的包)
  - [导出环境](#导出环境)
    - [导出 environment.yml](#导出-environmentyml)
    - [只导出指定安装的包](#只导出指定安装的包)
    - [手工创建 `environment.yml`](#手工创建-environmentyml)
  - [移除环境](#移除环境)

## 通过命令行创建环境

指定环境名称创建环境:

> 创建出来的环境没有安装包的
>
> 好像目录有 environment.yml 会自动根据这个文件创建环境？

```sh
conda create --name <my-env>
```

创建有指定版本的 python 包的环境：

```sh
conda create -n myenv python=3.9
```

创建有指定包的环境:

```sh
conda create -n myenv scipy
# 或者
conda create -n myenv python
conda install -n myenv scipy
```

创建有指定版本的指定包的环境:

```sh
conda create -n myenv scipy=0.17.3
# 或者
conda create -n myenv python
conda install -n myenv scipy=0.17.3
```

创建环境同时指定安装多个指定版本的包:

```sh
conda create -n myenv python=3.9 scipy=0.17.3 astroid babel
```

## 使用 environment.yml 创建环境

命令:

```sh
conda env create -f environment.yml
```

`environment.yml` 文件的第一行为环境名称

激活新环境: `conda activate myenv`

## 更新环境

当修改了 `environment.yml` ，想要更新环境，运行以下命令：

```sh
conda env update --file environment.yml --prune
```

`--prune` 选项使 `conda` 删除环境中不再需要的任何依赖项。

## 克隆环境

`myclone` 为新环境的名称，`myenv` 为要克隆环境的名称

```sh
conda create --name myclone --clone myenv
```

## 查看环境

```sh
conda info --envs
# 或
conda env list
```

## 查看环境安装的包

环境未激活:

```sh
conda list -n myenv
```

环境激活了:

```sh
conda list
```

在指定环境查看是否安装了指定包:

```sh
conda list -n myenv scipy
```

## 导出环境

### 导出 environment.yml

首先要激活环境，然后运行下面的命令：

```sh
conda env export > environment.yml
```

如果已经有 `environment.yml` ，则会被覆盖

`export >` 后面的文件名可以随便取的，但是按照规范还是填 `environment.yml`

不导出 `environment.yml`，在终端打印出 `environment.yml`：

```sh
conda env export
```

> 这里的导出会导出所有的包，包括指定的包和这些包的依赖

### 只导出指定安装的包

只导出指定安装的包的信息，不导出其相关依赖的包

```sh
conda env export --from-history > environment.yml
```

结果：

```txt
(env-name) ➜  ~ conda env export --from-history
name: env-name
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.7
  - codecov
prefix: /Users/username/anaconda3/envs/env-name
```

### 手工创建 `environment.yml`

例子：

```yml
name: stats2
channels:
  - javascript
dependencies:
  - python=3.9
  - bokeh=2.4.2
  - conda-forge::numpy=1.21.*
  - nodejs=16.13.*
  - flask
  - pip
  - pip:
    - Flask-Testing
```

## 移除环境

```sh
conda remove --name myenv --all
# 或
conda env remove --name myenv
```

如果使用 `conda remove --name myenv --all` 的话，运行命令后会询问 `Everything found within the environment, including any conda environment configurations and any non-conda files, will be deleted. Do you wish to continue?`  
这时输入 `y` 会将环境删除掉，输入 `n` 会保留环境，只会删除包。
