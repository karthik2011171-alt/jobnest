import { jobs } from '../data.js';
import { useApp } from '../store.jsx';
import { JobCard, PageHead, Empty } from '../components.jsx';

export default function Saved() {
  const { saved } = useApp();
  const list = jobs.filter((j) => saved.includes(j.id));
  return (
    <div className="container section">
      <PageHead title="Saved jobs" sub={`${list.length} ${list.length === 1 ? 'job' : 'jobs'} saved for later`} />
      {list.length ? <div className="grid cards">{list.map((j) => <JobCard key={j.id} job={j} />)}</div>
        : <Empty title="No saved jobs yet" text="Tap the bookmark on any job to keep it here." to="/jobs" cta="Browse jobs" />}
    </div>
  );
}
