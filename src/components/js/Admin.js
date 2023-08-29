import "../css/Admin.css";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import React, { useState, useEffect } from "react";
import JobDataService from '../../services'
import { auth } from "../../firebase";



const Admin = ({ id, setJobId }) => {

  const [title, setTitle] = useState("")
  const [skills, setSkills] = useState([])
  const [skillsInput, setSkillsInput] = useState('')
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSkillsInputChange = (event) => {
    const inputString = event.target.value;
    setSkillsInput(inputString);

    const skillsArray = inputString.split(',').map(skill => skill.trim());
    setSkills(skillsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('')
    if (title === "" || skillsInput === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newJob = {
      title,
      skills,
    };
    console.log(newJob);


    try {
      if (id !== undefined && id !== "") {
        await JobDataService.updateJob(id, newJob);
        setJobId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await JobDataService.addJobs(newJob);
        setMessage({ error: false, msg: "New Job added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setTitle("");
    setSkillsInput("");
  };

  // const editHandler = async () => {
  //   setMessage("");
  //   try {
  //     const docSnap = await JobDataService.getJob(id);
  //     console.log("the record is :", docSnap.data());
  //     setTitle(docSnap.data().title);
  //     setAuthor(docSnap.data().author);
  //     setStatus(docSnap.data().status);
  //   } catch (err) {
  //     setMessage({ error: true, msg: err.message });
  //   }
  // };

  // useEffect(() => {
  //   console.log("The id here is : ", id);
  //   if (id !== undefined && id !== "") {
  //     editHandler();
  //   }
  // }, [id]);

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
      <form onSubmit={handleSubmit}>
        <div className="admin-middle">
          <div className="admin-job-heading">
            Post a job
          </div>
          
          <div className="admin-inputs">

            <input type="text" placeholder="Enter the Job-title" className="admin-input-job" value={title} onChange={(e) => setTitle(e.target.value)} />

            <input type="text" placeholder="Enter the skills required(comma seperated)" className="admin-input-job" value={skillsInput} onChange={handleSkillsInputChange} />

          </div>

          <span>or</span>

          <div className="admin-file-upload">
            <div>Upload JD:</div>
            <input type="file" />
          </div>

          <div className="admin-create-btn"><button className="admin-button-job" type="Submit">Create/Update</button></div>
          <hr />

        </div>
      </form>
      <JobCard isAdmin={true} />

    </div>
  );
};

export default Admin;
