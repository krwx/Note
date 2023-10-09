- [createPortal](#createportal)
  - [语法](#语法)
  - [用法](#用法)
    - [渲染到 DOM 的不同部分](#渲染到-dom-的不同部分)

# createPortal
`createPortal` 允许你将 `JSX` 作为 `children` 渲染至 `DOM` 的不同部分。

## 语法
`createPortal(children, domNode, key?) `

调用 `createPortal` 创建 portal，并传入 JSX 与实际渲染的目标 DOM 节点

参数 
- `children` ：
  - React 可以渲染的任何内容，如 JSX 片段（`<div />` 或 `<SomeComponent />` 等等）、`Fragment`（`<>...</>`）、字符串或数字，以及这些内容构成的数组。
- `domNode` ：
  - 某个已经存在的 DOM 节点，例如由 `document.getElementById()` 返回的节点。在更新过程中传递不同的 DOM 节点将导致 portal 内容被重建。
- 可选参数 `key` ：
  - 用作 portal key 的独特字符串或数字。

返回值 
- `createPortal` 返回一个可以包含在 JSX 中或从 React 组件中返回的 **`React` 节点**。如果 React 在渲染输出中遇见它，它将把提供的 children 放入提供的 domNode 中。
- **需要把 `createPortal` 返回的值放到 render 的代码里才能渲染页面**

## 用法
### 渲染到 DOM 的不同部分 
```jsx
import { createPortal } from 'react-dom';

function MyComponent() {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>这个子节点被放置在父节点 div 中。</p>
      {createPortal(
        <p>这个子节点被放置在 document body 中。</p>,
        document.body
      )}
    </div>
  );
}
```