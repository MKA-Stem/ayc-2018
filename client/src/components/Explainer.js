import React from 'react';
import TestStatus from 'components/TestStatus.js';
import './Explainer.css';

class Explainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repInfo: null};
  }

  render() {
    console.log(this.state.repInfo);
    let {tests} = this.props;

    tests = [...tests];
    tests = tests.sort((a, b) => a.ratio - b.ratio);

    const worst = tests[tests.length - 1];
    const best = tests[0];

    return (
      <div className="Explainer">
        <p>
          Your results show the different latencies from each website. The fastest website loaded
          was {best.url}:
        </p>
        <TestStatus url={best.url} result={best.result} avg={best.avg} />
        <p>The slowest website, {worst.url}, loaded with a latency that was below average:</p>
        <TestStatus url={worst.url} result={worst.result} avg={worst.avg} />
        <p>
          This could be the result of the repeal of Net Neutrality, and an unequal treatment of
          internet traffic. While it seems we are fighting an uphill battle against millions of
          dollars of lobbying in Congress, the solution is activism. Your voice matters and we’ve
          made it easy for you to protect the internet. Contact your local representatives below:
        </p>
      </div>
    );
  }
}

export default Explainer;
