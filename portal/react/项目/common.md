## 创建项目
安装包：
```
npm install -g create-react-app
```

创建项目：
```
// js
create-react-app [项目名称] 

举例： create-react-app reactapp

// ts
npx create-react-app [项目名称] --template typescript
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
```