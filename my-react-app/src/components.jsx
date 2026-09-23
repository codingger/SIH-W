import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Check,
  Circle,
  Clock,
  Users,
  ThumbsUp,
  MapPin,
  LayoutDashboard,
  ListChecks,
  FolderKanban,
  UsersRound,
  Handshake,
  FileBarChart,
  Store,
  Landmark,
  Building2,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { STEPS, TRANSLATIONS } from './data.js';
import { supportChallenge, getCurrentUser, logoutUser } from './api.js';

export const Emblem = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Platform National Emblem">
    <circle cx="24" cy="24" r="22" fill="none" stroke="#1F3A93" strokeWidth="2" />
    <circle cx="24" cy="24" r="6" fill="#E8710A" />
    {Array.from({ length: 12 }).map((_, i) => (
      <line
        key={i}
        x1="24"
        y1="24"
        x2={24 + 17 * Math.cos((i * Math.PI) / 6)}
        y2={24 + 17 * Math.sin((i * Math.PI) / 6)}
        stroke="#1F3A93"
        strokeWidth="1.5"
      />
    ))}
    <circle cx="24" cy="24" r="17" fill="none" stroke="#138808" strokeWidth="2" />
  </svg>
);

export const FlowDiagram = () => (
  <svg viewBox="0 0 360 340" role="img" aria-labelledby="flowDesc" style={{ width: '100%', maxWidth: 380 }}>
    <title id="flowDesc">
      Problem reported by community, adopted by university research teams, accelerated by industry, solution deployed to society.
    </title>
    {[
      { label: 'Community', sub: 'Identifies & votes on local challenges', color: '#0F766E' },
      { label: 'University', sub: 'Faculty & students adopt as project', color: '#1F3A93' },
      { label: 'Industry', sub: 'Provides mentorship, tech & funding', color: '#6D28D9' },
      { label: 'Solution', sub: 'Validated & deployed on the ground', color: '#138808' }
    ].map((step, i) => (
      <g key={step.label}>
        <rect
          x="40"
          y={10 + i * 82}
          width="280"
          height="58"
          rx="8"
          fill="var(--surface)"
          stroke={step.color}
          strokeWidth="2"
        />
        <text x="180" y={35 + i * 82} textAnchor="middle" fill="var(--text)" fontSize="16" fontWeight="700">
          {step.label}
        </text>
        <text x="180" y={53 + i * 82} textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="500">
          {step.sub}
        </text>
        {i < 3 && (
          <path
            d={`M180 ${68 + i * 82} v14`}
            stroke="var(--text-muted)"
            strokeWidth="2"
            markerEnd="url(#flowArrow)"
          />
        )}
      </g>
    ))}
    <defs>
      <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0 0L8 4L0 8z" fill="var(--text-muted)" />
      </marker>
    </defs>
  </svg>
);

