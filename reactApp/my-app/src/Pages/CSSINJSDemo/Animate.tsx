import styled, { keyframes } from 'styled-components';

// 动画
const Rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Animate = styled.div`
  display: inline-block;
  animation: ${Rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

export const AnimateSourceCode = `const Rotate = keyframes\`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
\`;

const Animite = styled.div\`
  display: inline-block;
  animation: \${Rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
\`;`;

export default Animate;
