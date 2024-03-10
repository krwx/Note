# vue 面试问题

## 1. vue 的生命周期钩子函数有哪些

 选项式：

- onMounted()
- onUpdated()
- onUnmounted()
- onBeforeMount()
- onBeforeUpdate()
- onBeforeUnmount()
- onErrorCaptured()
- onRenderTracked()
- onRenderTriggered()
- onActivated()
- onDeactivated()
- onServerPrefetch()

组合式：

Vue 一共有8个生命阶段，分别是创建前、创建后、加载前、加载后、更新前、更新后、销毁前和销毁后，每个阶段对应了一个生命周期的钩子函数。

（1）beforeCreate 钩子函数，在实例初始化之后，在数据监听和事件配置之前触发。因此在这个事件中我们是获取不到 data 数据的。

（2）created 钩子函数，在实例创建完成后触发，此时可以访问 data、methods 等属性。但这个时候组件还没有被挂载到页面中去，所以这个时候访问不到 $el 属性。一般我们可以在这个函数中进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化。

（3）beforeMount 钩子函数，在组件被挂载到页面之前触发。在 beforeMount 之前，会找到对应的 template，并编译成 render 函数。

（4）mounted 钩子函数，在组件挂载到页面之后触发。此时可以通过 DOM API 获取到页面中的 DOM 元素。

（5）beforeUpdate 钩子函数，在响应式数据更新时触发，发生在虚拟 DOM 重新渲染和打补丁之前，这个时候我们可以对可能会被移除的元素做一些操作，比如移除事件监听器。

（6）updated 钩子函数，虚拟 DOM 重新渲染和打补丁之后调用。

（7）beforeDestroy 钩子函数，在实例销毁之前调用。一般在这一步我们可以销毁定时器、解绑全局事件等。

（8）destroyed 钩子函数，在实例销毁之后调用，调用后，Vue 实例中的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

当我们使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

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

## 4. vue的数据绑定原理是什么？

Vue 2 使用 `getter / setters` 完全是出于支持旧版本浏览器的限制。

而在 Vue 3 中则使用了 `Proxy` 来创建响应式对象，仅将 `getter / setter` 用于 `ref`。

## 5. 为什么 vue3 使用 Proxy 进行绑定

Vue2

- 使用Object.defineProperty
- 无法监听删除属性的操作
- 需要遍历目标对象的所有属性并加上 setter getter 才能监听
- 对于对象的新增属性，需要手动监听
- 在遇到一个对象的属性还是一个对象的情况下，需要递归监听。
- 对于数组通过push、unshift方法增加的元素，也无法监听

Vue3

- 使用Proxy双向数据绑定
- Proxy代理的是整个对象，而不是对象的某个特定属性，不需要我们通过遍历来逐个进行数- 据绑定。
- Object.defineProperty中的问题都能解决.
- Proxy支持13种拦截操作
- Proxy常常搭配Reflect使用

## 6. 了解 vue 的原理吗
