# Flex布局

- [Flex布局](#flex布局)
  - [属性](#属性)
    - [flex](#flex)
      - [应用](#应用)

## 属性

### flex

`flex` 是 `flex-grow、flex-shrink、flex-basic` 的缩写

```css
/* 关键字值 */
flex: auto;
flex: initial;
flex: none;

/* 单值，无单位数字：flex-grow。 flex-basis 此时等于 0。 */
/* 相当于设置了 flex-grow。等于 flex: 2 1 0 */
flex: 2;

/* 单值，宽度/高度：flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;

/* 双值：flex-grow | flex-basis */
flex: 1 30px;

/* 双值：flex-grow | flex-shrink */
flex: 2 2;

/* 三值：flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;

/* 全局值 */
flex: inherit;
flex: initial;
flex: revert;
flex: revert-layer;
flex: unset;
```

可以使用一个，两个或三个值来指定 flex 属性。

- 单值语法：值必须是以下之一：
  - 一个 `<flex-grow>` 的有效值：此时简写会扩展为 `flex: <flex-grow> 1 0`。
  - 一个 `<flex-basis>` 的有效值：此时简写会扩展为 `flex: 1 1 <flex-basis>`。
  - 关键字 `none` 或者全局关键字之一（`auto`）。
- 双值语法：
  - 第一个值必须是一个 `flex-grow` 的有效值。
  - 第二个值必须是以下之一：
    - 一个 `flex-shrink` 的有效值：此时简写会扩展为 flex: `<flex-grow> <flex-shrink> 0`。
    - 一个 `flex-basis` 的有效值：此时简写会扩展为 flex: `<flex-grow> 1 <flex-basis>`。
- 三值语法：值必须按照以下顺序指定：
  1. 一个 `flex-grow` 的有效值。
  2. 一个 `flex-shrink` 的有效值。
  3. 一个 `flex-basis` 的有效值。

`flex: auto` 等于 `flex: 1 1 auto`

#### 应用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box {
            height: 200px;
            display: flex;
        }
        #box1 {
            background-color: lightpink;
            flex: 1;
        }
        #box2 {
            background-color: lightsalmon;
            flex: 1;
        }
        #box3 {
            background-color: lightslategray;
            flex: 3;
        }
    </style>
</head>
<body>
    <div class="box">
        <div id="box1">box1</div>
        <div id="box2">box2</div>
        <div id="box3">box3</div>
    </div>
</body>
</html>
```

- 三个 box 都设置 `flex` 为数值，那么比较的是 `flex-grow` ，所以 box3 的宽度最宽，box1 和 box2 平均分配剩下的宽度。
