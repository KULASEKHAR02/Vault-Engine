import axios from 'axios';

const API_URL = 'http://localhost:8082/files';

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  

  const userId = localStorage.getItem('userid'); //#2
  return axios.post(`${API_URL}/upload?userId=${userId}`, formData, { //#2 return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
const getFilesForUser = () => {
  const userId = localStorage.getItem('userid');
  return axios.get(`${API_URL}/user/${userId}/files`);
};

const getAllFiles = () => {
  return axios.get(`${API_URL}/list`);
};

const downloadFile = (fileId) => {
  return axios.get(`${API_URL}/download/${fileId}`, {
    responseType: 'blob',
  });
};


const deleteFile = (fileId) => {
  return axios.delete(`${API_URL}/delete/${fileId}`);
};

export default {
  uploadFile,
  getFilesForUser,
  getAllFiles,
  downloadFile,
  deleteFile,
};



