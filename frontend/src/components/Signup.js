import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/Signup.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaAddressCard,
  FaMapPin,
  FaPhoneAlt,
  FaBatteryFull,
} from "react-icons/fa";

const coimbatorePincodes = Array.from({ length: 62 }, (_, i) =>
  `641${(i + 1).toString().padStart(3, "0")}`
);

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
    phone: "",
    batteryId: "",
  });

  const [errors, setErrors] = useState({});
  const [filteredPincodes, setFilteredPincodes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode") {
      setFilteredPincodes(
        coimbatorePincodes.filter((pin) => pin.startsWith(value))
      );
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formData.username) validationErrors.username = "Required";
    if (!formData.email || !validateEmail(formData.email))
      validationErrors.email = "Valid email required";
    if (!formData.password) validationErrors.password = "Required";
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match";
    if (!formData.age) validationErrors.age = "Required";
    if (!formData.state) validationErrors.state = "Required";
    if (!formData.district) validationErrors.district = "Required";
    if (!formData.address) validationErrors.address = "Required";
    if (!formData.pincode || formData.pincode.length !== 6)
      validationErrors.pincode = "Enter a valid pincode";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      validationErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.batteryId) validationErrors.batteryId = "Required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert("Signup failed: " + (errorData.message || "Unknown error"));
          return;
        }

        const data = await response.json();
        alert("Signup successful!");
        console.log("Response from server:", data);
        navigate("/login");
      } catch (error) {
        alert("Network error: " + error.message);
      }
    }
  };

  const renderInput = (label, name, type, Icon, placeholder) => (
    <div className="form-group icon-input">
      <label>
        <Icon className="input-icon" /> {label}
      </label>
      <input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="signup-containerU">
      <h2>🔐 Create Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="row">
          {renderInput("Username", "username", "text", FaUser, "Enter username")}
          {renderInput("Email", "email", "email", FaEnvelope, "Enter email")}
        </div>

        <div className="row">
          {renderInput("Password", "password", "password", FaLock, "Enter password")}
          {renderInput(
            "Confirm Password",
            "confirmPassword",
            "password",
            FaLock,
            "Re-enter password"
          )}
        </div>

        <div className="row">
          {renderInput("Age", "age", "number", FaCalendarAlt, "Enter age")}
          {renderInput("Battery ID", "batteryId", "text", FaBatteryFull, "Enter battery ID")}
        </div>

        <div className="row">
          {renderInput("State", "state", "text", FaMapMarkerAlt, "Eg: Tamil Nadu")}
          {renderInput("District", "district", "text", FaMapMarkerAlt, "Eg: Coimbatore")}
        </div>

        <div className="row">
          {renderInput("Address", "address", "text", FaAddressCard, "Full address")}

          <div className="form-group pincode-group icon-input">
            <label>
              <FaMapPin className="input-icon" /> Pincode
            </label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Start typing e.g. 641..."
              autoComplete="off"
            />
            {errors.pincode && <span className="error">{errors.pincode}</span>}
            {filteredPincodes.length > 0 && formData.pincode && (
              <ul className="pincode-suggestions">
                {filteredPincodes.map((pin) => (
                  <li
                    key={pin}
                    onClick={() => {
                      setFormData({ ...formData, pincode: pin });
                      setFilteredPincodes([]);
                    }}
                  >
                    {pin}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="row">
          {renderInput("Phone", "phone", "text", FaPhoneAlt, "10-digit number")}
        </div>

        <button type="submit" className="signup-button">
          🚀 Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
