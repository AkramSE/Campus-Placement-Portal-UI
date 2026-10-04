import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ShieldCheck, Users, Trash2, Mail, Phone, Shield, Search, MoreVertical } from 'lucide-react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users/all");
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users", error);
            setLoading(false);
            Swal.fire('Error', 'Failed to load users data', 'error');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: 'Action Required',
            text: "Are you absolutely sure you want to ban and remove this user? This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Yes, Ban User'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8080/api/users/delete/${id}`);
                    Swal.fire('Deleted!', 'The user has been successfully removed from the platform.', 'success');
                    fetchUsers();
                } catch (error) {
                    console.error("Error deleting user", error);
                    Swal.fire('Error', 'Failed to delete user', 'error');
                }
            }
        });
    };

    // Ultra-Premium Badge Styles
    const getRoleBadgeStyle = (role) => {
        if (role === 'ADMIN') return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
        if (role === 'COMPANY') return 'bg-success bg-opacity-10 text-success border border-success border-opacity-25';
        return 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25';
    };

    return (
        <div className="container mt-5 mb-5 pb-5">
            {/* ULTRA-PREMIUM HERO SECTION */}
            <div className="row mb-5 justify-content-center">
                <div className="col-md-12">
                    <div 
                        className="p-5 rounded-4 text-center position-relative" 
                        style={{ 
                            background: 'linear-gradient(145deg, #020617 0%, #1e1b4b 100%)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Glowing Background Orbs */}
                        <div style={{
                            position: 'absolute', top: '-20%', left: '10%', width: '300px', height: '300px',
                            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
                            filter: 'blur(40px)', pointerEvents: 'none'
                        }}></div>
                        <div style={{
                            position: 'absolute', bottom: '-20%', right: '10%', width: '300px', height: '300px',
                            background: 'radial-gradient(circle, rgba(225,29,72,0.2) 0%, transparent 70%)',
                            filter: 'blur(40px)', pointerEvents: 'none'
                        }}></div>
                        
                        <ShieldCheck size={72} className="text-danger mb-4 position-relative z-1" style={{ filter: 'drop-shadow(0 0 15px rgba(225,29,72,0.5))' }} />
                        <h1 className="fw-bolder text-white mb-3 position-relative z-1" style={{ letterSpacing: '-1px' }}>
                            System Administration
                        </h1>
                        <p className="fs-5 mb-0 position-relative z-1 mx-auto" style={{ color: '#94a3b8', maxWidth: '600px' }}>
                            Centralized control panel to manage platform users, enforce security protocols, and maintain system integrity.
                        </p>
                    </div>
                </div>
            </div>

            {/* ENTERPRISE DATA TABLE */}
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded-4 overflow-hidden" style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.03)' }}>
                        
                        {/* Clean Minimalist Header */}
                        <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center" style={{ borderBottom: '2px solid #f1f5f9' }}>
                            <div>
                                <h4 className="mb-1 fw-bolder text-dark d-flex align-items-center" style={{ letterSpacing: '-0.5px' }}>
                                    <Users className="me-2 text-primary" size={24} /> Registered Accounts
                                </h4>
                                <small className="text-muted fw-semibold">View and manage all members across the portal.</small>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 fs-6 rounded-pill px-4 py-2 fw-bold shadow-sm">
                                    {users.length} Total Users
                                </span>
                            </div>
                        </div>

                        <div className="card-body p-0 bg-white">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                                    <h5 className="text-muted fw-bold">Syncing Database...</h5>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0 border-white">
                                        
                                        {/* Enterprise SaaS Table Head */}
                                        <thead className="bg-white text-muted" style={{ fontSize: '0.75rem', letterSpacing: '1.2px', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' }}>
                                            <tr>
                                                <th className="px-4 py-4 fw-bolder border-0">User Profile</th>
                                                <th className="px-4 py-4 fw-bolder border-0">Access Role</th>
                                                <th className="px-4 py-4 fw-bolder border-0">Contact Details</th>
                                                <th className="px-4 py-4 fw-bolder border-0 text-end pe-5">Security Action</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            {users.length > 0 ? (
                                            users.map(user => (
                                                <tr key={user.id} style={{ transition: 'all 0.2s ease', cursor: 'default' }}>
                                                    <td className="px-4 py-4 border-light" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                        <div className="d-flex align-items-center">
                                                            {/* Gradient Avatar */}
                                                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" 
                                                                 style={{ 
                                                                     width: '48px', height: '48px', 
                                                                     background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                                                     color: 'white', fontSize: '1.2rem', fontWeight: '800'
                                                                 }}>
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: '1rem' }}>{user.name}</h6>
                                                                <span className="badge bg-light text-secondary border mt-1" style={{ fontSize: '0.7rem' }}>ID: #{user.id}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="px-4 py-4 border-light" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                        <span className={`badge px-3 py-2 rounded-pill fw-bold shadow-sm ${getRoleBadgeStyle(user.role)}`} style={{ letterSpacing: '0.5px' }}>
                                                            <Shield size={14} className="me-1 mb-1"/> {user.role}
                                                        </span>
                                                    </td>
                                                    
                                                    <td className="px-4 py-4 border-light" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                        <div className="d-flex flex-column gap-2">
                                                            <span className="text-dark fw-semibold d-flex align-items-center" style={{ fontSize: '0.9rem' }}>
                                                                <div className="bg-light p-1 rounded-circle me-2"><Mail size={14} className="text-primary"/></div>
                                                                {user.email}
                                                            </span>
                                                            <span className="text-muted d-flex align-items-center" style={{ fontSize: '0.85rem' }}>
                                                                <div className="bg-light p-1 rounded-circle me-2"><Phone size={14} className="text-success"/></div>
                                                                {user.phone || 'Phone unavailable'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="px-4 py-4 border-light text-end pe-4" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                        {user.role === 'ADMIN' ? (
                                                            <span className="badge bg-dark text-white px-4 py-2 rounded-pill shadow-sm" style={{ letterSpacing: '0.5px' }}>
                                                                <ShieldCheck size={14} className="me-1 mb-1" /> Super Admin
                                                            </span>
                                                        ) : (
                                                            <button 
                                                                className="btn btn-outline-danger fw-bold rounded-pill px-4 py-2 transition-all shadow-sm d-inline-flex align-items-center"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                style={{ fontSize: '0.9rem' }}
                                                            >
                                                                <Trash2 size={16} className="me-2" /> Ban User
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-5 border-0">
                                                        <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3" style={{ width: '80px', height: '80px' }}>
                                                            <Users size={32} className="text-muted" />
                                                        </div>
                                                        <h5 className="fw-bold text-dark">No Accounts Found</h5>
                                                        <p className="text-muted">There are currently no registered users in the system.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;