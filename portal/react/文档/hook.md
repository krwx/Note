# useState

# useEffect
## 使用

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

# useLayoutEffect


# useReducer
# useRef
在页面渲染后运行
# useDeferredValue

# useMemo