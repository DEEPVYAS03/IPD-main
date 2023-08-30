import React from "react";
import "../css/Candidate1.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Candidate1 = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobTitle = queryParams.get("jobTitle");
  return (
    <div className="candidate1">
      <div className="candidate1-top">
        <div className="candidate1-top-left">
          <div className="candidate1-top-heading"> Candidate Portal</div>
          <div className="candidate1-top-subheading">
            Resume Screening Web app
          </div>
        </div>
        <div className="candidate1-top-right">
          <div className="candidate1-logoutbtn">
            <Link to="/candidate">
              <button className="candidate1-button-job">Home</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="candidate1-job" >
        {jobTitle && <div className="candidate1-job-title">{jobTitle}</div>}
      </div>
      <div className="candidate1-upload-resume"><button className="candidate1-button-job">Upload your Resume</button></div>
      <div className="candidate1-results">

        <h1>Results:</h1>
      </div>
    </div>
  );
};

export default Candidate1;
