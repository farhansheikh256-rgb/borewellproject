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

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h3 className="text-accent mb-4">Admin Panel</h3>
        <nav>
          <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/admin/enquiries" className={location.pathname === '/admin/enquiries' ? 'active' : ''}>Enquiries</Link>
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
                  <tr key={eq.id}>
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
