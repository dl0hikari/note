import React from 'react';
import styled from 'styled-components';
import rankImg from './img/rank.png';
import rankImg2 from './img/rank2.png';
import rankImg3 from './img/rank3.png';
import medal from './img/icon4.png';

const Wrapper = styled.div`
  position: absolute;
  top: 700px;
  left: 35px;
  width: 100%;
`;

const RankBlock = styled.div`
  position: relative;
  float: left;
  margin: 0 15px;
  width: 285px;
  height: 328px;
  max-width: 100%;
`;

const Title = styled.div`
  position: absolute;
  top: 40px;
  height: 45px;
  width: 100%;
  font-size: 32px;
  text-align: center;
`;

const Medal = styled.div`
  position: absolute;
  top: 125px;
  left: 100px;
  width: 89px;
  height: 88px;
  line-height: 88px;
  box-sizing: border-box;
  background: url(${medal}) center center no-repeat;
  text-align: center;
  font-size: 50px;
  text-align: center;
  color: #f94e03;
  font-weight: bold;
  font-family: 'Microsoft Yahei';
  /* font-style: italic; */

  span{
    display: block;
    transform: skewX(-9deg);
  }
`;

const PercentFont = styled.div`
  position: absolute;
  top: 270px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: #a6e8fa;

  span{
    padding: 0 5px;
  }
`;

const PercentFont2 = styled(PercentFont)`
  color: #8455d0;
`;

const PercentFont3 = styled(PercentFont)`
  color: #a8c1fa;
`;

const Total = styled.div`
  position: absolute;
  top: 139px;
  left: 0;
  width: 100%;
  font-size: 40px;
  text-align: center;
  letter-spacing: 4px;
`;

export default function Rank(){
  return (
    <Wrapper>
      <RankBlock>
        <img src={rankImg} alt=""/>
        <Title>学习中心排名</Title>
        <Medal><span>3</span></Medal>
        <PercentFont>战胜<span>30%</span>的同学</PercentFont>
      </RankBlock>
      <RankBlock>
        <img src={rankImg2} alt=""/>
        <Title>全省排名</Title>
        <Total>23456</Total>
        <PercentFont2>战胜<span>30%</span>的同学</PercentFont2>
      </RankBlock>
      <RankBlock>
        <img src={rankImg3} alt=""/>
        <Title>全国排名</Title>
        <Total>1234</Total>
        <PercentFont3>战胜<span>30%</span>的同学</PercentFont3>
      </RankBlock>
    </Wrapper>
  );
}