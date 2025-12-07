# React

- [React](#react)
  - [1. 你知道Hook是什么吗？有哪些](#1-你知道hook是什么吗有哪些)
  - [2. 你知道diff算法是什么吗？原理是什么](#2-你知道diff算法是什么吗原理是什么)
  - [3. 你知道fiber是什么吗？（控制CPU资源的）](#3-你知道fiber是什么吗控制cpu资源的)
  - [4. 了解 virtual dom 吗](#4-了解-virtual-dom-吗)
  - [5. diff 算法原理是什么](#5-diff-算法原理是什么)
  - [6. 讲一下 react 为什么要用 hooks](#6-讲一下-react-为什么要用-hooks)
  - [7. 讲一下 哪些实际场景使用 hooks](#7-讲一下-哪些实际场景使用-hooks)
  - [8. 类声明的组件怎么使用 hook](#8-类声明的组件怎么使用-hook)
  - [9. 讲一下 react 优化的方法](#9-讲一下-react-优化的方法)
  - [10. 讲一下virtual dom](#10-讲一下virtual-dom)
  - [11. 为什么要使用 virtual dom，说一下他的好处](#11-为什么要使用-virtual-dom说一下他的好处)
  - [12. 有用过自定义 hook 吗](#12-有用过自定义-hook-吗)
  - [13. React.memo 的作用](#13-reactmemo-的作用)
  - [14. React.useMemo ，React.useRef 的作用。什么时候用 useMemo或者useRef](#14-reactusememo-reactuseref-的作用什么时候用-usememo或者useref)
  - [15. setState 怎么同步处理，实现一个hook，实现同步处理state（参考v-model，通过Object.defineProperty实现）](#15-setstate-怎么同步处理实现一个hook实现同步处理state参考v-model通过objectdefineproperty实现)
  - [16. useEffect 不加依赖，什么时候回调用，组件更新时是否会调用（会，props发生改变时）（写代码测试一下）](#16-useeffect-不加依赖什么时候回调用组件更新时是否会调用会props发生改变时写代码测试一下)
  - [17. 怎么在自定义 hook 读取之前的 state 或 prop](#17-怎么在自定义-hook-读取之前的-state-或-prop)
  - [18. 讲一下高阶组件（hoc），怎么使用，有用过吗？](#18-讲一下高阶组件hoc怎么使用有用过吗)
  - [19. useEffect和useLayoutEffect的区别](#19-useeffect和uselayouteffect的区别)
  - [20. 什么时候使用useLayoutEffect，有用过useLayoutEffect吗？](#20-什么时候使用uselayouteffect有用过uselayouteffect吗)
  - [21. 了解 redux 怎么进行异步的状态管理（就是需要发送异步请求获取状态）](#21-了解-redux-怎么进行异步的状态管理就是需要发送异步请求获取状态)
  - [22. 了解 redux-saga 吗](#22-了解-redux-saga-吗)
  - [23. redux 实际开发中有用过哪些异步方案](#23-redux-实际开发中有用过哪些异步方案)

## 1. 你知道Hook是什么吗？有哪些

Hook 是函数，可以帮助在组件中使用不同的 React 功能。

有 useState, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef

## 2. 你知道diff算法是什么吗？原理是什么

diff 算法在更新虚拟 dom 时使用。将当前组件与该组件在上次更新时对应的 Fiber 节点比较。目的是尽可能做到节点复用。

diff 算法的规则：

1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。
3. 开发者可以通过 `key prop` 来暗示哪些子元素在不同的渲染下能保持稳定。

**单节点 diff**  
判断 DOM 节点是否可以复用的规则：首先判断是否有对应的 DOM 节点，然后判断 key 是否相同，如果 key 相同则判断 type 是否相同，只有都相同时一个 DOM 节点才能复用。

**多节点 diff**  
需要处理的情况：

1. 节点更新。节点属性变化、节点类型更新
2. 节点新增或减少
3. 节点位置变化

## 3. 你知道fiber是什么吗？（控制CPU资源的）

React Fiber可以理解为：  
React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。其中每个任务更新单元为React Element对应的Fiber节点。

Fiber包含三层含义：

1. 作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler。
2. 作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
3. 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）

## 4. 了解 virtual dom 吗

`virtual dom` 是一种编程概念，它将当前的 `ui` 描绘成一颗树存放在内存中，这颗树与实际的 `DOM` 是相对应的。`React` 会使用 `ReactDOM` 等库将这棵树与实际的 DOM 树进行同步。

## 5. diff 算法原理是什么

同2

## 6. 讲一下 react 为什么要用 hooks

- Component非UI逻辑复用困难。
- 组件的生命周期函数不适合side effect逻辑的管理。
- 不友好的Class Component。

## 7. 讲一下 哪些实际场景使用 hooks

1. 优化子组件渲染使用 `useCallback` 和 `useMemo`
2. 当组件重新渲染时跳过代价昂贵的重新计算使用 `useMemo`
3. 使用 `useImperativeHandle` 可以定义暴露给父组件的 DOM 节点的方法或属性
4. 使用 `useRef` 可以记录定时器的 id 和保存 DOM 引用
5. 使用 `useCallback` 防止以函数为依赖的 `useEffect` 频繁触发

## 8. 类声明的组件怎么使用 hook

官方表明不能在类组件中使用 hook

但是可以将Hook包装成HOC，例子如下：

```js
// hook 的定义
import { useEffect, useState } from 'react';

export function useScreenWidth(): number {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = (event: any) => {
      setWidth(event.target.innerWidth);
    };
    // 监听浏览器窗口变化
    window.addEventListener('resize', handler);
    // 组件unmount时要解除监听
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return width;
}


// HOC 代码
import React from 'react';
import { useScreenWidth } from '../hooks/useScreenWidth';

export const withHooksHOC = (Component: any) => {
  return (props: any) => {
    const screenWidth = useScreenWidth();

    return <Component width={screenWidth} {...props} />;
  };
};

// 类组件使用
import React from 'react';
import { withHooksHOC } from './withHooksHOC';

interface IHooksHOCProps {
  width: number;
}

class HooksHOC extends React.Component<IHooksHOCProps> {
  render() {
    return <p>width: {this.props.width}</p>;
  }
}

export default withHooksHOC(HooksHOC);
```

## 9. 讲一下 react 优化的方法

1. 使用 `React.memo` 来缓存组件，这样只有在传入组件的状态值发生变化时才会从新渲染。如果传入的值相同，则会返回缓存的组件。
2. 当组件重新渲染时跳过代价昂贵的重新计算使用 `useMemo`
3. 避免使用 内联对象
   1. 使用内联对象时，react会在每次渲染时重新创建对此对象的引用，这会导致接收此对象的组件将其视为不同的对象。

      ```js
      // Don't do this!
      function Component(props) {
        const aProp = { someProp: 'someValue' }
        return <AComponent style={{ margin: 0 }} aProp={aProp} />  
      }

      // Do this instead :)
      const styles = { margin: 0 };
      function Component(props) {
        const aProp = { someProp: 'someValue' }
        return <AComponent style={styles} {...aProp} />  
      }

      ```

4. 避免使用 匿名函数
   1. 虽然匿名函数是传递函数的好方法，但它们在每次渲染上都有不同的引用。类似于内联对象。
5. 延迟加载不是立即需要的组件：路由懒加载
   1. 使用React.lazy和React.Suspense完成延迟加载不是立即需要的组件。React加载的组件越少，加载组件的速度越快。
6. 调整CSS而不是强制组件加载和卸载
   1. 有时保持组件加载的同时，通过CSS隐藏可能是有益的，而不是通过卸载来隐藏。
   2. 将元素透明度调整为0对浏览器的成本消耗几乎为0（因为它不会导致重排），并且应该尽可能优先更改visibility或display。
7. 使用 `React.Fragment` 避免添加额外的DOM
8. 使用 `useCallback` 防止以函数为依赖的 `useEffect` 频繁触发
9. 开发组件时，注意保持DOM结构的稳定；即，尽可能少地动态操作DOM结构，尤其是移动操作。
10. 对于列表结构，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

## 10. 讲一下virtual dom

同4

## 11. 为什么要使用 virtual dom，说一下他的好处

   1. 减少实际DOM的操作  
    直接操作实际DOM的代价很高，因为DOM操作需要浏览器重新计算布局和绘制。通过使用Virtual DOM，React可以减少实际DOM的操作次数，从而提高应用程序的性能。
   2. 提高渲染速度  
    React使用Virtual DOM来比较前后两个状态之间的差异，并且只更新需要更新的部分。这意味着React不需要重新渲染整个页面，而只需要重新渲染变化的部分，从而提高渲染速度。
   3. 更好的跨平台兼容性  
    Virtual DOM可以用于任何JavaScript运行环境，包括Web浏览器、Node.js等。这使得React可以更容易地在不同的平台上进行开发和部署，从而提高了跨平台兼容性。

## 12. 有用过自定义 hook 吗

1. 使用自定义 hook 监听网络状态
2. 使用自定义 hook 封装定时操作逻辑
3. 使用自定义 hook 封装监听鼠标移动事件，获取鼠标坐标

## 13. React.memo 的作用

`memo` 允许你在 `props` 没有变化的情况下跳过组件的重渲染。

```js
import { memo } from 'react';

const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

## 14. React.useMemo ，React.useRef 的作用。什么时候用 useMemo或者useRef

`useMemo` 在每次重新渲染的时候能够缓存计算的结果。  

什么时候用 `useMemo` ：有昂贵计算代价可以缓存计算结果的值可以使用，优化性能时使用

`useRef` 是一个 React Hook，它能让你引用一个不需要渲染的值。

什么时候用 `useRef` ：清除定时器、通过 ref 操作 DOM

## 15. setState 怎么同步处理，实现一个hook，实现同步处理state（参考v-model，通过Object.defineProperty实现）

同步处理：

1. 直接传递 `setState` 的数据

    ```js
    function click() {
      const nextCount = count + 1;
      setCount(nextCount);

      console.log(count);     // 0
      console.log(nextCount); // 1
      logValue(nextCount);
    }

    function logValue(value) {
      console.log(value);
    }
    ```

2. 通过 `useEffect` 监听值，在 `useEffect` 使用最新值

    ```js
    const [num, setNum] = useState(0);

    useEffect(() => {
      onsole.log("useEffect num: ", num);
    }, [num])
    ```

3. 通过 `useRef()` 保存最新值。然后使用 `ref` 的值

    ```js
    const [num, setNum] = useState(0);
    const numRef = useRef(num);

    function click() {
      setNum(num + 1);
      // 使用 setState 后，要更新 ref 的值
      numRef.current = num + 1;

      otherFunction();
    }

    function otherFunction() {
      console.log(numRef.current)
    }
    ```

## 16. useEffect 不加依赖，什么时候回调用，组件更新时是否会调用（会，props发生改变时）（写代码测试一下）

- 传递依赖项数组
  - 如果指定了依赖项，则 Effect 在 **初始渲染后以及依赖项变更的重新渲染后** 运行。
- 传递空依赖项数组
  - 如果你的 Effect 确实没有使用任何响应式值，则它仅在 **初始渲染后** 运行。
- 不传递依赖项数组
  - 如果完全不传递依赖数组，则 Effect 会在组件的 **每次单独渲染（和重新渲染）之后** 运行。

## 17. 怎么在自定义 hook 读取之前的 state 或 prop

```js
import React from "react";

function usePrevious(value) {
    const ref = React.useRef();
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

## 18. 讲一下高阶组件（hoc），怎么使用，有用过吗？

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

**高阶组件是参数为组件，返回值为新组件的函数**。

请注意，HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

```jsx
import React, { useState } from "react";

function enhance(Component) {
    return function JudgeComponent({ visible, ...props }) {
        return (
            <>
                {visible && <Component {...props} />}
            </>
        )
    }
}

function ChildItem({ children, name }) {
    return (
        <>
            {children}
            <div>
                name: {name}
            </div>
        </>
    )
}

export default function HocExample() {
    const [visible, setVisible] = useState(true);

    const EnChildItem = enhance(ChildItem);
    return (
        <>
            <div>
                <button onClick={e => setVisible(!visible)}>click</button>
            </div>
            <EnChildItem visible={visible} name="first name">
                hello 123
            </EnChildItem>
            <EnChildItem visible={visible} name="second name">
                hello 456
            </EnChildItem>
        </>
    )
}
```

## 19. useEffect和useLayoutEffect的区别

1. 触发时机：  
   - `useEffect`：`useEffect`是在组件完成渲染之后(包括首次渲染和更新渲染)异步触发的。它不会阻塞组件的渲染过程。  
   - `useLayoutEffect`：`useLayoutEffect`是在组件完成渲染之后、浏览器执行绘制之前同步触发的。它会在DOM更新之前被调用，可以阻塞组件的渲染过程。
2. 执行时间点：  
   - `useEffect`：`useEffect`的副作用操作是在组件渲染完成后的"提交阶段"执行的。这意味着它会在浏览器完成绘制后执行，对用户可见性没有直接影响。  
   - `useLayoutEffect`：`useLayoutEffect`的副作用操作是在组件渲染完成后的"布局阶段"执行的。这意味着它会在浏览器执行绘制之前执行，对DOM的计算和布局有直接影响。因此，`useLayoutEffect`中的副作用操作会在浏览器更新屏幕之前同步触发。

other:

- `useEffect` 是异步执行的，而 `useLayoutEffect` 是同步执行的。
- `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前。

## 20. 什么时候使用useLayoutEffect，有用过useLayoutEffect吗？

useLayoutEffect 是 useEffect 的一个版本，**在浏览器重新绘制屏幕之前触发**。

用法：

1. 在浏览器重新绘制屏幕前计算元素的布局

## 21. 了解 redux 怎么进行异步的状态管理（就是需要发送异步请求获取状态）

使用 createAsyncThunk 。[用法](../redux/文档/基础教程/第5节：异步逻辑与数据请求.md)

## 22. 了解 redux-saga 吗

使用 synchronous-looking 的生成器函数处理异步逻辑。 Sagas 返回效果的描述，由 saga 中间件执行，就像 JS 应用程序的“后台线程”一样。

## 23. redux 实际开发中有用过哪些异步方案

- gaearon/redux-thunk
- listenerMiddleware (Redux Toolkit)
- redux-saga/redux-saga
- redux-observable/redux-observable
- redux-loop/redux-loop
- jeffbski/redux-logic
