import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaInbox, FaChevronRight } from "react-icons/fa";

function MyRegistrations() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("access_token");

      console.log("TOKEN:", token);

      const response = await api.get("my-registrations/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("DATA:", response.data);

      setEvents(response.data);
    } catch (error) {
      console.log("ERROR:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="modern-spinner animate-spin" role="status"></div>
        <p className="text-muted mt-3 fw-medium">Loading your registrations...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="fw-extrabold text-dark mb-1">My Registrations</h1>
        <p className="text-secondary mb-0">Review details and schedules of events you've registered for.</p>
      </div>

      {events.length === 0 ? (
        <div className="empty-state shadow-sm">
          <div className="empty-state-icon">
            <FaInbox />
          </div>
          <h4 className="empty-state-title">No registrations yet</h4>
          <p className="empty-state-desc">
            You haven't registered for any events yet. Explore upcoming events to get started.
          </p>
          <Link to="/events" className="btn btn-primary-custom btn-sm">
            Browse Events <FaChevronRight size={10} />
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {events.map((event, index) => {
            const bannerStyleIndex = event.event_id ? event.event_id % 5 : index % 5;
            return (
              <div className="col-md-6" key={event.event_id || index}>
                <div className="saas-card d-flex flex-column justify-content-between">
                  
                  {/* Small decorative indicator */}
                  <div className={`event-banner-art-${bannerStyleIndex}`} style={{ height: '8px', width: '100%' }}></div>
                  
                  <div className="saas-card-body">
                    <h4 className="fw-bold fs-5 text-dark mb-2">{event.title}</h4>
                    <p className="text-secondary small mb-4 text-truncate-2" style={{ height: '48px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {event.description}
                    </p>
                    
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge-date">
                        <FaCalendarAlt size={12} />
                        {event.date}
                      </span>
                      <span className="badge-location">
                        <FaMapMarkerAlt size={12} className="text-danger" />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      to={`/events/${event.event_id}`}
                      className="btn btn-secondary-custom btn-sm w-100"
                    >
                      View Event Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;