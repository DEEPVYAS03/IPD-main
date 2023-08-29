import React, { useState } from 'react';
import '../css/Step1.css';
import { Link } from 'react-router-dom';

function Step2({ onPrev, onNext }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain')) {
            setSelectedFile(file);
            setFileError(null);
        } else {
            setSelectedFile(null);
            setFileError('Please upload a valid PDF, DOCX, or TXT file.');
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
                <div className="step-title">Step 2: Upload Job Description</div>
                <div className="file-input">
                    <label htmlFor="jobDescriptionFile" className="file-label">
                        Choose File
                        <input
                            type="file"
                            id="jobDescriptionFile"
                            accept=".pdf,.docx,.txt"
                            onChange={handleFileChange}
                        />
                    </label>
                    {selectedFile && <div className='file'>Selected File: {selectedFile.name}</div>}
                    {fileError && <div className="error">{fileError}</div>}
                </div>
                <Link to="/mock/step1">
                    <button className="prev-button" onClick={onPrev}>
                        Previous
                    </button>
                </Link >
                <Link to="/mock/step3">
                    <button className="next-button" onClick={handleNext} disabled={!selectedFile}>
                        Next
                    </button>
                </Link>
            </div>
        </body>
    );
}

export default Step2;
