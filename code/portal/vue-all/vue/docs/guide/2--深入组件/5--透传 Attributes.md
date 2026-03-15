# 透传 Attributes

- [透传 Attributes](#透传-attributes)
  - [Attributes 继承](#attributes-继承)
    - [对 `class` 和 `style` 的合并](#对-class-和-style-的合并)
    - [v-on 监听器继承](#v-on-监听器继承)
    - [深层组件继承​](#深层组件继承)
  - [禁用 Attributes 继承](#禁用-attributes-继承)
  - [多根节点的 Attributes 继承](#多根节点的-attributes-继承)
  - [在 JavaScript 中访问透传 Attributes](#在-javascript-中访问透传-attributes)

## Attributes 继承

“透传 `attribute`”指的是传递给一个组件，却**没有**被该组件声明为 `props` 或 `emits` 的 `attribute` 或者 `v-on` 事件监听器。最常见的例子就是 `class、style` 和 `id`。

当一个组件以单个元素为根作渲染时，透传的 `attribute` 会自动被添加到根元素上。

```html
<!-- <MyButton> 的模板 -->
<button>Click Me</button>

<!-- 透传class -->
<!-- <MyButton> 并没有将 class 声明为一个它所接受的 prop，所以 class 被视作透传 attribute，自动透传到了 <MyButton> 的根元素上。 -->
<MyButton class="large" />

<!-- 最后渲染出的 DOM 结果 -->
<button class="large">click me</button>
```

### 对 `class` 和 `style` 的合并

如果一个子组件的根元素已经有了 `class` 或 `style` attribute，它会和从父组件上继承的值合并。如果我们将之前的 `<MyButton>` 组件的模板改成这样：

```html
<!-- <MyButton> 的模板 -->
<button class="btn">Click Me</button>
```

则最后渲染出的 DOM 结果会变成：

```html
<button class="btn large">Click Me</button>
```

### v-on 监听器继承

```html
<MyButton @click="onClick" />
```

`click` 监听器会被添加到 `<MyButton>` 的根元素，即那个原生的 `<button>` 元素之上。

当原生的 `<button>` 被点击，会触发父组件的 `onClick` 方法。

同样的，如果原生 `button` 元素自身也通过 `v-on` 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发。

### 深层组件继承​

有些情况下一个组件会在根节点上渲染另一个组件。例如，我们重构一下 `<MyButton>`，让它在根节点上渲染 `<BaseButton>`：

```html
<!-- <MyButton/> 的模板，只是渲染另一个组件 -->
<BaseButton />
```

此时 `<MyButton>` 接收的透传 attribute 会直接继续传给 `<BaseButton>`。

请注意：

1. 透传的 attribute 不会包含 `<MyButton>` 上声明过的 props 或是针对 emits 声明事件的 v-on 侦听函数，换句话说，声明过的 props 和侦听函数被 `<MyButton>`“消费”了。
2. 透传的 attribute 若符合声明，也可以作为 props 传入 `<BaseButton>`。

## 禁用 Attributes 继承

不想要一个组件自动地继承 `attribute`。

最常见的需要禁用 `attribute` 继承的场景就是 `attribute` 需要应用在根节点以外的其他元素上。通过设置 `inheritAttrs` 选项为 `false`，你可以完全控制透传进来的 `attribute` 被如何使用。  

在 `<script setup>` 中使用 `defineOptions`：

```js
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```

这些透传进来的 `attribute` 可以在模板的表达式中直接用 `$attrs` 访问到。

这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 `attribute`，例如 `class，style，v-on` 监听器等等。

```html
<span>Fallthrough attribute: {{ $attrs }}</span>
```

有几点需要注意：

- 和 `props` 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问。
- 像 `@click` 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`。

当想要将透传 attribute 都应用在内部的其他元素上，可以通过设定 `inheritAttrs: false` 和使用 `v-bind="$attrs"` 来实现：

```html
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

> 没有参数的 `v-bind` 会将一个对象的所有属性都作为 attribute 应用到目标元素上。

## 多根节点的 Attributes 继承

有着多个根节点的组件没有自动 `attribute` 透传行为。如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告。

如果 `$attrs` 被显式绑定，则不会有警告：

```html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## 在 JavaScript 中访问透传 Attributes

可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 `attribute`：

```js
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

虽然这里的 `attrs` 对象总是反映为最新的透传 `attribute`，但它并**不是响应式的** (考虑到性能因素)。你不能通过侦听器去监听它的变化。
