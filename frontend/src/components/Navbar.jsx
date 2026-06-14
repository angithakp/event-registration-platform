import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaUserCheck, FaSignOutAlt, FaChartPie, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    toast.info("Logged Out");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        
        <Link className="navbar-brand navbar-brand-custom" to="/events">
          <FaCalendarAlt size={22} className="text-primary" />
          <span>EventHub</span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none text-primary"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <div className="navbar-nav ms-auto align-items-center gap-1 mt-2 mt-lg-0">
            
            <Link 
              className={`nav-link nav-link-custom ${isActive("/events")}`} 
              to="/events"
              onClick={() => setIsOpen(false)}
            >
              <FaCalendarAlt />
              <span>Events</span>
            </Link>

            <Link 
              className={`nav-link nav-link-custom ${isActive("/my-registrations")}`} 
              to="/my-registrations"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCheck />
              <span>My Registrations</span>
            </Link>

            <Link 
              className={`nav-link nav-link-custom ${isActive("/dashboard")}`} 
              to="/dashboard"
              onClick={() => setIsOpen(false)}
            >
              <FaChartPie />
              <span>Dashboard</span>
            </Link>

            <button
              className="btn btn-danger-custom ms-lg-3 mt-2 mt-lg-0 w-100 w-lg-auto"
              onClick={logout}
            >
              <FaSignOutAlt className="me-1" />
              <span>Logout</span>
            </button>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;