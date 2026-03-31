# window.performance

- [window.performance](#windowperformance)
  - [主要属性和方法](#主要属性和方法)
    - [1. **performance.timing**（已废弃但常用）](#1-performancetiming已废弃但常用)
    - [2. **performance.now()**](#2-performancenow)
    - [3. **performance.getEntries()**](#3-performancegetentries)
    - [4. **performance.mark() 和 performance.measure()**](#4-performancemark-和-performancemeasure)
    - [5. **performance.memory**（Chrome 独有）](#5-performancememorychrome-独有)
  - [实际应用示例](#实际应用示例)
    - [页面性能监控](#页面性能监控)
    - [性能优化监控](#性能优化监控)
  - [现代替代方案](#现代替代方案)
  - [常用性能指标计算](#常用性能指标计算)
  - [注意事项](#注意事项)

`window.performance` 是 Web API 的一部分，它提供了精确测量网页和 Web 应用性能的方法。以下是详细介绍：

## 主要属性和方法

### 1. **performance.timing**（已废弃但常用）

包含页面加载各个阶段的时间戳：

```javascript
const timing = performance.timing;

// 常用时间点
const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
const networkLatency = timing.responseStart - timing.navigationStart;
```

### 2. **performance.now()**

高精度时间戳（精度达微秒），用于测量代码执行时间：

```javascript
const start = performance.now();
// 执行代码
const end = performance.now();
console.log(`执行耗时：${end - start} 毫秒`);
```

### 3. **performance.getEntries()**

获取所有性能条目：

```javascript
// 获取所有资源加载信息
const entries = performance.getEntries();

// 按类型筛选
const scriptEntries = performance.getEntriesByType('resource')
  .filter(entry => entry.initiatorType === 'script');
```

### 4. **performance.mark() 和 performance.measure()**

自定义标记和测量：

```javascript
// 创建标记
performance.mark('startTask');
// 执行任务
performance.mark('endTask');

// 测量两个标记间的时间
performance.measure('taskDuration', 'startTask', 'endTask');

// 获取测量结果
const measures = performance.getEntriesByName('taskDuration');
console.log(measures[0].duration);
```

### 5. **performance.memory**（Chrome 独有）

获取内存使用情况：

```javascript
if (performance.memory) {
  console.log({
    usedJSHeapSize: performance.memory.usedJSHeapSize / 1048576 + ' MB',
    totalJSHeapSize: performance.memory.totalJSHeapSize / 1048576 + ' MB',
    jsHeapSizeLimit: performance.memory.jsHeapSizeLimit / 1048576 + ' MB'
  });
}
```

## 实际应用示例

### 页面性能监控

```javascript
class PerformanceMonitor {
  static getNavigationTiming() {
    const [navigation] = performance.getEntriesByType('navigation');
    if (navigation) {
      return {
        // DNS 查询时间
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        // TCP 连接时间
        tcp: navigation.connectEnd - navigation.connectStart,
        // 请求响应时间
        response: navigation.responseEnd - navigation.requestStart,
        // DOM 解析时间
        domParse: navigation.domComplete - navigation.domInteractive,
        // 页面完全加载时间
        load: navigation.loadEventEnd - navigation.loadEventStart,
        // 总加载时间
        total: navigation.loadEventEnd - navigation.startTime
      };
    }
    return null;
  }

  static getResourceTiming() {
    return performance.getEntriesByType('resource').map(resource => ({
      name: resource.name,
      type: resource.initiatorType,
      duration: resource.duration,
      size: resource.transferSize,
      startTime: resource.startTime
    }));
  }
}
```

### 性能优化监控

```javascript
// 监控长任务
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) { // 超过50ms的任务
        console.warn('长任务 detected:', entry);
      }
    }
  });
  
  observer.observe({ entryTypes: ['longtask'] });
}

// 监控布局偏移（CLS）
if ('PerformanceObserver' in window) {
  let clsValue = 0;
  
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
  });
  
  observer.observe({ type: 'layout-shift', buffered: true });
}
```

## 现代替代方案

虽然 `performance.timing` 已废弃，推荐使用：

```javascript
// 获取导航信息
const navigationEntry = performance.getEntriesByType('navigation')[0];

// 获取绘制时间
const paintEntries = performance.getEntriesByType('paint');
const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
const firstContentfulPaint = paintEntries.find(
  entry => entry.name === 'first-contentful-paint'
);

// 使用 PerformanceObserver（推荐）
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(`${entry.name}: ${entry.startTime}`);
  });
});

// 监听不同类型
observer.observe({
  entryTypes: [
    'navigation',      // 导航
    'resource',        // 资源
    'paint',          // 绘制
    'largest-contentful-paint', // LCP
    'layout-shift'    // 布局偏移
  ]
});
```

## 常用性能指标计算

```javascript
function getPerformanceMetrics() {
  const navigation = performance.getEntriesByType('navigation')[0];
  const paint = performance.getEntriesByType('paint');
  
  return {
    // 核心 Web Vitals
    LCP: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime,
    FID: performance.getEntriesByName('first-input')[0]?.processingStart,
    CLS: performance.getEntriesByType('layout-shift')
      .filter(entry => !entry.hadRecentInput)
      .reduce((sum, entry) => sum + entry.value, 0),
    
    // 传统指标
    TTFB: navigation.responseStart - navigation.requestStart,
    FCP: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
    DOMContentLoaded: navigation.domContentLoadedEventEnd,
    Load: navigation.loadEventEnd
  };
}
```

## 注意事项

1. **兼容性**：部分 API 需要现代浏览器支持
2. **跨域资源**：需要正确设置 Timing-Allow-Origin 头
3. **隐私模式**：某些浏览器在隐私模式下可能限制某些 API
4. **数据量**：`getEntries()` 可能返回大量数据，注意处理性能

`window.performance` 是前端性能监控的核心工具，正确使用可以帮助你深入了解应用性能瓶颈。
