import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function BookingForm() {
  const { services, submitEnquiry } = useAppContext();
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', serviceType: '', description: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });
    
    const res = await submitEnquiry(formData);
    
    if (res.success) {
      setStatus({ loading: false, success: true, message: res.message });
      setFormData({ name: '', phone: '', email: '', address: '', serviceType: '', description: '' });
    } else {
      setStatus({ loading: false, success: false, message: res.message });
    }
  };

  return (
    <div className="glass-card">
      <h3 className="mb-4">Submit an Enquiry</h3>
      
      {status.message && (
        <div className={`alert ${status.success ? 'alert-success' : 'alert-danger'} mb-4`} style={{ padding: '12px', borderRadius: '8px', background: status.success ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)', color: status.success ? '#28a745' : '#dc3545' }}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Service Type *</label>
          <select 
            name="serviceType" 
            value={formData.serviceType} 
            onChange={handleChange} 
            className="form-control" 
            required
          >
            <option value="">Select a service</option>
            {services.map(s => <option key={s._id || s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label className="form-label">Site Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} className="form-control" rows="3"></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Additional Details</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="4"></textarea>
        </div>

        <button type="submit" className="btn-primary w-100" disabled={status.loading} style={{ width: '100%' }}>
          {status.loading ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  );
}
