- [useCallback](#usecallback)
  - [语法](#语法)
  - [用法](#用法)
    - [跳过组件的重新渲染](#跳过组件的重新渲染)
    - [从记忆化回调中更新 state](#从记忆化回调中更新-state)
    - [防止频繁触发 Effect](#防止频繁触发-effect)
    - [优化自定义 Hook](#优化自定义-hook)

# useCallback
`useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。  
**useCallback 只应作用于性能优化。**。

## 语法
`useCallback(fn, dependencies) `  

**参数**
* `fn`：想要缓存的函数。
  * 此函数可以接受任何参数并且返回任何值。React 将会在初次渲染而非调用时返回该函数。
  * 当进行下一次渲染时，如果 dependencies 相比于上一次渲染时没有改变，那么 React 将会返回相同的函数。否则，React 将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用。
  * React **不会调用此函数，而是返回此函数**。你可以自己决定何时调用以及是否调用。
* `dependencies`：有关是否更新 fn 的所有响应式值的一个列表。
  * 响应式值包括` props、state`，和所有在你组件内部直接声明的变量和函数。
  * 依赖列表必须具有确切数量的项，并且必须像 [dep1, dep2, dep3] 这样编写。
  * `React` 使用 `Object.is` 比较每一个依赖和它的之前的值。
  * **如果没有声明 `dependencies` ，那么 `useCallback` 每次返回一个新的函数**

**返回值**  
* 在初次渲染时， `useCallback` 返回你已经传入的 `fn` 函数

在之后的渲染中, 如果依赖没有改变， `useCallback` 返回上一次渲染中缓存的 `fn` 函数；否则返回这一次渲染传入的 `fn`。

**不能在循环中使用 useCallback**

## 用法
### 跳过组件的重新渲染 
**为什么使用 useCallback()** ：当父组件发生渲染时，如果传递子组件的参数为函数，那么父组件会重新创建函数，导致子组件的 prop 发生改变，导致子组件也进行渲染。为了优化这种行为，使用 useCallback() 在父组件缓存传递给子组件的函数，当函数的依赖性发生改变才更新函数。

```jsx
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // ...

  return (
    <div className={theme}>
      // 传递给子组件为缓存了的函数
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

### 从记忆化回调中更新 state 
有时，你可能在记忆化回调中基于之前的 state 来更新 state。
```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  // 这里依赖 todos ，然后在里面更新 state
  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
```
解决：当你读取 state 只是为了计算下一个 state 时，你可以通过传递 `updater function` 以移除该依赖：
```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    // 传递 updater function
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ 不需要 todos 依赖项
  // ...
```

### 防止频繁触发 Effect 
如果 useEffect 使用了 useEffect 外面声明的方法，且该方法使用了 state 或 prop，那么 useEffect 需要将该方法声明为依赖。

但是这样的问题是当每次组件渲染时，这个方法都会重新创建，导致 useEffect 频繁触发。例子如下：
```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // 该方法使用了 roomId 这个 props
  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
  }, [createOptions]); // 这里将 createOptions 作为依赖
```

**解决方法**：
1. 将外面的方法移到 useEffect 里面
```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
  }, []); // 这里不用将 createOptions 作为依赖了
```

2. 使用 useCallback() 缓存函数，useCallback() 的依赖为函数内部使用的 props 或 state
```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ 仅当 roomId 更改时更改

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ 仅当 createOptions 更改时更改
  // ...
```

### 优化自定义 Hook
如果你正在编写一个 自定义 Hook，建议将它返回的任何函数包裹在 useCallback 中：
```jsx
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```
这确保了 Hook 的使用者在需要时能够优化自己的代码。
