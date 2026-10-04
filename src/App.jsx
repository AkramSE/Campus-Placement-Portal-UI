import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

// NAYA IMPORT: Profile page yahan add kiya hai
import Profile from './pages/Profile';
// NAYA IMPORT: Admin Dashboard yahan add kiya hai
import AdminDashboard from './pages/AdminDashboard';

// ==========================================
// ENTERPRISE SECURITY: Global Axios Interceptor
// ==========================================
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* FORGOT PASSWORD ROUTE */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        
        <Route path="/dashboard" element={<Dashboard />} /> 
        
        {/* PROFILE PAGE ROUTE YAHAN ADD KIYA HAI */}
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN DASHBOARD ROUTE YAHAN ADD KIYA HAI */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;