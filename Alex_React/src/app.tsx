import * as React from 'react';
import * as ReactDOM from "react-dom";

class App extends React.Component {
    public render() {
        return (
            <div>
                hello react
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
