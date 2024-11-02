import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState('');
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '',
    date: '',
    time: '',
    patientName: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch doctors data
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        setErrorMessage('Error fetching doctors data');
      }
    };
    fetchDoctors();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.specialty.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAppointmentChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDoctor = e.target.doctorId.value; // Ensure doctorId is correctly set
      await axios.post('http://localhost:5000/api/appointments', {
        doctorId: selectedDoctor,
        date: appointmentData.date,
        time: appointmentData.time,
        patientName: appointmentData.patientName // Include patient name in the request
      });
      setSuccessMessage('Appointment booked successfully!');
      setAppointmentData({ doctorId: '', date: '', time: '', patientName: '' });
      window.alert('Appointment booked successfully!'); // Show alert on success
    } catch (error) {
      setErrorMessage('Error booking appointment');
      window.alert('Error booking appointment'); // Show alert on error
    }
  };

  return (
    <div className="user-dashboard">
      <header>
        <h1>UserDashboard</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav>
      </header>
      <main className="dashboard-main">
        <div className="details-section">
          <input
            type="text"
            placeholder="Filter by specialty"
            value={filter}
            onChange={handleFilterChange}
          />
          <ul className="doctor-list">
            {filteredDoctors.map((doctor) => (
              <li key={doctor._id} className="doctor-item">
                <div className="doctor-info">
                  <strong>{doctor.name} - {doctor.specialty}</strong>
                  <p>Available: {doctor.availability.join(', ')}</p>
                </div>
                <form onSubmit={handleAppointmentSubmit} className="appointment-form">
                  <input
                    type="hidden"
                    name="doctorId"
                    value={doctor._id}
                    onChange={handleAppointmentChange}
                  />
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Your name"
                    value={appointmentData.patientName}
                    onChange={handleAppointmentChange}
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={appointmentData.date}
                    onChange={handleAppointmentChange}
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    value={appointmentData.time}
                    onChange={handleAppointmentChange}
                    required
                  />
                  <button type="submit">Book Appointment</button>
                </form>
              </li>
            ))}
          </ul>
          {successMessage && <div className="success">{successMessage}</div>}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </main>
      <footer>
        <p>© 2024 Book a Doctor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
