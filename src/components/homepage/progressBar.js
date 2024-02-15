import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { PropTypes } from 'prop-types';

export default function ProgressBar({ percentage }) {
  const [progress, setProgress] = useState(0);
  const [percentile, setPercentile] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState('');
  const mode = localStorage.getItem('darkMode');
  const timer = 1000 / percentage;
  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  useEffect(() => {
    if (mode === 'true') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const timing = setInterval(() => {
      if (percentile < percentage) {
        setPercentile(percentile + 1);
      }
    }, timer);
    return () => clearInterval(timing);
  }, [percentage, percentile, timer]);

  const viewBox = '100 100';
  const radius = (250 - 20) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

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
    <svg width={250} height={250} viewBox={viewBox}>
      <circle
        fill="none"
        stroke="#ccc"
        cx={250 / 2}
        cy={250 / 2}
        r={radius}
        strokeWidth="20px"
      />
      <circle
        fill="none"
        stroke={percentageColor()}
        cx={250 / 2}
        cy={250 / 2}
        r={radius}
        strokeWidth="20px"
        transform="rotate(-90 125 125)"
        strokeDasharray={[dash, circumference - dash]}
        strokeLinecap="round"
        style={{ transition: 'linear 1s' }}
      />
      <text
        fill={isDarkMode ? '#fff' : '#0f0f47'}
        fontSize="40px"
        x="50%"
        y="50%"
        dy="20px"
        textAnchor="middle"
      >
        {`${percentile}%`}
      </text>
    </svg>
  );
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};
