import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", email, password);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-5">
            <h3 className="text-center fw-bold mb-4">Login to Your Account</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label text-muted">Email address</label>
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted">Password</label>
                <input 
                  type="password" 
                  className="form-control form-control-lg" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
                Login
              </button>
            </form>
            <div className="text-center mt-4">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/register" className="text-decoration-none fw-bold">Register here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;