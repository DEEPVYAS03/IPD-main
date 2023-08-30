import "../css/Candidate.css";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import React, { useState } from "react";
import Candidate1 from "./Candidate1"; 


const Candidate = () => {
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleApply = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
  };
  return (
    <div className="candidate">
      <div className="candidate-top">
        <div className="candidate-top-left">
          <div className="candidate-top-heading"> Candidate Portal
          </div>
          <div className="candidate-top-subheading">
            Resume Screening Web app
          </div>
        </div>
        <div className="candidate-top-right">
          <div className="candidate-logoutbtn">
            <Link to='/'><button className="candidate-button-job">Log Out</button></Link>
          </div>
        </div>
      </div>

      <JobCard isAdmin={false} onApply={handleApply} />

    </div>
  );
};

export default Candidate;
