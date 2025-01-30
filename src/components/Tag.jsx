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

function Tag({ id = 0, name = "Default Tag" }) {
  const colorClass = TagColors[id % 8] || "primary";

  return (
    <div 
      key={id} 
      className={"problem-tag badge badge-pill badge-outline-" + colorClass}
    >
      {name}
    </div>
  );
};

export default Tag;
