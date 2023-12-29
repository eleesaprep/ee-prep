import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { PropTypes } from 'prop-types';

export default function LinearProgress({ percentage }) {
  const [progress, setProgress] = useState(0);
  const [percentile, setPercentile] = useState(0);
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const timer = 1000 / percentage;

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  useEffect(() => {
    const timing = setInterval(() => {
      if (percentile < percentage) {
        setPercentile(percentile + 1);
      }
    }, timer);
    return () => clearInterval(timing);
  }, [percentile, percentage, timer]);

  const viewBox = '100 100';
  const dash = (progress * 300) / 100;

  function percentageColor() {
    if (percentage < 40) {
      return 'red';
    }
    if (percentage >= 40 && percentage < 70) {
      return 'yellow';
    }

    return 'green';
  }

  return (
    <svg width={500} height={40} viewBox={viewBox}>
      <line
        fill="none"
        stroke="#ccc"
        x1={10}
        y1={10}
        x2={300}
        y2={10}
        strokeWidth="10px"
        strokeLinecap="round"
      />
      <line
        fill="none"
        stroke={percentageColor()}
        x1={10}
        y1={10}
        x2={percentage * 3}
        y2={10}
        strokeWidth="10px"
        // transform={`rotate(-90 125 125)`}
        strokeDasharray={[dash, 300 - dash]}
        strokeLinecap="round"
        style={{ transition: 'linear 1s' }}
      />
      <text
        fill={isDarkMode ? '#fff' : '#0f0f47'}
        fontSize="1.2em"
        x="65%"
        y="15%"
        dy="10px"
        textAnchor="right"
      >
        {`${percentile}%`}
      </text>
    </svg>
  );
}

LinearProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
};
