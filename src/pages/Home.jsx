import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Building2, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section className="hero-section text-center text-white py-5 position-relative" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '120px 0' }}>
        <div className="container position-relative z-1">
          
          <span className="badge bg-white text-primary mb-4 px-4 py-2 rounded-pill fw-bolder shadow-sm" style={{ letterSpacing: '1px' }}>
            🚀 THE #1 CAMPUS PLACEMENT PLATFORM
          </span>
          
          <h1 
            className="display-3 fw-bolder mb-4" 
            style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.4)', lineHeight: '1.2' }}
          >
            Launch Your Career with <br/><span className="text-info">Top Companies</span>
          </h1>
          
          {/* THE CLEAN ENTERPRISE FIX: No box, just sleek and elegant text */}
          <p 
            className="lead mb-5 px-md-5 mx-auto" 
            style={{ 
              maxWidth: '850px', 
              fontSize: '1.25rem',
              lineHeight: '1.8',
              letterSpacing: '0.5px' 
            }}
          >
            {/* Pehla hissa: Blue background ke liye White text */}
            <span style={{ 
              color: 'hsl(60, 40%, 98%)', 
              fontWeight: '400', 
              textShadow: '1px 1px 3px rgba(0,0,0,0.4)' 
            }}>
              Connecting brilliant students with world-class enterprises. 
            </span>
            <br />
            {/* Doosra hissa: White background ke liye Dark Navy text */}
            <span style={{ 
              color: 'hsl(195, 40%, 98%)', 
              fontWeight: '500' 
            }}>
            
            </span>
          </p>

          <div className="d-flex justify-content-center gap-4">
            <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg" style={{ transition: 'all 0.3s' }}>
              <GraduationCap className="me-2" /> I'm a Student
            </Link>
            
            {/* Hire Talent Button */}
            <Link 
              to="/register" 
              className="btn btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg d-flex align-items-center" 
              style={{ 
                backgroundColor: '#0f172a', 
                color: '#ffffff', 
                border: 'none',
                textDecoration: 'none',
                transition: 'all 0.3s ease-in-out' 
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.backgroundColor = '#1e3a8a';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.backgroundColor = '#0f172a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Building2 className="me-2" /> Hire Talent
            </Link>
          </div>
        </div>
        
        {/* Subtle background decoration - Diagonal Cut */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden pointer-events-none z-0">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-100 h-100" style={{ opacity: 1 }}>
              <polygon fill="white" points="0,100 100,20 100,100"/>
           </svg>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section py-5 bg-white border-bottom">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <h2 className="display-5 fw-bolder text-primary">500+</h2>
              <p className="text-muted fw-bold mb-0">Partner Companies</p>
            </div>
            <div className="col-md-3">
              <h2 className="display-5 fw-bolder text-primary">10k+</h2>
              <p className="text-muted fw-bold mb-0">Students Placed</p>
            </div>
            <div className="col-md-3">
              <h2 className="display-5 fw-bolder text-primary">50+</h2>
              <p className="text-muted fw-bold mb-0">Universities</p>
            </div>
            <div className="col-md-3">
              <h2 className="display-5 fw-bolder text-primary">99%</h2>
              <p className="text-muted fw-bold mb-0">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder display-6">How It Works</h2>
            <p className="text-muted fs-5">Seamless experience for both students and recruiters.</p>
          </div>
          
          <div className="row g-5">
            <div className="col-md-4 text-center">
              <div className="bg-white p-4 rounded-circle d-inline-block shadow-sm mb-4">
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <h4 className="fw-bold">1. Create Profile</h4>
              <p className="text-muted">Sign up securely and build a professional profile to stand out.</p>
            </div>
            
            <div className="col-md-4 text-center">
              <div className="bg-white p-4 rounded-circle d-inline-block shadow-sm mb-4">
                <Briefcase size={40} className="text-primary" />
              </div>
              <h4 className="fw-bold">2. Find Opportunities</h4>
              <p className="text-muted">Companies post exclusive jobs. Students browse and apply with one click.</p>
            </div>
            
            <div className="col-md-4 text-center">
              <div className="bg-white p-4 rounded-circle d-inline-block shadow-sm mb-4">
                <TrendingUp size={40} className="text-primary" />
              </div>
              <h4 className="fw-bold">3. Get Hired</h4>
              <p className="text-muted">Track application status in real-time through our ATS and get selected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p className="mb-0 text-white-50">© 2026 Campus Placement Portal. Developed for Enterprise Use.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;