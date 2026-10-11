export const companies = [
  { id: 'nimbus', name: 'Nimbus Labs', color: '#0e7a6b', industry: 'Cloud & SaaS', size: '501–1000', location: 'Bengaluru', founded: 2014, website: 'nimbuslabs.example', about: 'Nimbus Labs builds developer-first cloud tooling used by 12,000+ teams. We ship fast, review kindly and care about craft.' },
  { id: 'paybridge', name: 'PayBridge', color: '#2f5fd0', industry: 'Fintech', size: '201–500', location: 'Mumbai', founded: 2017, website: 'paybridge.example', about: 'PayBridge powers real-time payments for small businesses across India with a focus on reliability and trust.' },
  { id: 'medora', name: 'Medora Health', color: '#c2455b', industry: 'Healthtech', size: '201–500', location: 'Chennai', founded: 2016, website: 'medora.example', about: 'Medora connects patients with doctors through a simple app for consultations, records and follow-ups.' },
  { id: 'cartly', name: 'Cartly', color: '#d9822b', industry: 'E-commerce', size: '1000+', location: 'Gurugram', founded: 2012, website: 'cartly.example', about: 'Cartly is a marketplace helping 40,000 independent sellers reach customers in every pin code.' },
  { id: 'pixel', name: 'Pixelcraft Studio', color: '#7a4bc4', industry: 'Design & Media', size: '51–200', location: 'Remote-first', founded: 2019, website: 'pixelcraft.example', about: 'A remote-first product studio designing and building digital products for startups worldwide.' },
  { id: 'datahive', name: 'DataHive', color: '#1b8aa6', industry: 'Data & AI', size: '201–500', location: 'Hyderabad', founded: 2018, website: 'datahive.example', about: 'DataHive turns messy business data into clear decisions with analytics and applied machine learning.' },
  { id: 'greengrid', name: 'GreenGrid Energy', color: '#4c8c2b', industry: 'Clean energy', size: '501–1000', location: 'Delhi', founded: 2013, website: 'greengrid.example', about: 'GreenGrid develops solar and storage solutions, with software that keeps the grid smart and efficient.' },
  { id: 'learnloop', name: 'LearnLoop', color: '#b8892a', industry: 'Edtech', size: '51–200', location: 'Bengaluru', founded: 2020, website: 'learnloop.example', about: 'LearnLoop makes learning stick with short, practice-first courses for working professionals.' },
];

export const categories = [
  { name: 'Engineering', icon: '💻' }, { name: 'Design', icon: '🎨' }, { name: 'Data & AI', icon: '📊' },
  { name: 'Product', icon: '🚀' }, { name: 'Marketing', icon: '📣' }, { name: 'Sales', icon: '🤝' },
];

const benefits = ['Health insurance for you and family', 'Flexible working hours', 'Learning & development budget', 'Paid time off and holidays', 'Team offsites and wellness perks'];
const J = (id, title, co, location, work, type, expMin, expMax, min, max, cat, skills, days, featured = false) => {
  const s = skills;
  return {
    id, title, co, location, work, type, expMin, expMax, min, max, cat, skills, days, featured, benefits,
    about: `We’re looking for a ${title} to join our team. You’ll work closely with engineers, designers and product leads on problems that reach thousands of users every day, with real ownership from day one.`,
    responsibilities: [`Own and deliver high-impact work using ${s[0]} and ${s[1]}`, 'Collaborate with cross-functional teams to plan and ship solutions', 'Keep quality high through reviews, testing and documentation', 'Share knowledge and support teammates as the team grows', 'Track results and iterate based on data and feedback'],
    requirements: [expMin === 0 ? 'Freshers and recent graduates are welcome to apply' : `${expMin}+ years of relevant experience`, `Strong working knowledge of ${s.slice(0, 3).join(', ')}`, 'Clear written and verbal communication', 'Ability to work independently in a fast-moving team', 'A portfolio, GitHub or past work you can walk us through'],
  };
};

