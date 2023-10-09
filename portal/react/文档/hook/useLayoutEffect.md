- [useLayoutEffect](#uselayouteffect)
  - [语法](#语法)
  - [用法](#用法)
    - [在浏览器重新绘制屏幕前计算布局](#在浏览器重新绘制屏幕前计算布局)
  - [执行顺序](#执行顺序)

# useLayoutEffect
useLayoutEffect 是 useEffect 的一个版本，**在浏览器重新绘制屏幕之前触发**。

`useLayoutEffect` 内部的代码和所有计划的状态更新阻塞了浏览器重新绘制屏幕。如果过度使用，这会使你的应用程序变慢。

## 语法
`useLayoutEffect(setup, dependencies?) `

参数与 `useEffect` 一致

## 用法
### 在浏览器重新绘制屏幕前计算布局 
看官网吧 [参考](https://react.docschina.org/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)

## 执行顺序
1. 晚于组件进行渲染的代码
2. 先于 `useEffect()` 
3. 多个 `useLayoutEffect` 的执行顺序就是 `useLayoutEffect` **在函数体里声明的顺序**

个人理解：就是组件正常渲染后，打算通过 DOM 操作更新到页面上前，多了 `useLayoutEffect` 这一步。在这一步可以再通过 `setState` 等操作再更新页面，然后浏览器再进行绘制。