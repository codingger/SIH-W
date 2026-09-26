import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ListChecks,
  Flag,
  FolderKanban,
  Handshake,
  Users,
  Search,
  ThumbsUp,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileText,
  Clock,
  ShieldCheck,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus
} from 'lucide-react';
import {
  getChallenges,
  getChallenge,
  createChallenge,
  supportChallenge,
  getProjects,
  getProject,
  takeUpChallenge,
  getTeams,
  createTeam,
  getCompanyCollaborations,
  requestCollaboration,
  getCollaborationRequests,
  updateCollaborationRequest,
  getIndustryPartners,
  getIndustryPartnerApplications,
  updatePartnerApplication,
  applyIndustryPartner,
  loginUser,
  registerUser,
  getCurrentUser
} from './api.js';
import {
  FlowDiagram,
  EmptyIcon,
  ChallengeCard,
  ProjectCard,
  StatCard,
  StatusPill,
  UrgencyPill,
  CollabPill,
  LifecycleTracker,
  Breadcrumbs,
  SkeletonGrid
} from './components.jsx';

const PageHead = ({ title, subtitle, action }) => (
  <div className="row between" style={{ marginBottom: '1.75rem', alignItems: 'flex-start' }}>
    <div>
      <h1 style={{ fontSize: '1.875rem', marginBottom: '0.25rem' }}>{title}</h1>
      {subtitle && <p className="muted" style={{ margin: 0 }}>{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

const EmptyBox = ({ title, subtitle, action }) => (
  <div className="card col center" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', gap: '0.75rem' }}>
    <EmptyIcon />
    <h3 style={{ margin: 0 }}>{title}</h3>
    {subtitle && <p className="muted" style={{ maxWidth: '44ch', margin: 0 }}>{subtitle}</p>}
    {action && <div style={{ marginTop: '0.5rem' }}>{action}</div>}
  </div>
);

// ==========================================
// CITIZEN: HOME
// ==========================================
export function Home() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChallenges().then(data => {
      setChallenges(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div>
            <div className="row" style={{ marginBottom: '1rem' }}>
              <span className="pill teal">
                <Sparkles size={14} aria-hidden="true" />
                Digital India Public Service
              </span>
            </div>
            <h1>Turn Local Problems Into Real Solutions</h1>
            <p>
              Report a civic, water, agricultural or infrastructure issue in your community.
              Premier universities adopt it as student-faculty research, and industry leaders help fund and build the solution.
            </p>
            <div className="row" style={{ gap: '1rem', marginTop: '1.5rem' }}>
              <Link className="btn accent" to="/submit">
                + Submit a Challenge
              </Link>
              <Link className="btn ghost" to="/explore">
                Explore All Challenges
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FlowDiagram />
          </div>
        </div>
      </section>

      {/* Live Impact Counters */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="stats-grid">
          <StatCard label="Challenges Reported" value="1,284" Icon={Flag} trend="Verified by panchayats" />
          <StatCard label="Projects Underway" value="212" Icon={FolderKanban} trend="In university labs" />
          <StatCard label="Universities Enrolled" value="46" Icon={GraduationCap} trend="IITs, NITs & State Unis" />
          <StatCard label="Industry Partners" value="89" Icon={Handshake} trend="Active CSR & R&D sponsors" />
        </div>
      </section>

      {/* 4-Step Pipeline Summary */}
      <section className="card" style={{ marginBottom: '3rem', padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>How the Platform Works</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { step: '1', title: 'Community Reports', desc: 'Citizens or panchayats submit localized problems with photos, location, and affected count.' },
            { step: '2', title: 'University Adopts', desc: 'Engineering and research departments select verified problems as capstone or thesis projects.' },
            { step: '3', title: 'Industry Backs', desc: 'Enterprises provide CSR funding, technical mentoring, hardware components, or fabrication.' },
            { step: '4', title: 'Real Solution Deployed', desc: 'Prototypes are field-tested in the community and handed over for lasting public impact.' }
          ].map(s => (
            <div key={s.step} className="col" style={{ gap: '0.5rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
                {s.step}
              </div>
              <h4 style={{ margin: 0 }}>{s.title}</h4>
              <p className="muted text-sm" style={{ margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / High-Support Challenges */}
      <section style={{ marginBottom: '3rem' }}>
        <div className="row between" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h2>Challenges with Highest Support</h2>
            <p className="muted text-sm" style={{ margin: 0 }}>Voted by citizens as most critical for immediate intervention</p>
          </div>
          <Link className="btn ghost sm" to="/explore">
            View All ({challenges.length})
          </Link>
        </div>

        {loading ? (
          <SkeletonGrid count={3} />
        ) : (
          <div className="grid">
            {challenges.slice(0, 3).map(c => (
              <ChallengeCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Strip */}
      <section className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
        <p className="muted text-sm" style={{ fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Trusted By Academic & Industrial Institutions Nationwide
        </p>
        <div className="row center" style={{ gap: '2rem', flexWrap: 'wrap', opacity: 0.85 }}>
          {['IIT (ISM) Dhanbad', 'BIT Mesra', 'NIT Jamshedpur', 'Tata CleanTech', 'AgriTech Foundation', 'Jharkhand Innovation Council'].map(org => (
            <span key={org} style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-muted)' }}>
              🏛️ {org}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

// ==========================================
// CITIZEN: EXPLORE
// ==========================================
export function Explore() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [district, setDistrict] = useState('');
  const [sortBy, setSortBy] = useState('votes');

  useEffect(() => {
    getChallenges().then(data => {
      setChallenges(data);
      setLoading(false);
    });
  }, []);

  const categories = ['Water', 'Healthcare', 'Agriculture', 'Infrastructure', 'Education', 'Environment'];
  const districts = ['Ranchi', 'Dhanbad', 'Bokaro', 'Jamshedpur', 'Hazaribagh'];

  const filtered = challenges
    .filter(c => {
      const s = search.toLowerCase();
      const matchSearch = !s || c.title.toLowerCase().includes(s) || (c.desc || '').toLowerCase().includes(s) || (c.district || '').toLowerCase().includes(s);
      const matchCat = !cat || c.cat === cat || c.category === cat;
      const matchDist = !district || c.district === district;
      return matchSearch && matchCat && matchDist;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') return (b.votes || b.supporters || 0) - (a.votes || a.supporters || 0);
      if (sortBy === 'affected') return (b.affected || b.affected_people || 0) - (a.affected || a.affected_people || 0);
      return (b.id || 0) - (a.id || 0);
    });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Challenges' }]} />
      <PageHead
        title="Explore Community Challenges"
        subtitle="Search and support existing issues submitted by citizens across districts."
        action={
          <Link className="btn accent sm" to="/submit">
            + Submit New Challenge
          </Link>
        }
      />

      {/* Filter Toolbar */}
      <div className="card" style={{ marginBottom: '1.75rem', padding: '1rem' }}>
        <div className="row" style={{ gap: '0.75rem' }}>
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <input
              className="input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="Search by problem, district or keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search challenges"
            />
            <Search size={16} aria-hidden="true" style={{ position: 'absolute', left: 12, top: 14, color: 'var(--text-muted)' }} />
          </div>

          <div style={{ flex: '0 1 180px' }}>
            <select className="select" value={cat} onChange={e => setCat(e.target.value)} aria-label="Category">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ flex: '0 1 170px' }}>
            <select className="select" value={district} onChange={e => setDistrict(e.target.value)} aria-label="District">
              <option value="">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div style={{ flex: '0 1 160px' }}>
            <select className="select" value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort By">
              <option value="votes">Most Supported</option>
              <option value="affected">Most People Affected</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {(search || cat || district) && (
            <button className="btn ghost sm" onClick={() => { setSearch(''); setCat(''); setDistrict(''); }}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Results */}
      {loading ? (
        <SkeletonGrid count={6} />
      ) : filtered.length > 0 ? (
        <div className="grid">
          {filtered.map(c => (
            <ChallengeCard key={c.id} c={c} />
          ))}
        </div>
      ) : (
        <EmptyBox
          title="No challenges matched your search"
          subtitle="Try adjusting your filters or search terms. If this problem hasn't been reported yet, be the first to submit it!"
          action={
            <Link className="btn accent" to="/submit">
              Submit This Problem as New Challenge
            </Link>
          }
        />
      )}
    </>
  );
}

// ==========================================
// CITIZEN: SUBMIT CHALLENGE (3-Step Wizard)
// ==========================================
export function Submit() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Water',
    district: '',
    area: '',
    affected_group: 'Community',
    affected_people: '',
    additional_info: ''
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [trackingId, setTrackingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [detectingLoc, setDetectingLoc] = useState(false);
  const [locMsg, setLocMsg] = useState('');
  const [locSuccess, setLocSuccess] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocMsg('Geolocation is not supported by your browser.');
      setLocSuccess(false);
      return;
    }

    setDetectingLoc(true);
    setLocMsg('Requesting location permission...');
    setLocSuccess(false);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocMsg('Permission granted! Auto-filling your location...');

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const addr = data.address || {};

          let detectedDistrict =
            addr.state_district ||
            addr.county ||
            addr.city ||
            addr.district ||
            '';
          detectedDistrict = detectedDistrict.replace(/\s*(District|Zilla|Pargana)\s*/gi, '').trim();

          const detectedArea =
            addr.suburb ||
            addr.village ||
            addr.town ||
            addr.hamlet ||
            addr.neighbourhood ||
            addr.road ||
            addr.residential ||
            '';

          setForm(prev => {
            const updated = {
              ...prev,
              district: detectedDistrict || prev.district,
              area: detectedArea ? `${detectedArea}` : (prev.area || 'Detected Locality'),
              additional_info: prev.additional_info
                ? `${prev.additional_info}\n[GPS Coordinates: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°]`
                : `[GPS Coordinates: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°]`
            };
            try {
              localStorage.setItem('sih_challenge_draft', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });

          setLocMsg(`Location detected: ${detectedDistrict ? detectedDistrict + ', ' : ''}${detectedArea || 'Area auto-filled'} (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`);
          setLocSuccess(true);
        } catch (err) {
          setForm(prev => ({
            ...prev,
            additional_info: prev.additional_info
              ? `${prev.additional_info}\n[GPS Coordinates: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°]`
              : `[GPS Coordinates: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°]`
          }));
          setLocMsg(`GPS coordinates retrieved (${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°). Form auto-tagged.`);
          setLocSuccess(true);
        } finally {
          setDetectingLoc(false);
        }
      },
      (err) => {
        setDetectingLoc(false);
        setLocSuccess(false);
        if (err.code === 1) {
          setLocMsg('Location permission denied. Please select or type your district manually below.');
        } else if (err.code === 2) {
          setLocMsg('Location unavailable. Please select or type your district manually below.');
        } else if (err.code === 3) {
          setLocMsg('Location request timed out. Please select or type your district manually below.');
        } else {
          setLocMsg('Unable to retrieve location. Please type your details manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Ensure form starts completely clean on mount
  useEffect(() => {
    try {
      localStorage.removeItem('sih_challenge_draft');
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (key) => (e) => {
    const val = e.target.value;
    setForm(prev => {
      const updated = { ...prev, [key]: val };
      try {
        localStorage.setItem('sih_challenge_draft', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const validateStep = (s) => {
    const err = {};
    if (s === 1) {
      if (!form.title || form.title.trim().length < 8) {
        err.title = 'Title must be at least 8 characters long.';
      }
      if (!form.description || form.description.trim().length < 20) {
        err.description = 'Please describe the problem in at least 20 characters.';
      }
    } else if (s === 2) {
      if (!form.district) err.district = 'Please select a district.';
      if (!form.area || form.area.trim().length < 2) err.area = 'Please provide a village or locality area.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // STRICT GUARD: Do not allow challenge submission unless on Step 3
    if (step < 3) {
      handleNext(e);
      return;
    }

    if (!validateStep(1) || !validateStep(2)) {
      setStep(1);
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    try {
      const result = await createChallenge(form, files);
      localStorage.removeItem('sih_challenge_draft');
      setTrackingId(`SIP-${result.id ? String(result.id).slice(-6) : Math.floor(100000 + Math.random() * 900000)}`);
    } catch (err) {
      console.error('Challenge creation error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) {
      setFiles(prev => [...prev, ...selected]);
    }
    e.target.value = '';
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  if (trackingId) {
    return (
      <div className="card col center" style={{ maxWidth: 620, margin: '2rem auto', padding: '3rem 2rem', textAlign: 'center' }}>
        <CheckCircle2 size={54} color="var(--success)" aria-hidden="true" style={{ marginBottom: '1rem' }} />
        <h1>Challenge Submitted Successfully!</h1>
        <p className="muted">
          Your report has been entered into the government innovation queue for verification and university adoption.
        </p>
        <div className="card" style={{ background: 'var(--bg)', width: '100%', margin: '1.5rem 0', padding: '1rem' }}>
          <span className="muted text-sm">Your Official Tracking Reference</span>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em' }}>
            {trackingId}
          </div>
        </div>
        <p className="text-sm muted">
          Save this ID. You can use it to track real-time university project creation and prototype progress.
        </p>
        <div className="row center" style={{ gap: '1rem', marginTop: '1rem' }}>
          <Link className="btn" to="/explore">
            View Public Challenges
          </Link>
          <Link className="btn ghost" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: 'Submit Challenge' }]} />
      <PageHead
        title="Submit a Community Challenge"
        subtitle={`Step ${step} of 3. Takes about 2 minutes. Information is public and reviewed by universities.`}
      />

      {/* Stepper Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="row between text-sm muted" style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: step === 1 ? 700 : 500, color: step === 1 ? 'var(--primary)' : 'inherit' }}>1. The Problem</span>
          <span style={{ fontWeight: step === 2 ? 700 : 500, color: step === 2 ? 'var(--primary)' : 'inherit' }}>2. Location</span>
          <span style={{ fontWeight: step === 3 ? 700 : 500, color: step === 3 ? 'var(--primary)' : 'inherit' }}>3. Impact & Evidence</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <form className="card" onSubmit={handleSubmit} style={{ padding: '2rem' }}>
        {step === 1 && (
          <>
            <div className="form-field">
              <label htmlFor="f-title">Problem Title *</label>
              <input
                id="f-title"
                className="input"
                placeholder="e.g. Broken culvert bridge isolating health centre in monsoon"
                value={form.title}
                onChange={handleChange('title')}
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="f-category">Domain / Category *</label>
              <select id="f-category" className="select" value={form.category} onChange={handleChange('category')}>
                {['Water', 'Healthcare', 'Agriculture', 'Infrastructure', 'Education', 'Sanitation', 'Environment', 'Accessibility'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="f-desc">Describe the Problem in Detail *</label>
              <textarea
                id="f-desc"
                className="textarea"
                rows={5}
                placeholder="What is happening? When did it start? How does it affect daily living or livelihoods?"
                value={form.description}
                onChange={handleChange('description')}
              />
              {errors.description && <span className="field-error">{errors.description}</span>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="card" style={{ background: 'var(--bg)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
              <div className="row between">
                <div className="row" style={{ gap: '0.6rem' }}>
                  <MapPin size={22} color="var(--primary)" aria-hidden="true" />
                  <div>
                    <h4 style={{ margin: 0 }}>Auto-Detect My Location</h4>
                    <span className="text-sm muted">Ask browser permission to auto-fill District & Locality</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn ghost sm"
                  onClick={detectLocation}
                  disabled={detectingLoc}
                >
                  {detectingLoc ? 'Detecting...' : '📍 Use Current Location'}
                </button>
              </div>

              {locMsg && (
                <div className="text-sm" style={{ marginTop: '0.75rem', fontWeight: 600, color: locSuccess ? 'var(--success)' : 'var(--danger)' }}>
                  {locMsg}
                </div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="f-district">District *</label>
              <input
                id="f-district"
                list="district-options"
                className="input"
                placeholder="Type or select a district (e.g. Ranchi, Dhanbad...)"
                value={form.district}
                onChange={handleChange('district')}
              />
              <datalist id="district-options">
                {['Ranchi', 'Dhanbad', 'Bokaro', 'Jamshedpur', 'East Singhbhum', 'West Singhbhum', 'Hazaribagh', 'Giridih', 'Deoghar', 'Palamu', 'Ramgarh', 'Chatra', 'Dumka', 'Garhwa', 'Godda', 'Gumla', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega'].map(d => (
                  <option key={d} value={d} />
                ))}
              </datalist>
              <small className="muted text-sm" style={{ marginTop: '0.25rem', display: 'block' }}>
                You can select from the dropdown options or type your custom district name freely.
              </small>
              {errors.district && <span className="field-error">{errors.district}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="f-area">Village / Panchayat / Locality Area *</label>
              <input
                id="f-area"
                className="input"
                placeholder="e.g. Baliapur Block, Ward 4"
                value={form.area}
                onChange={handleChange('area')}
              />
              {errors.area && <span className="field-error">{errors.area}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="f-info">Additional Context (Optional)</label>
              <textarea
                id="f-info"
                className="textarea"
                rows={3}
                placeholder="Nearby landmarks, existing government infrastructure (BharatNet, PHC, Panchayat Bhavan), or seasonal factors."
                value={form.additional_info}
                onChange={handleChange('additional_info')}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="form-field">
              <label>Who is primarily affected?</label>
              <div className="row" style={{ gap: '1.25rem', marginTop: '0.25rem' }}>
                {['Just me / My family', 'Few Households', 'Entire Village / Community', 'Multiple Panchayats'].map(opt => (
                  <label key={opt} className="row" style={{ gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="affected_group"
                      checked={form.affected_group === opt}
                      onChange={() => setForm({ ...form, affected_group: opt })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="f-count">Estimated Number of People Affected</label>
              <input
                id="f-count"
                type="number"
                className="input"
                placeholder="e.g. 500"
                value={form.affected_people}
                onChange={handleChange('affected_people')}
              />
            </div>

            <div className="form-field">
              <label htmlFor="f-files">Upload Evidence Photos / Videos (Saved to Supabase Storage)</label>
              <div className="card col center" style={{ border: '2px dashed var(--border)', background: 'var(--bg)', padding: '1.5rem', textAlign: 'center' }}>
                <UploadCloud size={32} color="var(--primary)" aria-hidden="true" />
                <p className="text-sm muted" style={{ margin: '0.5rem 0' }}>
                  Click below to browse and attach site photos or videos
                </p>
                <input
                  id="f-files"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <button type="button" className="btn ghost sm" onClick={() => document.getElementById('f-files').click()}>
                  + Choose Photos / Videos
                </button>
              </div>

              {files.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <div className="row between text-sm muted" style={{ marginBottom: '0.5rem' }}>
                    <b>Attached Evidence Files ({files.length}):</b>
                    <button type="button" className="util-btn" onClick={() => setFiles([])} style={{ color: 'var(--danger)' }}>
                      Clear All
                    </button>
                  </div>
                  <ul className="col" style={{ gap: '0.5rem', padding: 0, margin: 0, listStyle: 'none' }}>
                    {files.map((file, idx) => (
                      <li key={idx} className="row between card" style={{ padding: '0.5rem 0.75rem', background: 'var(--surface)' }}>
                        <span className="text-sm row" style={{ gap: '0.5rem' }}>
                          <FileText size={16} color="var(--primary)" />
                          <b>{file.name}</b>
                          <span className="muted">({(file.size / 1024).toFixed(1)} KB)</span>
                        </span>
                        <button type="button" className="util-btn" onClick={() => removeFile(idx)} aria-label="Remove file">
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        <div className="row between" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
          {step > 1 ? (
            <button
              type="button"
              className="btn ghost"
              onClick={(e) => {
                e.preventDefault();
                setStep(prev => prev - 1);
              }}
            >
              Back
            </button>
          ) : <span />}

          {step < 3 ? (
            <button
              id="submit-step-next"
              type="button"
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNext(e);
              }}
            >
              Continue to Step {step + 1}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button
              id="submit-step-btn"
              type="button"
              className="btn accent"
              disabled={submitting}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(e);
              }}
            >
              {submitting ? 'Submitting Report...' : 'Submit Challenge to Platform'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ==========================================
// CITIZEN & PORTAL: CHALLENGE DETAIL VIEW
// ==========================================
export function ChallengeDetail({ portal }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [takingUp, setTakingUp] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const user = getCurrentUser();
  const activeUni = user?.institutionName || localStorage.getItem('selectedUniversity') || 'BIT Mesra';

  const loadData = () => {
    getChallenge(id).then(c => {
      setChallenge(c);
      setLoading(false);
    });
    getProjects().then(projs => {
      const match = (projs || []).find(p => String(p.challenge_id) === String(id) || String(p.id) === String(id));
      if (match) setProject(match);
    });
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleAdopt = async () => {
    if (!challenge) return;
    setTakingUp(true);
    await takeUpChallenge({
      challenge_id: challenge.id,
      title: challenge.title,
      description: challenge.description || challenge.desc,
      university: activeUni
    });
    setToastMsg(`Challenge adopted by ${activeUni}! Creating your university project...`);
    loadData();
    setTimeout(() => {
      navigate('/university/projects');
    }, 1200);
  };

  if (loading) {
    return <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>Loading challenge details...</div>;
  }

  if (!challenge) {
    return (
      <EmptyBox
        title="Challenge Not Found"
        subtitle="This problem may have been resolved, archived, or the link is incorrect."
        action={<Link className="btn" to="/explore">Back to Challenges</Link>}
      />
    );
  }

  const isAdopted = challenge.step >= 2 || challenge.status === 'Taken Up' || !!project;
  const universityDisplay = project?.university || project?.uni || challenge?.university || activeUni;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: portal ? 'University Challenges' : 'Challenges', to: portal ? '/university/challenges' : '/explore' },
          { label: challenge.title }
        ]}
      />

      {toastMsg && (
        <div role="status" className="toast">
          <CheckCircle2 size={18} aria-hidden="true" />
          {toastMsg}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
        <div className="row between" style={{ marginBottom: '0.75rem' }}>
          <div className="row" style={{ gap: '0.5rem' }}>
            <span className="pill teal">{challenge.category || challenge.cat}</span>
            <StatusPill step={challenge.step} statusText={challenge.status} />
            <UrgencyPill votes={challenge.supporters || challenge.votes} />
          </div>
          <span className="muted text-sm">
            Reported on {new Date(challenge.created_at || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{challenge.title}</h1>

        <div className="row muted text-sm" style={{ gap: '1.25rem', marginBottom: '1.25rem' }}>
          <span className="row" style={{ gap: '0.35rem' }}>
            <MapPin size={16} aria-hidden="true" />
            <b>Location:</b> {challenge.area ? `${challenge.area}, ` : ''}{challenge.district}
          </span>
          <span className="row" style={{ gap: '0.35rem' }}>
            <Users size={16} aria-hidden="true" />
            <b>Affected Citizens:</b> {(challenge.affected_people || challenge.affected || 0).toLocaleString()}
          </span>
          <span className="row" style={{ gap: '0.35rem' }}>
            <ThumbsUp size={16} aria-hidden="true" />
            <b>Community Votes:</b> {challenge.supporters || challenge.votes}
          </span>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
          <h3>Problem Statement</h3>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
            {challenge.description || challenge.desc}
          </p>

          {challenge.additional_info && (
            <div className="card" style={{ background: 'var(--bg)', marginTop: '1rem', padding: '1rem' }}>
              <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>Additional Context & Infrastructure</h4>
              <p className="muted text-sm" style={{ margin: 0 }}>{challenge.additional_info}</p>
            </div>
          )}

          {/* Submitted Media Evidence Gallery */}
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Submitted Evidence & Media</h3>
            {challenge.media && challenge.media.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {challenge.media.map((m, idx) => {
                  const isVideo = m.file_type?.startsWith('video/') || (m.file_url && m.file_url.match(/\.(mp4|webm|ogg)$/i));
                  return (
                    <div key={m.id || idx} className="card" style={{ padding: '0.5rem', background: 'var(--bg)', overflow: 'hidden' }}>
                      {isVideo ? (
                        <video
                          src={m.file_url}
                          controls
                          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      ) : (
                        <img
                          src={m.file_url}
                          alt={`Evidence photo ${idx + 1}`}
                          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }}
                          onClick={() => window.open(m.file_url, '_blank')}
                        />
                      )}
                      <div className="row between" style={{ padding: '0.5rem 0.25rem 0.25rem 0.25rem' }}>
                        <span className="text-sm muted">{isVideo ? '📹 Video Evidence' : `📷 Photo Evidence ${idx + 1}`}</span>
                        {!isVideo && (
                          <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="text-sm link">
                            View Full →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : challenge.image_url ? (
              <div style={{ maxWidth: '450px' }}>
                <img
                  src={challenge.image_url}
                  alt="Challenge evidence"
                  style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
                />
              </div>
            ) : (
              <div className="card" style={{ background: 'var(--bg)', padding: '1rem' }}>
                <p className="muted text-sm" style={{ margin: 0 }}>
                  No photos or video files were uploaded when this challenge was reported.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signature Lifecycle Tracker */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
        <h3 style={{ marginBottom: '1.25rem' }}>Challenge Development Lifecycle</h3>
        <LifecycleTracker step={challenge.step} horizontal />
      </div>

      {/* University Response & Actions */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h3>University & Innovation Response</h3>
        {isAdopted ? (
          <div className="col" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
            <p>
              This challenge has been officially taken up by a university engineering lab.
              A team of faculty researchers and student innovators are currently developing the prototype solution.
            </p>
            <div className="row" style={{ gap: '0.5rem' }}>
              <span className="pill navy">{universityDisplay}</span>
              <span className="pill teal">{project?.status || 'In Active Development'}</span>
            </div>
          </div>
        ) : (
          <p className="muted">
            This challenge is currently open for university adoption. Once a university takes it up, faculty mentors and student teams will form an active project here.
          </p>
        )}

        <div className="row" style={{ marginTop: '1.25rem', gap: '1rem' }}>
          {portal ? (
            <button className="btn" disabled={takingUp || isAdopted} onClick={handleAdopt}>
              <GraduationCap size={16} aria-hidden="true" />
              {isAdopted ? 'Challenge Already Adopted' : takingUp ? 'Adopting...' : 'Take Up Challenge as University Project'}
            </button>
          ) : (
            <button
              className="btn"
              onClick={async () => {
                await supportChallenge(challenge.id);
                setChallenge(prev => ({ ...prev, supporters: (prev.supporters || 0) + 1 }));
                setToastMsg('Thank you! Your support vote was counted.');
              }}
            >
              <ThumbsUp size={16} aria-hidden="true" />
              Support This Challenge
            </button>
          )}

          <Link className="btn ghost" to={portal ? '/university/challenges' : '/explore'}>
            Back to List
          </Link>
        </div>
      </div>
    </>
  );
}

// ==========================================
// CITIZEN: TRACK CHALLENGE
// ==========================================
export function CitizenTrack() {
  const [trackId, setTrackId] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    getChallenges().then(all => {
      // Find matching challenge by ID or title
      const found = all.find(c => String(c.id).includes(trackId.replace(/\D/g, '')) || c.title.toLowerCase().includes(trackId.toLowerCase()));
      setResult(found || null);
    });
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: 'Track Submission' }]} />
      <PageHead
        title="Track Community Submission"
        subtitle="Enter your tracking ID (e.g., SIP-100245) or village name to view real-time progress."
      />

      <form className="card" onSubmit={handleSearch} style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div className="row" style={{ gap: '0.75rem' }}>
          <div style={{ flex: 1 }}>
            <input
              className="input"
              placeholder="Enter Tracking ID (e.g. SIP-000001) or Problem Title"
              value={trackId}
              onChange={e => setTrackId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn accent">
            <Search size={16} aria-hidden="true" />
            Track Progress
          </button>
        </div>
      </form>

      {searched && (
        result ? (
          <div className="card col" style={{ gap: '1.25rem', padding: '1.75rem' }}>
            <div className="row between">
              <span className="pill teal">{result.category || result.cat}</span>
              <StatusPill step={result.step} statusText={result.status} />
            </div>
            <h2 style={{ margin: 0 }}>{result.title}</h2>
            <div className="muted text-sm row" style={{ gap: '1rem' }}>
              <span className="row" style={{ gap: '0.35rem' }}><MapPin size={15} /> {result.area}, {result.district}</span>
              <span className="row" style={{ gap: '0.35rem' }}><ThumbsUp size={15} /> {result.supporters || result.votes} supporters</span>
            </div>
            <LifecycleTracker step={result.step} horizontal />
            <div className="row" style={{ marginTop: '0.5rem' }}>
              <Link className="btn sm" to={`/challenges/${result.id}`}>
                View Full Details & University Feed
              </Link>
            </div>
          </div>
        ) : (
          <EmptyBox
            title="No submission found"
            subtitle="Please verify your tracking ID. Alternatively, explore all active community challenges."
            action={<Link className="btn ghost" to="/explore">Explore All Challenges</Link>}
          />
        )
      )}
    </div>
  );
}

// ==========================================
// UNIVERSITY: DASHBOARD
// ==========================================
export function UniDash() {
  const [challenges, setChallenges] = useState([]);
  const [projects, setProjects] = useState([]);
  const user = getCurrentUser();
  const activeUni = user?.institutionName || localStorage.getItem('selectedUniversity') || 'BIT Mesra';

  useEffect(() => {
    getChallenges().then(setChallenges);
    getProjects().then(setProjects);
  }, []);

  const myProjects = projects.filter(p => (p.university || p.uni) === activeUni);

  return (
    <>
      <PageHead
        title={`${activeUni} — Research Dashboard`}
        subtitle={`Welcome, ${activeUni} Faculty & Innovation Cell Members. Manage adopted challenges and student R&D teams.`}
        action={
          <Link className="btn accent sm" to="/university/challenges">
            Explore Open Challenges
          </Link>
        }
      />

      {/* 4 StatCards */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <StatCard label="Total Challenges Available" value={challenges.length} Icon={ListChecks} />
        <StatCard label="High Priority Needs" value={challenges.filter(c => (c.supporters || c.votes || 0) >= 10).length} Icon={Flag} />
        <StatCard label={`${activeUni} Active Projects`} value={myProjects.length > 0 ? myProjects.length : projects.length} Icon={FolderKanban} />
        <StatCard label="Industry Collaborations" value="9" Icon={Handshake} />
      </div>

      {/* High-support challenges quick list */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div className="row between" style={{ marginBottom: '1rem' }}>
          <div>
            <h3>Urgent Community Problems Awaiting Adoption</h3>
            <p className="muted text-sm" style={{ margin: 0 }}>Verified issues with highest citizen votes</p>
          </div>
          <Link className="btn ghost sm" to="/university/challenges">
            View All Challenges
          </Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Challenge Title</th>
                <th>District</th>
                <th>Category</th>
                <th>Urgency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {challenges.slice(0, 4).map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.title}</td>
                  <td>{c.district}</td>
                  <td><span className="pill teal">{c.category || c.cat}</span></td>
                  <td><UrgencyPill votes={c.supporters || c.votes} /></td>
                  <td>
                    <Link className="btn ghost sm" to={`/university/challenges/${c.id}`}>
                      Review & Adopt
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Projects Quick View */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div className="row between" style={{ marginBottom: '1rem' }}>
          <div>
            <h3>Active Engineering Projects</h3>
            <p className="muted text-sm" style={{ margin: 0 }}>Projects currently underway in campus labs</p>
          </div>
          <Link className="btn ghost sm" to="/university/projects">
            Manage All Projects
          </Link>
        </div>

        <div className="grid">
          {projects.map(p => (
            <ProjectCard key={p.id} p={p} to={`/university/projects/${p.id}`} />
          ))}
        </div>
      </div>
    </>
  );
}

// ==========================================
// UNIVERSITY: CHALLENGES LIST
// ==========================================
export function UniChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');

  useEffect(() => {
    getChallenges().then(setChallenges);
  }, []);

  const filtered = challenges.filter(c => {
    const s = search.toLowerCase();
    const matchesSearch = !s || c.title.toLowerCase().includes(s) || (c.district || '').toLowerCase().includes(s);
    const matchesCat = !cat || c.cat === cat || c.category === cat;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <PageHead
        title="Community Challenges Pool"
        subtitle="Review verified societal problems and adopt them into university research & student capstones."
      />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div className="row" style={{ gap: '0.75rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              className="input"
              placeholder="Search challenges by title, location or keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2.25rem' }}
            />
            <Search size={16} aria-hidden="true" style={{ position: 'absolute', left: 12, top: 14, color: 'var(--text-muted)' }} />
          </div>
          <div style={{ width: 200 }}>
            <select className="select" value={cat} onChange={e => setCat(e.target.value)}>
              <option value="">All Categories</option>
              {['Water', 'Healthcare', 'Agriculture', 'Infrastructure', 'Education'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid">
        {filtered.map(c => (
          <article key={c.id} className="card col" style={{ gap: '0.75rem' }}>
            <div className="row between">
              <span className="pill teal">{c.category || c.cat}</span>
              <UrgencyPill votes={c.supporters || c.votes} />
            </div>
            <h3 style={{ margin: 0 }}>{c.title}</h3>
            <div className="row muted text-sm">
              <MapPin size={15} />
              <span>{c.area ? `${c.area}, ` : ''}{c.district}</span>
            </div>
            <p className="muted text-sm" style={{ margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {c.description || c.desc}
            </p>
            <div className="row between" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              <Link className="btn sm" to={`/university/challenges/${c.id}`}>
                View & Adopt Challenge
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

// ==========================================
// UNIVERSITY & COMPANY: PROJECTS LIST
// ==========================================
export function ProjectsPage({ role = 'university' }) {
  const [projects, setProjects] = useState([]);
  const [scopeFilter, setScopeFilter] = useState('mine');
  const isUni = role === 'university';
  const user = getCurrentUser();
  const activeInst = user?.institutionName || (isUni ? (localStorage.getItem('selectedUniversity') || 'BIT Mesra') : (localStorage.getItem('selectedCompany') || 'Tata CleanTech Innovations'));

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const myProjects = isUni
    ? projects.filter(p => (p.university || p.uni) === activeInst)
    : projects.filter(p => p.industry_partner === activeInst);

  const displayedProjects = scopeFilter === 'mine' ? (myProjects.length > 0 ? myProjects : projects) : projects;

  return (
    <>
      <PageHead
        title={isUni ? `${activeInst} — Adopted Projects` : `${activeInst} — Project Marketplace`}
        subtitle={isUni ? `Active research projects adopted by ${activeInst}.` : `Discover high-impact university tech projects available for sponsorship with ${activeInst}.`}
        action={
          isUni ? (
            <Link className="btn accent sm" to="/university/challenges">
              + Adopt Another Challenge
            </Link>
          ) : null
        }
      />

      {/* Scope Filter Tabs */}
      <div className="row" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          className={`pill ${scopeFilter === 'mine' ? 'navy' : 'grey'}`}
          onClick={() => setScopeFilter('mine')}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          {isUni ? `Adopted by ${activeInst} (${myProjects.length})` : `Sponsored by ${activeInst} (${myProjects.length})`}
        </button>
        <button
          className={`pill ${scopeFilter === 'all' ? 'navy' : 'grey'}`}
          onClick={() => setScopeFilter('all')}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          All Platform Projects ({projects.length})
        </button>
      </div>

      <div className="grid">
        {displayedProjects.map(p => (
          <ProjectCard key={p.id} p={p} to={`/${role}/projects/${p.id}`} />
        ))}
      </div>
    </>
  );
}

// ==========================================
// UNIVERSITY & COMPANY: PROJECT DETAIL
// ==========================================
export function ProjectDetailView({ role = 'university' }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [teams, setTeams] = useState([]);
  const [projectCollabs, setProjectCollabs] = useState([]);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [collabSent, setCollabSent] = useState(false);
  const [collabReason, setCollabReason] = useState('');
  const [supportTypes, setSupportTypes] = useState(['Technical Mentorship']);
  const [collabLeadName, setCollabLeadName] = useState('');
  const [collabLeadRole, setCollabLeadRole] = useState('Senior Project Lead');
  const [collabLeadEmail, setCollabLeadEmail] = useState('');
  const [collabLeadPhone, setCollabLeadPhone] = useState('');
  const isCompany = role === 'company';

  const loadProjectData = () => {
    getProject(id).then(p => {
      setProject(p);
      if (p) {
        const challengeId = p.challenge_id || p.id;
        getChallenge(challengeId).then(c => {
          if (c) setChallenge(c);
        });
      }
    });
    getTeams().then(all => {
      setTeams(all.filter(t => String(t.project_id) === String(id)));
    });

    Promise.all([
      getCollaborationRequests(),
      getCompanyCollaborations(4)
    ]).then(([allRequests, companyCollabs]) => {
      const collabs = (allRequests || []).filter(c => String(c.project_id) === String(id));
      setProjectCollabs(collabs);

      if (isCompany) {
        let isSent = false;
        try {
          if (localStorage.getItem(`collab_sent_4_${id}`) === 'true') {
            isSent = true;
          }
        } catch (e) { }

        if (!isSent && Array.isArray(companyCollabs)) {
          isSent = companyCollabs.some(c => String(c.project_id || c.projects?.id) === String(id));
        }

        if (!isSent && Array.isArray(collabs)) {
          isSent = collabs.some(c => String(c.company_id) === '4' || String(c.industry_partners?.id) === '4');
        }

        if (isSent) {
          setCollabSent(true);
        }
      }
    });
  };

  useEffect(() => {
    loadProjectData();
  }, [id]);

  const handleSendCollab = async () => {
    const user = getCurrentUser();
    const activeCo = user?.institutionName || localStorage.getItem('selectedCompany') || 'L&T Sustainable Infrastructure';
    try {
      localStorage.setItem(`collab_sent_4_${id}`, 'true');
    } catch (e) { }
    await requestCollaboration(id, 4, {
      company_name: activeCo,
      reason: collabReason,
      types: supportTypes,
      lead_name: collabLeadName || 'Rahul Gupta',
      lead_role: collabLeadRole || 'Senior Project Lead',
      lead_email: collabLeadEmail || 'rahul.gupta@company.com',
      lead_phone: collabLeadPhone || '+91 98765 43210'
    });
    setCollabSent(true);
    setShowCollabModal(false);
    loadProjectData();
  };

  const handleAcceptProjectCollab = async (collabId) => {
    await updateCollaborationRequest(collabId, 'Accepted');
    loadProjectData();
  };

  const handleRejectProjectCollab = async (collabId) => {
    await updateCollaborationRequest(collabId, 'Rejected');
    loadProjectData();
  };

  if (!project) return <div className="card" style={{ padding: '2rem' }}>Loading project...</div>;

  const pendingCollabs = projectCollabs.filter(c => c.status === 'Requested');

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isCompany ? 'Marketplace' : 'Projects', to: `/${role}/projects` },
          { label: project.title }
        ]}
      />

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
        <div className="row between" style={{ marginBottom: '0.75rem' }}>
          <span className="pill navy">{project.university || project.uni}</span>
          <span className="pill teal">{project.status}</span>
        </div>

        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>{project.title}</h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{project.description || project.desc}</p>

        <div style={{ marginTop: '1.5rem' }}>
          <div className="row between text-sm muted" style={{ marginBottom: '0.35rem' }}>
            <span>Project Milestones Progress</span>
            <b>{project.progress}%</b>
          </div>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
          </div>
        </div>

        <div className="row" style={{ marginTop: '1.5rem', gap: '0.5rem' }}>
          {(project.tags || []).map(t => <span key={t} className="pill grey">{t}</span>)}
        </div>
      </div>

      {/* Original Community Problem & Evidence Media Gallery */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
        <div className="row between" style={{ marginBottom: '1rem' }}>
          <h3>Original Community Problem & Evidence Media</h3>
          {challenge?.id && (
            <Link className="btn ghost sm" to={`/challenges/${challenge.id}`}>
              View Full Challenge Entry →
            </Link>
          )}
        </div>

        {challenge ? (
          <div className="col" style={{ gap: '1rem' }}>
            <div className="row muted text-sm" style={{ gap: '1.25rem', flexWrap: 'wrap' }}>
              {challenge.district && (
                <span className="row" style={{ gap: '0.35rem' }}>
                  <MapPin size={16} aria-hidden="true" />
                  <b>Location:</b> {challenge.area ? `${challenge.area}, ` : ''}{challenge.district}
                </span>
              )}
              {(challenge.affected_people || challenge.affected) && (
                <span className="row" style={{ gap: '0.35rem' }}>
                  <Users size={16} aria-hidden="true" />
                  <b>Affected Citizens:</b> {(challenge.affected_people || challenge.affected || 0).toLocaleString()}
                </span>
              )}
              {(challenge.supporters || challenge.votes) && (
                <span className="row" style={{ gap: '0.35rem' }}>
                  <ThumbsUp size={16} aria-hidden="true" />
                  <b>Community Votes:</b> {challenge.supporters || challenge.votes}
                </span>
              )}
            </div>

            <p style={{ margin: 0, lineHeight: 1.6 }}>
              {challenge.description || challenge.desc || project.description || project.desc}
            </p>

            {/* Media Gallery */}
            <div style={{ marginTop: '0.5rem' }}>
              <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Submitted Photo & Media Evidence</h4>
              {challenge.media && challenge.media.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                  {challenge.media.map((m, idx) => {
                    const isVideo = m.file_type?.startsWith('video/') || (m.file_url && m.file_url.match(/\.(mp4|webm|ogg)$/i));
                    return (
                      <div key={m.id || idx} className="card" style={{ padding: '0.5rem', background: 'var(--bg)', overflow: 'hidden' }}>
                        {isVideo ? (
                          <video
                            src={m.file_url}
                            controls
                            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                        ) : (
                          <img
                            src={m.file_url}
                            alt={`Evidence photo ${idx + 1}`}
                            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer' }}
                            onClick={() => window.open(m.file_url, '_blank')}
                          />
                        )}
                        <p className="text-sm muted" style={{ margin: '0.35rem 0 0 0', textAlign: 'center' }}>
                          {isVideo ? 'Video Evidence' : `Photo Evidence ${idx + 1}`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : challenge.image_url ? (
                <div style={{ maxWidth: '400px' }}>
                  <img
                    src={challenge.image_url}
                    alt="Challenge evidence"
                    style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </div>
              ) : (
                <p className="muted text-sm" style={{ margin: 0 }}>
                  No photos or video files attached to this challenge report.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="muted text-sm">Community challenge evidence details loaded directly from reported challenge.</p>
        )}
      </div>

      {/* Teams Assigned */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
        <div className="row between" style={{ marginBottom: '1rem' }}>
          <h3>Research & Student Teams</h3>
          {!isCompany && (
            <Link className="btn ghost sm" to="/university/teams">
              + Assign Team
            </Link>
          )}
        </div>

        {teams.length === 0 ? (
          <p className="muted">No student team assigned to this project yet.</p>
        ) : (
          <div className="grid">
            {teams.map(t => (
              <div key={t.id} className="card" style={{ background: 'var(--bg)', padding: '1rem' }}>
                <h4>{t.team_name}</h4>
                <p className="text-sm muted" style={{ margin: '0.25rem 0' }}>
                  <b>Students:</b> {t.student_count || (t.students || []).length} members
                </p>
                <p className="text-sm muted" style={{ margin: 0 }}>
                  <b>Faculty Mentors:</b> {t.faculty_count || (t.faculty || []).length} assigned
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collaboration / Industry Section */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h3>Industry Collaboration Status</h3>
        {project.industry_partner ? (
          <div className="row" style={{ gap: '0.75rem', marginTop: '0.5rem' }}>
            <CheckCircle2 color="var(--success)" size={20} />
            <span>Partnered with <b>{project.industry_partner}</b></span>
          </div>
        ) : (
          <div className="col" style={{ gap: '0.75rem', marginTop: '0.5rem' }}>
            <p className="muted">
              {project.looking ? `Currently looking for: ${project.looking}` : 'Open for industry collaboration, funding, and testing equipment.'}
            </p>
            {isCompany && (
              collabSent ? (
                <div className="pill green" style={{ width: 'fit-content', padding: '0.5rem 1rem' }}>
                  <Check size={16} /> Collaboration Request Submitted! The university will review soon.
                </div>
              ) : (
                <button className="btn accent" onClick={() => setShowCollabModal(true)}>
                  <Handshake size={16} aria-hidden="true" />
                  Request Collaboration With This Project
                </button>
              )
            )}
          </div>
        )}

        {/* University view: Pending Collaboration Requests for this project */}
        {!isCompany && pendingCollabs.length > 0 && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Incoming Sponsorship Requests for this Project</h4>
            <div className="col" style={{ gap: '0.75rem' }}>
              {pendingCollabs.map(req => {
                const compName = (req.industry_partners?.company_name && req.industry_partners.company_name !== 'Test Company')
                  ? req.industry_partners.company_name
                  : (req.company_name || localStorage.getItem('selectedCompany') || 'L&T Sustainable Infrastructure');
                const compInd = req.industry_partners?.industry || 'Infrastructure & Clean Tech';
                return (
                  <div key={req.id} className="card row between" style={{ background: 'var(--bg)', padding: '1rem' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>{compName}</h4>
                      <span className="pill purple text-sm" style={{ margin: '0.25rem 0' }}>{compInd}</span>
                      <p className="muted text-sm" style={{ margin: 0 }}>Requested industrial mentorship & co-sponsorship.</p>
                    </div>
                    <div className="row" style={{ gap: '0.5rem' }}>
                      <button className="btn sm" onClick={() => handleAcceptProjectCollab(req.id)}>
                        Accept Sponsorship
                      </button>
                      <button className="btn ghost sm danger" onClick={() => handleRejectProjectCollab(req.id)}>
                        Decline
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Collab Request Modal */}
      {showCollabModal && (
        <div className="modal-backdrop">
          <div className="modal-box" style={{ maxWidth: 580, maxHeight: '85vh', overflowY: 'auto' }}>
            <h3>Request Collaboration & Assign Project Lead</h3>
            <p className="muted text-sm" style={{ marginBottom: '0.75rem' }}>
              Assign a dedicated project engineer, mentor, or lead from your company to collaborate on <b>{project.title}</b>.
            </p>

            <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
              Project Lead / Dedicated Contact Details
            </h4>

            <div className="row" style={{ gap: '0.75rem' }}>
              <div className="form-field" style={{ flex: 1 }}>
                <label>Project Lead Name *</label>
                <input
                  className="input"
                  required
                  placeholder="e.g. Rahul Gupta"
                  value={collabLeadName}
                  onChange={e => setCollabLeadName(e.target.value)}
                />
              </div>

              <div className="form-field" style={{ flex: 1 }}>
                <label>Role / Designation *</label>
                <input
                  className="input"
                  required
                  placeholder="e.g. Senior Field Engineer"
                  value={collabLeadRole}
                  onChange={e => setCollabLeadRole(e.target.value)}
                />
              </div>
            </div>

            <div className="row" style={{ gap: '0.75rem' }}>
              <div className="form-field" style={{ flex: 1 }}>
                <label>Direct Lead Email *</label>
                <input
                  type="email"
                  className="input"
                  required
                  placeholder="rahul.gupta@company.com"
                  value={collabLeadEmail}
                  onChange={e => setCollabLeadEmail(e.target.value)}
                />
              </div>

              <div className="form-field" style={{ flex: 1 }}>
                <label>Direct Mobile / Phone</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="+91 98765 43210"
                  value={collabLeadPhone}
                  onChange={e => setCollabLeadPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="collab-why">Project Execution Plan & Proposal Note *</label>
              <textarea
                id="collab-why"
                className="textarea"
                rows={2}
                placeholder="Mention how your expertise or CSR will accelerate this project..."
                value={collabReason}
                onChange={e => setCollabReason(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Support Types Offered</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
                {['Technical Mentorship', 'Sensor & Hardware Resources', 'Testing & Fabrication', 'CSR Funding', 'Pilot Deployment'].map(type => (
                  <label key={type} className="row" style={{ gap: '0.5rem', cursor: 'pointer', background: 'var(--bg)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                    <input
                      type="checkbox"
                      checked={supportTypes.includes(type)}
                      onChange={e => {
                        if (e.target.checked) setSupportTypes([...supportTypes, type]);
                        else setSupportTypes(supportTypes.filter(x => x !== type));
                      }}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div
              className="row between"
              style={{
                marginTop: '1rem',
                paddingTop: '0.875rem',
                borderTop: '1px solid var(--border)',
                position: 'sticky',
                bottom: -1,
                background: 'var(--surface)',
                zIndex: 10
              }}
            >
              <button className="btn ghost" type="button" onClick={() => setShowCollabModal(false)}>
                Cancel
              </button>
              <button className="btn accent" type="button" onClick={handleSendCollab} style={{ padding: '0.65rem 1.25rem', fontWeight: 600 }}>
                Submit Collaboration Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// UNIVERSITY: TEAMS ROSTER & MANAGEMENT
// ==========================================
export function UniTeams() {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [studentCount, setStudentCount] = useState(2);
  const [students, setStudents] = useState([
    { name: '', roll_no: '', course: '' },
    { name: '', roll_no: '', course: '' }
  ]);
  const [facultyCount, setFacultyCount] = useState(1);
  const [faculty, setFaculty] = useState([
    { name: '', department: '', designation: '' }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    getTeams().then(setTeams);
    getProjects().then(setProjects);
  }, []);

  const handleStudentCount = (num) => {
    const c = Number(num);
    setStudentCount(c);
    setStudents(Array.from({ length: c }, (_, i) => students[i] || { name: '', roll_no: '', course: '' }));
  };

  const handleFacultyCount = (num) => {
    const c = Number(num);
    setFacultyCount(c);
    setFaculty(Array.from({ length: c }, (_, i) => faculty[i] || { name: '', department: '', designation: '' }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!teamName || !projectId) {
      alert('Please fill in team name and select a project.');
      return;
    }
    const created = await createTeam({
      team_name: teamName,
      project_id: projectId,
      student_count: studentCount,
      students,
      faculty_count: facultyCount,
      faculty
    });
    setTeams([created, ...teams]);
    setTeamName('');
    setShowAddForm(false);
    setToastMsg('Innovation Team created and assigned successfully!');
  };

  return (
    <>
      <PageHead
        title="Student Teams & Faculty Mentors"
        subtitle="Organize student research squads and assign multidisciplinary faculty advisors to projects."
        action={
          <button className="btn accent sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus size={16} aria-hidden="true" />
            {showAddForm ? 'Close Form' : 'Assign New Team'}
          </button>
        }
      />

      {toastMsg && (
        <div role="status" className="toast">
          <CheckCircle2 size={18} />
          {toastMsg}
        </div>
      )}

      {showAddForm && (
        <form className="card" onSubmit={handleCreate} style={{ marginBottom: '2rem', padding: '1.75rem' }}>
          <h3>Form New Project Team</h3>

          <div className="row" style={{ gap: '1rem', marginTop: '1rem' }}>
            <div className="form-field" style={{ flex: 1 }}>
              <label>Team Name *</label>
              <input
                className="input"
                placeholder="e.g. CleanWater IoT Innovation Squad"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                required
              />
            </div>

            <div className="form-field" style={{ flex: 1 }}>
              <label>Select Project *</label>
              <select className="select" value={projectId} onChange={e => setProjectId(e.target.value)} required>
                <option value="">Select project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Students config */}
          <div style={{ marginTop: '1rem' }}>
            <div className="row between" style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Student Members</label>
              <select className="select" style={{ width: 140 }} value={studentCount} onChange={e => handleStudentCount(e.target.value)}>
                {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Students</option>)}
              </select>
            </div>

            <div className="grid">
              {students.map((s, idx) => (
                <div key={idx} className="card" style={{ background: 'var(--bg)', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.5rem' }}>Student {idx + 1}</h5>
                  <input
                    className="input"
                    placeholder="Full Name"
                    style={{ marginBottom: '0.5rem' }}
                    value={s.name}
                    onChange={e => {
                      const copy = [...students];
                      copy[idx].name = e.target.value;
                      setStudents(copy);
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Roll Number"
                    style={{ marginBottom: '0.5rem' }}
                    value={s.roll_no}
                    onChange={e => {
                      const copy = [...students];
                      copy[idx].roll_no = e.target.value;
                      setStudents(copy);
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Course / Branch (e.g. B.Tech Mech)"
                    value={s.course}
                    onChange={e => {
                      const copy = [...students];
                      copy[idx].course = e.target.value;
                      setStudents(copy);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Faculty config */}
          <div style={{ marginTop: '1.5rem' }}>
            <div className="row between" style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 600 }}>Faculty Mentors</label>
              <select className="select" style={{ width: 140 }} value={facultyCount} onChange={e => handleFacultyCount(e.target.value)}>
                {[1, 2, 3].map(n => <option key={n} value={n}>{n} Mentor(s)</option>)}
              </select>
            </div>

            <div className="grid">
              {faculty.map((f, idx) => (
                <div key={idx} className="card" style={{ background: 'var(--bg)', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.5rem' }}>Faculty Advisor {idx + 1}</h5>
                  <input
                    className="input"
                    placeholder="Mentor Name"
                    style={{ marginBottom: '0.5rem' }}
                    value={f.name}
                    onChange={e => {
                      const copy = [...faculty];
                      copy[idx].name = e.target.value;
                      setFaculty(copy);
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Department"
                    style={{ marginBottom: '0.5rem' }}
                    value={f.department}
                    onChange={e => {
                      const copy = [...faculty];
                      copy[idx].department = e.target.value;
                      setFaculty(copy);
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Designation (e.g. Assoc. Prof)"
                    value={f.designation}
                    onChange={e => {
                      const copy = [...faculty];
                      copy[idx].designation = e.target.value;
                      setFaculty(copy);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="row" style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn accent">
              Save & Assign Team
            </button>
          </div>
        </form>
      )}

      {/* Roster of existing teams */}
      <div className="col" style={{ gap: '1.25rem' }}>
        {teams.map(t => (
          <article key={t.id} className="card" style={{ padding: '1.5rem' }}>
            <div className="row between" style={{ marginBottom: '0.75rem' }}>
              <h3>{t.team_name}</h3>
              <span className="pill navy">
                Project #{t.project_id}
              </span>
            </div>

            <div className="row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                  Student Innovators ({(t.students || []).length || t.student_count})
                </h4>
                <div className="col" style={{ gap: '0.35rem' }}>
                  {(t.students || []).map((s, i) => (
                    <div key={i} className="text-sm">
                      <b>{s.name || `Student ${i + 1}`}</b> — {s.roll_no ? `${s.roll_no} | ` : ''}{s.course || 'Engineering'}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                  Faculty Mentors ({(t.faculty || []).length || t.faculty_count})
                </h4>
                <div className="col" style={{ gap: '0.35rem' }}>
                  {(t.faculty || []).map((f, i) => (
                    <div key={i} className="text-sm">
                      <b>{f.name || `Mentor ${i + 1}`}</b> — {f.department ? `${f.department} ` : ''}({f.designation || 'Faculty'})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

// ==========================================
// UNIVERSITY: INDUSTRY PARTNERS & REQUESTS
// ==========================================
export function UniIndustry() {
  const [partners, setPartners] = useState([]);
  const [applications, setApplications] = useState([]);
  const [collabRequests, setCollabRequests] = useState([]);

  const loadAllData = () => {
    getIndustryPartners().then(setPartners);
    getIndustryPartnerApplications().then(setApplications);
    getCollaborationRequests().then(setCollabRequests);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleAcceptCollab = async (id) => {
    await updateCollaborationRequest(id, 'Accepted');
    loadAllData();
  };

  const handleRejectCollab = async (id) => {
    await updateCollaborationRequest(id, 'Rejected');
    loadAllData();
  };

  const handleApproveApp = async (id) => {
    await updatePartnerApplication(id, 'Accepted');
    loadAllData();
  };

  const handleRejectApp = async (id) => {
    await updatePartnerApplication(id, 'Rejected');
    loadAllData();
  };

  const pendingCollabs = collabRequests.filter(c => c.status === 'Requested');
  const acceptedCollabs = collabRequests.filter(c => c.status === 'Accepted');
  const pendingApps = applications.filter(a => a.status === 'Pending');
  const hasPending = pendingCollabs.length > 0 || pendingApps.length > 0;

  return (
    <>
      <PageHead
        title="Industry Partners & Collaboration Hub"
        subtitle="Manage incoming corporate sponsorship requests and approved enterprise research partners."
      />

      {/* SINGLE UNIFIED PENDING REQUESTS SECTION */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
        <h3>Pending Industry Requests</h3>
        <p className="muted text-sm" style={{ margin: '0.25rem 0 1rem' }}>
          Project sponsorship requests and new partner registration applications awaiting university review.
        </p>

        {!hasPending ? (
          <p className="muted text-sm" style={{ margin: 0 }}>No pending industry or partner requests at this time.</p>
        ) : (
          <div className="col" style={{ gap: '1rem' }}>
            {/* Project Collaboration Requests */}
            {pendingCollabs.map(req => {
              const compName = (req.industry_partners?.company_name && req.industry_partners.company_name !== 'Test Company')
                ? req.industry_partners.company_name
                : (req.company_name || localStorage.getItem('selectedCompany') || 'L&T Sustainable Infrastructure');
              const projTitle = req.projects?.title || req.project || 'University Research Project';
              const compInd = req.industry_partners?.industry || 'Clean Energy & Water';
              const leadName = req.lead_name || 'Rahul Gupta';
              const leadRole = req.lead_role || 'Senior Project Lead';
              const leadEmail = req.lead_email || 'rahul.gupta@company.com';
              const leadPhone = req.lead_phone || '+91 98765 43210';
              return (
                <div key={`collab-${req.id}`} className="card row between" style={{ background: 'var(--bg)', padding: '1.25rem' }}>
                  <div style={{ flex: 1 }}>
                    <div className="row" style={{ gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span className="pill navy text-sm">Project Sponsorship Request</span>
                      <span className="pill purple text-sm">{compInd}</span>
                    </div>
                    <h4 style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>{compName}</h4>
                    <p className="text-sm" style={{ margin: '0.25rem 0', color: 'var(--primary)' }}>
                      <b>Target Project to Back:</b> {projTitle}
                    </p>
                    {req.reason && (
                      <p className="text-sm muted" style={{ margin: '0.35rem 0', fontStyle: 'italic' }}>
                        <b>Proposal Plan:</b> "{req.reason}"
                      </p>
                    )}
                    {req.types && Array.isArray(req.types) && (
                      <div className="row" style={{ gap: '0.35rem', flexWrap: 'wrap', margin: '0.35rem 0' }}>
                        {req.types.map(t => <span key={t} className="pill grey text-sm">{t}</span>)}
                      </div>
                    )}
                    <div className="text-sm muted" style={{ marginTop: '0.5rem', borderTop: '1px dashed var(--border)', paddingTop: '0.5rem' }}>
                      <b>Dedicated Project Lead / Mentor:</b> {leadName} ({leadRole}) · Email: <b>{leadEmail}</b> · Phone: <b>{leadPhone}</b>
                    </div>
                  </div>
                  <div className="row" style={{ gap: '0.5rem', alignSelf: 'flex-start' }}>
                    <button className="btn sm" onClick={() => handleAcceptCollab(req.id)}>
                      Accept Collaboration
                    </button>
                    <button className="btn ghost sm danger" onClick={() => handleRejectCollab(req.id)}>
                      Decline
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Partner Registration Applications */}
            {pendingApps.map(app => (
              <div key={`app-${app.id}`} className="card row between" style={{ background: 'var(--bg)', padding: '1.25rem' }}>
                <div style={{ flex: 1 }}>
                  <div className="row" style={{ gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span className="pill amber text-sm">Partner Registration Application</span>
                    <span className="pill purple text-sm">{app.industry}</span>
                    {app.budget && <span className="pill teal text-sm">CSR Budget: {app.budget}</span>}
                  </div>
                  <h4 style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>{app.company_name}</h4>
                  {app.website && (
                    <a className="text-sm" href={app.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>
                      🌐 {app.website} {app.location ? `· 📍 ${app.location}` : ''}
                    </a>
                  )}
                  <p className="muted text-sm" style={{ margin: '0.35rem 0' }}><b>CSR & R&D Overview:</b> {app.description}</p>
                  <div className="text-sm muted" style={{ borderTop: '1px dashed var(--border)', paddingTop: '0.5rem' }}>
                    <b>Corporate Primary Liaison:</b> {app.contact_person} {app.designation ? `(${app.designation})` : ''} · Email: <b>{app.email}</b> {app.phone ? `· Phone: ${app.phone}` : ''}
                  </div>
                </div>
                <div className="row" style={{ gap: '0.5rem', alignSelf: 'flex-start' }}>
                  <button className="btn sm" onClick={() => handleApproveApp(app.id)}>
                    Accept Partner
                  </button>
                  <button className="btn ghost sm danger" onClick={() => handleRejectApp(app.id)}>
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Industry Partners & Active Collaborations */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3>Approved Industry Partners & Active Collaborations</h3>
        <p className="muted text-sm" style={{ margin: '0.25rem 0 1rem' }}>
          Companies actively backing university research projects with technical mentorship, equipment, or funding.
        </p>

        <div className="grid" style={{ marginTop: '1rem' }}>
          {/* Base Partners */}
          {partners.map(p => {
            const pName = (p.company_name && p.company_name !== 'Test Company') ? p.company_name : (localStorage.getItem('selectedCompany') || 'L&T Sustainable Infrastructure');
            return (
              <div key={p.id} className="card col" style={{ gap: '0.5rem' }}>
                <div className="row between">
                  <h4 style={{ margin: 0 }}>{pName}</h4>
                  <span className="pill green text-sm">Verified Partner</span>
                </div>
                <span className="pill purple" style={{ width: 'fit-content' }}>{p.industry}</span>
                {p.website && <span className="text-sm muted">🌐 {p.website}</span>}
                <p className="muted text-sm" style={{ margin: 0 }}>{p.description}</p>
                {p.budget && <div className="text-sm muted"><b>Grant Budget:</b> {p.budget}</div>}
                <div className="muted text-sm" style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                  <b>Corporate Liaison:</b> {p.contact_person} {p.designation ? `(${p.designation})` : ''} · {p.email}
                </div>
              </div>
            );
          })}

          {/* Accepted Collaboration Requests */}
          {acceptedCollabs.map(c => {
            const compName = (c.industry_partners?.company_name && c.industry_partners.company_name !== 'Test Company')
              ? c.industry_partners.company_name
              : (c.company_name || localStorage.getItem('selectedCompany') || 'L&T Sustainable Infrastructure');
            const projTitle = c.projects?.title || c.project || 'Active Research Project';
            const compInd = c.industry_partners?.industry || 'Clean Energy & Infrastructure';
            const leadName = c.lead_name || 'Rahul Gupta';
            const leadRole = c.lead_role || 'Senior Project Lead';
            const leadEmail = c.lead_email || 'rahul.gupta@company.com';
            const leadPhone = c.lead_phone || '+91 98765 43210';
            return (
              <div key={`accepted-collab-${c.id}`} className="card col" style={{ gap: '0.5rem', borderLeft: '4px solid var(--success)' }}>
                <div className="row between">
                  <h4 style={{ margin: 0 }}>{compName}</h4>
                  <span className="pill green text-sm">Active Sponsor</span>
                </div>
                <span className="pill purple" style={{ width: 'fit-content' }}>{compInd}</span>
                <p className="text-sm" style={{ margin: '0.25rem 0' }}>
                  <b>Sponsoring Project:</b> {projTitle}
                </p>
                {c.reason && (
                  <p className="muted text-sm" style={{ margin: 0 }}>
                    <b>Proposal Note:</b> "{c.reason}"
                  </p>
                )}
                {c.types && Array.isArray(c.types) && (
                  <div className="row" style={{ gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    {c.types.map(t => <span key={t} className="pill grey text-sm">{t}</span>)}
                  </div>
                )}
                <div className="muted text-sm" style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                  <b>Project Lead:</b> {leadName} ({leadRole}) · {leadEmail} · {leadPhone}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ==========================================
// UNIVERSITY: PROGRESS REPORTS & MILESTONES
// ==========================================
export function UniReports() {
  const milestones = [
    { title: 'Field Survey & Sensor Baseline', status: 'Completed', date: '10 Sep 2026' },
    { title: 'Low-cost Prototype Fabrication', status: 'In Progress', date: 'Target: 30 Sep 2026' },
    { title: 'Field Testing & Panchayat Handoff', status: 'Upcoming', date: 'Target: 20 Oct 2026' }
  ];
  const [msIndex, setMsIndex] = useState(1);
  const [progressVal, setProgressVal] = useState(55);
  const [logText, setLogText] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const handlePostUpdate = (e) => {
    e.preventDefault();
    setToastMsg('Progress update verified and added to public ledger!');
    setLogText('');
  };

  return (
    <>
      <PageHead
        title="Project Milestone Reports"
        subtitle="Submit verified technical progress logs that citizens and industry sponsors can audit."
      />

      {toastMsg && (
        <div role="status" className="toast">
          <CheckCircle2 size={18} />
          {toastMsg}
        </div>
      )}

      {/* Visual Milestone Pipeline */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
        <h3>Active Milestone Pipeline</h3>
        <div className="grid" style={{ marginTop: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {milestones.map((m, i) => (
            <div key={m.title} className="card" style={{ background: i === msIndex ? 'color-mix(in srgb, var(--primary) 8%, var(--surface))' : 'var(--bg)' }}>
              <div className="row between" style={{ marginBottom: '0.5rem' }}>
                <span className="text-sm muted">Phase 0{i + 1}</span>
                <span className={`pill ${i === 0 ? 'green' : i === 1 ? 'teal' : 'grey'}`}>
                  {m.status}
                </span>
              </div>
              <h4 style={{ margin: 0 }}>{m.title}</h4>
              <span className="text-sm muted">{m.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Update Submission Form */}
      <form className="card" onSubmit={handlePostUpdate} style={{ padding: '1.75rem' }}>
        <h3>Log Progress Update</h3>

        <div className="form-field" style={{ marginTop: '1rem' }}>
          <label>Select Current Milestone</label>
          <select className="select" value={msIndex} onChange={e => setMsIndex(Number(e.target.value))}>
            {milestones.map((m, i) => (
              <option key={m.title} value={i}>{m.title}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <div className="row between">
            <label>Phase Completion Percentage</label>
            <b>{progressVal}%</b>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progressVal}
            onChange={e => setProgressVal(e.target.value)}
            style={{ width: '100%', margin: '0.5rem 0' }}
          />
        </div>

        <div className="form-field">
          <label>Engineering & Field Work Log *</label>
          <textarea
            className="textarea"
            rows={4}
            placeholder="Document what lab tests were conducted, components assembled, or community feedback gathered..."
            value={logText}
            onChange={e => setLogText(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Upload Photographic / Test Proof</label>
          <input type="file" multiple className="input" />
        </div>

        <button type="submit" className="btn accent">
          Publish Verified Progress Log
        </button>
      </form>
    </>
  );
}

// ==========================================
// COMPANY: DASHBOARD & COLLABORATIONS
// ==========================================
export function CoDash() {
  const [projects, setProjects] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const user = getCurrentUser();
  const activeCo = user?.institutionName || localStorage.getItem('selectedCompany') || 'Tata CleanTech Innovations';

  useEffect(() => {
    getProjects().then(setProjects);
    getCompanyCollaborations(4).then(setCollabs);
  }, []);

  const myCollaborations = projects.filter(p => p.industry_partner === activeCo);

  return (
    <>
      <PageHead
        title={`${activeCo} — Industry Dashboard`}
        subtitle={`Welcome, ${activeCo} Enterprise Portal. Sponsor, mentor and deploy high-impact civic technologies created by university teams.`}
      />

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <StatCard label="Platform Projects" value={projects.length} Icon={FolderKanban} />
        <StatCard label={`${activeCo} Collaborations`} value={myCollaborations.length > 0 ? myCollaborations.length : collabs.filter(c => c.status === 'Accepted').length} Icon={Handshake} />
        <StatCard label="Pending Partnership Requests" value={collabs.filter(c => c.status === 'Requested').length} Icon={Clock} />
      </div>

      <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div className="row between" style={{ marginBottom: '1rem' }}>
          <h3>Recommended Projects for Collaboration</h3>
          <Link className="btn ghost sm" to="/company/projects">
            Marketplace
          </Link>
        </div>

        <div className="grid">
          {projects.slice(0, 3).map(p => (
            <ProjectCard key={p.id} p={p} to={`/company/projects/${p.id}`} />
          ))}
        </div>
      </div>
    </>
  );
}

export function CoCollaborations() {
  const [collabs, setCollabs] = useState([]);

  useEffect(() => {
    getCompanyCollaborations(4).then(setCollabs);
  }, []);

  return (
    <>
      <PageHead
        title="My Industry Collaborations"
        subtitle="Track the status of university projects your company has requested to back."
      />

      <div className="card" style={{ padding: '1.5rem' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Requested Date</th>
                <th>Collaboration Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collabs.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.project || c.projects?.title}</td>
                  <td>{c.date || 'Recent'}</td>
                  <td><CollabPill status={c.status} /></td>
                  <td>
                    <Link className="btn ghost sm" to={`/company/projects/${c.project_id || 1}`}>
                      View Project
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function CoApply() {
  const [form, setForm] = useState({
    company_name: '',
    industry: 'Clean Energy & Water',
    website: '',
    location: '',
    description: '',
    budget: '₹25L - ₹1 Cr / year',
    contact_person: '',
    designation: 'Head of CSR & R&D',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await applyIndustryPartner(form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card col center" style={{ maxWidth: 540, margin: '2rem auto', padding: '2.5rem', textAlign: 'center' }}>
        <CheckCircle2 size={48} color="var(--success)" />
        <h2>Application Submitted</h2>
        <p className="muted">
          Your company application has been sent for platform verification. Once approved, your enterprise profile will be visible to university teams for mentorship & funding.
        </p>
        <Link className="btn" to="/company">Go to Industry Dashboard</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <PageHead
        title="Register as Industry Innovation Partner"
        subtitle="Join our network of forward-thinking corporate, CSR and R&D partners."
      />

      <form className="card" onSubmit={handleSubmit} style={{ padding: '1.75rem' }}>
        <div className="row" style={{ gap: '1rem' }}>
          <div className="form-field" style={{ flex: 1 }}>
            <label>Company / Organization Name *</label>
            <input className="input" required value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} placeholder="e.g. Larsen & Toubro Sustainable Infra" />
          </div>

          <div className="form-field" style={{ flex: 1 }}>
            <label>Industry Domain *</label>
            <select className="select" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
              {['Clean Energy & Water', 'Agriculture & Logistics', 'Healthcare & Biotech', 'Civil & Materials', 'IoT & IT Systems', 'Defense & Aerospace'].map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row" style={{ gap: '1rem' }}>
          <div className="form-field" style={{ flex: 1 }}>
            <label>Official Corporate Website</label>
            <input className="input" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://www.company.com" />
          </div>

          <div className="form-field" style={{ flex: 1 }}>
            <label>Headquarters Location</label>
            <input className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Mumbai, MH" />
          </div>
        </div>

        <div className="form-field">
          <label>Company Focus & CSR Overview *</label>
          <textarea className="textarea" rows={3} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Detail your corporate R&D focus, CSR initiatives, and domain expertise..." />
        </div>

        <div className="form-field">
          <label>Annual CSR / Innovation Grant Budget</label>
          <select className="select" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
            {['< ₹10 Lakhs / year', '₹10L - ₹25L / year', '₹25L - ₹1 Cr / year', '₹1 Cr+ / year'].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <h4 style={{ margin: '1.25rem 0 0.5rem 0', fontSize: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          Primary Corporate Contact & Liaison
        </h4>

        <div className="row" style={{ gap: '1rem' }}>
          <div className="form-field" style={{ flex: 1 }}>
            <label>Liaison Contact Person *</label>
            <input className="input" required value={form.contact_person} onChange={e => setForm({ ...form, contact_person: e.target.value })} placeholder="Full Name" />
          </div>

          <div className="form-field" style={{ flex: 1 }}>
            <label>Designation / Title</label>
            <input className="input" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="e.g. VP - Corporate Alliances" />
          </div>
        </div>

        <div className="row" style={{ gap: '1rem' }}>
          <div className="form-field" style={{ flex: 1 }}>
            <label>Official Corporate Email *</label>
            <input type="email" className="input" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="corporate@company.com" />
          </div>

          <div className="form-field" style={{ flex: 1 }}>
            <label>Office Contact Phone</label>
            <input type="tel" className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
          </div>
        </div>

        <button type="submit" className="btn accent" style={{ marginTop: '1rem' }}>
          Submit Partner Registration Application
        </button>
      </form>
    </div>
  );
}

// ==========================================
// AUTH: LOGIN & REGISTER
// ==========================================
export function Login() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'citizen';
  const isRequired = searchParams.get('required') === '1';

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [universityName, setUniversityName] = useState(
    localStorage.getItem('selectedUniversity') || 'BIT Mesra'
  );
  const [companyName, setCompanyName] = useState(
    localStorage.getItem('selectedCompany') || 'Tata CleanTech Innovations'
  );
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const r = searchParams.get('role');
    if (r) setRole(r);
  }, [searchParams]);

  const defaultUniversities = [
    'BIT Mesra',
    'IIT (ISM) Dhanbad',
    'NIT Jamshedpur',
    'Ranchi University',
    'Tata Institute of Social Sciences'
  ];

  const defaultCompanies = [
    'Tata CleanTech Innovations',
    'AgriTech Solutions',
    'L&T Sustainable Infrastructure',
    'Jindal Clean Energy',
    'Reliance Foundation Tech'
  ];

  const handleLogin = async (e) => {
    e?.preventDefault();
    const loginEmail = email || (role === 'university' ? 'research@university.edu.in' : role === 'company' ? 'contact@cleantech.com' : 'user@domain.gov.in');
    const loginPw = password || 'password123';
    let instName = '';

    if (role === 'university') {
      instName = universityName || 'BIT Mesra';
      localStorage.setItem('selectedUniversity', instName);
      localStorage.setItem('activeInstitution', instName);
    } else if (role === 'company') {
      instName = companyName || 'Tata CleanTech Innovations';
      localStorage.setItem('selectedCompany', instName);
      localStorage.setItem('activeInstitution', instName);
    }

    await loginUser(loginEmail, loginPw, role, instName);
    if (role === 'university') navigate('/university');
    else if (role === 'company') navigate('/company');
    else navigate('/');
  };

  const handleQuickUniSelect = (uni) => {
    setUniversityName(uni);
    setEmail(`research@${uni.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.in`);
    setPassword('password123');
  };

  const handleQuickCoSelect = (co) => {
    setCompanyName(co);
    setEmail(`contact@${co.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`);
    setPassword('password123');
  };

  const getPortalMeta = () => {
    if (role === 'university') {
      return {
        icon: '🏛️',
        title: 'University & R&D Portal Login',
        subtitle: 'Sign in as a higher education lab or faculty mentor to adopt community challenges.',
        activeLabel: `Selected University: ${universityName || 'BIT Mesra'}`,
        badgeClass: 'navy'
      };
    }
    if (role === 'company') {
      return {
        icon: '🏢',
        title: 'Industry Partner Login',
        subtitle: 'Sign in as a corporate enterprise to sponsor university prototypes and offer grants.',
        activeLabel: `Selected Company: ${companyName || 'Tata CleanTech Innovations'}`,
        badgeClass: 'teal'
      };
    }
    return {
      icon: '👥',
      title: 'Citizen & Community Login',
      subtitle: 'Sign in to report societal challenges, track progress, and vote for local priorities.',
      activeLabel: '',
      badgeClass: 'grey'
    };
  };

  const meta = getPortalMeta();

  return (
    <div style={{ maxWidth: 520, margin: '2rem auto' }}>
      <form className="card" onSubmit={handleLogin} style={{ padding: '2rem' }}>
        {isRequired && (
          <div className="card" style={{ background: 'color-mix(in srgb, var(--accent) 12%, var(--surface))', borderColor: 'var(--accent)', padding: '1rem', marginBottom: '1.25rem' }}>
            <div className="row" style={{ gap: '0.5rem', fontWeight: 600, color: 'var(--accent)' }}>
              <span>🔒 Authentication Compulsory</span>
            </div>
            <p className="text-sm muted" style={{ margin: '0.35rem 0 0 0', lineHeight: 1.4 }}>
              Access to the {role === 'university' ? 'University Research Portal' : 'Industry Partner Portal'} requires logging in with a {role === 'university' ? 'University' : 'Corporate'} profile.
            </p>
          </div>
        )}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '2rem' }}>{meta.icon}</span>
          <h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0' }}>{meta.title}</h1>
          <p className="muted text-sm" style={{ margin: 0, lineHeight: 1.5 }}>
            {meta.subtitle}
          </p>
        </div>

        {/* Role Selection Tabs (Only displayed on general public login) */}
        {!searchParams.has('role') && (
          <div role="radiogroup" aria-label="Portal Role" className="row" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
            {[
              { id: 'citizen', label: '👥 Citizen' },
              { id: 'university', label: '🏛️ University' },
              { id: 'company', label: '🏢 Industry' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                className={`btn sm ${role === r.id ? '' : 'ghost'}`}
                style={{ flex: 1 }}
                onClick={() => {
                  setRole(r.id);
                  setError('');
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}

        {/* University Profile Selector */}
        {role === 'university' && (
          <div className="card" style={{ background: 'var(--bg)', padding: '1.25rem', marginBottom: '1.25rem', border: '1px solid var(--border)' }}>
            <div className="row between" style={{ marginBottom: '0.75rem' }}>
              <span className="text-sm" style={{ fontWeight: 600 }}>University Institution Profile</span>
              <span className="pill navy text-sm">{universityName || 'BIT Mesra'}</span>
            </div>

            <p className="muted text-sm" style={{ marginBottom: '0.75rem' }}>
              Quick select a university for testing or type a custom institution name below:
            </p>

            <div className="row" style={{ gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
              {defaultUniversities.map(u => (
                <button
                  key={u}
                  type="button"
                  className={`pill ${universityName === u ? 'navy' : 'grey'}`}
                  style={{ cursor: 'pointer', border: 'none' }}
                  onClick={() => handleQuickUniSelect(u)}
                >
                  {universityName === u ? `✓ ${u}` : u}
                </button>
              ))}
            </div>

            <div className="form-field" style={{ marginBottom: 0 }}>
              <label htmlFor="login-uni-custom" style={{ fontSize: '0.85rem', fontWeight: 600 }}>University / College Name (Editable)</label>
              <input
                id="login-uni-custom"
                type="text"
                className="input"
                value={universityName}
                onChange={e => setUniversityName(e.target.value)}
                placeholder="e.g. BIT Mesra, IIT Dhanbad, or custom university..."
              />
            </div>
          </div>
        )}

        {/* Industry / Company Profile Selector */}
        {role === 'company' && (
          <div className="card" style={{ background: 'var(--bg)', padding: '1.25rem', marginBottom: '1.25rem', border: '1px solid var(--border)' }}>
            <div className="row between" style={{ marginBottom: '0.75rem' }}>
              <span className="text-sm" style={{ fontWeight: 600 }}>Industry Partner Profile</span>
              <span className="pill teal text-sm">{companyName || 'Tata CleanTech'}</span>
            </div>

            <p className="muted text-sm" style={{ marginBottom: '0.75rem' }}>
              Quick select a corporate partner for testing or type a custom company name below:
            </p>

            <div className="row" style={{ gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
              {defaultCompanies.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`pill ${companyName === c ? 'teal' : 'grey'}`}
                  style={{ cursor: 'pointer', border: 'none' }}
                  onClick={() => handleQuickCoSelect(c)}
                >
                  {companyName === c ? `✓ ${c}` : c}
                </button>
              ))}
            </div>

            <div className="form-field" style={{ marginBottom: 0 }}>
              <label htmlFor="login-co-custom" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Industry Partner / Enterprise Name (Editable)</label>
              <input
                id="login-co-custom"
                type="text"
                className="input"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Tata CleanTech, L&T Infra, or custom company..."
              />
            </div>
          </div>
        )}

        {error && (
          <div className="card" style={{ background: 'color-mix(in srgb, var(--danger) 10%, var(--surface))', borderColor: 'var(--danger)', padding: '0.75rem', marginBottom: '1rem' }}>
            <span className="field-error">{error}</span>
          </div>
        )}

        <div className="form-field">
          <label htmlFor="login-email">Account Email Address</label>
          <input
            id="login-email"
            type="email"
            className="input"
            placeholder={role === 'university' ? 'research@university.edu.in' : role === 'company' ? 'contact@cleantech.com' : 'name@domain.gov.in'}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="login-pw">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="login-pw"
              type={showPw ? 'text' : 'password'}
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{ position: 'absolute', right: 10, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn accent" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
          {role === 'university'
            ? `Sign In as ${universityName || 'University'} Research Lab`
            : role === 'company'
            ? `Sign In as ${companyName || 'Industry Partner'}`
            : 'Sign In as Citizen'}
        </button>

        <p className="muted text-sm" style={{ textAlign: 'center', marginTop: '1.25rem', marginBottom: 0 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export function Register() {
  const [role, setRole] = useState('citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, role);
    if (role === 'university') navigate('/university');
    else if (role === 'company') navigate('/company');
    else navigate('/');
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <form className="card" onSubmit={handleRegister} style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', textAlign: 'center' }}>Create Account</h1>
        <p className="muted text-sm" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Register to participate in community problem solving
        </p>

        <div className="row" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['citizen', 'university', 'company'].map(r => (
            <button
              key={r}
              type="button"
              className={`btn sm ${role === r ? '' : 'ghost'}`}
              style={{ flex: 1, textTransform: 'capitalize' }}
              onClick={() => setRole(r)}
            >
              {r === 'company' ? 'Industry' : r}
            </button>
          ))}
        </div>

        <div className="form-field">
          <label>Full Name / Department</label>
          <input className="input" required value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Official Email</label>
          <input type="email" className="input" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Create Password</label>
          <input type="password" className="input" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn accent" style={{ width: '100%', marginTop: '0.5rem' }}>
          Create {role === 'company' ? 'Industry' : role} Account
        </button>

        <p className="muted text-sm" style={{ textAlign: 'center', marginTop: '1.25rem', marginBottom: 0 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

// ==========================================
// STATIC & INFORMATIONAL PAGES
// ==========================================
export function HowItWorks() {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: 'How It Works' }]} />
      <PageHead
        title="How the Societal Innovation Platform Works"
        subtitle="A transparent, government-backed bridge connecting grassroots civic problems with academic engineering and corporate funding."
      />

      <div className="col" style={{ gap: '1.5rem' }}>
        {[
          {
            step: '01',
            title: 'Grassroots Community Reporting',
            desc: 'Citizens, village panchayats, and civic groups post local challenges with geotagged locations, photos, and estimated citizen impact. Fellow residents vote to indicate urgency.'
          },
          {
            step: '02',
            title: 'University Adoption & Lab R&D',
            desc: 'Leading engineering colleges, IITs, and NITs discover verified challenges matching their technical domains (water purification, civil bridges, solar storage). Faculty mentors adopt problems into capstones.'
          },
          {
            step: '03',
            title: 'Industry Partner Collaboration',
            desc: 'Enterprises and CSR foundations pledge financial grants, equipment, sensors, or manufacturing facilities to university teams through standardized collaboration agreements.'
          },
          {
            step: '04',
            title: 'Field Validation & Public Deployment',
            desc: 'Solutions are tested on-site with community feedback. Progress is logged on an open milestone tracker, ensuring complete public accountability.'
          }
        ].map(item => (
          <div key={item.step} className="card row" style={{ gap: '1.5rem', padding: '1.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{item.step}</span>
            <div>
              <h3 style={{ margin: '0 0 0.35rem' }}>{item.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: 'About' }]} />
      <PageHead
        title="About Societal Innovation Platform"
        subtitle="Empowering communities through science, technology, and cross-sector collaboration."
      />
      <div className="card col" style={{ gap: '1.25rem', padding: '2rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
        <p>
          The Societal Innovation Platform is an open digital governance initiative designed in accordance with the <b>Guidelines for Indian Government Websites (GIGW 3.0)</b> and the Digital India Mission.
        </p>
        <p>
          Too often, vital academic research remains confined to journals, while rural and peri-urban communities struggle with real infrastructure, sanitation, and water challenges. This platform bridges that gap by creating an institutional funnel: Community Problem → University Engineering → Industry Scale → Public Benefit.
        </p>
        <div className="row" style={{ gap: '1rem', marginTop: '0.5rem' }}>
          <span className="pill green">100% Open Data</span>
          <span className="pill navy">GIGW 3.0 Compliant</span>
          <span className="pill teal">WCAG 2.1 AA Accessible</span>
        </div>
      </div>
    </div>
  );
}

export function Accessibility() {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: 'Accessibility Statement' }]} />
      <PageHead
        title="Accessibility Statement"
        subtitle="Our commitment to universal digital inclusion under WCAG 2.1 Level AA and GIGW 3.0."
      />
      <div className="card col" style={{ gap: '1.25rem', padding: '2rem' }}>
        <p>
          We are committed to ensuring that the Societal Innovation Platform is fully accessible to all individuals, including persons with visual, auditory, cognitive, and motor impairments.
        </p>
        <h4>Key Accessibility Features:</h4>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><b>Text Size Controls:</b> Dynamic scaling (A-, A, A+) without breaking layouts.</li>
          <li><b>High Contrast Mode:</b> Dedicated zero-glare maximum contrast color scheme.</li>
          <li><b>Full Keyboard Navigability:</b> Skip links, logical tab order, and visible 2px accent focus rings.</li>
          <li><b>Bilingual Interface:</b> Standardized English and Hindi support across core user flows.</li>
          <li><b>ARIA Landmarks:</b> Descriptive roles on headers, navigation, main sections, and status pills.</li>
        </ul>
      </div>
    </div>
  );
}

export function Help() {
  const faqs = [
    { q: 'Who can submit a community challenge?', a: 'Any citizen, community leader, panchayat representative, or civic group can submit a localized challenge.' },
    { q: 'How do universities adopt problems?', a: 'Accredited university faculty and research institutions log into the University Portal, review verified problems, and click "Take Up Challenge" to create a capstone project.' },
    { q: 'How can corporate and industry partners participate?', a: 'Companies can register as Industry Partners to browse the Project Marketplace and sponsor projects with CSR funds, technical mentorship, or sensor hardware.' },
    { q: 'How do citizens track what happens next?', a: 'Every submission generates an official Tracking ID (e.g., SIP-100245). You can enter this on the /track page to see the 8-stage lifecycle tracker update in real-time.' }
  ];
  const [open, setOpen] = useState(0);

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: 'Help & FAQs' }]} />
      <PageHead title="Help & Frequently Asked Questions" subtitle="Find answers on submitting problems, university adoption, and tracking progress." />

      <div className="col" style={{ gap: '0.75rem' }}>
        {faqs.map((f, i) => (
          <div key={i} className="card" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={() => setOpen(open === i ? -1 : i)}>
            <div className="row between">
              <h4 style={{ margin: 0 }}>{f.q}</h4>
              {open === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {open === i && (
              <p className="muted text-sm" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StaticLegal({ title }) {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <Breadcrumbs items={[{ label: title }]} />
      <PageHead title={title} subtitle="Official government guidelines and terms of use." />
      <div className="card" style={{ padding: '2rem' }}>
        <p className="muted">
          All data submitted to this platform is protected under Digital Personal Data Protection standards. Community submissions must not contain personal health identifiers or abusive material.
        </p>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <EmptyBox
      title="404 — Page Not Found"
      subtitle="The page you requested could not be located. It may have moved or been archived."
      action={<Link className="btn" to="/">Return to Homepage</Link>}
    />
  );
}

// ==========================================
// UI COMPONENT KIT DEMO (/_kit)
// ==========================================
export function KitDemo() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <PageHead title="UI Component Kit & Design Tokens" subtitle="Storybook-style showcase for accessibility & visual QA." />

      {/* Buttons */}
      <section className="card col" style={{ gap: '1rem', marginBottom: '2rem', padding: '1.5rem' }}>
        <h3>Buttons System</h3>
        <div className="row" style={{ gap: '1rem' }}>
          <button className="btn">Primary Action</button>
          <button className="btn accent">Primary Highlight (CTA)</button>
          <button className="btn ghost">Secondary Ghost</button>
          <button className="btn danger">Danger Button</button>
          <button className="btn sm">Small Button</button>
          <button className="btn" disabled>Disabled</button>
        </div>
      </section>

      {/* Pills */}
      <section className="card col" style={{ gap: '1rem', marginBottom: '2rem', padding: '1.5rem' }}>
        <h3>Status & Role Pills</h3>
        <div className="row" style={{ gap: '0.75rem' }}>
          <StatusPill step={1} statusText="Under Review" />
          <StatusPill step={3} statusText="Taken Up" />
          <StatusPill step={5} statusText="In Progress" />
          <StatusPill step={7} statusText="Completed" />
          <UrgencyPill votes={14} />
          <UrgencyPill votes={7} />
          <UrgencyPill votes={2} />
          <CollabPill status="Requested" />
          <CollabPill status="Accepted" />
          <span className="role-chip citizen">Citizen</span>
          <span className="role-chip university">University</span>
          <span className="role-chip industry">Industry</span>
        </div>
      </section>

      {/* Lifecycle Tracker */}
      <section className="card col" style={{ gap: '1rem', marginBottom: '2rem', padding: '1.5rem' }}>
        <h3>Lifecycle Tracker (Signature UX Element)</h3>
        <LifecycleTracker step={3} horizontal />
      </section>
    </div>
  );
}
