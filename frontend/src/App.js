import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './dashboard/AdminDashboard';
import DoctorDashboard from './dashboard/DoctorDashboard';
import UserDashboard from './dashboard/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<PrivateRoute element={AdminDashboard} />} />
          <Route path="/doctor-dashboard" element={<PrivateRoute element={DoctorDashboard} />} />
          <Route path="/user-dashboard" element={<PrivateRoute element={UserDashboard} />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
