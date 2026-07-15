import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Save, User, Heart } from 'lucide-react';

function DonorProfile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [userForm, setUserForm] = useState({
    name: '',
    phone: '',
    emergencyContact: { name: '', phone: '', relationship: '' }
  });

  const [donorForm, setDonorForm] = useState({
    bloodGroup: 'O+',
    age: '',
    weight: '',
    department: '',
    smokingStatus: 'non-smoker',
    healthCondition: 'good',
    chronicDiseases: 'None',
    currentMedication: 'None',
    lastDonationDate: '',
    availability: 'available'
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      const userRes = await api.get('/api/auth/profile');
      setUserForm({
        name: userRes.data.name || '',
        phone: userRes.data.phone || '',
        emergencyContact: userRes.data.emergencyContact || { name: '', phone: '', relationship: '' }
      });

      if (user.role === 'donor') {
        try {
          const donorRes = await api.get('/api/donors/profile/me');
          setDonorForm({
            bloodGroup: donorRes.data.bloodGroup || 'O+',
            age: donorRes.data.age || '',
            weight: donorRes.data.weight || '',
            department: donorRes.data.department || '',
            smokingStatus: donorRes.data.smokingStatus || 'non-smoker',
            healthCondition: donorRes.data.healthCondition || 'good',
            chronicDiseases: donorRes.data.chronicDiseases || 'None',
            currentMedication: donorRes.data.currentMedication || 'None',
            lastDonationDate: donorRes.data.lastDonationDate ? donorRes.data.lastDonationDate.split('T')[0] : '',
            availability: donorRes.data.availability || 'available'
          });
        } catch (e) { /* no profile yet */ }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const saveUserProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/api/auth/profile', userForm);
      updateUser({
        ...user,
        name: data.name,
        phone: data.phone,
        emergencyContact: data.emergencyContact,
        token: data.token
      });
      showMessage('success', 'Profile updated successfully');
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to update');
    }
    setSaving(false);
  };

  const saveDonorProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/api/donors/profile', donorForm);
      showMessage('success', 'Donor profile saved successfully');
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to save');
    }
    setSaving(false);
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your personal and health information</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={14} style={{ marginRight: 6, verticalAlign: -2 }} /> Personal Info
        </button>
        {user.role === 'donor' && (
          <button
            className={`tab ${activeTab === 'health' ? 'active' : ''}`}
            onClick={() => setActiveTab('health')}
          >
            <Heart size={14} style={{ marginRight: 6, verticalAlign: -2 }} /> Health & Donor Info
          </button>
        )}
      </div>

      {activeTab === 'profile' && (
        <div className="card">
          <form onSubmit={saveUserProfile}>
            <div className="profile-form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text" className="form-input"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" value={user.email} disabled style={{ opacity: 0.6 }} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel" className="form-input" placeholder="Phone number"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={user.role}
                  disabled
                  style={{ opacity: 0.6, textTransform: 'capitalize' }}
                />
              </div>
            </div>

            <div className="section-divider" />
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Emergency Contact</h3>
            <div className="profile-form-grid">
              <div className="form-group">
                <label className="form-label">Contact Name</label>
                <input
                  type="text" className="form-input" placeholder="Emergency contact name"
                  value={userForm.emergencyContact.name}
                  onChange={(e) => setUserForm({
                    ...userForm,
                    emergencyContact: { ...userForm.emergencyContact, name: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input
                  type="tel" className="form-input" placeholder="Emergency contact phone"
                  value={userForm.emergencyContact.phone}
                  onChange={(e) => setUserForm({
                    ...userForm,
                    emergencyContact: { ...userForm.emergencyContact, phone: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Relationship</label>
                <input
                  type="text" className="form-input" placeholder="e.g. Spouse, Parent, Sibling"
                  value={userForm.emergencyContact.relationship}
                  onChange={(e) => setUserForm({
                    ...userForm,
                    emergencyContact: { ...userForm.emergencyContact, relationship: e.target.value }
                  })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'health' && user.role === 'donor' && (
        <div className="card">
          <form onSubmit={saveDonorProfile}>
            <div className="profile-form-grid">
              <div className="form-group">
                <label className="form-label">Blood Group *</label>
                <select
                  className="form-select"
                  value={donorForm.bloodGroup}
                  onChange={(e) => setDonorForm({ ...donorForm, bloodGroup: e.target.value })}
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input
                  type="number" className="form-input" min="18" max="65"
                  value={donorForm.age}
                  onChange={(e) => setDonorForm({ ...donorForm, age: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Weight (kg) *</label>
                <input
                  type="number" className="form-input" min="45"
                  value={donorForm.weight}
                  onChange={(e) => setDonorForm({ ...donorForm, weight: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text" className="form-input" placeholder="e.g. Engineering, Marketing"
                  value={donorForm.department}
                  onChange={(e) => setDonorForm({ ...donorForm, department: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Smoking Status</label>
                <select
                  className="form-select"
                  value={donorForm.smokingStatus}
                  onChange={(e) => setDonorForm({ ...donorForm, smokingStatus: e.target.value })}
                >
                  <option value="non-smoker">Non-Smoker</option>
                  <option value="smoker">Smoker</option>
                  <option value="former-smoker">Former Smoker</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">General Health</label>
                <select
                  className="form-select"
                  value={donorForm.healthCondition}
                  onChange={(e) => setDonorForm({ ...donorForm, healthCondition: e.target.value })}
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Chronic Diseases</label>
                <input
                  type="text" className="form-input" placeholder="None"
                  value={donorForm.chronicDiseases}
                  onChange={(e) => setDonorForm({ ...donorForm, chronicDiseases: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Current Medication</label>
                <input
                  type="text" className="form-input" placeholder="None"
                  value={donorForm.currentMedication}
                  onChange={(e) => setDonorForm({ ...donorForm, currentMedication: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Donation Date</label>
                <input
                  type="date" className="form-input"
                  value={donorForm.lastDonationDate}
                  onChange={(e) => setDonorForm({ ...donorForm, lastDonationDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Availability Status</label>
                <select
                  className="form-select"
                  value={donorForm.availability}
                  onChange={(e) => setDonorForm({ ...donorForm, availability: e.target.value })}
                >
                  <option value="available">Available</option>
                  <option value="emergency-only">Emergency Only</option>
                  <option value="unavailable">Temporarily Unavailable</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Donor Profile'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DonorProfile;