import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('authToken', response.data.token);
      const userRole = response.data.role; // Role is included in the response
      if (userRole === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <header>
        <h1>MediCare Book</h1>
      </header>
      <div className="login-container">
        <div className="login-left">
          <img src="https://static.vecteezy.com/system/resources/previews/039/658/882/non_2x/online-doctor-consultation-medic-or-online-healthcare-service-free-png.png" alt="doctor" />
        </div>
        <div className="login-right">
        <h1>Sign In to your Account</h1>
          <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="/register">Register</a></p>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </div>
      <footer>
        <p>© 2024 Book a Doctor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
