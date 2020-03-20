import React from 'react';
import pimg from './img/chigua.jpg';
import styled from 'styled-components';
import icon from './img/icon.png';
import grassIcon from './img/icon2.png';
import medalIcon from './img/icon3.png';
import rectangle from './img/rectangle.png';
// import DynamicImg from './DynamicImg'; // 手机拍照合成图片

const Wrapper = styled.div`
  position: absolute;
  top: 293px;
  width: 100%;
`;

const OutsideBorder = styled.div`
    position: absolute;
    top: 0;
    left: 70px;
    border-radius: 50%;
    border: 10px solid #2137c3;
    text-align: center;
`;

const InsideBorder = styled.div`
    width: 256px;
    height: 256px;
    border: 10px solid #0e21ac;
    border-radius: 50%;
    overflow: hidden;
`;

const PImg = styled.img`
  width: 100%;
`;

const InfoBlock = styled.div`
  position: absolute;
  top: 0;
  left: 366px;
`;

const UserName = styled.div`
  position: absolute;
  min-width: 232px;
  padding-left: 8px;
  color: #f8f8f8;
  font-size: 48px;
  text-align: center;
`;

const Level = styled.div`
  position: absolute;
  left: -57px;
  top: 0px;
  padding-top: 132px;
  padding-left: 144px;
  width: 323px;
  height: 339px;
  font-size: 48px;
  color: #c86c28;
  background: url(${icon}) center center no-repeat;
  box-sizing: border-box;
`;

const Honors = styled.div`
  position: absolute;
  top: 111px;
  left: 220px;
  width: 364px;

  .grassIcon{
    display: inline-block;
    width: 91px;
    height: 91px;
    background: url(${grassIcon}) center center no-repeat;
  }

  .medalIcon{
    display: inline-block;
    width: 91px;
    height: 91px;
    background: url(${medalIcon}) center center no-repeat;
  }
`;

const StudyTime = styled.div`
  position: absolute;
  left: 20px;
  top: 266px;
  padding-left: 25px;
  width: 540px;
  height: 74px;
  line-height: 74px;
  font-size: 40px;
  box-sizing: border-box;
  background: url(${rectangle}) center center no-repeat;
`;


export default function PInfo(){
  return (
    <Wrapper>
        <OutsideBorder>
          <InsideBorder>
            {/* <DynamicImg></DynamicImg> 手机拍照合成图片*/}
            <PImg src={pimg} ></PImg>
          </InsideBorder>
        </OutsideBorder>
        <InfoBlock>
            <UserName>琪琪七七</UserName>
            <Level>Lv3</Level>
            <Honors>
              <span className="medalIcon"></span>
              <span className="grassIcon"></span>
              <span className="grassIcon"></span>
              <span className="grassIcon"></span>
            </Honors>
            <StudyTime>学习时长：89小时52分</StudyTime>
        </InfoBlock>
    </Wrapper>
  );
}