import React from "react";

function Place({ value }) {
  if (value === null || value === undefined) {
    return null;
  }

  let colorClass = "";
  if (value === 1) {
    colorClass = "place-gold";
  } else if (value === 2) {
    colorClass = "place-silver";
  } else if (value === 3) {
    colorClass = "place-bronze";
  } else {
    colorClass = "place-other";
  }

  return <span className={colorClass}>{value}</span>;
}

export default Place;
