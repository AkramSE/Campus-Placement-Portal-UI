import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User as UserIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login'; 
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow-sm sticky-top" style={{ backgroundColor: '#111827', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        
        <Link className="navbar-brand fw-bolder d-flex align-items-center" to="/">
          <GraduationCap className="me-2 text-info" size={28} />
          <span style={{ letterSpacing: '0.5px' }}>Campus Placement Portal</span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold text-info" to="/dashboard">Dashboard</Link>
                </li>
                {/* ADMIN LINK - SIRF ADMIN KO DIKHEGA */}
                {user.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link className="nav-link fw-bold text-danger" to="/admin">Admin Panel</Link>
                  </li>
                )}
              </>
            )}
          </ul>
          
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <>
                {/* MODERN PROFILE SECTION - YEH PURA HISSA CLICKABLE HAI */}
                <Link 
                  to="/profile" 
                  className="text-decoration-none d-flex align-items-center px-3 py-1 rounded-pill" 
                  style={{ background: 'rgba(255, 255, 255, 0.08)', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                >
                  
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt="Profile" 
                      className="rounded-circle me-2 object-fit-cover shadow-sm" 
                      style={{ width: '36px', height: '36px', border: '2px solid #0dcaf0' }} 
                    />
                  ) : (
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-2 text-dark shadow-sm" style={{ width: '36px', height: '36px' }}>
                      <UserIcon size={18} className="fw-bold" />
                    </div>
                  )}

                  <span className="text-white fw-bold me-2" style={{ fontSize: '0.95rem' }}>{user.name}</span> 
                  <span className="badge bg-info text-dark rounded-pill" style={{ fontSize: '0.7rem', padding: '0.35em 0.65em' }}>{user.role}</span>
                </Link>
                
                {/* LOGOUT BUTTON - ORIGINAL DESIGN WAPAS RAKHA HAI */}
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 fw-bold d-flex align-items-center transition-all">
                  <LogOut size={16} className="me-2" /> Logout
                </button>
              </>
            ) : (
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