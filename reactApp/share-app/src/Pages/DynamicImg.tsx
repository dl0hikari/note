import React, {createRef, useState, useContext} from 'react';
import styled from 'styled-components';
import photo from './img/2.jpg';
import { myContext } from './SharePInfo';

const Pos = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  width: 100%;

  img{
    position: relative;
    left: -50%;
    width: 100%;
    top: ${({height}: {height: number}) => height ? `${0 - height/2}px` : 0};
  }
`;

export default function DynamicImg(){
  // 动态上传图片处理
  const posRef = createRef<HTMLImageElement>();
  const [posTop, setPosTop] = useState(0);
  const context = useContext(myContext);

  const computePos = (e: any) => {
    const posHeight = e.target.offsetHeight;
    setPosTop(posHeight);
    context.canDoing(true);
  };

  return (
    /* 动态上传图片处理 */
    <Pos height={posTop}>
      <img ref={posRef} src={photo} alt="" onLoad={computePos} />
    </Pos>
  );

}