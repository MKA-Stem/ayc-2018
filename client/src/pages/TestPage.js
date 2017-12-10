import React from 'react';
import NavWrapper from 'components/NavWrapper.js';

import urls from 'lib/urls.js';

import {testLatency, getAvgLatency} from 'lib/latencyTest.js';
import TestStatus from 'components/TestStatus.js';
import client from 'lib/client.js';
import gql from 'graphql-tag';

const getAvgQuery = gql`
  query($url: String!) {
    average(url: $url) {
      url
      latencyavg
    }
  }
`;

const submitMutation = gql`
  mutation($url: String!, $isp: String!, $latency: Float) {
    addTest(url: $url, isp: $isp, latencyavg: $latency) {
      id
    }
  }
`;

const TEST_REPEAT = 5;

window.testLatency = testLatency;
window.getAvgLatency = getAvgLatency;

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      tests: urls.map(url => ({url, result: null}))
    };
  }

  async componentDidMount() {
    // run ALL THE THINGS
    for (let i = 0; i < this.state.tests.length; i++) {
      const test = {...this.state.tests[i]};

      // Get the average
      console.group('Testing ' + test.url);

      console.log('Fetching average');
      const result = await client.query({query: getAvgQuery, variables: {url: test.url}});
      test.avg = result.data.average.latencyavg || null;

      // Run tests
      console.log('Starting test');
      const latency = await getAvgLatency(test.url, TEST_REPEAT);
      test.result = latency;

      // Submit average
      console.log('Submitting average');
      await client.mutate({
        mutation: submitMutation,
        variables: {
          url: test.url,
          isp: 'TestISP',
          latency: test.result
        }
      });

      // Update UI
      let tests = [...this.state.tests];
      tests[i] = test;
      this.setState({tests});

      console.groupEnd();
    }
    this.setState({done: true});
  }

  render() {
    return (
      <NavWrapper>
        {this.state.done ? <h1>Test Results</h1> : <h1>Running Tests...</h1>}
        {this.state.tests.map(e => (
          <TestStatus key={e.url} url={e.url} result={e.result} avg={e.avg} />
        ))}
      </NavWrapper>
    );
  }
}

export default TestPage;
