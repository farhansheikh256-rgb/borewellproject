import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaPhone, FaHistory, FaCheckCircle, FaSearch } from 'react-icons/fa';
import api from '../../utils/api';
import { useAppContext } from '../../context/AppContext';

export default function ChatLeads() {
  const { adminToken, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/chat/leads');
      if (res.data.success) {
        setLeads(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load chat leads.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/chat/leads/${id}/status`, { status: newStatus });
      setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
    } catch (err) {
      alert("Failed to update status");
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
        <h2 className="mb-4">Chat Leads</h2>
        <p className="text-muted mb-4">Manage leads captured by the AI Chatbot</p>

        {error && <div className="toast toast-error">{error}</div>}

        <div className="admin-content" style={{ display: 'flex', gap: '20px' }}>
          {/* Leads List */}
          <div className="glass-card" style={{ flex: 1, padding: '1.5rem', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Chat Leads</h3>
            
            {loading ? (
              <p>Loading leads...</p>
            ) : leads.length === 0 ? (
              <div className="empty-state">No chat leads found.</div>
            ) : (
              <div className="leads-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {leads.map(lead => (
                  <div 
                    key={lead._id} 
                    style={{ 
                      padding: '1rem', 
                      border: '1px solid var(--gray-200)', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedLead?._id === lead._id ? 'var(--blue-50)' : 'white'
                    }}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong>{lead.phoneNumber}</strong>
                      <span className={`status-badge status-${lead.status.toLowerCase().replace(' ', '-')}`}>
                        {lead.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Captured on: {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lead Detail (Chat History) */}
          {selectedLead && (
            <div className="glass-card" style={{ flex: 2, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
                <div>
                  <h2 style={{ margin: 0 }}>Lead Details</h2>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>{selectedLead.phoneNumber}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleStatusChange(selectedLead._id, 'Contacted')}
                    className="btn-accent" 
                    style={{ padding: '0.5rem 1rem' }}
                    disabled={selectedLead.status === 'Contacted'}
                  >
                    Mark Contacted
                  </button>
                  <a 
                    href={`https://wa.me/${selectedLead.phoneNumber.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-outline"
                    style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>

              <h4>Chat History</h4>
              <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                background: '#f8fafc', 
                padding: '1rem', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {selectedLead.chatHistory.map((msg, idx) => (
                  <div key={idx} style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? 'var(--blue-600)' : 'white',
                    color: msg.role === 'user' ? 'white' : 'black',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    maxWidth: '80%',
                    border: msg.role === 'model' ? '1px solid var(--gray-200)' : 'none'
                  }}>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
