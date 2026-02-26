# 理念

- [理念](#理念)
  - [React理念](#react理念)
    - [React理念介绍](#react理念介绍)
    - [CPU瓶颈](#cpu瓶颈)
    - [IO瓶颈](#io瓶颈)
  - [React16架构](#react16架构)
    - [Reconciler](#reconciler)
    - [Renderer（渲染器）](#renderer渲染器)
  - [Fiber架构](#fiber架构)
    - [Fiber的含义](#fiber的含义)
    - [Fiber节点的属性定义](#fiber节点的属性定义)
      - [**作为架构**](#作为架构)
      - [**作为静态的数据结构**](#作为静态的数据结构)
      - [**作为动态的工作单元**](#作为动态的工作单元)
  - [Fiber的工作原理](#fiber的工作原理)
    - [双缓存Fiber树](#双缓存fiber树)
    - [mount时的工作流程](#mount时的工作流程)
    - [update时的工作原理](#update时的工作原理)
  - [JSX](#jsx)

## React理念

### React理念介绍

重点是 快速响应.制约快速响应的因素有 `CPU` 瓶颈和 `IO` 瓶颈

### CPU瓶颈

主流浏览器刷新频率为 `60Hz` ，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。我们知道，JS可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器布局、绘制不能同时执行。  

在每16.6ms时间内，需要完成如下工作：JS脚本执行 -----  样式布局 ----- 样式绘制

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了，导致页面掉帧，造成卡顿。  

解决方案：将长任务被拆分到每一帧不同的task中，JS脚本执行时间大体在5ms左右，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性。

解决CPU瓶颈的关键是实现时间切片，而时间切片的关键是：将同步的更新变为可中断的异步更新。

### IO瓶颈

React实现了Suspense (opens new window)功能及配套的hook——useDeferredValue (opens new window)。

而在源码内部，为了支持这些特性，同样需要将同步的更新变为可中断的异步更新

***

## React16架构

React16架构可以分为三层：

- `Scheduler` （调度器）—— 调度任务的优先级，高优任务优先进入 `Reconciler`
- `Reconciler` （协调器）—— 负责找出变化的组件
- `Renderer` （渲染器）—— 负责将变化的组件渲染到页面上

渲染流程可以分为：

1. `schedule` 阶段，当触发状态改变后， `schedule` 阶段判断触发的更新的优先级，通知 `render` 阶段接下来应该处理哪个更新。
2. `render` 阶段，收到 `schedule` 阶段的通知，处理更新对应的 `JSX` ，决定哪些 `JSX` 对象是需要最终被渲染的。
3. `commit` 阶段，将 `render` 阶段整理出的需要被渲染的内容渲染到页面上。

### Reconciler

更新工作为可以**中断的循环过程**

``` js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  // workInProgress 为当前要处理的节点。shouldYield() 判断是否中断
  // 中断的理由：1、有其他更高优任务需要先更新；2、当前帧没有剩余时间
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

当 `Scheduler` 将任务交给 `Reconciler` `后，Reconciler` 会为变化的虚拟 `DOM` 打上代表增/删/更新的标记

整个 `Scheduler` 与 `Reconciler` 的工作都在内存中进行。只有当所有组件都完成 `Reconciler` 的工作，才会统一交给 `Renderer`

在组件 `mount` 时， `Reconciler` 根据JSX描述的组件内容生成组件对应的 `Fiber` 节点。在 `update` `时，Reconciler` 将 `JSX` 与 `Fiber` 节点保存的数据对比，生成组件对应的 `Fiber` 节点，并根据对比结果为 `Fiber` 节点打上标记

### Renderer（渲染器）

`Renderer` 根据 `Reconciler` 为虚拟 `DOM` 打的标记，同步执行对应的 `DOM` 操作

## Fiber架构

`React Fiber` 可以理解为：  

`React` 内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。其中每个任务更新单元为 `React Element` 对应的 `Fiber` 节点。

### Fiber的含义

Fiber包含三层含义：

1. 作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16 的 `Reconciler` 基于 `Fiber` 节点实现，被称为 `Fiber Reconciler` 。
2. 作为静态的数据结构来说，每个 `Fiber` 节点对应一个 `React element` ，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
3. 作为动态的工作单元来说，每个 `Fiber` 节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）

### Fiber节点的属性定义

#### **作为架构**

`Fiber` 节点靠下面的节点连接形成树。 `Fiber` 节点构成的 `Fiber` 树就对应 `DOM` 树

``` js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

父级指针叫做 `return` 而不是 `parent` 或者 `father` 的原因：  

因为作为一个工作单元， `return` 指节点执行完 `completeWork` （本章后面会介绍）后会返回的下一个节点。子 `Fiber` 节点及其兄弟节点完成工作后会返回其父级节点，所以用 `return` 指代父级节点。

#### **作为静态的数据结构**

保存组件相关的信息

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

#### **作为动态的工作单元**

作为动态的工作单元，Fiber中如下参数保存了本次更新相关的信息，我们会在后续的更新流程中使用到具体属性时再详细介绍

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// 保存本次更新会造成的DOM操作，包括插入、更新、删除。effectTag 除了可以表示 DOM 操作，也可以表示别的
this.effectTag = NoEffect;
this.nextEffect = null;

// 保存effectList的节点信息
this.firstEffect = null;
this.lastEffect = null;

// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;

// 指向该fiber在另一次更新时对应的fiber
this.alternate = null;
```

## Fiber的工作原理

### 双缓存Fiber树

在 `React` 中最多会同时存在两棵 `Fiber` 树。当前屏幕上显示内容对应的 `Fiber` 树称为`current Fiber`树，正在内存中构建的 `Fiber` 树称为`workInProgress Fiber`树。

`current Fiber`树中的 `Fiber` 节点被称为`current fiber`，`workInProgress Fiber`树中的 `Fiber` 节点被称为`workInProgress fiber`，他们通过 `alternate` 属性连接。

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

React 应用的根节点通过使 `current` 指针在不同 `Fiber` 树的 `rootFiber` 间切换来完成 `current Fiber` 树指向的切换。

即当 `workInProgress Fibe` 树构建完成交给 `Renderer` 渲染在页面上后，应用根节点的 `current` 指针指向 `workInProgress Fiber` 树，此时 `workInProgress Fiber` 树就变为 `current Fiber` 树。

每次状态更新都会产生新的 `workInProgress Fiber` 树，通过 `current` 与 `workInProgress` 的替换，完成DOM更新。

### mount时的工作流程

1. 首次执行 `ReactDOM.render` 会创建 `fiberRootNode` （源码中叫fiberRoot）和 `rootFiber` 。其中 `fiberRootNode` 是整个应用的根节点， `rootFiber` 是`<App/>`所在组件树的根节点。
    1. 之所以要区分 `fiberRootNode` 与 `rootFiber` ，是因为在应用中我们可以多次调用 `ReactDOM.render` 渲染不同的组件树，他们会拥有不同的 `rootFiber` 。但是整个应用的根节点只有一个，那就是 `fiberRootNode` 。
    2. `fiberRootNode` 的 `current` 会指向当前页面上已渲染内容对应 `Fiber` 树，即 `current Fiber` 树。
    3. 由于是首屏渲染，页面中还没有挂载任何DOM，所以 `fiberRootNode.current` 指向的 `rootFiber` 没有任何子 `Fiber` 节点（即 `current Fiber` 树为空）。
2. 接下来进入 `render` 阶段，根据组件返回的 JSX 在内存中依次创建 `Fiber` 节点并连接在一起构建 Fiber 树，被称为 `workInProgress Fiber` 树。
    1. 在构建 `workInProgress Fiber` 树时会尝试复用 `current Fiber` 树中已有的 `Fiber` 节点内的属性，在首屏渲染时只有 `rootFiber` 存在对应的 `current fiber`。
3. 图中右侧已构建完的 `workInProgress Fiber` 树在 `commit` 阶段渲染到页面。
    1. 此时 `DOM` 更新为右侧树对应的样子。 `fiberRootNode` 的 `current` 指针指向 `workInProgress Fiber` 树使其变为 `current Fiber` 树。

### update时的工作原理

1. 构建一棵新的 `workInProgress Fiber` 树。
   1. `workInProgress fiber` 的创建可以复用 `current Fiber` 树对应的节点数据。决定是否复用的过程就是 `Diff` 算法
2. `workInProgress Fiber` 树在 `render` 阶段完成构建后进入 `commit` 阶段渲染到页面上。渲染完毕后，`workInProgress Fiber` 树变为 `current Fiber` 树

## JSX

1. `JSX` 在编译时会被 `Babel` 编译为 `React.createElement` 方法
2. `React.createElement` 最终会调用 `ReactElement` 方法返回一个包含组件数据的对象，该对象有个参数`$$typeof: REACT_ELEMENT_TYPE`标记了该对象是个`React Element`
3. React Element、React Component、instance 的区别
