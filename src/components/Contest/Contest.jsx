import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import Tag from '../Tag';
import TagList from '../Problem/TagList';
import ProblemChar from './ProblemChar';
import Complexity from '../Complexity';
import Spinner from '../helpers/Spinner';
import Score from '../Problem/Score';

function Contest() {
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { contest_id } = useParams();

  useEffect(() => {
    const fetchContest = async () => {
      try {
        setLoading(true);
        const contestResponse = await axiosInstance.get(`/api/v1/contests/${contest_id}`);
        setContest(contestResponse.data.contest);

        const problemsResponse = await axiosInstance.get(`/api/v1/contests/${contest_id}/problems`);
        setProblems(problemsResponse.data.problems);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching contest:', error);
        setLoading(false);
      }
    };

    fetchContest();
  }, [contest_id]);

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            {loading ? (
              <Spinner />
            ) : (
              <div>
                <div className="problem-title">
                  <div>
                    <h1>{contest.title}</h1>
                    <div className="title-com">
                      <small className="text-muted complexity-title">Average Complexity: </small>
                      <Complexity complexity={contest.average_complexity} />
                    </div>
                    <TagList tags={contest.tags} />
                  </div>
                  <div className="title-req">
                    <div className="req-row">
                      <i className="mdi mdi-timer req-icon"></i>
                      <h4 className="req-text">Time left: 30:23</h4>
                    </div>
                    <div className="req-row-flex">
                        <button className="btn btn-primary" onClick={() => navigate(`/contests/${contest.id}/results`)}>
                          Results
                        </button> 
                    </div>
                  </div>
                </div> 
                <div className='problem-description'>
                  <p className='problem-description-text'>{contest.description}</p>
                </div>
                {problems.length === 0 ? (
                  <div>No problems found for this contest.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Title</th>
                          <th>Tags</th>
                          <th>Complexity</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {problems.map((problem, index) => (
                          <tr key={problem.id} onClick={() => navigate(`/contests/${contest.id}/problems/${problem.id}`)}>
                            <td><ProblemChar index={index} /></td>
                            <td>{problem.title}</td>
                            <td>
                              {problem.tags.map((tag) => (
                                <Tag key={tag.id} id={tag.id} name={tag.name} />
                              ))}
                            </td>
                            <td><Complexity complexity={problem.complexity} /></td>
                            <td><Score value={problem.max_score} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contest;
