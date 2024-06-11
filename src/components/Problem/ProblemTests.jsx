import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';
import Spinner from '../helpers/Spinner';

const ProblemTests = ({ problemId }) => {
  const [tests, setTests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authHeaders } = useAuth();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${problemId}/tests/first_two`, {
          headers: authHeaders(),
        });
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
        setError('Error fetching tests data');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [authHeaders, problemId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <h4>Test examples</h4>
      <div className="problem-tests">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">input.txt</th>
              <th scope="col">output.txt</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index} className="form-group problem-tests-row">
                <th scope="row">{index + 1}</th>
                <td className="problem-tests-areas">
                  <textarea
                    className="form-control test-textarea"
                    id={"area_input_" + index}
                    spellCheck="false"
                    defaultValue={test.input}
                    disabled
                  ></textarea>
                </td>
                <td className="problem-tests-areas">
                  <textarea
                    className="form-control test-textarea"
                    id={"area_output_" + index}
                    spellCheck="false"
                    defaultValue={test.output}
                    disabled
                  ></textarea>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="problem-note">
        <blockquote className="blockquote text-muted">
          <i className="mdi mdi-information-outline"></i>
          <small> Note </small>
          <p className="mb-0">All inputs are placed in input.txt. All outputs should be placed into output.txt. </p>
          <p className="mb-0">If your language supports STDIN reading and writing to STDOUT, you can use the default function to get data, and return results (e.g. cin and cout function in C++ ).</p>
          <p className="mb-0">Otherwise, you have to read and write from files noticed before.</p>
        </blockquote>
      </div>
    </>
  );
};

export default ProblemTests;
