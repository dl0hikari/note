import React from 'react';
import styled from 'styled-components';

const ImgObj = styled.img`
  max-width: 100%;
`;

interface FinalPicProps{
  url: string;
}

export default function FinalPic({ url }: FinalPicProps){
   return (
      <ImgObj src={url}></ImgObj>
   );
}