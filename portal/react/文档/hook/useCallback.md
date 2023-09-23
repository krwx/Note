- [useCallback](#usecallback)
  - [语法](#语法)
  - [用法](#用法)
    - [为什么使用 useCallback](#为什么使用-usecallback)

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

**返回值**  
* 在初次渲染时， `useCallback` 返回你已经传入的 `fn` 函数

在之后的渲染中, 如果依赖没有改变， `useCallback` 返回上一次渲染中缓存的 `fn` 函数；否则返回这一次渲染传入的 `fn`。

## 用法
### 为什么使用 useCallback
