# TS 与组合式 API

- [TS 与组合式 API](#ts-与组合式-api)
  - [为组件的 props 标注类型](#为组件的-props-标注类型)
    - [Props 解构默认值](#props-解构默认值)
    - [复杂的 prop 类型](#复杂的-prop-类型)
  - [为组件的 emits 标注类型](#为组件的-emits-标注类型)
  - [为 ref() 标注类型](#为-ref-标注类型)
  - [为 reactive() 标注类型](#为-reactive-标注类型)
  - [为 computed() 标注类型](#为-computed-标注类型)
  - [为 DOM 事件标注类型](#为-dom-事件标注类型)
  - [为 provide / inject 标注类型](#为-provide--inject-标注类型)
  - [为模板引用标注类型](#为模板引用标注类型)
  - [为组件模板引用标注类型](#为组件模板引用标注类型)
  - [为自定义全局指令添加类型](#为自定义全局指令添加类型)

## 为组件的 props 标注类型

通常情况下，`defineProps()` 宏函数支持从它的参数中推导类型：

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

这被称之为“**运行时声明**”。

然而，通过泛型参数来定义 `props` 的类型通常更直接：

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

这被称之为“**基于类型的声明**”。

也可以将 `props` 的类型移入一个单独的接口中：

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

或者从另一个源文件中导入`props` 的类型：

```vue
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```

### Props 解构默认值

使用运行时声明时，可以直接在 `defineProps` 的选项对象中为 props 声明默认值：

```vue
<script setup lang="ts">
const props = defineProps({
  msg: { type: String, default: 'hello' },
  labels: { type: Array as PropType<string[]>, default: () => ['one', 'two'] }
})
</script>
```

但是当使用**基于类型的声明**时，我们失去了为 props 声明默认值的能力。

**3.5 以上版本**可以使用 **响应式 Props** 解构解决这个问题：

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

在 **3.4 及更低版本**，使用 `withDefaults` 编译器宏：

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

> 注意：在使用 `withDefaults` 时，默认值的可变引用类型 (如数组或对象) 应该在函数中进行包装。

### 复杂的 prop 类型

通过**基于类型的声明**，一个 prop 可以像使用其他任何类型一样使用一个复杂类型:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

对于**运行时声明**，我们可以使用 `PropType` 工具类型：

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

## 为组件的 emits 标注类型

emit 函数的类型标注也可以通过**运行时声明**或是**类型声明**进行：

```vue
<script setup lang="ts">
// 没有标注类型
const emit = defineEmits(['change', 'update'])

// 基于运行时声明
const emit = defineEmits({
  change: (id: number) => {},
  update: (value: string) => {}
})

// 基于类型声明
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

## 为 ref() 标注类型

ref 会根据初始化时的值推导其类型：

```ts
import { ref } from 'vue'

// 推导出的类型：Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 `Ref` 这个类型：

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！
```

或者，在调用 `ref()` 时传入一个泛型参数，来覆盖默认的推导行为：

```ts
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
```

如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 `undefined` 的联合类型：

```ts
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()
```

## 为 reactive() 标注类型

`reactive()` 也会隐式地从它的参数中推导类型：

```ts
import { reactive } from 'vue'

// 推导得到的类型：{ title: string }
const book = reactive({ title: 'Vue 3 指引' })
```

要显式地标注一个 reactive 变量的类型，我们可以使用接口：

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 指引' })
```

## 为 computed() 标注类型

`computed()` 会自动从其计算函数的返回值上推导出类型：

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

你还可以通过泛型参数显式指定类型：

```ts
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```

## 为 DOM 事件标注类型

在处理原生 DOM 事件时，应该为我们传递给事件处理函数的参数正确地标注类型。让我们看一下这个例子：

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` 隐式地标注为 `any` 类型
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

没有类型标注时，这个 `event` 参数会隐式地标注为 `any` 类型。当 `tsconfig.json` 配置了 `"strict": true` 或 `"noImplicitAny": true` 时会报出一个 TS 错误。

因此，建议显式地为事件处理函数的参数标注类型（`Event`）。此外，你在访问 `event` 上的属性时可能需要使用类型断言：

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## 为 provide / inject 标注类型

provide 和 inject 通常会在不同的组件中运行。要正确地为注入的值标记类型，Vue 提供了一个 `InjectionKey` 接口，它是一个继承自 `Symbol` 的泛型类型，可以用来在提供者和消费者之间**同步注入值的类型**：

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

// 1. 定义一个注入 key，并为它标注类型。注入的值需为该类型。
const key = Symbol() as InjectionKey<string>
// or
const key: InjectionKey<string> = Symbol()
// 可以给 Symbol 传入一个可选的描述参数
const key: InjectionKey<string> = Symbol('my-injection-key')


// 2. 使用 provide/inject
provide(key, 'foo') // 若提供的是非字符串值会导致错误
const foo = inject(key) // foo 的类型：string | undefined
```

> 建议将 key 的定义放在一个单独的文件中，这样它就可以被多个组件导入。

注入值的类型通常是 `unknown`

```ts
provide('foo', 'someValue')
const foo = inject('foo') // 类型：unknown
```

通过泛型参数显式声明**注入值**的类型：

```ts
provide('foo', 'someValue')
const foo = inject<string>('foo') // 类型：string | undefined
```

注意注入的值仍然可以是 `undefined`，因为无法保证提供者一定会在运行时 `provide` 这个值。

当提供了一个默认值后，这个 `undefined` 类型就可以被移除：

```ts
const foo = inject<string>('foo', 'bar') // 类型：string
```

如果你确定该值将始终被提供，则还可以强制转换该值：

```ts
const foo = inject('foo') as string
```

## 为模板引用标注类型

在单文件组件中由 `useTemplateRef()` 创建的 ref 类型可以基于匹配的 ref attribute 所在的元素**自动推断**为静态类型。

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
const el = useTemplateRef('el') // el 的类型：Ref<HTMLElement | null>
</script>

<template>
  <input ref="el" type="text" />
</template>
```

在**无法自动推断**的情况下，仍然可以通过泛型参数将模板 `ref` 转换为显式类型。

```ts
const el = useTemplateRef<HTMLInputElement>('el')
```

## 为组件模板引用标注类型

在单文件组件中由 `useTemplateRef()` 创建的 ref 类型可以基于匹配的 ref attribute 所在的元素**自动推断**为静态类型。

## 为自定义全局指令添加类型

可以通过扩展 `ComponentCustomProperties` 来为使用 `app.directive()` 声明的**全局自定义指令**获取类型提示和类型检查

指令文件 `src/directives/highlight.ts`:

```ts
import type { Directive } from 'vue'

// 定义指令的类型，指令的作用目标是 HTMLElement，并且它接收的绑定值类型是 string。
export type HighlightDirective = Directive<HTMLElement, string>


// 这是在做 Vue 类型扩展。它不会产生运行时代码，只是告诉 TypeScript：当这个指令被全局注册后，组件里会有一个叫 vHighlight 的指令可用，而且它的类型就是上面定义的 HighlightDirective。
declare module 'vue' {
  export interface ComponentCustomProperties {
    // 使用 v 作为前缀 (v-highlight)
    vHighlight: HighlightDirective
  }
}

// 这是指令的实现
export default {
  mounted: (el, binding) => {
    el.style.backgroundColor = binding.value
  }
} satisfies HighlightDirective
// satisfies HighlightDirective 的作用是：让 TypeScript 检查这个对象是否符合 HighlightDirective 的要求，但又尽量保留对象本身更精确的推导类型。
```

`main.ts`:

```ts
import highlight from './directives/highlight'
// ...其它代码
const app = createApp(App)
app.directive('highlight', highlight)
```

在组件中使用 `v-highlight` 时会得到类型提示：

```vue
<template>
  <p v-highlight="'yellow'">This sentence is highlighted!</p>
</template>
```
