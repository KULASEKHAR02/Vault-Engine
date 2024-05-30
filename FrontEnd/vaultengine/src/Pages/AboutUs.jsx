import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles.css';

const AboutUs = () => {

    const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <div className="navbar-header">
          <b>Vault</b>
        </div>
        <div>
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
        <div className='container-data'>
          <h2>About Us</h2>
          <p>
            Welcome to Vault, your secure solution for user registration and authentication.
            This project aims to provide a robust and user-friendly platform where users can
            easily register, login, and manage their accounts. With a focus on security and
            performance, Vault ensures that your data is protected while delivering a seamless
            user experience.
          </p>
          <p>
            Our team is dedicated to continuously improving the platform, adding new features,
            and ensuring that all your needs are met. We believe in transparency and 
            are always open to feedback to make Vault even better.
          </p>
          <p>
            Thank you for choosing Vault. If you have any questions or need further assistance,
            please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
