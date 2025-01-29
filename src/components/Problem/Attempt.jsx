import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';
import Spinner from '../helpers/Spinner';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Score from './Score';
import consumer from '../../utils/cable';

function Attempt() {
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { problem_id, attempt_id } = useParams();
  const [problem, setProblem] = useState();
  const navigate = useNavigate();
  const { authHeaders, currentUser } = useAuth();


  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/attempts/${attempt_id}`, {
          headers: authHeaders(),
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
  }, [attempt_id, authHeaders]);


  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${problem_id}`, {
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
  }, [authHeaders, problem_id]);

  useEffect(() => {
    consumer.subscriptions.create({ channel: 'AttemptsChannel', problem_id: problem_id, user_id: currentUser.id }, {
      received(data) {
        console.log('Received data:', data);
        setAttempt(data);
      }
    });
  }, [problem_id, currentUser.id]);

  if (loading || !attempt || !problem) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="page-header">
          <h2 className="page-title"> Attempt {attempt.id} for Problem {problem.id} </h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
                <a className="text-white" href="/problems">Problems</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <a className="text-white" href={"/problems/" + problem.id}>{problem.id}</a>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <a className="text-white" href={"/problems/" + problem.id + "/attempts"}>Attempts</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {attempt.id}
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
