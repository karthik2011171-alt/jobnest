import { createContext, useContext, useEffect, useState, useRef } from 'react';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

function useLS(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ } }, [key, v]);
  return [v, setV];
}

const daysAgo = (d) => new Date(Date.now() - d * 864e5).toISOString();
const seedApps = [
  { jobId: 5, status: 'Interview', date: daysAgo(6) },
  { jobId: 1, status: 'Shortlisted', date: daysAgo(4) },
  { jobId: 2, status: 'Applied', date: daysAgo(2) },
  { jobId: 8, status: 'Rejected', date: daysAgo(9) },
];
const seedProfile = { name: 'Alex Morgan', title: 'Frontend Developer', email: 'alex.morgan@example.com', skills: ['React', 'JavaScript', 'CSS'], education: '', experience: '', resume: '', github: '', linkedin: '', bio: '' };
const seedAlerts = [{ id: 1, keyword: 'React', location: '', work: 'Any', type: 'Any', freq: 'Daily', email: true, active: true }];

export function AppProvider({ children }) {
  const [theme, setTheme] = useLS('jn-theme', typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [saved, setSaved] = useLS('jn-saved', [2, 4]);
  const [apps, setApps] = useLS('jn-apps', seedApps);
  const [profile, setProfile] = useLS('jn-profile', seedProfile);
  const [alerts, setAlerts] = useLS('jn-alerts', seedAlerts);
  const [toastMsg, setToastMsg] = useState('');
  const timer = useRef();

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const toast = (m) => {
    setToastMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(''), 2200);
  };

  const value = {
    theme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    saved,
    toggleSave: (id) => {
      const on = saved.includes(id);
      setSaved(on ? saved.filter((x) => x !== id) : [...saved, id]);
      toast(on ? 'Removed from saved jobs' : 'Job saved');
    },
    apps,
    applied: (id) => apps.some((a) => a.jobId === id),
    apply: (id) => {
      if (apps.some((a) => a.jobId === id)) return;
      setApps([{ jobId: id, status: 'Applied', date: new Date().toISOString() }, ...apps]);
      toast('Application submitted');
    },
    setStatus: (id, status) => { setApps(apps.map((a) => (a.jobId === id ? { ...a, status } : a))); toast(`Status updated to ${status}`); },
    removeApp: (id) => { setApps(apps.filter((a) => a.jobId !== id)); toast('Application removed'); },
    profile, setProfile,
    alerts, setAlerts,
    toast, toastMsg,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
