import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import '../styles/Dashboard.css';
import { AuthContext } from '../context/AuthContext';

export const HodDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events/pending');
      setEvents(response.data.events);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      await api.put(`/events/${eventId}/approve`);
      setSuccess('Event approved successfully!');
      fetchPendingEvents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve event');
    }
  };

  const handleReject = async (eventId) => {
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    try {
      await api.put(`/events/${eventId}/reject`, { rejectionReason });
      setSuccess('Event rejected successfully!');
      setRejectionReason('');
      setShowRejectForm(null);
      fetchPendingEvents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject event');
    }
  };

  const handleDelete = async (eventId) => {
    const ok = window.confirm('Are you sure you want to delete this event?');
    if (!ok) return;

    try {
      await api.delete(`/events/${eventId}`);
      setSuccess('Event deleted successfully');
      fetchPendingEvents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>👔 Head of Department Dashboard</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="events-grid">
        <h2>Pending Events ({events.length})</h2>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : events.length === 0 ? (
          <p className="no-events">No pending events to review.</p>
        ) : (
          <div className="grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-image">
                  <img src={`http://localhost:5000/${event.image}`} alt={event.title} />
                </div>

                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>

                  <div className="event-info">
                    <p>
                      <strong>✍️ By:</strong> {event.createdBy.name}
                    </p>
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

                  <div className="action-buttons">
                    <button
                      className="btn btn-success btn-small"
                      onClick={() => handleApprove(event._id)}
                    >
                      ✅ Approve
                    </button>

                    {showRejectForm === event._id ? (
                      <div className="reject-form">
                        <textarea
                          placeholder="Enter rejection reason..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleReject(event._id)}
                          >
                            Send Rejection
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => setShowRejectForm(event._id)}
                          >
                            ❌ Reject
                          </button>

                          {/* Delete button visible to admin, HOD of same dept, or creator */}
                          {user && (() => {
                            const isAdmin = user.role === 'admin';
                            const isHodOfDept = user.role === 'hod' && user.department === event.department;
                            const isCreator = user.id === (event.createdBy.id || event.createdBy._id);
                            const canDelete = isAdmin || isHodOfDept || isCreator;
                            return canDelete ? (
                              <button
                                className="btn btn-danger btn-small"
                                onClick={() => handleDelete(event._id)}
                                style={{ marginLeft: '8px' }}
                              >
                                🗑️ Delete
                              </button>
                            ) : null;
                          })()}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => setShowRejectForm(event._id)}
                      >
                        ❌ Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
