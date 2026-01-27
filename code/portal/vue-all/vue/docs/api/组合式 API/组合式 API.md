# 组合式API

- [组合式API](#组合式api)
  - [核心](#核心)
    - [ref()](#ref)
      - [ref() 和 reactive() 的区别](#ref-和-reactive-的区别)
    - [shallowRef()](#shallowref)
    - [reactive()](#reactive)
    - [shallowReactive()](#shallowreactive)
    - [computed()](#computed)
    - [watch()](#watch)
    - [watchEffect()](#watcheffect)
      - [与 watch 的对比](#与-watch-的对比)
    - [watchPostEffect()](#watchposteffect)
    - [watchSyncEffect()](#watchsynceffect)
  - [工具](#工具)
    - [toValue()](#tovalue)
    - [toRefs()​](#torefs)

## 核心

### ref()

接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。

如果将一个对象赋值给 ref，那么这个对象将通过 `reactive()` 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。

#### ref() 和 reactive() 的区别

在 Vue 3 中，`ref()` 和 `reactive()` 都是用于创建响应式数据的函数，但它们有重要区别：

1、**基本定义**

- **`ref()`**：创建响应式**引用**，可包装任何类型的值
  - **`ref()`** 内部使用 `reactive()` 包装对象
- **`reactive()`**：创建响应式**对象**，只能包装对象类型

> 使用 `reactive()` 的场景都可以使用 `ref()`，但是 `ref()` 包装基本类型时不能使用 `reactive()`。

2、**核心区别**

| 特性 | `ref()` | `reactive()` |
| ------ | --------- | -------------- |
| **接受类型** | 任何类型（基本类型、对象、数组等） | 仅对象类型（对象、数组、Map、Set） |
| **访问方式** | 需要通过 `.value` 访问 | 直接访问属性 |
| **模板中使用** | 自动解包（无需 `.value`） | 直接使用 |
| **重新赋值** | 可以整个替换（赋值给 `.value`） | 不能直接替换整个对象 |
| **响应性丢失** | 较少出现 | 解构/展开时可能丢失响应性 |

3、**代码示例对比**

3.1、基本使用

```javascript
// ref - 可以包装任何类型
const count = ref(0)           // 基本类型 ✅
const user = ref({ name: 'John' }) // 对象 ✅

// reactive - 只能包装对象
const state = reactive({
  count: 0,                    // 对象属性 ✅
  user: { name: 'John' }
})
```

3.2、访问方式

```javascript
// ref - 需要 .value
const count = ref(0)
console.log(count.value)      // 0
count.value = 1

// reactive - 直接访问
const state = reactive({ count: 0 })
console.log(state.count)      // 0
state.count = 1
```

3.3、模板中使用

```vue
<template>
  <!-- ref - 自动解包 -->
  <div>{{ count }}</div>      <!-- 无需 .value -->
  
  <!-- reactive - 直接使用 -->
  <div>{{ state.count }}</div>
</template>

<script setup>
const count = ref(0)           // 模板中自动解包
const state = reactive({ count: 0 })
</script>
```

4、**特性详解**

4.1、**`ref()` 的特点**

```javascript
// 1. 重新赋值整个对象
const user = ref({ name: 'Alice' })
user.value = { name: 'Bob' }  // ✅ 完全替换

// 2. 在 reactive 中自动解包
const count = ref(0)
const state = reactive({ count })
console.log(state.count)      // 0 (自动解包)
```

4.2、**`reactive()` 的特点**

```javascript
// 1. 不能直接替换整个对象
const state = reactive({ count: 0 })
// state = { count: 1 }      // ❌ 会失去响应性

// 2. 解构时可能丢失响应性
const { count, name } = state // ❌ 丢失响应性
const { count, name } = toRefs(state) // ✅ 保持响应性
```

### shallowRef()

ref() 的浅层作用形式。

和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。

shallowRef() 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。

```js
const state = shallowRef({ count: 1 })
// 不会触发更改
state.value.count = 2
// 会触发更改
state.value = { count: 2 }
```

### reactive()

返回一个对象的响应式代理。

- 响应式转换是“深层”的：它会影响到所有嵌套的属性。一个响应式对象也将深层地解包任何 ref 属性，同时保持响应性。
- 值得注意的是，当访问到某个响应式数组或 Map 这样的原生集合类型中的 ref 元素时，不会执行 ref 的解包。
- 若要避免深层响应式转换，只想保留对这个对象顶层次访问的响应性，请使用 shallowReactive() 作替代。
- 返回的对象以及其中嵌套的对象都会通过 ES Proxy 包裹，因此不等于源对象，建议只使用响应式代理，避免使用原始对象。

```js
const obj = reactive({ count: 0 })
obj.count++
```

### shallowReactive()

reactive() 的浅层作用形式。

一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。

### computed()

接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 .value 暴露 getter 函数的返回值。它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。

### watch()

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

watch() 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

第一个参数是**侦听器的源**。这个来源可以是以下几种：

- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组

第二个参数是**在发生变化时要调用的回调函数**。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。

第三个可选的参数是一个**对象**，支持以下这些选项：

- immediate：在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
- deep：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考深层侦听器。
- flush：调整回调函数的刷新时机。参考回调的刷新时机及 watchEffect()。
- onTrack / onTrigger：调试侦听器的依赖。参考调试侦听器。

```js
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})

// 侦听多个来源时
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

停止侦听器：

```js
const stop = watch(source, callback)
// 当已不再需要该侦听器时：
stop()
```

### watchEffect()

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

第一个参数就是**要运行的副作用函数**。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

第二个参数是**一个可选的选项**，可以用来调整副作用的刷新时机或调试副作用的依赖。

- 默认情况下，侦听器将在组件渲染之前执行。设置 `flush: 'post'` 将会**使侦听器延迟到组件渲染之后再执行**。
- 在某些特殊情况下 (例如要使缓存失效)，可能有必要**在响应式依赖发生改变时立即触发侦听器**。这可以通过设置 `flush: 'sync'` 来实现。然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。

返回值是一个用来停止该副作用的函数。

```js
const count = ref(0)
const stop = watchEffect(() => console.log(count.value))

// 停止监听
stop()
```

清除副作用

```js
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log('做一些事情')
  }, 1000)
  
  // 在重新运行或停止时清理
  onCleanup(() => {
    clearTimeout(timer)
  })
})
```

#### 与 watch 的对比

|特性|watchEffect|watch|
|--|--|--|
|依赖收集|自动收集|需要显式指定|
|立即执行|是|可配置|
|获取新旧值|不能|可以|
|使用场景|自动追踪多个依赖|精确监听特定数据源|

### watchPostEffect()

watchEffect() 使用 `flush: 'post'` 选项时的别名。

### watchSyncEffect()

watchEffect() 使用 `flush: 'sync'` 选项时的别名。

## 工具

### toValue()

将值、refs 或 getters 规范化为值。这与 unref() 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

这可以在组合式函数中使用，用来规范化一个可以是值、ref 或 getter 的参数。

```js
toValue(1) //       --> 1
toValue(ref(1)) //  --> 1
toValue(() => 1) // --> 1
```

### toRefs()​

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 `ref`。

每个单独的 `ref` 都是使用 `toRef()` 创建的。

**示例**:

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

当从 _组合式函数_ 中返回响应式对象时，使用 `toRefs` 可以解构返回的对象而不会失去响应性：

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // ...基于状态的操作逻辑

  // 在返回时都转为 ref
  return toRefs(state)
}

// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX()
```

`toRefs` 在调用时只会为**源对象上可以枚举的属性**创建 `ref`。如果要为可能还不存在的属性创建 `ref`，请改用 `toRef`。
