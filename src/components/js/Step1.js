import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Step1.css'

function Step1({ onNext }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'application/pdf' ||
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      setSelectedFile(file);
      setFileError(null);
    } else {
      setSelectedFile(null);
      setFileError('Please upload a valid PDF or DOCX file.');
    }
  };

  const handleNext = () => {
    if (selectedFile) {
      onNext();
    }
  };

  return (
    <body className='body-step1'>


      <div className="step-container">
        <div className="step-title">Step 1: Upload Your Resume</div>
        <div className="file-input">
          <label htmlFor="resumeFile" className="file-label">
            Choose File
            <input
              type="file"
              id="resumeFile"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
          </label>
          {selectedFile && <div className='file'>Selected File: {selectedFile.name}</div>}
          {fileError && <div className="error">{fileError}</div>}
        </div>
        <Link to="/mock/step2">
          <button className="next-button" onClick={handleNext} disabled={!selectedFile}>
            Next
          </button>
        </Link>
      </div>
    </body>
  );
}

export default Step1;
