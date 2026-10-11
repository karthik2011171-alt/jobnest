import { Link } from 'react-router-dom';
import { jobs, company, STATUSES, fmtDate } from '../data.js';
import { useApp } from '../store.jsx';
import { Logo, Status, JobCard, PageHead } from '../components.jsx';

const colors = { Applied: '#2f5fd0', Shortlisted: '#d9822b', Interview: '#7a4bc4', Selected: '#0e9a6b', Rejected: '#d6455d' };

export default function Dashboard() {
  const { apps, saved, profile, applied } = useApp();
  const validApps = apps.filter((a) => jobs.some((j) => j.id === a.jobId));
  const counts = Object.fromEntries(STATUSES.map((s) => [s, validApps.filter((a) => a.status === s).length]));
  const total = validApps.length;
  let acc = 0;
  const grad = total ? STATUSES.map((s) => { const a = (acc / total) * 100; acc += counts[s]; return `${colors[s]} ${a}% ${(acc / total) * 100}%`; }).join(',') : 'var(--line) 0 100%';
  const max = Math.max(1, ...Object.values(counts));
  const mine = profile.skills.map((s) => s.toLowerCase());
  const picks = jobs.filter((j) => !applied(j.id) && j.skills.some((s) => mine.includes(s.toLowerCase()))).slice(0, 2);
  const stats = [['Applications', total, 'Applied'], ['Saved jobs', saved.length], ['Interviews', counts.Interview], ['Shortlisted', counts.Shortlisted]];

  return (
    <div className="container section">
      <PageHead title={`Welcome back, ${profile.name.split(' ')[0] || 'there'}`} sub="Here’s where your job search stands today.">
        <Link className="btn" to="/jobs">Find jobs</Link>
      </PageHead>
      <div className="grid stats">
        {stats.map(([l, v]) => <div key={l} className="card stat"><span className="muted">{l}</span><strong>{v}</strong></div>)}
      </div>

      <div className="dash-grid">
        <section className="card block">
          <h3>Applications by status</h3>
          <div className="chart">
            <div className="donut" style={{ background: `conic-gradient(${grad})` }}><span>{total}<small>total</small></span></div>
            <div className="bars">
              {STATUSES.map((s) => (
                <div key={s} className="bar-row">
                  <span>{s}</span>
                  <div className="bar"><i style={{ width: `${(counts[s] / max) * 100}%`, background: colors[s] }} /></div>
                  <b>{counts[s]}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card block">
          <h3>Recent applications</h3>
          {validApps.length ? validApps.slice(0, 4).map((a) => {
            const j = jobs.find((x) => x.id === a.jobId); const c = company(j.co);
            return (
              <Link key={a.jobId} to={`/jobs/${j.id}`} className="mini-row">
                <Logo c={c} size={38} /><div><strong>{j.title}</strong><span className="muted small">{c.name} · {fmtDate(a.date)}</span></div><Status s={a.status} />
              </Link>
            );
          }) : <p className="muted">You haven’t applied to any jobs yet.</p>}
          <Link to="/tracker" className="link">Open tracker</Link>
        </section>
      </div>

      {picks.length > 0 && <>
        <div className="sec-head"><h2>Recommended for your skills</h2><Link to="/profile" className="link">Edit skills</Link></div>
        <div className="grid cards two">{picks.map((j) => <JobCard key={j.id} job={j} />)}</div>
      </>}
    </div>
  );
}
