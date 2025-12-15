# Element

- [Element](#element)
  - [属性](#属性)
    - [tagName](#tagname)
  - [方法](#方法)
    - [scrollIntoView()](#scrollintoview)
    - [setAttribute(name, value)](#setattributename-value)
    - [getAttribute(attrName)](#getattributeattrname)
    - [getAttributeNames()](#getattributenames)
    - [removeAttribute(attrName)](#removeattributeattrname)
    - [getBoundingClientRect()](#getboundingclientrect)

## 属性

### tagName

返回当前元素的标签名

在 `XHTML` 中 (或者其他的 XML 格式文件中), 会弹出小写的标签名。而在 `HTML` 中，会弹出大写的标签名.

```js
<span id="born">When I was born...</span>

var span = document.getElementById("born");
console.log(span.tagName) // "SPAN"
```

## 方法

### scrollIntoView()

`Element` 接口的 `scrollIntoView()` 方法会滚动元素的父容器，使被调用 `scrollIntoView()` 的元素对用户可见。

语法：

```js
scrollIntoView()
scrollIntoView(alignToTop)
scrollIntoView(scrollIntoViewOptions)
```

参数

- `alignToTop` 可选
  - 一个布尔值：
    - 如果为 true，元素的顶端将和其所在滚动区的可视区域的顶端对齐。相应的 `scrollIntoViewOptions: {block: "start", inline: "nearest"}`。这是这个参数的默认值。
    - 如果为 false，元素的底端将和其所在滚动区的可视区域的底端对齐。相应的 `scrollIntoViewOptions: {block: "end", inline: "nearest"}`。
- `scrollIntoViewOptions` 可选  
  - 一个包含下列属性的对象：
    - `behavior` 可选
      - 定义滚动是立即的还是平滑的动画。该选项是一个字符串，必须采用以下值之一：
        - `smooth` ：滚动应该是平滑的动画。
        - `instant` ：滚动应该通过一次跳跃立刻发生。
        - `auto` ：滚动行为由 `scroll-behavior` 的计算值决定。
    - `block` 可选
      - 定义垂直方向的对齐，`start、center、end 或 nearest` 之一。默认为 `start` 。
    - `inline` 可选
      - 定义水平方向的对齐，`start、center、end 或 nearest` 之一。默认为 `nearest` 。
  - 取值含义
    - start：元素以开头对齐
    - end：元素以结尾对齐
    - center：元素显示在屏幕中央
    - nearest：元素滚动到刚好显示在屏幕上的位置

示例：

```js
const element = document.getElementById("box");

element.scrollIntoView();
element.scrollIntoView(false);
element.scrollIntoView({ block: "end" });
element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
```

### setAttribute(name, value)

设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。

**布尔属性的处理**：

- 要设置布尔属性的值（例如禁用），可以指定任何值。建议使用**空字符串或属性名称**。
- 该属性的**缺失**表示其值是 `false`。

语法：  

`element.setAttribute(name, value);`

例子：

```js
var b = document.querySelector("button");

b.setAttribute("name", "helloButton");
b.setAttribute("disabled", ""); // 这里禁用了按钮
```

### getAttribute(attrName)

`getAttribute()` 返回元素上一个指定的属性值。如果指定的属性不存在，则返回 `null` 或 `""` （空字符串）

语法：

```js
let attribute = element.getAttribute(attributeName);
```

- `attribute` 是一个包含 `attributeName` 属性值的字符串。
- `attributeName` 是你想要获取的属性值的属性名称。

例子：

```js
let div1 = document.getElementById("div1");
let align = div1.getAttribute("align");
```

### getAttributeNames()

`Element.getAttributeNames()` 返回一个 `Array` ，该数组包含指定元素（`Element`）的**所有属性名称**，如果该元素不包含任何属性，则返回一个**空数组**。

语法：

`let attributeNames = element.getAttributeNames();`

例子：

```js
// 遍历 elements 的元素
for (let name of element.getAttributeNames()) {
  let value = element.getAttribute(name);
  console.log(name, value);
}
```

### removeAttribute(attrName)

元素方法 `removeAttribute()` 从指定的元素中删除一个属性。

语法：

`element.removeAttribute(attrName);`

参数

- `attrName`： 指定要从元素中移除的属性的名称。如果指定的属性不存在，则 `removeAttribute()` 返回，但不会生成错误。

例子：

```js
// Given: <div id="div1" align="left" width="200px">
document.getElementById("div1").removeAttribute("align");
// Now: <div id="div1" width="200px">
```

### getBoundingClientRect()

`Element.getBoundingClientRect()` 方法返回一个 `DOMRect` 对象，**其提供了元素的大小及其相对于视口的位置**。

返回值：

- 返回值是一个 `DOMRect` 对象，是包含整个元素的最小矩形（包括 `padding` 和 `border-width`）。
- 该对象使用 `left、top、right、bottom、x、y、width 和 height` 这几个以像素为单位的只读属性描述整个矩形的位置和大小。
- 除了 `width` 和 `height` 以外的属性是相对于**视图窗口的左上角**来计算的。(**`right` 也是相对于左上角计算**)
- `DOMRect` 对象的 `width` 和 `height` 属性是包含了 `padding` 和 `border-width` 的
