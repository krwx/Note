- [介绍](#介绍)
  - [`<image>`](#image)
  - [`<gradient>`](#gradient)
    - [linear-gradient()](#linear-gradient)

# 介绍
`CSS` 基本数据类型是 组件值类型 `component value type` 的一种。用于**定义 `CSS` 属性和函数可以接受的变量（关键字和单位）的种类**。

[`<image>`](#image)

## `<image>`
CSS 的`<image>`数据类型描述的是 2D 图形。在 CSS 中有两种类型的图像：
- 简单的静态图像，经常被一个在使用的 URL 引用，
- 动态生成的图像，比如 DOM 树的部分元素样式渐变或者计算样式产生。

语法：  
一个 `<image>` CSS 数据类型可能表示成如下几种类型：
- 一个图像被引用为 CSS `<url>()`数据类型使用 `url()` 方法；
- 一个 CSS`<gradient>`;
```
url(test.jpg)                          url() 方法，只要 test.jpg 是图像文件
linear-gradient(to bottom, blue, red)  一个 <gradient>标签
```

## `<gradient>`
`<gradient>` CSS 数据类型 是 `<image>` 的一种特殊类型，包含两种或多种颜色的过渡转变。

语法：
- 线性渐变
  - 线性渐变会在一个假想的直线上过渡颜色。线性渐变是由 `linear-gradient()` 函数产生的。
- 径向渐变
  - 径向渐变从一个中间点（原点）开始过渡颜色。径向渐变是由 `radial-gradient()` 函数产生的。
- 重复渐变
  - 重复渐变可根据需要复制渐变，以填充指定区域。重复渐变是使用 `repeating-linear-gradient()` 和 `repeating-radial-gradient()` 函数生成的。
- 锥形渐变
  - 锥形渐变会沿着一个圆过渡颜色。锥形渐变是由 `conic-gradient()` 函数产生的。

### linear-gradient()
`linear-gradient()` CSS 函数创建一个由两种或多种颜色沿一条直线进行线性过渡的图像，其结果是 `<gradient>` 数据类型的对象
```css
/* 渐变轴为 45 度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 色标：从下到上，从蓝色开始渐变，到高度 40% 位置是绿色渐变开始，最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/* 颜色提示：从左到右的渐变，由红色开始，沿着渐变长度到 10% 的位置，然后在剩余的 90% 长度中变成蓝色 */
linear-gradient(.25turn, red, 10%, blue);

/* 多位置色标：45% 倾斜的渐变，左下半部分为红色，右下半部分为蓝色，中间有一条硬线，在这里渐变由红色转变为蓝色 */
linear-gradient(45deg, red 0 50%, blue 50% 100%);
```