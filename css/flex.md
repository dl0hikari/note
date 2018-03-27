# 任何一个容器都可以指定为Flex布局
<style>
.box{
        display: flex|inline-flex;
}
</style>
 
ps:webkit内核
.box{
        display: -webkit-flex; /* Sarari */
        display: flex;
}
 
box为Flex容器，box的所有子元素为容器成员，称为Flex项目（flex item）,简称“项目”。
容器属性：
.box{
        flex-direction: row | row-reverse | column | column-reverse; /* 决定主轴的方向 */
        flex-wrap: nowrap| wrap | wrap-reverse;  /* 决定一条轴线排不下，如何换行 */
}
flex-direction 与 flex-wrap的简写 flex-flow   
.box{
        flex-flow: row nowrap;
}
 
justify-content 项目在主轴上的对齐方式
align-item 项目在交叉轴上的对齐方式
align-content 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
 
.box{
        justify-content: flex-start | flex-end | center | space-between | space-around; /* 项目在主轴上的对齐方式 */
}
 
 
/* 如果项目未设置高度或设为auto，stretch 将占满整个容器的高度 */
.box{
        align-items: stretch | flex-start | flex-end | center | baseline ;  /* 项目在交叉轴上的对齐方式 */ 
}
 
/* 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用 */
.box{
        align-content: stretch | flex-start | flex-end | center | space-between | space-around; 
}