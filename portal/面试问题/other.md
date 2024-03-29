# other

- [other](#other)
  - [1. 除了npm，还了解其他管理包的工具吗？](#1-除了npm还了解其他管理包的工具吗)
  - [2. 讲一下怎么部署代码的 / 代码怎么部署到服务器（应该是问 node.js 的知识）](#2-讲一下怎么部署代码的--代码怎么部署到服务器应该是问-nodejs-的知识)
  - [3. 在重构代码的时候有用过哪些设计模式 / 在重构代码时是根据哪些设计模式更改代码](#3-在重构代码的时候有用过哪些设计模式--在重构代码时是根据哪些设计模式更改代码)
  - [4. 性能优化具体做了哪些工作](#4-性能优化具体做了哪些工作)
  - [5. 重构代码具体做了哪些工作](#5-重构代码具体做了哪些工作)
  - [6. 有做过 h5 网页吗？](#6-有做过-h5-网页吗)
  - [7. 为什么项目使用这种架构？为什么不用微前端的架构](#7-为什么项目使用这种架构为什么不用微前端的架构)
  - [8. 模块之间是怎么通信的](#8-模块之间是怎么通信的)
  - [9. 有了解 qiankun 架构吗](#9-有了解-qiankun-架构吗)
  - [10. 讲一下拓扑图的绘制过程。为什么采用svg，不用canvas](#10-讲一下拓扑图的绘制过程为什么采用svg不用canvas)
  - [11. 如果已经拿到10万条数据，需要拿这些数据进行运算，绘制一个折线图，怎么处理才不会阻止渲染（除了将数据拆分成小份，还有什么方法）](#11-如果已经拿到10万条数据需要拿这些数据进行运算绘制一个折线图怎么处理才不会阻止渲染除了将数据拆分成小份还有什么方法)
  - [12. 数据拆分成小份，多小会比较好](#12-数据拆分成小份多小会比较好)
  - [13. 如果一个项目代码量过大，这时候可以怎么处理，除了 webpack 优化外](#13-如果一个项目代码量过大这时候可以怎么处理除了-webpack-优化外)
  - [14. 讲一下新建一个项目/代码库的流程](#14-讲一下新建一个项目代码库的流程)
  - [15. 为什么新建这一个流程不弄成自动化，而是手工配置](#15-为什么新建这一个流程不弄成自动化而是手工配置)
  - [16. 当页面有一个查询多种数据的流程，怎么判断是前端去做还是后端去新建 rest 口去做](#16-当页面有一个查询多种数据的流程怎么判断是前端去做还是后端去新建-rest-口去做)
  - [17. 假如实现一个 table 组件，要一页展示10万条数据，怎么实现](#17-假如实现一个-table-组件要一页展示10万条数据怎么实现)
  - [18. antd的版本是什么，react的版本是什么](#18-antd的版本是什么react的版本是什么)
  - [19. 讲一下vue、react、angular 框架的理解](#19-讲一下vuereactangular-框架的理解)
  - [20. 组件库怎么打包，打包出来的文件是什么，包含了哪种类型的文件。，你了解.d.ts 文件吗？有什么作用](#20-组件库怎么打包打包出来的文件是什么包含了哪种类型的文件你了解dts-文件吗有什么作用)
  - [21. 包怎么构建，怎么发布。其他项目怎么通过npm install 引入本地更改的包](#21-包怎么构建怎么发布其他项目怎么通过npm-install-引入本地更改的包)
  - [22. 在构建响应式网页时，你通常会采用什么策略来确保页面在不同设备和浏览器上都能良好展示？](#22-在构建响应式网页时你通常会采用什么策略来确保页面在不同设备和浏览器上都能良好展示)
  - [23. 您如何处理不同浏览器之间的兼容性问题？](#23-您如何处理不同浏览器之间的兼容性问题)
  - [24. 好的，那接下来谈谈，在前后端分离开发时，你是如何处理前端与后端之间的接口对接和数据交互的？](#24-好的那接下来谈谈在前后端分离开发时你是如何处理前端与后端之间的接口对接和数据交互的)

## 1. 除了npm，还了解其他管理包的工具吗？

有 pnpm、yarn

## 2. 讲一下怎么部署代码的 / 代码怎么部署到服务器（应该是问 node.js 的知识）

## 3. 在重构代码的时候有用过哪些设计模式 / 在重构代码时是根据哪些设计模式更改代码

1. 单例模式。比如：弹窗，无论点击多少次，弹窗只应该被创建一次。
2. 策略模式。一个资源过滤器可以根据输入的过滤的字段显示对应的过滤器
3. 代理模式。使用虚拟代理实现图片懒加载

## 4. 性能优化具体做了哪些工作

1. 去掉过多的if else 语句，采用switch case 的方式实现，使用策略模式
2. 减少循环次数
3. 重新设计 css 选择器，选择元素更准确。有个选择器更改了某个类里面的宽度，但是其他地方同一个类的宽带不用改变
4. 使用 React.memo 存储一些需要复杂计算的值
5. 用 CSS 动画代替 JavaScript 动画
6. 使用 Web Workers 处理 CPU 密集任务

## 5. 重构代码具体做了哪些工作

1. 提取公共组件、公共服务
2. 更改校验的逻辑

## 6. 有做过 h5 网页吗？

## 7. 为什么项目使用这种架构？为什么不用微前端的架构

## 8. 模块之间是怎么通信的

## 9. 有了解 qiankun 架构吗

## 10. 讲一下拓扑图的绘制过程。为什么采用svg，不用canvas

## 11. 如果已经拿到10万条数据，需要拿这些数据进行运算，绘制一个折线图，怎么处理才不会阻止渲染（除了将数据拆分成小份，还有什么方法）

1. 虚拟列表  
   通过滚动的方式，当滚动到需要加载数据的时候绘制数据，展示在表格上
2. 使用 webworker 来请求数据

other：

1. 分页加载：将数据分成多个页面进行加载，这样可以减少单个页面中的数据量，降低加载压力。
2. 懒加载：在用户滚动页面时才加载数据，而不是一次性将所有数据都加载出来。这种方式能够减少页面初始加载的数据量。
3. 数据压缩：对于一些文本数据可以使用压缩算法，将数据压缩后再传输到前端，减少传输的数据量。
4. 合并请求：将多个请求合并成一个请求，减少请求次数和传输数据量。
5. 数据缓存：对于一些不常变化的数据，可以在前端使用本地缓存来提高访问速度。

## 12. 数据拆分成小份，多小会比较好

## 13. 如果一个项目代码量过大，这时候可以怎么处理，除了 webpack 优化外

1. 优化构建配置
   1. 我会仔细审视项目的构建工具配置，比如 `Webpack` 或者 `Rollup` 的配置，以确保它们充分利用了缓存、使用了合适的加载器和插件等。通过调整构建配置，可以减少重复的工作，提高编译速度。
   2. 比如，利用 `babel-loader` 的缓存选项可以减少 `Babel` 的重复编译
2. 代码拆分和懒加载：
   1. 对于大型单页应用，我会考虑将代码拆分成多个小块，然后根据需要进行懒加载。这样在初始加载时只加载必要的代码，其他代码在需要的时候再加载，从而减少初始编译和加载的时间。
   2. 实现：路由懒加载
3. 依赖管理：
   1. 仔细管理项目的依赖，避免引入过多不必要的依赖。一些过于庞大的第三方库可能会影响编译速度，所以只选择真正需要的依赖。
4. 并行处理：
   1. 利用构建工具提供的并行处理功能，同时处理多个任务，可以加速编译过程。这在处理多个模块或多个入口文件时特别有效。
   2. 当项目中有多个入口文件需要编译时，可以使用 `Webpack` 的 `parallel-webpack` 插件来进行并行编译，提升构建速度。安装插件并配置如下：

      ```js
      const ParallelWebpack = require('parallel-webpack');
      module.exports = {
         // ...
         plugins: [
            new ParallelWebpack({
               // 配置选项
            }),
         ],
      };
      ```

5. 缓存利用
   1. 合理利用构建工具的缓存机制，避免重复的编译工作。缓存可以在后续的构建中复用之前已经编译过的结果，从而提高效率。
   2. Webpack会自动利用缓存来加速构建，但有时我们可以手动配置缓存。例如，使用`cache-loader` 可以将中间步骤的结果缓存起来，以便下次使用：
6. 预编译和预处理：
   1. 对于一些需要复杂处理的代码，可以考虑提前对其进行预编译或预处理，从而减少实际编译过程中的工作量。
   2. 在某个项目中，我们使用了大量的SVG图标。为了加快编译速度，我们可以使用`svgo-loader`预处理SVG文件

      ```js
      module: {
         rules: [
           {
             test: /\.svg$/,
             use: [
               'svg-sprite-loader',
               'svgo-loader', // 使用svgo预处理SVG
             ],
           },
         ],
       }
      ```

7. 使用优化工具
   1. 借助一些优化工具和插件，可以对代码进行压缩、去除无用代码等操作，从而减少编译产生的文件大小，提高加载速度。
   2. 在Vue项目中，通过使用vue-cli自带的压缩插件，我们可以对构建生成的代码进行压缩，减小文件大小：

      ```js
      // vue.config.js
       module.exports = {
         configureWebpack: {
           optimization: {
             minimize: true, // 使用优化工具进行压缩
           },
         },
       };
      ```

从长远来看：

1. 模块化设计：
   1. 将项目拆分成合理的模块和组件，使代码结构清晰。使用单一职责原则，确保每个组件只关注特定的功能。这样有助于降低单个模块或组件的复杂度，使得每次编译的范围更小，加快编译速度。这可以让不同的团队成员在各自负责的领域内工作。这种模块化的设计可以避免所有人都涉及到同一块代码，减少了不必要的代码冲突和合并。
2. 代码拆分与懒加载：
   1. 无论是React还是Vue，都支持代码拆分和懒加载。按需加载只有在需要时才会加载代码，可以减少初始加载时的体积，有助于提升页面加载速度和开发环境的编译速度。
3. 公共组件库：
   1. 如果项目中有一些通用的UI组件，可以将它们抽离出来，构建成一个独立的公共组件库。这样可以避免在不同模块中重复编写相似的代码，减小项目的体积。
4. 定期的代码审查：
   1. 定期进行代码审查可以确保项目的代码质量和一致性。同时，可以在代码审查过程中及时发现并优化不合理的设计，避免糟糕的决策累积到整个项目中。
5. 数据管理与状态管理：
   1. 对于大型应用，适当的状态管理非常重要。采用合适的状态管理工具，如Redux、Vuex，可以使数据流更清晰可控，避免状态分散在各个组件之间造成混乱。
6. 代码分层和架构设计：
   1. 遵循良好的代码分层和架构设计，将业务逻辑、界面展示和数据处理等进行有效的分离。使用设计模式来规范代码结构，避免逻辑交叉和耦合，从而减少代码的依赖性，降低项目的复杂度。
7. 使用工具进行性能分析：
   1. 使用工具如 `Webpack Bundle Analyzer` 可以帮助你分析项目的代码体积和模块依赖关系，从而更好地优化打包结果。

## 14. 讲一下新建一个项目/代码库的流程

## 15. 为什么新建这一个流程不弄成自动化，而是手工配置

## 16. 当页面有一个查询多种数据的流程，怎么判断是前端去做还是后端去新建 rest 口去做

1. 前端筛选：
   1. 优点：
      1. 可以减轻后端服务器的负载，因为数据不必全部传递到前端，只传递必要的数据。
      2. 可以提供更快的响应时间，因为数据在前端直接处理，无需等待后端的处理。
   2. 缺点：
      1. 如果要处理大量数据，可能会导致前端性能问题，尤其是在客户端设备性能有限的情况下。
      2. 对于敏感数据或需要安全性的筛选，前端处理可能不安全，因为用户可以修改前端代码来绕过筛选。
2. 后端筛选：
   1. 优点：
      1. 更安全，因为数据处理在服务器端进行，可以对数据进行验证和权限控制。
      2. 适用于大数据量的情况，因为服务器通常有更强大的硬件和处理能力。
   2. 缺点：
      1. 可能会增加服务器负载，特别是在大量请求同时发生时。
      2. 可能导致响应时间增加，因为数据需要从服务器传输到前端再返回。

策略：

- 如果数据量较小且前端设备性能足够强大，可以考虑在前端执行筛选以提供更快的响应时间。
- 如果数据量大或需要更高的安全性和权限控制，或者需要跨多个客户端共享筛选逻辑，最好在后端执行筛选。
- 在某些情况下，可以采用混合策略，部分筛选在前端执行以提供更快的用户体验，同时后端仍然进行额外的验证和安全性检查。

## 17. 假如实现一个 table 组件，要一页展示10万条数据，怎么实现

分组的依据是什么

怎么分组（slice、splice）

参考antd的虚拟列表

[虚拟列表](../js/概念/虚拟列表.md)

## 18. antd的版本是什么，react的版本是什么

- antd：^4.21.3。
- react：^18.2.0

## 19. 讲一下vue、react、angular 框架的理解

Vue

Vue 是一个轻量级的前端框架，被称为是易于上手的框架，因为它的 API 设计非常直观和简单。Vue 使用了类似于 React 的虚拟 DOM 来实现高效的渲染，并提供了一些有用的指令、组件等，来帮助开发者快速构建复杂的应用。Vue 的性能非常好，因为它的体积小，加载速度快，同时也提供了一些优化工具，如异步组件、代码分割等。

优点：

- 简单易学：Vue 的核心库非常精简，学习曲线相对较低，开发者可以快速上手使用。

- 双向数据绑定，Vue 支持双向数据绑定，可以使得 UI 和数据同步更新，避免了手动操作 DOM 的繁琐。

- 组件化开发：Vue 也采用组件化开发的思想，可以让开发者更好地组织和复用代码。

- 虚拟 DOM：Vue 也使用虚拟 DOM 技术，可以优化页面性能，提高渲染效率。

- 社区活跃：Vue 有着庞大而活跃的社区，开发者可以轻松获取各种资源和插件，这些资源和插件可以提高开发效率。

缺点：

- 依赖第三方库：Vue 需要使用第三方库来实现一些功能，如 Vuex 管理状态、Vue Router 实现路由等，这使得开发者需要学习和使用更多的工具和库。

- 缺乏严格的规范：Vue 缺乏严格的规范，开发者可能会使用不同的命名规则、组件结构等，这可能会导致项目的可维护性降低。

- 市场占有率相对较低：相比于 React 和 Angular，Vue 的市场占有率相对较低，这可能会影响一些开发者的选择。

总的来说，Vue 作为一个简单、易学、灵活、高效的前端框架，具有很多优点，但也存在一些缺点。在选择使用 Vue 还是其他前端框架时，需要根据具体的项目需求和开发团队的技能水平来进行评估和选择。

***

React

React 是一个用于构建用户界面的 JavaScript 库，它的核心思想是通过组件化开发来提高应用的开发效率和性能。React 的优点是，它的 API 设计简单明了，适用于构建大型的应用，同时它提供了一个强大的虚拟 DOM，能够快速渲染出复杂的 UI 组件。React 还有一个强大的社区，提供了大量的第三方组件和插件。

优点：

- 高效的虚拟 DOM：React 采用虚拟 DOM 技术，可以减少页面重绘的次数，提高页面渲染效率。

- 组件化开发：React 采用组件化开发的思想，可以让开发者更好地组织和复用代码。

- 单向数据流：React 采用单向数据流的架构，使得应用的状态变得可控和可预测。

- 生态系统丰富：React 拥有庞大的生态系统，包括 Redux 状态管理、React Router 实现路由等等，可以帮助开发者更好地开发和维护应用。

- 跨平台支持：React 还支持跨平台开发，可以用于构建 Web 应用、移动应用、桌面应用等多种平台。

缺点：

- 学习成本高：React 采用 JSX 语法，开发者需要掌握这种语法以及相关的工具和库，学习成本较高。

- 生态系统庞杂：虽然 React 的生态系统丰富，但也存在一些庞杂的库和组件，选择合适的库和组件需要一定的技术水平和经验。

- 组件化开发的限制：React 的组件化开发思想虽然提高了代码的复用性和可维护性，但也存在一些限制，如组件之间的通信、状态管理等，需要开发者花费一定的精力去解决。

总的来说，React 作为一个高效、灵活、可维护的前端框架，具有很多优点，但也存在一些缺点。在选择使用 React 还是其他前端框架时，需要根据具体的项目需求和开发团队的技能水平来进行评估和选择。

***

Angular

Angular 是 Google 开发的前端框架，它拥有很多先进的特性，如依赖注入、模块化、双向数据绑定等。Angular 的核心思想是通过模块化、组件化开发来提高应用的可维护性.

优点：

- 完整的 MVC 框架：Angular 提供了一个完整的 MVC 框架，包括数据绑定、路由、依赖注入、指令等，这些功能可以帮助开发者更加方便地管理和维护代码。

- 响应式编程：Angular 支持响应式编程，可以轻松处理异步数据流。这种编程方式可以提高代码的可读性、可维护性和可测试性。

- TypeScript 支持：Angular 基于 TypeScript，提供了更好的类型检查、代码提示、重构等功能，可以降低代码出错的风险，同时提高开发效率。

- 适用于大型应用：Angular 适用于构建大型、复杂的 Web 应用，可以帮助开发者更好地组织代码和管理模块。

缺点：

- 学习成本高：由于 Angular 提供了完整的 MVC 框架，学习成本相对较高，需要掌握的知识点较多，对于初学者来说可能会有一定的难度。

- 性能问题：由于 Angular 提供了较多的功能和依赖，有时会导致性能问题。开发者需要谨慎使用依赖注入、数据绑定等功能，以避免影响应用的性能。

- 版本升级问题：Angular 的版本升级较为频繁，升级过程中可能会导致一些兼容性问题。这需要开发者花费一定的时间和精力去适应新的版本。

总的来说，Angular 作为一个完整的 MVC 框架，具有很多优点，但也存在一些缺点。在选择使用 Angular 还是其他前端框架时，需要根据具体的项目需求和开发团队的技能水平来进行评估和选择。

## 20. 组件库怎么打包，打包出来的文件是什么，包含了哪种类型的文件。，你了解.d.ts 文件吗？有什么作用

tsx 打包出来的文件会有一个 `.js` 文件和 `.d.ts` 文件

`.d.ts` 文件是 `TypeScript` 的类型声明文件，它们的主要作用是为 `JavaScript` 库提供类型支持，使我们能够在 `TypeScript` 中使用这些库时获得类型检查和智能提示。

`.d.ts` 文件描述了库或模块的结构、函数、类、接口以及其他类型信息，让 `TypeScript` 编译器了解这些库的类型约束。

## 21. 包怎么构建，怎么发布。其他项目怎么通过npm install 引入本地更改的包

1. 创建文件夹，并创建文件 `index.js`， 在文件中声明函数，使用 `module.exports` 暴露
2. `npm` 初始化工具包，`package.json` 填写包的信息 (包的名字是唯一的)
3. 注册账号 `https://www.npmjs.com/signup`
4. 激活账号 （ 一定要激活账号 ）
5. 修改为官方的官方镜像 (命令行中运行 `nrm use npm` )
6. 命令行下 `npm login` 填写相关用户信息
7. 命令行下 `npm publish` 提交包 👌。可以到官网查看到上传的包。通过 `npm install` 可以下载提交的包

## 22. 在构建响应式网页时，你通常会采用什么策略来确保页面在不同设备和浏览器上都能良好展示？

首先确定好目前使用率高的设备有哪些，然后根据屏幕的高度和宽度，确定适配的布局，然后再通过@media 来设置不同设备高度和宽度对应的布局

## 23. 您如何处理不同浏览器之间的兼容性问题？

答：首先确定网页支持的浏览器有哪些，然后了解不同浏览器之间的差异。在开发的过程中需要留意该功能涉不涉及兼容性问题。在写css时可以使用特定浏览器的前缀来写浏览器的特定样式。

***

1. 理解浏览器差异：
   - 首先，了解不同浏览器之间的差异是解决兼容性问题的关键。不同浏览器可能对CSS规范的解释不同，这可能导致样式显示不一致。以下是一些常见的浏览器差异：
      - 盒子模型： 不同浏览器可能在解释标准盒子模型和IE盒子模型时存在差异。了解各浏览器的默认盒子模型以及如何影响布局是重要的。
      - `Flexbox` 和 `Grid` 布局： Flexbox和Grid布局是强大的布局工具，但不同浏览器可能需要不同的前缀或具体设置来实现相同的效果。
      - 文本渲染： 字体渲染和文本行高在不同浏览器中可能不同。这可能导致文本在不同浏览器中显示不一致。
      - 渐变和阴影： CSS渐变和阴影效果在不同浏览器中可能需要不同的CSS属性或前缀。
      - CSS3动画和过渡： CSS3动画和过渡在不同浏览器中可能需要不同的前缀和设置。
2. 使用标准CSS属性和值：
   - 在编写CSS时，尽量使用标准的CSS属性和值，而不是特定于浏览器的属性。
3. 使用浏览器引擎前缀：
   - 为了处理不同浏览器的特定CSS属性，您可以使用浏览器引擎前缀，如 `-webkit-、-moz-、-ms- 和 -o-`
4. 使用CSS兼容性工具：
   - `Autoprefixer`：是一款自动管理浏览器前缀的插件，它可以解析CSS文件并且添加浏览器前缀到CSS内容里
     - `Autoprefixer` 是一个根据 `can i use` 解析 `css` 并且为其添加浏览器厂商前缀的 `PostCSS` 插件。

## 24. 好的，那接下来谈谈，在前后端分离开发时，你是如何处理前端与后端之间的接口对接和数据交互的？

首先确定是哪项功能需要用到接口，然后确定使用什么接口，看接口相关的定义文档，了解需要下发什么参数，后端会返回什么数据。然后与后端开发人员进行沟通，确定这项功能是否下发文档定义的数据类型。然后编写代码调用该接口，确认返回的数据无误后，继续开发该项功能。
