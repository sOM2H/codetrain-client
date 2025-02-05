import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import Spinner from '../helpers/Spinner';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Score from './Score';
import consumer from '../../utils/cable';

function Attempt() {
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contest_id, problem_id, attempt_id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/attempts/${attempt_id}`, {
          params: {
            contest_id: contest_id
          },
        });
        setAttempt(response.data.attempt);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attempt:', error);
        setError('Error fetching attempt');
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [attempt_id]);

  useEffect(() => {
    consumer.subscriptions.create({ channel: 'AttemptsChannel', problem_id: problem_id, user_id: currentUser.id }, {
      received(data) {
        console.log('Received data:', data);
        setAttempt(data);
      }
    });
  }, [problem_id, currentUser.id]);

  if (loading || !attempt ) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title"> Attempt {attempt.id} for Problem {problem_id} </h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {contest_id ? (
              <>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests`)}>
                  <a className="text-white pointer">Contests</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${contest_id}`)}>
                  <a className="text-white pointer">{contest_id}</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${contest_id}/problems`)}>
                  <a className="text-white pointer">Problems</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${contest_id}/problems/${problem_id}`)}>
                  <a className="text-white pointer">{problem_id}</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/contests/${contest_id}/problems/${problem_id}/attempts`)}>
                  <a className="text-white pointer">Attempts</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {attempt.id}
                </li>
              </>
            ) : (
              <>
                <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
                  <a className="text-white pointer">Problems</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/problems/${problem_id}`)}>
                  <a className="text-white pointer">{problem_id}</a>
                </li>
                <li className="breadcrumb-item" onClick={() => navigate(`/problems/${problem_id}/attempts`)}>
                  <a className="text-white pointer">Attempts</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {attempt.id}
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
                <tr key={attempt.id}>
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
              </tbody>
            </table>
          </div>
          <div className="attempt-code">
            <h4 className="card-title">Code</h4>
            <div className="form-group">
              <CodeEditor
                value={attempt.code}
                disabled={true}
                language={attempt.language.css_name}
                padding={15}
                style={{
                  minHeight: '300px',
                  backgroundColor: 'rgb(13, 17, 22)',
                  fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
                  fontSize: '14px'
                }}
                className="textarea-code-editor"
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default Attempt;
