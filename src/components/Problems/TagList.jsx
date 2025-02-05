import React from 'react';
import Tag from './Tag';

const TagList = ({ tags }) => (
  <div className="problem-tags">
    {tags.map((tag) => (
      <Tag key={tag.id} id={tag.id} name={tag.name} />
    ))}
  </div>
);

export default TagList;
