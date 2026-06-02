# vue 面试问题

- [vue 面试问题](#vue-面试问题)
  - [1. vue 的生命周期钩子函数有哪些](#1-vue-的生命周期钩子函数有哪些)
  - [2.讲一下父子组件 created、mounted 的顺序](#2讲一下父子组件-createdmounted-的顺序)
  - [3. mounted 的作用是什么](#3-mounted-的作用是什么)
  - [4. vue的数据绑定原理是什么？/ vue 如何实现数据绑定的](#4-vue的数据绑定原理是什么-vue-如何实现数据绑定的)
  - [5. 为什么 vue3 使用 Proxy 进行绑定](#5-为什么-vue3-使用-proxy-进行绑定)
  - [6. 了解 vue 的原理吗](#6-了解-vue-的原理吗)
  - [7. 使用 VueJs 遇到的一个难题，并说明你是如何解决的](#7-使用-vuejs-遇到的一个难题并说明你是如何解决的)
  - [8. vue2 和 vue3 有哪些区别](#8-vue2-和-vue3-有哪些区别)
  - [9. vue2 的生命周期和 vue3 的有哪些区别](#9-vue2-的生命周期和-vue3-的有哪些区别)
  - [10. vue3 的生命周期有哪些？/ vue 有哪些生命周期钩子](#10-vue3-的生命周期有哪些-vue-有哪些生命周期钩子)
  - [11. 举例子什么时候用到生命周期函数](#11-举例子什么时候用到生命周期函数)
  - [12. vue 怎么实现从页面 A 跳转到页面 B，再从页面 B 跳转到页面 A。调用 vue router 的什么函数](#12-vue-怎么实现从页面-a-跳转到页面-b再从页面-b-跳转到页面-a调用-vue-router-的什么函数)
  - [13. Vue3 中组件的响应式数据更新后，视图为什么能自动刷新？什么时候会出现数据更新视图不更新的情况？](#13-vue3-中组件的响应式数据更新后视图为什么能自动刷新什么时候会出现数据更新视图不更新的情况)
  - [14. 说一下你对 vue 的认识/了解](#14-说一下你对-vue-的认识了解)
  - [15. vue 使用虚拟 dom 的好处是什么](#15-vue-使用虚拟-dom-的好处是什么)
  - [16. vue 和 react 的区别在哪里](#16-vue-和-react-的区别在哪里)
  - [17. keep-alive 组件的作用是什么](#17-keep-alive-组件的作用是什么)
  - [18. vue 怎么向组件传递数据](#18-vue-怎么向组件传递数据)
  - [19. vue ，假如有一个按钮，它的点击事件报找不到 this 的错误，原因是什么](#19-vue-假如有一个按钮它的点击事件报找不到-this-的错误原因是什么)
  - [20. vue-router 的 hash 和 history 路由有什么区别](#20-vue-router-的-hash-和-history-路由有什么区别)
  - [21. 用过 vuex 或者 pinia 吗？pinia 怎么使用](#21-用过-vuex-或者-pinia-吗pinia-怎么使用)
  - [22. 了解 vue 的循环吗？为什么要绑定 key？当没绑定 key 时，dom 会怎么变更](#22-了解-vue-的循环吗为什么要绑定-key当没绑定-key-时dom-会怎么变更)
  - [23. 如果 key 用数组默认的 index 会怎么样](#23-如果-key-用数组默认的-index-会怎么样)
  - [24. 做过 css 模块分离吗？vue 和 react 怎么做](#24-做过-css-模块分离吗vue-和-react-怎么做)
  - [25. vue router 的 hash 和 history 模式的区别](#25-vue-router-的-hash-和-history-模式的区别)
  - [26. 为什么项目用 vue3 呢](#26-为什么项目用-vue3-呢)
  - [27. vite 这块是怎么进行配置优化的](#27-vite-这块是怎么进行配置优化的)
  - [28. 你觉得使用 vite 的 manualchunk 分包之后性能优化明显吗](#28-你觉得使用-vite-的-manualchunk-分包之后性能优化明显吗)
  - [29. 这个 lighthouse 性能优化是有需求要这么做吗](#29-这个-lighthouse-性能优化是有需求要这么做吗)
  - [30. 有看过 element-plus 的组件的实现吗？有自己弄一个出来吗](#30-有看过-element-plus-的组件的实现吗有自己弄一个出来吗)
  - [31. 有做过引导组件吗。你可以原生做一个吗](#31-有做过引导组件吗你可以原生做一个吗)
  - [32. 简历上说封装错误提示框。你是原生地去做还是用现有的 element-plus 组件去做的](#32-简历上说封装错误提示框你是原生地去做还是用现有的-element-plus-组件去做的)

## 1. vue 的生命周期钩子函数有哪些

组合式：

- `onMounted()`
- `onUpdated()`
- `onUnmounted()`
- `onBeforeMount()`
- `onBeforeUpdate()`
- `onBeforeUnmount()`
- `onErrorCaptured()`
- `onRenderTracked()`
- `onRenderTriggered()`
- `onActivated()​`
- `onDeactivated()​`
- `onServerPrefetch()`

选项式：

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeUnmount`
- `unmounted`
- `errorCaptured`
- `renderTracked`
- `renderTriggered`
- `activated`
- `deactivated`
- `serverPrefetch`

## 2.讲一下父子组件 created、mounted 的顺序

加载渲染过程：

1. 父组件 beforeCreate
2. 父组件 created
3. 父组件 beforeMount
4. 子组件 beforeCreate
5. 子组件 created
6. 子组件 beforeMount
7. 子组件 mounted
8. 父组件 mounted

更新过程：

1. 父组件 beforeUpdate
2. 子组件 beforeUpdate
3. 子组件 updated
4. 父组件 updated

销毁过程：

1. 父组件 beforeDestroy
2. 子组件 beforeDestroy
3. 子组件 destroyed
4. 父组件 destoryed

## 3. mounted 的作用是什么

created:在模板渲染成 html 前调用，即通常初始化某些属性值，然
后再渲染成视图。

mounted: 在模板渲染成 html 后调用，通常是初始化页面完成后，再
对 html 的 dom 节点进行一些需要的操作。在组件被挂载之后调用。

## 4. vue的数据绑定原理是什么？/ vue 如何实现数据绑定的

Vue 2 使用 `getter / setters` 完全是出于支持旧版本浏览器的限制。

而在 Vue 3 中则使用了 `Proxy` 来创建响应式对象，仅将 `getter / setter` 用于 `ref`。

口语回答：

Vue 3 实现数据绑定的核心是**基于 Proxy 的响应式系统**。
具体来说，对于对象，我们使用 `reactive` 方法将其包装成 Proxy 代理。当读取属性时，Proxy 的 `get` 陷阱会执行依赖收集，把当前正在运行的副作用（比如组件的渲染函数）记录下来；当修改属性时，`set` 陷阱会触发更新，重新执行所有依赖这个属性的副作用。
对于基本类型，我们用 `ref` 创建一个包含 `value` 属性的响应式对象，原理类似。
相比 Vue 2 的 `Object.defineProperty`，Proxy 可以监听属性的新增和删除，对数组的原生方法也完全支持，而且不需要在初始化时递归遍历所有属性，性能更好。
同时，Vue 3 的编译器会把模板中的数据绑定转换成渲染函数中对响应式数据的访问，从而自动建立起依赖关系。这样，数据变化就能高效地驱动视图重新渲染。

## 5. 为什么 vue3 使用 Proxy 进行绑定

Vue2

- 使用 `Object.defineProperty`
- 无法监听删除属性的操作
- 需要遍历目标对象的所有属性并加上 `setter getter` 才能监听
- 对于对象的新增属性，需要手动监听
- 在遇到一个对象的属性还是一个对象的情况下，需要递归监听。
- 对于数组通过 `push、unshift` 方法增加的元素，也无法监听

Vue3

- 使用 `Proxy` 双向数据绑定
- `Proxy` 代理的是整个对象，而不是对象的某个特定属性，不需要我们通过遍历来逐个进行数- 据绑定。
- `Object.defineProperty` 中的问题都能解决.
- `Proxy` 支持13种拦截操作
- `Proxy` 常常搭配 `Reflect` 使用

## 6. 了解 vue 的原理吗

## 7. 使用 VueJs 遇到的一个难题，并说明你是如何解决的

vue2是有过滤器功能的，但是vue3没有，项目升级到vue3时需要重新实现这个功能。解决方案是通过声明一个方法实现过滤器功能，然后在模版里面通过双括号调用函数来实现过滤。

```txt
例子 1：复杂动态表单
这是 Vue3 面试里非常常见、也很容易体现能力的场景。

你可以这样说：

“我之前做过一个后台配置系统，里面有大量动态表单场景，比如表单项根据用户选择实时联动显示，部分字段还要根据接口返回的数据动态生成，另外还涉及分步保存、草稿恢复和权限控制。这个场景在 Vue3 里一开始最大的困难是响应式链路比较复杂，尤其是我们用了 reactive 管整个表单对象后，部分字段在解构、透传和子组件编辑时出现过视图更新不稳定的问题。另外联动逻辑一多，watch 也会越来越多，后面排查问题成本很高。

后来的处理方式是把问题拆开。第一，表单状态按领域拆分，不再把所有字段都塞进一个大对象里；第二，派生逻辑尽量收敛到 computed，减少多处 watch 相互影响；第三，把动态表单渲染、字段联动、校验规则生成拆成几个 composable，但不是按技术拆，而是按业务场景拆。这样后面不管是加字段还是改联动规则，影响范围都比较可控。最后这个模块从最早经常出现联动错乱，到后面可以稳定支撑多个业务线复用。”
```

```txt
例子 2：封装基础组件 / 业务组件库
这个适合体现你不是只会写页面。

你可以这样说：

“我做过一套业务组件库，主要服务后台系统里的表单、表格、弹窗、筛选区这些高频场景。最开始的问题是各个页面都在重复造轮子，导致交互和代码风格都不一致。用 Vue3 做这件事时，难点在于抽象边界特别难拿捏。抽浅了没有复用价值，抽深了就会把业务差异硬塞进一套组件里，反而更难维护。

我的处理方式是先找高频且稳定的共性，比如列表查询区、分页表格联动、弹窗表单提交流程，这些先抽成基础能力；而业务差异比较大的部分，通过插槽、配置项和扩展钩子开放，不强行统一。Composition API 在这里比较有优势，因为组件能力和逻辑能力可以分开复用。最后沉淀下来后，页面开发效率提升比较明显，而且后面新人接手时也更容易遵循统一模式。”
```

## 8. vue2 和 vue3 有哪些区别

- **双向数据绑定的原理不同**。Vue 2使用`Object.defineProperty`来实现数据的劫持和响应式处理，但这种方法有一些局限性，例如不能检测到对象属性的新增和删除，也不能检测到数组的某些变化。Vue 3采用了ES6的Proxy API 来代理数据，这使得它可以更有效地监控数据变化，包括数组和对象的变化。
- **响应式系统的支持范围不同**。Vue 2不支持碎片，即组件模板只能有一个根节点。Vue 3支持碎片，允许组件模板拥有多个根节点。
- **API类型不同**。Vue 2使用了选项式API（Options API），将代码分为data、computed、methods等不同部分。Vue 3引入了组合式API（Composition API），使用更灵活的方法来组织和编写代码，这被认为可以使代码更加整洁和可维护。
- **定义数据和方法的方式不同**。在Vue 2中，数据被定义在`data`函数中，而方法和计算属性分别定义在`methods`和`computed`属性中。Vue 3引入了一个新的`setup()`函数，在这个函数中可以使用`reactive`方法来声明响应式数据，并且这个函数会在组件初始化时触发。
- **生命周期钩子不同**。Vue 3对生命周期钩子进行了改进和扩展，相比Vue 2提供了更多的钩子函数，以适应不同的需求和优化。

## 9. vue2 的生命周期和 vue3 的有哪些区别

1. **销毁阶段钩子重命名**：`beforeDestroy` → `beforeUnmount`，`destroyed` → `unmounted`。

2. **新增调试钩子**：`renderTracked` 和 `renderTriggered`（仅开发模式，用于追踪响应式依赖）。

3. **组合式 API 替代 beforeCreate / created**：这两个钩子被 `setup()` 函数直接取代。

4. **选项式 API 生命周期名称保持一致**（除了销毁阶段），但组合式 API 中需要使用 `onXxx` 形式。

## 10. vue3 的生命周期有哪些？/ vue 有哪些生命周期钩子

Vue3 的生命周期有：`beforeCreate`、`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeUnmount`、`unmounted`、`errorCaptured`、`renderTracked`、`renderTriggered`、`activated`、`deactivated`。

## 11. 举例子什么时候用到生命周期函数

- 在 `onMounted` 里初始化 ECharts 图表、监听全局滚动事件。
- 在 `onBeforeUnmount` 里移除滚动监听、清除定时器，防止内存泄漏。
- 用 `onUpdated` + `nextTick` 在数据更新后滚动到列表底部。
- 被 `KeepAlive` 包裹的组件，用 `onActivated` 重新拉取数据。
- 用 `errorCaptured` 捕获子组件错误并上报。

## 12. vue 怎么实现从页面 A 跳转到页面 B，再从页面 B 跳转到页面 A。调用 vue router 的什么函数

```js
// 前进
router.push('/users/eduardo')

// 后退
router.back()
router.go(-1)
```

## 13. Vue3 中组件的响应式数据更新后，视图为什么能自动刷新？什么时候会出现数据更新视图不更新的情况？

核心流程： 数据劫持（Proxy/Reflect）→ 依赖收集（track）→ 数据更新触发依赖（trigger）→ 组件重新渲染  闭环

视图不更新场景：直接修改数组下标/对象新增属性未用 $set 或 ref/reactive API。解构赋值丢失响应式引用。异步操作未在 nextTick 中执行

解决方案：使用 vue.set 或 ref 包裹复杂数据、解构时保留响应式引用、异步更新后通过 nextTick 获取最新DOM

## 14. 说一下你对 vue 的认识/了解

“我认为 Vue 是一个渐进式的 JavaScript 框架，专注于构建用户界面。它的核心库只关注视图层，但通过官方提供的生态工具（如路由、状态管理、构建工具），可以轻松构建复杂的单页应用（SPA）。”

核心特性：

- **响应式数据驱动**：Vue 通过 `Object.defineProperty` (Vue2) 或 `Proxy` (Vue3) 劫持数据，当数据变化时自动更新视图。开发者只需要关注数据状态，不需要操作 DOM，极大地提高了开发效率和可维护性。

- **组件化开发**：页面可以拆分成独立、可复用的组件，每个组件封装自己的模板、逻辑和样式。这让大型项目更易组织、测试和协作。

- **模板语法与指令**：提供了简洁的模板语法（如 `{{ }}`、`v-bind`、`v-if`、`v-for`），以及事件处理（`v-on`），降低了从原生 HTML/JS 迁移的学习成本。

- **虚拟 DOM**：Vue 在内存中维护一棵虚拟 DOM 树，数据变化时通过 diff 算法计算出最小更新路径，再批量更新真实 DOM，保证了在复杂交互下的性能。

## 15. vue 使用虚拟 dom 的好处是什么

**第一，性能**。通过Diff算法和批量更新，将多个DOM操作合并为一次，避免频繁触发重排重绘，在复杂交互场景下性能更可控。

**第二，跨平台**。虚拟DOM作为中间层，让Vue可以脱离浏览器环境，渲染到原生App、Canvas等，像Weex、Taro都是类似思路。

**第三，开发体验**。开发者不需要手动操作DOM，只需修改数据，Vue自动高效地更新界面，代码更专注业务逻辑。

## 16. vue 和 react 的区别在哪里

- **数据绑定方式**：Vue 使用双向数据绑定，而 React 使用单向数据流。
- **组件化方式**：Vue 提供了选项式 API 和组合式 API，而 React 主要使用函数组件和 Hooks。
- **虚拟 DOM 实现**：Vue 和 React 都使用虚拟 DOM，但实现细节不同。
- **学习曲线**：Vue 的模板语法更接近 HTML，可能更容易上手，而 React 的 JSX 需要一定的学习成本。

## 17. keep-alive 组件的作用是什么

`keep-alive` 是 Vue 提供的一个内置组件，用于缓存组件的状态，避免重复渲染。它常用于需要频繁切换的组件，如标签页或路由视图。通过 `keep-alive` 包裹的组件在切换时不会被销毁，而是被缓存起来，当再次激活时可以快速恢复之前的状态，从而提高性能和用户体验。

## 18. vue 怎么向组件传递数据

Vue 中最常见的是父子组件间的数据传递：父组件通过 `props` 向子组件传递数据，子组件通过 `$emit` 触发事件向父组件传递数据。如果组件层级较深，可以使用 `provide` / `inject` 让祖先组件向后代组件注入数据，不需要逐层传递。对于大型应用或全局共享数据，通常会使用 `Vuex` 或 `Pinia` 状态管理库。此外，还有 `$attrs`、插槽、事件总线等方式，但在实际开发中推荐优先使用 `props` 和事件，保持清晰的单向数据流

## 19. vue ，假如有一个按钮，它的点击事件报找不到 this 的错误，原因是什么

根据点击事件在哪里定义区分说明：

**1、点击事件在 methods 中定义**

**在 methods 中使用箭头函数定义方法**。箭头函数会捕获其定义时的父级作用域作为 `this`，而组件实例化时 `methods` 对象的上下文通常是 `undefined`（严格模式）或 `window`，因此箭头函数内的 `this` 不再是 `Vue` 实例。

```javascript
// ❌ 错误示例
methods: {
  handleClick: () => {
    console.log(this.message); // this 不是 Vue 实例，可能为 undefined
  }
}
```

正确示例：

```js
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    // ✅ 正确：普通函数
    increment() {
      this.count++;  // this 指向 Vue 实例
    }
  }
}
```

**2、点击事件在模板中定义**

**模板中直接使用普通函数表达式**。例如 `@click="function() { this.xxx }"`，这种普通函数的 `this` 指向调用它的上下文（在事件回调中通常指向 `window` 或 `undefined`），而不是 Vue 实例。

```html
<!-- ❌ 错误示例 -->
<button @click="function() { this.counter++ }">点击</button>
```

正确示例：

```html
<!-- ✅ 正确：直接调用 methods 中定义的方法 -->
<button @click="increment">点击</button>
```

## 20. vue-router 的 hash 和 history 路由有什么区别

`hash` 模式利用 `URL` 中的 `#` 符号（即锚点），通过监听 `hashchange` 事件实现前端路由；而 `history` 模式依赖 `HTML5` 的 `History API`（`pushState` 和 `replaceState`），需要服务器的配合支持。

配置示例：

```js
// Hash 模式（默认）
const router = new VueRouter({
  mode: 'hash',
  routes: [...]
})

// History 模式（需后端支持）
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,  // 可选，部署子路径时用
  routes: [...]
})
```

## 21. 用过 vuex 或者 pinia 吗？pinia 怎么使用

用过 pinia。使用步骤为：

1. 安装 pinia：`npm install pinia`
2. 创建 store：在 `src/stores` 目录下创建一个 store 文件，例如 `counterStore.js`
3. 定义 store：

    ```js
    import { defineStore } from 'pinia'
    
    export const useCounterStore = defineStore('counter', {
      state: () => ({
        count: 0
      }),
      actions: {
        increment() {
          this.count++
        }
      }
    })
    ```

4. 在组件中使用 store：

```js
import { useCounterStore } from '@/stores/counterStore'
export default {
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  }
}
```

在模板中使用：

```html
<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <button @click="counterStore.increment">Increment</button>
  </div>
</template> 
```

## 22. 了解 vue 的循环吗？为什么要绑定 key？当没绑定 key 时，dom 会怎么变更

Vue 通过 `v-for` 指令实现列表渲染，可以遍历数组、对象、数字或字符串。基本语法：

```html
<li v-for="(item, index) in items" :key="item.id">
  {{ item.name }}
</li>
```

***

**为什么要绑定 key？**

`key` 是 Vue 虚拟 DOM 算法中识别节点的唯一标识。它的核心作用：

- **优化 diff 性能**：在数据变化时，Vue 会通过 `key` 判断哪些节点是新增、删除或移动，从而复用/重新排序现有元素，而非暴力销毁重建。
- **维持组件状态**：如果列表项包含有状态（如表单输入、临时 UI 状态）或过渡动画的组件，没有 `key` 或使用 `index` 作为 `key` 会导致状态错乱。

***

**当没绑定 key 时，DOM 会怎么变更？**

默认行为是“就地复用”（in-place patch）。

Vue 会采用一种尽量不移动 DOM 元素的策略：当数组顺序改变或部分元素被修改时，Vue 会比对每个位置上的新旧内容，只更新节点内文本或属性，但不会移动 DOM 节点的位置。

假设列表 `['A','B','C']` 渲染为三个 `<li>`，之后数据变为 `['B','A','C']`：

- **有唯一 key**：Vue 识别出 B 和 A 交换了位置，会移动 DOM 节点，最终顺序为 B, A, C。
- **无 key**：Vue 会依次比对每个索引位置：
  - 索引0：旧内容 A → 新内容 B，直接修改 `<li>` 的文本为 B。
  - 索引1：旧内容 B → 新内容 A，直接修改文本为 A。
  - 索引2：保持不变。

性能与副作用：

- 优点：不移动 DOM，性能开销较小。
- 缺点：
  - 无法正确复用组件或带状态的元素（如 `<input>`、`<img>` 的加载状态）。
  - 过渡动画失效（Vue 无法识别元素移动）。
  - 插入/删除时的节点复用策略可能导致意料之外的 UI 错乱。

## 23. 如果 key 用数组默认的 index 会怎么样

`index` 不是数据的固有身份，而是随数组顺序变化的临时位置。当列表发生**重排、插入、删除**时，同一数据项的 `index` 可能会改变，导致 Vue 误判新旧节点的对应关系，从而采用**就地复用**策略。

## 24. 做过 css 模块分离吗？vue 和 react 怎么做

CSS模块分离，本质上是为了解决全局样式污染和命名冲突问题，让样式像JavaScript模块一样具有局部作用域。同时也能更好地管理组件间的样式依赖。

**1. Vue 中的实现**

- **方案一：`<style scoped>` (最常用)**
  - **原理**：Vue Loader会为当前组件的DOM元素添加一个唯一的`data-v-hash`属性，并将你的CSS选择器也加上这个属性选择器，从而实现样式隔离。
  - **适用**：绝大多数业务组件。
  - **注意**：对子组件的根元素会生效，但子组件内部元素不生效。如需深度影响子组件，可用`:deep()`或`::v-deep`。

- **方案二：CSS Modules (`<style module>`)**
  - **原理**：将你写的类名（如`.btn`）编译成一个唯一的哈希类名（如`.btn_h8j3s`），并通过`$style`对象导入使用。
  - **适用**：需要明确控制类名、或需要组合样式的复杂组件。
  - **写法**：`<style module> .btn { color: red; } </style>`，模板中用`:class="$style.btn"`。

- **方案三：BEM + 作用域约定**
  - 通过约定命名如`.my-component__btn`来避免冲突，不依赖工具。适合简单的库或早期项目。

**2. React 中的实现**

React本身没有内置样式隔离方案，主要依赖社区生态，回答时体现你熟悉多种选择。

- **方案一：CSS Modules (最接近Vue的scoped体验)**
  - **配置**：Create React App或Vite默认支持`.module.css`文件。
  - **用法**：`import styles from ‘./Button.module.css’`，然后用`className={styles.btn}`。编译后类名会变成`Button_btn__x1y2z`。
  - **优点**：简单可靠，没有运行时开销。

- **方案二：CSS-in-JS (如styled-components、Emotion)**
  - **原理**：用JS编写样式，生成唯一类名并将样式注入到`<head>`。
  - **写法**：`const Button = styled.button' color： red； '` 组件。使用时直接写`<Button />`。
  - **优点**：样式与组件强绑定，支持props动态切换主题、自动处理浏览器前缀。适合设计系统或主题复杂的应用。

- **方案三：Utility-first框架 (如Tailwind CSS)**
  - 直接使用原子类`className=“bg-red-500 p-4”`。虽然不是“分离”，但在现代React项目中非常流行，从另一个角度解决了“样式管理”问题。

## 25. vue router 的 hash 和 history 模式的区别

Vue Router 主要有 `hash` 和 `history` 两种路由模式。

`hash` 模式的 URL 会带 `#`，比如 `/#/home`。`#` 后面的内容不会发送到服务端，所以路由切换完全由前端控制，部署简单，刷新页面一般也不会 404，适合静态资源服务器或者不方便改后端配置的场景。缺点是 URL 不够美观。

`history` 模式的 URL 不带 `#`，比如 `/home`，它是基于 HTML5 的 `pushState` 和 `replaceState` 实现的，URL 更自然，也更接近传统网站。缺点是刷新页面或者直接访问某个子路由时，服务端如果没有做重定向到 `index.html` 的配置，就会出现 404。

所以两者本质区别有两个：

1. URL 表现不同，`hash` 带 `#`，`history` 不带。
2. 对服务端要求不同，`hash` 基本不用额外配置，`history` 需要服务端支持路由回退。

如果面试官问怎么选，可以接着说：

如果项目只是前端静态部署，或者服务器配置受限，我会优先选 `hash`，因为稳定省事；如果项目对 URL 美观、SEO、用户体验要求更高，并且可以控制服务端配置，我会选 `history`。

## 26. 为什么项目用 vue3 呢

核心回答框架（总分总结构）

**总起句：**  
“如果让我为新项目选择 Vue 3，主要是基于**性能优化、开发体验、类型支持和生态未来**这四个维度的综合考量。”

分点阐述（挑 3-4 个重点深入）

**1. 性能与体积优势**

- **更快的渲染与更新**：Vue 3 使用 `Proxy` 替代了 Vue 2 的 `Object.defineProperty`，能劫持整个对象（包括数组、新增属性），无需 `$set` 等额外 API，初始化更快，内存占用更低。
- **Tree-shaking 友好**：核心库按需引入（如 `v-model`、`Transition` 等特性可单独打包），未使用的功能不会打进生产包，相比 Vue 2 可以**减少约 30%-50% 的运行时体积**，对移动端或低网络环境更友好。

**2. Composition API 带来更好的逻辑复用和代码组织**

- **解决逻辑分散问题**：在 Vue 2 中，一个复杂组件的数据（data）、方法（methods）、监听（watch）等散落在不同代码块，维护时需上下反复跳转。Composition API 允许**按关注点（feature）聚合代码**，就像 React Hooks 一样清晰。
- **提升复用效率**：以往用 mixins 容易导致命名冲突和隐式依赖，现在可把复用的逻辑封装成 `useXxx` 函数（如 `useTable`、`useRequest`），**多个组件间共享状态和逻辑变得透明且易于测试**。
- **对 TypeScript 极其友好**：Composition API 天然利于类型推断，配合 `defineProps`、`withDefaults` 等 API，能获得**完整的类型提示和编译时检查**，这对中大型项目和团队协作非常关键——**能大幅降低类型错误和沟通成本**。

**3. 更先进的内置功能和 Vue 生态同步**

- **新的响应式系统**：`ref`、`reactive`、`computed`、`watchEffect` 等更灵活，支持同时监听多个源，副作用自动收集依赖，减少手动追踪的心智负担。
- **碎片 (Fragment)、Teleport、Suspense**：
  - **Fragment**：组件不再需要单一根节点，减少无用 DOM 层级。
  - **Teleport**：方便将弹窗、提示框等渲染到 `body` 上，避免 CSS 层叠和定位污染。
  - **Suspense**：简化异步组件的加载状态管理，虽然目前仍是实验性，但代表未来方向。
- **生态同步更新**：Vue Router、Pinia（官方推荐的状态管理，比 Vuex 更轻量、类型安全）、Vite 等工具链都已基于 Vue 3 深度优化，**新项目默认使用最佳实践，避免技术债务**。

**4. 社区和长期维护趋势**

- Vue 2 已于 2023 年底**停止维护**（包括安全更新），新功能只会添加到 Vue 3。目前主流组件库（Element Plus、Ant Design Vue、Naive UI）和第三方插件都已全面支持 Vue 3，**现在选择 Vue 2 反而面临生态停滞的风险**。

## 27. vite 这块是怎么进行配置优化的

Vite 的优化我一般分成开发阶段和生产构建两个阶段。

1. 开发阶段重点是利用它基于 ESModule 的按需加载能力，以及 optimizeDeps 做依赖预构建，减少冷启动和首屏编译时间。
2. 生产阶段重点是 build 和 Rollup 配置，比如代码分包、按路由或按业务模块拆 chunk、公共依赖抽离、压缩策略、静态资源处理和 sourcemap 控制。除此之外，我还会做别名配置、环境变量隔离、代理配置，以及按项目需要选择合适插件，保证配置清晰、构建稳定、包体可控。

详细说明生产构建优化：

- 用 `manualChunks` 拆包，比如 `react`、`vue`、图表库、编辑器库单独拆
- 路由级动态导入，避免主包过大
- 开启压缩，按需要移除 `console` 和 `debugger`
- 控制 `sourcemap`，开发环境开，生产环境按需开
- 设置合适的 `target`，兼顾兼容性和构建速度

## 28. 你觉得使用 vite 的 manualchunk 分包之后性能优化明显吗

使用 Vite 的 `manualChunks` 进行分包后，性能优化的明显程度取决于项目的具体情况：

- **项目规模**：对于大型项目，合理的分包可以显著减少首屏加载时间，因为用户只需要下载和解析当前页面相关的代码，而不是整个应用。
- **依赖体积**：如果项目中有一些体积较大的第三方库（如图表库、富文本编辑器等），将它们单独拆包可以避免不必要的资源加载，提升性能。
- **用户网络环境**：在网络较差的环境下，分包可以减少一次性下载的资源量，提升加载速度和用户体验。

在当前项目中，我们通过 `manualChunks` 将核心库和业务模块进行合理拆分，确实观察到了首屏加载时间的明显改善。

## 29. 这个 lighthouse 性能优化是有需求要这么做吗

这个优化不是产品侧明确提的需求，更像是我在日常开发里主动做的工程优化。当时我看打包结果和加载链路，发现一些低频大依赖混在首屏包里，缓存利用率也一般，所以我尝试结合 manualChunks 和懒加载把拆包策略做得更合理。它不是为了炫技，而是想把首屏加载和后续缓存命中做得更好。

## 30. 有看过 element-plus 的组件的实现吗？有自己弄一个出来吗

我之前在项目里用过 element-plus 的组件库，虽然没有自己从零实现过一个完整的组件，但我对它的源码结构和一些核心组件（如 Button、Table、Modal）的实现细节有一定了解。比如它是如何通过 props 定义组件的 API，如何使用 Vue 的响应式系统来管理状态，以及如何通过插槽和事件来实现组件的灵活性。我也尝试过根据 element-plus 的设计思路，自己封装过一些基础组件，如通用的表单输入组件和按钮组件，以满足项目的特定需求。

是的，我有仔细研究过 Element Plus 的几个核心组件源码，比如 Button、Form 表单校验、以及复杂的 Table 和 Select 组件。 我主要是想学习大厂组件库的设计模式，比如它们如何处理 props、emits、slots，以及如何抽象可复用的逻辑。

## 31. 有做过引导组件吗。你可以原生做一个吗

## 32. 简历上说封装错误提示框。你是原生地去做还是用现有的 element-plus 组件去做的
