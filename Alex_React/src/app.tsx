import * as React from 'react';
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const TestWrap = styled.div`
    color: red;
    font-size: 24px;

    span{
        font-size: 50px;
    }
`;

class App extends React.Component {
    public render() {
        return (
            <div>
                <TestWrap>
                    hello react
                    <span>haha</span>
                </TestWrap>
            </div>
        );
    }

    onchange() {
        alert('onchange');
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