export const EmptyIcon = () => (
  <svg width="80" height="80" viewBox="0 0 96 96" aria-hidden="true" style={{ margin: '0 auto 1rem' }}>
    <rect x="14" y="22" width="68" height="52" rx="8" fill="none" stroke="var(--border)" strokeWidth="3" />
    <path d="M14 42h68" stroke="var(--border)" strokeWidth="3" />
    <circle cx="48" cy="60" r="10" fill="none" stroke="var(--text-muted)" strokeWidth="3" />
    <path d="M48 56v8" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function StatusPill({ step, statusText }) {
  let color = 'teal';
  let label = statusText || 'In Progress';
  let Icon = Clock;

  if (step <= 1 || statusText === 'Under Review' || statusText === 'Submitted') {
    color = 'amber';
    label = statusText || 'Under Review';
    Icon = Clock;
  } else if (step <= 3 || statusText === 'Taken Up' || statusText === 'Adopted') {
    color = 'navy';
    label = statusText || 'Taken Up';
    Icon = Check;
  } else if (step < 7 || statusText === 'In Development' || statusText === 'In Progress') {
    color = 'teal';
    label = statusText || 'In Progress';
    Icon = Clock;
  } else {
    color = 'green';
    label = statusText || 'Completed';
    Icon = Check;
  }

  return (
    <span className={`pill ${color}`}>
      <Icon size={13} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

export function UrgencyPill({ votes = 0 }) {
  const count = Number(votes) || 0;
  if (count >= 10) {
    return (
      <span className="pill red">
        <AlertCircle size={13} aria-hidden="true" />
        High priority ({count})
      </span>
    );
  }
  if (count >= 5) {
    return (
      <span className="pill amber">
        <Clock size={13} aria-hidden="true" />
        Medium priority ({count})
      </span>
    );
  }
  return (
    <span className="pill grey">
      <Check size={13} aria-hidden="true" />
      Low priority ({count})
    </span>
  );
}

export function CollabPill({ status }) {
  const map = {
    Requested: { cls: 'amber', icon: Clock },
    Accepted: { cls: 'green', icon: Check },
    Rejected: { cls: 'red', icon: AlertCircle }
  };
  const item = map[status] || { cls: 'grey', icon: Clock };
  const Icon = item.icon;
  return (
    <span className={`pill ${item.cls}`}>
      <Icon size={13} aria-hidden="true" />
      {status}
    </span>
  );
}

export function LifecycleTracker({ step = 0, horizontal = true }) {
  const currentStep = Math.min(Math.max(step, 0), STEPS.length - 1);
  return (
    <ol className={`tracker ${horizontal ? 'h' : ''}`} aria-label="Challenge development lifecycle">
      {STEPS.map((s, idx) => {
        const isDone = idx < currentStep;
        const isNow = idx === currentStep;
        return (
          <li
            key={s}
            className={isDone ? 'done' : isNow ? 'now' : ''}
            aria-current={isNow ? 'step' : undefined}
          >
            {isDone ? (
              <Check size={18} color="var(--success)" aria-hidden="true" />
            ) : (
              <Circle
                size={18}
                aria-hidden="true"
                fill={isNow ? 'var(--primary)' : 'none'}
                stroke={isNow ? 'var(--primary)' : 'currentColor'}
              />
            )}
            <span>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}

export const StatCard = ({ label, value, Icon, trend }) => (
  <article className="card stat-card">
    <div>
      <span className="muted text-sm">{label}</span>
      <div className="stat-value">{value}</div>
      {trend && <span className="muted text-sm">{trend}</span>}
    </div>
    <div className="stat-icon">
      <Icon size={22} aria-hidden="true" />
    </div>
  </article>
);

export function ChallengeCard({ c, onSupported }) {
  const [supported, setSupported] = useState(false);
  const [votes, setVotes] = useState(c.votes || c.supporters || 0);

  const handleVote = async (e) => {
    e.preventDefault();
    if (supported) return;
    setSupported(true);
    setVotes(prev => prev + 1);
    await supportChallenge(c.id);
    if (onSupported) onSupported(c.id);
  };

  return (
    <article className="card col" style={{ gap: '0.875rem' }}>
      <div className="row between">
        <span className="pill teal">{c.cat || c.category}</span>
        <StatusPill step={c.step} statusText={c.status} />
      </div>

      <h3 style={{ fontSize: '1.15rem', margin: 0 }}>
        <Link to={`/challenges/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {c.title}
        </Link>
      </h3>

      <div className="row muted text-sm" style={{ gap: '0.375rem' }}>
        <MapPin size={15} aria-hidden="true" />
        <span>{c.area ? `${c.area}, ` : ''}{c.district}</span>
      </div>

      <p
        className="muted text-sm"
        style={{
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {c.desc || c.description}
      </p>

      <div className="row between muted text-sm">
        <span className="row" style={{ gap: '0.35rem' }}>
          <Users size={15} aria-hidden="true" />
          <span>{(c.affected || c.affected_people || 0).toLocaleString()} affected</span>
        </span>
        <span className="row" style={{ gap: '0.35rem' }}>
          <ThumbsUp size={15} aria-hidden="true" />
          <span>{votes} supporters</span>
        </span>
      </div>

      <div className="row between" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
        <Link className="btn ghost sm" to={`/challenges/${c.id}`}>
          View Problem
        </Link>
        <button
          className="btn sm"
          aria-pressed={supported}
          disabled={supported}
          onClick={handleVote}
        >
          <ThumbsUp size={14} aria-hidden="true" />
          {supported ? 'Supported' : 'Support'}
        </button>
      </div>
    </article>
  );
}

export function ProjectCard({ p, to }) {
  return (
    <article className="card col" style={{ gap: '0.875rem' }}>
      <div className="row between">
        <span className="pill navy">{p.university || p.uni}</span>
        <span className="pill teal">{p.status}</span>
      </div>

      <h3 style={{ margin: 0 }}>
        <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
          {p.title}
        </Link>
      </h3>

      <p
        className="muted text-sm"
        style={{
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {p.description || p.desc}
      </p>

      <div className="row" style={{ gap: '0.375rem' }}>
        {(p.tags || ['Civic Tech']).map(t => (
          <span key={t} className="pill grey text-sm">{t}</span>
        ))}
      </div>

      <div>
        <div className="row between text-sm muted" style={{ marginBottom: '0.25rem' }}>
          <span>Development Progress</span>
          <b>{p.progress || 0}%</b>
        </div>
        <div className="progress-bar" role="progressbar" aria-valuenow={p.progress || 0} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar-fill" style={{ width: `${p.progress || 0}%` }} />
        </div>
      </div>

      {p.looking && (
        <p className="muted text-sm" style={{ margin: 0 }}>
          <b>Looking for:</b> {p.looking}
        </p>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
        <Link className="btn ghost sm" style={{ width: '100%' }} to={to}>
          View Project Details
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="row muted text-sm" style={{ marginBottom: '1.25rem', gap: '0.375rem' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>Home</Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={14} aria-hidden="true" />
          {item.to ? (
            <Link to={item.to} style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>{item.label}</Link>
          ) : (
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card col" style={{ gap: '0.75rem', height: 260 }}>
          <div className="skeleton" style={{ height: 24, width: '40%' }} />
          <div className="skeleton" style={{ height: 32, width: '85%' }} />
          <div className="skeleton" style={{ height: 16, width: '60%' }} />
          <div className="skeleton" style={{ height: 48, width: '100%' }} />
          <div className="skeleton" style={{ height: 36, width: '100%', marginTop: 'auto' }} />
        </div>
      ))}
    </div>
  );
}

export function Chrome() {
  const [fs, setFs] = useState(16);
  const [contrast, setContrast] = useState(false);
  const [lang, setLang] = useState('en');
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleSize = (delta) => {
    let next = delta === 0 ? 16 : fs + delta;
    if (next < 14) next = 14;
    if (next > 20) next = 20;
    setFs(next);
    document.documentElement.style.setProperty('--fs', `${next}px`);
  };

  const toggleContrast = () => {
    const next = !contrast;
    setContrast(next);
    if (next) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const citizenNav = [
    { to: '/explore', label: t.challengesNav },
    { to: '/how-it-works', label: t.howItWorksNav },
    { to: '/university', label: t.universitiesNav },
    { to: '/company', label: t.industryNav },
    { to: '/help', label: t.helpNav }
  ];

  return (
    <>
      <a className="skip-link" href="#mainContent">Skip to main content</a>
      <a className="skip-link" href="#mainNavigation">Skip to navigation</a>

      {/* Government Utility Top Bar */}
      <div className="util-bar">
        <div className="container">
          <span style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Official Civic Innovation Platform</span>
          </span>
          <div className="row" style={{ gap: '0.25rem' }}>
            <button className="util-btn" onClick={() => handleSize(-2)} aria-label="Decrease text size">A-</button>
            <button className="util-btn" onClick={() => handleSize(0)} aria-label="Default text size">A</button>
            <button className="util-btn" onClick={() => handleSize(2)} aria-label="Increase text size">A+</button>
            <button className={`util-btn ${contrast ? 'active' : ''}`} onClick={toggleContrast} aria-pressed={contrast}>
              High contrast
            </button>
            <button className="util-btn" onClick={toggleLang} lang={lang === 'en' ? 'hi' : 'en'}>
              {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>
            {user ? (
              <button className="util-btn" onClick={handleLogout} style={{ fontWeight: 600 }}>
                Logout ({user.name || user.email})
              </button>
            ) : (
              <Link className="util-link" to="/login">
                {t.login}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Gov Header */}
      <header className="gov-header">
        <div className="container">
          <Link to="/" className="brand-link">
            <Emblem />
            <div className="brand-title">
              <b>{t.platformTitle}</b>
              <small>{t.govtSubtitle}</small>
            </div>
          </Link>

          <nav id="mainNavigation" className="main-nav" aria-label="Primary navigation">
            {citizenNav.map(item => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="row" style={{ gap: '0.75rem' }}>
            {!user && (
              <Link className="btn ghost sm" to="/login">
                {t.login}
              </Link>
            )}
            <Link className="btn accent" to="/submit">
              + {t.submitCta}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="mainContent" style={{ minHeight: '65vh', padding: '2rem 0 4rem' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      {/* Gov-Style Footer */}
      <footer className="gov-footer">
        <div className="container">
          <div className="footer-links">
            <Link to="/about">About Platform</Link>
            <Link to="/accessibility">Accessibility Statement</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/help">Help & FAQs</Link>
            <Link to="/_kit">UI Component Kit</Link>
          </div>
          <div className="row between muted text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.25rem' }}>
            <p style={{ margin: 0 }}>
              Website content owned and maintained by Societal Innovation Platform. Developed under Digital India initiative guidelines (GIGW 3.0).
            </p>
            <p style={{ margin: 0 }}>
              Last updated: 23 September 2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export function PortalShell({ role }) {
  const isUni = role === 'university';
  const label = isUni ? 'University Research Portal' : 'Industry Partner Portal';
  const roleCls = isUni ? 'university' : 'industry';
  const Icon = isUni ? Landmark : Building2;

  const uniNav = [
    { to: '/university', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/university/challenges', label: 'Community Challenges', icon: ListChecks },
    { to: '/university/projects', label: 'Adopted Projects', icon: FolderKanban },
    { to: '/university/teams', label: 'Teams & Mentors', icon: UsersRound },
    { to: '/university/industry', label: 'Industry Partners', icon: Handshake },
    { to: '/university/reports', label: 'Progress Reports', icon: FileBarChart }
  ];

  const compNav = [
    { to: '/company', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/company/projects', label: 'Project Marketplace', icon: Store },
    { to: '/company/collaborations', label: 'My Collaborations', icon: Handshake },
    { to: '/company/industry-application', label: 'Partner Registration', icon: ShieldCheck }
  ];

  const items = isUni ? uniNav : compNav;

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar" aria-label={label}>
        <div className="row" style={{ padding: '0.25rem 0.5rem 0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
          <span className={`role-chip ${roleCls}`}>
            <Icon size={14} aria-hidden="true" />
            {role}
          </span>
        </div>
        {items.map(nav => {
          const NavIcon = nav.icon;
          return (
            <NavLink
              key={nav.to}
              end={nav.end}
              to={nav.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <NavIcon size={18} aria-hidden="true" />
              <span>{nav.label}</span>
            </NavLink>
          );
        })}
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
