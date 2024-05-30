import React, { useState, useEffect } from 'react';
import fileService from './fileService';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles.css';

const ViewFiles = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fileService.getFilesForUser();
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
        setErrorMessage('Error fetching files');
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await fileService.downloadFile(fileId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
      setErrorMessage('Error downloading file');
    }

    
  };

  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (confirmDelete) {
      try {
        await fileService.deleteFile(fileId);
        setFiles(files.filter(file => file.id !== fileId)); 
      } catch (error) {
        console.error('Error deleting file:', error);
        setErrorMessage('Error deleting file');
      }
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


    <div className="view-files-container">
      <h2 className="view-files-heading">View Files</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="file-list">
        {files.map((file) => (
          <div key={file.id} className="file-item">
            <span>{file.filename}</span>

            <button onClick={() => handleDelete(file.id)} className="delete-button">Delete</button>
            <button className="download-button" onClick={() => handleDownload(file.id, file.filename)}>Download</button>
            
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ViewFiles;


