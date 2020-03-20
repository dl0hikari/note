import styled from 'styled-components';

// 2类名
const ExtendCss = styled.div`
    background-color: #0ff;
    color: #333;
`;

const ExtendCssPlus = styled(ExtendCss)`
    font-size: 16px;
`;

export const ExtendCssSourceCode = `const ExtendCss = styled.div\`
background-color: #0ff;
color: #333;
\`;
const ExtendCssPlus = styled(ExtendCss)\`
    font-size: 16px;
\`;
`;

export default ExtendCssPlus;
