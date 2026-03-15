# Props

- [Props](#props)
  - [Props 声明](#props-声明)
  - [监听 Props (my)](#监听-props-my)
  - [响应式 Pros 解构 (3.5+)](#响应式-pros-解构-35)
    - [将解构的 props 传递到函数中](#将解构的-props-传递到函数中)
  - [传递 prop 的细节](#传递-prop-的细节)
    - [Prop 名字格式](#prop-名字格式)
    - [静态 vs. 动态 Props](#静态-vs-动态-props)
    - [传递不同的值类型](#传递不同的值类型)
    - [使用一个对象绑定多个 prop](#使用一个对象绑定多个-prop)
  - [单向数据流](#单向数据流)
  - [Prop 校验](#prop-校验)
    - [运行时类型检查](#运行时类型检查)
    - [可为 null 的类型](#可为-null-的类型)
  - [Boolean 类型转换](#boolean-类型转换)

## Props 声明

使用 `defineProps()` 宏来声明:

1. 字符串数组形式

   ```js
    <script setup>
        const props = defineProps(['foo'])
        console.log(props.foo)
    </script>
   ```

2. 对象形式

   ```js
    // 使用 <script setup>
    const props = defineProps({
        title: String,
        likes: Number
    })
    console.log(props.title)
   ```

   以对象形式声明中的每个属性，`key` 是 `prop` 的名称，而值则是该 `prop` 预期类型的构造函数。

## 监听 Props (my)

严格说：`props.foo` **不是一个独立的响应式数据源类型（不是 `ref` / `reactive` 对象）**，但它是**响应式对象 `props` 上的响应式属性访问**。

所以：

1、在 `computed`、`watchEffect`、模板里读取 `props.foo`：有响应性（会被追踪）。

```js
const x = computed(() => props.foo + '!')

watchEffect(() => {
  console.log(props.foo)
})

{{ props.foo }}
```

2、作为 `watch` 第一个参数直接写 `watch(props.foo, ...)`：不行，因为 `watch` 的第一个参数需要是“响应式数据源”，但是传入的是“当前值”，不是可追踪的数据源。

```js
// 错误
watch(props.foo, callback)
```

`watch` 正确写法是：

```js
watch(() => props.foo, callback)
// 或
watch(toRef(props, 'foo'), callback)
```

## 响应式 Pros 解构 (3.5+)

在**计算属性或侦听器**中访问 `props.foo` 时，`foo` 属性将被跟踪为依赖项。

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 在 "foo" prop 变化时重新执行
  console.log(foo)
})
```

为什么可以这样写，因为 Vue 编译器自动在前面添加 props.。因此，上面的代码等同于以下代码：

```js
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` 由编译器转换为 `props.foo`
  console.log(props.foo)
})
```

computed 和模板使用例子：

```js
const { foo } = defineProps(['foo'])

const x = computed(() => foo + '!')

{{ foo }}
```

可以使用 JavaScript 原生的默认值语法声明 props 默认值:

```js
const { foo = 'hello' } = defineProps<{ foo?: string }>()
```

### 将解构的 props 传递到函数中

当我们将解构的 prop 传递到函数中时，例如：

```js
const { foo } = defineProps(['foo'])

watch(foo, /* ... */)
```

这并不会按预期工作，因为它等价于 `watch(props.foo, ...)`——我们给 watch 传递的是一个值而不是响应式数据源。实际上，Vue 的编译器会捕捉这种情况并发出警告。

与使用 `watch(() => props.foo, ...)` 来侦听普通 prop 类似，我们也可以通过将其包装在 getter 中来侦听解构的 prop：

```js
watch(() => foo, /* ... */)
```

此外，当我们需要传递解构的 prop 到外部函数中并保持响应性时，这是推荐做法：

```js
useComposable(() => foo)
```

## 传递 prop 的细节

### Prop 名字格式

`prop` 的名字应使用 `camelCase` 形式。

```js
defineProps({
  greetingMessage: String
})
```

```html
<span>{{ greetingMessage }}</span>
```

在向子组件传递 `props` 时可以使用 `camelCase` 形式 (使用 DOM 模板时例外)，但实际上为了和 `HTML attribute` 对齐，我们通常会将其写为 `kebab-case` 形式：

```html
<MyComponent greeting-message="hello" />
```

传递 props 时，camelCase 形式和 kebab-case 形式都可以，但是推荐 kebab-case 形式。

### 静态 vs. 动态 Props

静态 props：

```html
<BlogPost title="My journey with Vue" />
```

使用 v-bind 或缩写 : 来进行动态绑定的 props

```html
<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title" />

<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### 传递不同的值类型

number：

```html
<!-- 虽然 `42` 是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :likes="42" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :likes="post.likes" />
```

boolean：

```html
<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />

<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :is-published="false" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :is-published="post.isPublished" />
```

Array：

```html
<!-- 虽然这个数组是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :comment-ids="post.commentIds" />
```

Object:

```html
<!-- 虽然这个对象字面量是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :author="post.author" />
```

### 使用一个对象绑定多个 prop

如果你想要将一个对象的所有属性都当作 `props` 传入，你可以使用没有参数的 `v-bind`，即只使用 `v-bind` 而非 `:prop-name`。

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}

<BlogPost v-bind="post" />

// 等价于
<BlogPost :id="post.id" :title="post.title" />
```

## 单向数据流

所有的 `props` 都遵循着单向绑定原则，`props` 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。

子组件不允许修改 `props`，如果修改则会报错。  
即使子组件可以更改对象 / 数组类型的 `props`（因为是引用传递），但是也不要修改

导致你想要更改一个 `prop` 的需求通常来源于以下两种场景：

1. `prop` 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是**新定义一个局部数据属性，从 `props` 上获取初始值即可**：

    ```js
    const props = defineProps(['initialCounter'])

    // 计数器只是将 props.initialCounter 作为初始值
    // 像下面这样做就使 prop 和后续更新无关了
    const counter = ref(props.initialCounter)
    ```

2. 需要对传入的 `prop` 值做进一步的转换。在这种情况中，最好是基于该 `prop` 值定义一个**计算属性**：

    ```js
    const props = defineProps(['size'])

    // 该 prop 变更时计算属性也会自动更新
    const normalizedSize = computed(() => props.size.trim().toLowerCase())
    ```

## Prop 校验

向 `defineProps()` 宏提供一个带有 `props` 校验选项的对象，例如：

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```

补充细节：

- 所有 `prop` 默认都是可选的，除非声明了 `required: true`。
- 除 `Boolean` 外的未传递的可选 `prop` 将会有一个默认值 `undefined`。
- `Boolean` 类型的未传递 `prop` 将被转换为 `false`。这可以通过为它设置 `default` 来更改——例如：设置为 `default: undefined` 将与非布尔类型的 `prop` 的行为保持一致。
- 如果声明了 `default` 值，那么在 `prop` 的值被解析为 `undefined` 时，无论 `prop` 是未被传递还是显式指明的 `undefined`，都会改为 `default` 值。

### 运行时类型检查

校验选项中的 `type` 可以是下列这些原生构造函数：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- `Error`

另外，`type` 也可以是自定义的类或构造函数，Vue 将会通过 `instanceof` 来检查类型是否匹配。例如下面这个类：

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

你可以将其作为一个 prop 的类型：

```js
defineProps({
  author: Person
})
```

Vue 会通过 `instanceof Person` 来校验 author prop 的值是否是 Person 类的一个实例。

### 可为 null 的类型

如果该类型是必传但可为 null 的，你可以用一个包含 null 的数组语法：

```js
defineProps({
  id: {
    type: [String, null],
    required: true
  }
})
```

## Boolean 类型转换

例子：

```js
defineProps({
  disabled: Boolean
})

<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

当一个 `prop` 被声明为允许多种类型时，`Boolean` 的转换规则也将被应用。  
然而，当同时允许 `String` 和 `Boolean` 时，有一种边缘情况——只有当 `Boolean` 出现在 `String` 之前时，`Boolean` 转换规则才适用

```js
// disabled 将被转换为 true
defineProps({
  disabled: [Boolean, Number]
})

// disabled 将被转换为 true
defineProps({
  disabled: [Number, Boolean]
})

  
// disabled 将被转换为 true，因为 Boolean 出现在 String 之前
defineProps({
  disabled: [Boolean, String]
})
// disabled 将被解析为空字符串 (disabled="")
defineProps({
  disabled: [String, Boolean]
})
```
