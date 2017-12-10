import React from 'react';
import NavWrapper from 'components/NavWrapper.js';

import urls from 'lib/urls.js';

import {testLatency, getAvgLatency} from 'lib/latencyTest.js';

window.testLatency = testLatency;
window.getAvgLatency = getAvgLatency;

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  render() {
    return (
      <NavWrapper>
        <h1>Running Tests...</h1>
      </NavWrapper>
    );
  }
}

export default TestPage;
