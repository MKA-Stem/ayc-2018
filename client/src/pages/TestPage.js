import React from 'react';
import './TestPage.css';
import NavWrapper from 'components/NavWrapper.js';

import urls from 'lib/urls.js';

import {testLatency, getAvgLatency} from 'lib/latencyTest.js';
import TestStatus from 'components/TestStatus.js';
import Explainer from 'components/Explainer.js';
import client from 'lib/client.js';
import gql from 'graphql-tag';

const submitMutation = gql`
  mutation($url: String!, $isp: String!, $latency: Float!) {
    addTest(url: $url, isp: $isp, latencyavg: $latency) {
      id
      url
      latencyavg
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

      try {
        // Run tests
        console.log('Starting test');
        const latency = await getAvgLatency(test.url, TEST_REPEAT);
        test.result = latency;

        // Submit average
        console.log('Submitting average');
        const mut = await client.mutate({
          mutation: submitMutation,
          variables: {
            url: test.url,
            isp: 'TestISP',
            latency: test.result
          }
        });

        test.avg = mut.data.addTest.latencyavg;
        test.ratio = latency / test.avg;
      } catch (e) {
        console.log(e);
        test.err = true;
      }

      // Update UI
      let tests = [...this.state.tests];
      tests[i] = test;
      this.setState({tests});

      console.groupEnd();
    }
    this.setState({done: true});
  }

  render() {
    const ResultsList = ({tests}) =>
      this.state.tests.map(e => (
        <TestStatus key={e.url} err={e.err} url={e.url} result={e.result} avg={e.avg} />
      ));

    return (
      <NavWrapper>
        {!this.state.done && (
          <div>
            <h1>Running tests...</h1>
            <ResultsList tests={this.state.tests} />
          </div>
        )}
        {this.state.done && (
          <div>
            <h1>Test Results</h1>
            <details>
              <summary className="TestPage_summary">View Full Results</summary>
              <ResultsList tests={this.state.tests} />
            </details>
            <Explainer tests={this.state.tests} />
          </div>
        )}
      </NavWrapper>
    );
  }
}

export default TestPage;
