# react

1. e.preventDefault()  
    - 阻止默认操作。不阻止冒泡？
2. e.stopPropagation  
    - 阻止冒泡，即阻止事件传递给父元素
3. ES6 计算属性名称的语法  
    - 例如：  
        this.setState({  
            [name]: value  
        });  
    - 等同 ES5:  
        var partialState = {};  
        partialState[name] = value;  
        this.setState(partialState);
4. React.Fragment  
    - 用于分组，而且不向dom树添加任何节点，用于子组件分组内部dom元素用。
    与<></>用途一样，但是<React.Fragment></React.Fragment>可以添加属性
5. htmlFor  
    1. 对应的是`<label>` 标签的 for 属性。for 属性规定 label 与哪个表单元素绑定。
    2. 效果：点击标签，那么对应的表单元素就会获取焦点
6. hook  
    - const [title, setTitle] = useState('');  
    - 定义本组件的state，其中setTitle为设置title这个state的方法
7. %PUBLIC_URL%  
    - 在React中， %PUBLIC_URL%代表：public的文件夹的绝对路径。
8. 了解react的路由导航  
    1. 页面上添加link，添加超链接，指定导航路径
    2. 在方法内导航，用useHistory.push(路径)，导航
    3. 组件的方法内的match是结构props属性得到的
9. 使用useSelector
    - 我们知道每发起一个 action 都将运行 useSelector，如果我们返回一个新的引用值，它会强制组件重新渲染。
    - 我们在 useSelector 钩子中调用了 filter()，以便只返回属于该用户的帖子列表。不幸的是，这意味着 useSelector 总会 返回一个新的数组，所以 每次 执行以上操作我们的组件都将重新渲染，即使返回的数据并没有发生改变！
10. [React 的默认行为是当父组件渲染时，React 会递归渲染其中的所有子组件！]
11. React.memo
    - 如果您的组件在给定相同的 props 的情况下呈现相同的结果，您可以将其包装在调用中以React.memo在某些情况下通过记忆结果来提高性能。这意味着 React 将跳过渲染组件，并重用上次渲染的结果。
    - 相当于将函数组件变成PureComponent
