- [使用 JSX 展开语法传递 props](#使用-jsx-展开语法传递-props)
- [将 JSX 作为子组件传递](#将-jsx-作为子组件传递)


# 使用 JSX 展开语法传递 props 
一些组件将它们所有的 props 转发给子组件，。因为这些组件不直接使用他们本身的任何 props，所以使用更简洁的“展开”语法是有意义的：
```js
// 这会将 Profile 的所有 props 转发到 Avatar
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

# 将 JSX 作为子组件传递
当您将内容嵌套在 JSX 标签中时，父组件将在名为 `children` 的 `prop` 中接收到该内容。

注意：**`prop` 的名字一定是 `children` ，是规定的，不能随意改。**

```js
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <div>
        hello world
      </div>
    </Card>
  );
}
```