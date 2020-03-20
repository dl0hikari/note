import styled from 'styled-components';

// 4嵌套
const Nesting = styled.div`
    &.blue{
        color: #00f;
    }

    .red{
        color: #f00;
    }
`;

export const NestingSourceCode = `const Nesting = styled.div\`
&.blue{
    color: #00f;
}

.red{
    color: #f00;
}
\`;`;

export default Nesting;
