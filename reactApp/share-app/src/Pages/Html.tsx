import React, {useContext, useEffect} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import PInfo  from './PInfo';
import Rank from './Rank';
// 图片
import bgImg from './img/bg.jpg';
import logo from './img/logo.png';
import medal from './img/medal.png';
import qrcode from './img/qr.png';

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'SimHei';
    color: #f8f8f8;
  }
`;

const Wrapper = styled.div`
  position: relative;
  /* max-width: 1015px; */
  width: 1015px;
  height: 1759px;
`;

const Bg = styled.img`
    max-width: 100%;
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Medal = styled.img`
  position: absolute;
  top: 0;
  left: 25px;
`;

const Title = styled.div`
  position: absolute;
  top: 157px;
  width: 100%;
  font-size: 94px;
  text-align: center;
  line-height: 1;
  color: #f8f8f8;
  letter-spacing: 10px;
`;

const QRCode = styled.img`
  position: absolute;
  bottom: 33px;
  right: 33px;
`;

interface SharePInfoProps{
  id: string;
}

export default function SharePInfo({ id }: SharePInfoProps){
   return (
      <Wrapper id={id}>
        <GlobalStyle />
        <Bg src={bgImg} ></Bg>
        <Medal src={medal}></Medal>
        <Logo src={logo}></Logo>
        <Title>听课小达人</Title>
        <PInfo></PInfo>
        <Rank></Rank>
        <QRCode src={qrcode}></QRCode>
      </Wrapper>
   );
}