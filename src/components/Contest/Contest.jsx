import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import Tag from '../Tag';
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
            <h4 className="card-title">{loading ? 'Loading contest...' : contest?.title}</h4>
            {loading ? (
              <Spinner />
            ) : (
              <div>
                <h5>Description:</h5>
                <p>{contest?.description}</p>
                <h5>Problems:</h5>
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
                        {problems.map((problem) => (
                          <tr key={problem.id} onClick={() => navigate(`/contests/${contest.id}/problems/${problem.id}`)}>
                            <td>{problem.id}</td>
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
