import "../css/Candidate.css";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";

const Candidate = () => {
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
      <JobCard isAdmin={false} />
    </div>
  );
};

export default Candidate;
