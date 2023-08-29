import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../css/login.css';
import { UilEyeSlash, UilEye, UilLock } from '../css/unicons-react';
import '../css/PasswordInput.css';
import {useUserAuth} from '../context/UserAuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {logIn} = useUserAuth();
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  // const handleInputChange = (e) => {
  //   setInputValid(e.target.checkValidity());
  // };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // await logIn(email, password);
      // navigate("/home");

      //admin987@gmail.com
      // 987Admin@

      if(selectedRole=='login-Admin' && email=='admin987@gmail.com' && password=='987Admin@'){
        await logIn(email, password);
        navigate("/admin");
        
      }
      else if( selectedRole=='login-Mock_Candidate' ){
        await logIn(email, password);
        navigate("/mock");
      }
      else if( selectedRole=='login-Candidate'){
        await logIn(email, password);
        navigate("/candidate");
      }

    } catch (err) {
      setError(err.message);
      alert(err.message)
    }
  };



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
  return (
    <div className="body-login">
      <div className="container">
        <div className="form login">
          <form action="" onSubmit={handleSubmit}>
            <span className="title">Login</span>
              <span>
                <select className="login-dropdown" onChange={handleRoleChange} defaultValue="">
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="login-Admin" id="login-Admin">
                    Admin
                  </option>
                  <option value="login-Candidate" id="login-Candidate">
                    Candidate
                  </option>
                  <option value="login-Mock_Candidate" id="login-Mock_Candidate">
                    Mock Candidate
                  </option>
                </select>
              </span>
              


            <div className="input-field">
              <input
                type="text"
                placeholder="Enter your email"
                required
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
                onChange={(e) => setPassword(e.target.value)}
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
                <input type="checkbox" id="logCheck" />
                <label htmlFor="logCheck" className="text">
                  Remember me
                </label>
              </div>

              <a href="#" className="text">
                Forgot password?
              </a>
            </div>

            <div className="input-field button">
              <input type="submit" value='Log In'/>
            </div>
          </form>

          <div className="login-signup">
            <span className="text">
              Not a member?{' '}
              <Link to="/register" className="text signup-link">
                Signup Now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
