import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Tsingup.css"; // ✅ Ensure correct path
import Navbar from "./Navbar"; // Ensure Navbar is being imported properly

const AdminAddTechnician = () => {
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
            const token = sessionStorage.getItem("adminToken"); // Assuming admin token is saved in sessionStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const response = await axios.post("http://localhost:5000/api/admin/addTechnician", formData, config); // Admin route
            console.log("Technician Added Successfully:", response.data);
            alert("Technician added successfully!");
            navigate("/AdminDashboard"); // Redirect after success
        } catch (error) {
            console.error("Add Technician Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to add technician.");
        }
    };

    return (
        <div>
            <Navbar /> {/* Ensure Navbar is rendered properly */}

            <div className="signup-container">
                <div className="signup-card">
                    <h2>Add Technician</h2>
                    {error && <p className="error-text">{error}</p>}

                    <form className="signup-form" onSubmit={handleSignup}>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="number" 
                            name="age" 
                            placeholder="Age (Optional)" 
                            value={formData.age} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="address" 
                            placeholder="Address (Optional)" 
                            value={formData.address} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="Phone (Optional)" 
                            value={formData.phone} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="expertise" 
                            placeholder="Expertise" 
                            value={formData.expertise} 
                            onChange={handleChange} 
                            required 
                        />

                        <button type="submit" className="signup-button">Add Technician</button>
                    </form>

                    <p>Go back to <a href="/AdminHome" className="login-link">Dashboard</a></p>
                </div>
            </div>
        </div>
    );
};

export default AdminAddTechnician;
