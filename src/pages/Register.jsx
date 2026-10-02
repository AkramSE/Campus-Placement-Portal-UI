import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  // Yahan hum ek hi object mein saara data handle kar rahe hain (Smart way)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registration data sending to backend:", formData);
    // Aage chal kar yahan Spring Boot Backend API call hogi
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow-sm border-0">
          <div className="card-body p-5">
            <h3 className="text-center fw-bold mb-4">Create an Account</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label text-muted">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-control form-control-lg" 
                  placeholder="Muhammad Akram"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Email address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control form-control-lg" 
                  placeholder="akram@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="form-control form-control-lg" 
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              {/* Professional Dropdown for Role Selection */}
              <div className="mb-4">
                <label className="form-label text-muted">I am a...</label>
                <select 
                  name="role" 
                  className="form-select form-select-lg" 
                  value={formData.role} 
                  onChange={handleChange}
                >
                  <option value="STUDENT">Student (Looking for Jobs/Internships)</option>
                  <option value="COMPANY">Company (Hiring Candidates)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
                Register Now
              </button>
            </form>
            <div className="text-center mt-4">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="text-decoration-none fw-bold">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;