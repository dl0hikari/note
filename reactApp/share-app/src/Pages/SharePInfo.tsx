import React, { useEffect, useState, createContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Html from './Html';
import FinalPic from './FinalPic';
import Html2Canvas from 'html2canvas';
import { SpinnerWrapper } from './Spinner';

// 手机拍照合成图片
export const myContext = createContext<{
  canDoing: (value: boolean) => void;
}>({
  canDoing: () => null
});

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'SimHei';
    color: #f8f8f8;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const HtmlWrapper = styled.div`
  width: 100%;
`;

const FinamPicWrapper = styled.div`
    text-align: center;
`;

export default function SharePInfo(){

  const [computeUrl, setComputeUrl] = useState('');
  const [isShow, setIsShow] = useState(true);
  // const [doHtml2Canvas, setDoHtml2Canvas] = useState(false);   // 手机拍照合成图片

  // 手机拍照合成图片
  // useEffect(() => {
  //   doHtml2Canvas && doing();
  // }, [doHtml2Canvas]);

  // 直接获取图片合成
  useEffect(() => {
    doing();
  }, []);


  const doing = () => {
    Html2Canvas(document.getElementById('targetHtmlObj')!, { width: 1015, height: 1759 }).then((canvas) => {
      setIsShow(false);
      const url = canvas.toDataURL();
      setComputeUrl(url);
      // document.body.appendChild(canvas);
    });
  };

   return (

      <Wrapper>
        {/* <myContext.Provider value={{canDoing: (v) => setDoHtml2Canvas(v)}}> 手机拍照合成图片 */}
        <GlobalStyle />
        {isShow && <div>
          <SpinnerWrapper size={50}></SpinnerWrapper>
          <HtmlWrapper>
            <Html id="targetHtmlObj"></Html>
          </HtmlWrapper>
        </div>}
        {!isShow && <FinamPicWrapper><FinalPic url={computeUrl}></FinalPic></FinamPicWrapper>}
        {/* </myContext.Provider> 手机拍照合成图片 */}
      </Wrapper>
   );
}