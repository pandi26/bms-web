import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Signups.css"; // ✅ Ensure correct path

const TechnicianSignup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        age: "",
        address: "",
        phone: "",
        expertise: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { username, email, password, phone, expertise } = formData;
        if (!username || !email || !password || !expertise) {
            return "All required fields must be filled.";
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return "Invalid email format.";
        }
        if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            return "Password must be at least 6 characters and include an uppercase letter, a number, and a special character.";
        }
        if (phone && !/^\d{10}$/.test(phone)) {
            return "Phone number must be exactly 10 digits.";
        }
        return null;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/technician/signup", formData);
            console.log("Signup Successful:", response.data);
            alert("Signup successful! Redirecting to login.");
            navigate("/TechnicianLogin");
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Technician Signup</h2>
                {error && <p className="error-text">{error}</p>}

                <form className="signup-form" onSubmit={handleSignup}>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <input type="number" name="age" placeholder="Age (Optional)" value={formData.age} onChange={handleChange} />
                    <input type="text" name="address" placeholder="Address (Optional)" value={formData.address} onChange={handleChange} />
                    <input type="text" name="phone" placeholder="Phone (Optional)" value={formData.phone} onChange={handleChange} />
                    <input type="text" name="expertise" placeholder="Expertise" value={formData.expertise} onChange={handleChange} required />

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>

                <p>Already have an account? <a href="/TechnicianLogin" className="login-link">Login</a></p>
            </div>
        </div>
    );
};

export default TechnicianSignup;
