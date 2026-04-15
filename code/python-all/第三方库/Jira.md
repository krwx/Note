# Jira

- [Jira](#jira)
  - [安装](#安装)
  - [Quickstart](#quickstart)
    - [初始化](#初始化)
    - [token 验证](#token-验证)
  - [API](#api)
    - [JIRA 类](#jira-类)
      - [`__init__()`](#__init__)
      - [current\_user()](#current_user)
      - [search\_users()](#search_users)
      - [search\_issue()](#search_issue)
      - [create\_issue()](#create_issue)
      - [add\_attachment()](#add_attachment)
        - [添加临时 excel 文件作为附件](#添加临时-excel-文件作为附件)

## 安装

`conda install jira`

## Quickstart

### 初始化

```py
from jira import JIRA
jira = JIRA()
# 设置服务器地址
jira = JIRA('https://jira.atlassian.com')
```

### token 验证

传递 `token_auth` 参数

```py
jira = JIRA(server=jira_url, token_auth=token)
```

## API

### JIRA 类

#### `__init__()`

参数：

- server
  - 可选。字符串
  - 服务器地址。默认值：<http://localhost:2990/jira>.
- token_auth
  - 可选。字符串
  - 授权的 token 字符串
- max_retries
  - int
  - 设置客户端发起的HTTP会话的重试次数。默认值为 3

#### current_user()

语法：`current_user(field: str | None = None) → str[source]`

如果在 Jira Colud 系统的话返回 accountId，不然的话返回当前用户的用户名。

```py
print(jira.current_user())
```

#### search_users()

作用：搜索用户

语法：`search_users(user: str | None = None, startAt: int = 0, maxResults: int = 50, includeActive: bool = True, includeInactive: bool = False, query: str | None = None) → ResultList[User]`

- `user`
  - 用户名、显示名称或电子邮件地址的一部分。
- `startAt`
  - 从哪个索引开始返回用户列表。默认值为 0。
- `maxResults`
  - 返回的用户数量。默认值为 50。
- `includeActive`
  - 是否包含活动用户。默认值为 True。
- `includeInactive`
  - 是否包含非活动用户。默认值为 False。

注意事项：

- `maxResults` 设置超过 100 的值，最终结果也只返回 100 条数据。如果想要的结果不在这 100 条数据，只能收窄搜索条件
- `startAt` 也只能设置在 100 以内，超过 100 会搜索不到数据

例子：

```py
result = jira.search_users(user='someone')
```

#### search_issue()

- max_result
  - 默认值为 50，即一次最多返回 50 条结果
  - 如果设置为 0 或 False，那么会返回所有的结果
  - 如果只需要知道 ticket 的 total，那么可以设置 max_result 为 1，只返回 1 条数据，然后读取返回结果的 total

#### create_issue()

创建一条 Issue 并返回 Issue 回来

语法：`create_issue(fields: dict[str, Any] | None = None, prefetch: bool = True, **fieldargs) → Issue`

参数：

- fields
  - 包含字段名和要使用的值的字典。
  - 如果存在，所有其他 keyword argument 都将被忽略。如果不存在，那么通过 keyword argument 指定字段名和值
- prefetch
  - True 会重新加载创建的问题资源，使其所有数据都出现在返回的值中
  - 默认为 True

例子：

```py
from jira import JIRA

jira = JIRA('https://jira.atlassian.com')

issue_dict = {
  "project":
  {
     "key": "TEST"
  },
  "summary": "REST ye merry gentlemen.",
  "description": "Creating of an issue",
  "components": [{"name": "Support"}, {'id': '10000'}]
}
new_issue = jira.create_issue(fields=issue_dict)
```

#### add_attachment()

语法：`add_attachment(issue: str | int, attachment: str | BufferedReader, filename: str | None = None) → Attachment`

将附件添加到 issue 并返回附件资源

客户端不会打开或验证附件。

参数:

- issue (`Union[str, int]`)
  - 添加附件的 issue
- attachment (`Union[str,BufferedReader]`)
  - 要附加到问题的类文件对象
  - 如果它是一个带有文件名的字符串，也可以使用。
- filename (`str`)
  - 附件的可选名称。
  - 如果省略，则使用文件对象的 `name` 属性。
  - 如果您通过 `open()` 以外的任何其他方法获取了类文件对象，请确保以某种方式指定了名称。

##### 添加临时 excel 文件作为附件

步骤说明：

1. 创建 Excel 文件：使用 Openpyxl 生成 `Workbook` 并填充数据。
2. 保存到内存缓冲区：将 `Workbook` 内容保存到 `BytesIO` 对象，避免临时文件。
3. 重置缓冲区指针：确保读取内容时从起始位置开始。
4. 上传附件：通过 Jira 的 `add_attachment` 方法将缓冲区内容作为附件上传。

关键点解释：

- 内存缓冲区处理：使用 `BytesIO` 避免生成临时文件，提升效率并简化代码。
- 指针重置：`wb.save()` 后缓冲区指针位于末尾，需通过 `seek(0)` 重置到开头，确保正确读取数据。
- 附件上传：`add_attachment` 接受文件对象（如 `BytesIO` ）和文件名，自动处理内容上传。

代码：

```py
from jira import JIRA
from openpyxl import Workbook
from io import BytesIO

# 连接到Jira服务器
jira = JIRA(
    server='https://your-jira-server.com',
    basic_auth=('your_username', 'your_password')
)

# 创建Openpyxl Workbook并添加数据
wb = Workbook()
ws = wb.active
ws['A1'] = '示例数据'

# 将Workbook保存到内存中的BytesIO对象
excel_buffer = BytesIO()
wb.save(excel_buffer)
excel_buffer.seek(0)  # 关键步骤：将指针重置到缓冲区开头

# 获取目标Jira工单并添加附件
issue_key = 'PROJECT-123'  # 替换为实际工单KEY
issue = jira.issue(issue_key)

# 上传附件
jira.add_attachment(
    issue=issue,
    attachment=excel_buffer,
    filename='example.xlsx'
)

# 可选：关闭缓冲区（非必需，但显式关闭更规范）
excel_buffer.close()
```
