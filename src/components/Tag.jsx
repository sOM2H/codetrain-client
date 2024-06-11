import React from "react";

export const TagColors = {
  'Strings': "primary",
  'Algorithms': "danger",
  'Sorting': "warning",
  'Graphs': 'info',
  'For beginners': 'success'
};

function Tag(props) {
  return (
    <div key={props.id} className={"problem-tag badge badge-pill badge-outline-" + (TagColors[props.name] || 'primary')}>
      {props.name}
    </div>
  );
};

export default Tag;
