import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner.js';
import './TestStatus.css';
import classnames from 'classnames';

const TestStatus = ({url, result, avg}) => {
  const ratio = 1 - result / (avg || result);

  let color = null;

  const percent = ratio * 100;
  const formatted = `${Math.floor(Math.abs(percent))}%`;

  if (percent < -30) {
    color = 'red';
  } else if (percent > 30) {
    color = 'green';
  }

  const cls = classnames(
    'TestStatus',
    {'TestStatus_color-green': color === 'green'},
    {'TestStatus_color-red': color === 'red'}
  );

  return (
    <div className={cls}>
      <div className="TestStatus_url">{url}</div>
      {result == null ? (
        <LoadingSpinner />
      ) : (
        <div className="TestStatus_latency">
          {formatted}
          <span className="TestStatus_spd">{percent > 0 ? ' faster' : ' slower'}</span>
          <span className="TestStatus_than">than average</span>
        </div>
      )}
    </div>
  );
};

export default TestStatus;
