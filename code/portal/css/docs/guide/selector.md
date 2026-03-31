# selector

- [selector](#selector)
  - [基本选择器](#基本选择器)
    - [通用、元素、类和 ID 选择器](#通用元素类和-id-选择器)
    - [属性选择器](#属性选择器)
  - [分组选择器（Grouping selector）](#分组选择器grouping-selector)
  - [组合器（Combinator）](#组合器combinator)
  - [伪选择器](#伪选择器)
    - [伪类](#伪类)
      - [`:nth-child(an+b)`](#nth-childanb)
      - [`:nth-of-type(an+b)`](#nth-of-typeanb)
      - [`:is()`](#is)
      - [比较 `:is()` 和 `:where()`](#比较-is-和-where)
    - [伪元素](#伪元素)
      - [`::before` 和 `::after` 插入内容](#before-和-after-插入内容)

## 基本选择器

### 通用、元素、类和 ID 选择器

- 通用选择器
- 元素选择器
- 类选择器
- ID 选择器

```css
/* 通用选择器 */
* {

}

/* 元素选择器 */
span {

}
/* 类选择器 */
.className {

}
/* ID 选择器 */
#id {

}
/* 一个元素有多个类，连着写 */
.classNameA.classNameB {

}
```

### 属性选择器

1、`[attribute]`

选择带有指定属性的所有元素（无论属性值是什么）。

```css
/* 选择所有具有 `type` 属性的元素 */
[type] {
  border: 1px solid red;
}
```

2、`[attribute="value"]`

选择具有指定属性和值完全匹配的元素。

```css
/* 选择所有 `type` 属性等于 `text` 的元素 */
[type="text"] {
  background-color: yellow;
}
```

3、`[attribute~="value"]`

单词匹配：选择属性值是一个空格分隔的单词列表，且其中有一个单词完全等于 "value" 的元素。

```css
/* 选择属性值中包含 `button` 的元素 */
[class~="button"] {
  font-weight: bold;
}
/* 可以匹配 <div class="primary btn">，但不会匹配 <div class="button-primary"> */
```

4、`[attribute|="value"]`

选择具有指定值或者以指定值开头并紧跟着连字符 - 的属性值的元素，常用于语言代码。

```css
/* 选择所有 `lang` 属性是 `en` 或者以 `en-` 开头的元素 */
[lang|="en"] {
  color: green;
}
```

5、`[attribute^="value"]`

选择属性值以指定值开头的元素。

```css
/* 选择所有 `href` 属性以 `https` 开头的链接 */
[href^="https"] {
  text-decoration: none;
}
```

6、`[attribute$="value"]`

选择属性值以指定值结尾的元素。

```css
/* 选择所有 src 属性以 .jpg 结尾的图片 */
[src$=".jpg"] {
  border: 2px solid blue;
}
```

7、`[attribute*="value"]`

子串匹配：选择属性值中任意位置包含子串 "value" 的元素。

```css
/* 选择所有 `title` 属性中包含 `tutorial` 的元素 */
[title*="tutorial"] {
  font-style: italic;
}
```

在大小写不敏感的情况下，匹配属性值的话，你可以在闭合括号之前，使用i值

```css
/* 这里类名为 A 或 a 都会匹配到 */
li[class^="a" i] {
    color: red;
}
```

## 分组选择器（Grouping selector）

`,` 能将不同的选择器组合在一起，它能选择所有*能被列表中的任意一个选择器选中的节点*

```css
/* 选择所有 <h1> 和 <h2> 元素 */
h1, h2 {
  margin-bottom: 0.5em;
}
```

## 组合器（Combinator）

1. 后代选择器

   ```css
   /* 匹配处于带有.box类的元素里面的<p>元素 */
    .box p {
        color: red;
    } 
   ```

2. 子代关系选择器  
   子代关系选择器是个大于号（>），只会在选择器选中**直接子元素**的时候匹配（只要层级属于直接子元素，不管上面有多少元素都会匹配到）。继承关系上更远的后代则不会匹配。

   ```css
    ul > li {
        border-top: 5px solid red;
    }  
   ```

3. 邻接兄弟  
    邻接兄弟选择器（+）用来选中恰好处于另一个**在继承关系上同级的元素旁边的物件**。  
    例如，选中所有**紧随`<p>`元素之后的`<img>`元素**：

    ```css
     p + img {

     }
    ```

4. 通用兄弟  
    如果你想选中一个元素的兄弟元素，即使它们不直接相邻，你还是可以使用通用兄弟关系选择器（~）。
    **注意：只能选择元素后的兄弟元素，元素前面的兄弟元素不会选中**  
    要选中所有的`<p>`元素**后任何地方**的`<img>`元素，我们会这样做：

    ```css
     p ~ img {

     }
    ```

## 伪选择器

### 伪类

伪类是选择器的一种，它**用于选择处于特定状态的元素**。一些例子如下：

|伪类|含义|
|--|--|
|`:invalid`|表单中验证不通过的元素。匹配诸如`<input>`的位于不可用状态的元素。|
|`:link`|匹配未曾访问的链接|
|`:visited`|匹配已访问过的链接|
|`:hover`|把鼠标放在链接上的状态|
|`:active`|在用户激活（例如点击）元素的时候匹配。|
|`:focus`|选择元素输入后具有焦点|
|`:checked`|匹配处于选中状态的单选或者复选框。|
|`:root`|匹配文档树的根元素。在 HTML 中，它通常是 `<html>` 元素。|
|`:first-child`|匹配同级元素中的第一个元素|
|`:last-child`|匹配同级元素中的最后一个元素|
|`:only-child`|选择没有兄弟元素的子元素|
|`:nth-child(an+b)`|使用 `an+b` 从一组同级元素中选择元素。|
|`:nth-of-type(an+b)`|使用 `an+b` 从一组同级元素中选择具有特定类型的元素。|
|`:not()`|用来匹配不符合一组选择器的元素。**括号内填不匹配的选择器**|
|`:is()`|可以接受一组选择器作为参数，并匹配其中任意一个选择器所对应的元素，**计入选择器的优先级**。|
|`:where()`|可以接受一组选择器作为参数，并匹配其中任意一个选择器所对应的元素，**但不计入选择器的优先级**。|

#### `:nth-child(an+b)`

`an+b` 是一个数学表达式，其中 `a` 和 `b` 是整数，`n` 是一个从 0 开始的整数序列。表达式 `an+b` 会计算出一系列索引值，选择器会匹配这些索引对应的子元素（索引从 1 开始计数）。在父元素的**所有子元素**中按绝对位置计数。如果计算结果小于 1 或大于子元素总数，则忽略。

示例说明：

| 表达式 | 匹配的元素索引 | 说明 |
| -------- | --------------- | ------ |
| `:nth-child(2)` | 2 | 选择父元素下的第 2 个子元素（固定索引） |
| `:nth-child(odd)` | 1, 3, 5, … | 选择所有奇数索引的子元素（等价于 `2n+1`） |
| `:nth-child(even)` | 2, 4, 6, … | 选择所有偶数索引的子元素（等价于 `2n`） |
| `:nth-child(3n+1)` | 1, 4, 7, 10, … | 从第 1 个开始，每隔 3 个选一个 |
| `:nth-child(3n)` | 3, 6, 9, … | 选择索引是 3 的倍数的子元素 |
| `:nth-child(2n+3)` | 3, 5, 7, 9, … | 从第 3 个开始，每间隔一个选一个 |
| `:nth-child(n+4)` | 4, 5, 6, … | 选择从第 4 个开始往后的所有子元素 |
| `:nth-child(-n+4)` | 1, 2, 3, 4 | 选择前 4 个子元素 |
| `p:nth-child(3n+1)` | 1, 4, 7, 10, … | 从第 1 个开始，每隔 3 个选一个元素，且该元素为 `<p>` 元素；如果不是 `<p>` 元素，则不匹配 |

#### `:nth-of-type(an+b)`

`an+b` 的计算方式和 `:nth-child(an+b)` 一样。不同的点是 `:nth-of-type(an+b)` 在父元素的**同类型子元素**中按绝对位置计数。

示例：

```html
<div class="container">
  <p>段落1</p>      <!-- 所有子元素中的第1个，同类型(p)中的第1个 -->
  <span>span1</span> <!-- 所有子元素中的第2个，同类型(span)中的第1个 -->
  <p>段落2</p>      <!-- 所有子元素中的第3个，同类型(p)中的第2个 -->
  <span>span2</span> <!-- 所有子元素中的第4个，同类型(span)中的第2个 -->
  <p>段落3</p>      <!-- 所有子元素中的第5个，同类型(p)中的第3个 -->
</div>
```

- `p:nth-child(2)` → 不会匹配任何元素，因为第 2 个子元素是 `<span>`。
- `p:nth-of-type(2)` → 匹配第 2 个 `<p>`（即“段落2”）。
- `span:nth-child(3)` → 不会匹配，因为第 3 个子元素是 `<p>`。
- `span:nth-of-type(1)` → 匹配第 1 个 `<span>`（即“span1”）。

#### `:is()`

简化长选择器列表：

```css
header a:hover,
main a:hover,
footer a:hover {
  text-decoration: underline;
}

/* 使用 :is() 简化 */
:is(header, main, footer) a:hover {
  text-decoration: underline;
}
```

配合复杂选择器减少重复：

```css
/* 传统写法 */
article > h1,
article > h2,
section > h1,
section > h2,
aside > h1,
aside > h2 {
  margin-top: 1em;
}

/* 使用 :is() */
:is(article, section, aside) > :is(h1, h2) {
  margin-top: 1em;
}
```

#### 比较 `:is()` 和 `:where()`

语法：

```css
:is(selector1, selector2, ...) { ... }
:where(selector1, selector2, ...) { ... }
```

相同点：

- 浏览器会分别尝试匹配列表中的每个选择器，只要元素符合其中任意一个，规则就会生效.
- 如果一个选择器无法解析，整个选择器列表不会被视为无效，而是会忽略不正确或不支持的选择器，并使用其他的选择器。  

区别：

- `:is()` 的优先级等于其参数列表中优先级最高的那个选择器的优先级
- `:where()` 的优先级始终为 0。

### 伪元素

伪元素用于创建并样式化文档树中不存在的抽象元素，或选取元素的特定部分（如第一个字母、第一行）

- `::before` -- 在元素内容之前插入内容
- `::after` -- 在元素内容之后插入内容
- `::first-line` -- 匹配文档的第一行。  
- `::first-letter` -- 匹配元素的第一个字母。  
- `::selection` -- 匹配文档中被选择的那部分。
- `::placeholder` -- 匹配表单输入框的占位符文本（`placeholder` 属性）。

#### `::before` 和 `::after` 插入内容

`::before` 和 `::after` 与 `content` 属性一同使用，使用 CSS 将内容插入到你的文档中中。通常不会插入内容，而是插入图标或者图案

```css
/* 这里是在元素前插入了一段内容 */
.box::before {
    content: "This should show before the other content. ";
}   
/* 这里是插入图标 */
.box::after {
    content: " ➥";
}   
/* 这里插入了一个方块，注意 content 为 ""。注意要设置 display，不然显示不出来 */
.box::before {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: rebeccapurple;
    border: 1px solid black;
}   
```
