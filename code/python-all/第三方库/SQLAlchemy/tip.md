# tip

## SQL Server

- 如果表没有设置了 IDENTITY 的列，那么插入数据时会报错

## other

SQLAlchemy 会话（Session）管理
在 SQLAlchemy 中，会话（Session）管理着与数据库的交互。当你调用 session.commit() 后，所有的更改（包括 update）才会被提交到数据库，并被永久保存。在此之前，更改只是在内存中的会话对象上进行的，对其他会话或未提交的事务是不可见的。

例如：

```py
from sqlalchemy.orm import sessionmaker
from yourapplication import YourModel, engine
 
Session = sessionmaker(bind=engine)
session = Session()
 
# 更新操作
session.query(YourModel).filter_by(id=1).update({"column_name": "new_value"})
session.commit()  # 提交更改到数据库
 
# 查询操作
result = session.query(YourModel).filter_by(id=1).first()
print(result.column_name)  # 这里将显示 "new_value"
```

## enum

问题：sql slchemy 用了枚举做 map，然后现在数据有 "Query" ，但是它查询数据时，需要数据为 "QUERY"。枚举的名称为 "QUERY"，值为 "Query"

在使用SQLAlchemy时，若将字段类型定义为枚举，默认情况下存储的是枚举成员的名称（name属性）。例如，若定义枚举Status(Enum)包含PENDING = 1和DONE = 2，插入数据时数据库会存储字符串'PENDING'或'DONE'，而非数值 1或 2。
