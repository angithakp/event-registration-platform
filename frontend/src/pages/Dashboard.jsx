import { useEffect, useState } from "react";
import api from "../services/api";
import { FaCalendarAlt, FaUserCheck, FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [totalEvents, setTotalEvents] = useState(0);
  const [myRegistrations, setMyRegistrations] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const eventsResponse = await api.get("events/");

      const token = localStorage.getItem("access_token");

      const registrationsResponse = await api.get(
        "my-registrations/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalEvents(eventsResponse.data.length);
      setMyRegistrations(registrationsResponse.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="fw-extrabold text-dark mb-2">Dashboard</h1>
        <p className="text-secondary fs-5">
          Welcome to your Event Management Dashboard. Manage registrations and discover new opportunities.
        </p>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="saas-card stat-card-indigo d-flex flex-column justify-content-between p-4">
            <div>
              <div className="stat-icon-wrapper stat-icon-wrapper-indigo">
                <FaCalendarAlt size={20} />
              </div>
              <h4 className="text-secondary fw-semibold fs-6 mb-2">Total Events Available</h4>
              <h1 className="display-4 fw-extrabold text-dark mb-3">{totalEvents}</h1>
              <p className="text-muted small mb-0">Explore and register for upcoming events and workshops.</p>
            </div>
            <div className="mt-4 pt-3 border-top border-light">
              <Link to="/events" className="btn btn-sm btn-primary-custom">
                Browse Events <FaChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="saas-card stat-card-sky d-flex flex-column justify-content-between p-4">
            <div>
              <div className="stat-icon-wrapper stat-icon-wrapper-sky">
                <FaUserCheck size={20} />
              </div>
              <h4 className="text-secondary fw-semibold fs-6 mb-2">My Registered Events</h4>
              <h1 className="display-4 fw-extrabold text-dark mb-3">{myRegistrations}</h1>
              <p className="text-muted small mb-0">Check schedules and details of events you have joined.</p>
            </div>
            <div className="mt-4 pt-3 border-top border-light">
              <Link to="/my-registrations" className="btn btn-sm btn-secondary-custom">
                View My Registrations <FaChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Dashboard;