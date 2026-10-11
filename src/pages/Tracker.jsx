import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { jobs, company, STATUSES, fmtDate } from '../data.js';
import { useApp } from '../store.jsx';
import { Logo, Status, PageHead, Empty } from '../components.jsx';

export function Stepper({ s }) {
  const rej = s === 'Rejected';
  const steps = ['Applied', 'Shortlisted', 'Interview', rej ? 'Rejected' : 'Selected'];
  const idx = rej || s === 'Selected' ? 3 : steps.indexOf(s);
  return (
    <ol className={`stepper ${rej ? 'rej' : ''}`}>
      {steps.map((x, i) => (
        <li key={x} className={i < idx ? 'done' : i === idx ? 'cur' : ''}>
          <i>{i < idx || (i === idx && s === 'Selected') ? '✓' : rej && i === 3 ? '✕' : i + 1}</i><span>{x}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Tracker() {
  const { apps, setStatus, removeApp } = useApp();
  const [tab, setTab] = useState('All');
  // Ignore stale localStorage entries whose jobs were removed from the catalog.
  const shown = apps.filter((a) => jobs.some((j) => j.id === a.jobId) && (tab === 'All' || a.status === tab));
  return (
    <div className="container section">
      <PageHead title="Application tracker" sub="Follow every application from applied to offer." />
      <div className="tabs">
        {['All', ...STATUSES].map((t) => (
          <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
            {t} <em>{t === 'All' ? apps.length : apps.filter((a) => a.status === t).length}</em>
          </button>
        ))}
      </div>
      {shown.length ? (
        <div className="stack">
          {shown.map((a) => {
            const j = jobs.find((x) => x.id === a.jobId);
            const c = company(j.co);
            return (
              <article key={a.jobId} className="card block track">
                <div className="track-main">
                  <Logo c={c} />
                  <div>
                    <Link to={`/jobs/${j.id}`}><h3>{j.title}</h3></Link>
                    <span className="muted">{c.name} · Applied {fmtDate(a.date)}</span>
                  </div>
                  <Status s={a.status} />
                </div>
                <Stepper s={a.status} />
                <div className="track-actions">
                  <select value={a.status} onChange={(e) => setStatus(a.jobId, e.target.value)} aria-label="Update status">
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <button className="btn ghost sm danger" onClick={() => removeApp(a.jobId)}><Trash2 size={15} /> Remove</button>
                </div>
              </article>
            );
          })}
        </div>
      ) : <Empty title={tab === 'All' ? 'No applications yet' : `Nothing in “${tab}”`} text="Apply to a job and it will show up here." to="/jobs" cta="Find jobs" />}
    </div>
  );
}
