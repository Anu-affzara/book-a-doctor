import React, { useState } from 'react';
import { registerUser } from '../services/api';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('User registered successfully!');
      window.location.href = '/login'; // Redirect to login page after successful registration
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="register-page">
      <header>
        <h1>MediCare Book</h1>
      </header>
      <div className="register-container">
        <div className="register-left-side">
          <h1>Sign up to your account</h1>
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="phone" type="tel" placeholder="Phone" onChange={handleChange} required />
            <div>
              <input name="role" type="radio" value="user" onChange={handleChange} checked /> User
              <input name="role" type="radio" value="admin" onChange={handleChange} /> Admin
              <input name="role" type="radio" value="doctor" onChange={handleChange} /> Doctor
            </div>
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <a href="/login">Login</a></p>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
        <div className="register-right-side">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/017/221/914/small_2x/telemedicine-flat-design-png.png" alt="doctor" />
        </div>
      </div>
      <footer>
        <p>© 2024 Book a Doctor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
