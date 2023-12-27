## 组件传递 prop
子组件内通过 `defineProps` 方法定义 `props`。

如果需要在 `script` 中使用 `props`，那么将 `defineProps()` 的返回值赋给一个变量使用。

`template` 直接使用 `{{prop的名称}}` 显示 `prop`

## ref 的值是一个对象时，如果模板中绑定属性时有用到对象的属性，那么ref 里面应该给出完整的对象的定义

## 注意内联样式中，字符串是单引号的形式。如果用正常的css写法是用引号引住的
```html
<view class="fixbg" :style="{ 'background-image': 'url(' + playlist.coverImgUrl + ')' }"></view>
```

## 生命周期函数内直接使用方法，不需要 `this` 指针