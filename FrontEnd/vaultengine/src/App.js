
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import RegistrationPage from './Pages/RegistrationPage'
import Registration from './Pages/RegistrationPage'
import Login from './Pages/LoginPage'

import Homepage from './Pages/HomePage';
import ViewFiles from './Pages/ViewFiles';
import UploadFile from './Pages/UploadFile';
import LandingPage from './Pages/LandingPage';
import AboutUs  from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/home" exact element={<Homepage />} />
        <Route path="/landingpage" exact element={<LandingPage />} />
        <Route path="/aboutus" exact element={<AboutUs />} />
        <Route path="/contactus" exact element={<ContactUs />} />
        
        

        <Route path="/upload" element={<UploadFile />} />
          <Route path="/view" element={<ViewFiles />} />
          {/* <Route path="/" element={<Home />} /> */}
    </Routes>
</Router>
  );
}

export default App;
