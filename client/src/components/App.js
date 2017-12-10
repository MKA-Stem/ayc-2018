import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';

import './App.css';

import MainPage from 'pages/MainPage.js';
import TestPage from 'pages/TestPage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App_header">
          <div className="App_container">
            <span className="App_brand">
              <Link to="/">NetTest</Link>
            </span>
          </div>
        </div>

        <div className="App_container">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/test" component={TestPage} />
            <Route path="*" component={() => <h2>404: Not Found</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
