import React from "react";

function Score({ value, maxValue = 100 }) {
  if (value === null || value === undefined) {
    return null;
  }

  if (isNaN(value)) {
    return <span className="score-other">{value}</span>;
  }

  const normalizedValue = Math.min((value / maxValue) * 100, 100);

  let colorClass = "";
  if (normalizedValue === 100) {
    colorClass = "score-green-dark";
  } else if (normalizedValue >= 90) {
    colorClass = "score-green";
  } else if (normalizedValue >= 80) {
    colorClass = "score-lime";
  } else if (normalizedValue >= 70) {
    colorClass = "score-yellow-green";
  } else if (normalizedValue >= 60) {
    colorClass = "score-yellow";
  } else if (normalizedValue >= 50) {
    colorClass = "score-amber";
  } else if (normalizedValue >= 40) {
    colorClass = "score-orange";
  } else if (normalizedValue >= 30) {
    colorClass = "score-deep-orange";
  } else if (normalizedValue >= 20) {
    colorClass = "score-red";
  } else if (normalizedValue >= 10) {
    colorClass = "score-dark-red";
  } else {
    colorClass = "score-maroon";
  }

  return <span className={colorClass}>{value}</span>;
}

export default Score;