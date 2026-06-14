import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      const response = await api.post("login/", formData);

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      toast.success("Login Successful");

      navigate("/events");
    } catch (error) {
      toast.error("Invalid Credentials");
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
          <h2 className="fw-bold text-dark mb-1">Welcome Back</h2>
          <p className="text-muted small">Sign in to manage and register for events</p>
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

            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control form-control-custom border-start-0 ps-0"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>

            <button className="btn btn-primary-custom w-100 mb-3" type="submit">
              <FaSignInAlt /> Sign In
            </button>

          </form>

          <div className="text-center mt-3">
            <p className="text-muted small mb-0">
              Don't have an account?{" "}
              <Link to="/register" className="fw-bold text-primary">
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;