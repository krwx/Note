# markdown

markdown 库能够将 Markdown 格式的文本转换为 HTML 格式。它支持多种扩展，可以增强 Markdown 的功能。

## 安装

可以使用 pip 安装 markdown 库：

```bash
pip install markdown
```

## 基本用法

下面是一个简单的示例，展示如何使用 markdown 库将 Markdown 文本转换为 HTML：

```python
import markdown

md_text = """
# 标题

这是一个段落。
"""

extensions = [
    'markdown.extensions.extra',  # 启用额外的扩展
    'markdown.extensions.codehilite',  # 代码高亮
    'markdown.extensions.toc',  # 目录生成
    'markdown.extensions.tables'  # 表格支持
]
html_content = markdown.markdown(md_text, extensions=extensions)
print(html_content)
```

注意：

- markdown 文件的列表的缩进（空格）不能为 2 的倍数，需要为 4 的倍数。如果为 2 的倍数，那么转换出来的 HTML 的列表的层级会有问题
