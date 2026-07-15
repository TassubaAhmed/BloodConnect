import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Heart, User, Mail, Phone, Lock, ArrowRight,
  CheckCircle, Shield, Activity, Eye, EyeOff
} from 'lucide-react';
import api from '../api';

function Register() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'donor', phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone
      });
      login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const roles = [
    {
      id: 'donor',
      icon: <Heart size={20} fill="currentColor" />,
      title: 'Donor',
      desc: 'Save lives by donating',
      color: 'red'
    },
    {
      id: 'recipient',
      icon: <Activity size={20} />,
      title: 'Recipient',
      desc: 'Request blood for patients',
      color: 'blue'
    },
    {
      id: 'admin',
      icon: <Shield size={20} />,
      title: 'Admin',
      desc: 'Manage the platform',
      color: 'amber'
    }
  ];

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = passwordStrength();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['#e5e7eb', '#ef4444', '#f59e0b', '#3b82f6', '#16a34a'][strength];

  return (
    <div className="split-page">
      {/* ── Left Panel — Branding ── */}
      <div className="split-left split-left-register">
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
            Join 500+ heroes today
          </div>
          <h1 className="split-headline">
            Start saving lives<br />
            <span className="split-headline-accent">in less than 60 seconds.</span>
          </h1>
          <p className="split-subheadline">
            Create your free account and join a growing community
            of donors, recipients, and healthcare heroes.
          </p>

          <div className="split-benefits">
            <div className="split-benefit">
              <div className="split-benefit-num">01</div>
              <div>
                <strong>Create your profile</strong>
                <span>Add health info, blood group & availability</span>
              </div>
            </div>
            <div className="split-benefit">
              <div className="split-benefit-num">02</div>
              <div>
                <strong>Get matched instantly</strong>
                <span>Smart matching based on compatibility</span>
              </div>
            </div>
            <div className="split-benefit">
              <div className="split-benefit-num">03</div>
              <div>
                <strong>Save lives</strong>
                <span>Respond, donate, and track your impact</span>
              </div>
            </div>
          </div>

          <div className="split-stat-mini">
            <div className="split-stat-item">
              <strong>500+</strong>
              <span>Donors</span>
            </div>
            <div className="split-stat-divider" />
            <div className="split-stat-item">
              <strong>1,200+</strong>
              <span>Lives Saved</span>
            </div>
            <div className="split-stat-divider" />
            <div className="split-stat-item">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>

        <div className="split-left-footer">
          <span>© 2024 BloodConnect</span>
          <span>•</span>
          <span>Every drop counts</span>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="split-right">
        <div className="split-right-top">
          <Link to="/" className="split-back">← Back to home</Link>
          <span className="split-right-top-text">
            Already registered? <Link to="/login">Sign in</Link>
          </span>
        </div>

        <div className="split-form-wrapper wide">
          <div className="split-form-header">
            <div className="split-mobile-logo">
              <Heart fill="#dc2626" size={24} />
              BloodConnect
            </div>
            <h2>Create your account ✨</h2>
            <p>Fill in your details to get started</p>
          </div>

          {error && (
            <div className="split-alert error">
              <div className="split-alert-icon">⚠</div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="split-form">
            {/* Role Selector */}
            <div className="split-input-group">
              <label>I am a...</label>
              <div className="role-picker">
                {roles.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    className={`role-btn role-${r.color} ${form.role === r.id ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, role: r.id })}
                  >
                    <div className="role-btn-icon">{r.icon}</div>
                    <div className="role-btn-content">
                      <strong>{r.title}</strong>
                      <span>{r.desc}</span>
                    </div>
                    {form.role === r.id && (
                      <div className="role-btn-check"><CheckCircle size={16} /></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="split-form-row">
              <div className="split-input-group">
                <label>Full name</label>
                <div className="split-input-wrap">
                  <User className="split-input-icon" size={17} />
                  <input
                    type="text" className="split-input" placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="split-input-group">
                <label>Phone number</label>
                <div className="split-input-wrap">
                  <Phone className="split-input-icon" size={17} />
                  <input
                    type="tel" className="split-input" placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="split-input-group">
              <label>Gmail address</label>
              <div className="split-input-wrap">
                <Mail className="split-input-icon" size={17} />
                <input
                  type="email" className="split-input" placeholder="yourname@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="split-form-row">
              <div className="split-input-group">
                <label>Password</label>
                <div className="split-input-wrap">
                  <Lock className="split-input-icon" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="split-input" placeholder="Min 6 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required minLength={6}
                  />
                  <button type="button" className="split-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className="strength-meter">
                    <div className="strength-bars">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="strength-bar"
                          style={{ background: i <= strength ? strengthColor : '#e5e7eb' }} />
                      ))}
                    </div>
                    <span className="strength-label" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>

              <div className="split-input-group">
                <label>Confirm password</label>
                <div className="split-input-wrap">
                  <Lock className="split-input-icon" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="split-input" placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                {form.confirmPassword && (
                  <div className="match-indicator" style={{
                    color: form.password === form.confirmPassword ? '#16a34a' : '#ef4444'
                  }}>
                    {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords don\'t match'}
                  </div>
                )}
              </div>
            </div>

            <div className="split-terms">
              <CheckCircle size={14} />
              By creating an account, you agree to our{' '}
              <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>
            </div>

            <button type="submit" className="split-btn-primary" disabled={loading}>
              {loading ? (
                <><span className="spinner" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>

            <p className="split-signup">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;