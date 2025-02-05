import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosSetup";
import Spinner from "./helpers/Spinner";
import Complexity from './Complexity';
import ContestTimer from "./Contest/ContestTimer";

function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/v1/contests");
        setContests(response.data.contests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Contests</h4>
        {loading ? (
          <Spinner />
        ) : (
          <div className="table-responsive">
            {contests.length === 0 ? (
              <div>No contests found.</div>
            ) : (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Average Complexity</th>
                    <th>Start/End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.map((contest) => (
                    <tr key={contest.id} onClick={() => navigate(`/contests/${contest.id}`)}>
                      <td>{contest.id}</td>
                      <td>{contest.title}</td>
                      <td><Complexity complexity={contest.average_complexity} /></td>
                      <td><ContestTimer contest={contest} styled={false}/></td>
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

export default Contests;
