# Managing channels

- [Managing channels](#managing-channels)
  - [介绍 channel](#介绍-channel)
  - [Conda Channel Priority 详解](#conda-channel-priority-详解)
    - [1. **`strict`（严格优先级）**](#1-strict严格优先级)
    - [2. **`flexible`（灵活优先级）**](#2-flexible灵活优先级)
    - [3. **`disabled`（禁用优先级）**](#3-disabled禁用优先级)
    - [最佳实践与注意事项](#最佳实践与注意事项)
  - [查看 channel](#查看-channel)
  - [添加 channel](#添加-channel)
  - [删除 channel](#删除-channel)

## 介绍 channel

- Conda channel 是存储包裹的位置。
- 它们是托管和管理包的基础。
- Conda 包是从远程通道下载的，这些通道是包含 Conda 包目录的 URL 。
- conda 命令搜索一组默认通道，包会自动从默认通道下载和更新。

## Conda Channel Priority 详解

在 Conda 中，**channel priority（通道优先级）** 决定了当多个 channel 提供同名软件包时，Conda 如何选择安装来源。

优先级通过 `channel_priority` 配置项控制，它有三种模式：`strict`（默认）、`flexible` 和 `disabled`。以下是各模式的作用及区别：

### 1. **`strict`（严格优先级）**  

- **行为**：  
  - 严格按照 `.condarc` 中 `channels` 列表的顺序搜索包（从上到优先级降低）。  
  - 当高优先级 channel 存在某个包时，**即使低优先级 channel 有高版本**，Conda 也优先选择高优先级 channel 的包。  
- **优点**：  
  - 确保环境稳定性，避免混合不同 channel 的包导致的依赖冲突。  
  - 官方推荐模式，尤其适合生产环境。  
- **缺点**：  
  - 可能无法自动安装最新版本包（需手动指定 channel）。  
- **示例配置**（`.condarc`）:  

     ```yaml
     channel_priority: strict
     channels:
       - conda-forge  # 最高优先级
       - defaults     # 次优先级
     ```

---

### 2. **`flexible`（灵活优先级）**  

- **行为**：  
  - 优先考虑包的**版本新旧**而非 channel 顺序。  
  - 若多个 channel 有同名包，Conda 会选择**版本最高**的包（无论 channel 优先级）。  
  - 仅当版本相同时，才按 channel 顺序选择。  
- **优点**：  
  - 更容易获取最新版本包。  
- **缺点**：  
  - **高风险**！混合不同 channel 的包可能导致依赖冲突（如 `conda-forge` 和 `defaults` 的二进制兼容性问题）。  
  - 已**被官方弃用**（Conda ≥4.6 后不推荐使用）。  
- **警告**：  
  - 仅建议临时解决依赖问题，长期使用可能导致环境损坏。

### 3. **`disabled`（禁用优先级）**  

- **行为**：  
  - 完全忽略 channel 顺序，**平等对待所有 channel**。  
  - Conda 会选择**所有 channel 中版本最高的包**（等同于 `flexible`，但无版本相同时的回退机制）。  
- **缺点**：  
  - **极高风险**！极易引发依赖冲突和环境崩溃。  
  - 官方强烈不推荐，仅用于调试或特殊场景。  
- **使用场景**：  
  - 临时覆盖某个包的特定版本（需谨慎）。

### 最佳实践与注意事项

1. **默认使用 `strict` 模式**：  
   - 确保环境稳定，避免依赖冲突。这是 Conda 的默认设置。

   ```bash
   conda config --set channel_priority strict
   ```

2. **合理排序 channel**：  
   - 将最信任的 channel 放在顶部（如优先 `conda-forge` 再 `defaults`）：  

     ```yaml
     channels:
       - conda-forge
       - defaults
     ```

3. **避免混合 `defaults` 和 `conda-forge`**：  
   - 二者二进制兼容性不佳，`strict` 模式可减少冲突。

4. **查看当前配置**：  

   ```bash
   conda config --show channel_priority
   ```

## 查看 channel

```sh
conda config --show channels
```

## 添加 channel

添加 channel ，并给予它最高的优先级：

```sh
conda config --add channels new_channel
# 或
conda config --prepend channels new_channel
```

添加 channel ，并给予它最低的优先级：

```sh
conda config --append channels new_channel
```

## 删除 channel

```sh
conda config --remove channels CHANNEL
```
