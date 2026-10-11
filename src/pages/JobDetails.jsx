import { useParams, Link } from 'react-router-dom';
import { Bookmark, MapPin, Briefcase, Clock, Check } from 'lucide-react';
import { jobs, company, salaryText, ago } from '../data.js';
import { useApp } from '../store.jsx';
import { Logo, Tag, JobCard } from '../components.jsx';

const List = ({ title, items }) => (
  <section className="card block"><h3>{title}</h3><ul className="ticks">{items.map((i) => <li key={i}><Check size={16} />{i}</li>)}</ul></section>
);

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === +id);
  const { saved, toggleSave, applied, apply } = useApp();
  if (!job) return <div className="container empty"><h2>Job not found</h2><p>This listing may have been removed.</p><Link className="btn" to="/jobs">Browse jobs</Link></div>;
  const c = company(job.co);
  const on = saved.includes(job.id);
  const done = applied(job.id);
  const similar = jobs.filter((j) => j.cat === job.cat && j.id !== job.id).slice(0, 2);

  return (
    <div className="container section">
      <Link to="/jobs" className="link back">← Back to jobs</Link>
      <div className="detail">
        <div className="stack">
          <section className="card block head-card">
            <Link to={`/companies/${c.id}`}><Logo c={c} size={64} /></Link>
            <div>
              <h1>{job.title}</h1>
              <Link to={`/companies/${c.id}`} className="link">{c.name}</Link>
              <div className="meta"><span><MapPin size={14} /> {job.location}</span><span><Briefcase size={14} /> {job.expMin}–{job.expMax} yrs</span><span><Clock size={14} /> {ago(job.days)}</span></div>
              <div className="tags"><Tag tone="pri">{job.work}</Tag><Tag>{job.type}</Tag><Tag>{job.cat}</Tag></div>
            </div>
          </section>
          <section className="card block"><h3>About the role</h3><p>{job.about}</p></section>
          <List title="Responsibilities" items={job.responsibilities} />
          <List title="Requirements" items={job.requirements} />
          <section className="card block"><h3>Skills</h3><div className="tags">{job.skills.map((s) => <Tag key={s} tone="pri">{s}</Tag>)}</div></section>
          <List title="Benefits" items={job.benefits} />
        </div>

        <aside className="stack sticky">
          <section className="card block">
            <p className="muted small">Salary</p>
            <p className="big">{salaryText(job)}</p>
            <button className="btn block-btn" disabled={done} onClick={() => apply(job.id)}>{done ? 'Application submitted' : 'Apply now'}</button>
            <button className={`btn ghost block-btn ${on ? 'saved' : ''}`} onClick={() => toggleSave(job.id)}>
              <Bookmark size={16} fill={on ? 'currentColor' : 'none'} /> {on ? 'Saved' : 'Save job'}
            </button>
            {done && <Link className="link center" to="/tracker">Track this application</Link>}
          </section>
          <section className="card block">
            <h3>Job overview</h3>
            <dl className="dl">
              <dt>Experience</dt><dd>{job.expMin}–{job.expMax} years</dd>
              <dt>Work type</dt><dd>{job.work}</dd>
              <dt>Job type</dt><dd>{job.type}</dd>
              <dt>Location</dt><dd>{job.location}</dd>
              <dt>Category</dt><dd>{job.cat}</dd>
            </dl>
          </section>
          <section className="card block">
            <h3>About {c.name}</h3>
            <p className="muted">{c.about}</p>
            <dl className="dl"><dt>Industry</dt><dd>{c.industry}</dd><dt>Size</dt><dd>{c.size} employees</dd><dt>HQ</dt><dd>{c.location}</dd></dl>
            <Link className="btn ghost block-btn" to={`/companies/${c.id}`}>View company</Link>
          </section>
        </aside>
      </div>
      {similar.length > 0 && <><div className="sec-head"><h2>Similar jobs</h2></div><div className="grid cards two">{similar.map((j) => <JobCard key={j.id} job={j} />)}</div></>}
    </div>
  );
}
