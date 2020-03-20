import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
    body{
        color: #333;

        & .contanier{
            max-width: 1200px;
        }
    }

    pre{
        margin: 0;
        padding: 0 10px;
        font-size: 20px;
        color: #333;
    }
`;


export default GlobalStyle;
