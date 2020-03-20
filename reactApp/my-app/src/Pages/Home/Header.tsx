import React from 'react';
import styled from 'styled-components';
import { default as HeaderComponent } from '../../Components/Header';

const HeaderWraper = styled.div`
    height: 41px;
    background-color: #093962;
    border-bottom: 1px solid #072e4e;
`;

export default function Header(){
    return (
        <HeaderWraper>
            <HeaderComponent ></HeaderComponent>
        </HeaderWraper>
    );
}
