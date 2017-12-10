import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MainPage from 'pages/MainPage.js';
import TestPage from 'pages/TestPage.js';

const App = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/test" component={TestPage} />
    <Route path="*" component={() => <h2>404: Not Found</h2>} />
  </Switch>
);

export default App;
