import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", loginData);
      
      // JWT aur User Data ko alag alag save karna
      localStorage.setItem('token', response.data.token); // Token save kiya
      localStorage.setItem('user', JSON.stringify(response.data.user)); // User ki details save ki
      
      Swal.fire({
        icon: 'success',
        title: 'Authentication Successful',
        text: 'Securely logging you into the enterprise portal.',
        confirmButtonColor: '#2563eb',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.href = '/dashboard'; // Direct dashboard par bhejna
      });
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: error.response?.data || 'Invalid credentials or server error.',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white text-center py-4 border-0">
              <div className="bg-white text-primary rounded-circle d-inline-flex p-3 mb-2 shadow-sm">
                <LogIn size={32} />
              </div>
              <h3 className="fw-bolder mb-0">Secure Portal Login</h3>
              <p className="mb-0 text-white-50 small">Enter your credentials to access the system</p>
            </div>
            
            <div className="card-body p-5 bg-white">
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="form-label fw-bold text-secondary">Work Email</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light border-end-0"><Mail size={20} className="text-muted"/></span>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control border-start-0 bg-light fs-6" 
                      placeholder="e.g. akram@company.com" 
                      value={loginData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="form-label fw-bold text-secondary">Password</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light border-end-0"><Lock size={20} className="text-muted"/></span>
                    <input 
                      type="password" 
                      name="password" 
                      className="form-control border-start-0 bg-light fs-6" 
                      placeholder="••••••••" 
                      value={loginData.password} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 fw-bold rounded-pill shadow-sm"
                  disabled={loading}
                  style={{ transition: 'all 0.3s' }}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : 'Authenticate & Login'}
                </button>
              </form>
              
              <div className="text-center mt-5 pt-3 border-top">
                <span className="text-muted">Not registered in the system? </span>
                <Link to="/register" className="text-primary text-decoration-none fw-bolder">Create an Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;