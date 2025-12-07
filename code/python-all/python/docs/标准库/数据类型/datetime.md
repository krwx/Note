# datetime

基本日期和时间类型

- [datetime](#datetime)
  - [包含的类](#包含的类)
  - [感知型对象和简单型对象](#感知型对象和简单型对象)
  - [timedelta 类对象](#timedelta-类对象)
  - [datetime 对象](#datetime-对象)
    - [运算](#运算)
    - [datetime.today()](#datetimetoday)
    - [datetime.now(tz=None)](#datetimenowtznone)
    - [datetime.utcnow()](#datetimeutcnow)
    - [datetime.strptime(date\_string, format)](#datetimestrptimedate_string-format)
    - [datetime.strftime(format)](#datetimestrftimeformat)

## 包含的类

- `class datetime.date`
  - 一个理想化的**简单型日期**，它假设当今的公历在过去和未来永远有效。
  - 属性: `year, month, and day`。
- `class datetime.time`
  - 一个独立于任何特定日期的**理想化时间**，它假设每一天都恰好等于 24*60*60 秒。 （这里没有“闰秒”的概念。）
  - 包含属性: `hour, minute, second, microsecond 和 tzinfo`。
- `class datetime.datetime`
  - **日期和时间的结合**。
  - 属性：`year, month, day, hour, minute, second, microsecond, and tzinfo`.
- `class datetime.timedelta`
  - 将两个 `datetime` 或 `date` 实例之间的**差值**表示为微秒级精度的持续时间。
- `class datetime.tzinfo`
  - 一个描述时区信息对象的抽象基类。 用来给 datetime 和 time 类提供自定义的时间调整概念（例如处理时区和/或夏令时）。
- `class datetime.timezone`
  - 一个实现了 tzinfo 抽象基类的子类，用于表示相对于 世界标准时间（UTC）的偏移量。

子类关系：

```txt
object
    timedelta
    tzinfo
        timezone
    time
    date
        datetime
```

## 感知型对象和简单型对象

`datetime` 和 `time` 对象可以根据它们**是否包含时区信息**（`tzinfo`）而分为“感知型”和“简单型”两类。

具体规则：

- date 类型的对象都是**简单型**的。
- time 或 datetime 类型的对象可以是**感知型或者简单型**。
- 一个 `datetime` 对象 d 在以下条件同时成立时将是感知型的：
  - `d.tzinfo` 不为 None
  - `d.tzinfo.utcoffset(d)` 不返回 None
- 在其他情况下，d 将是简单型的。
- 一个 time 对象 t 在以下条件同时成立时将是感知型的：
  - `t.tzinfo` 不为 None
  - `t.tzinfo.utcoffset(None)` 不返回 None。
- 在其他情况下，t 将是简单型的。

## timedelta 类对象

`timedelta` 对象表示一段持续的时间，即两个 `datetime` 或 `date` 实例之间的差值。

构造器 ：

`class datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)`

所有参数都是可选的并且默认为 0。 这些参数可以是整数或者浮点数，并可以为正值或者负值。

**只有 `days, seconds` 和 `microseconds` 会存储在内部**。 参数单位的换算规则如下：

- 1毫秒会转换成1000微秒。
- 1分钟会转换成60秒。
- 1小时会转换成3600秒。
- 1星期会转换成7天。

```py
from datetime import timedelta
delta = timedelta(
    days=50,
    seconds=27,
    microseconds=10,
    milliseconds=29000,
    minutes=5,
    hours=8,
    weeks=2
)
print(delta)
# 只保留日期、秒和微秒，其他单位进行换算
# datetime.timedelta(days=64, seconds=29156, microseconds=10)
```

## datetime 对象

`datetime` 对象是包含来自 `date` 对象和 `time` 对象的所有信息的单一对象。

构造器 ：

`class datetime.datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)`

year, month 和 day 参数是必须的。 tzinfo 可以是 None 或者是一个 tzinfo 子类的实例。 其余的参数必须是在下面范围内的整数：

- MINYEAR <= year <= MAXYEAR,
- 1 <= month <= 12,
- 1 <= day <= 指定年月的天数,
- 0 <= hour < 24,
- 0 <= minute < 60,
- 0 <= second < 60,
- 0 <= microsecond < 1000000,
- fold in [0, 1].

```py
from datetime import datetime

temp_date = datetime(2025, 3, 2)
```

### 运算

比较大小：可以使用 `<、>、<=、>=、==` 和 `!=` 等比较运算符来比较两个 datetime 对象。

```py
start_time = datetime.now(timezone.utc)
time.sleep(10)
end_time = datetime.now(timezone.utc)
print(start_time)
print(end_time)
print(start_time > end_time) # False
print(end_time > start_time) # True
```

- `timedelta = datetime1 - datetime2`
  - 适用范围
    - 从一个 `datetime` 减去一个 `datetime` 仅适用于两个操作数**均为简单型**或**均为有定义 `tzinfo` 的感知型**。
    - 如果一个是感知型而另一个是简单型，则会引发 `TypeError`。
  - 运算结果说明
    - 如果两个操作数都是简单型，或都是感知型并且具有相同的 `tzinfo` 属性时， `timedelta` 为 `datetime1 - datetime2`
    - 如果两者均为感知型但具有不同的 `tzinfo` 属性，`a-b` 相当于 `a` 和 `b` 首先被转换为简单型 `UTC` 日期时间，然后计算，结果为 `(a.replace(tzinfo=None) - a.utcoffset()) - (b.replace(tzinfo=None) - b.utcoffset())`
  - 解决 datetime 一个是感知型而另一个是简单型的问题
    1. 将所有 `datetime` 对象转换为不带时区的（即本地时间）  

       如果你不需要考虑时区信息，可以将所有 `datetime` 对象转换为本地时间（不带时区信息）。这可以通过使用 `datetime.astimezone(None)` 或者简单地使用 `datetime.replace(tzinfo=None)` 来实现：

        ```py
        from datetime import datetime

        # 假设我们有两个datetime对象
        dt_aware = datetime(2023, 4, 1, 12, 0, tzinfo=timezone.utc)
        dt_naive = datetime(2023, 4, 1, 12, 0)

        # 将偏移量感知的datetime转换为不带时区的
        dt_aware_naive = dt_aware.astimezone(None)

        # 现在可以比较它们
        print(dt_aware_naive == dt_naive)  # 输出 True
        ```

    2. 将所有 `datetime` 对象转换为带时区的（即使用同一个时区）
      如果你需要保持时区信息，确保所有比较的 `datetime` 对象都使用相同的时区：

        ```py
        from datetime import datetime, timezone

        # 假设我们有两个datetime对象
        dt_aware = datetime(2023, 4, 1, 12, 0, tzinfo=timezone.utc)
        dt_naive = datetime(2023, 4, 1, 12, 0)

        # 将不带时区的datetime转换为UTC时区
        dt_naive_aware = dt_naive.replace(tzinfo=timezone.utc)

        # 现在可以比较它们
        print(dt_aware == dt_naive_aware)  # 输出 True
        ```

### datetime.today()

返回表示当前地方时的 date 和 time，其中 tzinfo 为 None。

此方法的功能等价于 `now()`，但是不带 tz 形参。

### datetime.now(tz=None)

返回表示当前地方时的 `date` 和 `time` 对象。

- 如果可选参数 `tz` 为 None 或未指定，这就类似于 `today()`，但该方法会在可能的情况下提供比通过 `time.time()` 时间戳所获时间值更高的精度。
- 如果 `tz` 不为 None，它必须是 `tzinfo` 子类的一个实例，并且当前日期和时间将被转换到 tz 时区。
- 此函数可以替代 `today()` 和 `utcnow()`。

替代 `utcnow()`：

```py
from datetime import datetime, timezone

now_time = datetime.now(timezone.utc)
```

### datetime.utcnow()

返回表示当前 UTC 时间的 date 和 time，其中 tzinfo 为 None。

自 3.12 版本弃用: 请用带 `UTC` 的 `datetime.now()` 代替。

```py
datetime.now(datetime.timezone.utc)
```

### datetime.strptime(date_string, format)

返回一个对应于 `date_string`，根据 `format` 进行解析得到的 `datetime` 对象。

```py
dt = datetime.strptime("21/11/06 16:30", "%d/%m/%y %H:%M")
```

### datetime.strftime(format)

返回一个由显式格式字符串（format）所控制的，代表日期和时间的字符串。

```py
dt = datetime.strptime("21/11/06 16:30", "%d/%m/%y %H:%M")
dt.strftime("%A, %d. %B %Y %I:%M%p")
# output: 'Tuesday, 21. November 2006 04:30PM'

actual_time.strftime('%Y%m%d%H%M%S')
```
