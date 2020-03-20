import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/';
import CSSINJSDeom from './Pages/CSSINJSDemo';
// import GlobalStyle from './Components/GlobalStyle';

class App extends Component {
  render() {
    return (
        <div>
            {/* <GlobalStyle></GlobalStyle> */}
            <Router>
                <Switch>
                <Route exact path='/' component={CSSINJSDeom}></Route>
                <Route exact path='/home' component={Home}></Route>
                </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
