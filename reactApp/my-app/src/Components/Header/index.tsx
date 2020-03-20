import React from 'react';
import styled from 'styled-components';

// 样式
const HeaderCss = styled.div`
    height: 41px;
    background-color: #093962;
    border-bottom: 1px solid #072e4e;

    :hover{
        color: blue;
    }
    :before{
      content: "Hello";
    }
`;


const Header = () => {
    return (
        <HeaderCss>
            <div className="container">
                333333333
            </div>
        </HeaderCss>
    );
};

export default Header;
