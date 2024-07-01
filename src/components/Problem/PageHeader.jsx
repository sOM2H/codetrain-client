import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ problem }) => {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <h2 className="page-title"> Problem #{problem.id} </h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
            <a className="text-white" href="/problems">Problems</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {problem.id}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
