import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import api from '../../utils/api';

export default function Dashboard() {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/enquiries');
      setEnquiries(res.data.data || []);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logout();
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const pending = enquiries.filter(e => e.status === 'Pending').length;
  const inProgress = enquiries.filter(e => e.status === 'Under Review').length;
  const completed = enquiries.filter(e => e.status === 'Completed').length;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadStatus('Uploading...');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Send to RAG server on port 3000
      const res = await fetch(`http://${window.location.hostname}:3000/api/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      if (res.ok) {
        setUploadStatus(`Success! Knowledge base updated. (${data.chunks_stored} chunks)`);
      } else {
        setUploadStatus(`Error: ${data.error || 'Failed to upload'}`);
      }
    } catch (error) {
      console.error(error);
      setUploadStatus('Error: Could not connect to RAG Server (port 3000).');
    } finally {
      setIsUploading(false);
      // reset file input
      e.target.value = null;
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h3 className="text-accent mb-4">Admin Panel</h3>
        <nav>
          <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/admin/enquiries" className={location.pathname === '/admin/enquiries' ? 'active' : ''}>Enquiries</Link>
          <Link to="/admin/chat-leads" className={location.pathname === '/admin/chat-leads' ? 'active' : ''}>Chat Leads</Link>
          <button onClick={() => { logout(); navigate('/admin'); }}>Logout</button>
        </nav>
      </div>
      
      <div className="admin-main">
        <h2 className="mb-4">Dashboard Overview</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">Total Enquiries</div>
            <div className="stat-value text-accent">{enquiries.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning" style={{ color: '#ffc107' }}>{pending}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Under Review</div>
            <div className="stat-value text-info" style={{ color: '#17a2b8' }}>{inProgress}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success" style={{ color: '#28a745' }}>{completed}</div>
          </div>
        </div>

        <div className="upload-kb-section glass-card" style={{ padding: '20px', marginBottom: '30px', border: '1px solid var(--border)' }}>
          <h3 className="mb-2" style={{ marginTop: 0 }}>Knowledge Base Management</h3>
          <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>Upload the official borewell manual PDF. The chatbot will use this document to answer customer queries.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <label className="btn-primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
              {isUploading ? 'Uploading...' : 'Upload PDF Manual'}
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileUpload} 
                style={{ display: 'none' }} 
                disabled={isUploading}
              />
            </label>
            {uploadStatus && (
              <span className={uploadStatus.startsWith('Error') ? 'text-warning' : 'text-success'} style={{ fontSize: '0.9rem' }}>
                {uploadStatus}
              </span>
            )}
          </div>
        </div>
        
        <h3 className="mb-4">Recent Enquiries</h3>
        <div className="table-container">
          {loading ? <p className="p-4 text-center">Loading...</p> : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 5).map(eq => (
                  <tr key={eq._id || eq.id}>
                    <td>{eq.name}</td>
                    <td>{eq.serviceType}</td>
                    <td>{eq.phone}</td>
                    <td><span className={`status-badge status-${eq.status.split(' ')[0]}`}>{eq.status}</span></td>
                    <td>{new Date(eq.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {enquiries.length === 0 && (
                  <tr><td colSpan="5" className="text-center">No enquiries found</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
