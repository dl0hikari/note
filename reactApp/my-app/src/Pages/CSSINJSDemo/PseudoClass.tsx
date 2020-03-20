import styled from 'styled-components';

// 3伪类 伪元素
const PseudoClass = styled.span`
    :hover{
        display: inline-block;
        background: #0f0;
    }
    :before{
        content: 'before';
    }
`;

export const PseudoClassSourceCode = `const PseudoClass = styled.span\`
:hover{
    display: inline-block;
    background: #0f0;
}
:before{
    content: 'before';
}
\`;`;

export default PseudoClass;
