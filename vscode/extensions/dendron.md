# dendron

创建文件：按 ctrl + l 然后输入文件名，按下回车，默认会选择 create new note。

- **文件管理器中的“同一层级”**：在磁盘上，Dendron将每个知识库（Vault）中的所有笔记（.md文件）都存放在一个文件夹内，没有子文件夹。这是其简化存储和提升跨笔记链接效率的设计。
- **Dendron中的“层次结构”**：这个结构是通过**特殊的文件名**实现的。例如，文件名 `python.data.structures.list.md` 在Dendron界面中会被自动解析并展示为 `python` > `data` > `structures` > `list` 这样的层级。

在 dendron 的 treeview 查看文件，这里能展示层级结构。

假如想在 `python` > `data` > `structures` 目录下创建一个新的笔记，可以直接创建一个名为 `python.data.structures.newnote.md` 的文件，Dendron 会自动将其显示在正确的层级位置。
