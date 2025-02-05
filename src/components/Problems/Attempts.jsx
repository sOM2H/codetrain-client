import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext} from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import Spinner from '../helpers/Spinner';
import consumer from '../../utils/cable';
import Score from './Score';

function Attempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useOutletContext();

  let prefix = ''

  if (params.contest_id) {
    prefix = `/contests/${params.contest_id}`
  }

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/problems/${params.problem_id}/attempts`, {
          params: {
            page: currentPage,
            contest_id: params.contest_id
          },
        });
        setAttempts(response.data.attempts);
        setCurrentPage(response.data.meta.current_page);
        setTotalPages(response.data.meta.total_pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attempts:', error);
      }
    };

    fetchAttempts();
  }, [params.problem_id, currentPage, params.contest_id]);


  useEffect(() => {
    const subscription = consumer.subscriptions.create({ channel: 'AttemptsChannel', problem_id: params.problem_id, user_id: currentUser.id }, {
      received(data) {
        console.log('Received data:', data);
        setAttempts((prevAttempts) => {
          const updatedAttempts = prevAttempts.map((attempt) => 
            attempt.id === data.id ? data : attempt
          );
          if (!updatedAttempts.find((attempt) => attempt.id === data.id)) {
            updatedAttempts.push(data);
          }
          return updatedAttempts;
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [params.problem_id, currentUser.id]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }}>
            {i}
          </a>
        </li>
      );
    }

    return (
      totalPages === 0 ? (
        <></>
      ) : (
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}>
              <i className="mdi mdi-chevron-left"></i>
            </a>
          </li>
          {pages}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}>
              <i className="mdi mdi-chevron-right"></i>
            </a>
          </li>
        </ul>
      )
    );
  };

  if (loading || !attempts ) {
    return <Spinner />;
  }

  return (
    <div className="row">
      <div className="page-header">
        <h2 className="page-title"> Attempts for { params.problem_id } Problem </h2>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {params.contest_id ? (
              <>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests`)}>
                  <a className="text-white pointer">Contests</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${params.contest_id}`)}>
                  <a className="text-white pointer">{params.contest_id}</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${params.contest_id}/problems`)}>
                  <a className="text-white pointer">Problems</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${params.contest_id}/problems/${params.problem_id}`)}>
                  <a className="text-white pointer">{params.problem_id}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Attempts
                </li>
              </>
            ) : (
              <>
                <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
                  <a className="text-white pointer">Problems</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/problems/${params.problem_id}`)}>
                  <a className="text-white pointer">{params.problem_id}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Attempts
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Language</th>
                  <th>Result</th>
                  <th>Test</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt) => (
                  <tr key={attempt.id} onClick={() => navigate(`${prefix}/problems/${params.problem_id}/attempts/${attempt.id}`)}>
                    <td>{attempt.id}</td>
                    <td>{attempt.language.name}</td>
                    <td>
                      <div className={"problem-tag badge badge-pill badge-outline-" + (
                        attempt.result === "Passed" ? "success" : (attempt.result === "Running" ? "warning" : "danger")
                        )}>
                        {attempt.result}
                      </div>
                    </td>
                    <td>{(attempt.log && attempt.result !== "Passed") && attempt.log}</td>
                    <td><Score value={attempt.rounded_score} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="pagination-card">
        {renderPagination()}
      </div>
    </div>
  );
}

export default Attempts;
