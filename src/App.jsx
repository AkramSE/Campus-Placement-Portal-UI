import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login'; 
import Register from './pages/Register'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-5">
              <h1 className="fw-bold text-primary">Welcome to Your Career Journey</h1>
              <p className="text-muted fs-5 mt-3">Find the best Campus Placements and Internships tailored for you.</p>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;