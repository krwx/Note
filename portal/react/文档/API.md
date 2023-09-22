# forwardRef

# memo
`memo` 允许你在 `props` 没有变化的情况下跳过组件的重渲染。

**即使使用 `memo` ，如果它自己的 `state` 或正在使用的 `context` 发生更改，组件也会重新渲染。**

应该只将 memo 用作为性能优化。

只有当你的组件经常使用完全相同的 `props` 重新渲染时，并且其重新渲染逻辑是非常昂贵的，使用 `memo` 优化才有价值。

如果传递给组件的 `props` 始终不同，例如在渲染期间传递对象或普通函数，则 `memo` 是完全无用的。这就是为什么你通常需要在 `memo` 中同时使用 `useMemo` 和 `useCallback` 。

## 语法
```
memo(Component, arePropsEqual?) 
```
**参数**   
* `Component` ：要进行记忆化的组件。`memo` 不会修改该组件，而是返回一个新的、记忆化的组件。它接受任何有效的 React 组件，包括函数组件和 `forwardRef` 组件。
* 可选参数 `arePropsEqual`：一个**函数**，接受两个参数：组件的前一个 props 和新的 props。如果旧的和新的 props 相等，即组件使用新的 props 渲染的输出和表现与旧的 props 完全相同，则它应该返回 true。否则返回 false。通常情况下，你不需要指定此函数。默认情况下，React 将使用 Object.is 比较每个 prop。

**返回值**   
`memo` 返回一个新的 React 组件。它的行为与提供给 memo 的组件相同，**只是当它的父组件重新渲染时 React 不会总是重新渲染它，除非它的 props 发生了变化**。

```js
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```