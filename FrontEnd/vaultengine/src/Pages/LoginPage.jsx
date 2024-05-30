import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import './Styles.css';




const Login = ({ setUser }) => {   //#1 no setuser
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); 
  
    const handleLogin = async () => {

      try {
        const response = await axios.post('http://localhost:8081/api/users/login', { email, password });
        if (response.status === 200) {
            const userData = response.data; 
            const { id, username}= userData;
            localStorage.setItem('username', username); 
            localStorage.setItem('userid', id);
           


            navigate('/home');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid email or password');
    }
};

   
    return (
      <div>

<div className="navbar">
            <div className="navbar-header">
                <b>Vault</b>
            </div>
                <div >
                    <ul className="navbar-items">

                        <li><Link to="/landingpage">Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                    
                    </ul>
                </div>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>
      Back
    </button>


         <div className='container'>
          <div className="container-data">
        <h2>Login</h2>
        <input
          type="email"
          className='inputfields'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> <br></br>
        <input
          type="password"
          className='inputfields'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />  <br></br>
        <button className='button1' onClick={handleLogin}>Login</button>
       
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

       
       </div> 
       
       </div>
      </div>
      
    );
  };

 export default Login;