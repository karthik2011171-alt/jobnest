import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Briefcase, Bookmark, Moon, Sun, Menu, X, MapPin, Clock } from 'lucide-react';
import { useApp } from './store.jsx';
import { company, salaryText, ago } from './data.js';

export const Logo = ({ c, size = 46 }) => (
  <div className="logo" style={{ width: size, height: size, background: c.color, fontSize: size * 0.36 }}>
    {c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
  </div>
);
export const Tag = ({ children, tone = '' }) => <span className={`tag ${tone}`}>{children}</span>;
export const Status = ({ s }) => <span className={`status ${s.toLowerCase()}`}>{s}</span>;

export function JobCard({ job }) {
  const { saved, toggleSave, applied } = useApp();
  const c = company(job.co);
  const on = saved.includes(job.id);
  return (
    <article className="card job-card">
      <div className="jc-top">
        <Link to={`/companies/${c.id}`} aria-label={c.name}><Logo c={c} /></Link>
        <div className="jc-title">
          <Link to={`/jobs/${job.id}`}><h3>{job.title}</h3></Link>
          <Link to={`/companies/${c.id}`} className="muted">{c.name}</Link>
        </div>
        <button className={`icon-btn ${on ? 'on' : ''}`} onClick={() => toggleSave(job.id)} aria-label={on ? 'Unsave job' : 'Save job'}>
          <Bookmark size={18} fill={on ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="meta">
        <span><MapPin size={14} /> {job.location}</span>
        <span><Clock size={14} /> {ago(job.days)}</span>
      </div>
      <div className="tags">
        <Tag tone="pri">{job.work}</Tag><Tag>{job.type}</Tag><Tag>{job.expMin}–{job.expMax} yrs</Tag>
      </div>
      <div className="jc-foot">
        <strong>{salaryText(job)}</strong>
        <Link className={`btn sm ${applied(job.id) ? 'ghost' : ''}`} to={`/jobs/${job.id}`}>{applied(job.id) ? 'Applied' : 'View job'}</Link>
      </div>
    </article>
  );
}

const links = [['/', 'Home'], ['/jobs', 'Jobs'], ['/companies', 'Companies'], ['/saved', 'Saved'], ['/tracker', 'Tracker'], ['/dashboard', 'Dashboard'], ['/alerts', 'Alerts']];

export function Navbar() {
  const { theme, toggleTheme, saved } = useApp();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="nav">
      <div className="container nav-in">
        <Link to="/" className="brand" onClick={close}><span className="brand-mark"><Briefcase size={17} /></span>JobNest</Link>
        <nav className={`links ${open ? 'open' : ''}`}>
          {links.map(([to, l]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={close}>
              {l}{to === '/saved' && saved.length > 0 && <em>{saved.length}</em>}
            </NavLink>
          ))}
          <NavLink to="/profile" className="btn sm profile-link" onClick={close}>My profile</NavLink>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle light or dark mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-in">
        <div>
          <Link to="/" className="brand"><span className="brand-mark"><Briefcase size={17} /></span>JobNest</Link>
          <p className="muted">Find work that fits the way you want to live.</p>
        </div>
        <div className="foot-links">
          <Link to="/jobs">Browse jobs</Link><Link to="/companies">Companies</Link><Link to="/alerts">Job alerts</Link><Link to="/profile">Profile</Link>
        </div>
        <p className="muted small">© {new Date().getFullYear()} JobNest. Demo data only.</p>
      </div>
    </footer>
  );
}

export const PageHead = ({ title, sub, children }) => (
  <div className="page-head">
    <div><h1>{title}</h1>{sub && <p className="muted">{sub}</p>}</div>
    {children}
  </div>
);

export const Empty = ({ title, text, to, cta }) => (
  <div className="card empty">
    <h3>{title}</h3><p className="muted">{text}</p>
    {to && <Link className="btn" to={to}>{cta}</Link>}
  </div>
);
