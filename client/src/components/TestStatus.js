import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner.js';
import './TestStatus.css';
import classnames from 'classnames';

const TestStatus = ({url, err, result, avg}) => {
  const ratio = 1 - result / (avg || result);

  let color = null;

  const percent = ratio * 100;
  const formatted = `${Math.floor(Math.abs(percent))}%`;

  if (percent < -30) {
    color = 'red';
  } else if (percent > 30) {
    color = 'green';
  }

  let cls = classnames(
    'TestStatus',
    {'TestStatus_color-green': color === 'green'},
    {'TestStatus_color-red': color === 'red'}
  );

  let right = <LoadingSpinner />;
  if (err) {
    right = <div className="TestStatus_latency">error</div>;
    cls = 'TestStatus';
  } else if (result != null) {
    right = (
      <div className="TestStatus_latency">
        {formatted}
        <span className="TestStatus_spd">{percent > 0 ? ' faster' : ' slower'}</span>
        <span className="TestStatus_than">than average</span>
      </div>
    );
  }

  return (
    <div className={cls}>
      <div className="TestStatus_url">{url}</div>
      {right}
    </div>
  );
};

export default TestStatus;
