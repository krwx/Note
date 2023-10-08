## 1. 你知道Hook是什么吗？有哪些
## 2. 你知道diff算法是什么吗？原理是什么
## 3. 你知道fiber是什么吗？（控制CPU资源的）

## 4. 了解 virtual dom 吗
## 5. diff 算法原理是什么

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
## 9. 讲一下 react 优化的方法
## 10. 讲一下virtual dom
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