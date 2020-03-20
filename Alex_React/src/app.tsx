import React from 'react';
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Input from 'src/Components/Input';

const Test = styled.div`
    color: red;
    font-size: 24px;

    /* span{
        font-size: 50px;
    } */
`;

const TestExtend = styled(Test)`
    background-color: #0f0;
`;


class App extends React.Component {
    public render() {
        return (
            <TestExtend>
                hello react
                <span>haha</span>
                <Input  />
            </TestExtend>
        );
    }

    onchange() {
        alert('onchange');
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
