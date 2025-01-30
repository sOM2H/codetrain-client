import React from "react";

function Complexity({complexity = 1}) {
  const stars = parseInt(complexity) || 1;

  return (
    <div className="complexity">
      {
        Array.from({ length: stars }).map((_, index) => (
          <i key={index} className="fa fa-star"></i>
        ))
      }
      {
        Array.from({ length: 5 - stars }).map((_, index) => (
          <i key={stars + index} className="fa fa-star-o"></i>
        ))
      }
    </div>  
  );
};

export default Complexity;
