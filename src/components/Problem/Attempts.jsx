import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';
import Spinner from '../helpers/Spinner';
import consumer from '../../utils/cable';

function Attempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [problem, setProblem] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { authHeaders, id } = useAuth();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/problems/${params.id}/attempts`, {
          headers: authHeaders(),
          params: {
            page: currentPage,
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
  }, [params.id, authHeaders, currentPage]);


  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${params.id}`, {
          headers: authHeaders(),
        });
        setTimeout(() => {
          setProblem(response.data.problem);
          if (response.data) {
            setLoading(false);
          }
        }, 350);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [authHeaders, params.id]);

  useEffect(() => {
    const subscription = consumer.subscriptions.create({ channel: 'AttemptsChannel', problem_id: params.id, user_id: id }, {
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
  }, [params.id, id]);

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

  if (loading || !attempts || !problem) {
    return <Spinner />;
  }

  return (
    <div className="row">
      <div className="page-header">
        <h2 className="page-title"> Attempts for { problem.id} Problem </h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
              <a className="text-white" href="/problems">Problems</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a className="text-white" href={"/problems/" + problem.id}>{problem.id}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Attempts
            </li>
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
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt) => (
                  <tr key={attempt.id} onClick={() => navigate(`/problems/${problem.id}/attempts/${attempt.id}`)}>
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
