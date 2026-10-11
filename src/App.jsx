import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar, Footer } from './components.jsx';
import { useApp } from './store.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import JobDetails from './pages/JobDetails.jsx';
import Saved from './pages/Saved.jsx';
import Tracker from './pages/Tracker.jsx';
import Profile from './pages/Profile.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { Companies, CompanyDetails } from './pages/Company.jsx';
import Alerts from './pages/Alerts.jsx';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { toastMsg } = useApp();
  return (
    <>
      <ScrollTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="*" element={
            <div className="container empty">
              <h2>Page not found</h2>
              <p>The page you’re looking for doesn’t exist.</p>
              <Link className="btn" to="/">Back to home</Link>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </>
  );
}
