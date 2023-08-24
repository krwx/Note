- [1. 触发页面更新有哪些API](#1-触发页面更新有哪些api)
- [2. React的优化方法](#2-react的优化方法)



## 1. 触发页面更新有哪些API
触发状态更新：
* ReactDOM.render —— HostRoot
* this.setState —— ClassComponent
* this.forceUpdate —— ClassComponent
* useState —— FunctionComponent
* useReducer —— FunctionComponent

## 2. React的优化方法
1. 使用纯组件：pureComponent
2. 使用 React.memo 进行组件记忆
3. 懒加载组件
4. 使用 React Fragments 避免额外标记
5. 不要使用内联函数定义
   1. 如果我们使用内联函数，则每次调用“render”函数时都会创建一个新的函数实例。
6. 避免使用内联样式属性
   1. 使用内联样式时浏览器需要花费更多时间来处理脚本和渲染，因为它必须映射传递给实际 CSS 属性的所有样式规则。
   2. 更好的办法是将 CSS 文件导入组件。
7. 优化 React 中的条件渲染
   1. 当多种条件进行渲染时都有相同的组件需要渲染，可以将该组件拿出来，只对需要进行条件渲染的组件设置条件
8. render 函数应保持纯净
   1. 不要在 render 函数使用 setState 或者其他影响状态的方法
9. 迭代的时候给组件设置 key
10. 用 CSS 动画代替 JavaScript 动画
11. 使用 Web Workers 处理 CPU 密集任务

