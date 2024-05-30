import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Link , useNavigate} from 'react-router-dom';


const HomePage = () => {
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        const storedUserid = localStorage.getItem('userid');
        if (storedUserid) {
            setUserid(storedUserid);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        navigate('/login');
    };


    return (

        
        <div>

<div className="navbar">
            <div className="navbar-header">
                <b>Vault</b>
            </div>
                <div >
                <div className="homepage-navbar-container">
                    <ul className="navbar-items">
                       

                        <li><Link to="/landingpage">Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                     
                    
                    </ul>
                   
                    </div>
                   

                </div>
                
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>
      Back
    </button>

            <button className="action-button logout-button" onClick={handleLogout}>Logout</button>

            <h1 className="welcomemessage">Welcome  {username}</h1>
            
       
       {/* <Link to="/">Home</Link><br></br> */}
       <div className="action-button-container">
    
       <Link to="/upload"><button className="action-button">Upload File</button></Link>
       
     
       <Link to="/view"><button className="action-button">View Files</button></Link><br></br>

       </div>
     
            
        </div>
    );
};
export default HomePage;


