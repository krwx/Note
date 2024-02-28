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
  - [有用过自定义 hook 吗](#有用过自定义-hook-吗)

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
import React from 'react';
import { useScreenWidth } from '../hooks/useScreenWidth';

export const withHooksHOC = (Component: any) => {
  return (props: any) => {
    const screenWidth = useScreenWidth();

    return <Component width={screenWidth} {...props} />;
  };
};

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

## 有用过自定义 hook 吗

1. 使用自定义 hook 监听网络状态
2. 使用自定义 hook 封装定时操作逻辑
3. 使用自定义 hook 封装监听鼠标移动事件，获取鼠标坐标