export const jobs = [
  J(1, 'Senior React Developer', 'nimbus', 'Bengaluru', 'Hybrid', 'Full-time', 3, 6, 18, 30, 'Engineering', ['React', 'TypeScript', 'Redux', 'GraphQL'], 1, true),
  J(2, 'UI/UX Designer', 'pixel', 'Remote (India)', 'Remote', 'Full-time', 1, 3, 8, 15, 'Design', ['Figma', 'Prototyping', 'Design Systems', 'User Research'], 2, true),
  J(3, 'Data Analyst', 'datahive', 'Hyderabad', 'On-site', 'Full-time', 0, 2, 5, 9, 'Data & AI', ['SQL', 'Python', 'Power BI', 'Excel'], 0),
  J(4, 'Machine Learning Engineer', 'datahive', 'Bengaluru', 'Hybrid', 'Full-time', 2, 5, 20, 35, 'Data & AI', ['Python', 'PyTorch', 'MLOps', 'AWS'], 3, true),
  J(5, 'Backend Engineer (Node.js)', 'paybridge', 'Mumbai', 'Hybrid', 'Full-time', 2, 4, 14, 24, 'Engineering', ['Node.js', 'PostgreSQL', 'Docker', 'Microservices'], 1, true),
  J(6, 'Product Manager', 'cartly', 'Gurugram', 'On-site', 'Full-time', 4, 7, 25, 40, 'Product', ['Roadmapping', 'Analytics', 'Stakeholder Management', 'SQL'], 5, true),
  J(7, 'Frontend Developer Intern', 'nimbus', 'Remote (India)', 'Remote', 'Internship', 0, 1, 20, 30, 'Engineering', ['HTML', 'CSS', 'JavaScript', 'React'], 0),
  J(8, 'Digital Marketing Specialist', 'cartly', 'Pune', 'Hybrid', 'Full-time', 1, 3, 5, 9, 'Marketing', ['SEO', 'Google Ads', 'Content Strategy', 'Analytics'], 4),
  J(9, 'DevOps Engineer', 'medora', 'Chennai', 'Hybrid', 'Full-time', 3, 6, 16, 28, 'Engineering', ['Kubernetes', 'Terraform', 'CI/CD', 'AWS'], 2),
  J(10, 'Content Writer', 'learnloop', 'Remote (India)', 'Remote', 'Part-time', 0, 2, 3, 6, 'Marketing', ['Copywriting', 'SEO', 'Research', 'Editing'], 6),
  J(11, 'Sales Development Representative', 'paybridge', 'Mumbai', 'On-site', 'Full-time', 0, 2, 4, 8, 'Sales', ['Lead Generation', 'CRM', 'Communication', 'Negotiation'], 1),
  J(12, 'Flutter Developer', 'medora', 'Chennai', 'Remote', 'Full-time', 2, 4, 12, 22, 'Engineering', ['Flutter', 'Dart', 'Firebase', 'REST APIs'], 3, true),
  J(13, 'Product Designer', 'learnloop', 'Bengaluru', 'Hybrid', 'Full-time', 3, 5, 15, 26, 'Design', ['Figma', 'UX Research', 'Prototyping', 'Motion'], 7),
  J(14, 'Data Science Intern', 'datahive', 'Hyderabad', 'Hybrid', 'Internship', 0, 1, 25, 35, 'Data & AI', ['Python', 'Pandas', 'Statistics', 'Machine Learning'], 2),
  J(15, 'Business Analyst', 'greengrid', 'Delhi', 'On-site', 'Full-time', 1, 4, 7, 13, 'Product', ['Excel', 'SQL', 'Reporting', 'Market Research'], 5),
  J(16, 'QA Automation Engineer', 'greengrid', 'Pune', 'Hybrid', 'Full-time', 2, 5, 9, 16, 'Engineering', ['Selenium', 'Cypress', 'JavaScript', 'API Testing'], 8),
  J(17, 'Customer Success Manager', 'cartly', 'Remote (India)', 'Remote', 'Full-time', 2, 5, 10, 18, 'Sales', ['Customer Support', 'CRM', 'Onboarding', 'Communication'], 9),
  J(18, 'Full Stack Developer', 'pixel', 'Chennai', 'Hybrid', 'Full-time', 1, 3, 8, 16, 'Engineering', ['React', 'Node.js', 'MongoDB', 'Express'], 0),
];

export const company = (id) => companies.find((c) => c.id === id);
export const salaryText = (j) => (j.type === 'Internship' ? `₹${j.min}k–${j.max}k / month` : `₹${j.min}–${j.max} LPA`);
export const lpaMax = (j) => (j.type === 'Internship' ? (j.max * 12) / 100 : j.max);
export const lpaMin = (j) => (j.type === 'Internship' ? (j.min * 12) / 100 : j.min);
export const ago = (d) => (d === 0 ? 'Today' : d === 1 ? 'Yesterday' : `${d} days ago`);
export const STATUSES = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
export const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
