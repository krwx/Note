# angular

- [angular](#angular)
  - [1. ng-if、ng-show、ng-hide 的区别](#1-ng-ifng-showng-hide-的区别)
  - [2. 说一下 angular 的特性](#2-说一下-angular-的特性)
  - [3. angular 的脏检查的原理是什么](#3-angular-的脏检查的原理是什么)
  - [4. route 和 scope 的区别](#4-route-和-scope-的区别)

## 1. ng-if、ng-show、ng-hide 的区别

用途

- ng-show ng-hide ng-if三个都可以用来控制页面DOM元素的显示与隐藏。
- ng-hide条件为true时，隐藏所在元素，false时显示所在元素。
- ng-show相反，条件为true时，显示所在元素，false时隐藏所在元素。
- ng-if 根据表达式的值动态的在当前页面中添加删除页面元素，如果表达式的值为flase，那么这个元素就会从页面中删除，否则会添加一个元素。

工作原理

- ng-show和ng-hide是通过修改css样式的方式控制元素的显示与隐藏，对应的DOM元素会一直存在于当前页面中，
- 而ng-if根据表达式的值动态的添加或者删除元素。ng-if创建元素时，用的是它编译后的代码，如果ng-if内部的代码被其他方式修改过，那么修改只会对本次展现有效，页面重新渲染后修改的效果就会消失，而ng-show和ng-hide则能够保留在DOM元素上次修改后的状态。

## 2. 说一下 angular 的特性

- 特性一：双向数据绑定
- 特性二：模板
  - 在AngularJS中，一个模板就是一个HTML文件。但是HTML的内容扩展了，包含了很多帮助你映射model到view的内容。
- 特性三：MVVM（Moodel-View-ViewModel）
- 特性四：依赖注入（Dependency Injection，DI）
- 特性五：Directives（指令）
- 管道

## 3. angular 的脏检查的原理是什么

Angular 脏检查是一种机制，它基于 Angular 的数据绑定和监控机制，实现了自动化的UI更新。在 Angular 中，所有的控制器、指令、服务和表达式都是通过 `$scope` 对象进行访问和操作的。

脏检查机制基于 `$digest` 循环，这意味着当 Angular 启动时，它会自动调用 `$apply` 函数来开始脏检查循环。`$apply` 函数会检查当前 `$scope` 对象中所有绑定到属性的 `watcher` 函数，如果属性的值发生了变化，它会执行 `watcher` 函数，以便更新UI界面。

在 `$scope` 对象中，每个 `watcher` 函数对应一个属性的值，当属性的值发生变化时， `watcher` 函数会被调用。在脏检查循环中，Angular 会遍历所有的 `watcher` 函数，检查它们所绑定的属性是否发生了变化。如果发现有任何属性变化，Angular 会执行 `watcher` 函数并且更新UI界面。

## 4. route 和 scope 的区别
