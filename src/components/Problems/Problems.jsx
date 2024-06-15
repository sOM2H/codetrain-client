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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
            tag_ids: selectedTags.join(','),
            page: currentPage
          }
        });

        setTimeout(() => {
          setProblems(response.data.problems);
          setCurrentPage(response.data.meta.current_page);
          setTotalPages(response.data.meta.total_pages);
          setLoading(false);
        }, 350);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, [sortBy, sortOrder, selectedTags, currentPage, authHeaders]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/tags', {
          headers: authHeaders()
        });
        setTags(response.data.tags);
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
    setCurrentPage(1);
    setSelectedTags((prevTags) =>
      prevTags.includes(value)
        ? prevTags.filter((tag) => tag !== value)
        : [...prevTags, value]
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => {e.preventDefault(); handlePageChange(i);}}>
            {i}
          </a>
        </li>
      );
    }
    return (
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1);}}>
            <i className="mdi mdi-chevron-left"></i>
          </a>
        </li>
        {pages}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1);}}>
            <i className="mdi mdi-chevron-right"></i>
          </a>
        </li>
      </ul>
    );
  };

  return (
    <div className="row">
      <div className="col-sm-9">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Problems</h4>

            {loading || !problems.length ? (
              <Spinner />
            ) : (
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
                          {problem.tags.map((tag) => (
                            <Tag key={tag.id} id={tag.id} name={tag.name} />
                          ))}
                        </td>
                        <td><Complexity complexity={problem.complexity} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="pagination-card">
          {renderPagination()}
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Filters</h4>
            <label>Sort by:</label>
            <div className='filter-sort-by form-group'>
              <select className='form-control form-control-sm' value={sortBy} onChange={handleSortChange}>
                <option value="id">ID</option>
                <option value="complexity">Complexity</option>
              </select>
              <select className='form-control form-control-sm' value={sortOrder} onChange={handleOrderChange}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
            <div>
              <label>Tags:</label>
              <div className='form-group'>
                {tags.map((tag) => (
                  <div key={tag.id} className={"form-check form-check-" + TagColors[tag.name]}>
                    <label className="form-check-label">
                      <input
                        className="filter-tags form-check-input"
                        type="checkbox" 
                        value={tag.id}
                        checked={selectedTags.includes(tag.id)}
                        onChange={handleTagChange}
                      />
                      {tag.name}
                      <i className={"input-helper input-helper-" + TagColors[tag.name]}></i>
                    </label>
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
