import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./styles/AdminLogin.css"; // Ensure correct path

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    let newErrors = {};

    // Basic validation
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Login Successful:", response.data);

      // Store authentication data
      sessionStorage.setItem("adminToken", response.data.token);
      sessionStorage.setItem("adminEmail", response.data.email);

      navigate("/AdminHome");
    } catch (error) {
      setErrors({ email: error.response?.data?.message || "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="user-ico" onClick={() => setPopupOpen(!popupOpen)}>
        <FaUser size={24} />
      </div>

      {popupOpen && (
        <div className="popup-card active">
         
          <p onClick={() => navigate('/TechnicianLogin')}>Technician</p>
          <p onClick={() => navigate('/login')}>User</p>
          <p onClick={() => navigate('/AdminLogin')}>Admin</p>
        </div>
      )}

      <div className="login-card">
        <h2>Admin Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="signup-link">
                    <a href="/adminSignup" className="signup-link-text">Don't have an account? Sign up</a>
                </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
