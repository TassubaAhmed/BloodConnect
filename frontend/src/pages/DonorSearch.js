import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Search, Users } from 'lucide-react';
import BloodGroupBadge from '../components/BloodGroupBadge';
import StatusBadge from '../components/StatusBadge';

function DonorSearch() {
  const { user } = useAuth();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ bloodGroup: '', department: '', availability: '' });

  const api = axios.create({
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  useEffect(() => {
    fetchDonors();
    // eslint-disable-next-line
  }, [filters]);

  const fetchDonors = async () => {
    try {
      const params = {};
      if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
      if (filters.department) params.department = filters.department;
      if (filters.availability) params.availability = filters.availability;
      const { data } = await api.get('/api/donors', { params });
      setDonors(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getInitials = (name) => {
    return name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
  };

  return (
    <div>
      <div className="page-header">
        <h1>Find Donors</h1>
        <p>Search for blood donors by group, department, and availability</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af' }}>
          <Search size={16} />
        </div>
        <select className="filter-select" value={filters.bloodGroup}
          onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}>
          <option value="">All Blood Groups</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <input className="filter-input" placeholder="Search department..."
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })} />
        <select className="filter-select" value={filters.availability}
          onChange={(e) => setFilters({ ...filters, availability: e.target.value })}>
          <option value="">All Availability</option>
          <option value="available">Available</option>
          <option value="emergency-only">Emergency Only</option>
          <option value="unavailable">Unavailable</option>
        </select>
        {(filters.bloodGroup || filters.department || filters.availability) && (
          <button className="btn btn-ghost btn-sm"
            onClick={() => setFilters({ bloodGroup: '', department: '', availability: '' })}>
            Clear
          </button>
        )}
      </div>

      <p className="text-muted mb-4">{donors.length} donor(s) found</p>

      {loading ? (
        <div className="loading">Loading donors...</div>
      ) : donors.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <Users size={48} />
            <h3>No donors found</h3>
            <p>Try adjusting your search filters</p>
          </div>
        </div>
      ) : (
        <div className="content-grid">
          {donors.map(donor => (
            <div key={donor._id} className="donor-card">
              <div className="donor-card-header">
                <div className="donor-avatar">{getInitials(donor.user?.name)}</div>
                <div>
                  <h3>{donor.user?.name}</h3>
                  <p>{donor.user?.email}</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <BloodGroupBadge group={donor.bloodGroup} />
                </div>
              </div>
              <div className="donor-details">
                <div className="donor-detail">
                  <label>Age</label>
                  <span>{donor.age} years</span>
                </div>
                <div className="donor-detail">
                  <label>Weight</label>
                  <span>{donor.weight} kg</span>
                </div>
                <div className="donor-detail">
                  <label>Department</label>
                  <span>{donor.department || '—'}</span>
                </div>
                <div className="donor-detail">
                  <label>Health</label>
                  <span style={{ textTransform: 'capitalize' }}>{donor.healthCondition}</span>
                </div>
                <div className="donor-detail">
                  <label>Donations</label>
                  <span>{donor.totalDonations}</span>
                </div>
                <div className="donor-detail">
                  <label>Phone</label>
                  <span>{donor.user?.phone || '—'}</span>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StatusBadge status={donor.availability} />
                {donor.lastDonationDate && (
                  <span className="text-muted">
                    Last: {new Date(donor.lastDonationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonorSearch;