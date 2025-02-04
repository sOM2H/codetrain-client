import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import Spinner from '../helpers/Spinner';

function Organization() {
  const { organization_id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [contests, setContests] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        setLoading(true);
        const orgResponse = await axiosInstance.get(`/api/v1/organizations/${organization_id}`);
        setOrganization(orgResponse.data);

        const [teachersResponse, contestsResponse, studentsResponse] = await Promise.all([
          axiosInstance.get(`/api/v1/organizations/${organization_id}/teachers`),
          axiosInstance.get(`/api/v1/organizations/${organization_id}/contests`),
          axiosInstance.get(`/api/v1/organizations/${organization_id}/students`),
        ]);
        setTeachers(teachersResponse.data?.users);
        setContests(contestsResponse.data?.contests);
        setStudents(studentsResponse.data?.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organization details:', error);
        setLoading(false);
      }
    };

    fetchOrganizationData();
  }, [organization_id]);

  if (loading) return <Spinner />;
  if (!organization) return <div>Organization not found.</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{organization.name}</h4>
               
        <h5>Contests</h5>
        <table className="table table-hover">
          <thead>
            <tr><th>ID</th><th>Title</th></tr>
          </thead>
          <tbody>
            {contests.length ? (
              contests.map((contest) => (
                <tr key={contest.id}><td>{contest.id}</td><td>{contest.title}</td></tr>
              ))
            ) : (
              <tr><td colSpan="2">No contests available.</td></tr>
            )}
          </tbody>
        </table>

        <h5>Teachers</h5>
        <table className="table table-hover">
          <thead>
            <tr><th>ID</th><th>Name</th></tr>
          </thead>
          <tbody>
            {teachers.length ? (
              teachers.map((teacher) => (
                <tr key={teacher.id}><td>{teacher.id}</td><td>{teacher.full_name}</td></tr>
              ))
            ) : (
              <tr><td colSpan="2">No teachers found.</td></tr>
            )}
          </tbody>
        </table>
        
        <h5>Students</h5>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Login</th>
            </tr>
          </thead>
          <tbody>
            {students.length ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.full_name}</td>
                  <td>{student.login}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="2">No students found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Organization;