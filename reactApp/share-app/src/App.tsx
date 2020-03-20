import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SharePInfo from './Pages/SharePInfo';

class App extends Component {
  render() {
		return (
      <Router>
          <Switch>
              <Route exact path='/' component={SharePInfo}></Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
