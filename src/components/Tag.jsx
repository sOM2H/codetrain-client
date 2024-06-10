import React from "react";

function Tag(props) {
  const color = {
    'Strings': "primary",
    'Algorithms': "danger",
    'Sorting': "warning",
    'Graphs': 'info',
    'For beginners': 'success'
  }

  return (
    <div key={props.id} className={"problem-tag badge badge-pill badge-outline-" + (color[props.name] || 'primary')}>
      {props.name}
    </div>
  );
};

export default Tag;
