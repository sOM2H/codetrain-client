import React from "react";

function Score({ value }) {
  if (value === null || value === undefined) {
    return null;
  }

  let colorClass = "";
  if (value >= 100) {
    colorClass = "score-green";
  } else if (value >= 67 && value < 100) {
    colorClass = "score-yellow";
  } else if (value >= 33 && value < 67) {
    colorClass = "score-orange";
  } else if (value >= 0 && value < 33) {
    colorClass = "score-red";
  }

  return <span className={colorClass}>{value}</span>;
}

export default Score;