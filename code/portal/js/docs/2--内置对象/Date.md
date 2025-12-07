# Date

Date 是 JavaScript 中处理日期和时间的内置对象，它提供了丰富的方法来创建、操作和格式化日期。

## 1. 创建 Date 对象

```javascript
// 1. 当前日期和时间
const now = new Date();

// 2. 指定日期时间
const date1 = new Date('2024-12-03');
const date2 = new Date('December 3, 2024 10:30:00');
const date3 = new Date(2024, 11, 3); // 注意：月份从0开始，11表示12月
const date4 = new Date(2024, 11, 3, 10, 30, 0);

// 3. 使用时间戳（毫秒数，从1970-01-01开始）
const timestamp = new Date(1733174400000);
```

## 2. 常用获取方法

```javascript
const date = new Date();

// 获取时间组成部分
date.getFullYear();    // 年份（4位数）
date.getMonth();       // 月份（0-11）
date.getDate();        // 日期（1-31）
date.getDay();         // 星期几（0-6，0=周日）
date.getHours();       // 小时（0-23）
date.getMinutes();     // 分钟（0-59）
date.getSeconds();     // 秒数（0-59）
date.getMilliseconds();// 毫秒（0-999）
date.getTime();        // 时间戳（毫秒数）

// UTC 版本（协调世界时）
date.getUTCFullYear();
date.getUTCHours();
```

## 3. 常用设置方法

```javascript
const date = new Date();

date.setFullYear(2025);
date.setMonth(5);      // 6月
date.setDate(15);
date.setHours(14);
date.setMinutes(30);
date.setSeconds(0);
date.setTime(1733174400000);
```

## 4. 日期格式化

```javascript
const date = new Date();

date.toString();           // Tue Dec 03 2024 10:30:00 GMT+0800
date.toDateString();       // Tue Dec 03 2024
date.toTimeString();       // 10:30:00 GMT+0800
date.toLocaleString();     // 2024/12/3 10:30:00（根据本地格式）
date.toLocaleDateString(); // 2024/12/3
date.toLocaleTimeString(); // 10:30:00
date.toISOString();        // 2024-12-03T02:30:00.000Z（ISO格式）
date.toUTCString();        // Tue, 03 Dec 2024 02:30:00 GMT
```

## 5. 实用技巧和示例

```javascript
// 计算日期差
const date1 = new Date('2024-12-01');
const date2 = new Date('2024-12-10');
const diffTime = Math.abs(date2 - date1); // 毫秒差
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 天数差

// 添加天数
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// 格式化日期（自定义）
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

// 获取本周第一天（周一）
function getFirstDayOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}
```

## 6. 静态方法

```javascript
// 获取当前时间戳
Date.now();          // 1733174400000（毫秒数）
Date.parse('2024-12-03'); // 解析字符串返回时间戳
Date.UTC(2024, 11, 3);    // 返回UTC时间戳
```

## 7. 注意事项

1. **月份从0开始**：0 = 1月，11 = 12月
2. **时区问题**：JavaScript 使用浏览器的时区，使用 UTC 方法可避免时区问题
3. **日期解析**：不同浏览器对字符串的解析可能不同，建议使用明确的格式
4. **性能**：频繁创建 Date 对象可能影响性能，考虑复用对象
5. **不可变性**：Date 对象是可变的，操作时会修改原对象
