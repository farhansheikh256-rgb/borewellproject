import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import api from '../../utils/api';

export default function AdminEnquiries() {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

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

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/enquiries/${id}`, { status });
      fetchEnquiries();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if(!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      fetchEnquiries();
    } catch (error) {
      console.error('Failed to delete', error);
      alert('Failed to delete');
    }
  };

  const filtered = filter === 'All' ? enquiries : enquiries.filter(e => e.status === filter);

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-4">
          <h2>All Enquiries</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['All', 'Pending', 'Under Review', 'Completed'].map(f => (
              <button 
                key={f}
                className={`btn-outline ${filter === f ? 'active' : ''}`}
                style={{ padding: '8px 16px', ...(filter === f ? { background: 'var(--accent)', color: 'var(--surface)' } : {}) }}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="table-container">
          {loading ? <p className="p-4 text-center">Loading...</p> : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Service & Details</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(eq => (
                  <tr key={eq._id || eq.id}>
                    <td>
                      <strong>{eq.name}</strong><br/>
                      <small className="text-muted">{new Date(eq.createdAt).toLocaleDateString()}</small>
                    </td>
                    <td>
                      <div>{eq.phone}</div>
                      {eq.email && <small className="text-muted">{eq.email}</small>}
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <div className="text-accent">{eq.serviceType}</div>
                      <small className="text-muted" style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {eq.address && `📍 ${eq.address}`}
                        <br/>
                        {eq.description && `💬 ${eq.description}`}
                      </small>
                    </td>
                    <td>
                      <select 
                        value={eq.status} 
                        onChange={(e) => updateStatus(eq._id || eq.id, e.target.value)}
                        className={`status-badge status-${eq.status.split(' ')[0]}`}
                        style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => deleteEnquiry(eq._id || eq.id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '1.2rem' }}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="5" className="text-center p-4">No enquiries found</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
