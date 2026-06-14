import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaUserPlus } from "react-icons/fa";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`events/${id}/`);
      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!event) {
    return (
      <div className="spinner-container">
        <div className="modern-spinner" role="status"></div>
        <p className="text-muted mt-3 fw-medium">Loading event details...</p>
      </div>
    );
  }

  const registerEvent = async () => {
    try {
      const token = localStorage.getItem("access_token");

      console.log("TOKEN:", token);

      const response = await api.post(
        `events/${id}/register/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Registration failed or already registered");
    }
  };

  const bannerStyleIndex = event.id ? event.id % 5 : 0;

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link to="/events" className="btn btn-secondary-custom btn-sm">
          <FaArrowLeft className="me-1" /> Back to Events
        </Link>
      </div>

      <div className="saas-card overflow-hidden">
        {/* Banner */}
        <div className={`event-card-banner event-banner-art-${bannerStyleIndex}`} style={{ height: '240px', fontSize: '4rem' }}>
          {event.title ? event.title.substring(0, 2) : "EV"}
        </div>

        <div className="saas-card-body p-4 p-md-5">
          <div className="row g-4">
            
            <div className="col-lg-8">
              <h2 className="display-6 fw-extrabold text-dark mb-4">{event.title}</h2>
              <div className="mb-4">
                <h5 className="fw-bold text-secondary mb-2">About the Event</h5>
                <p className="text-secondary fs-5" style={{ whiteSpace: "pre-line" }}>
                  {event.description}
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="p-4 rounded-4 bg-light border border-light-subtle h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom border-secondary-subtle">Event Schedule</h5>
                  
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="bg-primary-light text-primary p-3 rounded-3 mt-1">
                      <FaCalendarAlt size={20} />
                    </div>
                    <div>
                      <span className="d-block text-muted small fw-semibold uppercase">Date and Time</span>
                      <strong className="text-dark fs-5">{event.date}</strong>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="bg-danger-subtle text-danger p-3 rounded-3 mt-1">
                      <FaMapMarkerAlt size={20} />
                    </div>
                    <div>
                      <span className="d-block text-muted small fw-semibold uppercase">Location</span>
                      <strong className="text-dark fs-5">{event.location}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3">
                  <button
                    className="btn btn-success-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                    onClick={registerEvent}
                  >
                    <FaUserPlus size={18} />
                    <span>Register For Event</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;