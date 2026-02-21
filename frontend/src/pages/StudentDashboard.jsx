import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Dashboard.css';

export const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    department: '',
    image: null,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events/my');
      setEvents(response.data.events);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('eventDate', formData.eventDate);
    data.append('eventTime', formData.eventTime);
    data.append('department', formData.department);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await api.post('/events', data);
      setSuccess('Event created successfully!');
      setFormData({
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        department: '',
        image: null,
      });
      setImagePreview(null);
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${eventId}`);
        setSuccess('Event deleted successfully!');
        fetchEvents();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete event');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#16a34a';
      case 'rejected':
        return '#dc2626';
      case 'pending':
        return '#f59e0b';
      default:
        return '#666';
    }
  };

  return (
    <div className="dashboard-container">
      <h1>📚 Student Dashboard</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <button
        className="btn btn-primary"
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: '30px' }}
      >
        {showForm ? '✖️ Cancel' : '➕ Create New Event'}
      </button>

      {showForm && (
        <div className="form-card">
          <h2>Create Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter event title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter event description"
                rows="5"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Event Time</label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics">Electronics</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} required />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-success">
              Submit Event
            </button>
          </form>
        </div>
      )}

      <div className="events-grid">
        <h2>My Events ({events.length})</h2>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : events.length === 0 ? (
          <p className="no-events">No events created yet. Create one to get started!</p>
        ) : (
          <div className="grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-image">
                  <img src={`http://localhost:5000/${event.image}`} alt={event.title} />
                  <span
                    className="event-status"
                    style={{ backgroundColor: getStatusColor(event.status) }}
                  >
                    {event.status.toUpperCase()}
                  </span>
                </div>

                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>

                  <div className="event-info">
                    <p>
                      <strong>📅 Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>⏰ Time:</strong> {event.eventTime}
                    </p>
                    <p>
                      <strong>🏢 Department:</strong> {event.department}
                    </p>
                  </div>

                  {event.status === 'rejected' && (
                    <div className="rejection-reason">
                      <p>
                        <strong>Rejection Reason:</strong> {event.rejectionReason}
                      </p>
                    </div>
                  )}

                  {event.status === 'pending' && (
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDelete(event._id)}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
