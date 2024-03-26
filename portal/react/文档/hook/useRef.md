# useRef

- [useRef](#useref)
  - [语法](#语法)
  - [用法](#用法)
    - [清除定时器](#清除定时器)
    - [通过 ref 操作 DOM](#通过-ref-操作-dom)
    - [避免重复创建 ref 的内容](#避免重复创建-ref-的内容)
  - [不要在渲染期间写入或者读取 ref.current](#不要在渲染期间写入或者读取-refcurrent)

`useRef` 是一个 React Hook，它能让你引用一个不需要渲染的值。

**改变 ref 不会触发重新渲染。**

**为什么使用 useRef 存储不需要渲染的值，而不直接声明一个变量存储数据**？ 理由如下：

- 你可以在重新渲染之间 存储信息（不像是普通对象，每次渲染都会重置）。
- 改变它 不会触发重新渲染（不像是 state 变量，会触发重新渲染）。
- 对于你的组件的每个副本来说，这些信息都是本地的（不像是外面的变量，是共享的）。

改变 `ref` 不会触发重新渲染。 这意味着 `ref` 是存储一些不影响组件视图输出的信息的完美选择。

改变 `ref` 不会触发重新渲染，所以 `ref` 不适合用于存储期望显示在屏幕上的信息。

## 语法

`useRef(initialValue)`：在你组件的顶层调用 useRef 声明一个 ref。

参数

- `initialValue`： `ref` 对象的 `current` 属性的初始值。可以是任意类型的值。这个参数会首次渲染后被忽略。

返回值

- `useRef` 返回一个只有一个 `current` 属性的对象:
  - `current`：最初，它被设置为你传递的 `initialValue`。之后你可以把它设置为其他值。
  - 如果你把 ref 对象**作为一个 JSX 节点的 ref 属性**传递给 React，React 将为它设置 current 属性。

在后续的渲染中，useRef 将返回同一个对象。

注意事项

- 你可以修改 `ref.current` 属性，是可变的。
  - 然而，如果它持有一个用于渲染的对象（例如，你的 state 的一部分），那么你就不应该修改这个对象。
- 当你改变 `ref.current` 属性时，**React 不会重新渲染你的组件**。
  - React 不知道你何时改变它，因为 ref 是一个普通的 JavaScript 对象。
- 除了 初始化 外不要在渲染期间写入 或者读取 `ref.current`。这会使你的组件的行为不可预测。
- 在严格模式下，React 将会 **调用两次组件方法**，这是为了 帮助你发现意外的问题。这只是开发模式下的行为，不影响生产模式。每个 ref 对象将会创建两次，但是其中一个版本将被丢弃。

## 用法

### 清除定时器

可以使用普通变量存储计时器的 id ，但是前提是组件永远不会重写渲染。一旦重新渲染，那么存储 id 的变量就会重置，这样就丢失了原来的计时器的 id，那么就不能停止计时。

使用 useRef 存储计时器的 id，那么当组件因为 setState 或其他原因重新渲染时，id 还是保存下来了，可以停止计时

```js
// 这里通过一个输入框实现组件重新渲染
import { Button } from 'antd';
import { useRef, useState } from 'react';

export default function MyApp() {
  const [name, setName] = useState('');
  const intervalId = useRef(0);

  const startTiming = () => {
    intervalId.current = setInterval(() => {
      console.log("hello", Date.now());
    }, 1000);
  }
  const stopTiming = () => {
    clearInterval(intervalId.current);
  }

  return (
    <>
      <Button type='primary' onClick={startTiming}>start</Button>
      <Button type='primary' onClick={stopTiming}>stop</Button>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
    </>
  );
}
```

### 通过 ref 操作 DOM

1. 声明一个 initial value 为 null 的 ref 对象
2. 将你的 ref 对象作为 ref 属性传递给你想要操作的 DOM 节点的 JSX
3. 当 React 创建 DOM 节点并将其渲染到屏幕时，React 将会把 DOM 节点设置为你的 ref 对象的 `current` 属性。现在你可以访问 `<input>` 的 DOM 节点，

```js
import { useRef } from 'react';

export default function Form() {
  // 1. 声明一个 initial value 为 null 的 ref 对象
  const inputRef = useRef(null);

  function handleClick() {
    // 3. 操作 DOM 节点
    inputRef.current.focus();
  }

  return (
    <>
      // 2. 将你的 ref 对象作为 ref 属性传递给你想要操作的 DOM 节点的 JSX
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

### 避免重复创建 ref 的内容

`React` 保存首次的 `ref` 初始值，并在后续的渲染中忽略它。

```js
function Video() {
  const playerRef = useRef(new VideoPlayer());
  // ...
```

虽然 `new VideoPlayer()` 的结果只会在首次渲染时使用，但是你依然在每次渲染时都在调用这个方法。  
(个人理解是组件初始化后，组件每次渲染时 `ref` 的值都不会取初始值，但是组件还是会执行 `VideoPlayer()` 这个方法，尽管 `ref` 不会取这个值)

对 `ref` 进行判空处理来避免

```js
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
  // ...
```

## 不要在渲染期间写入或者读取 ref.current

在 渲染期间 读取或写入 ref 会破坏一些预期行为。

```js
function MyComponent() {
  // ...
  // 🚩 不要在渲染期间写入 ref
  myRef.current = 123;
  // ...
  // 🚩 不要在渲染期间读取 ref
  return <h1>{myOtherRef.current}</h1>;
}
```

**在 事件处理程序或者 effects 中读取和写入 ref。**

```js
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ 你可以在 effects 中读取和写入 ref
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ 你可以在事件处理程序中读取和写入 ref
    doSomething(myOtherRef.current);
  }
  // ...
}
```
