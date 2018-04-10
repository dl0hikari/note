# 任何一个容器都可以指定为Flex布局

```css
.box{
        display: flex|inline-flex;
}
```
ps:webkit内核

```css
.box{
        display: -webkit-flex; /* Sarari */
        display: flex;
}
```

box为Flex容器，box的所有子元素为容器成员，称为Flex项目（flex item）,简称“项目”。

-------

## 容器属性：

```css
.box{
        flex-direction: row | row-reverse | column | column-reverse; /* 决定主轴的方向 */
        flex-wrap: nowrap| wrap | wrap-reverse;  /* 决定一条轴线排不下，如何换行 */
}
```

flex-direction 与 flex-wrap的简写 flex-flow

```css
.box{
        flex-flow: row nowrap;
}
```

>justify-content 项目在主轴上的对齐方式
>
>align-items 项目在交叉轴上的对齐方式
>
>align-content 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。


 ```css
.box{
        justify-content: flex-start | flex-end | center | space-between | space-around; /* 项目在主轴上的对齐方式 */
}
```


> 如果项目未设置高度或设为auto，stretch 将占满整个容器的高度


```css
.box{
        align-items: stretch | flex-start | flex-end | center | baseline ;  /* 项目在交叉轴上的对齐方式 */
}
```

> 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

```css
.box{
        align-content: stretch | flex-start | flex-end | center | space-between | space-around;
}
```

------

## 项目属性

>order 属性定义项目的排列顺序。数值越小越靠前，默认为0

```css
.item{
        order: <integer>;
}
```
>flex-grow   属性定义项目的放大比例，默认值为0
>
>flex-shrink 属性定义了项目的缩小比例，默认值为1
>
>flex-basis  属性定义了在分配多余控件之前，项目占据的主轴空间

```css
.item{
        flex-grow: <number>; /* default 0 */
        flex-shrink: <number>; /* default 1 */
        flex-basis: <length> | auto; /* default auto */
}
```

>flex属性是flex-grow, flex-shrink和flex-basis的简写，默认0 1 auto。后两个属性可选。
>
>该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

```css
.item{
        flex: none | 0 1 auto | auto;
}
```

>align-self属性允许单个项目与其他项目不一样的对齐方式，可覆盖align-items的属性。默认为auto,表示继承父元素的align-item属性，如果没有父元素则等同于stretch.

```css
.item{
        align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

>该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

>来源：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

*   一列表项包含一个列表区块：

        <代码写在这>