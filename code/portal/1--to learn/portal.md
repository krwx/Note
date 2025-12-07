# portal

- [portal](#portal)
  - [other](#other)
  - [css](#css)
  - [js](#js)
  - [react](#react)
  - [ant-design](#ant-design)
  - [event source](#event-source)

## other

- 在空的 html 文件输入 "!" 来快速生成 html 模板

## css

设置除了最后一个元素的其他元素的样式，用 `:not` 和 `:last-child` 伪类

```css
.buttonGroup button:not(:last-child){
    margin-right: 0.5em;
}
```

:nth-child() 的使用： [地址](https://blog.csdn.net/bznhlhh/article/details/120989375)

first-child, last-child

***

高度是把 border 的宽度也算进来。所以当输入框验证失败要显示红色边框时，不是最外面的 div 设置 border，如果设置了会影响布局。应该设置里面的 div 的 border，这样就不会影响其他布局

## js

- 为什么一个普通 js 文件 export 一个常量要用 export default ?
- || 的运算优先级低于 +

## react

- outlet 中如果要显示默认内容，应该是新建一个 url 为 "/" 的子路由，而不是检查 Outlet 是否有显示内容
- 调用浏览器通知：react-web-notification。[参考](https://blog.csdn.net/gitblog_00039/article/details/142512304)
- state 变量和普通变量的区别？
  - 重新渲染后，普通变量会变成声明的值，如果需要保存数据要用 state 存

多个 classname：`className={`${styles.cardGroupAcquireCount} ${styles.blockTitle}`}`

## ant-design

RangePicker 的使用：[地址]([RangePicker](https://blog.csdn.net/orbit4/article/details/144421471))

通过 value 属性传值，类型为 `[monent, monent]`

## event source

后端要 while true 一直运行，不然执行完接口内的代码后，前端 Eventsource.onerror 会报错（出问题，使用 while 的话，使用其他接口会用不了，因为一直在跑 while 的那个接口）
