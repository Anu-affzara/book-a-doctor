import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DoctorDashboard.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch appointments data
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        setErrorMessage('Error fetching appointments data');
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, { status });
      setAppointments(appointments.map(app => 
        app._id === appointmentId ? { ...app, status } : app
      ));
    } catch (error) {
      setErrorMessage('Error updating appointment status');
    }
  };

  const handleReschedule = async (appointmentId) => {
    const newDate = prompt('Enter new date (YYYY-MM-DD):');
    const newTime = prompt('Enter new time (HH:MM):');
    if (!newDate || !newTime) {
      alert('Please enter both new date and new time.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, {
        date: newDate,
        time: newTime,
        status: 'Rescheduled'
      });
      setAppointments(appointments.map(app => 
        app._id === appointmentId ? { ...app, date: newDate, time: newTime, status: 'Rescheduled' } : app
      ));
    } catch (error) {
      setErrorMessage('Error rescheduling appointment');
    }
  };

  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const doctorName = appointment.doctorId.name;
    if (!acc[doctorName]) {
      acc[doctorName] = [];
    }
    acc[doctorName].push(appointment);
    return acc;
  }, {});

  return (
    <div className="doctor-dashboard">
      <header>
        <h1>DoctorDashboard</h1>
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
          {Object.keys(groupedAppointments).length === 0 && <p>No appointments found.</p>}
          {Object.keys(groupedAppointments).map(doctorName => (
            <div key={doctorName} className="doctor-section">
              <h2>{doctorName}</h2>
              <ul>
                {groupedAppointments[doctorName].map(appointment => (
                  <li key={appointment._id}>
                    <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                    <p><strong>Date:</strong> {appointment.date} at {appointment.time}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                    <div className="appointment-buttons">
                      <button onClick={() => handleStatusChange(appointment._id, 'Accepted')}>Accept</button>
                      <button onClick={() => handleStatusChange(appointment._id, 'Declined')}>Decline</button>
                      <button onClick={() => handleReschedule(appointment._id)}>Reschedule</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </main>
      <footer>
        <p>© 2024 Book a Doctor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
