import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Styles.css';

const LandingPage=() =>{
    return (
        <>
        <div className="navbar">
            <div className="navbar-header">
                <b>Vault</b>
            </div>
                <div >
                    <ul className="navbar-items">

                        <li><Link to="/#">Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                    
                    </ul>
                </div>
            </div>
<div className="landingpage-body-container">
            <div className="img-container">
                <img  className="bg-img" src="img_0001.jpg"></img>
            </div>


            <div className="main-body-header">
                <div className="main-body-header-1">We help to </div>
                <div className="main-body-header-2">Store your Information</div>
                <div className="main-body-header-3">Securely</div>
            </div>

            <div className="register-login-container">
              <Link to="/register"> <button className='register-button'>Register</button> </Link> 
              <Link to="/login"> <button className='login-button'>Login</button> </Link>
            </div>

</div>


        </>
    )
}

export default LandingPage;