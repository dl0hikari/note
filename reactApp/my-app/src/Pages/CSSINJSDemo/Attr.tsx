import styled from 'styled-components';

// 2类名
const AttrCss = styled.a.attrs({
    href: 'https://www.baidu.com'
})`
    color: #ff0;
    :hover{
        color: #00f;
    }
`;
export const AttrCssSourceCode = `const AttrCss = styled.a.attrs({
    href: 'https://www.baidu.com'
})\`
    color: #ff0;
    :hover{
        color: #00f;
    }
\`;`;

export default AttrCss;
