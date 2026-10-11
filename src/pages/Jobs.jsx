import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { jobs, categories, company, lpaMax, lpaMin } from '../data.js';
import { JobCard, Empty } from '../components.jsx';

const expOpts = [['Fresher (0–1 yrs)', 0, 1], ['1–3 yrs', 1, 3], ['3–5 yrs', 3, 5], ['5+ yrs', 5, 99]];
const blank = { work: [], type: [], exp: -1, sal: 0 };

export function filterJobs({ q = '', loc = '', cat = '', work = [], type = [], exp = -1, sal = 0 }) {
  const t = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const l = loc.toLowerCase().trim();
  return jobs.filter((j) => {
    const hay = [j.title, company(j.co).name, j.cat, j.work, ...j.skills].join(' ').toLowerCase();
    return t.every((w) => hay.includes(w)) && (!l || j.location.toLowerCase().includes(l)) && (!cat || j.cat === cat) &&
      (!work.length || work.includes(j.work)) && (!type.length || type.includes(j.type)) &&
      (exp < 0 || (j.expMin >= expOpts[exp][1] && j.expMin <= expOpts[exp][2])) && lpaMax(j) >= sal;
  });
}

export default function Jobs() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') || '', loc = sp.get('loc') || '', cat = sp.get('category') || '';
  const [f, setF] = useState(blank);
  const [sort, setSort] = useState('latest');
  const [open, setOpen] = useState(false);

  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };
  const tog = (k, v) => setF((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));
  const reset = () => { setF(blank); setSp({}, { replace: true }); };
  const active = q || loc || cat || f.work.length || f.type.length || f.exp >= 0 || f.sal > 0;

  const list = useMemo(() => {
    const s = { latest: (a, b) => a.days - b.days, high: (a, b) => lpaMax(b) - lpaMax(a), low: (a, b) => lpaMin(a) - lpaMin(b), exp: (a, b) => a.expMin - b.expMin }[sort];
    return filterJobs({ q, loc, cat, ...f }).sort(s);
  }, [q, loc, cat, f, sort]);

  return (
    <div className="container section">
      <div className="search-bar light">
        <label><Search size={18} /><input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search title, company or skill" aria-label="Search jobs" /></label>
        <label><MapPin size={18} /><input value={loc} onChange={(e) => set('loc', e.target.value)} placeholder="Location" aria-label="Location" /></label>
        {active && <button className="btn ghost" onClick={reset}>Clear all</button>}
      </div>

      <div className="jobs-layout">
        <aside className={`card filters ${open ? 'open' : ''}`}>
          <div className="f-block">
            <h4>Category</h4>
            <select value={cat} onChange={(e) => set('category', e.target.value)}>
              <option value="">All categories</option>
              {categories.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="f-block">
            <h4>Work type</h4>
            {['Remote', 'Hybrid', 'On-site'].map((w) => <label key={w} className="check"><input type="checkbox" checked={f.work.includes(w)} onChange={() => tog('work', w)} />{w}</label>)}
          </div>
          <div className="f-block">
            <h4>Job type</h4>
            {['Full-time', 'Part-time', 'Internship'].map((w) => <label key={w} className="check"><input type="checkbox" checked={f.type.includes(w)} onChange={() => tog('type', w)} />{w}</label>)}
          </div>
          <div className="f-block">
            <h4>Experience</h4>
            <label className="check"><input type="radio" name="exp" checked={f.exp < 0} onChange={() => setF({ ...f, exp: -1 })} />Any</label>
            {expOpts.map((o, i) => <label key={o[0]} className="check"><input type="radio" name="exp" checked={f.exp === i} onChange={() => setF({ ...f, exp: i })} />{o[0]}</label>)}
          </div>
          <div className="f-block">
            <h4>Minimum salary: {f.sal ? `₹${f.sal} LPA+` : 'Any'}</h4>
            <input type="range" min="0" max="30" step="2" value={f.sal} onChange={(e) => setF({ ...f, sal: +e.target.value })} aria-label="Minimum salary in LPA" />
          </div>
        </aside>

        <section>
          <div className="list-head">
            <p><strong>{list.length}</strong> {list.length === 1 ? 'job' : 'jobs'} found</p>
            <div className="list-tools">
              <button className="btn ghost sm filter-toggle" onClick={() => setOpen(!open)}><SlidersHorizontal size={16} /> Filters</button>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort jobs">
                <option value="latest">Newest first</option>
                <option value="high">Salary: high to low</option>
                <option value="low">Salary: low to high</option>
                <option value="exp">Experience: low to high</option>
              </select>
            </div>
          </div>
          {list.length ? <div className="grid cards two">{list.map((j) => <JobCard key={j.id} job={j} />)}</div>
            : <Empty title="No jobs match your filters" text="Try removing a filter or searching a different keyword." />}
          {!list.length && active && <div className="center"><button className="btn" onClick={reset}>Clear all filters</button></div>}
        </section>
      </div>
    </div>
  );
}
