import "../css/Admin.css";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import React, { useState } from "react";
import JobDataService from '../../services';

const Admin = () => {
  const [title, setTitle] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const [editJobId, setEditJobId] = useState("");
  const [editJobTitle, setEditJobTitle] = useState("");
  const [editSkills, setEditSkills] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false); // State to track if updating

  const handleSkillsInputChange = (event) => {
    const inputString = event.target.value;
    setSkillsInput(inputString);
    const skillsArray = inputString.split(',').map(skill => skill.trim());
    setEditSkills(skillsArray);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (editJobTitle === "" || skillsInput === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newJob = {
      title: editJobTitle,
      skills: editSkills,
    };

    try {
      await JobDataService.addJobs(newJob);
      setMessage({ error: false, msg: "New Job added successfully!" });
      setEditJobTitle("");
      setSkillsInput("");
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (editJobId === "" || editJobTitle === "" || skillsInput === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const updatedJob = {
      title: editJobTitle,
      skills: editSkills,
    };

    try {
      await JobDataService.updateJob(editJobId, updatedJob);
      setMessage({ error: false, msg: "Updated successfully!" });
      setEditJobId("");
      setEditJobTitle("");
      setSkillsInput("");
      setIsUpdating(false); // Reset updating state
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <div className="admin">
      <div className="admin-top">
        <div className="admin-left">
          <div className="admin-heading">
            Admin Portal
          </div>
          <div className="admin-subheading">
            Resume Screening Web app
          </div>
        </div>
        <div className="admin-right">
          <div className="admin-logoutbtn">
            <Link to='/'><button className="admin-button-job">Log Out</button></Link>
          </div>
        </div>
      </div>
      <form onSubmit={isUpdating ? handleUpdate : handleCreate}>
        <div className="admin-middle">
          <div className="admin-job-heading">
            Post a job
          </div>
          <div className="admin-inputs">
            <input
              type="text"
              placeholder="Enter the Job-title"
              className="admin-input-job"
              value={editJobTitle}
              onChange={(e) => setEditJobTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter the skills required(comma separated)"
              className="admin-input-job"
              value={skillsInput}
              onChange={handleSkillsInputChange}
            />
          </div>
          <span>or</span>
          <div className="admin-file-upload">
            <div>Upload JD:</div>
            <input type="file" />
          </div>
          <div className="admin-create-btn">
            <button className="admin-button-job" type="submit">
              {isUpdating ? "Update" : "Create"}
            </button>
            {isUpdating && (
              <button
                className="admin-button-job"
                type="button"
                onClick={() => {
                  setEditJobId("");
                  setEditJobTitle("");
                  setSkillsInput("");
                  setIsUpdating(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
          <hr />
        </div>
      </form>
      <JobCard isAdmin={true} getJobId={(id, title, skills) => {
        setEditJobId(id);
        setEditJobTitle(title);
        setEditSkills(skills);
        setIsUpdating(true); // Set updating state
      }} />
    </div>
  );
};

export default Admin;
