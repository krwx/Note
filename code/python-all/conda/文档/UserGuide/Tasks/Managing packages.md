# Managing packages

- [Managing packages](#managing-packages)
  - [查找包](#查找包)
  - [安装包](#安装包)
  - [更新包](#更新包)
  - [移除包](#移除包)

管理包/依赖

## 查找包

查找 scipy 包

```sh
conda search scipy
```

看 Anaconda.org 是否有 scipy 包

```sh
conda search --override-channels --channel defaults scipy
```

看指定 channel 是否有 scipy 包

```sh
conda search --override-channels --channel http://conda.anaconda.org/mutirri scipy
```

## 安装包

到 myenv 环境安装 scipy 包

```sh
conda install --name myenv scipy
```

安装 scipy 包**到当前环境**

```sh
conda install scipy
```

安装特定版本的 scipy 包

```sh
conda install scipy=0.15.0
```

同时安装多个包，空格隔开，这里以下载 scipy 和 curl 包为例

```sh
conda install scipy curl
# 同时指定版本
conda install scipy=0.15.0 curl=7.26.0
```

## 更新包

更新指定包:

```sh
conda update biopython
```

更新 Python:

```sh
conda update python
```

更新 conda:

```sh
conda update conda
```

## 移除包

移除指定环境的指定包:

```sh
conda remove -n myenv scipy
```

移除当前环境的指定包:

```sh
conda remove scipy
```

同时移除多个包，例如同时移除 SciPy 和 cURL:

```sh
conda remove scipy curl
```
