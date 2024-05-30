
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Login from './LoginPage';
import './Styles.css';

const Registration = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [message, setMessage] = useState('');


  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.match(emailRegex)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateUsername = (value) => {
    if (value.length < 3) {
      setUsernameError('Username should be at least 3 characters long.');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
      try {
        const response = await axios.post('http://localhost:8081/api/users/register', {
          username,
          email,
          password,
        });
        setMessage(response.data);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('There was an error registering the user!', error);
        if (error.response && error.response.status === 409) {
          setMessage('User already Exists');
        } else {
          setMessage('Registration failed');
        }
      }
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-header">
          <b>Vault</b>
        </div>
        <div>
          <ul className="navbar-items">
            <li><Link to="/landingpage">Home</Link></li>
            <li><Link to="/aboutsus">About Us</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
      Back
    </button>

      <div className='container'>
        <div className='container-data'>  
          <h2>Registration</h2>
          <input
            type="text"
            className='inputfields'
            placeholder="Username"
   
            
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
          /> {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}<br></br>
          <input
            type="email"
            className='inputfields'
            placeholder="Email"
           
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          /> {emailError && <p style={{ color: 'red' }}>{emailError}</p>}<br></br>
          <input
            type="password"
            className='inputfields'
            placeholder="Password"
            
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          /> {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}<br></br>
          <button className='button1' onClick={handleRegister}>Register</button><br></br>
          <p className={`upload-message ${message.includes('successfully') ? 'success' : 'error'}`}>
        {message}
      </p><br></br>
          <p>Already a user? <button className='button2' onClick={switchToLogin}>Login</button></p>
        </div>
      </div>
    </div>
  );
};


const RegistrationPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return ( 
    <div>
      {isLogin ? (
        <Login />
      ) : (
        <Registration switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default RegistrationPage;

