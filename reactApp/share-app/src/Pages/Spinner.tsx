import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import url from './img/Blocks-1s-200px.gif';


const SpinnerStyle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -0.5em;
  margin-left: -0.5em;
  width: 1em;
  height: 1em;
  overflow: hidden;
  font-size: ${({ size }: SpinnerProps) => size ? `${size}px` : 'inherit'};

  img{
    position: absolute;
    width: 200%;
    height: 200%;
    max-width: none;
    left: 50%;
    top: 50%;
    margin-top: -1em;
    margin-left: -1em;
  }
`;

interface SpinnerProps {
  size?: number;
}

export default class Spinner extends React.PureComponent<SpinnerProps> {
  render() {
      return (
          <SpinnerStyle size={this.props.size}>
              <img src={url} alt='' />
          </SpinnerStyle>
      );
  }
}


const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  height: ${({ height }: SpinnerWrapperProps) => height ? `${height}px`: 'inherit'};
  z-index: 9;
`;

interface SpinnerWrapperProps extends SpinnerProps{
  height?: number;
}

export function SpinnerWrapper({ size, height }: SpinnerWrapperProps) {
  return (
      <Wrapper height={height}>
          <Spinner size={size} />
      </Wrapper>
  );
}

SpinnerWrapper.defaultProps = {
  size: 40
};

const SpinnerTextStyle = styled.span`
    display: inline-block;
    position: relative;
    width: 10px;
    text-align: left;
`;

// 文字loading
export function SpinnerText() {
  const text = useRef('.');
  const [count, setCount] = useState(0);

  useEffect(() => {
      const timeout = setInterval(() => {
          text.current = text.current === '...' ? '.' : text.current + '.';
          setCount(count + 1);
      }, 500);
      return () => clearTimeout(timeout);
  }, [count]);

  return <SpinnerTextStyle>{text.current}</SpinnerTextStyle>;
}


// const SpinnerStyle = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   margin-top: -0.5em;
//   margin-left: -0.5em;
//   width: 1em;
//   height: 1em;
//   overflow: hidden;
//   font-size: ${({ size }: SpinnerProps) => size ? `${size}px` : 'inherit'};

//   img{
//     position: absolute;
//     width: 200%;
//     height: 200%;
//     max-width: none;
//     left: 50%;
//     top: 50%;
//     margin-top: -1em;
//     margin-left: -1em;
//   }
// `;

// interface SpinnerProps{
//   size?: number;
// }

// export default function Spinner({ size }: SpinnerProps){
//   return(
//     <SpinnerStyle size={50}>
//         <img src={url} alt=""/>
//     </SpinnerStyle>
//   );
// }