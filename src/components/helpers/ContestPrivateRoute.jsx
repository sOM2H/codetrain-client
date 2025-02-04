import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useParams, useOutletContext} from "react-router-dom";
import axiosInstance from "../../utils/axiosSetup";

const ContestsPrivateRoute = () => {
  const { currentUser } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [contest, setContest] = useState();
  const { contest_id } = useParams();

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const contestResponse = await axiosInstance.get(`/api/v1/contests/${contest_id}`);
        setContest(contestResponse.data.contest);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contest:', error);
        setLoading(false);
      }
    };

    fetchContest();
  }, [contest_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const now = new Date();
  const startTime = new Date(contest.start_time);

  if (now < startTime) {
    return <Navigate to="/contests" replace />;
  }

  return <Outlet context={{ currentUser }} />;
};

export default ContestsPrivateRoute;
