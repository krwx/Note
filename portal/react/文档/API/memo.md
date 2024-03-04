# memo

- [memo](#memo)
  - [语法](#语法)
  - [用法](#用法)
    - [子组件当 props 没有改变时跳过重新渲染](#子组件当-props-没有改变时跳过重新渲染)
    - [最小化 props 的变化](#最小化-props-的变化)
    - [指定自定义比较函数](#指定自定义比较函数)
  - [当组件的某个 prop 是对象、数组或函数时，我的组件会重新渲染的原因](#当组件的某个-prop-是对象数组或函数时我的组件会重新渲染的原因)

`memo` 允许你在 `props` 没有变化的情况下跳过组件的重渲染。

**即使使用 `memo` ，如果它自己的 `state` 或正在使用的 `context` 发生更改，组件也会重新渲染。**

**应该只将 memo 用作为性能优化。**

只有当你的组件经常使用完全相同的 `props` 重新渲染时，并且其重新渲染逻辑是非常昂贵的，使用 `memo` 优化才有价值。

**如果传递给组件的 `props` 始终不同，例如在渲染期间传递对象或普通函数，则 `memo` 是完全无用的。这就是为什么你通常需要在 `memo` 中同时使用 `useMemo` 和 `useCallback`** 。

## 语法

```js
memo(Component, arePropsEqual?) 
```

参数：

- `Component` ：要进行记忆化的组件。
  - `memo` 不会修改该组件，而是返回一个新的、记忆化的组件。
  - 它接受任何有效的 React 组件，包括函数组件和 `forwardRef` 组件。
- 可选参数 `arePropsEqual`：一个**函数**，接受两个参数：组件的前一个 props 和新的 props。
  - 如果旧的和新的 props 相等，即组件使用新的 props 渲染的输出和表现与旧的 props 完全相同，则它应该返回 true。否则返回 false。
  - 通常情况下，你不需要指定此函数。
  - **默认情况下，React 将使用 `Object.is` 比较每个 `prop`** 。

返回值：

- `memo` 返回一个新的 React 组件。它的行为与提供给 memo 的组件相同，
- **只是当它的父组件重新渲染时 React 不会总是重新渲染它，除非它的 props 发生了变化**。

```js
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

## 用法

### 子组件当 props 没有改变时跳过重新渲染

要记忆化一个组件，请将它包装在 memo 中，使用它返回的值替换原来的组件：

```js
import { memo } from 'react';

const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

### 最小化 props 的变化

当你使用 memo 时，只要任何一个 prop 与先前的值不是 浅层相等 的话，你的组件就会重新渲染。这意味着 React 会使用 Object.is 比较组件中的每个 prop 与其先前的值。

1、当 props 是对象时，使用 useMemo  
可以使用 `useMemo` **避免父组件每次都重新创建该对象**

```js
// 这个例子使用 useMemo 记录了 person 对象。这样当 address 发生变更时，person 对象还是保持不变，这样 Greeting 组件就不会重写渲染
import { memo, useState, useEffect, useMemo } from 'react';

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const person = useMemo(() => {
    return {
      name
    }
  }, [name]);

  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting person={person} />
    </>
  );
}

const Greeting = memo(function Greeting({ person: {name} }) {
  useEffect(() => {
    console.log("component render");
  });

  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});
```

2、当 props 是对象时，可以考虑拆解对象，只传递关键的属性，而不是传递对象

3、当 props 是函数，使用 useCallback  
例子参考 [useCallback hook](../hook/useCallback.md)

### 指定自定义比较函数

**自定义函数应该仅在新的 props 与旧的 props 具有相同的输出时返回 true；否则应该返回 false。**

```js
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
```

陷阱：

1. 必须比较每个 prop，包括函数
2. 避免在 arePropsEqual 中进行深比较，数据结构具有已知有限的深度。深比较可能会变得非常缓慢

## 当组件的某个 prop 是对象、数组或函数时，我的组件会重新渲染的原因

React 通过浅比较来比较旧的和新的 prop：也就是说，它会考虑每个新的 prop 是否与旧 prop 引用相等。

如果每次父组件重新渲染时创建一个新的对象或数组，即使它们每个元素都相同，React 仍会认为它已更改。

同样地，如果在渲染父组件时创建一个新的函数，即使该函数具有相同的定义，React 也会认为它已更改。

为了避免这种情况，可以简化 props 或在父组件中记忆化（memoize）props。
