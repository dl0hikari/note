# 了解line-height

默认状态， 浏览器使用1.0-1.2 line-height。 这是一个初始值

5种

1. line-height被定义为normal

```css
body{line-height: normal;}
```
2. line-height被定义为继承

```css
p{line-height: inherit;}
```

3. line-height可以使用一个百分比

```css
p{line-height: 120%;}
```

4. line-height可以被定义为一个长度值（单位px、em等）

```css
p{line-height: 20px;}
```

5. line-height也可以被定义为纯数字

```css
p{line-height: 1.2;}
```

> 使用normal与纯数字，所有继承下来的元素使用基于font-size算出来的line-height。其他带单位的都会忽略本身的font-size值，直接继承父元素的line-height。
>> 万维网内容可存取性指南（WCAG）2.0规定“段落中的行距至少要1.5倍”，这意味着如果要达到AAA等级，行高应为1.5。
body {line-height:1.5} h1,h2,h3,h4,h5,h6 {line-height:1.2}