import React from "react";

function ProblemChar({ index }) {
  const getProblemChar = (idx) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const base = letters.length;
    const letter = letters[idx % base];
    const suffix = Math.floor(idx / base) + 1;
    
    return suffix > 1 ? `${letter}${suffix}` : letter;
  };

  return <span>{getProblemChar(index)}</span>;
}

export default ProblemChar;
