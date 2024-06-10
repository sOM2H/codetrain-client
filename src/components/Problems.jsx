import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosSetup';
import { useAuth } from '../hooks/AuthProvider';
import Tag from './Tag'
import Complexity from './Complexity';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { authHeaders } = useAuth();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/problems', {
          headers: authHeaders(),
        });
        setTimeout(() => {
          setProblems(response.data);
          console.log(response.data);
          setLoading(false);
        }, 350);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, [authHeaders]);

  if (loading) {
    return (
      <div className="spiner-wrapper">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#fff"
          radius="10"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Problems</h4>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Complexity</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem.id} onClick={() => navigate("/problems/" + problem.id)}>
                  <td>{problem.title}</td>
                  <td>
                    {problem?.tags?.map((tag) => (
                      <Tag id={tag.id} name={tag.name}/>
                    ))}
                  </td>
                  <td><Complexity complexity={problem.complexity}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Problems;
