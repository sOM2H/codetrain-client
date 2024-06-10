import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate, useParams  } from 'react-router-dom';
import axiosInstance from '../utils/axiosSetup';
import { useAuth } from '../hooks/AuthProvider';

import Tag from './Tag'
import Complexity from './Complexity';

function Problem() {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { authHeaders } = useAuth();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${params.id}`, {
          headers: authHeaders(),
        });
        setTimeout(() => {
          setProblem(response.data);
          setLoading(false);
        }, 350);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [authHeaders, params.id]);

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
    <>
      <div className="page-header">
        <h2 className="page-title"> Problem #{problem.id} </h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
              <a className="text-white" href="/problems">Problems</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {problem.title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h2>{problem.title}</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3>Tags:</h3>
              {problem?.tags?.map((tag) => (
                <Tag id={tag.id} name={tag.name}/>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4>Memory Limit: 16 megabyte</h4>
              <h4>Time Limit: 1 second</h4>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3>Complexity:</h3>
              <Complexity complexity={problem.complexity}/>
            </div>
          </div>
        </div>
      </div>


      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Description</h2>
        </div>
      </div>
    </>
  );
};

export default Problem;

