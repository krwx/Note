# quick-start

- [quick-start](#quick-start)
  - [创建项目](#创建项目)
  - [React Router](#react-router)
  - [Redux](#redux)

## 创建项目

安装包：

```shell
npm install -g create-react-app
```

创建项目：

```shell
// js
create-react-app [项目名称] 

举例： create-react-app reactapp

// ts
npx create-react-app [项目名称] --template typescript

// vite 创建 react 项目
npm create vite@latest [name-of-your-project] -- --template react

# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

引入 antd：

```js
npm install antd --save

// js文件
import { Button } from 'antd'
```

普通js文件：

```js
import React from "react";

const Upload = () => {
    return (
        <div>this is upload</div>
    )
}
export default Upload;

// 或者
export default function Upload() {
    return (
        <div>this is upload</div>
    )
}
```

## React Router

安装

```shell
npm install react-router-dom localforage match-sorter sort-by
```

使用

```js
// App.js
import IndexRouter from './router/indexRouter';

function App() {
  return (
    <div>
      <IndexRouter />
    </div>
  );
}

// indexRouter.js
import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../view/home';
import Upload from '../view/upload';
import User from '../view/user';
import Video from '../view/video';

export default function IndexRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route index element={'hello, this is index'} />
                    <Route path='/upload' element={<Upload />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/video' element={<Video />} />
                </Route>
            </Routes>
        </Router>
    )
}

// Home.js
const Home = () => {
  return (
    <Outlet />
  );
};
```

设置路由输出：

```js
import { Outlet } from "react-router-dom";

<Outlet />
```

导航到指定路由：

```js
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// 点击按钮的回调事件
const onClick = (item) => {
    // 参数为路由路径
    navigate(item.key);
}
```

## Redux

安装

```shell
npm install @reduxjs/toolkit -S
npm install react-redux -S
```

使用 `Redux Toolkit` 的写法

创建 slice：

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
      loadingChange(state, action) {
        return action.payload;
      }
    }
})
// 导出 action , 这样别的组件才能 disaptch action
export const { loadingChange } = loadingSlice.actions;
// 默认导出 reducer, 用于初始化 store
export default loadingSlice.reducer;
```

配置 store：

```js
import { configureStore } from '@reduxjs/toolkit'
// 导入 slice 的 reducer
import LoadingReducer from './loadingSlice'

export default configureStore({
  reducer: {
    loading: LoadingReducer
  }
})
```

App 导入 store：

```js
import { Provider } from 'react-redux'
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      ...
    </Provider>
  );
}

export default App;
```

disaptch action：

```js
import React from "react";
import { Button } from 'antd';
// 引入 dispatch
import { useDispatch, useSelector } from 'react-redux';
// 引入 action
import { loadingChange } from '../redux/loadingSlice'; 

const User = () => {
    const loading = useSelector(state => state.loading);
    // 发送事件
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(loadingChange(!loading));
    }

    return (
        <Button type='primary' onClick={onClick}>test</Button>
    )
}
export default User;
```

获取数据：

```js
import { useSelector } from 'react-redux';

const loading = useSelector(state => state.loading);
```
