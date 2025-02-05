import React from 'react';

function ComplexityInput({ complexity = 0, onChange }) {
  const handleClick = (value) => {
    if (value === complexity) {
      onChange(0);
    } else {
      onChange(value);
    }
  };

  return (
    <div className="complexity">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <i
            key={starValue}
            className={`fa ${starValue <= complexity ? 'fa-star' : 'fa-star-o'}`}
            onClick={() => handleClick(starValue)}
            style={{ cursor: 'pointer', marginRight: '5px' }}
          ></i>
        );
      })}
    </div>
  );
}

export default ComplexityInput;
