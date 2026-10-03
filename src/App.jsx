import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'; // <-- 1. Axios ko import kiya hai
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

// ==========================================
// 2. ENTERPRISE SECURITY: Global Axios Interceptor
// ==========================================
axios.interceptors.request.use(
  (config) => {
    // Local storage se secure token nikalna
    const token = localStorage.getItem('token');
    
    // Agar token majood hai, toh usay har request ke header mein attach kar do
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
        {/* Dashboard ka route theek tarah se add kiya hai */}
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;