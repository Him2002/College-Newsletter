import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import '../styles/Newsletter.css';
import { AuthContext } from '../context/AuthContext';

export const Newsletter = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    fetchApprovedEvents();
  }, []);

  const { user } = useContext(AuthContext);

  const fetchApprovedEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events/approved');
      setEvents(response.data.events);
      filterEvents(response.data.events, selectedMonth, selectedYear);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (allEvents, month, year) => {
    const filtered = allEvents.filter(
      (event) => event.month === month && event.year === year
    );
    setFilteredEvents(filtered.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)));
  };

  const handleDelete = async (eventId) => {
    const ok = window.confirm('Are you sure you want to delete this event?');
    if (!ok) return;

    try {
      await api.delete(`/events/${eventId}`);
      setSuccess('Event deleted successfully');
      const remaining = events.filter((e) => e._id !== eventId);
      setEvents(remaining);
      filterEvents(remaining, selectedMonth, selectedYear);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event');
    }
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    filterEvents(events, month, selectedYear);
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    filterEvents(events, selectedMonth, year);
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  return (
    <div className="newsletter-container">
      <div className="newsletter-header">
        <h1>🗞️ College Newsletter</h1>
        <p>Stay updated with all approved events from Dayananda Sagar Institutions</p>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="month">Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">Year</label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="newsletter-content">
        <h2>
          {months[selectedMonth - 1]} {selectedYear}
        </h2>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No approved events for {months[selectedMonth - 1]} {selectedYear}.</p>
            <p>Check back soon!</p>
          </div>
        ) : (
          <div className="newsletter-grid">
            {filteredEvents.map((event) => (
              <article key={event._id} className="newsletter-event">
                <div className="event-image">
                  <img src={`http://localhost:5000/${event.image}`} alt={event.title} />
                </div>

                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>

                  <div className="event-metadata">
                    <span className="event-date">
                      📅 {new Date(event.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="event-time">⏰ {event.eventTime}</span>
                    <span className="event-dept">🏢 {event.department}</span>
                  </div>

                  <p className="event-organizer">
                    Organized by: <strong>{event.createdBy.name}</strong>
                  </p>
                  {user && (
                    (() => {
                      const isAdmin = user.role === 'admin';
                      const isHodOfDept = user.role === 'hod' && user.department === event.department;
                      const isCreator = user.id === (event.createdBy.id || event.createdBy._id);
                      const canDelete = isAdmin || isHodOfDept || isCreator;
                      return canDelete ? (
                        <div style={{ marginTop: '10px' }}>
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleDelete(event._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      ) : null;
                    })()
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
