import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // User icon
import "./styles/TechnicianLogin.css"; // ✅ Ensure correct path

const TechnicianLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/technician/login", {
                email: email.trim(),
                password: password.trim(),
            });

            console.log("Login Successful:", response.data);
            sessionStorage.setItem("authToken", response.data.token);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("user", response.data.name);

            navigate("/TechnicianHome");
        } catch (error) {
            console.error("Technician Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Invalid login credentials");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <FaUserCircle className="user-ico" size={30} onClick={() => setPopup(!popup)} />

                <h2>Technician Login</h2>
                {error && <p className="error-text">{error}</p>}

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="signup-link">
                   
                </div>
            </div>

            {/* Popup Card for additional options */}
            <div className={`popup-card ${popup ? "active" : ""}`}>
                <p onClick={() => navigate('/login')}>User</p>
                <p onClick={() => navigate('/TechnicianLogin')}>Technician</p>
                <p onClick={() => navigate('/AdminLogin')}>Admin</p>
            </div>
        </div>
    );
};

export default TechnicianLogin;
