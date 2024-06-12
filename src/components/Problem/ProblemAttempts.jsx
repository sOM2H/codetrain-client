import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';
import Spinner from '../helpers/Spinner';

function Attempts({ problemId }) {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { authHeaders } = useAuth();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/problems/${problemId}/attempts`, {
          headers: authHeaders(),
        });
        setTimeout(() => {
          setAttempts(response.data);
          setLoading(false);
        }, 350);
      } catch (error) {
        console.error('Error fetching attempts:', error);
      }
    };

    fetchAttempts();
  }, [problemId, authHeaders]);

  if (loading || !attempts) {
    return <Spinner />;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Attempts for Problem {problemId}</h4>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Language</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.id} onClick={() => navigate(`/attempts/${attempt.id}`)}>
                  <td>{attempt.id}</td>
                  <td>{attempt.language.name}</td>
                  <td>{attempt.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attempts;
