import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ params }) => {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <h2 className="page-title"> Problem #{params.problem_id} </h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          { params.contest_id ? 
            (
              <>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests`)}>
                  <a className="text-white">Contests</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${params.contest_id}`)}>
                  <a className="text-white">{params.contest_id}</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${params.contest_id}`)}>
                  <a className="text-white">Problems</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {params.problem_id}
                </li>
              </>
            ) : (
              <>
                <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
                  <a className="text-white">Problems</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {params.problem_id}
                </li>
              </>
            )
          }
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
