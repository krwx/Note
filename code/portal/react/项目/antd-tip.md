# antd-tip

- [antd-tip](#antd-tip)
  - [模态框](#模态框)
    - [API](#api)
    - [不需要页脚](#不需要页脚)
  - [表单](#表单)
    - [FormInstance](#forminstance)
      - [获取表单实例](#获取表单实例)
      - [FormInstance 方法](#forminstance-方法)
        - [`resetFields`](#resetfields)
        - [`setFields`](#setfields)
        - [`validateFields`](#validatefields)
    - [modal 关闭后 form 状态没有重设的问题](#modal-关闭后-form-状态没有重设的问题)
    - [上传文件](#上传文件)

## 模态框

### API

- destroyOnClose
  - 关闭时销毁 Modal 里的子元素
  - `<Modal />` 默认关闭后状态不会自动清空，如果希望每次打开都是新内容，请设置 `destroyOnClose`。
  - `<Modal />` 和 `Form` 一起配合使用时，设置 `destroyOnClose` 也不会在 `Modal` 关闭时销毁表单字段数据，需要设置 `<Form preserve={false} />`。

### 不需要页脚

设置 `footer` 为 `null`

## 表单

### FormInstance

#### 获取表单实例

```tsx
import { Form } from 'antd';
const [formInstance] = Form.useForm();
```

#### FormInstance 方法

##### `resetFields`

重置一组字段到 `initialValues`

##### `setFields`

设置一组字段状态

```js
formInstance.setFields([
    // { name: '表单字段name', value: '需要设置的值', errors: ['错误信息'] }, 当 errors 为非空数组时，表单项呈现红色，
    { name: "password", value: "",  errors: [] }
])
```

- 取消表单错误状态：设置 `errors` 为空数组

##### `validateFields`

触发表单验证，设置 `recursive` 时会递归校验所有包含的路径：

- 验证成功会返回表单的值
- 验证失败返回错误信息

### modal 关闭后 form 状态没有重设的问题

**问题：**

- 使用 `antd` 时，有一个模态框，里面有一个表单。想要实现的功能是模态框打开后，能够重设表单的状态。想法是将是否显示模态框的 `state （isModalOpen）`传递给表单组件，表单组件通过 `useEffect` 监听 `isModalOpen` 是否变化，如果变化了就重设表单。但是打开模态框后表单的状态不变

**原因：**

1. 首先 `Modal` 在关闭时会将内容进行 `memo` 从而避免关闭过程中的内容跳跃。所以重新打开模态框后，`isModalOpen state` 前后的值是一样的，所以 `useEffect` 没有生效

**解决：**

1. 第一个方法。`Modal` 设置 `destroyOnClose`。关闭模态框后销毁模态框内的组件，同时 `form` 设置 `preserve` 为 `false`
2. 第二个方法。`Modal` 通过 `Form.useForm()` 创建 `form` 的实例，将实例传递给 `form` 组件的 `form` 属性。`modal` 通过 `useEffect` 监听 `isModalOpen state`，当打开模态框时，调用 `form` 实例的 `setFiels()` 方法设置表单状态。

Modal.tsx

```tsx
const Modal = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formInstance] = Form.useForm();

    useEffect(() => {
        if (isModalOpen) {
            // formInstance.resetFields();
            formInstance.setFields([
                { name: "password", value: "",  errors: [] }
            ])
        }
    }, [isModalOpen, formInstance])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button onClick={showModal}>打开模态框</Button>
            <Modal title="模态框"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}>
                {/* 表单组件，传递 form 实例 */}
                <UserForm form={formInstance}/>
            </Modal>
        </div>
    )
}
export default Modal
```

UserForm.tsx

```tsx
const UserForm = ({ form }: Props) => {
    return (
        <div>
            <Form
                {/* 传递 form 实例给 form 属性 */}
                form={form}
                name="添加用户"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">登录</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserForm
```

### 上传文件

antd手动上传文件

```tsx
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

const app = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        // 设置 beforeUpload 回调，并返回 false 阻止组件自动发请求给服务器
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
        accept: 'image/*'
    };

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>请上传封面图片</Button>
        </Upload>
    )
}
```

File 对象存放在表单的 values 对于字段的 file 属性中。
