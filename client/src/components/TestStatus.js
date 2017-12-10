import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner.js';
import './TestStatus.css';

const TestStatus = ({url, result, avg}) => {
  const percent = result / (avg || result);

  return (
    <div className="TestStatus">
      <div className="TestStatus_url">{url}</div>
      {result == null ? <LoadingSpinner /> : <div className="TestStatus_latency">{percent}</div>}
    </div>
  );
};

export default TestStatus;
