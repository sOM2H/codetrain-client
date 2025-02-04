import React from 'react';
import DOMPurify from 'dompurify';

const ProblemDescription = ({ description }) => (
  <div className='problem-description' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}></div>
);

export default ProblemDescription;
