import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaChevronRight, FaInbox } from "react-icons/fa";

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get("events/");
            setEvents(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="modern-spinner" role="status"></div>
                <p className="text-muted mt-3 fw-medium">Loading events...</p>
            </div>
        );
    }

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container py-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
                <div>
                    <h1 className="fw-extrabold text-dark mb-1">Available Events</h1>
                    <p className="text-secondary mb-0">Discover and join workshops, conferences, and seminars.</p>
                </div>
                
                <div className="position-relative" style={{ minWidth: '300px' }}>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 text-muted">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control form-control-custom border-start-0 ps-0"
                            placeholder="Search events..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {filteredEvents.length === 0 ? (
                <div className="empty-state shadow-sm">
                    <div className="empty-state-icon">
                        <FaInbox />
                    </div>
                    <h4 className="empty-state-title">No events found</h4>
                    <p className="empty-state-desc">
                        {search ? `We couldn't find any events matching "${search}".` : "There are currently no events available."}
                    </p>
                    {search && (
                        <button className="btn btn-secondary-custom btn-sm" onClick={() => setSearch("")}>
                            Clear Search
                        </button>
                    )}
                </div>
            ) : (
                <div className="row g-4">
                    {filteredEvents.map((event, index) => {
                        const bannerStyleIndex = event.id ? event.id % 5 : index % 5;
                        return (
                            <div className="col-md-6 col-lg-4 d-flex align-items-stretch" key={event.id}>
                                <div className="saas-card w-100 d-flex flex-column justify-content-between">
                                    <div>
                                        {/* Image Banner Placeholder */}
                                        <div className={`event-card-banner event-banner-art-${bannerStyleIndex}`}>
                                            {event.title ? event.title.substring(0, 2) : "EV"}
                                        </div>
                                        
                                        <div className="saas-card-body pb-0">
                                            <h4 className="fw-bold fs-5 text-dark mb-3 line-clamp-1">{event.title}</h4>
                                            <p className="text-secondary small mb-4 text-truncate-2" style={{ height: '48px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                {event.description}
                                            </p>
                                            
                                            <div className="d-flex flex-wrap gap-2 mb-4">
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
                                    </div>

                                    <div className="p-4 pt-0">
                                        <Link
                                            to={`/events/${event.id}`}
                                            className="btn btn-primary-custom w-100"
                                        >
                                            <span>View Details</span>
                                            <FaChevronRight size={12} />
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

export default EventList;