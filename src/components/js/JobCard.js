import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Adjust the import path
import '../css/Admin.css'
import JobDataService from '../../services'

const JobCard = ({ isAdmin, getJobId }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const data = await JobDataService.getAllJobs();
    console.log(data.docs);
    setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await JobDataService.deleteJob(id);
    getJobs();
  };

  return (
    <div className="admin-bottom">
      <div className="job-top">
        <h1>{isAdmin ? "Jobs Created" : "Available Jobs"}</h1>
        <div className="refresh-button">
          <button className="admin-button-job" onClick={getJobs}>Refresh</button>
        </div>
      </div>

      {jobs.map((doc) => (
        <div className="admin-job" key={doc.id}>
          <div className="admin-job-left">{doc.title}</div>
          <div className="admin-job-right">
            {isAdmin ? (
              <>
                <div className="job-buttons">
                  <button className="admin-button-job">Check details</button>
                </div>
                <div className="job-buttons">
                  <button className="admin-button-job" onClick={() => getJobId(doc.id, doc.title, doc.skills)}>
                    Edit
                  </button>
                </div>
                <div className="job-buttons">
                  <button className="admin-button-job" onClick={() => deleteHandler(doc.id)}>Delete</button>
                </div>
              </>
            ) : (
              <>
                <div className="job-buttons">
                  <button className="admin-button-job">Read JD</button>
                </div>
                <div className="job-buttons">
                  <button className="admin-button-job">Apply</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCard;
