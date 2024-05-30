import React, { useState, useRef } from 'react';
import fileService from './fileService';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); 
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef(null); 

  const navigate = useNavigate();

 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);


    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleDiscard = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setUploadMessage('');
    fileInputRef.current.value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        await fileService.uploadFile(selectedFile);
        setUploadMessage('File uploaded successfully');
        setFilePreview(null); 
        fileInputRef.current.value = null; 
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadMessage('Error uploading file');
      }
    } else {
      setUploadMessage('Please select a file');
    }
  };

  return (
    <>
    <div className="navbar">
            <div className="navbar-header">
                <b>Vault</b>
            </div>
                <div >
                <div className="homepage-navbar-container">
                    <ul className="navbar-items">
                       

                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                        <li><Link to="/contactus">Contact Us</Link></li>
                     
                    
                    </ul>
                   
                    </div>
                   

                </div>
                
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>
      Back
    </button>

    <div className="upload-container">
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          ref={fileInputRef} 
        />
        {filePreview && (
          <div className="file-preview">
            <img src={filePreview} alt="Preview" className="image-preview" />
            <button type="button" className="discard-button" onClick={handleDiscard}>Discard</button>
          </div>
        )}
        <button type="submit" className="upload-button">Upload</button>
      </form>
      <p className={`upload-message ${uploadMessage.includes('successfully') ? 'success' : 'error'}`}>
        {uploadMessage}
      </p>
    </div>
    </>
  );
};

export default UploadFile;



