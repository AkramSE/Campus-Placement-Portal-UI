import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Beautiful Popups ke liye

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });
  
  const navigate = useNavigate(); // Register hone ke baad direct Login page par bhejne ke liye

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", formData);
      
      // Professional SweetAlert2 Popup
      Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'New account has been added successfully.',
        confirmButtonColor: '#0d6efd'
      });
      
      setFormData({ name: '', email: '', password: '', role: 'STUDENT' });
      navigate('/login'); // Success ke baad auto redirect to login
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        confirmButtonColor: '#d33'
      });
    }
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
                <input type="text" name="name" className="form-control form-control-lg" placeholder="Muhammad Akram" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Email address</label>
                <input type="email" name="email" className="form-control form-control-lg" placeholder="akram@example.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Password</label>
                <input type="password" name="password" className="form-control form-control-lg" placeholder="Create a strong password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted">I am a...</label>
                <select name="role" className="form-select form-select-lg" value={formData.role} onChange={handleChange}>
                  <option value="STUDENT">Student (Looking for Jobs/Internships)</option>
                  <option value="COMPANY">Company (Hiring Candidates)</option>
                  {/* ADMIN KA OPTION YAHAN ADD KIYA HAI */}
                  <option value="ADMIN">Admin (System Administrator)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Register Now</button>
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