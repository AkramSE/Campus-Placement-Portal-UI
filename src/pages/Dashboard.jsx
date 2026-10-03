import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  Briefcase, CalendarDays, Building2, Users, FileText, 
  CheckCircle, XCircle, Trash2, Search, Filter, BarChart3, Trophy 
} from 'lucide-react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [myAppliedJobs, setMyAppliedJobs] = useState([]); 
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  const [jobData, setJobData] = useState({
    title: '',
    companyName: user ? user.name : '',
    description: '',
    jobType: 'Full-Time Job',
    deadline: '',
    status: 'OPEN'
  });

  useEffect(() => {
    if (user) {
      fetchJobs();
      if (user.role === 'COMPANY') {
        fetchCompanyApplications();
      }
      if (user.role === 'STUDENT') {
        fetchStudentApplications();
      }
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/jobs/all");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchCompanyApplications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/applications/all");
      const myApplications = response.data.filter(
        app => app.companyName === user.name || app.company_name === user.name
      );
      setApplications(myApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchStudentApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/applications/student/${user.id}`);
      setMyAppliedJobs(response.data);
    } catch (error) {
      console.error("Error fetching student applications:", error);
    }
  }; 

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const dataToPost = { ...jobData, companyName: user.name, company_name: user.name };
      await axios.post("http://localhost:8080/api/jobs/post", dataToPost);
      Swal.fire({ icon: 'success', title: 'Successfully Published!', confirmButtonColor: '#2563eb' });
      setJobData({ ...jobData, title: '', description: '', deadline: '', jobType: 'Full-Time Job' });
      fetchJobs(); 
    } catch (error) {
      Swal.fire('Error', 'Failed to post.', 'error');
    }
  };

  const handleDeleteJob = async (jobId, jobTitle) => {
    Swal.fire({
      title: 'Delete this Job?',
      text: `Are you sure you want to remove "${jobTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/jobs/delete/${jobId}`);
          Swal.fire('Deleted!', 'The job has been removed.', 'success');
          fetchJobs();
        } catch (error) {
          Swal.fire('Error', 'Could not delete the job.', 'error');
        }
      }
    });
  }; 

  const handleApply = (job) => {
    const actualCompanyName = job.companyName || job.company_name || 'Unknown Company';
    if(actualCompanyName === 'Unknown Company') {
        Swal.fire('Error', 'This is an old job post without a company name.', 'error'); return;
    }
    
    const alreadyApplied = myAppliedJobs.some(app => app.jobId === job.id);
    if (alreadyApplied) {
      Swal.fire('Notice', 'You have already applied for this job!', 'info');
      return;
    }

    Swal.fire({
      title: 'Submit Application?',
      html: `You are applying for <b>${job.title}</b> at <b>${actualCompanyName}</b>.<br/><br/>Paste your Resume/LinkedIn URL below:`,
      input: 'url',
      inputPlaceholder: 'https://linkedin.com/in/yourprofile',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Yes, Apply Now!'
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          const applicationData = {
            studentId: user.id, jobId: job.id, jobTitle: job.title,
            companyName: actualCompanyName, company_name: actualCompanyName,
            studentName: user.name, studentEmail: user.email,
            resumeLink: result.value, status: "PENDING"
          };
          await axios.post("http://localhost:8080/api/applications/apply", applicationData);
          Swal.fire('Applied Successfully!', 'Your profile has been shared.', 'success');
          fetchStudentApplications(); 
        } catch (error) {
          Swal.fire('Error', 'Failed to send application.', 'error');
        }
      }
    });
  }; 

  const handleUpdateStatus = async (id, newStatus) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Mark this application as ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'ACCEPTED' ? '#16a34a' : '#d33',
      confirmButtonText: `Yes, ${newStatus}!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:8080/api/applications/${id}/status?status=${newStatus}`);
          Swal.fire('Updated!', `The candidate has been ${newStatus}.`, 'success');
          fetchCompanyApplications(); 
        } catch (error) {
          Swal.fire('Error', 'Failed to update status.', 'error');
        }
      }
    });
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'ACCEPTED') return 'badge bg-success px-3 py-2 rounded-pill';
    if (status === 'REJECTED') return 'badge bg-danger px-3 py-2 rounded-pill';
    return 'badge bg-warning text-dark px-3 py-2 rounded-pill';
  };

  if (!user) return <Navigate to="/login" />;

  // Real-time Job Filtering logic
  const filteredJobs = jobs.filter(job => {
    const jobTitle = job.title?.toLowerCase() || '';
    const jobCompany = job.companyName?.toLowerCase() || job.company_name?.toLowerCase() || '';
    const matchesSearch = jobTitle.includes(searchTerm.toLowerCase()) || jobCompany.includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || job.jobType === filterType;
    return matchesSearch && matchesType;
  });

  // FIX: Active Postings Count Logic Fixed
  const myPostedJobsCount = jobs.filter(j => j.companyName === user.name || j.company_name === user.name).length;
  const totalAppsCount = applications.length;
  const totalHiredCount = applications.filter(app => app.status === 'ACCEPTED').length;

  return (
    <div className="container mt-5 mb-5 pb-5">
      {/* PAGE HEADER */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-10 text-center bg-white p-5 rounded-4 shadow-sm border">
          <h2 className="fw-bolder display-6 text-dark mb-3">
            {user.role === 'COMPANY' ? '🏢 Corporate HR Dashboard' : '🎓 Student Career Portal'}
          </h2>
          <p className="text-secondary fs-5 mb-0">
            {user.role === 'COMPANY' 
              ? 'Manage your job postings, track applicants, and hire top talent seamlessly.' 
              : 'Discover premium internships and full-time roles tailored for you.'}
          </p>
        </div>
      </div> 
      <div className="row justify-content-center">
        
        {/* COMPANY DASHBOARD SECTION */}
        {user.role === 'COMPANY' && (
          <>
            {/* HR Analytics Widgets - RESTORED TO PREMIUM UI */}
            <div className="col-lg-12 mb-5">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card border-0 rounded-4 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                    <div className="card-body p-4 d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="text-white-50 fw-bold text-uppercase mb-1">Active Postings</h6>
                        <h2 className="display-5 fw-bolder mb-0">{myPostedJobsCount}</h2>
                      </div>
                      <Briefcase size={48} className="opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 rounded-4 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                    <div className="card-body p-4 d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="text-white-50 fw-bold text-uppercase mb-1">Applications Received</h6>
                        <h2 className="display-5 fw-bolder mb-0">{totalAppsCount}</h2>
                      </div>
                      <BarChart3 size={48} className="opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 rounded-4 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>
                    <div className="card-body p-4 d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="text-white-50 fw-bold text-uppercase mb-1">Candidates Hired</h6>
                        <h2 className="display-5 fw-bolder mb-0">{totalHiredCount}</h2>
                      </div>
                      <Trophy size={48} className="opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            {/* ATS TABLE */}
            <div className="col-lg-12 mb-5">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-dark text-white p-4 d-flex justify-content-between align-items-center">
                  <h4 className="mb-0 fw-bold d-flex align-items-center">
                    <Users className="me-2" /> Applicant Tracking System (ATS)
                  </h4>
                </div>
                <div className="card-body p-0 bg-white">
                  {applications.length === 0 ? (
                    <div className="text-center p-5 text-muted">
                      <Users size={40} className="mb-3 opacity-50" />
                      <h5>No applications received yet.</h5>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="px-4 py-3">Candidate Name</th>
                            <th className="px-4 py-3">Applied Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Resume</th>
                            <th className="px-4 py-3 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map((app, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 fw-bold text-dark">
                                {app.studentName} <br/>
                                <small className="text-muted fw-normal">{app.studentEmail}</small>
                              </td>
                              <td className="px-4 py-3 text-primary fw-semibold">{app.jobTitle}</td>
                              <td className="px-4 py-3">
                                <span className={getStatusBadgeClass(app.status)}>
                                  {app.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm fw-bold px-3 rounded-pill">
                                  <FileText size={16} className="me-1" /> View CV
                                </a>
                              </td>
                              <td className="px-4 py-3 text-center">
                                {app.status === 'PENDING' ? (
                                  <div className="d-flex justify-content-center gap-2">
                                    <button onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')} className="btn btn-success btn-sm rounded-pill px-3 fw-bold">
                                      <CheckCircle size={16} className="me-1"/> Accept
                                    </button>
                                    <button onClick={() => handleUpdateStatus(app.id, 'REJECTED')} className="btn btn-danger btn-sm rounded-pill px-3 fw-bold">
                                      <XCircle size={16} className="me-1"/> Reject
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-muted small fw-semibold">Action Taken</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* POST JOB FORM */}
            <div className="col-lg-8 mb-5">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-primary text-white p-3">
                  <h5 className="mb-0 fw-bold"><Briefcase className="me-2" size={20} /> Post New Job</h5>
                </div>
                <div className="card-body p-4 bg-white">
                  <form onSubmit={handlePostJob}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="fw-bold">Job Title</label>
                        <input type="text" className="form-control" value={jobData.title} onChange={(e) => setJobData({...jobData, title: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label className="fw-bold">Type</label>
                        <select className="form-select" value={jobData.jobType} onChange={(e) => setJobData({...jobData, jobType: e.target.value})}>
                          <option>Full-Time Job</option>
                          <option>3 Months Internship</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <label className="fw-bold">Deadline</label>
                        <input type="date" className="form-control" value={jobData.deadline} onChange={(e) => setJobData({...jobData, deadline: e.target.value})} required />
                      </div>
                      <div className="col-md-12">
                        <label className="fw-bold">Description</label>
                        <textarea className="form-control" rows="3" value={jobData.description} onChange={(e) => setJobData({...jobData, description: e.target.value})} required />
                      </div>
                      <div className="col-md-12 mt-3">
                        <button type="submit" className="btn btn-primary w-100 fw-bold rounded-pill">Publish Job</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )} 
        {/* STUDENT DASHBOARD SECTION (My Applications) */}
        {user.role === 'STUDENT' && myAppliedJobs.length > 0 && (
          <div className="col-lg-12 mb-5">
             <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-primary text-white p-4">
                  <h4 className="mb-0 fw-bold d-flex align-items-center">
                    <FileText className="me-2" /> My Applications Status
                  </h4>
                </div>
                <div className="card-body p-0 bg-white">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="px-4 py-3">Job Role</th>
                          <th className="px-4 py-3">Company</th>
                          <th className="px-4 py-3">Applied Link</th>
                          <th className="px-4 py-3 text-center">Current Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myAppliedJobs.map((app, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 fw-bold text-dark">{app.jobTitle}</td>
                            <td className="px-4 py-3 text-secondary fw-semibold">
                              <Building2 size={16} className="me-1"/> {app.companyName || app.company_name}
                            </td>
                            <td className="px-4 py-3">
                              <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                                View Submitted Resume
                              </a>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={getStatusBadgeClass(app.status)}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
             </div>
          </div>
        )} 
        {/* ALL AVAILABLE JOBS LIST - RESTORED TO PREMIUM UI (Third Pic Design) */}
        <div className="col-12 mt-2">
          <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
            <h3 className="fw-bolder mb-0 text-dark">
              {user.role === 'COMPANY' ? 'Your Active Postings' : 'Exclusive Opportunities'}
            </h3>
            <span className="badge bg-primary fs-6 rounded-pill px-3 py-2">{filteredJobs.length} Available</span>
          </div>

          {/* Smart Search & Filter Bar */}
          <div className="row mb-5 bg-white p-3 rounded-4 shadow-sm border mx-0">
            <div className="col-md-7 mb-3 mb-md-0">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0"><Search size={20} className="text-muted"/></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 bg-light fs-6" 
                  placeholder="Search jobs by title or company name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0"><Filter size={20} className="text-muted"/></span>
                <select 
                  className="form-select border-start-0 bg-light fs-6"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Job Types</option>
                  <option value="Full-Time Job">Full-Time Job</option>
                  <option value="3 Months Internship">3 Months Internship</option>
                  <option value="6 Months Internship">6 Months Internship</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="row g-4">
            {filteredJobs.length === 0 ? (
              <div className="col-12 text-center py-5 bg-white rounded-4 border">
                <Search size={50} className="text-muted mb-3" />
                <h4 className="text-secondary fw-bold">No jobs match your search criteria.</h4>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <div className="col-xl-4 col-lg-6" key={index}>
                  <div className="card h-100 border-0 shadow-sm premium-card rounded-4 position-relative">
                    <div className="card-body p-4">
                      
                      {user.role === 'COMPANY' && (job.companyName === user.name || job.company_name === user.name) && (
                         <div className="d-flex justify-content-end mb-2 position-absolute top-0 end-0 mt-3 me-3 z-3">
                            <button 
                              onClick={() => handleDeleteJob(job.id, job.title)} 
                              className="btn btn-sm btn-outline-danger border-0 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                              style={{ width: '35px', height: '35px' }}
                              title="Delete this job"
                            >
                              <Trash2 size={16} />
                            </button>
                         </div>
                      )}

                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-2 fw-bold d-flex align-items-center">
                          <span className="spinner-grow spinner-grow-sm me-2 text-success" role="status" aria-hidden="true" style={{width: '0.5rem', height: '0.5rem'}}></span>
                          Active
                        </span>
                        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold">{job.jobType || 'General'}</span>
                      </div>
                      <h4 className="card-title fw-bolder text-dark mb-1 pe-4">{job.title}</h4>
                      <h6 className="text-primary fw-bold mb-4 d-flex align-items-center">
                        <Building2 size={16} className="me-2" /> {job.companyName || job.company_name || 'Unknown Company'}
                      </h6>
                      <p className="card-text text-secondary mb-4 description-text">{job.description}</p>
                      <div className="d-flex align-items-center text-muted small mb-4 bg-light p-2 rounded">
                        <CalendarDays size={16} className="me-2 text-danger" />
                        <span className="fw-semibold">Deadline: <span className="text-dark">{job.deadline || 'Not Specified'}</span></span>
                      </div>
                    </div>
                    {user.role === 'STUDENT' && (
                      <div className="card-footer bg-white border-top-0 pt-0 pb-4 px-4">
                        <button onClick={() => handleApply(job)} className="btn btn-primary w-100 fw-bold btn-lg rounded-pill shadow-sm apply-btn">
                          Apply Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;