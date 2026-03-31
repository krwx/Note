# sqlalchemy

connection.py

```py
import os.path
from configparser import ConfigParser

from sqlalchemy import create_engine

config = ConfigParser()
config_path = os.path.dirname(__file__)
config.read(os.path.join(config_path,"db_config.ini"))
mysql = config['mysql']

engine = create_engine(f'mysql+pymysql://{mysql["username"]}:{mysql["password"]}@{mysql["server"]}/{mysql["database"]}',
                       echo=False, future=True, pool_size=10, max_overflow=5, pool_pre_ping=True)
```

model.py or mapper.py

```py
from datetime import date, datetime

from sqlalchemy import Boolean, CHAR, DATE, DATETIME, ForeignKey, INTEGER, String, TEXT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    name: Mapped[str] = mapped_column(String(50))
    someId: Mapped[int] = mapped_column(ForeignKey('some_table.id'))
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    percentage: Mapped[float]
    dateEffective: Mapped[date]
    someDate: Mapped[someEnum]
    created_at: Mapped[datetime] = mapped_column(DATETIME, default=datetime.utcnow)

    task = relationship("Task", back_populates="worker")

    def __repr__(self):
        return f"User(id={self.id}, name='{self.name}', email='{self.email}', is_active={self.is_active}, created_at={self.created_at})"
```

dao.py

```py
from sqlalchemy import select, insert,update,Integer,String,Float,Date,Table, MetaData,and_,or_
from sqlalchemy.orm import Session

from connection import engine
from model import User


def select_all_users():
    with Session(engine) as session:
        return session.query(User).all()
        return session.scalar(select(User).filter_by(id=1, active="Y"))


def some_select():
    with Session(engine) as session:
        user = session.query(User).filter_by(id=1).first()

def insert_user(name, email):
    with Session(engine) as session:
        new_user = User(name=name, email=email)
        session.add(new_user)
        session.flush()
        session.commit()
        return new_user

def update_user(user_id, name=None, email=None):
    with Session(engine) as session:
        user = session.scalar(select(User).filter_by(id=user_id))
        if user:
            if name:
                user.name = name
            if email:
                user.email = email
            session.commit()

def update_by_statement(user_id, name=None, email=None):
    with Session(engine) as session:
        stmt = update(User).where(User.id == user_id)
        if name:
            stmt = stmt.values(name=name)
        if email:
            stmt = stmt.values(email=email)
        session.execute(stmt)
        session.commit()
```

insert dataframe into table

```py
user_table = Table('user', MetaData(), autoload_with=engine)

def insert_dataframe(df):
    with engine.connect() as conn:
        conn.execute(user_table.insert(), df.to_dict(orient='records'))
        conn.commit()
```
