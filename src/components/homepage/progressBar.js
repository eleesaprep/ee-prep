import React, { useEffect, useState } from 'react';

export default function ProgressBar({ percentage }) {
  const [progress, setProgress] = useState(0);
  const [percentile, setPercentile] = useState(0);
  let timer = 1000/percentage;
  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  var timing;

  useEffect(() => {
      timing = setInterval(() => {
        if(percentile < percentage) {
          setPercentile(percentile + 1);
        }
      },timer);
    return () => clearInterval(timing);
  },[percentile]);

  const viewBox = `0 0 250 250`;
  const radius = (250 - 20) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  function percentageColor() {
    if(percentage < 40) {
      return "red";
    }
    else if (percentage >= 40 && percentage < 70) {
      return "yellow";
    }
    else {
      return "green";
    }
  }

  return (
    <svg width={250} height={250} viewBox={viewBox}>
      <circle
        fill="none"
        stroke="#ccc"
        cx={250 / 2}
        cy={250 / 2}
        r={radius}
        strokeWidth={`20px`}
      />
      <circle
        fill="none"
        stroke={percentageColor()}
        cx={250 / 2}
        cy={250 / 2}
        r={radius}
        strokeWidth={`20px`}
        transform={`rotate(-90 125 125)`}
        strokeDasharray={[dash, circumference - dash]}
        strokeLinecap="round"
        style={{ transition: "linear 1s" }}
      />
      <text
        fill="#0f0f47"
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
