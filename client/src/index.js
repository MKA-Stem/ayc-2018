import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';
import registerServiceWorker from 'lib/registerServiceWorker';

import {BrowserRouter as Router} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import client from 'lib/client.js';

if (process.env.NODE_ENV === 'development') {
  Object.assign(window, {
    client
  });
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
