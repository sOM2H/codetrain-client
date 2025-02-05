import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ContestTimer({ contest, styled = true }) {
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateTimer = () => {
      if (!contest?.start_time && !contest?.end_time) {
        setTimeLeft("Ongoing indefinitely");
        return;
      }

      const now = new Date();
      const start = contest?.start_time ? new Date(contest.start_time) : null;
      const end = contest?.end_time ? new Date(contest.end_time) : null;

      if (start && now < start) {
        setTimeLeft(`Starts in: ${formatTimeDiff(start - now)}`);
        if (formatTimeDiff(start - now) === "0s") {
          navigate(`/contests/${contest.id}`);
          window.location.reload();
        }
      } else if (end && now < end) {
        setTimeLeft(`Ends in: ${formatTimeDiff(end - now)}`);
      } else if (end) {
        setTimeLeft("Contest is over");
      } else {
        setTimeLeft("Ongoing indefinitely");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [contest, navigate]);

  const formatTimeDiff = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let timeString = "";
    if (days > 0) timeString += `${days}d `;
    if (hours > 0 || days > 0) timeString += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
    timeString += `${seconds}s`;

    return timeString.trim();
  };

  return (
    styled ? (
      <div className="req-row">
        <i className="mdi mdi-timer req-icon"></i>
        <h4 className="req-text">{timeLeft}</h4>
      </div>
    ) : (
      timeLeft
    )
  );
}

export default ContestTimer;
