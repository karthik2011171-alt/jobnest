import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useApp } from '../store.jsx';
import { PageHead } from '../components.jsx';

export default function Profile() {
  const { profile, setProfile, toast } = useApp();
  const [p, setP] = useState(profile);
  const [skill, setSkill] = useState('');
  const up = (k) => (e) => setP({ ...p, [k]: e.target.value });
  const addSkill = () => {
    const s = skill.trim();
    if (s && !p.skills.some((x) => x.toLowerCase() === s.toLowerCase())) setP({ ...p, skills: [...p.skills, s] });
    setSkill('');
  };
  const checks = [['Name', p.name.trim()], ['Headline', p.title.trim()], ['3+ skills', p.skills.length >= 3], ['Education', p.education.trim()], ['Experience', p.experience.trim()], ['Resume', p.resume], ['GitHub', p.github.trim()], ['LinkedIn', p.linkedin.trim()]];
  const pct = Math.round((checks.filter((c) => c[1]).length / checks.length) * 100);
  const save = (e) => { e.preventDefault(); setProfile(p); toast('Profile saved'); };

  return (
    <div className="container section">
      <PageHead title="Your profile" sub="A complete profile helps us recommend better jobs." />
      <div className="detail">
        <form className="card block form" onSubmit={save}>
          <div className="row2">
            <div className="field"><label htmlFor="n">Full name</label><input id="n" value={p.name} onChange={up('name')} required /></div>
            <div className="field"><label htmlFor="t">Headline</label><input id="t" value={p.title} onChange={up('title')} placeholder="e.g. Frontend Developer" /></div>
          </div>
          <div className="field"><label htmlFor="e">Email</label><input id="e" type="email" value={p.email} onChange={up('email')} /></div>
          <div className="field">
            <label htmlFor="s">Skills</label>
            <div className="inline"><input id="s" value={skill} onChange={(e) => setSkill(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }} placeholder="Type a skill and press Enter" /><button type="button" className="btn ghost" onClick={addSkill}>Add</button></div>
            <div className="tags">{p.skills.map((s) => <button type="button" key={s} className="chip rm" onClick={() => setP({ ...p, skills: p.skills.filter((x) => x !== s) })}>{s} <X size={13} /></button>)}</div>
          </div>
          <div className="field"><label htmlFor="ed">Education</label><textarea id="ed" rows="3" value={p.education} onChange={up('education')} placeholder="Degree, college, year" /></div>
          <div className="field"><label htmlFor="ex">Experience</label><textarea id="ex" rows="3" value={p.experience} onChange={up('experience')} placeholder="Role, company, years and highlights" /></div>
          <div className="field">
            <label>Resume</label>
            <div className="upload">
              <label className="btn ghost sm"><Upload size={15} /> {p.resume ? 'Replace file' : 'Upload resume'}
                <input type="file" accept=".pdf,.doc,.docx" hidden onChange={(e) => e.target.files[0] && setP({ ...p, resume: e.target.files[0].name })} /></label>
              {p.resume ? <span>{p.resume} <button type="button" className="link" onClick={() => setP({ ...p, resume: '' })}>Remove</button></span> : <span className="muted small">PDF or Word document</span>}
            </div>
          </div>
          <div className="row2">
            <div className="field"><label htmlFor="g">GitHub</label><input id="g" value={p.github} onChange={up('github')} placeholder="github.com/username" /></div>
            <div className="field"><label htmlFor="l">LinkedIn</label><input id="l" value={p.linkedin} onChange={up('linkedin')} placeholder="linkedin.com/in/username" /></div>
          </div>
          <button className="btn" type="submit">Save profile</button>
        </form>

        <aside className="card block sticky">
          <h3>Profile strength</h3>
          <div className="meter"><i style={{ width: `${pct}%` }} /></div>
          <p className="big">{pct}% complete</p>
          <ul className="todo">{checks.map(([l, ok]) => <li key={l} className={ok ? 'ok' : ''}>{ok ? '✓' : '○'} {l}</li>)}</ul>
        </aside>
      </div>
    </div>
  );
}
