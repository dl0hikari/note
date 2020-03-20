import styled from 'styled-components';

// 6基于Props做样式判断
const PropsStyled = styled.div`
    color: ${(props: {purple?: string}) =>
     props.purple ? 'purple' : 'gray'};
`;

export const PropsStyledSourceCode = `const PropsStyled = styled.div\`
color: \${(props: {purple?: string}) =>
    props.purple ? 'purple' : 'gray'};
\`;`

export default PropsStyled;
