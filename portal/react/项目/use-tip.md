- [React](#react)
  - [给 html 元素设置 class，不能设置 class 属性，要设置 className 属性](#给-html-元素设置-class不能设置-class-属性要设置-classname-属性)
  - [useEffect 最后返回的是取消副作用的函数或箭头函数。函数内执行取消副作用的代码](#useeffect-最后返回的是取消副作用的函数或箭头函数函数内执行取消副作用的代码)
  - [在组件 return 的地方使用 {} ， {} 里面的是要渲染的 JSX ，不能在里面声明函数或声明变量， 要确保里面的代码是都与 JSX 有关的](#在组件-return-的地方使用----里面的是要渲染的-jsx-不能在里面声明函数或声明变量-要确保里面的代码是都与-jsx-有关的)
  - [传递给事件处理函数的函数应直接传递，而非调用](#传递给事件处理函数的函数应直接传递而非调用)
  - [style 属性接受一个对象](#style-属性接受一个对象)
  - [父组件使用子组件的方法](#父组件使用子组件的方法)
- [TypeScript](#typescript)
  - [使用父组件传递的方法](#使用父组件传递的方法)
- [antd](#antd)
  - [模态框](#模态框)
    - [不需要页脚](#不需要页脚)

# React

## 给 html 元素设置 class，不能设置 class 属性，要设置 className 属性

## useEffect 最后返回的是取消副作用的函数或箭头函数。函数内执行取消副作用的代码

## 在组件 return 的地方使用 {} ， {} 里面的是要渲染的 JSX ，不能在里面声明函数或声明变量， 要确保里面的代码是都与 JSX 有关的

## 传递给事件处理函数的函数应直接传递，而非调用
正常函数：
- 正确：`<button onClick={handleClick}>`	
- 错误：`<button onClick={handleClick()}>`

内联函数：
- 正确：`<button onClick={() => alert('...')}>`	
- 错误：`<button onClick={alert('...')}>`

## style 属性接受一个对象
```js
// 直接写样式
Button onClick={addUser} style={{marginBottom: "20px"}}>添加用户</Button>

// 传递对象
const obj: React.CSSProperties = {
    marginBottom: "20px"
}
<Button onClick={addUser} style={obj}>添加用户</Button>
```

## 父组件使用子组件的方法
1. 使用 `ref` 获取子组件 `DOM` 节点的实例
2. 子组件使用 `useImperativeHandle()` 暴露对应方法给父组件


# TypeScript
## 使用父组件传递的方法
```js
// add 方法是可选参数
type Props = {
    add?: Function
}

const UserForm = ({ add }: Props) => {
    return (
        // 错误：这样会报提示：Cannot invoke an object which is possibly 'undefined'. 因为 add 参数可能不存在
        <Button type="primary" htmlType="button" onClick={() => add()}>取消</Button>

        // 正确：需要对 add 参数进行判空再执行 add() 
        <Button type="primary" htmlType="button" onClick={() => add && add()}>取消</Button>
    )
}
```