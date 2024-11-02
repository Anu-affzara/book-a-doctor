import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/users/login`, credentials);
};

const getAppointments = async (userId) => {
  return await axios.get(`${API_URL}/appointments/user/${userId}`);
};

const createAppointment = async (appointmentData) => {
  return await axios.post(`${API_URL}/appointments/create`, appointmentData);
};

export { registerUser, loginUser, getAppointments, createAppointment };
