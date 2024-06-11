import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';
import Tag, { TagColors } from '../Tag';
import Complexity from '../Complexity';
import Spinner from '../helpers/Spinner';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const { authHeaders } = useAuth();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/v1/problems', {
          headers: authHeaders(),
          params: {
            sort_by: sortBy,
            sort_order: sortOrder,
            tag_ids: selectedTags.join(',')
          }
        });
        setTimeout(() => {
          setProblems(response.data);
          setLoading(false);
        }, 350);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, [sortBy, sortOrder, selectedTags, authHeaders]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/tags', {
          headers: authHeaders()
        });
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, [authHeaders]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleTagChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedTags((prevTags) =>
      prevTags.includes(value)
        ? prevTags.filter((tag) => tag !== value)
        : [...prevTags, value]
    );
  };

  return (
    <div className="row">
      <div className="col-sm-9">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Problems</h4>
    
            { (loading || !problems) 
              ?
                <Spinner />
              :
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Tags</th>
                      <th>Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problems.map((problem) => (
                      <tr key={problem.id} onClick={() => navigate("/problems/" + problem.id)}>
                        <td>{problem.id}</td>
                        <td>{problem.title}</td>
                        <td>
                          {problem?.tags?.map((tag) => (
                            <Tag key={tag.id} id={tag.id} name={tag.name} />
                          ))}
                        </td>
                        <td><Complexity complexity={problem.complexity} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Filters</h4>
            <label>Sort by:</label>
            <div className="filters">
              <select value={sortBy} onChange={handleSortChange}>
                <option value="">None</option>
                <option value="id">ID</option>
                <option value="complexity">Complexity</option>
              </select>
              <select value={sortOrder} onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <label>Filter by tags:</label>
              <div className='form-group'>
                {tags.map((tag) => (
                  <div key={tag.id} className={"form-check-" + TagColors[tag.name]}>
                    <Tag key={tag.id} id={tag.id} name={tag.name} />
                    <label className="form-check-label"/>
                    <input
                      className="filter-tags form-check-input"
                      type="checkbox" 
                      value={tag.id}
                      checked={selectedTags.includes(tag.id)}
                      onChange={handleTagChange}
                    /> 
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
}

export default Problems;
