- [摘要](#摘要)
- [自定义 Hook：组件间共享逻辑](#自定义-hook组件间共享逻辑)
  - [例子](#例子)
  - [Hook 的名称必须永远以 use 开头](#hook-的名称必须永远以-use-开头)
  - [自定义 Hook 共享的是状态逻辑，而不是状态本身](#自定义-hook-共享的是状态逻辑而不是状态本身)
- [在 Hook 之间传递响应值](#在-hook-之间传递响应值)
  - [把事件处理函数传到自定义 Hook 中](#把事件处理函数传到自定义-hook-中)
- [例子](#例子-1)
  - [传递值](#传递值)
  - [自定义 hook 保存之前的 state](#自定义-hook-保存之前的-state)

# 摘要
- 自定义 Hook 让你可以在组件间共享逻辑。
- 自定义 Hook 命名必须以后跟一个大写字母的 use 开头。
- 自定义 Hook 共享的只是状态逻辑，不是状态本身。
- 你可以将响应值从一个 Hook 传到另一个，并且他们会保持最新。
- 每次组件重新渲染时，所有的 Hook 会重新运行。
- 自定义 Hook 的代码应该和组件代码一样保持纯粹。
- 把自定义 Hook 收到的事件处理函数包裹到 Effect Event（useEffectEvent）。
- 不要创建像 useMount 这样的自定义 Hook。保持目标具体化。
- 如何以及在哪里选择代码边界取决于你。

# 自定义 Hook：组件间共享逻辑
## 例子
自定义 hook ，监听网络状态
```jsx
import { useEffect, useState } from "react";

export function useOnlineStatus() {
    const [onlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        const handleOnline = () => {
            setOnlineStatus(true);
        }
        const handleOffline = () => {
            setOnlineStatus(false);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline)
        }
    }, []);
    // 最后返回网络状态的 state
    return onlineStatus;
}
```
使用自定义 hook
```jsx
import React from "react";
import { useOnlineStatus } from "./useOnlineStatus";

const StatusBar = () => {
    const onlineStatus = useOnlineStatus();
    return (
        <>
            {onlineStatus ? "Connected" : "Disconnected"}
        </>
    )
}

export default StatusBar;
```

## Hook 的名称必须永远以 use 开头 
公约：
1. **React 组件名称必须以大写字母开头**，比如 StatusBar 和 SaveButton。React 组件还需要返回一些 React 能够显示的内容，比如一段 JSX。
2. **Hook 的名称必须以 use 开头，然后紧跟一个大写字母**，就像内置的 useState 或者本文早前的自定义 useOnlineStatus 一样。Hook 可以返回任意值。

## 自定义 Hook 共享的是状态逻辑，而不是状态本身 
自定义 Hook 共享的只是状态逻辑而不是状态本身。对 Hook 的每个调用完全独立于对同一个 Hook 的其他调用。

以上面的例子为例，如果有两个组件通过 useOnlineStatus() 获取网络状态。这两个组件获取的 state 是不一样的，对应的 useEffect 过程也是不一样的

# 在 Hook 之间传递响应值 
**每当组件重新渲染，自定义 Hook 中的代码就会重新运行**。这就是组件和自定义 Hook 都 需要是纯函数 的原因。我们应该把自定义 Hook 的代码看作组件主体的一部分。

## 把事件处理函数传到自定义 Hook 中 
如果自定义 hook 接收函数作为参数，那么将函数通过 `useEffectEvent` 进行包装

```jsx
import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useInterval(callback, delay) {
  // callback 为回调函数，通过 useEffectEvent() 进行包装。这样 useEffect 的依赖就不用了添加 callback
  const onTick = useEffectEvent(callback);
  useEffect(() => {
    const id = setInterval(onTick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

# 例子
## 传递值
useCounter.js
```jsx
import { useState, useEffect } from 'react';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]); // 这里以接收的值为依赖
  return count;
}
```
App.js
```jsx
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
  const [delay, setDelay] = useState(1000);
  const count = useCounter(delay);
  return (
    <>
      <label>
        Tick duration: {delay} ms
        <br />
        <input
          type="range"
          value={delay}
          min="10"
          max="2000"
          onChange={e => setDelay(Number(e.target.value))}
        />
      </label>
      <hr />
      <h1>Ticks: {count}</h1>
    </>
  );
}
```

## 自定义 hook 保存之前的 state
这个例子中，鼠标为一个红点，然后鼠标后面会有4个红点跟着鼠标，这是通过延迟设置坐标实现的。

**保存之前的 state 的原理是：在自定义 hook 里面定义一个 oldState 保存当前的 state，那么当 state 发生变更时，oldState 就是旧的 state 了。**

App.js
```jsx
import { useState, useEffect } from 'react';
import { usePointerPosition } from './usePointerPosition.js';

function useDelayedValue(value, delay) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

function Dot({ position, opacity }) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
```
usePointerPosition.js
```jsx
import { useState, useEffect } from 'react';

export function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return position;
}
```









