import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../store.jsx';
import { filterJobs } from './Jobs.jsx';
import { PageHead, Empty } from '../components.jsx';

const init = { keyword: '', location: '', work: 'Any', type: 'Any', freq: 'Daily', email: true };

export default function Alerts() {
  const { alerts, setAlerts, toast } = useApp();
  const [f, setF] = useState(init);
  const up = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const add = (e) => {
    e.preventDefault();
    if (!f.keyword.trim() && !f.location.trim()) return toast('Add a keyword or location first');
    setAlerts([{ ...f, id: Date.now(), active: true }, ...alerts]);
    setF(init); toast('Job alert created');
  };
  const matches = (a) => filterJobs({ q: a.keyword, loc: a.location, work: a.work === 'Any' ? [] : [a.work], type: a.type === 'Any' ? [] : [a.type] }).length;

  return (
    <div className="container section">
      <PageHead title="Job alerts" sub="Tell us what you’re looking for and we’ll watch for it." />
      <div className="detail">
        <div className="stack">
          {alerts.length ? alerts.map((a) => (
            <article key={a.id} className="card block alert-row">
              <div>
                <h3>{a.keyword || 'Any role'}{a.location && ` in ${a.location}`}</h3>
                <p className="muted small">{a.work} · {a.type} · {a.freq}{a.email ? ' · Email on' : ''}</p>
                <Link className="link" to={`/jobs?q=${encodeURIComponent(a.keyword)}&loc=${encodeURIComponent(a.location)}`}>{matches(a)} matching jobs</Link>
              </div>
              <div className="alert-tools">
                <label className="switch"><input type="checkbox" checked={a.active} onChange={() => setAlerts(alerts.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)))} aria-label="Alert active" /><i /></label>
                <button className="icon-btn" onClick={() => { setAlerts(alerts.filter((x) => x.id !== a.id)); toast('Alert deleted'); }} aria-label="Delete alert"><Trash2 size={17} /></button>
              </div>
            </article>
          )) : <Empty title="No alerts yet" text="Create your first alert using the form." />}
        </div>
        <form className="card block form sticky" onSubmit={add}>
          <h3>New alert</h3>
          <div className="field"><label htmlFor="k">Keyword or skill</label><input id="k" value={f.keyword} onChange={up('keyword')} placeholder="e.g. React" /></div>
          <div className="field"><label htmlFor="lo">Location</label><input id="lo" value={f.location} onChange={up('location')} placeholder="e.g. Bengaluru" /></div>
          <div className="field"><label htmlFor="w">Work type</label><select id="w" value={f.work} onChange={up('work')}>{['Any', 'Remote', 'Hybrid', 'On-site'].map((x) => <option key={x}>{x}</option>)}</select></div>
          <div className="field"><label htmlFor="ty">Job type</label><select id="ty" value={f.type} onChange={up('type')}>{['Any', 'Full-time', 'Part-time', 'Internship'].map((x) => <option key={x}>{x}</option>)}</select></div>
          <div className="field"><label htmlFor="fr">How often</label><select id="fr" value={f.freq} onChange={up('freq')}>{['Instantly', 'Daily', 'Weekly'].map((x) => <option key={x}>{x}</option>)}</select></div>
          <label className="check"><input type="checkbox" checked={f.email} onChange={up('email')} />Send me email notifications</label>
          <button className="btn" type="submit">Create alert</button>
        </form>
      </div>
    </div>
  );
}
