import styled from 'styled-components';

// 5上下文选择符
const Thing = styled.div`
    & + &{
        color: #0ff;
    }
`;
export const ThingSourceCode = `const Thing = styled.div\`
& + &{
    color: #0ff;
}
\`;`;

export default Thing;
