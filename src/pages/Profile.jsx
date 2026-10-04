import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Camera, User, Phone } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(false);

  // Jab page load ho toh LocalStorage se user ka data nikal kar form mein dikhaye
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || '',
        phone: storedUser.phone || '',
        profileImage: storedUser.profileImage || ''
      });
    }
  }, []);

  // Tasweer ko Base64 (Text) mein convert karne ka function
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Backend ko naya data bhejne ka function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8080/api/users/update/${user.id}`, formData);
      
      // Update hone ke baad naya data LocalStorage mein save karein
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      
      Swal.fire({ icon: 'success', title: 'Profile Updated!', text: 'Your details have been saved successfully.', confirmButtonColor: '#10b981' });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Update Failed', text: 'Could not update profile. Try again.', confirmButtonColor: '#dc2626' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center py-4 border-0">
              <h3 className="fw-bolder mb-0">My Profile</h3>
              <p className="mb-0 text-white-50 small">Manage your personal information</p>
            </div>
            
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                
                {/* Profile Picture Upload Section */}
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    {formData.profileImage ? (
                      <img src={formData.profileImage} alt="Profile" className="rounded-circle border border-3 border-primary object-fit-cover" style={{ width: '120px', height: '120px' }} />
                    ) : (
                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center border border-3 border-secondary" style={{ width: '120px', height: '120px' }}>
                        <Camera size={40} className="text-muted" />
                      </div>
                    )}
                    <input type="file" id="imageUpload" className="d-none" accept="image/*" onChange={handleImageUpload} />
                    <label htmlFor="imageUpload" className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle p-2 shadow" style={{ cursor: 'pointer' }}>
                      <Camera size={16} />
                    </label>
                  </div>
                </div>

                {/* Name Input */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-secondary">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><User size={20} className="text-muted"/></span>
                    <input type="text" className="form-control border-start-0 bg-light" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                </div>

                {/* Phone Number Input */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-secondary">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><Phone size={20} className="text-muted"/></span>
                    <input type="text" className="form-control border-start-0 bg-light" placeholder="e.g. 0300-1234567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold rounded-pill" disabled={loading}>
                  {loading ? 'Saving Changes...' : 'Save Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;