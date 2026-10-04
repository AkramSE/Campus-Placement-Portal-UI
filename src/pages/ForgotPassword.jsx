import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/users/forgot-password", { email });
      Swal.fire({ icon: 'success', title: 'OTP Sent!', text: response.data, confirmButtonColor: '#2563eb' });
      setStep(2); 
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data || 'Account not found.', confirmButtonColor: '#dc2626' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/users/reset-password", { email, otp, newPassword });
      Swal.fire({ icon: 'success', title: 'Password Reset!', text: response.data, confirmButtonColor: '#10b981' })
      .then(() => {
        navigate('/login'); 
      });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Invalid OTP', text: error.response?.data || 'Failed to reset password.', confirmButtonColor: '#dc2626' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white text-center py-4 border-0">
              <h3 className="fw-bolder mb-0">Reset Password</h3>
              <p className="mb-0 text-white-50 small">Securely recover your account access</p>
            </div>
            
            <div className="card-body p-5 bg-white">
              {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                  <div className="mb-4">
                    <label className="form-label fw-bold text-secondary">Registered Email</label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg bg-light fs-6" 
                      placeholder="Enter your email address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold rounded-pill" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Get OTP on Email'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-secondary">Enter 6-Digit OTP</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg bg-light fs-6" 
                      placeholder="e.g. 123456" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value)} 
                      maxLength="6"
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold text-secondary">New Password</label>
                    <input 
                      type="password" 
                      className="form-control form-control-lg bg-light fs-6" 
                      placeholder="Enter new password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-success btn-lg w-100 fw-bold rounded-pill" disabled={loading}>
                    {loading ? 'Verifying...' : 'Update Password'}
                  </button>
                </form>
              )}

              <div className="text-center mt-4">
                <Link to="/login" className="text-muted text-decoration-none fw-semibold">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;