import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User as UserIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  // Local storage se user ka data nikalna
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    Swal.fire({
      title: 'Ready to Leave?',
      text: 'You will be securely logged out of the portal.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        // Securely data remove karna
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // Login page par wapas bhej dena
        window.location.href = '/login'; 
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm sticky-top">
      <div className="container">
        
        {/* Logo and Brand Name */}
        <Link className="navbar-brand fw-bolder d-flex align-items-center" to="/">
          <GraduationCap className="me-2 text-info" size={28} />
          <span style={{ letterSpacing: '0.5px' }}>Campus Placement Portal</span>
        </Link>
        
        {/* Mobile Toggle Button */}
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            {/* Dashboard link sirf tab dikhega jab user login ho */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-info" to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            {user ? (
              // Agar user LOGIN hai toh yeh dikhao
              <>
                <div className="text-light d-flex align-items-center bg-secondary bg-opacity-25 px-3 py-2 rounded-pill border border-secondary border-opacity-50">
                  <UserIcon size={16} className="me-2 text-info" />
                  <span className="fw-semibold me-2" style={{ fontSize: '0.9rem' }}>{user.name}</span> 
                  <span className="badge bg-primary" style={{ fontSize: '0.75rem' }}>{user.role}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 fw-bold d-flex align-items-center transition-all">
                  <LogOut size={16} className="me-2" /> Logout
                </button>
              </>
            ) : (
              // Agar user LOGIN NAHI hai toh yeh dikhao
              <>
                <Link to="/login" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">Login</Link>
                <Link to="/register" className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;