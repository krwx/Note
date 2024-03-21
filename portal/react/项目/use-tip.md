# use-tip

- [use-tip](#use-tip)
  - [React](#react)
    - [1. 给 html 元素设置 class，不能设置 class 属性，要设置 className 属性](#1-给-html-元素设置-class不能设置-class-属性要设置-classname-属性)
    - [2. useEffect 最后返回的是取消副作用的函数或箭头函数。函数内执行取消副作用的代码](#2-useeffect-最后返回的是取消副作用的函数或箭头函数函数内执行取消副作用的代码)
    - [3. 在组件 return 的地方使用 {} ， {} 里面的是要渲染的 JSX ，不能在里面声明函数或声明变量， 要确保里面的代码是都与 JSX 有关的](#3-在组件-return-的地方使用----里面的是要渲染的-jsx-不能在里面声明函数或声明变量-要确保里面的代码是都与-jsx-有关的)
    - [4. 传递给事件处理函数的函数应直接传递，而非调用](#4-传递给事件处理函数的函数应直接传递而非调用)
    - [5. style 属性接受一个对象](#5-style-属性接受一个对象)
    - [6. 父组件使用子组件的方法](#6-父组件使用子组件的方法)
    - [7. 通过数组的 map 方法返回 react 元素](#7-通过数组的-map-方法返回-react-元素)
    - [8. 新建组件的 js 文件](#8-新建组件的-js-文件)
  - [TypeScript](#typescript)
    - [1. 使用父组件传递的方法](#1-使用父组件传递的方法)
  - [other](#other)

## React

### 1. 给 html 元素设置 class，不能设置 class 属性，要设置 className 属性

### 2. useEffect 最后返回的是取消副作用的函数或箭头函数。函数内执行取消副作用的代码

### 3. 在组件 return 的地方使用 {} ， {} 里面的是要渲染的 JSX ，不能在里面声明函数或声明变量， 要确保里面的代码是都与 JSX 有关的

### 4. 传递给事件处理函数的函数应直接传递，而非调用

正常函数：

- 正确：`<button onClick={handleClick}>`
- 错误：`<button onClick={handleClick()}>`

内联函数：

- 正确：`<button onClick={() => alert('...')}>`
- 错误：`<button onClick={alert('...')}>`

### 5. style 属性接受一个对象

```js
// 直接写样式
Button onClick={addUser} style={{marginBottom: "20px"}}>添加用户</Button>

// 传递对象
const obj: React.CSSProperties = {
    marginBottom: "20px"
}
<Button onClick={addUser} style={obj}>添加用户</Button>
```

### 6. 父组件使用子组件的方法

1. 使用 `ref` 获取子组件 `DOM` 节点的实例
2. 子组件使用 `useImperativeHandle()` 暴露对应方法给父组件

### 7. 通过数组的 map 方法返回 react 元素

记住为 `arr.map(value => (element))` ，而不是 `arr.map(value => {element})` 。用 `(element)` 才表示为返回 react 元素

### 8. 新建组件的 js 文件

文件名开头为大写字母

## TypeScript

### 1. 使用父组件传递的方法

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

## other

怎么自定义 hook 读取 localstorage

useReducer 返回的值不能直接返回原来的值，以数组为例，最后要返回新的数组: `[...arr]`

***

函数没有用到的入参数，在前面加 `_`

***

file-saver:

安装：

```shell
npm install file-saver --save

# Additional typescript definitions 
npm install @types/file-saver --save-dev
```

语法：

Import saveAs() from file-saver

```js
import { saveAs } from 'file-saver';
```

```js
FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
```

- 第一个参数为 Blob/File/Url 类型的数据
- 第二个参数为可选参数，为保存的文件的名称
- 第三个参数：Pass { autoBom: true } if you want FileSaver.js to automatically provide Unicode text encoding hints (see: byte order mark). Note that this is only done if your blob type has charset=utf-8 set.

```js
// Saving text
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
saveAs(blob, "hello world.txt");

// save file
var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(file);
```

```js
    function exportNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        const columnArr = ["id", "title", "body", "updated"];
        let str = columnArr.join(',');
        // 通过循环拿出data数据源里的数据，并塞到str中
        for (const item of notes) {
            str += '\n ';
            for (const item1 of columnArr) {
                str += `${(typeof item[item1] === 'string' && item[item1].replace(/[\n\r\s\t,]/g, ' ')) || item[item1]},`;
            }
        }
        // Excel打开后中文乱码添加如下字符串解决
        const exportContent = '\uFEFF';
        const blob = new Blob([exportContent + str], {
            type: 'text/plain;charset=utf-8',
        });
        saveAs(blob, `demo.csv`, true);
    }
```

***

useReducer 和 useContext 搭配使用，总结 useReducer、useContext、和官网教程

总结 ts 怎么使用

export 了一个 function 的组件不能再 export 方法？

要给 action 添加类型

```js
type NotesAction = {
    type: string,
    id: number,
    title: string,
    body: string,
    updated: string,
    notes?: Note[]
}
```

***

children: React.ReactNode;

children 的类型如上

```js
type Props = {
    children: React.ReactNode;
};

//这样给 children 属性添加类型
export function NotesProvider({ children }: Props) {}
```

***

antd 使用 uploader

accept 属性接受哪些值

用户选择了文件，怎么读取文件的内容

通过 FileReader 对象读取，在 onload 事件读取 Blob 类型的数据。

```js
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target?.result;
                    console.log(data)
                }
                reader.readAsText(info.file.originFileObj as Blob);
```

```js
const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // read csv File
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target?.result;
                    const arr = data?.toString().split("\n") || [];

                    const result: Note[] = [];

                    for (let i = 1; i < arr.length; i++) {
                        const tempNoteArr = arr[i].split(",") || [];
                        result.push({
                            id: Number(tempNoteArr[0]),
                            title: tempNoteArr[1],
                            body: tempNoteArr[2],
                            updated: tempNoteArr[3],
                        })
                    }

                    const action = {
                        type: 'import',
                        id: 0,
                        title: "",
                        body: "",
                        updated: "",
                        notes: result
                    }
                    dispatch && dispatch(action);
            
                    const activeNoteAction = {
                        ...result[0],
                        type: "changed"
                    }
                    activeNoteDispatch && activeNoteDispatch(activeNoteAction);
                }
                reader.readAsText(info.file.originFileObj as Blob);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
```

***

`new Date().toISOString()`

```js
new Date(note.updated).toLocaleString(undefined, {
                                dateStyle: "full",
                                timeStyle: "short",
                            })
```

***

如果一个方法有可能为 null，通过 `method && method()` 调用

***

表单元素，例如 input，如果提供了 value ，那么就要使用 onChange 方法，在方法内设置输入框对应的 state

一个表单元素要对应一个 state ，表单元素的 state 如果发生改变，要在 onChange 方法 setState

表单元素的事件的类型定义如下，不同表单元素取不同的 Element ：

```js
    function titleChanged(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function bodyChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setBody(event.target.value);
    }
```

***

`const deleteNote = useRef({} as Note);`

***

className 的写法

```jsx
 const itemClassName = "notes__list-item" + " " + (activeNote.id == note.id ? "notes__list-item--selected" : "");

 reutrn (<div className={itemClassName}</div>)
```

***

调用 confirm

```js
const doDelete = confirm("确认要删除该笔记吗?");

if (doDelete) {
    noteDispatch && noteDispatch({
        type: "deleted",
        ... note
    })
    const currentActiveNote = notes.find(t => t.id !== note.id);
    if (currentActiveNote) {
        activeNoteDispatch && activeNoteDispatch({
            type: "changed",
            ... currentActiveNote
        })
    }
}
```
