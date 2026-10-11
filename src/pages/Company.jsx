import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Globe } from 'lucide-react';
import { companies, jobs } from '../data.js';
import { Logo, JobCard, PageHead, Tag } from '../components.jsx';

export function Companies() {
  return (
    <div className="container section">
      <PageHead title="Companies" sub="Teams that are hiring right now." />
      <div className="grid cards">
        {companies.map((c) => (
          <Link key={c.id} to={`/companies/${c.id}`} className="card job-card">
            <div className="jc-top"><Logo c={c} /><div className="jc-title"><h3>{c.name}</h3><span className="muted">{c.industry}</span></div></div>
            <p className="muted clamp">{c.about}</p>
            <div className="jc-foot"><span className="muted small">{c.location}</span><Tag tone="pri">{jobs.filter((j) => j.co === c.id).length} open jobs</Tag></div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CompanyDetails() {
  const { id } = useParams();
  const c = companies.find((x) => x.id === id);
  if (!c) return <div className="container empty"><h2>Company not found</h2><Link className="btn" to="/companies">All companies</Link></div>;
  const list = jobs.filter((j) => j.co === c.id);
  return (
    <div className="container section">
      <section className="card block head-card co-head">
        <Logo c={c} size={80} />
        <div>
          <h1>{c.name}</h1>
          <p className="muted">{c.industry}</p>
          <div className="meta">
            <span><MapPin size={14} /> {c.location}</span><span><Users size={14} /> {c.size} employees</span>
            <span><Calendar size={14} /> Founded {c.founded}</span><span><Globe size={14} /> {c.website}</span>
          </div>
        </div>
      </section>
      <section className="card block" style={{ marginTop: 20 }}><h3>About {c.name}</h3><p>{c.about}</p></section>
      <div className="sec-head"><h2>Open positions ({list.length})</h2></div>
      {list.length ? <div className="grid cards">{list.map((j) => <JobCard key={j.id} job={j} />)}</div> : <p className="muted">No open roles right now.</p>}
    </div>
  );
}
