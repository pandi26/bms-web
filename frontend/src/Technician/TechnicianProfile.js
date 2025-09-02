import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/TechnicianProfile.css";

function TechnicianProfile() {
  const [technician, setTechnician] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnicianProfile = async () => {
      const email = sessionStorage.getItem("technicianEmail");

      if (!email) {
        setError("Technician email not found in session.");
        return;
      }

      try {
        const encodedEmail = encodeURIComponent(email);
        const response = await axios.get(
          `http://localhost:5000/api/technician/profile/${encodedEmail}`
        );
        setTechnician(response.data);
      } catch (err) {
        console.error("Error fetching technician profile:", err);
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchTechnicianProfile();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!technician) {
    return <div>Loading technician profile...</div>;
  }

  return (
    <div className="technician-profile-container">
      <h2>Technician Profile</h2>
      <div className="profile-detail"><strong>Name:</strong> {technician.username}</div>
      <div className="profile-detail"><strong>Email:</strong> {technician.email}</div>
      <div className="profile-detail"><strong>Phone:</strong> {technician.phone}</div>
      <div className="profile-detail"><strong>Address:</strong> {technician.address}</div>
      <div className="profile-detail"><strong>Age:</strong> {technician.age}</div>
      <div className="profile-detail"><strong>Expertise:</strong> {technician.expertise}</div>

      <div className="button-group">
        <button className="btn go-back" onClick={handleGoBack}>Go Back</button>
        <button className="btn logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default TechnicianProfile;
