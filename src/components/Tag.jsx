import React from "react";

export const TagColors = {
  0: "danger",
  1: "success",
  2: "primary",
  3: "warning",
  4: "info",
  5: "orang1",
  6: "pink1",
  7: "mint1",
};

function Tag(props) {
  const colorClass = TagColors[props.id % 8] || "primary";

  return (
    <div 
      key={props.id} 
      className={"problem-tag badge badge-pill badge-outline-" + colorClass}
    >
      {props.name}
    </div>
  );
};

export default Tag;
