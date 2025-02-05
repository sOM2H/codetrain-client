import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';

function OrganizationForm() {
  const navigate = useNavigate();
  const { organization_id } = useParams();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (organization_id) {
      setLoading(true);
      axiosInstance
        .get(`/api/v1/organizations/${organization_id}`)
        .then((response) => {
          const organization = response.data.organization;
          reset({ name: organization.name });
        })
        .catch((error) => {
          console.error('Error fetching organization:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [organization_id, reset]);

  const onSubmit = async (data) => {
    try {
      if (organization_id) {
        await axiosInstance.put(`/api/v1/organizations/${organization_id}`, {
          organization: data,
        });
        navigate(`/organizations/${organization_id}`);
      } else {
        const response = await axiosInstance.post('/api/v1/organizations', {
          organization: data,
        });
        const newId = response.data.organization.id;
        navigate(`/organizations/${newId}`);
      }
    } catch (error) {
      console.error('Error submitting organization:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      try {
        await axiosInstance.delete(`/api/v1/organizations/${organization_id}`);
        navigate('/organizations');
      } catch (error) {
        console.error('Error deleting organization:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          {organization_id ? 'Edit Organization' : 'New Organization'}
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Поле Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className='flex-row-buttons'>
            <button type="submit" className="btn btn-primary mt-3">
                {organization_id ? 'Update' : 'Create'}
            </button>
            {organization_id && (
                <button
                type="button"
                className="btn btn-danger mt-3 ml-3"
                onClick={handleDelete}
                >
                Delete
                </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizationForm;
