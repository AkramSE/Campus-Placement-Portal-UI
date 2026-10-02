import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 Campus Placement & Internship Portal
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/internships">Internships & Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary ms-3 px-4 fw-semibold rounded-pill" to="/register">
                Register Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;