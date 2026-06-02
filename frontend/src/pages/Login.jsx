import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isUserLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // If we later implement user login state properly, this would redirect
    if (isUserLoggedIn) navigate('/');
  }, [isUserLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // For now we use the same admin login function just to simulate
    // since the user wanted the username/password as admin/admin.
    const res = await login(username, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)' }}>
      <div className="glass-card" style={{ maxWidth: '400px', width: '100%', marginTop: '80px' }}>
        <h2 className="text-center mb-4">User Login</h2>
        
        {error && <div className="alert alert-danger mb-4" style={{ padding: '10px', background: 'rgba(220,53,69,0.2)', color: '#dc3545', borderRadius: '8px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary w-100" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ padding: '0 10px', color: 'var(--text-light)', fontSize: '0.9rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            type="button" 
            className="btn-outline w-100" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'white', color: '#333', border: '1px solid #ddd' }}
            onClick={() => alert('Google Sign-In will be available once Firebase keys are provided!')}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: '20px' }} />
            Continue with Google
          </button>
          
          <button 
            type="button" 
            className="btn-outline w-100" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#34d399', color: 'white', border: 'none' }}
            onClick={() => alert('Phone Sign-In will be available once Firebase keys are provided!')}
          >
            <span style={{ fontSize: '1.2rem' }}>📱</span>
            Continue with Phone
          </button>
        </div>
      </div>
    </div>
  );
}
