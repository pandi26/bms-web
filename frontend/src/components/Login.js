

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });

    let newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({ ...prev, general: data.message || "Invalid credentials" }));
        setLoading(false);
        return;
      }

      // If user is active
      if (data.user.status === "Active") {
        // Store session data
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("userId", data.user.userId);
        sessionStorage.setItem("user", data.user.username);
        sessionStorage.setItem("userStatus", data.user.status);
   


       
        // 👉 Request fullscreen before redirecting
        const goFullscreen = async () => {
          const elem = document.documentElement;
          if (elem.requestFullscreen) {
            await elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) {
            await elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            await elem.msRequestFullscreen();
          }
        };

        await goFullscreen();
               console.log(data.token);
               
        // ✅ Redirect to full-screen page
        navigate("/functions/RtbatteryMonitoring");
      } else {
        setErrors((prev) => ({ ...prev, general: "Access not granted. Please contact admin." }));
        sessionStorage.clear();
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: "Server error. Please try again later." }));
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
          <p onClick={() => navigate("/AdminLogin")}>Admin</p>
          <p onClick={() => navigate("/TechnicianLogin")}>Technician</p>
          <p onClick={() => navigate("/dashboard")}>User</p>
        </div>
      )}

      <div className="login-card">
        <h2>Login</h2>
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

          {errors.general && <div className="error-text">{errors.general}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="signup-link-text">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
