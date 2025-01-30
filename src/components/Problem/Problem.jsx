import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import PageHeader from './PageHeader';
import ProblemTests from './ProblemTests';
import TagList from './TagList';
import ProblemDescription from './ProblemDescription';
import CodeEditorForm from './CodeEditorForm';
import Complexity from '../Complexity';
import Spinner from '../helpers/Spinner';

const Problem = () => {
  const [problem, setProblem] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${params.problem_id}`);
        setTimeout(() => {
          setProblem(response.data.problem);
          if (response.data) {
            setLoading(false);
          }
        }, 100);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [params.problem_id, params.contest_id]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/languages`);
        setTimeout(() => {
          setLanguages(response.data);
          if (response.data) {
            setLoading(false);
          }
        }, 100);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);


  if (loading || !problem) {
    return <Spinner />;
  }

  return (
    <>
      <PageHeader params={params} />
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="problem-title">
                <div>
                  <h1>{problem.title}</h1>
                  <div className="title-com">
                    <small className="text-muted complexity-title">Complexity: </small>
                    <Complexity complexity={problem.complexity} />
                  </div>
                  <TagList tags={problem.tags} />
                </div>
                <div className="title-req">
                  <div className="req-row">
                    <i className="mdi mdi-memory req-icon"></i>
                    <h5 className="req-text">Memory Limit: 16 MB</h5>
                  </div>
                  <div className="req-row">
                    <i className="mdi mdi-timer req-icon"></i>
                    <h4 className="req-text">Time Limit: 1 sec</h4>
                  </div>
                </div>
              </div>
              <ProblemDescription description={problem.description} />
              <ProblemTests params={params} />
            </div>
          </div>
        </div>
        <div className="col">
          {languages && (
            <div className="card">
              <div className="card-body">
                <CodeEditorForm languages={languages} params={params} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Problem;
