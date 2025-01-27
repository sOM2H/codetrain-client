import React, { useState, useEffect, useRef, useCallback } from 'react';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';
import Spinner from '../helpers/Spinner';

const ProblemTests = ({ problemId }) => {
  const [tests, setTests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authHeaders } = useAuth();
  const rowRefs = useRef([]);

  const syncHeights = useCallback(() => {
    if (rowRefs.current.length > 0) {
      rowRefs.current.forEach((row) => {
        if (row) {
          const textareas = row.querySelectorAll('textarea');
          if (textareas.length === 2) {
            const maxHeight = Math.max(
              textareas[0].scrollHeight,
              textareas[1].scrollHeight
            );
            textareas[0].style.height = `${maxHeight}px`;
            textareas[1].style.height = `${maxHeight}px`;
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${problemId}/tests/first_two`, {
          headers: authHeaders(),
        });
        setTests(response.data.tests);
      } catch (error) {
        console.error('Error fetching tests:', error);
        setError('Error fetching tests data');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [authHeaders, problemId]);

  useEffect(() => {
    syncHeights();

    window.addEventListener('resize', syncHeights);
    return () => window.removeEventListener('resize', syncHeights);
  }, [tests, syncHeights]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      {tests && tests.length > 0 && (
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
                  <tr
                    key={index}
                    ref={(el) => (rowRefs.current[index] = el)}
                    className="form-group problem-tests-row"
                  >
                    <th scope="row">{index + 1}</th>
                    <td className="problem-tests-areas">
                      <textarea
                        className="form-control test-textarea"
                        defaultValue={test.input}
                        spellCheck="false"
                        disabled
                        style={{
                          overflow: 'hidden',
                          resize: 'none',
                          width: '100%',
                        }}
                      ></textarea>
                    </td>
                    <td className="problem-tests-areas">
                      <textarea
                        className="form-control test-textarea"
                        defaultValue={test.output}
                        spellCheck="false"
                        disabled
                        style={{
                          overflow: 'hidden',
                          resize: 'none',
                          width: '100%',
                        }}
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
              <p className="mb-0">
                All inputs are placed in input.txt. All outputs should be put into output.txt.
              </p>
              <p className="mb-0">
                If your language supports STDIN reading and writing to STDOUT, you can use default
                functions to get data, and return results (e.g. cin and cout functions in C++ ).
              </p>
              <p className="mb-0">
                Otherwise, you have to read and write from input.txt and output.txt files.
              </p>
            </blockquote>
          </div>
        </>
      )}
    </>
  );
};

export default ProblemTests;
