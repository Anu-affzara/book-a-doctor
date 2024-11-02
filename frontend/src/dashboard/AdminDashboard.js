import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editDoctor, setEditDoctor] = useState(null);

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

    // Fetch appointments data
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        setErrorMessage('Error fetching appointments data');
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []);

  const handleDoctorEdit = async (doctorId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/doctors/${doctorId}`, editDoctor);
      setDoctors(doctors.map(doc => doc._id === doctorId ? response.data : doc));
      setEditDoctor(null);
      setErrorMessage(''); // Clear previous error messages
    } catch (error) {
      setErrorMessage('Error editing doctor');
      console.error('Error editing doctor:', error.response ? error.response.data : error.message); // Detailed logging
    }
  };
  
  const handleDoctorDelete = async (doctorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`);
      setDoctors(doctors.filter(doc => doc._id !== doctorId));
      setErrorMessage(''); // Clear previous error messages
    } catch (error) {
      setErrorMessage('Error deleting doctor');
      console.error('Error deleting doctor:', error.response ? error.response.data : error.message); // Detailed logging
    }
  };
  
  
  

  const handleAppointmentDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter(app => app._id !== appointmentId));
    } catch (error) {
      setErrorMessage('Error deleting appointment');
    }
  };

  const handleDoctorAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctors/addSample', newDoctor);
      setDoctors([...doctors, response.data.newDoctor]);
      setNewDoctor({ name: '', specialty: '' });
      setErrorMessage(''); // Clear previous error messages
    } catch (error) {
      setErrorMessage('Error adding doctor');
      console.error('Error adding doctor:', error.response ? error.response.data : error.message); // Detailed logging
    }
  };
  
  
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAppointments = appointments.length;
  const totalDoctors = doctors.length;

  return (
    <div className="admin-dashboard">
      <header>
        <h1>AdminDashboard</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav>
      </header>
      <main className="dashboard-main">
        <div className="analytics-section">
          <h2>Analytics</h2>
          <p><strong>Total Doctors:</strong> {totalDoctors}</p>
          <p><strong>Total Appointments:</strong> {totalAppointments}</p>
        </div>
        <div className="details-section">
          <h2>Doctors</h2>
          <input
            type="text"
            placeholder="Search doctors"
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredDoctors.length === 0 && <p>No doctors found.</p>}
          <ul>
            {filteredDoctors.map(doctor => (
              <li key={doctor._id}>
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <button onClick={() => setEditDoctor(doctor)}>Edit</button>
                <button onClick={() => handleDoctorDelete(doctor._id)}>Delete</button>
              </li>
            ))}
          </ul>
          {editDoctor && (
            <div className="edit-doctor">
              <h3>Edit Doctor</h3>
              <input
                type="text"
                placeholder="Name"
                value={editDoctor.name}
                onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Specialty"
                value={editDoctor.specialty}
                onChange={(e) => setEditDoctor({ ...editDoctor, specialty: e.target.value })}
              />
              <button onClick={() => handleDoctorEdit(editDoctor._id)}>Save</button>
              <button onClick={() => setEditDoctor(null)}>Cancel</button>
            </div>
          )}
          <div className="add-doctor">
            <h3>Add New Doctor</h3>
            <input
              type="text"
              placeholder="Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Specialty"
              value={newDoctor.specialty}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
            />
            <button onClick={handleDoctorAdd}>Add Doctor</button>
          </div>

          <h2>Appointments</h2>
          {appointments.length === 0 && <p>No appointments found.</p>}
          <ul>
            {appointments.map(appointment => (
              <li key={appointment._id}>
                <p><strong>Doctor:</strong> {appointment.doctorId.name}</p>
                <p><strong>Patient:</strong> {appointment.patientName}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
                <button onClick={() => handleAppointmentDelete(appointment._id)}>Delete</button>
              </li>
            ))}
          </ul>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </main>
      <footer>
        <p>© 2024 Book a Doctor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
