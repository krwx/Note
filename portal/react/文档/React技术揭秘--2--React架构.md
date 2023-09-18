- [Render阶段](#render阶段)
  - [流程概览](#流程概览)
    - [介绍](#介绍)
    - [“递”阶段](#递阶段)
    - [“归”阶段](#归阶段)
  - [beginwork](#beginwork)
    - [reconcileChildren](#reconcilechildren)
    - [effectTag](#effecttag)
  - [complete work](#complete-work)
    - [update](#update)
    - [mount](#mount)
    - [effectList](#effectlist)
- [Commit阶段](#commit阶段)
  - [概述](#概述)
  - [before mutation 阶段之前](#before-mutation-阶段之前)
  - [before mutation 阶段](#before-mutation-阶段)
  - [mutation 阶段](#mutation-阶段)
    - [Placement effect](#placement-effect)
    - [Update effect](#update-effect)
    - [Deletion effect](#deletion-effect)
  - [layout 阶段](#layout-阶段)
    - [current Fiber 树在 mutation 阶段结束后 layout 阶段开始前切换的理由](#current-fiber-树在-mutation-阶段结束后-layout-阶段开始前切换的理由)
  - [layout 阶段之后](#layout-阶段之后)

# Render阶段
## 流程概览
### 介绍
Render阶段的主要工作是 **创建Fiber节点、DOM节点和构建Fiber树**

render阶段开始于 `performSyncWorkOnRoot` 或  `performConcurrentWorkOnRoot` 方法的调用。这取决于本次更新是同步更新还是异步更新。
```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// performConcurrentWorkOnRoot会调用该方法
// 如果当前浏览器帧没有剩余时间，shouldYield会中止循环，直到浏览器有空闲时间后再继续遍历
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
/**
 * workInProgress代表当前已创建的workInProgress fiber。
 * performUnitOfWork方法会创建下一个Fiber节点并赋值给workInProgress，并将workInProgress与已创建的Fiber节点连接起来构成Fiber树
*/
```
render阶段是一个递归流程。  
首先是递阶段，先深度遍历schedule阶段传过来的JSX，创建Fiber节点，然后根据节点的操作类型，连接成Fiber树。  
最后是归阶段，

### “递”阶段
首先从rootFiber开始向下深度优先遍历。为遍历到的每个Fiber节点调用**beginWork**方法。

该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

### “归”阶段
在“归”阶段会调用**completeWork**处理Fiber节点。

当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其兄弟Fiber的“递”阶段。

如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段。

**“递”和“归”阶段会交错执行直到“归”到rootFiber**。至此，render阶段的工作就结束了。

递阶段的工作形成 Fiber 树，归阶段的工作形成 effectList 和 DOM 树。

## beginwork
beginWork的主要工作是形成 Fiber 节点。

beginWork的工作可以分为两部分：
* update时：如果current存在，在满足一定条件时可以复用current节点，这样就能克隆current.child作为workInProgress.child，而不需要新建workInProgress.child。
* mount时：除fiberRootNode以外，current === null。会根据fiber.tag不同，创建不同类型的子Fiber节点

```js
function beginWork(
  current: Fiber | null, // 当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate。mount 时为 null，update 时为 null。可以根据current是否为 null 判断是 mount 还是 update。
  workInProgress: Fiber, // 当前组件对应的Fiber节点
  renderLanes: Lanes, // 优先级相关
): Fiber | null { // 会返回一个 Fiber 节点或者 null
  
  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  // didReceiveUpdate 表示是否有节点需要更新。false代表没有更新，直接复用前一次更新的子Fiber；true代表有更新，创建新节点。是一个共享的变量，其他方法也有用到
  if (current !== null) {
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;

    // 判断 props与fiber.type 是否不相同。
    if (
      oldProps !== newProps ||
      hasLegacyContextChanged() ||
      (__DEV__ ? workInProgress.type !== current.type : false)
    ) {
      didReceiveUpdate = true;
    } else if (!includesSomeLane(renderLanes, updateLanes)) { // includesSomeLane() 判断Fiber节点优先级。!includesSomeLane(renderLanes, updateLanes) 表示 当前Fiber节点优先级不够
      didReceiveUpdate = false;
      switch (workInProgress.tag) {
        // 省略处理
      }
      return bailoutOnAlreadyFinishedWork(
        current,
        workInProgress,
        renderLanes,
      );
      // bailoutOnAlreadyFinishedWork() 判断子树是否需要更新，需要的话返回 workInProgress.child；不需要的话返回 null
    } else {
      didReceiveUpdate = false;
    }
  } else {
    didReceiveUpdate = false;
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent: 
      // ...省略
    case LazyComponent: 
      // ...省略
    case FunctionComponent: 
      // ...省略
    case ClassComponent: 
      // ...省略
    case HostRoot:
      // ...省略
    case HostComponent:
      // ...省略
    case HostText:
      // ...省略
    // ...省略其他类型
  }
}
```

update时复用原有Fiber节点的条件：
* oldProps === newProps && workInProgress.type === current.type，即props与fiber.type不变
* !includesSomeLane(renderLanes, updateLanes)，即当前Fiber节点优先级不够，会在讲解Scheduler时介绍

mount 都是新建Fiber节点；update 会复用原有 Fiber 节点或新建 Fiber节点

新建Fiber节点，常见的组件类型，如（FunctionComponent/ClassComponent/HostComponent），最终会进入 **reconcileChildren** 方法

### reconcileChildren
reconcileChildren() 的作用是新建 Fiber 节点。

* 对于mount的组件，他会创建新的子Fiber节点
* 对于update的组件，他会**将当前组件与该组件在上次更新时对应的Fiber节点比较**（也就是俗称的**Diff算法**），将比较的结果生成新Fiber节点

```js
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  // mount 和 update 最终都会生成新的子Fiber节点并赋值给workInProgress.child
  // reconcileChildFibers 会为生成的 Fiber 节点带上 effectTag 属性，而 mountChildFibers不会
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    );
  } else {
    // 对于update的组件
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    );
  }
}
```

### effectTag
* DOM操作的具体类型就保存在fiber.effectTag中，例如：Placement 、Update 、PlacementAndUpdate 和 Deletion 。

* 通知Renderer将Fiber节点对应的DOM节点插入页面中，需要满足两个条件：
  1. fiber.stateNode存在，即Fiber节点中保存了对应的DOM节点
  2. (fiber.effectTag & Placement) !== 0，即Fiber节点存在Placement effectTag

* mount时，fiber 的 stateNode 是为空的，会在 complete work 里面填充 DOM 节点。  
* mount时，每个 Fiber 节点不会设置 Placement effectTag，这样每个DOM节点都要插入，影响效率。所有只在 rootFiber 设置 Placement effectTag。  
* 因为 complete work 完成时已经形成了一个完整的 DOM 树，所以只需在 commit 执行一次 root 节点的插入动作就行。

## complete work
complete work 的主要工作是根据 Fiber 节点形成 commit 阶段需要渲染的内容。这里我们重点关注页面渲染所必须的 HostComponent（即原生DOM组件对应的Fiber节点）

```js
function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    // ...省略
    case HostComponent: {
      popHostContext(workInProgress);
      const rootContainerInstance = getRootHostContainer();
      const type = workInProgress.type;
      // 只有当前组件上一次的 Fiber 节点不为空且当前 Fiber 节点有设置 DOM 节点时才更新
      if (current !== null && workInProgress.stateNode != null) {
        // update的情况
        updateHostComponent(
          current,
          workInProgress,
          type,
          newProps,
          rootContainerInstance,
        );
      } else {
        // mount的情况
        // ...省略
      }
      return null;
    }
  // ...省略
```
### update
当update时，Fiber节点已经存在对应DOM节点，所以不需要生成DOM节点。需要做的主要是处理props，比如：
* onClick、onChange等回调函数的注册
* 处理style prop
* 处理DANGEROUSLY_SET_INNER_HTML prop
* 处理children prop

在`updateHostComponent`内部，被处理完的props会被赋值给`workInProgress.updateQueue`，并最终会在commit阶段被渲染在页面上。

其中`updatePayload`为数组形式，他的偶数索引的值为变化的prop key，奇数索引的值为变化的prop value。

### mount
mount时的主要逻辑包括三个：
* 为Fiber节点生成对应的DOM节点
* 将子孙DOM节点插入刚生成的DOM节点中
* 与 update 逻辑中的 updateHostComponent 类似的处理props的过程

```js
// mount的情况
// ...省略服务端渲染相关逻辑
const currentHostContext = getHostContext();
// 为 fiber 创建对应 DOM 节点
const instance = createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress,
  );
// 将子孙 DOM 节点插入刚生成的 DOM 节点中
appendAllChildren(instance, workInProgress, false, false);
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance;

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
  )
) {
  markUpdate(workInProgress);
}
```
由于completeWork属于“归”阶段调用的函数，每次调用 appendAllChildren 时都会将已生成的子孙 DOM 节点插入当前生成的 DOM 节点下。那么当“归”到 rootFiber 时，我们已经有一个构建好的离屏DOM树

在`performSyncWorkOnRoot`函数中`fiberRootNode`被传递给`commitRoot`方法，开启commit阶段工作流程

### effectList
在completeWork的上层函数 completeUnitOfWork 中，每个执行完 completeWork 且存在effectTag的Fiber节点会被保存在一条被称为effectList的单向链表中。

effectList中第一个Fiber节点保存在fiber.firstEffect，最后一个元素保存在fiber.lastEffect。

类似appendAllChildren，在“归”阶段，所有有effectTag的Fiber节点都会被追加在effectList中，最终形成一条以`rootFiber.firstEffect`为起点的单向链表。
```
                       nextEffect         nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```
注意：起点是 `rootFiber` ，不是 `fiberRootNode`。effectList 是一个链表，没有实际的数组存放 effectList。

这样，在commit阶段只需要遍历effectList就能执行所有effect了。

# Commit阶段
## 概述
commit阶段的主要工作（即Renderer的工作流程）分为三部分：
* before mutation阶段（执行DOM操作前）
* mutation阶段（执行DOM操作）
* layout阶段（执行DOM操作后）

commit 阶段主要工作：处理需要执行副作用的Fiber节点的单向链表effectList，执行副作用对应的DOM操作。执行一些生命周期钩子（比如componentDidXXX）和 hook（比如useEffect）

## before mutation 阶段之前
```js
do {
    // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
    // 触发useEffect回调 不是 调用 useEffect
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  // root指 fiberRootNode
  // root.finishedWork指当前应用的rootFiber
  const finishedWork = root.finishedWork;

  // 凡是变量名带lane的都是优先级相关
  const lanes = root.finishedLanes;
  if (finishedWork === null) {
    return null;
  }
  root.finishedWork = null;
  root.finishedLanes = NoLanes;

  // 重置Scheduler绑定的回调函数
  root.callbackNode = null;
  root.callbackId = NoLanes;

  let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
  // 重置优先级相关变量
  markRootFinished(root, remainingLanes);

  // 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。
  if (rootsWithPendingDiscreteUpdates !== null) {
    if (
      !hasDiscreteLanes(remainingLanes) &&
      rootsWithPendingDiscreteUpdates.has(root)
    ) {
      rootsWithPendingDiscreteUpdates.delete(root);
    }
  }

  // 重置全局变量
  if (root === workInProgressRoot) {
    workInProgressRoot = null;
    workInProgress = null;
    workInProgressRootRenderLanes = NoLanes;
  } else {
  }

  /**
   * 将effectList赋值给firstEffect
   * 由于每个fiber的effectList只包含他的子孙节点，所以根节点如果有effectTag则不会被包含进来
   * 所以如果根节点带有 effectTag ，则需要插入到effectList的尾部，这样才能保证有effect的fiber都在effectList中
  */
  let firstEffect;
  if (finishedWork.effectTag > PerformedWork) {
    if (finishedWork.lastEffect !== null) {
      // 插入effectList的尾部
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // 根节点没有effectTag
    firstEffect = finishedWork.firstEffect;
  }
```
`firstEffect` 就是需要处理的 `effectList`

## before mutation 阶段
整个过程就是遍历effectList并调用 `commitBeforeMutationEffects` 函数处理。

```js
function commitBeforeMutationEffects() {
  // 遍历 effectList
  while (nextEffect !== null) {
    const current = nextEffect.alternate;

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag;

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```
commitBeforeMutationEffects 的主要内容：
1. 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑。
2. 调用 `getSnapshotBeforeUpdate` 生命周期钩子。
   1. `commitBeforeMutationEffectOnFiber` 是 `commitBeforeMutationLifeCycles` 的别名。在该方法内会调用 `getSnapshotBeforeUpdate`。
   2. `getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用，可以在更新 DOM 前获取 props 和 state
3. 调度 `useEffect` 。不是 调用 `useEffect`
   1. scheduleCallback 方法由 Scheduler 模块提供，用于以某个优先级异步调度一个回调函数.
   2. 异步调度的回调函数就是触发 useEffect 的方法 flushPassiveEffects 

## mutation 阶段
整个过程就是遍历effectList并调用 `commitMutationEffects` 函数处理。该方法的主要工作为“根据 effectTag 调用不同的处理函数处理 Fiber 。

``` js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {

    const effectTag = nextEffect.effectTag;

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        break;
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect)
        nextEffect.effectTag &= ~Placement;
        // 更新
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
      // ...其他case
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```
`commitMutationEffects` 会遍历effectList，对每个Fiber节点执行如下三个操作：
1. 根据ContentReset effectTag重置文字节点
2. 更新ref
3. 根据 effectTag 分别处理，其中effectTag包括(Placement | Update | Deletion | Hydrating)

### Placement effect
当Fiber节点含有Placement effectTag，意味着该Fiber节点对应的DOM节点需要插入到页面中。

调用的方法为 `commitPlacement` 。分为以下三步：
1. 获取父级DOM节点。其中finishedWork为传入的Fiber节点。
```js
const parentFiber = getHostParentFiber(finishedWork);
// 父级DOM节点
const parentStateNode = parentFiber.stateNode;
```
2. 获取Fiber节点的DOM兄弟节点
```js
const before = getHostSibling(finishedWork);
```
3. 根据DOM兄弟节点是否存在决定调用 `parentNode.insertBefore` 或 `parentNode.appendChild` 执行DOM插入操作。
```js
// parentStateNode是否是rootFiber
if (isContainer) {
  insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
} else {
  insertOrAppendPlacementNode(finishedWork, before, parent);
}
```
值得注意的是，getHostSibling（获取兄弟DOM节点）的执行很耗时，当在同一个父Fiber节点下依次执行多个插入操作，getHostSibling算法的复杂度为指数级。这是由于Fiber节点不只包括 HostComponent ，所以Fiber树和渲染的DOM树节点并不是一一对应的。要从Fiber节点找到DOM节点很可能跨层级遍历。

### Update effect
当Fiber节点含有Update effectTag，意味着该Fiber节点需要更新。调用的方法为 `commitWork`。

* FunctionComponent mutation
  * 当 fiber.tag 为 FunctionComponent ，会调用 commitHookEffectListUnmount 。该方法会遍历 effectList ，**执行所有`useLayoutEffect hook` 的销毁函数**。
* HostComponent mutation
  * 当 fiber.tag 为 HostComponent，会调用 commitUpdate 。最终会在 updateDOMProperties 中将 render 阶段 completeWork 中为 Fiber 节点赋值的 updateQueue 对应的内容渲染在页面上

### Deletion effect
当Fiber节点含有Deletion effectTag，意味着该Fiber节点对应的DOM节点需要从页面中删除。调用的方法为 ```commitDeletion``` 。  
该方法会执行如下操作：
1. 递归调用Fiber节点及其子孙Fiber节点中fiber.tag为 ClassComponent 的 `componentWillUnmount` 生命周期钩子，从页面移除Fiber节点对应DOM节点
2. 解绑ref
3. 调度useEffect的销毁函数

## layout 阶段
layout 阶段会遍历 effectList ，依次执行 `commitLayoutEffects` 。该方法的主要工作为根据 effectTag 调用不同的处理函数处理 Fiber 并更新 ref.

这个阶段可以访问到已更新的 DOM ，但是还没渲染到页面上。

``` js
function commitLayoutEffects(root: FiberRoot, committedLanes: Lanes) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    // 调用生命周期钩子和hook
    if (effectTag & (Update | Callback)) {
      const current = nextEffect.alternate;
      commitLayoutEffectOnFiber(root, current, nextEffect, committedLanes);
    }

    // 赋值ref
    if (effectTag & Ref) {
      commitAttachRef(nextEffect);
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```
`commitLayoutEffects` 一共做了两件事：
1. `commitLayoutEffectOnFiber` （调用生命周期钩子和hook相关操作）
   1. 对于 `ClassComponent` ，他会通过 `current === null?` 区分是 mount 还是 update，调用 `componentDidMount` 或 `componentDidUpdate` 。触发状态更新的 `this.setState` 如果赋值了第二个参数回调函数，也会在此时调用。
   2. 对于 `FunctionComponent` 及相关类型，他会**调用 `useLayoutEffect hook` 的回调函数，调度 `useEffect` 的销毁与回调函数**
      > 相关类型指特殊处理后的FunctionComponent，比如ForwardRef、React.memo包裹的FunctionComponent
      ```js
      switch (finishedWork.tag) {
        // 以下都是FunctionComponent及相关类型
        case FunctionComponent:
        case ForwardRef:
        case SimpleMemoComponent:
        case Block: {
          // 执行useLayoutEffect的回调函数
          commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
          // 调度useEffect的销毁函数与回调函数
          schedulePassiveEffects(finishedWork);
          return;
      }
      ```
2. `commitAttachRef` （赋值 ref）：获取 DOM 实例，更新 ref

`useLayoutEffect` 与 `useEffect` 的区别:
* `useLayoutEffect hook` 从 `mutation` 阶段的销毁函数调用到 `layout` 阶段的回调函数调用是同步执行的。
* 而 `useEffect` 则需要先在 `before mutation` 阶段调度，在 `Layout` 阶段完成后再异步执行

### current Fiber 树在 mutation 阶段结束后 layout 阶段开始前切换的理由
切换通过下面的代码实现：
``` js
root.current = finishedWork;
```
在双缓存机制一节我们介绍过，workInProgress Fiber 树在 commit 阶段完成渲染后会变为 current Fiber 树。这行代码的作用就是切换 fiberRootNode 指向的 current Fiber 树。

在 mutation 阶段结束后 layout 阶段开始前切换的理由：
* `componentWillUnmount` 会在 mutation 阶段执行。此时 current Fiber 树还指向前一次更新的 Fiber 树，在生命周期钩子内获取的 DOM 还是更新前的。
* `componentDidMount` 和 `componentDidUpdate` 会在 layout 阶段执行。此时 current Fiber 树已经指向更新后的 Fiber 树，在生命周期钩子内获取的 DOM 就是更新后的。


## layout 阶段之后

```js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;

// useEffect相关
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
  pendingPassiveEffectsRenderPriority = renderPriorityLevel;
} else {}

// 性能优化相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    // ...
  }
} else {
  // ...
}

// 性能优化相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    // ...
  }
}

// ...检测无限循环的同步任务
if (remainingLanes === SyncLane) {
  // ...
} 

// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
ensureRootIsScheduled(root, now());

// ...处理未捕获错误及老版本遗留的边界问题


// 执行同步任务，这样同步任务不需要等到下次事件循环再执行
// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
// 或useLayoutEffect
flushSyncCallbackQueue();

return null;
```
主要工作内容：
1. useEffect相关的处理。  
我们会在讲解layout阶段时讲解。

2. 性能追踪相关。  
源码里有很多和interaction相关的变量。他们都和追踪React渲染时间、性能相关，在Profiler API (opens new window)和DevTools (opens new window)中使用。

1. 在commit阶段会触发一些生命周期钩子（如 componentDidXXX）和hook（如useLayoutEffect、useEffect）。