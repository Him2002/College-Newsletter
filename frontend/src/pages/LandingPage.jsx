import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            🎓 Dayananda Sagar Institutions
          </h1>
          <h2 className="hero-subtitle">
            College Newsletter & Event Portal
          </h2>
          <p className="hero-description">
            Stay updated with all college events and news. Students can submit events,
            and our administration team reviews and approves them for the monthly newsletter.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/login')}>
              📝 Login
            </button>
            <button className="btn btn-secondary btn-large" onClick={() => navigate('/register')}>
              ✍️ Register
            </button>
            <button className="btn btn-success btn-large" onClick={() => navigate('/newsletter')}>
              📰 View Newsletter
            </button>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <h2>About This Portal</h2>
          <div className="about-grid">
            <div className="about-card">
              <h3>📣 For Students</h3>
              <p>Submit your events and receive feedback from the administration. Track your submissions and view approvals.</p>
            </div>
            <div className="about-card">
              <h3>✅ For HOD</h3>
              <p>Review and approve events from your department. Manage the monthly newsletter and maintain event quality.</p>
            </div>
            <div className="about-card">
              <h3>🗞️ Public Newsletter</h3>
              <p>Browse all approved events organized by month and year. Stay informed about all upcoming activities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>✨ Easy event submission with image uploads</li>
            <li>🔐 Secure authentication with JWT</li>
            <li>📅 Monthly event organization and filtering</li>
            <li>⚡ Real-time approval workflow</li>
            <li>📱 Responsive and user-friendly interface</li>
            <li>🔔 Event notifications and status tracking</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
