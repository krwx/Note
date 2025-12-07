# forwardRef

- [forwardRef](#forwardref)
  - [语法](#语法)
  - [用法](#用法)
    - [将 DOM 节点暴露给父组件](#将-dom-节点暴露给父组件)
    - [在多个组件中转发 ref](#在多个组件中转发-ref)
    - [暴露一个命令式句柄而不是 DOM 节点](#暴露一个命令式句柄而不是-dom-节点)

`forwardRef` 允许你的组件使用 `ref` 将一个 `DOM` 节点暴露给**父组件**。

## 语法

`forwardRef(render)`  

参数

- `render`：**组件的渲染函数**。React 会调用该函数**并传入父组件传递来的参数和 ref**。返回的 JSX 将成为组件的输出。render 函数的参数如下：
  - `props`：父组件传递过来的参数。
  - `ref`：父组件传递的 ref 属性。ref 可以是一个对象或函数。如果父组件没有传递一个 ref，那么它将会是 null。你应该将接收到的 ref 转发给另一个组件，或者将其传递给 useImperativeHandle。

返回值

- `forwardRef` 返回一个可以在 JSX 中渲染的 React 组件。与作为纯函数定义的 React 组件不同，forwardRef 返回的组件还能够接收 `ref` 属性。

使用 `forwardRef()` 来让你的组件接收一个 ref 并将其传递给一个子组件：

```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <label>
      {props.label}
      <input ref={ref} />
    </label>
  );
});
```

## 用法

### 将 DOM 节点暴露给父组件

1、将子组件定义包装在 `forwardRef()` 中  
2、将在 `props` 之后收到一个 `ref` 作为第二个参数。将其传递到要公开的 `DOM` 节点中  
3、父组件访问 `ref`，通过 `ref.current` 访问 `DOM` 节点

```jsx
import { forwardRef, useRef } from 'react';

// 1、将子组件定义包装在 forwardRef() 中  
const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      // 2. 将 ref 传递到要公开的 DOM 节点中  
      <input {...otherProps} ref={ref} />
    </label>
  );
});

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    // 3. 父组件访问 ref
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

### 在多个组件中转发 ref

多个组件通过 `forwardRef()` 包装来传递 `ref`

```js
// Form 的 ref 属性传递给了 FormField，然后 FormField 传递给了 MyInpuut，然后 MyInput 传递给了 input 元素。Form 获取了 input 的引用
const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <input ref={ref} />
  );
});

const FormField = forwardRef(function FormField(props, ref) {
  return (
    <MyInput ref={ref} />
  );
});

const Form = function Form(props) {
  const ref = useRef(null)
  return (
    <FormField ref={ref} />
  );
};
```

### 暴露一个命令式句柄而不是 DOM 节点

使用 `useImperativeHandle hook` 实现。[参考](../hook//useImperativeHandle.md)
