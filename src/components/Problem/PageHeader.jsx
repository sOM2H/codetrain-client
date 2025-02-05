import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const PageHeader = ({ params }) => {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();

  return (
    <div className="page-header">
      <div className="page-title">
        <h4>Problem #{params.problem_id}</h4>
        {
          currentUser.role == "admin" && (
            <button className="btn btn-primary" onClick={() => navigate(`/problems/${params.problem_id}/edit`)}>
              Edit
            </button>
          )
        }
      </div>
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
