import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Mail, Lock, ArrowRight, Shield, Users, Activity, Eye, EyeOff } from 'lucide-react';
import api from '../api';

function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', {
        email: form.email,
        password: form.password
      });
      login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  const fillTestAccount = (email) => {
    setForm({ email, password: 'password123' });
  };

  return (
    <div className="split-page">
      {/* ── Left Panel — Branding ── */}
      <div className="split-left">
        <div className="split-left-bg">
          <div className="split-blob split-blob-1" />
          <div className="split-blob split-blob-2" />
          <div className="split-blob split-blob-3" />
        </div>

        <Link to="/" className="split-logo">
          <Heart fill="white" size={26} />
          BloodConnect
        </Link>

        <div className="split-left-content">
          <div className="split-tag">
            <span className="split-tag-dot" />
            Trusted by 500+ donors
          </div>
          <h1 className="split-headline">
            Welcome back to a<br />
            <span className="split-headline-accent">community that saves lives.</span>
          </h1>
          <p className="split-subheadline">
            Sign in to respond to blood requests, track your donations,
            and continue making a difference in your community.
          </p>

          <div className="split-features">
            <div className="split-feature">
              <div className="split-feature-icon"><Activity size={18} /></div>
              <div>
                <strong>Real-time Requests</strong>
                <span>Get notified about urgent blood needs</span>
              </div>
            </div>
            <div className="split-feature">
              <div className="split-feature-icon"><Users size={18} /></div>
              <div>
                <strong>Smart Matching</strong>
                <span>Compatible donors found instantly</span>
              </div>
            </div>
            <div className="split-feature">
              <div className="split-feature-icon"><Shield size={18} /></div>
              <div>
                <strong>Secure & Private</strong>
                <span>Your data is encrypted and safe</span>
              </div>
            </div>
          </div>

          <div className="split-quote">
            <div className="split-quote-stars">★★★★★</div>
            <p>"BloodConnect helped me find donors within minutes during my father's emergency. Truly a lifesaver."</p>
            <div className="split-quote-author">
              <div className="split-quote-avatar">SM</div>
              <div>
                <strong>Sarah Miller</strong>
                <span>Blood Recipient</span>
              </div>
            </div>
          </div>
        </div>

        <div className="split-left-footer">
          <span>© 2024 BloodConnect</span>
          <span>•</span>
          <span>Saving lives, one drop at a time</span>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="split-right">
        <div className="split-right-top">
          <Link to="/" className="split-back">← Back to home</Link>
        </div>

        <div className="split-form-wrapper">
          <div className="split-form-header">
            <div className="split-mobile-logo">
              <Heart fill="#dc2626" size={24} />
              BloodConnect
            </div>
            <h2>Welcome back 👋</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="split-alert error">
              <div className="split-alert-icon">⚠</div>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="split-form">
            <div className="split-input-group">
              <label>Email address</label>
              <div className="split-input-wrap">
                <Mail className="split-input-icon" size={17} />
                <input
                  type="email"
                  className="split-input"
                  placeholder="you@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="split-input-group">
              <label>Password</label>
              <div className="split-input-wrap">
                <Lock className="split-input-icon" size={17} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="split-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="split-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="split-btn-primary" disabled={loading}>
              {loading ? (
                <><span className="spinner" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>

            <div className="split-divider">
              <span>Quick access</span>
            </div>

            <div className="split-test-accounts">
              <p className="split-test-label">🧪 Test Accounts (click to fill)</p>
              <div className="split-test-grid">
                <button type="button" className="split-test-btn admin"
                  onClick={() => fillTestAccount('admin@gmail.com')}>
                  <span className="split-test-role">Admin</span>
                  <span className="split-test-email">admin@gmail.com</span>
                </button>
                <button type="button" className="split-test-btn donor"
                  onClick={() => fillTestAccount('donor@gmail.com')}>
                  <span className="split-test-role">Donor</span>
                  <span className="split-test-email">donor@gmail.com</span>
                </button>
                <button type="button" className="split-test-btn recipient"
                  onClick={() => fillTestAccount('recipient@gmail.com')}>
                  <span className="split-test-role">Recipient</span>
                  <span className="split-test-email">recipient@gmail.com</span>
                </button>
              </div>
              <p className="split-test-hint">Password for all: <code>password123</code></p>
            </div>

            <p className="split-signup">
              Don't have an account? <Link to="/register">Create one now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;