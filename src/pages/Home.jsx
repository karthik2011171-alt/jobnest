import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { jobs, categories, companies } from '../data.js';
import { JobCard, Logo } from '../components.jsx';

export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('');
  const go = (e) => { e.preventDefault(); nav(`/jobs?${new URLSearchParams({ q, loc })}`); };
  const featured = jobs.filter((j) => j.featured).slice(0, 6);
  const latest = [...jobs].sort((a, b) => a.days - b.days).slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="container hero-in">
          <h1>Find the job that fits your life, not just your résumé.</h1>
          <p>Browse {jobs.length} hand-picked roles from {companies.length} growing companies. Save the ones you like and track every application in one place.</p>
          <form className="search-bar" onSubmit={go}>
            <label><Search size={18} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Job title or skill" aria-label="Job title or skill" /></label>
            <label><MapPin size={18} /><input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="City or remote" aria-label="Location" /></label>
            <button className="btn" type="submit">Search jobs</button>
          </form>
          <div className="chips">
            <span className="muted">Popular:</span>
            {['React', 'Python', 'Figma', 'SQL', 'Remote'].map((s) => <Link key={s} className="chip" to={`/jobs?q=${s}`}>{s}</Link>)}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="sec-head"><h2>Browse by category</h2><Link to="/jobs" className="link">View all jobs</Link></div>
        <div className="grid cats">
          {categories.map((c) => (
            <Link key={c.name} to={`/jobs?category=${encodeURIComponent(c.name)}`} className="card cat">
              <span className="cat-ico">{c.icon}</span>
              <div><h3>{c.name}</h3><span className="muted">{jobs.filter((j) => j.cat === c.name).length} open roles</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="sec-head"><h2>Featured jobs</h2><Link to="/jobs" className="link">See more</Link></div>
        <div className="grid cards">{featured.map((j) => <JobCard key={j.id} job={j} />)}</div>
      </section>

      <section className="container section">
        <div className="sec-head"><h2>Hiring now</h2><Link to="/companies" className="link">All companies</Link></div>
        <div className="grid logos">
          {companies.map((c) => (
            <Link key={c.id} to={`/companies/${c.id}`} className="card co-mini">
              <Logo c={c} size={40} /><div><strong>{c.name}</strong><span className="muted small">{jobs.filter((j) => j.co === c.id).length} jobs</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="sec-head"><h2>Latest jobs</h2><Link to="/jobs" className="link">Browse all</Link></div>
        <div className="grid cards">{latest.map((j) => <JobCard key={j.id} job={j} />)}</div>
      </section>

      <section className="container section">
        <div className="cta">
          <div><h2>Never miss the right role</h2><p>Complete your profile and set a job alert. We’ll match new openings to your skills.</p></div>
          <div className="cta-btns"><Link className="btn accent" to="/profile">Build your profile</Link><Link className="btn outline-light" to="/alerts">Create a job alert</Link></div>
        </div>
      </section>
    </>
  );
}
