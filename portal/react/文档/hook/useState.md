# useState

- [useState](#usestate)
  - [语法](#语法)
  - [用法](#用法)
    - [根据先前的 state 更新 state （传递更新函数）](#根据先前的-state-更新-state-传递更新函数)
    - [更新状态中的对象和数组](#更新状态中的对象和数组)
    - [避免重复创建初始状态](#避免重复创建初始状态)
    - [使用 key 重置状态](#使用-key-重置状态)
  - [注意点](#注意点)
    - [我已经更新了状态，但日志仍显示旧值](#我已经更新了状态但日志仍显示旧值)
    - [setState 存储函数](#setstate-存储函数)
  - [`useState` 的 `set` 函数的异步、同步问题](#usestate-的-set-函数的异步同步问题)
    - [setState 后发生了什么](#setstate-后发生了什么)
    - [setState 为什么是异步的，这里的异步是什么意思](#setstate-为什么是异步的这里的异步是什么意思)
    - [使用 `useState` 的 `set` 函数后，如何同步获取最新的数据](#使用-usestate-的-set-函数后如何同步获取最新的数据)

useState 是一个 React Hook，它允许你向组件添加一个 状态变量。

## 语法

`const [state, setState] = useState(initialState);`

参数

- initialState：你希望 state 初始化的值。它可以是任何类型的值，但对于函数有特殊的行为。在初始渲染后，此参数将被忽略。
  - 如果传递**函数**作为 `initialState`，则它将被视为 **初始化函数**。它应该是纯函数，不应该接受任何参数，并且应该返回一个任何类型的值。当初始化组件时，React 将调用你的初始化函数，并将其返回值存储为初始状态。

返回

`useState` 返回一个由两个值组成的数组：

- 当前的 `state`。在首次渲染时，它将与你传递的 `initialState` 相匹配。
- `set` 函数，它可以让你将 state 更新为不同的值并触发重新渲染。
  - 可以直接传递新状态，也可以传递一个根据先前状态来计算新状态的函数（它必须是纯函数，只接受待定的 state 作为其唯一参数，并应返回下一个状态。）

注意事项

1. `set` 函数 仅更新 **下一次 渲染的状态变量**。如果在调用 set 函数后读取状态变量，则 仍会得到在调用之前显示在屏幕上的旧值。
2. React 会 **批量处理状态更新**。它会在**所有事件处理函数运行** 并调用其 `set` 函数后更新屏幕。

## 用法

### 根据先前的 state 更新 state （传递更新函数）

假设 age 为 42，这个处理函数三次调用 setAge(age + 1)：

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

`set` 函数 不会更新 已经运行代码中的 `age` 状态变量。因此，每个 `setAge(age + 1)` 调用变成了 `setAge(43)`。

解决：你可以向 setAge 传递一个 更新函数，

```js
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

React 将更新函数放入 **队列** 中。然后，在下一次渲染期间，它将按照相同的顺序调用它们：

1. a => a + 1 将接收 42 作为待定状态，并返回 43 作为下一个状态。
2. a => a + 1 将接收 43 作为待定状态，并返回 44 作为下一个状态。
3. a => a + 1 将接收 44 作为待定状态，并返回 45 作为下一个状态。

现在没有其他排队的更新，因此 React 最终将存储 45 作为当前状态。

注意：  
下面的例子调用了三次 setState，React 将它们放到队列，最后的 setState 会覆盖上两次的 setState

```js
function clickSetName() {
    setName("123");
    setName("456");
    setName("789"); 
}
// 最终 state 的值为 "789"
```

### 更新状态中的对象和数组

在 React 中，状态被认为是**只读**的，因此 你应该**替换它而不是改变现有对象**。

对象：

需要返回包含原来对象所以属性的新对象

```js
import React, { useState } from "react";

export default function UseStateExample() {
    const [form, setForm] = useState({age: 0, name: "hello"});
    function click(e) {
        setForm({
            ...form,
            age: form.age+1
        });
    }
    function inputChange(e) {
        setForm({
            ...form,
            name: e.target.value
        });
    }
    return(
        <>
            {form.age}
            <button type="button" onClick={click}>Increment</button>
            <br></br>
            <input value={form.name} onChange={inputChange}></input>
        </>
    )
}
```

嵌套对象：

```js
const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
});

setPerson({
    ...person,
    artwork: {
        ...person.artwork,
        title: e.target.value
    }
});
```

**数组：**  
`[...todos]` 展开语法，`todos.map()` 和 `todos.filter()` 确保状态数组被替换而不是改变。

```js
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

setTodos([
    ...todos,
    {
        id: nextId++,
        title: title,
        done: false
    }
]);
```

### 避免重复创建初始状态

应该传递初始化函数本身，而不是初始化函数的返回值。

如果传递初始化函数的返回值，虽然 React 会缓存值，但是每次渲染都会执行初始化函数，导致性能损耗。

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos()); // ×
  
  const [todos, setTodos] = useState(createInitialTodos);  // √
```

### 使用 key 重置状态

通过向组件传递不同的 `key` 来重置组件的状态

```jsx
import { useState } from 'react';

export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}

function Form() {
  const [name, setName] = useState('Taylor');

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}.</p>
    </>
  );
}
```

## 注意点

### 我已经更新了状态，但日志仍显示旧值

如果你需要使用下一个状态，你可以在将其传递给 set 函数之前将其保存在一个变量中：

```jsx
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

### setState 存储函数

```js
// 错误使用，这样 useState 会认为函数为更新函数
const [fn, setFn] = useState(someFunction);
function handleClick() {
  setFn(someOtherFunction);
}

// 正确使用，通过 () => 传递函数
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```

## `useState` 的 `set` 函数的异步、同步问题

`setState` 是类组件的 `api` ，通常讨论的 `setState` 应该是 `useState` 的 `set` 函数。

### setState 后发生了什么

在代码中调用 `setState` 函数之后，`React` 会将传入的参数对象与组件当前的状态合并，然后触发**调和过程**( `Reconciliation` )。经过调和过程，React 会以相对高效的方式根据新的状态**构建 React 元素树**并且着手重新渲染整个 UI 界面。

在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

如果在短时间内频繁 `setState`。`React` 会将 `state` 的改变压入栈中，在合适的时机，**批量更新 `state` 和视图，达到提高性能的效果**

### setState 为什么是异步的，这里的异步是什么意思

假如所有 `setState` 是同步的，意味着每执行一次 `setState` 时（有可能一个同步代码中，多次 setState），都重新 `vnode diff + dom` 修改，这对性能来说是极为不好的。如果是异步，则可以把一个同步代码中的多个 `setState` 合并成一次组件更新。所以默认是异步的，但是在一些情况下是同步的。

一般认为，**做异步设计是为了性能优化、减少渲染次数**：`setState` 设计为异步，可以显著的提升性能。如果每次调用 `setState` 都进行一次更新，那么意味着 `render` 函数会被频繁调用，界面重新渲染，这样效率是很低的；最好的办法应该是获取到多个更新，之后进行批量更新；

### 使用 `useState` 的 `set` 函数后，如何同步获取最新的数据

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
