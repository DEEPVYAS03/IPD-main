import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Adjust the import path
import '../css/Admin.css'
import JobDataService from '../../services'

const JobCard = ({ isAdmin, onApply,getJobId }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalOpen(false);
  };

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
        <div className="refresh-button"><button className="admin-button-job" onClick={getJobs}>Refresh</button></div>
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
                <button
                    className="admin-button-job"
                    onClick={() => getJobId(doc.id, doc.title, doc.skills)}
                  >
                    Edit
                  </button>
                </div>
                <div className="job-buttons">
                  <button className="admin-button-job" onClick={(e) => deleteHandler(doc.id)}>Delete</button>
                </div>
              </>
            ) : (
              <>
                <div className="job-buttons">
                  <button className="admin-button-job" onClick={() => openModal(doc)}>Read JD</button>
                </div>
                <div className="job-buttons">
                  <button
                    className="admin-button-job"
                    onClick={() => {
                      onApply(doc.title);
                      window.location.href = `/candidate1?jobTitle=${encodeURIComponent(doc.title)}`;
                    }}
                  >
                    Apply
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      {modalOpen && selectedJob && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h1>{selectedJob.title}</h1>
            <h2>Skills Required:</h2>
            <ul>
              {selectedJob.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

export default JobCard;