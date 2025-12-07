# Hook

- [Hook](#hook)
  - [概览](#概览)
  - [State Hook](#state-hook)
  - [Context Hook](#context-hook)
  - [Ref Hook](#ref-hook)
  - [Effect Hook](#effect-hook)
  - [性能 Hook](#性能-hook)
  - [自定义 Hook](#自定义-hook)
    - [自定义 hook 读取之前的 state 或 prop](#自定义-hook-读取之前的-state-或-prop)

## 概览

Hook 可以帮助在组件中使用不同的 React 功能。你可以使用内置的 Hook 或使用自定义 Hook。

## State Hook

状态帮助组件 “记住”用户输入的信息。

使用以下 Hook 以向组件添加状态：

- 使用 `useState` 声明可以直接更新的状态变量。
- 使用 `useReducer` 在 `reducer` 函数 中声明带有更新逻辑的 `state` 变量。

## Context Hook

上下文帮助组件 从祖先组件接收信息，而无需将其作为 props 传递。

使用 `useContext` 读取订阅上下文。

## Ref Hook

ref 允许组件 保存一些不用于渲染的信息，比如 DOM 节点或 timeout ID。与状态不同，更新 ref 不会重新渲染组件。ref 是从 React 范例中的“脱围机制”。当需要与非 React 系统如浏览器内置 API 一同工作时，ref 将会非常有用。

- 使用 `useRef` 声明 ref。你可以在其中保存任何值，但最常用于保存 DOM 节点。
- 使用 `useImperativeHandle` 自定义从组件中暴露的 ref，但是很少使用。

## Effect Hook

Effect 允许组件 连接到外部系统并与之同步。这包括处理网络、浏览器、DOM、动画、使用不同 UI 库编写的小部件以及其他非 React 代码。

- 使用 `useEffect` 将组件连接到外部系统。
- `useLayoutEffect` 在浏览器重新绘制屏幕前执行，可以在此处测量布局。

## 性能 Hook

优化重新渲染性能的一种常见方法是跳过不必要的工作。

可以使用以下 Hook 跳过计算和不必要的重新渲染：

- 使用 `useMemo` 缓存计算代价昂贵的计算结果。
- 使用 `useCallback` 将函数传递给优化组件之前缓存函数定义。

使用以下 Hook 处理渲染优先级：

- `useTransition` 允许将状态转换标记为非阻塞，并允许其他更新中断它。
- `useDeferredValue` 允许延迟更新 UI 的非关键部分，以让其他部分先更新。

## 自定义 Hook

开发者可以 自定义 Hook 作为 JavaScript 函数。

### 自定义 hook 读取之前的 state 或 prop

```js
import React from "react";

function usePrevious(value) {
    // 使用 useRef 存储之前的值
    const ref = React.useRef();
    // 当值发生变化更新 ref.current
    React.useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export default function GetPreviousTest() {
    const [value, setValue] = React.useState('')
    const previous = usePrevious(value)
    return <div>
        previous: {previous}
        <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
}
```

原理：

1. 当输入框输入内容， `value` 为输入框的值。
2. `useEffect` 监听到 `value` 发生变化，更新 `ref.current` ，但是改变 `ref` 是不会触发渲染的，所以不显示
3. 当在输入框再次输入内容，`setValue` 触发渲染， `usePrevious` 返回的是上一次存储的值。之后 `useEffect` 再给 `ref.current` 设置新的值
