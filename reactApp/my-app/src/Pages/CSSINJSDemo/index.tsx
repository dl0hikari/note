import React, { Fragment } from 'react';
import styled from 'styled-components';
import SourceCode from './SourceCode';
import GlobalStyle from './GlobalStyle';
import chigua from './chigua.jpg'; // 图片
import TagName, { TagNameSourceCode } from './TagName'; // 标签名
import ClassNameCss, { ClassNameCssSourceCode } from './ClassNameCss'; // 类名
import Nesting, { NestingSourceCode } from './Nesting'; // 嵌套
import PseudoClass, { PseudoClassSourceCode } from './PseudoClass'; // 伪类
import Thing, { ThingSourceCode } from './Thing'; // 上下文选择符
import PropsStyled, { PropsStyledSourceCode } from './PropsStyled'; // 基于Props做样式判断
import { default as ExtendCss, ExtendCssSourceCode } from './ExtendCss' // 继承样式
import AttrCss, { AttrCssSourceCode } from './Attr'; // 标签属性
import Animate, { AnimateSourceCode } from './Animate'; // 动画

const Container = styled.div`
    margin: 0 auto;
    padding-bottom: 100px;
    width: 800px;

    .Heading{
        font-size: 60px;
        text-align: center;
    }

    .img{
        display: inline-block;
        width: 100px;
        height: 100px;
        background-image: url(${chigua});
        background-size: 100%;
    }
`;

const Block = styled.div`
    display: table;
    width: 100%;
    .title{
        padding-bottom: 10px;
        font-size: 24px;
        color: #000;
        font-weight: bold;
        border-bottom: 1px dashed;
    }
    .left{
        float: left;
        width: 20%;
    }

    .right{
        float: left;
        width: 80%;
        background-color: #eee;
    }
`;

const usageList = [
    {
        title: '· 标签名',
        component: <TagName>
            我是一个DIV
        </TagName>,
        sourceCode: <SourceCode>{TagNameSourceCode}</SourceCode>
    },
    {
        title: '· 类名',
        component:<ClassNameCss>
            <h3>红色 h3 标签</h3>
            <div className="blue"> 蓝色 div 标签 </div>
        </ClassNameCss>,
        sourceCode: <SourceCode>{ClassNameCssSourceCode}</SourceCode>
    },
    {
        title: '· 伪类、伪元素',
        component: <PseudoClass>伪类</PseudoClass>,
        sourceCode: <SourceCode>{PseudoClassSourceCode}</SourceCode>
    },
    {
        title: '· 嵌套',
        component: <Fragment>
            <Nesting className='blue'>蓝色</Nesting>
            <Nesting>
                <span className='red'>红色</span>
            </Nesting>
            </Fragment>,
        sourceCode: <SourceCode>{NestingSourceCode}</SourceCode>
    },
    {
        title: '· 上下文选择符',
        component: <Fragment>
            <Thing>第一个Thing组件</Thing>
            <Thing>第二个Thing组件</Thing>
        </Fragment>,
        sourceCode: <SourceCode>{ThingSourceCode}</SourceCode>
    },
    {
        title: '· 基于Props做样式判断',
        component: <Fragment>
            <PropsStyled purple="purple">你好！紫色</PropsStyled>
            <PropsStyled>你好</PropsStyled>
        </Fragment>,
        sourceCode: <SourceCode>{PropsStyledSourceCode}</SourceCode>
    },
    {
        title: '· 样式的继承',
        component: <Fragment>
            <ExtendCss>样式继承</ExtendCss>
        </Fragment>,
        sourceCode: <SourceCode>{ExtendCssSourceCode}</SourceCode>
    },
    {
        title: '· 标签属性',
        component: <Fragment>
            <AttrCss>样式继承</AttrCss>
        </Fragment>,
        sourceCode: <SourceCode>{AttrCssSourceCode}</SourceCode>
    },
    {
        title: '· 动画',
        component: <Fragment>
            <Animate>🐮</Animate>
        </Fragment>,
        sourceCode: <SourceCode>{AnimateSourceCode}</SourceCode>
    }
]



const CSSINJSDemo = () => {
    return (
        <Fragment>
            <GlobalStyle></GlobalStyle>
            <Container>
                <div className="Heading">
                    <span className="img"></span>CSSINJS
                </div>
                {
                    usageList.map((item, index) => <Block key={index}>
                        <div className="title">{item.title}</div>
                        <div className="left">
                            {item.component}
                        </div>
                        <div className="right">
                            {item.sourceCode}
                        </div>
                    </Block>)
                }
            </Container>
        </Fragment>
    );
};

export default CSSINJSDemo;
