- [useEffect](#useeffect)
  - [原理](#原理)
  - [`useLayoutEffect` 与 `useEffect` 的区别:](#uselayouteffect-与-useeffect-的区别)
  - [依赖：传递依赖数组、空数组和不传递依赖项之间的区别](#依赖传递依赖数组空数组和不传递依赖项之间的区别)
  - [语法](#语法)
  - [useEffect 的执行顺序](#useeffect-的执行顺序)
    - [useEffect 和组件内代码的执行顺序](#useeffect-和组件内代码的执行顺序)
    - [同个组件内多个 useEffect 的执行顺序](#同个组件内多个-useeffect-的执行顺序)
    - [父组件有多个子组件，子组件间的 useEffect 的执行顺序](#父组件有多个子组件子组件间的-useeffect-的执行顺序)
  - [用法](#用法)
    - [连接到外部系统](#连接到外部系统)
    - [在自定义 Hook 中封装 Effect](#在自定义-hook-中封装-effect)
    - [在 Effect 中根据先前 state 更新 state](#在-effect-中根据先前-state-更新-state)


# useEffect

## 原理
所以整个useEffect异步调用分为三步：
1. before mutation阶段在scheduleCallback中调度flushPassiveEffects
2. layout阶段之后将effectList赋值给rootWithPendingPassiveEffects
3. scheduleCallback触发flushPassiveEffects，flushPassiveEffects内部遍历rootWithPendingPassiveEffects

## `useLayoutEffect` 与 `useEffect` 的区别:
* `useLayoutEffect hook` 从 `mutation` 阶段的销毁函数调用到 `layout` 阶段的回调函数调用是同步执行的。
* 而 `useEffect` 则需要先在 `before mutation` 阶段调度，在 `Layout` 阶段完成后再异步执行

1. 触发时机：  
   - `useEffect`：`useEffect`是在组件完成渲染之后(包括首次渲染和更新渲染)异步触发的。它不会阻塞组件的渲染过程。  
   - `useLayoutEffect`：`useLayoutEffect`是在组件完成渲染之后、浏览器执行绘制之前同步触发的。它会在DOM更新之前被调用，可以阻塞组件的渲染过程。
2. 执行时间点：  
   - `useEffect`：`useEffect`的副作用操作是在组件渲染完成后的"提交阶段"执行的。这意味着它会在浏览器完成绘制后执行，对用户可见性没有直接影响。  
   - `useLayoutEffect`：`useLayoutEffect`的副作用操作是在组件渲染完成后的"布局阶段"执行的。这意味着它会在浏览器执行绘制之前执行，对DOM的计算和布局有直接影响。因此，`useLayoutEffect`中的副作用操作会在浏览器更新屏幕之前同步触发。

需要注意的是，由于`useLayoutEffect`的同步特性，如果在使用`useLayoutEffect`时进行大量计算或阻塞操作，可能会导致用户界面的卡顿和不响应。因此，一般情况下推荐使用`useEffect`，只有在需要在DOM更新之前立即执行某些操作时，才使用`useLayoutEffect`。

总结：
- `useEffect`是异步触发，适用于大多数副作用操作。
- `useLayoutEffect`是同步触发，适用于需要在DOM更新之前立即执行操作的情况，但需要注意潜在的性能问题。

## 依赖：传递依赖数组、空数组和不传递依赖项之间的区别
* 传递依赖项数组
  * 如果指定了依赖项，则 Effect 在 **初始渲染后以及依赖项变更的重新渲染后** 运行。
* 传递空依赖项数组 
  * 如果你的 Effect 确实没有使用任何响应式值，则它仅在 **初始渲染后** 运行。
* 不传递依赖项数组 
  * 如果完全不传递依赖数组，则 Effect 会在组件的 **每次单独渲染（和重新渲染）之后** 运行。


## 语法
`useEffect(setup, dependencies?) `
参数：
- setup：
  - 处理 `Effect` 的函数。
  - setup 函数选择性返回一个 清理（cleanup） 函数。
  - 当组件被添加到 DOM 的时候，React 将运行 setup 函数。
  - 在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。
  - 在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。
- 可选 dependencies：
  - setup 代码中引用的所有响应式值的列表。
  - 响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。
  - 依赖项列表的元素数量必须是固定的，并且必须像 `[dep1, dep2, dep3]` 这样内联编写。
  - React 将使用 `Object.is` 来比较每个依赖项和它先前的值。
  - **如果省略此参数，则在每次重新渲染组件之后，将重新运行 Effect 函数**。

注意事项：
- `useEffect` 是一个 Hook，因此只能在 组件的顶层 或自己的 Hook 中调用它，而不能在循环或者条件内部调用。
- 当严格模式启动时，React 将在真正的 setup 函数首次运行前，**运行一个开发模式下专有的额外 setup + cleanup 周期**。
- 如果你的 Effect 不是由交互（比如点击）引起的，那么 React 会让浏览器 **在运行 Effect 前先绘制出更新后的屏幕**。如果你的 Effect 正在做一些视觉相关的事情（例如，定位一个 tooltip），并且有显著的延迟（例如，它会闪烁），那么将 `useEffect` 替换为 `useLayoutEffect。`
- Effect **只在客户端上运行**，在服务端渲染中不会运行。

运行过程：
1. 将组件挂载到页面时，将运行 `setup` 代码。
2. 重新渲染 依赖项 变更的组件后：
   - 首先，使用**旧的** props 和 state 运行 `cleanup` 代码。
   - 然后，使用**新的** props 和 state 运行 `setup` 代码。
3. 当组件从页面卸载后， `cleanup` 代码 将运行最后一次。

## useEffect 的执行顺序

### useEffect 和组件内代码的执行顺序
useEffect 是在浏览器渲染完后再执行，所以是先执行组件内进行渲染的代码，再执行 useEffect 的代码

### 同个组件内多个 useEffect 的执行顺序
执行顺序就是 `useEffect` **在函数体里声明的顺序**

### 父组件有多个子组件，子组件间的 useEffect 的执行顺序
如果有一个这样的component：
```
<A>
    <A1>
        <A1_1/>
        <A1_2/>
    </A1>
    <A2>
        <A2_1/>
        <A2_2/>
    </A2>
</A>
```
mount 时 effect 的执行顺序：类似于二叉树的后序遍历，先遍历孩子，再遍历根，即：`[A1_1, A1_2, A1, A2_1, A2_2, A2, A]`。


## 用法
### 连接到外部系统 
有些组件需要与网络、某些浏览器 API 或第三方库保持连接，当它们显示在页面上时。这些系统不受 React 控制，所以称为外部系统。
```jsx
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
  	const connection = createConnection(serverUrl, roomId);
    connection.connect();
  	return () => {
      connection.disconnect();
  	};
  }, [serverUrl, roomId]);
  // ...
}
```

### 在自定义 Hook 中封装 Effect 
```jsx
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);
}
```

### 在 Effect 中根据先前 state 更新 state 
当你想要在 Effect 中根据先前的 state 更新 state 时，你可能会遇到问题：
```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1); // 你想要每秒递增该计数器...
    }, 1000)
    return () => clearInterval(intervalId);
  }, [count]); // 🚩 ... 但是指定 `count` 作为依赖项总是重置间隔定时器。
  // ...
}
```
因为 count  是一个响应式值，所以必须在依赖项列表中指定它。但是，这会导致 Effect 在每次 count 更改时再次执行 cleanup 和 setup。这并不理想。

**解决方法：向 setState() 传递更新函数**
```js
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(c => c + 1); // ✅ 传递一个 state 更新器
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); // ✅现在 count 不是一个依赖项

  return <h1>{count}</h1>;
}
```







