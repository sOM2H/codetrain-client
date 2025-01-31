import React from "react";

function Complexity({ complexity = 0 }) {
  const stars = parseFloat(complexity) || 0;
  const filledStars = Math.floor(stars);
  const remainder = stars - filledStars;

  return (
    <div className="complexity">
      {
        Array.from({ length: filledStars }).map((_, index) => (
          <i key={index} className="fa fa-star"></i>
        ))
      }
      {
        remainder > 0 &&
        <i className="fa fa-star-half-o"></i>
      }
      {
        Array.from({ length: Math.floor(5 - stars) }).map((_, index) => (
          <i key={filledStars + index} className="fa fa-star-o"></i>
        ))
      }
    </div>
  );
};

export default Complexity;
