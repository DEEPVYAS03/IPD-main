import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Step1.css';

function Step3({ onPrev }) {
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        // Simulate scanning process
        const scanTimeout = setTimeout(() => {
            setScanning(false);
        }, 3000);

        return () => {
            clearTimeout(scanTimeout);
        };
    }, []);

    return (
        <body className='body-step1'>
            <div className="step-container">
                <div className="step-title">Step 3: Scanning</div>
                <div className="scanning-container">
                    {scanning ? (
                        <div className="scanning-progress file">Scanning in progress...</div>
                    ) : (
                        <div className="scanning-complete file">Scanning complete!</div>
                    )}
                </div>
                <Link to="/mock/step2" className="prev-button">
                    Previous
                </Link>
                {!scanning && (
                    <Link to="/result" className="next-button">
                        View Result
                    </Link>
                )}
            </div>
        </body>
    );
}

export default Step3;
