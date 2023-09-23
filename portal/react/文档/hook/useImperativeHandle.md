- [useImperativeHandle](#useimperativehandle)
  - [语法](#语法)
  - [使用](#使用)
    - [向父组件暴露一个自定义的 ref 句柄](#向父组件暴露一个自定义的-ref-句柄)
    - [暴露你自己的命令式方法](#暴露你自己的命令式方法)

# useImperativeHandle
`useImperativeHandle` 能让你自定义由 `ref` 暴露出来的句柄。  
即暴露一个更加受限制的方法集，而**不是暴露整个 DOM 节点**。

## 语法
`useImperativeHandle(ref, createHandle, dependencies?) `

参数 
* `ref`：该 `ref` 是你从 **forwardRef 渲染函数** 中获得的第二个参数。

* `createHandle`：该函数无需参数，它返回你想要暴露的 ref 的句柄。该句柄可以包含任何类型。通常，你会返回一个包含你想暴露的方法的对象。

* 可选的 `dependencies`：函数 `createHandle` 代码中所用到的所有反应式的值的列表。反应式的值包含 props、状态和其他所有直接在你组件体内声明的变量和函数。倘若你的代码检查器已 为 React 配置好，它会验证每一个反应式的值是否被正确指定为依赖项。该列表的长度必须是一个常数项，并且必须按照 [dep1, dep2, dep3] 的形式罗列各依赖项。React 会使用 Object.is 来比较每一个依赖项与其对应的之前值。**如果一次重新渲染导致某些依赖项发生了改变，或你没有提供这个参数列表，你的函数 `createHandle` 将会被重新执行，而新生成的句柄则会被分配给 ref**。

## 使用
### 向父组件暴露一个自定义的 ref 句柄 
1. 子组件定义一个额外的 `ref` 属性，并传给想要暴露的 DOM 节点
2. 使用 `useImperativeHandle hook`，第一个 `ref` 参数使用 `forwardRef hook` 传过来的 `ref`
3. 在 `useImperativeHandle hook` 的第二个 `createHandle` 参数定义要暴露的属性或方法
4. 父组件通过 `ref.current` 调用暴露的方法或属性

```js
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  // 1. 定义一个额外的 `ref` 属性
  const inputRef = useRef(null);

  // 2. 第一个 `ref` 参数使用 `forwardRef hook` 传过来的 `ref`
  useImperativeHandle(ref, () => {
    // 3. 定义本组件的 ref 要暴露的方法或属性（返回一个对象）
    return {
      focus() {
        inputRef.current.focus();
      },
      style: inputRef.current.style,
    };
  }, []);

  // 1. 本组件的 ref 传给想要暴露的 DOM 节点
  return <input {...props} ref={inputRef} />;
});

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    // 4. 父组件使用暴露的方法或属性
    ref.current.focus();
    ref.current.style.width = "200px";

    // 运行下面语句会报错，因为没有暴露 scrollIntoView 方法
    // ref.current.scrollIntoView();
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

### 暴露你自己的命令式方法 
在定义要暴露的方法或属性时，可以使用自定义的名称暴露，不一定用规定的名称。
```js
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      // 这里将 focus() 改为自定义的 focusInput()
      focusInput() {
        inputRef.current.focus();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```