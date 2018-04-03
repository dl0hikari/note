# markdown常用语法

宗旨：易读易写

> 插入\<br />的话（也就是想换行），在插入处先安如两个以上的空格然后回车。

## 标题

* 类Setext
类Setext形式使用底线的形式

> This is an H1
>
> ========
>
> This is an H2
>
> \_____________


* 类Atx

> \#  这是H1
>
>\## 这是H2
>
>\###### 这是H6

## 区块引用 Blockquotes

符号 >

> \>This is ...
> \>...
> \>...

引用的区块也可以使用其他的Markdown语法

> ## 这是一个标题。
>
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
>
> 给出一些例子代码：
>
>     return shell_exec("echo $input | $markdown_script");

## 列表

无序符号* + -
有序 1. 2.

## 代码区块

简单的缩进4个空格或是一个制表符就可以

这是一个普通段落：

    这是一个代码区块。

## 分割线

>\* * *
>
>\***
>
>\*****
>
>\- - -
>
>\---------------------------------------

## 链接
行内式和参考式两种形式

* 行内式
在方括号后面紧接着圆括号插入网址链接即可。

> This is [an example](http://example.com/ "Title") inline link.

* 参考式
在文字的括号后面再接上一个方括号里面填入辨识链接的标记，接着在文件的任意处可以把这个标记的链接内容定义出来。

>This is [an example][id] reference-style link.

[id]: http://example.com/  "Optional Title Here"

## 强调

>\*single asterisks*
>
>\_single underscores_
>
>\**double asterisks**
>
>\__double underscores__

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__