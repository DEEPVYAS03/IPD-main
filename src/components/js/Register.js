import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import { useState } from 'react'
import { UilEyeSlash, UilEye, UilLock } from '../css/unicons-react';
import '../css/PasswordInput.css';
import { useUserAuth } from "../context/UserAuthContext";


function Register() {
    const [selectedOption, setSelectedOption] = useState('reg-Candidate'); // Default option

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const { signUp } = useUserAuth();
     let navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [inputValid, setInputValid] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [error,setError] =useState("")

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    const handleInputChange = (e) => {
        setInputValid(e.target.checkValidity());
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }

    // const setRole = () => {
    //   switch (selectedRole) {
    //     case "login-Admin":
    //       // Code for Admin role
    //       break;
    //     case "login-Candidate":
    //       // Code for Candidate role
    //       break;
    //     case "login-Mock_Candidate":
    //       // Code for Mock Candidate role
    //       break;
    //     default:
    //       // Default case
    //   }
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
          await signUp(email, password);
          navigate("/");
        } catch (err) {
          setError(err.message);
          alert(err.message)
        }
      };


    return (
        <div className="body-login">


            <div className='container reg-container'>
                <div className="form signup">


                    <form action="#" onSubmit={handleSubmit}>
                        <span className="title">Registration</span>
                        
                        <div className="input-field">
                            <input type="text" placeholder="Enter your name" required onChange={(e) => {
                                setName(e.target.value)
                            }} />
                            <i className="uil uil-user"></i>
                        </div>
                        <div className="input-field">
                            <input type="text" placeholder="Enter your email" required onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                            <i className="uil uil-envelope icon"></i>
                        </div>

                        <div className={`input-field ${inputFocused ? 'focused' : ''}`}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="password"
                                placeholder="Enter your password"
                                required
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                onChange={handleInputChange}

                            />
                            <i className={`icon ${inputFocused || inputValid ? 'focused' : ''}`}>
                                <UilLock />
                            </i>
                            <i
                                className={`showHidePw ${inputFocused || inputValid ? 'focused' : ''}`}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <UilEyeSlash /> : <UilEye />}
                            </i>
                        </div>

                        <div className="checkbox-text">
                            <div className="checkbox-content">
                                <input type="checkbox" id="termCon" />
                                <label htmlFor="termCon" className="text">I accepted all terms and conditions</label>
                            </div>
                        </div>

                        <div className="input-field button">
                            <input type="submit" value="Signup" />
                        </div>
                    </form>

                    <div className="login-signup">
                        <span className="text">Already a member?
                            <Link to="/" className="text login-link">Login Now</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
