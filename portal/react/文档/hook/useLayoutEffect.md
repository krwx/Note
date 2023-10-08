- [useLayoutEffect](#uselayouteffect)
  - [语法](#语法)
  - [用法](#用法)
    - [在浏览器重新绘制屏幕前计算布局](#在浏览器重新绘制屏幕前计算布局)

# useLayoutEffect
useLayoutEffect 是 useEffect 的一个版本，**在浏览器重新绘制屏幕之前触发**。

`useLayoutEffect` 内部的代码和所有计划的状态更新阻塞了浏览器重新绘制屏幕。如果过度使用，这会使你的应用程序变慢。

## 语法
`useLayoutEffect(setup, dependencies?) `

参数与 `useEffect` 一致

## 用法
### 在浏览器重新绘制屏幕前计算布局 
