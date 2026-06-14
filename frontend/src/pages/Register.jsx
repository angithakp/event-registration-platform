import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error("Username is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await api.post("register/", formData);

      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        <div className="auth-card-header">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <div className="bg-primary text-white p-2 rounded-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaCalendarAlt size={20} />
            </div>
            <span className="h4 mb-0 fw-extrabold text-primary">EventHub</span>
          </div>
          <h2 className="fw-bold text-dark mb-1">Create Account</h2>
          <p className="text-muted small">Sign up to start registering for events</p>
        </div>

        <div className="auth-card-body">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="form-control form-control-custom border-start-0 ps-0"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="form-control form-control-custom border-start-0 ps-0"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password (min 6 chars)"
                  className="form-control form-control-custom border-start-0 ps-0"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>

            <button className="btn btn-primary-custom w-100 mb-3" type="submit">
              <FaUserPlus /> Register
            </button>

          </form>

          <div className="text-center mt-3">
            <p className="text-muted small mb-0">
              Already have an account?{" "}
              <Link to="/" className="fw-bold text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;