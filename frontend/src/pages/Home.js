import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Users, Activity, Shield, Clock, CheckCircle,
  ArrowRight, Phone, MapPin, Star, Menu, X,
  Zap, Award, TrendingUp, Sparkles, GraduationCap
} from 'lucide-react';

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="lp">
      {/* ═══ NAVBAR ═══ */}
      <nav className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''}`}>
        <div className="lp-container lp-nav-inner">
          <Link to="/" className="lp-logo">
            <div className="lp-logo-icon">
              <Heart fill="white" size={18} />
            </div>
            BloodConnect
          </Link>

          <div className="lp-nav-links">
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#roles">Join Us</a>
            <a href="#impact">Impact</a>
            <a href="#team">Team</a>
          </div>

          <div className="lp-nav-actions">
            <Link to="/login" className="lp-btn lp-btn-ghost">Sign In</Link>
            <Link to="/register" className="lp-btn lp-btn-primary">
              Get Started <ArrowRight size={14} />
            </Link>
          </div>

          <button className="lp-mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenu && (
          <div className="lp-mobile-menu">
            <a href="#features" onClick={() => setMobileMenu(false)}>Features</a>
            <a href="#how" onClick={() => setMobileMenu(false)}>How It Works</a>
            <a href="#roles" onClick={() => setMobileMenu(false)}>Join Us</a>
            <a href="#impact" onClick={() => setMobileMenu(false)}>Impact</a>
            <a href="#team" onClick={() => setMobileMenu(false)}>Team</a>
            <Link to="/login" className="lp-btn lp-btn-ghost">Sign In</Link>
            <Link to="/register" className="lp-btn lp-btn-primary">Get Started</Link>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <div className="lp-blob lp-blob-1" />
          <div className="lp-blob lp-blob-2" />
          <div className="lp-blob lp-blob-3" />
          <div className="lp-grid-bg" />
        </div>

        <div className="lp-container lp-hero-inner">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">
              <Sparkles size={13} />
              <span>Trusted platform · 500+ active donors</span>
            </div>

            <h1 className="lp-hero-title">
              Every Drop Counts.<br />
              <span className="lp-gradient-text">Be Someone's Hero.</span>
            </h1>

            <p className="lp-hero-desc">
              BloodConnect bridges the gap between blood donors and recipients.
              Find compatible donors instantly, submit emergency requests, and
              save lives in your community — all in one platform.
            </p>

            <div className="lp-hero-cta">
              <Link to="/register" className="lp-btn lp-btn-primary lp-btn-lg">
                <Heart size={16} fill="white" />
                Register as Donor
              </Link>
              <Link to="/register" className="lp-btn lp-btn-outline lp-btn-lg">
                Request Blood <ArrowRight size={16} />
              </Link>
            </div>

            <div className="lp-hero-trust">
              <div className="lp-avatars">
                <div className="lp-avatar" style={{ background: '#dc2626' }}>JD</div>
                <div className="lp-avatar" style={{ background: '#2563eb' }}>SM</div>
                <div className="lp-avatar" style={{ background: '#16a34a' }}>MK</div>
                <div className="lp-avatar" style={{ background: '#d97706' }}>+</div>
              </div>
              <div>
                <div className="lp-stars">★★★★★</div>
                <span className="lp-trust-text">Trusted by 500+ heroes</span>
              </div>
            </div>
          </div>

          <div className="lp-hero-visual">
            <div className="lp-card lp-card-request">
              <div className="lp-card-top">
                <div className="lp-card-icon">
                  <Heart size={18} fill="#dc2626" />
                </div>
                <div className="lp-card-title-wrap">
                  <div className="lp-card-title">Emergency Request</div>
                  <div className="lp-card-sub">City General Hospital</div>
                </div>
                <span className="lp-critical-badge">
                  <span className="lp-critical-dot" /> CRITICAL
                </span>
              </div>

              <div className="lp-card-details">
                <div className="lp-detail-row">
                  <span className="lp-detail-label">Blood Group</span>
                  <span className="lp-blood-pill">O+</span>
                </div>
                <div className="lp-detail-row">
                  <span className="lp-detail-label">Units Needed</span>
                  <strong>2 units</strong>
                </div>
                <div className="lp-detail-row">
                  <span className="lp-detail-label">
                    <MapPin size={11} /> Location
                  </span>
                  <strong>City General</strong>
                </div>
                <div className="lp-detail-row">
                  <span className="lp-detail-label">
                    <Phone size={11} /> Contact
                  </span>
                  <strong>555-0123</strong>
                </div>
              </div>

              <button className="lp-donate-btn">
                <Heart size={13} fill="white" />
                I'm Available to Donate
              </button>
            </div>

            <div className="lp-card lp-card-donor">
              <div className="lp-donor-avatar">JD</div>
              <div className="lp-donor-info">
                <strong>John Donor</strong>
                <span>O+ · Available</span>
              </div>
              <div className="lp-donor-check">
                <CheckCircle size={16} fill="#16a34a" color="white" />
              </div>
            </div>

            <div className="lp-card lp-card-match">
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              <span><strong>3 donors</strong> matched!</span>
            </div>

            <div className="lp-card lp-card-compat">
              <span className="lp-compat-label">Compatible:</span>
              <span className="lp-blood-mini">O+</span>
              <span className="lp-blood-mini">O-</span>
            </div>
          </div>
        </div>

        <div className="lp-blood-strip">
          <div className="lp-container">
            <p className="lp-strip-label">All blood groups supported</p>
            <div className="lp-blood-groups">
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                <div key={g} className="lp-group-chip">{g}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="lp-section" id="features">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-badge">
              <Zap size={12} /> FEATURES
            </div>
            <h2 className="lp-section-title">
              Everything You Need to<br />
              <span className="lp-gradient-text">Save Lives</span>
            </h2>
            <p className="lp-section-desc">
              A complete platform connecting donors and recipients with smart matching,
              real-time tracking, and emergency support.
            </p>
          </div>

          <div className="lp-features">
            {[
              { icon: <Activity size={22} />, color: 'red', title: 'Emergency Requests',
                desc: 'Submit and respond to emergency blood requests instantly with full patient and hospital details.' },
              { icon: <Users size={22} />, color: 'blue', title: 'Smart Donor Matching',
                desc: 'Automatically match donors by blood group compatibility and real-time availability status.' },
              { icon: <Heart size={22} />, color: 'pink', title: 'Blood Compatibility',
                desc: "View all compatible blood groups when an exact match isn't available to maximize chances." },
              { icon: <Clock size={22} />, color: 'amber', title: 'Request Tracking',
                desc: 'Track every request from Open → In Progress → Fulfilled with full transparency.' },
              { icon: <Shield size={22} />, color: 'purple', title: 'Health Profiles',
                desc: 'Donors maintain detailed health profiles including blood group, weight, and donation history.' },
              { icon: <TrendingUp size={22} />, color: 'green', title: 'Analytics Dashboard',
                desc: 'View real-time statistics, monthly trends, blood group distribution, and completed donations.' }
            ].map((f, i) => (
              <div key={i} className="lp-feature">
                <div className={`lp-feature-icon lp-icon-${f.color}`}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="lp-feature-arrow"><ArrowRight size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="lp-section lp-section-alt" id="how">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-badge">
              <Award size={12} /> PROCESS
            </div>
            <h2 className="lp-section-title">
              How BloodConnect<br />
              <span className="lp-gradient-text">Works</span>
            </h2>
            <p className="lp-section-desc">
              Three simple steps to connect donors with those in need
            </p>
          </div>

          <div className="lp-steps">
            {[
              { num: '01', color: 'red', title: 'Register & Set Up Profile',
                desc: 'Create your account as Donor, Recipient, or Admin. Donors fill out health info including blood group, availability, and location.' },
              { num: '02', color: 'blue', title: 'Submit or Find Requests',
                desc: 'Recipients submit blood requests with patient and hospital details. The system instantly matches compatible available donors.' },
              { num: '03', color: 'green', title: 'Connect & Save Lives',
                desc: 'Donors respond "I\'m Available", get confirmed, donate, and the request is marked fulfilled. Track everything in real-time.' }
            ].map((s, i) => (
              <div key={i} className="lp-step">
                <div className={`lp-step-num lp-step-${s.color}`}>{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i < 2 && (
                  <div className="lp-step-connector">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROLES ═══ */}
      <section className="lp-section" id="roles">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-badge">
              <Users size={12} /> FOR EVERYONE
            </div>
            <h2 className="lp-section-title">
              Join as Your<br />
              <span className="lp-gradient-text">Preferred Role</span>
            </h2>
            <p className="lp-section-desc">
              Choose the role that fits you and start making a difference today
            </p>
          </div>

          <div className="lp-roles">
            <div className="lp-role lp-role-donor">
              <div className="lp-role-header">
                <div className="lp-role-icon lp-icon-red">
                  <Heart size={28} fill="#dc2626" />
                </div>
                <span className="lp-role-tag">MOST POPULAR</span>
              </div>
              <h3>Blood Donor</h3>
              <p>Register, set your availability, and respond to blood requests. Track your donation impact.</p>
              <ul className="lp-role-list">
                <li><CheckCircle size={14} /> Set blood group & health info</li>
                <li><CheckCircle size={14} /> Get matched to requests</li>
                <li><CheckCircle size={14} /> Respond with one click</li>
                <li><CheckCircle size={14} /> View donation history</li>
                <li><CheckCircle size={14} /> Emergency notifications</li>
              </ul>
              <Link to="/register" className="lp-btn lp-btn-primary lp-btn-block">
                Register as Donor <ArrowRight size={14} />
              </Link>
            </div>

            <div className="lp-role lp-role-recipient">
              <div className="lp-role-header">
                <div className="lp-role-icon lp-icon-blue">
                  <Activity size={28} />
                </div>
              </div>
              <h3>Blood Recipient</h3>
              <p>Submit blood requests for patients, track responses from donors, and manage the process.</p>
              <ul className="lp-role-list">
                <li><CheckCircle size={14} /> Submit emergency requests</li>
                <li><CheckCircle size={14} /> Auto-matched donors</li>
                <li><CheckCircle size={14} /> Track request status</li>
                <li><CheckCircle size={14} /> Contact donors directly</li>
                <li><CheckCircle size={14} /> Compatible blood groups shown</li>
              </ul>
              <Link to="/register" className="lp-btn lp-btn-blue lp-btn-block">
                Request Blood <ArrowRight size={14} />
              </Link>
            </div>

            <div className="lp-role lp-role-admin">
              <div className="lp-role-header">
                <div className="lp-role-icon lp-icon-amber">
                  <Shield size={28} />
                </div>
              </div>
              <h3>Administrator</h3>
              <p>Monitor the platform, manage users, view analytics, and keep everything running smoothly.</p>
              <ul className="lp-role-list">
                <li><CheckCircle size={14} /> Manage all users</li>
                <li><CheckCircle size={14} /> View platform analytics</li>
                <li><CheckCircle size={14} /> Monitor all requests</li>
                <li><CheckCircle size={14} /> Blood group distribution</li>
                <li><CheckCircle size={14} /> Monthly trend reports</li>
              </ul>
              <Link to="/login" className="lp-btn lp-btn-amber lp-btn-block">
                Admin Login <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMPACT ═══ */}
      <section className="lp-impact" id="impact">
        <div className="lp-impact-bg">
          <div className="lp-blob lp-blob-i1" />
          <div className="lp-blob lp-blob-i2" />
        </div>
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-badge lp-badge-white">
              <TrendingUp size={12} /> OUR IMPACT
            </div>
            <h2 className="lp-section-title white">
              Making a difference,<br />
              <span className="lp-gold-text">one donation at a time.</span>
            </h2>
          </div>

          <div className="lp-impact-grid">
            {[
              { num: '500+', label: 'Registered Donors', icon: <Users size={20} /> },
              { num: '1,200+', label: 'Lives Saved', icon: <Heart size={20} /> },
              { num: '98%', label: 'Fulfillment Rate', icon: <CheckCircle size={20} /> },
              { num: '24/7', label: 'Emergency Support', icon: <Clock size={20} /> }
            ].map((s, i) => (
              <div key={i} className="lp-impact-card">
                <div className="lp-impact-icon">{s.icon}</div>
                <div className="lp-impact-num">{s.num}</div>
                <div className="lp-impact-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM SECTION ═══ */}
      <section className="lp-section lp-section-alt" id="team">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-section-badge">
              <GraduationCap size={12} /> OUR TEAM
            </div>
            <h2 className="lp-section-title">
              Built by<br />
              <span className="lp-gradient-text">Group 2</span>
            </h2>
            <p className="lp-section-desc">
              A dedicated team of students working together to save lives through technology.
            </p>
          </div>

          <div className="lp-team">
            {[
              { id: '22221120', name: 'Tassuba Ahmed', initials: 'TA', color: 'red' },
              { id: '24341065', name: 'Jareen Tasnim Bushra', initials: 'JB', color: 'blue' },
              { id: '23301666', name: 'Tasnuba Tabassum Ahona', initials: 'TA', color: 'amber' }
            ].map((member, i) => (
              <div key={i} className="lp-team-card">
                <div className={`lp-team-avatar lp-team-${member.color}`}>
                  {member.initials}
                </div>
                <h3>{member.name}</h3>
                <div className="lp-team-id">
                  <GraduationCap size={12} />
                  {member.id}
                </div>
              </div>
            ))}
          </div>

          <div className="lp-team-badge">
            <div className="lp-team-badge-icon">
              <Users size={16} />
            </div>
            <div>
              <strong>Group 2</strong>
              <span>BloodConnect Project Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="lp-cta-section">
        <div className="lp-container">
          <div className="lp-cta">
            <div className="lp-cta-glow" />
            <div className="lp-cta-content">
              <div className="lp-cta-icon">
                <Heart size={32} fill="#dc2626" />
              </div>
              <h2>Ready to Save a Life Today?</h2>
              <p>
                Join thousands of donors making a difference in their community.
                Register now and be ready when someone needs you most.
              </p>
              <div className="lp-cta-actions">
                <Link to="/register" className="lp-btn lp-btn-primary lp-btn-lg">
                  <Heart size={16} fill="white" />
                  Get Started Free
                </Link>
                <Link to="/login" className="lp-btn lp-btn-outline lp-btn-lg">
                  Sign In
                </Link>
              </div>
              <div className="lp-cta-perks">
                <span><CheckCircle size={14} /> Free forever</span>
                <span><CheckCircle size={14} /> No credit card</span>
                <span><CheckCircle size={14} /> 60-second signup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <Link to="/" className="lp-logo">
                <div className="lp-logo-icon">
                  <Heart fill="white" size={16} />
                </div>
                BloodConnect
              </Link>
              <p>Every drop counts. Every donor is a hero. Together, we save lives.</p>
            </div>

            <div className="lp-footer-cols">
              <div>
                <h4>Platform</h4>
                <a href="#features">Features</a>
                <a href="#how">How It Works</a>
                <a href="#roles">Join Us</a>
                <a href="#team">Team</a>
              </div>
              <div>
                <h4>Account</h4>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Register</Link>
                <Link to="/register">Request Blood</Link>
              </div>
              <div>
                <h4>Contact</h4>
                <a href="#">Help Center</a>
                <a href="#">Emergency</a>
                <a href="#">Support</a>
              </div>
            </div>
          </div>

          <div className="lp-footer-bot">
            <span>© 2024 BloodConnect · Built by Group 2 with ❤️ to save lives.</span>
            <div className="lp-footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;