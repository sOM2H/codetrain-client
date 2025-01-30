import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosSetup';
import Spinner from './helpers/Spinner';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/v1/organizations');
        setOrganizations(response.data.organizations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Organizations</h4>
        {loading ? (
          <Spinner />
        ) : (
          <div className="table-responsive">
            {organizations.length === 0 ? (
              <div>No organizations found.</div>
            ) : (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((org) => (
                    <tr key={org.id} onClick={() => navigate(`/organizations/${org.id}`)}>
                      <td>{org.id}</td>
                      <td>{org.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Organizations;
