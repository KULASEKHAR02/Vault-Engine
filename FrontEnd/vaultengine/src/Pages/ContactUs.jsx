import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles.css';

const ContactUs = () => {
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
          <h2>Contact Us</h2>
          <h4 >
           Email : customersupport@vault.com<br></br><br></br>
           Phone Number: 987654321
          </h4>
          <p>
            Thank you for choosing Vault. If you have any questions or need further assistance,
            please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
