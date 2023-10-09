# useReducer
`useReducer` 是一个 `React Hook`，它允许你向组件里面添加一个 `reducer`。

**迁移状态逻辑至 Reducer 中**:  
对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措。对于这种情况，你可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 `reducer`。

`useReducer` 和 `useState` 非常相似，但是它可以让你把状态更新逻辑从事件处理函数中移动到组件外部。

## 语法
`const [state, dispatch] = useReducer(reducer, initialArg, init?)`

参数 
- `reducer`：用于更新 state 的纯函数。
  - **参数为 `state` 和 `action`**，返回值是更新后的 `state`。state 与 action 可以是任意合法值。
  - `state` 是只读的，不能修改。
    - `state` 为数组，则不能直接修改原来的数组，需要返回一个新的数组（调用原数组的 map 等方法能返回一个数组也可以）
    - `state` 为对象，需要返回一个包含原来对象的属性的新对象
- `initialArg`：用于初始化 state 的任意值。初始值的计算逻辑取决于接下来的 init 参数。
- 可选参数 `init`：用于计算初始值的函数。如果存在，使用 `init(initialArg)` 的执行结果作为初始值，否则使用 initialArg。

返回值   
`useReducer` 返回一个由两个值组成的数组：
- 当前的 `state`。初次渲染时，它是 init(initialArg) 或 initialArg （如果没有 init 函数）。
- `dispatch` 函数。用于更新 state 并触发组件的重新渲染。
  - 参数：`action`：用户执行的操作。可以是任意类型的值。通常来说 action 是一个对象，其中 `type` 属性标识类型，其它属性携带额外信息。

## 用法
### 简单例子
```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    // 注意返回的 state 需要符合原来定义的数据的格式
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```

### 避免重新创建初始值 
问题：
```jsx
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, createInitialState(username));
  // ...
```
React 会保存 `state` 的初始值并在下一次渲染时忽略它。  
但是像上面的例子，虽然 `createInitialState(username)` 的返回值只用于初次渲染，但是在每一次渲染的时候都会被调用（虽然 React 保存了初始值，但是方法每次渲染都会调用）。如果它创建了比较大的数组或者执行了昂贵的计算就会浪费性能。

解决方法：给 `useReducer` 的第三个参数传入 初始化函数 来解决这个问题
```jsx
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  // ...
```
注意的是你传入的参数是 `createInitialState` 这个 函数自身，而不是执行 `createInitialState()` 后的返回值。

**如果初始化函数不需要参数就可以计算出初始值，可以把 `useReducer` 的第二个参数改为 `null`。**

## 注意点
### 我已经 dispatch 了一个 action，但是打印出来仍然还是旧的 state 
下面的例子是在一个函数中调用 `dispatch` 函数 ，不会改变**当前渲染的 state**，所以函数内读取的 state 还是旧的 state：
```js
function handleClick() {
  console.log(state.age);  // 42

  dispatch({ type: 'incremented_age' }); // 用 43 进行重新渲染
  console.log(state.age);  // 还是 42！

  setTimeout(() => {
    console.log(state.age); // 一样是 42！
  }, 5000);
}
```

如果你需要获取更新后的 state，可以手动调用 reducer 来得到结果：
```js
const action = { type: 'incremented_age' };
dispatch(action);

const nextState = reducer(state, action);
console.log(state);     // { age: 42 }
console.log(nextState); // { age: 43 }
```

### 在 dispatch 后 state 的某些属性变为了 undefined 
请确保每个 case 语句中所返回的新的 state 都复制了当前的属性：
```js
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        ...state, // 不要忘记复制之前的属性！
        age: state.age + 1
      };
    }
    // ...
```
