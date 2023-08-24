- [1. 函数柯里化](#1-函数柯里化)
- [2. let 和 const 为什么不像 var 能在变量声明赋值前被使用](#2-let-和-const-为什么不像-var-能在变量声明赋值前被使用)
- [3. 变量提升 / 解释 let 和 const 为什么不像 var 能在变量声明赋值前被使用。说明变量提升的理解](#3-变量提升--解释-let-和-const-为什么不像-var-能在变量声明赋值前被使用说明变量提升的理解)
- [4. 简单介绍原型链](#4-简单介绍原型链)
- [5. 原型链的终点是什么](#5-原型链的终点是什么)
- [6. js进行异步调用有几种方式](#6-js进行异步调用有几种方式)
- [7. 怎么使用Promise、async、await](#7-怎么使用promiseasyncawait)
- [8. Promise 和 async、await 的区别](#8-promise-和-asyncawait-的区别)
- [9. 更倾向于使用 Promise 还是 async、await，为什么](#9-更倾向于使用-promise-还是-asyncawait为什么)
- [10. async、await怎么适配移动端](#10-asyncawait怎么适配移动端)
- [11. 说一下做过什么优化网页性能](#11-说一下做过什么优化网页性能)
- [12. 有做过哪些兼容处理](#12-有做过哪些兼容处理)
- [13. 判断浏览器类型](#13-判断浏览器类型)
- [15. let 和 const 的区别](#15-let-和-const-的区别)
- [16. eventBus 和 redux 的区别](#16-eventbus-和-redux-的区别)
- [17. 在什么时候使用 eventBus](#17-在什么时候使用-eventbus)
- [18. 遇到 script 标签为什么会阻塞](#18-遇到-script-标签为什么会阻塞)
- [19. 当遇到 script 标签阻塞时，怎么进行性能优化](#19-当遇到-script-标签阻塞时怎么进行性能优化)
- [20. js的内存泄漏](#20-js的内存泄漏)
- [21. 当 script 标签设置了 defer 属性，代表什么？/script 标签设置了 async 属性，代表什么？与 defer 有什么不同  / 分别设置了async 和 defer 的脚本哪个先执行](#21-当-script-标签设置了-defer-属性代表什么script-标签设置了-async-属性代表什么与-defer-有什么不同---分别设置了async-和-defer-的脚本哪个先执行)
- [22. 闭包是什么？闭包可以用来做什么？](#22-闭包是什么闭包可以用来做什么)
- [23. 使用闭包会有什么危害？](#23-使用闭包会有什么危害)
- [24. 怎么避免使用闭包发生的内存泄露（只答了使用let，没有答设置变量为null）](#24-怎么避免使用闭包发生的内存泄露只答了使用let没有答设置变量为null)
- [25. 了解 js 的垃圾回收吗](#25-了解-js-的垃圾回收吗)
- [26. 了解节流和防抖吗？在项目中有使用过吗？（应该是设置在1s内的）](#26-了解节流和防抖吗在项目中有使用过吗应该是设置在1s内的)
- [27. 讲一下 Babel 是干什么的，在 React 中做了哪些工作](#27-讲一下-babel-是干什么的在-react-中做了哪些工作)


## 1. 函数柯里化
柯里化：是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术
```js
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)     // 3
curryingAdd(1)(2)   // 3
```
主要概念就是让函数返回一个function可以接受第二个（或者更多）括号里的参数并输出期望值。

实现 sum 函数，实现 sum(1)(2)(3)() === 6 和 sum(1,2,3)() === 6
```js
function sumWithES6(...rest) {
    var _args = rest;

    var _adder = function (...innerRest) {
        _args.push(...innerRest); // 这里使用的是ES6数组的解构
        return _adder;
    };

    _adder.toString = function () {
        let sum = _args.reduce(function (a, b) {
            return a + b;
        });
        return sum;
    };
    return _adder;
}
console.log(sumWithES6(1)(2)(3)); // 6

function sum(...rest) {
    var arr = rest;
    var _adder = function (...innerRest) {
        arr.push(...innerRest);
        return _adder;
    };

    _adder.toString = function() {
        let sum = arr.reduce((a,b) => a+b);
        return sum;
    }

    return _adder;
}
```

## 2. let 和 const 为什么不像 var 能在变量声明赋值前被使用
let和const声明的变量属于块作用域、var声明的变量作用域是全局或者整个封闭函数。

如果赋值给没有声明的变量，该变量会隐式地创建为全局变量，成为顶层对象的属性。  

所以var具有缺陷：所有未声明直接赋值的变量都会自动挂在顶层对象下，造成全局环境变量不可控、混乱。  

let 声明的是块作用域，块作用域变量在包含它们的块或for循环之外是不能访问的。

## 3. 变量提升 / 解释 let 和 const 为什么不像 var 能在变量声明赋值前被使用。说明变量提升的理解
变量提升的表现是，无论我们在函数中何处位置声明的变量，好像都被提升到了函数的首部，我们可以在变量声明前访问到而不会报错。

造成变量声明提升的本质原因是：   
* js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。  
* 先解析，创建了变量对象，包含了函数的形参、所有的函数和变量声明，这样声明就提升了。后面访问变量时 在当前执行上下文中的作用域链中去查找，作用域链的首端指向的是当前执行上下文的变量对象，再访问对应声明的变量。

var声明的变量存在变量提升，let和const不存在变量提升，即它们所声明的变量一定要在声明后使用。

## 4. 简单介绍原型链
在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当我们使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说我们是不应该能够获取到这个值的，但是现在浏览器中都实现了 __proto__ 属性来让我们访问这个属性，但是我们最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对象的原型。

当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是我们新建的对象为什么能够使用 toString() 等方法的原因。

特点：JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

## 5. 原型链的终点是什么  
为null，`Object.proototype.__proto__ == null`

## 6. js进行异步调用有几种方式    
1. 第一种最常见的是使用回调函数的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
2. 第二种是 Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。
3. 第三种是使用 generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部我们还可以将执行权转移回来。当我们遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕的时候我们再将执行权给转移回来。因此我们在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式我们需要考虑的问题是何时将函数的控制权转移回来，因此我们需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
4. 第四种是使用 async 函数的形式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此我们可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

## 7. 怎么使用Promise、async、await

## 8. Promise 和 async、await 的区别

## 9. 更倾向于使用 Promise 还是 async、await，为什么  
    1. async、await的优点
        * 实现了串行
        * 代码简洁
        * 对于条件语句和其他流程语句比较友好，可以直接写到判断条件里面
        * 调试代码时方便调试
    2. async、await的缺点
        * await不能做到并行，需要借助 Promise.all 才能做到并行
        * 错误处理需要用到 try catch
        * 一些变量需要声明出来，不像 then 链可以传递变量下去
        * async/await无法简单实现Promise的各种原生方法，比如.race()之类
        * async await是有传染性的。当一个函数变为async后，这意味着调用他的函数也需要是async
    3. Promise 的优点
        * 错误处理。可以在最后通过 catch() 捕获错误，或在 then() 里面处理错误
        * 有原生的方法，例如：all()
    4. Promise 的缺点
        * then 链过长影响阅读，代码不简洁

## 10. async、await怎么适配移动端

## 11. 说一下做过什么优化网页性能
    1. 减少http请求
    2. 精简css样式中的选择器
    3. 重构不合理的代码
    ps：图片使用base64编码，使用雪碧图

## 12. 有做过哪些兼容处理
1. event.x与event.y问题说明:  
   - IE下,event对象有x,y属性,但是没有pageX,pageY属性;  
   - Firefox下,event对象有pageX,pageY属性,但是没有x,y属性.  
   - 解决方法：使用mX(mX = event.x ? event.x : event.pageX;)来代替IE下的event.x或者Firefox下的event.pageX.
2. 自定义属性问题问题说明：  
   - IE下，可以使用获取常规属性的方法来获取自定义属性，也可以使用getAttribute()获取自定义属性；  
   - Firefox下，只能使用getAttribute()获取自定义属性。
3. cursor:hand VS cursor:pointer  
   - firefox不支持hand，但ie支持pointer  
   - 解决方法: 统一使用pointer
4. innerText  
   - IE中能正常工作，但在FireFox中却不行. 需用textContent。  
   - 解决方法:
```js
if(navigator.appName.indexOf("Explorer") > -1){
        document.getElementById('element').innerText = "my text";
} else{ 
        document.getElementById('element').textContent = "my text";
}
```

## 13. 判断浏览器类型
1. 通过 window.navigator.userAgent 判断。但是 userAgent 可以被改写，不准确
```js
    const explorer = window.navigator.userAgent
    if(explorer.indexOf("MSIE") >= 0) {
      console.log("IE")  //判断是否为IE浏览器
    }else if(explorer.indexOf("Firefox") >= 0) {
      console.log("Firefox")  //是否为Firefox浏览器
    }else if(explorer.indexOf("Chrome") >= 0) {
      console.log("Chrome")  //是否为Chrome浏览器
    }else if(explorer.indexOf("Opera") >= 0) {
      console.log("Opera")   //是否为Opera浏览器
    }else if(explorer.indexOf("Safari") >= 0) {
      console.log("Safari")  //是否为Safari浏览器
    }
```
2. 通过浏览器的特征判断
* IE
  - 只要判断window对象存在 `ActiveXObject` 函数
* Safari
  - Safari浏览器中有一个其他浏览器没有的 `openDatabase` 函数，可做为判断Safari的标志
* Chrome
  - Chrome有一个 `MessageEvent` 函数，但Firefox也有。不过，好在Chrome并没有Firefox的 `getBoxObjectFor` 函数，根据这个条件还是可以准确判断出Chrome浏览器的
* Firefox
  - Firefox中的DOM元素都有一个 `getBoxObjectFor` 函数，用来获取该DOM元素的位置和大小（IE对应的中是getBoundingClientRect函数）。这是Firefox独有的，判断它即可知道是当前浏览器是Firefox
* Opera
  - Opera提供了专门的浏览器标志，就是window.opera属性

```js
// 这样比较准确
if (window.ActiveXObject)
return "IE";
else if (document.getBoxObjectFor)
return "Firefox";
else if (window.MessageEvent && !document.getBoxObjectFor)
return "Chrome";
else if (window.opera)
return "Opera";
else if (window.openDatabase)
return "Safari";
```

## 15. let 和 const 的区别
let是设置变量，可以改变值。const是设置常量，声明后不能进行修改。  
let 声明时可以不赋值；const 声明时一定要赋值

使用 const 声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不 合法的赋值操作。

## 16. eventBus 和 redux 的区别
* redux是做状态管理的，主要管理服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等数据。   
* 我认为 redux 可以主要管理影响页面变化的数据，且被多个不同层级的组件使用的，可以用来管理可预测状态的数据，而且redux可以使用中间件，可以在复杂的情况使用。eventBus比较直观，可以用于组件之间传输比较直观的数据，例如http请求返回的数据，用于不是很多组件会使用的情况，方便管理

## 17. 在什么时候使用 eventBus

## 18. 遇到 script 标签为什么会阻塞
JavaScript是单线程，在JavaScript运行时其他的事情不能被浏览器处理。事实上，大多数浏览器使用单线程处理UI更新和JavaScript运行等多个任务，而同一时间只能有一个任务被执行。所以在执行JavaScript时，会妨碍其他页面动作。

并且，html解析过程是至上而下的，当html解析器遇到诸如`<script>、<link>`等标签时，就会去下载相应内容。且加载、解析、执行JavaScript会阻止解析器往下执行。

## 19. 当遇到 script 标签阻塞时，怎么进行性能优化
延迟加载 js 脚本的方法：
1. 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行
2. 给 js 脚本添加 defer 属性
3. 给 js 脚本添加 async 属性
4. 动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本

## 20. js的内存泄漏
1. 不正当的闭包  
    fn2Child它是闭包，并且因为 return 的函数中存在函数 fn2 中的 test 变量引用，所以 test 并不会被回收，也就造成了内存泄漏。
    ```js
    function fn2(){
        let test = new Array(1000).fill('xianzao')
        return function(){
            console.log(test)
            return test
        }
    }
    let fn2Child = fn2()
    fn2Child()
    // 解决：把外部的引用关系置空就好了
    fn2Child = null
    ```
2. 游离DOM引用


## 21. 当 script 标签设置了 defer 属性，代表什么？/script 标签设置了 async 属性，代表什么？与 defer 有什么不同  / 分别设置了async 和 defer 的脚本哪个先执行 

## 22. 闭包是什么？闭包可以用来做什么？

## 23. 使用闭包会有什么危害？

## 24. 怎么避免使用闭包发生的内存泄露（只答了使用let，没有答设置变量为null）

## 25. 了解 js 的垃圾回收吗

## 26. 了解节流和防抖吗？在项目中有使用过吗？（应该是设置在1s内的）  
* 函数防抖： 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
* 函数节流： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

在用户创建业务，点击应用按钮时有用到防抖，当用户在点击应用按钮后，如果在1s内再点击按钮，则重新计时

## 27. 讲一下 Babel 是干什么的，在 React 中做了哪些工作
Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码。
Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API。

Polyfill的准确意思为，用于实现浏览器并不支持的原生API的代码。