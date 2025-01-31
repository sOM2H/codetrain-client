import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import axiosInstance from '../../utils/axiosSetup';
import Spinner from '../helpers/Spinner';
import Score from '../Problem/Score';
import Place from './Place';
import ProblemChar from './ProblemChar';

function ContestResults() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { contest_id } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [problemIds, setProblemIds] = useState([]);
  const [title, setTitle] = useState();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/v1/contests/${contest_id}/results`);
        let data = response.data.contest.results;

        if (data.length > 0) {
          const problemKeys = Object.keys(data[0]).filter(key => key !== 'user_id' && key !== 'full_name' && key !== 'total');
          setProblemIds(problemKeys);
        }

        setResults(data);
        setTitle(response.data.contest.title);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contest results:', error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [contest_id]);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title} Results</h4>
        {loading ? (
          <Spinner />
        ) : results.length === 0 ? (
          <div>No results found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  {problemIds.map((problemId, index) => (
                    <th key={problemId} onClick={() => navigate(`/contests/${contest_id}/problems/${problemId}`)} className='pointer-hover'>
                        <ProblemChar index={index} />
                    </th>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={result.user_id} className={currentUser.id === result.user_id ? "th-h" : ""}>
                    <td><Place value={index + 1} /></td>
                    <td>{result.full_name}</td>
                    {problemIds.map((problemId) => (
                      <td key={problemId} onClick={() => navigate(`/contests/${contest_id}/problems/${problemId}`)} className='pointer-hover'>
                        {result[problemId] !== "" ? <Score value={result[problemId]} maxValue={100} /> : "-"}
                      </td>
                    ))}
                    <td ><Score value={result.total} maxValue={problemIds.length * 100} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestResults;
