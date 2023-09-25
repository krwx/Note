- [useMemo](#usememo)
  - [语法](#语法)
  - [使用](#使用)
    - [跳过代价昂贵的重新计算](#跳过代价昂贵的重新计算)
      - [如何衡量计算过程的开销是否昂贵？](#如何衡量计算过程的开销是否昂贵)
    - [跳过组件的重新渲染](#跳过组件的重新渲染)
    - [记忆另一个 Hook 的依赖](#记忆另一个-hook-的依赖)
  - [注意点](#注意点)

# useMemo
`useMemo` 在每次重新渲染的时候能够缓存计算的结果。  
**useCallback 只应作用于性能优化。**。

## 语法
`useMemo(calculateValue, dependencies) `

参数 
* `calculateValue`：要缓存计算值的函数。
  * 它应该是一个没有任何参数的纯函数，并且可以返回任意类型。
  * React 将会在首次渲染时调用该函数；在之后的渲染中，如果 `dependencies` 没有发生变化，React 将直接返回相同值。否则，将会再次调用 `calculateValue` 并返回最新结果，然后缓存该结果以便下次重复使用。
* `dependencies`：所有在 `calculateValue` 函数中使用的**响应式变量**组成的数组。
  * 响应式变量包括 `props、state` 和所有你直接在组件中定义的变量和函数。
  * 依赖项数组的长度必须是固定的并且必须写成 `[dep1, dep2, dep3]` 这种形式。React 使用 `Object.is` 将每个依赖项与其之前的值进行比较。

返回值 
* 在初次渲染时， `useMemo` 返回不带参数调用 `calculateValue` 的结果。
* 在接下来的渲染中，如果依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用 `calculateValue` ，并返回最新结果。

## 使用
### 跳过代价昂贵的重新计算 
```js
import { useState, useMemo } from 'react';

function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

function filterTodos(todos, tab) {
  console.log('[ARTIFICIALLY SLOW] Filtering ' + todos.length + ' todos for "' + tab + '" tab.');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // 在 500 毫秒内不执行任何操作以模拟极慢的代码
  }
  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}

function TodoList({ todos, theme, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // 如果不用 useMemo，那么使用下面的语句，当切换主题时页面就会有停顿
  // const visibleTodos = filterTodos(todos, tab);

  return (
    <div className={theme}>
      <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```
模拟停顿
```js
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // 在 500 毫秒内不执行任何操作以模拟极慢的代码
  }
```

#### 如何衡量计算过程的开销是否昂贵？ 
```js
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');
```
通过 `console.time()` 和 `console.timeEnd()` 记录计算的时间，如果全部记录的时间加起来很长（**1ms 或者更多**），那么记忆此计算结果是有意义的。

**组件初始化会打印两次结果的原因**：开发模式下，组件会渲染两次，所有会运行代码两次，打印两次结果

### 跳过组件的重新渲染 
[参考](../API/memo.md/#最小化-props-的变化)

### 记忆另一个 Hook 的依赖 
例子：
```js
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: 'whole-word', text };

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩 提醒：依赖于在组件主体中创建的对象
  // ...
```
useMemo() 的依赖包括 searchOptions，searchOptions 是一个包含 text props 的对象。  
那么每次渲染时，都会重新创建 searchOptions 对象，导致 useMemo 的依赖发生变更，也需要重新计算值。

解决办法是记忆 searchOptions 对象或者在 useMemo() 创建 searchOptions 对象，useMemo() 的依赖改为 text props
```js
// 1. 记忆 searchOptions
function Dropdown({ allItems, text }) {
  const searchOptions = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, [text]); // ✅ 只有当 text 改变时才会发生改变

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // ✅ 只有当 allItems 或 serachOptions 改变时才会发生改变
  // ...


// 2. useMemo() 创建 searchOptions 对象
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ 只有当 allItems 或者 text 改变的时候才会重新计算
  // ...
```


## 注意点
1. 如果 `useMemo` 没有设置依赖参数，那么每次组件渲染时，都会重新计算值
2. **不能在循环中**调用 `useMemo`

